import type {
  ActionEvaluation,
  GridEdge,
  NetworkAnalysis,
  SafetyFinding,
  Scenario,
  SwitchStates,
} from '../types';

type AdjacencyEntry = {nodeId: string; edgeId: string};

const isEdgeClosed = (edge: GridEdge, switches: SwitchStates) =>
  edge.kind === 'line' || Boolean(edge.switchId && switches[edge.switchId]);

const buildAdjacency = (scenario: Scenario, switches: SwitchStates) => {
  const adjacency = new Map<string, AdjacencyEntry[]>();
  for (const node of scenario.nodes) adjacency.set(node.id, []);

  for (const edge of scenario.edges) {
    if (!isEdgeClosed(edge, switches)) continue;
    adjacency.get(edge.from)?.push({nodeId: edge.to, edgeId: edge.id});
    adjacency.get(edge.to)?.push({nodeId: edge.from, edgeId: edge.id});
  }
  return adjacency;
};

const walkFrom = (
  startId: string,
  adjacency: Map<string, AdjacencyEntry[]>,
) => {
  const nodes = new Set<string>([startId]);
  const edges = new Set<string>();
  const queue = [startId];

  while (queue.length > 0) {
    const current = queue.shift() as string;
    for (const next of adjacency.get(current) ?? []) {
      edges.add(next.edgeId);
      if (nodes.has(next.nodeId)) continue;
      nodes.add(next.nodeId);
      queue.push(next.nodeId);
    }
  }

  return {nodes, edges};
};

const pathBetween = (
  startId: string,
  targetId: string,
  adjacency: Map<string, AdjacencyEntry[]>,
) => {
  const queue = [startId];
  const visited = new Set([startId]);
  const previous = new Map<string, {nodeId: string; edgeId: string}>();

  while (queue.length > 0) {
    const current = queue.shift() as string;
    if (current === targetId) break;
    for (const next of adjacency.get(current) ?? []) {
      if (visited.has(next.nodeId)) continue;
      visited.add(next.nodeId);
      previous.set(next.nodeId, {nodeId: current, edgeId: next.edgeId});
      queue.push(next.nodeId);
    }
  }

  if (!visited.has(targetId)) return [];
  const edgeIds: string[] = [];
  let cursor = targetId;
  while (cursor !== startId) {
    const step = previous.get(cursor);
    if (!step) return [];
    edgeIds.unshift(step.edgeId);
    cursor = step.nodeId;
  }
  return edgeIds;
};

export const analyzeNetwork = (
  scenario: Scenario,
  switches: SwitchStates,
): NetworkAnalysis => {
  const adjacency = buildAdjacency(scenario, switches);
  const reachableBySource: Record<string, Set<string>> = {};
  const sourceEdges: Record<string, Set<string>> = {};
  const energizedNodes = new Set<string>();
  const energizedEdgeIds = new Set<string>();

  for (const sourceId of scenario.sourceIds) {
    const walk = walkFrom(sourceId, adjacency);
    reachableBySource[sourceId] = walk.nodes;
    sourceEdges[sourceId] = walk.edges;
    walk.nodes.forEach((id) => energizedNodes.add(id));
    walk.edges.forEach((id) => energizedEdgeIds.add(id));
  }

  const findings: SafetyFinding[] = [];
  const faultSources = scenario.sourceIds.filter((sourceId) =>
    reachableBySource[sourceId].has(scenario.faultNodeId),
  );

  if (faultSources.length > 0) {
    const edgeIds = faultSources.flatMap((sourceId) =>
      pathBetween(sourceId, scenario.faultNodeId, adjacency),
    );
    findings.push({
      code: 'fault_energized',
      title: 'Fault would be energized',
      detail:
        'This path still reaches the faulted cable. Open both isolators before supplying either healthy section.',
      edgeIds: [...new Set(edgeIds)],
    });
  }

  if (scenario.sourceIds.length > 1) {
    const [firstSource, ...otherSources] = scenario.sourceIds;
    for (const otherSource of otherSources) {
      const shared = [...reachableBySource[firstSource]].filter(
        (nodeId) =>
          !scenario.sourceIds.includes(nodeId) &&
          reachableBySource[otherSource].has(nodeId),
      );
      if (shared.length > 0) {
        findings.push({
          code: 'dual_source',
          title: 'Two sources would meet',
          detail:
            'A section cannot be fed from Source A and Backup Source B at the same time in this drill.',
          edgeIds: [
            ...sourceEdges[firstSource],
            ...sourceEdges[otherSource],
          ],
        });
        break;
      }
    }
  }

  const loadNodes = scenario.nodes.filter((node) => node.kind === 'load');
  const sourceDemandMw: Record<string, number> = {};

  for (const sourceId of scenario.sourceIds) {
    const demand = loadNodes
      .filter((node) => reachableBySource[sourceId].has(node.id))
      .reduce((sum, node) => sum + (node.demandMw ?? 0), 0);
    sourceDemandMw[sourceId] = demand;
    const capacity =
      scenario.nodes.find((node) => node.id === sourceId)?.capacityMw ?? 0;
    if (demand > capacity + 0.0001) {
      findings.push({
        code: 'source_overload',
        title: 'Source path would be overloaded',
        detail: `${demand.toFixed(2)} MW would exceed ${capacity.toFixed(2)} MW on ${scenario.nodes.find((node) => node.id === sourceId)?.label}.`,
        edgeIds: [...sourceEdges[sourceId]],
      });
    }
  }

  const restoredCustomers = loadNodes
    .filter((node) => energizedNodes.has(node.id))
    .reduce((sum, node) => sum + (node.customers ?? 0), 0);
  const totalCustomers = loadNodes.reduce(
    (sum, node) => sum + (node.customers ?? 0),
    0,
  );
  const hospitalRestored = energizedNodes.has(scenario.hospitalNodeId);
  const faultEnergized = faultSources.length > 0;
  const allLoadsRestored = loadNodes.every((node) => energizedNodes.has(node.id));

  return {
    reachableBySource,
    energizedNodes,
    energizedEdgeIds,
    restoredCustomers,
    totalCustomers,
    hospitalRestored,
    faultEnergized,
    sourceDemandMw,
    findings,
    complete: allLoadsRestored && hospitalRestored && findings.length === 0,
  };
};

export const evaluateAction = (
  scenario: Scenario,
  switches: SwitchStates,
  switchId: string,
  closed: boolean,
): ActionEvaluation => {
  const nextSwitches = {...switches, [switchId]: closed};
  const analysis = analyzeNetwork(scenario, nextSwitches);
  const finding = analysis.findings[0];
  return {
    accepted: !finding,
    nextSwitches: finding ? switches : nextSwitches,
    analysis,
    finding,
  };
};


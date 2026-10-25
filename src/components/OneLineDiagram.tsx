import {useMemo} from 'react';
import type {
  GridEdge,
  GridNode,
  NetworkAnalysis,
  Scenario,
  SwitchStates,
} from '../types';

type Props = {
  scenario: Scenario;
  switches: SwitchStates;
  analysis: NetworkAnalysis;
  dangerEdgeIds: string[];
  demoRunning: boolean;
  onSwitch: (switchId: string) => void;
};

const getNode = (scenario: Scenario, nodeId: string) => {
  const node = scenario.nodes.find((item) => item.id === nodeId);
  if (!node) throw new Error(`Missing node: ${nodeId}`);
  return node;
};

const midpoint = (a: GridNode, b: GridNode) => ({
  x: (a.x + b.x) / 2,
  y: (a.y + b.y) / 2,
});

const edgeIsClosed = (edge: GridEdge, switches: SwitchStates) =>
  edge.kind === 'line' || Boolean(edge.switchId && switches[edge.switchId]);

const SourceNode = ({node, energized}: {node: GridNode; energized: boolean}) => (
  <g className={`node source-node ${energized ? 'is-live' : ''}`}>
    <circle cx={node.x} cy={node.y} r="33" />
    <path d={`M ${node.x - 16} ${node.y} q 8 -15 16 0 q 8 15 16 0`} />
    <text x={node.x} y={node.y + 57} textAnchor="middle" className="node-label">
      {node.label}
    </text>
    <text x={node.x} y={node.y + 76} textAnchor="middle" className="node-sub">
      {node.capacityMw?.toFixed(2)} MW limit
    </text>
  </g>
);

const BusNode = ({node, energized}: {node: GridNode; energized: boolean}) => (
  <g className={`node bus-node ${energized ? 'is-live' : ''}`}>
    <line x1={node.x} y1={node.y - 42} x2={node.x} y2={node.y + 42} />
    <circle cx={node.x} cy={node.y} r="8" />
    <text x={node.x} y={node.y + 67} textAnchor="middle" className="node-label">
      {node.label}
    </text>
  </g>
);

const FaultNode = ({node, energized}: {node: GridNode; energized: boolean}) => (
  <g className={`node fault-node ${energized ? 'is-danger' : ''}`}>
    <circle cx={node.x} cy={node.y} r="40" />
    <path
      d={`M ${node.x - 5} ${node.y - 24} l 14 0 l -9 18 l 13 0 l -23 30 l 7 -22 l -13 0 z`}
    />
    <text x={node.x} y={node.y + 66} textAnchor="middle" className="node-label">
      FAULTED CABLE
    </text>
    <text x={node.x} y={node.y + 85} textAnchor="middle" className="node-sub">
      must stay de-energized
    </text>
  </g>
);

const LoadNode = ({node, energized}: {node: GridNode; energized: boolean}) => (
  <g
    className={`node load-node ${energized ? 'is-live' : ''} ${node.critical ? 'is-critical' : ''}`}
  >
    {node.critical ? (
      <>
        <rect x={node.x - 32} y={node.y - 32} width="64" height="64" rx="12" />
        <path d={`M ${node.x - 16} ${node.y} h 32 M ${node.x} ${node.y - 16} v 32`} />
      </>
    ) : (
      <>
        <path d={`M ${node.x - 29} ${node.y - 2} l 29 -25 l 29 25 v 32 h -58 z`} />
        <rect x={node.x - 8} y={node.y + 8} width="16" height="20" />
      </>
    )}
    <text
      x={node.x}
      y={node.y + (node.y < 200 ? -52 : 55)}
      textAnchor="middle"
      className="node-label"
    >
      {node.label}
    </text>
    <text
      x={node.x}
      y={node.y + (node.y < 200 ? -33 : 75)}
      textAnchor="middle"
      className="node-sub"
    >
      {node.customers} customers · {node.demandMw?.toFixed(2)} MW
    </text>
  </g>
);

export const OneLineDiagram = ({
  scenario,
  switches,
  analysis,
  dangerEdgeIds,
  demoRunning,
  onSwitch,
}: Props) => {
  const switchById = useMemo(
    () => new Map(scenario.switches.map((item) => [item.id, item])),
    [scenario.switches],
  );

  return (
    <section className="diagram-panel" aria-label="Interactive feeder diagram">
      <div className="panel-heading diagram-heading">
        <div>
          <span className="kicker">SYNTHETIC FEEDER · DRILL 01</span>
          <h2>One-line restoration board</h2>
        </div>
        <div className="diagram-legend" aria-label="Diagram legend">
          <span><i className="legend-line live" /> Energized</span>
          <span><i className="legend-line dead" /> Open / de-energized</span>
          <span><i className="legend-dot danger" /> Fault</span>
        </div>
      </div>

      <div className="diagram-scroll">
        <svg
          className="one-line"
          viewBox="0 0 1130 540"
          role="img"
          aria-labelledby="diagram-title diagram-desc"
        >
          <title id="diagram-title">Synthetic two-source distribution feeder</title>
          <desc id="diagram-desc">
            Operate four switches to isolate a fault and restore West campus,
            Riverside and the community hospital.
          </desc>

          <g className="grid-lines" aria-hidden="true">
            {Array.from({length: 16}, (_, index) => (
              <line key={`v-${index}`} x1={40 + index * 70} x2={40 + index * 70} y1="28" y2="508" />
            ))}
            {Array.from({length: 7}, (_, index) => (
              <line key={`h-${index}`} x1="35" x2="1095" y1={50 + index * 72} y2={50 + index * 72} />
            ))}
          </g>

          <g className="network-edges">
            {scenario.edges.map((edge) => {
              const from = getNode(scenario, edge.from);
              const to = getNode(scenario, edge.to);
              const isClosed = edgeIsClosed(edge, switches);
              const isEnergized =
                isClosed && analysis.energizedEdgeIds.has(edge.id);
              const isDanger = dangerEdgeIds.includes(edge.id);
              return (
                <line
                  key={edge.id}
                  data-edge-id={edge.id}
                  className={`network-edge ${isEnergized ? 'is-live' : ''} ${isDanger ? 'is-danger' : ''}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                />
              );
            })}
          </g>

          <g className="network-nodes">
            {scenario.nodes.map((node) => {
              const energized = analysis.energizedNodes.has(node.id);
              if (node.kind === 'source') return <SourceNode key={node.id} node={node} energized={energized} />;
              if (node.kind === 'bus') return <BusNode key={node.id} node={node} energized={energized} />;
              if (node.kind === 'fault') return <FaultNode key={node.id} node={node} energized={energized} />;
              return <LoadNode key={node.id} node={node} energized={energized} />;
            })}
          </g>

          <g className="switches">
            {scenario.edges
              .filter((edge) => edge.kind === 'switch' && edge.switchId)
              .map((edge) => {
                const from = getNode(scenario, edge.from);
                const to = getNode(scenario, edge.to);
                const point = midpoint(from, to);
                const gridSwitch = switchById.get(edge.switchId as string);
                if (!gridSwitch) return null;
                const closed = switches[gridSwitch.id];
                const horizontal = Math.abs(from.x - to.x) > Math.abs(from.y - to.y);
                return (
                  <g
                    key={gridSwitch.id}
                    role="button"
                    tabIndex={demoRunning ? -1 : 0}
                    aria-disabled={demoRunning}
                    aria-label={`${gridSwitch.label}, ${closed ? 'closed' : 'open'}. Activate to ${closed ? 'open' : 'close'}.`}
                    data-testid={`switch-${gridSwitch.id}`}
                    data-state={closed ? 'closed' : 'open'}
                    className={`switch-control ${closed ? 'is-closed' : 'is-open'} ${demoRunning ? 'is-disabled' : ''}`}
                    onClick={() => !demoRunning && onSwitch(gridSwitch.id)}
                    onKeyDown={(event) => {
                      if (demoRunning) return;
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        onSwitch(gridSwitch.id);
                      }
                    }}
                  >
                    <circle cx={point.x} cy={point.y} r="23" className="switch-hit" />
                    {horizontal ? (
                      <>
                        <circle cx={point.x - 11} cy={point.y} r="4" />
                        <circle cx={point.x + 11} cy={point.y} r="4" />
                        <line
                          x1={point.x - 8}
                          y1={point.y}
                          x2={point.x + 8}
                          y2={closed ? point.y : point.y - 13}
                        />
                      </>
                    ) : (
                      <>
                        <circle cx={point.x} cy={point.y - 11} r="4" />
                        <circle cx={point.x} cy={point.y + 11} r="4" />
                        <line
                          x1={point.x}
                          y1={point.y - 8}
                          x2={closed ? point.x : point.x + 13}
                          y2={point.y + 8}
                        />
                      </>
                    )}
                    <rect x={point.x - 30} y={point.y + 29} width="60" height="23" rx="5" className="switch-label-bg" />
                    <text x={point.x} y={point.y + 45} textAnchor="middle" className="switch-label">
                      {gridSwitch.shortLabel}
                    </text>
                  </g>
                );
              })}
          </g>
        </svg>
      </div>
      <p className="diagram-note">
        Instructional approximation. Reachability and demand limits only, not an operational power-flow study.
      </p>
    </section>
  );
};


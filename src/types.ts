export type NodeKind = 'source' | 'bus' | 'fault' | 'load';

export type GridNode = {
  id: string;
  label: string;
  shortLabel: string;
  kind: NodeKind;
  x: number;
  y: number;
  customers?: number;
  demandMw?: number;
  critical?: boolean;
  capacityMw?: number;
};

export type GridSwitch = {
  id: string;
  label: string;
  shortLabel: string;
  initialClosed: boolean;
};

export type GridEdge = {
  id: string;
  from: string;
  to: string;
  kind: 'line' | 'switch';
  switchId?: string;
};

export type Scenario = {
  nodes: GridNode[];
  edges: GridEdge[];
  switches: GridSwitch[];
  sourceIds: string[];
  faultNodeId: string;
  hospitalNodeId: string;
};

export type SwitchStates = Record<string, boolean>;

export type SafetyFindingCode =
  | 'fault_energized'
  | 'dual_source'
  | 'source_overload';

export type SafetyFinding = {
  code: SafetyFindingCode;
  title: string;
  detail: string;
  edgeIds: string[];
};

export type NetworkAnalysis = {
  reachableBySource: Record<string, Set<string>>;
  energizedNodes: Set<string>;
  energizedEdgeIds: Set<string>;
  restoredCustomers: number;
  totalCustomers: number;
  hospitalRestored: boolean;
  faultEnergized: boolean;
  sourceDemandMw: Record<string, number>;
  findings: SafetyFinding[];
  complete: boolean;
};

export type ActionEvaluation = {
  accepted: boolean;
  nextSwitches: SwitchStates;
  analysis: NetworkAnalysis;
  finding?: SafetyFinding;
};

export type TimelineItem = {
  id: number;
  accepted: boolean;
  switchId: string;
  title: string;
  detail: string;
};

export type Receipt = {
  kind: 'info' | 'accepted' | 'blocked' | 'complete';
  eyebrow: string;
  title: string;
  detail: string;
};


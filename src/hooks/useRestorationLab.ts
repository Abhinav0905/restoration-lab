import {useCallback, useEffect, useMemo, useReducer, useRef} from 'react';
import {
  initialSwitchStates,
  restorationScenario,
} from '../data/scenario';
import {analyzeNetwork, evaluateAction} from '../lib/gridEngine';
import type {Receipt, SwitchStates, TimelineItem} from '../types';

type DrillState = {
  switches: SwitchStates;
  timeline: TimelineItem[];
  blockedAttempts: number;
  acceptedActions: number;
  receipt: Receipt;
  dangerEdgeIds: string[];
  demoRunning: boolean;
};

type DrillAction =
  | {type: 'attempt'; switchId: string; closed?: boolean}
  | {type: 'reset'}
  | {type: 'set-demo'; running: boolean};

const initialState = (): DrillState => ({
  switches: initialSwitchStates(restorationScenario),
  timeline: [],
  blockedAttempts: 0,
  acceptedActions: 0,
  receipt: {
    kind: 'info',
    eyebrow: 'Training brief',
    title: 'Isolate first. Restore second.',
    detail:
      'Every proposed action is checked before the network changes. Start by isolating the faulted cable.',
  },
  dangerEdgeIds: [],
  demoRunning: false,
});

const reducer = (state: DrillState, action: DrillAction): DrillState => {
  if (action.type === 'reset') return initialState();
  if (action.type === 'set-demo') {
    return {...state, demoRunning: action.running};
  }

  const gridSwitch = restorationScenario.switches.find(
    (item) => item.id === action.switchId,
  );
  if (!gridSwitch) return state;
  const closed = action.closed ?? !state.switches[action.switchId];
  const evaluation = evaluateAction(
    restorationScenario,
    state.switches,
    action.switchId,
    closed,
  );
  const actionWord = closed ? 'close' : 'open';
  const stateWord = closed ? 'closed' : 'opened';
  const nextId = state.timeline.length + 1;

  if (!evaluation.accepted && evaluation.finding) {
    return {
      ...state,
      blockedAttempts: state.blockedAttempts + 1,
      dangerEdgeIds: evaluation.finding.edgeIds,
      receipt: {
        kind: 'blocked',
        eyebrow: `Blocked · ${gridSwitch.shortLabel}`,
        title: evaluation.finding.title,
        detail: evaluation.finding.detail,
      },
      timeline: [
        ...state.timeline,
        {
          id: nextId,
          accepted: false,
          switchId: gridSwitch.id,
          title: `${gridSwitch.shortLabel} ${actionWord} blocked`,
          detail: evaluation.finding.title,
        },
      ],
    };
  }

  const nextAnalysis = analyzeNetwork(
    restorationScenario,
    evaluation.nextSwitches,
  );
  const completed = nextAnalysis.complete;
  return {
    ...state,
    switches: evaluation.nextSwitches,
    acceptedActions: state.acceptedActions + 1,
    dangerEdgeIds: [],
    receipt: completed
      ? {
          kind: 'complete',
          eyebrow: 'Mission complete',
          title: 'Every healthy section is restored',
          detail:
            'The fault remains isolated. Source A carries West campus and Backup Source B carries Riverside plus the hospital.',
        }
      : {
          kind: 'accepted',
          eyebrow: `Accepted · ${gridSwitch.shortLabel}`,
          title: `${gridSwitch.label} ${stateWord}`,
          detail: `${nextAnalysis.restoredCustomers} of ${nextAnalysis.totalCustomers} customers are now energized.`,
        },
    timeline: [
      ...state.timeline,
      {
        id: nextId,
        accepted: true,
        switchId: gridSwitch.id,
        title: `${gridSwitch.shortLabel} ${stateWord}`,
        detail: `${nextAnalysis.restoredCustomers} customers restored`,
      },
    ],
  };
};

export const useRestorationLab = () => {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);
  const timerIds = useRef<number[]>([]);
  const analysis = useMemo(
    () => analyzeNetwork(restorationScenario, state.switches),
    [state.switches],
  );

  const clearDemo = useCallback(() => {
    timerIds.current.forEach((timerId) => window.clearTimeout(timerId));
    timerIds.current = [];
  }, []);

  useEffect(() => clearDemo, [clearDemo]);

  const attemptSwitch = useCallback(
    (switchId: string, closed?: boolean, fromDemo = false) => {
      if (!fromDemo) {
        clearDemo();
        dispatch({type: 'set-demo', running: false});
      }
      dispatch({type: 'attempt', switchId, closed});
    },
    [clearDemo],
  );

  const reset = useCallback(() => {
    clearDemo();
    dispatch({type: 'reset'});
  }, [clearDemo]);

  const runDemo = useCallback(() => {
    clearDemo();
    dispatch({type: 'reset'});
    dispatch({type: 'set-demo', running: true});
    const steps = [
      {at: 900, switchId: 'breaker-a', closed: true},
      {at: 2800, switchId: 'iso-west', closed: false},
      {at: 4500, switchId: 'iso-east', closed: false},
      {at: 6200, switchId: 'breaker-a', closed: true},
      {at: 7900, switchId: 'tie-b', closed: true},
    ];
    timerIds.current = steps.map((step) =>
      window.setTimeout(() => {
        dispatch({
          type: 'attempt',
          switchId: step.switchId,
          closed: step.closed,
        });
      }, step.at),
    );
    timerIds.current.push(
      window.setTimeout(
        () => dispatch({type: 'set-demo', running: false}),
        9400,
      ),
    );
  }, [clearDemo]);

  const hint = useMemo(() => {
    if (state.switches['iso-west']) {
      return 'Open ISO-W to separate Source A from the faulted cable.';
    }
    if (state.switches['iso-east']) {
      return 'Open ISO-E so the backup source cannot feed into the fault.';
    }
    if (!state.switches['breaker-a']) {
      return 'The fault is isolated from Source A. Close CB-A to restore West campus.';
    }
    if (!state.switches['tie-b']) {
      return 'Close TIE-B to restore Riverside and the hospital from Backup Source B.';
    }
    return 'Restoration complete. Reset the drill and try it without a blocked move.';
  }, [state.switches]);

  return {
    ...state,
    analysis,
    scenario: restorationScenario,
    attemptSwitch,
    reset,
    runDemo,
    hint,
  };
};


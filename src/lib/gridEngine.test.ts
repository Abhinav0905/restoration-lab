import {describe, expect, it} from 'vitest';
import {
  initialSwitchStates,
  restorationScenario,
} from '../data/scenario';
import {analyzeNetwork, evaluateAction} from './gridEngine';

const safeRestoration = () => ({
  ...initialSwitchStates(restorationScenario),
  'iso-west': false,
  'iso-east': false,
  'breaker-a': true,
  'tie-b': true,
});

describe('gridEngine', () => {
  it('starts with every customer interrupted and the fault de-energized', () => {
    const analysis = analyzeNetwork(
      restorationScenario,
      initialSwitchStates(restorationScenario),
    );
    expect(analysis.restoredCustomers).toBe(0);
    expect(analysis.hospitalRestored).toBe(false);
    expect(analysis.faultEnergized).toBe(false);
    expect(analysis.findings).toHaveLength(0);
  });

  it('blocks Source A from energizing the fault', () => {
    const initial = initialSwitchStates(restorationScenario);
    const result = evaluateAction(
      restorationScenario,
      initial,
      'breaker-a',
      true,
    );
    expect(result.accepted).toBe(false);
    expect(result.finding?.code).toBe('fault_energized');
    expect(result.nextSwitches).toEqual(initial);
  });

  it('blocks the backup tie while the east isolator still reaches the fault', () => {
    const initial = initialSwitchStates(restorationScenario);
    const result = evaluateAction(restorationScenario, initial, 'tie-b', true);
    expect(result.accepted).toBe(false);
    expect(result.finding?.code).toBe('fault_energized');
  });

  it('detects two sources feeding the same section', () => {
    const unsafe = {
      ...initialSwitchStates(restorationScenario),
      'breaker-a': true,
      'tie-b': true,
    };
    const analysis = analyzeNetwork(restorationScenario, unsafe);
    expect(analysis.findings.some((finding) => finding.code === 'dual_source')).toBe(true);
  });

  it('detects demand above the backup source drill limit', () => {
    const overloaded = {
      ...initialSwitchStates(restorationScenario),
      'iso-west': true,
      'iso-east': true,
      'breaker-a': false,
      'tie-b': true,
    };
    const analysis = analyzeNetwork(restorationScenario, overloaded);
    expect(analysis.sourceDemandMw['source-b']).toBeCloseTo(1.1);
    expect(analysis.findings.some((finding) => finding.code === 'source_overload')).toBe(true);
  });

  it('restores all loads after the safe four-action sequence', () => {
    const analysis = analyzeNetwork(restorationScenario, safeRestoration());
    expect(analysis.findings).toHaveLength(0);
    expect(analysis.restoredCustomers).toBe(700);
    expect(analysis.hospitalRestored).toBe(true);
    expect(analysis.complete).toBe(true);
    expect(analysis.sourceDemandMw['source-a']).toBeCloseTo(0.42);
    expect(analysis.sourceDemandMw['source-b']).toBeCloseTo(0.68);
  });
});


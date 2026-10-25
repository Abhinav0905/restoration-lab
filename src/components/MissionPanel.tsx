import {useState, type ReactNode} from 'react';
import type {NetworkAnalysis, Receipt, TimelineItem} from '../types';
import {Timeline} from './Timeline';

type Props = {
  analysis: NetworkAnalysis;
  receipt: Receipt;
  timeline: TimelineItem[];
  hint: string;
};

const Goal = ({done, children}: {done: boolean; children: ReactNode}) => (
  <li className={done ? 'goal-done' : ''}>
    <span aria-hidden="true">{done ? '✓' : '○'}</span>
    {children}
  </li>
);

export const MissionPanel = ({analysis, receipt, timeline, hint}: Props) => {
  const [hintVisible, setHintVisible] = useState(false);
  const bothIsolatorsOpen = !analysis.energizedNodes.has('fault-zone');

  return (
    <aside className="mission-panel" aria-label="Mission and event log">
      <div className="panel-heading">
        <div>
          <span className="kicker">OUTAGE MISSION</span>
          <h2>Restore without backfeed</h2>
        </div>
        <span className="mission-code">RL-01</span>
      </div>

      <p className="mission-copy">
        A cable fault tripped Source A. Isolate the damaged section, restore West campus, then pick up Riverside and the hospital from Backup Source B.
      </p>

      <ul className="goal-list">
        <Goal done={bothIsolatorsOpen}>Keep the fault de-energized</Goal>
        <Goal done={analysis.hospitalRestored}>Restore hospital service</Goal>
        <Goal done={analysis.complete}>Restore all 700 customers</Goal>
      </ul>

      <div className={`receipt receipt-${receipt.kind}`} aria-live="polite" data-testid="receipt">
        <span>{receipt.eyebrow}</span>
        <strong>{receipt.title}</strong>
        <p>{receipt.detail}</p>
      </div>

      <div className="hint-row">
        <button className="text-button" onClick={() => setHintVisible((visible) => !visible)}>
          {hintVisible ? 'Hide next-step hint' : 'Show next-step hint'}
        </button>
        {hintVisible && <p className="hint-copy">{hint}</p>}
      </div>

      <Timeline items={timeline} />
    </aside>
  );
};


import type {NetworkAnalysis} from '../types';

type Props = {
  analysis: NetworkAnalysis;
  acceptedActions: number;
  blockedAttempts: number;
};

const RuleRow = ({pass, label, detail}: {pass: boolean; label: string; detail: string}) => (
  <li className={pass ? 'rule-pass' : 'rule-pending'}>
    <span className="rule-marker" aria-hidden="true">{pass ? '✓' : '·'}</span>
    <span>
      <strong>{label}</strong>
      <small>{detail}</small>
    </span>
  </li>
);

export const StatusRail = ({analysis, acceptedActions, blockedAttempts}: Props) => {
  const isolated = !analysis.faultEnergized;
  const sourceALoad = analysis.sourceDemandMw['source-a'] ?? 0;
  const sourceBLoad = analysis.sourceDemandMw['source-b'] ?? 0;
  return (
    <aside className="status-rail" aria-label="Live restoration status">
      <div className="panel-heading">
        <div>
          <span className="kicker">LIVE STATUS</span>
          <h2>Service board</h2>
        </div>
        <span className={`system-lamp ${analysis.complete ? 'complete' : ''}`}>
          {analysis.complete ? 'COMPLETE' : 'ACTIVE'}
        </span>
      </div>

      <div className="customer-total" data-testid="customer-total">
        <span className="customer-number">{analysis.restoredCustomers}</span>
        <span className="customer-denominator">/{analysis.totalCustomers}</span>
        <span className="customer-label">customers energized</span>
      </div>

      <div className="meter" aria-label={`${analysis.restoredCustomers} of ${analysis.totalCustomers} customers restored`}>
        <span style={{width: `${(analysis.restoredCustomers / analysis.totalCustomers) * 100}%`}} />
      </div>

      <div className="rail-metrics">
        <div>
          <span>Hospital</span>
          <strong className={analysis.hospitalRestored ? 'text-live' : ''} data-testid="hospital-status">
            {analysis.hospitalRestored ? 'RESTORED' : 'OFFLINE'}
          </strong>
        </div>
        <div>
          <span>Accepted actions</span>
          <strong data-testid="accepted-count">{acceptedActions}</strong>
        </div>
        <div>
          <span>Blocked attempts</span>
          <strong data-testid="blocked-count">{blockedAttempts}</strong>
        </div>
      </div>

      <div className="rule-card">
        <span className="kicker">SAFETY GATE</span>
        <ul>
          <RuleRow
            pass={isolated}
            label="Fault stays dead"
            detail={isolated ? 'No source reaches the fault' : 'Source path detected'}
          />
          <RuleRow
            pass={!analysis.findings.some((item) => item.code === 'dual_source')}
            label="Sources separated"
            detail="No section has two supplies"
          />
          <RuleRow
            pass={!analysis.findings.some((item) => item.code === 'source_overload')}
            label="Within drill limits"
            detail={`A ${sourceALoad.toFixed(2)}/0.90 · B ${sourceBLoad.toFixed(2)}/0.75 MW`}
          />
          <RuleRow
            pass={analysis.hospitalRestored}
            label="Hospital restored"
            detail={analysis.hospitalRestored ? 'Critical service energized' : 'Still waiting for supply'}
          />
        </ul>
      </div>
    </aside>
  );
};


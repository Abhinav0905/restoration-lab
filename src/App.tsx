import {MissionPanel} from './components/MissionPanel';
import {OneLineDiagram} from './components/OneLineDiagram';
import {StatusRail} from './components/StatusRail';
import {useRestorationLab} from './hooks/useRestorationLab';

const BoltMark = () => (
  <svg viewBox="0 0 38 38" aria-hidden="true">
    <path d="M21.5 2 8 21h9l-1 15 14-21h-9.2z" />
  </svg>
);

export const App = () => {
  const lab = useRestorationLab();

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Restoration Lab home">
          <span className="brand-mark"><BoltMark /></span>
          <span>
            <strong>RESTORATION LAB</strong>
            <small>Distribution switching trainer</small>
          </span>
        </a>
        <div className="topbar-meta">
          <span className="education-badge">EDUCATIONAL SIMULATOR</span>
          <button className="secondary-button" onClick={lab.reset}>Reset drill</button>
          <button
            className="primary-button"
            onClick={lab.runDemo}
            disabled={lab.demoRunning}
            data-testid="watch-demo"
          >
            <span className="play-icon" aria-hidden="true">▶</span>
            {lab.demoRunning ? 'Demo running' : 'Watch demo'}
          </button>
        </div>
      </header>

      <section className="mission-banner" id="top">
        <div className="mission-number">01</div>
        <div>
          <span className="kicker">FAULT ISOLATION + SERVICE RESTORATION</span>
          <h1>Bring the hospital back. Keep the fault dead.</h1>
        </div>
        <div className="mission-facts">
          <span><strong>700</strong> interrupted</span>
          <span><strong>1</strong> critical load</span>
          <span><strong>4</strong> safe actions</span>
        </div>
      </section>

      <section className="workspace">
        <StatusRail
          analysis={lab.analysis}
          acceptedActions={lab.acceptedActions}
          blockedAttempts={lab.blockedAttempts}
        />
        <OneLineDiagram
          scenario={lab.scenario}
          switches={lab.switches}
          analysis={lab.analysis}
          dangerEdgeIds={lab.dangerEdgeIds}
          demoRunning={lab.demoRunning}
          onSwitch={lab.attemptSwitch}
        />
        <MissionPanel
          analysis={lab.analysis}
          receipt={lab.receipt}
          timeline={lab.timeline}
          hint={lab.hint}
        />
      </section>

      {lab.analysis.complete && (
        <section className="completion-toast" role="status" data-testid="completion-panel">
          <span className="completion-check">✓</span>
          <div>
            <span className="kicker">RESTORATION COMPLETE</span>
            <strong>700 customers restored. Fault isolated.</strong>
          </div>
          <div className="completion-score">
            <span>{lab.acceptedActions} accepted</span>
            <span>{lab.blockedAttempts} blocked</span>
          </div>
        </section>
      )}

      <footer>
        <p>Training model only. Not for operational switching, protection studies or control-system use.</p>
        <p>All data is synthetic. Every verdict is produced by local, deterministic rules.</p>
      </footer>
    </main>
  );
};


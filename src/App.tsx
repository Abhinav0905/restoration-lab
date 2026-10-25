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

      <section className="judge-brief" aria-labelledby="judge-brief-title">
        <div className="judge-brief-header">
          <div>
            <span className="kicker">THE 10-SECOND BRIEF</span>
            <h2 id="judge-brief-title">Understand the lesson before touching a switch.</h2>
          </div>
          <p>One unsafe close should teach more than another static diagram.</p>
        </div>
        <div className="brief-grid">
          <article>
            <span>01</span>
            <div>
              <h3>The problem</h3>
              <p>A cable fault has cut power to 700 customers and a community hospital. One wrong close can energize damaged cable or connect two sources.</p>
            </div>
          </article>
          <article>
            <span>02</span>
            <div>
              <h3>Why it matters</h3>
              <p>Static diagrams show equipment, not decision order. Trainees need to see why an unsafe move fails before they practice the safe sequence.</p>
            </div>
          </article>
          <article>
            <span>03</span>
            <div>
              <h3>How Restoration Lab solves it</h3>
              <p>Every proposed action is checked against four deterministic safety rules before the network changes. Unsafe moves stay blocked and name the reason.</p>
            </div>
          </article>
        </div>
        <p className="judge-start"><strong>Start here:</strong> press <b>Watch demo</b> to see one dangerous close rejected, then the safe four-action restoration.</p>
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


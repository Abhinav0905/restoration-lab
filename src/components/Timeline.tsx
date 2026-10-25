import type {TimelineItem} from '../types';

export const Timeline = ({items}: {items: TimelineItem[]}) => (
  <div className="timeline-wrap">
    <div className="timeline-heading">
      <span className="kicker">SWITCHING RECORD</span>
      <span>{items.length} events</span>
    </div>
    {items.length === 0 ? (
      <div className="timeline-empty">
        <span>01</span>
        <p>Your accepted and blocked actions will appear here.</p>
      </div>
    ) : (
      <ol className="timeline" data-testid="timeline">
        {[...items].reverse().map((item) => (
          <li key={item.id} className={item.accepted ? 'event-accepted' : 'event-blocked'}>
            <span className="event-index">{String(item.id).padStart(2, '0')}</span>
            <span className="event-mark" aria-hidden="true">{item.accepted ? '✓' : '×'}</span>
            <span>
              <strong>{item.title}</strong>
              <small>{item.detail}</small>
            </span>
          </li>
        ))}
      </ol>
    )}
  </div>
);


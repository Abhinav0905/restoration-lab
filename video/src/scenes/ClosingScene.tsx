import {Audio} from '@remotion/media';
import {interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {BasicCaptions} from '../basic-captions';
import {CaptionLayer, Eyebrow, Grid, SceneFrame, mono, palette} from '../scene-kit';

export const ClosingScene = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame, fps, config: {damping: 16, stiffness: 80}});

  return (
    <SceneFrame>
      <Grid />
      <Audio name="Closing narration" from={15} src={staticFile('audio/05-outro.wav')} premountFor={fps} />
      <div style={{position: 'absolute', left: 118, top: 110, opacity: enter}}>
        <Eyebrow>Restoration Lab · proof of concept</Eyebrow>
        <div style={{fontSize: 103, lineHeight: .99, letterSpacing: -6, fontWeight: 880, marginTop: 40, width: 1540}}>
          Learn the order.<br />
          <span style={{color: palette.green}}>See the consequence.</span><br />
          Keep the fault dead.
        </div>
      </div>

      <div style={{position: 'absolute', left: 118, top: 650, display: 'flex', gap: 14}}>
        {['FAULT ISOLATED', 'HOSPITAL RESTORED', '700 / 700'].map((label, index) => (
          <div
            key={label}
            style={{
              border: `1px solid ${palette.line}`,
              background: '#111914',
              color: index === 2 ? palette.paper : palette.green,
              padding: '20px 25px',
              fontFamily: mono,
              fontSize: 17,
              fontWeight: 800,
              letterSpacing: 1.5,
              transform: `translateY(${interpolate(enter, [0, 1], [28 + index * 10, 0])}px)`,
            }}
          >
            {index < 2 ? '✓ ' : ''}{label}
          </div>
        ))}
      </div>

      <div style={{position: 'absolute', right: 125, bottom: 105, width: 310, height: 310, border: `2px solid ${palette.line}`, borderRadius: '50%', display: 'grid', placeItems: 'center'}}>
        <div style={{fontSize: 128, color: palette.green}}>⚡</div>
      </div>

      <CaptionLayer>
        <BasicCaptions
          name="Closing captions"
          width={1570}
          captions={[
            {text: 'Restoration Lab is a focused proof of concept for learning safe restoration order.', startMs: 500, endMs: 5200, timestampMs: 2850, confidence: null, pageBreakAfter: true},
            {text: 'See the consequence before a mistake happens.', startMs: 5200, endMs: 9480, timestampMs: 7340, confidence: null},
          ]}
        />
      </CaptionLayer>
    </SceneFrame>
  );
};

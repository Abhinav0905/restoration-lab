import {Audio} from '@remotion/media';
import {interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {BasicCaptions} from '../basic-captions';
import {CaptionLayer, Eyebrow, Grid, SceneFrame, mono, palette} from '../scene-kit';

const checks = [
  ['01', 'Fault reachability', 'Does either source reach the faulted cable?'],
  ['02', 'Dual-source backfeed', 'Would two supplies meet on one section?'],
  ['03', 'Source capacity', 'Does restored demand exceed the drill limit?'],
  ['04', 'Critical load', 'Is the hospital energized in the final state?'],
] as const;

export const EvidenceScene = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <SceneFrame>
      <Grid />
      <Audio name="Evidence narration" from={15} src={staticFile('audio/04-evidence.wav')} premountFor={fps} />

      <div style={{position: 'absolute', left: 116, top: 86, width: 1688}}>
        <Eyebrow>3 · Technical details</Eyebrow>
        <div style={{fontSize: 74, fontWeight: 860, lineHeight: 1.03, letterSpacing: -4, marginTop: 22}}>
          Four checks. One plain-language receipt.
        </div>
      </div>

      <div style={{position: 'absolute', left: 116, top: 282, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, width: 1100}}>
        {checks.map(([number, title, detail], index) => {
          const reveal = interpolate(frame, [25 + index * 18, 48 + index * 18], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return (
            <div
              key={title}
              style={{
                minHeight: 176,
                padding: '26px 27px',
                border: `1px solid ${palette.line}`,
                borderLeft: `7px solid ${index === 0 ? palette.red : palette.green}`,
                background: 'rgba(16,25,19,.93)',
                opacity: reveal,
                transform: `translateY(${interpolate(reveal, [0, 1], [24, 0])}px)`,
              }}
            >
              <div style={{fontFamily: mono, color: palette.amber, fontSize: 15, letterSpacing: 2}}>{number}</div>
              <div style={{fontSize: 27, fontWeight: 820, marginTop: 12}}>{title}</div>
              <div style={{color: palette.muted, fontSize: 19, lineHeight: 1.45, marginTop: 8}}>{detail}</div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: 'absolute',
          right: 116,
          top: 282,
          width: 520,
          height: 370,
          border: `1px solid ${palette.line}`,
          background: '#0d140f',
          padding: '30px 32px',
        }}
      >
        <div style={{fontFamily: mono, color: palette.green, fontSize: 15, letterSpacing: 2.1}}>BUILD RECORD</div>
        {['scope.md', 'prd.md', 'spec.md', '6 unit tests', '3 browser tests', 'app-map.html'].map((item, index) => (
          <div
            key={item}
            style={{
              display: 'flex',
              gap: 14,
              alignItems: 'center',
              padding: '15px 0',
              borderBottom: `1px solid ${palette.line}`,
              fontFamily: mono,
              fontSize: 18,
              color: index < 3 ? palette.paper : palette.green,
            }}
          >
            <span style={{color: palette.green}}>✓</span>
            {item}
          </div>
        ))}
      </div>

      <div style={{position: 'absolute', left: 116, right: 116, bottom: 165, height: 1, background: palette.line}} />
      <div style={{position: 'absolute', left: 116, bottom: 103, color: palette.muted, fontFamily: mono, fontSize: 17}}>
        SYNTHETIC DATA · LOCAL RULES · NO OPERATIONAL CONTROL
      </div>

      <CaptionLayer>
        <BasicCaptions
          name="Evidence captions"
          width={1450}
          captions={[
            {text: 'Every verdict comes from deterministic graph checks.', startMs: 500, endMs: 3800, timestampMs: 2150, confidence: null, pageBreakAfter: true},
            {text: 'Fault reachability, dual-source backfeed, source capacity and critical-load restoration.', startMs: 3800, endMs: 9000, timestampMs: 6400, confidence: null, pageBreakAfter: true},
            {text: 'No live grid data. No operational command. No black-box answer.', startMs: 9000, endMs: 13200, timestampMs: 11100, confidence: null, pageBreakAfter: true},
            {text: 'The repo keeps the plan, tests and code tour together, so the build can be inspected.', startMs: 13200, endMs: 22250, timestampMs: 17725, confidence: null},
          ]}
        />
      </CaptionLayer>
    </SceneFrame>
  );
};

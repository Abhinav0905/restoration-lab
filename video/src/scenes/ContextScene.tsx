import {Audio} from '@remotion/media';
import {Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {BasicCaptions} from '../basic-captions';
import {CaptionLayer, Eyebrow, Grid, SceneFrame, mono, palette} from '../scene-kit';

const statCards = [
  ['700', 'customers interrupted'],
  ['1', 'critical hospital'],
  ['4', 'safe actions'],
] as const;

export const ContextScene = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const imageScale = interpolate(frame, [0, 330], [1.04, 1.0], {extrapolateRight: 'clamp'});

  return (
    <SceneFrame>
      <Grid />
      <Audio name="Concept narration" from={15} src={staticFile('audio/02-concept.wav')} premountFor={fps} />
      <Img
        src={staticFile('images/start.png')}
        style={{
          position: 'absolute',
          width: 1390,
          height: 782,
          objectFit: 'cover',
          right: -95,
          top: 118,
          transform: `scale(${imageScale})`,
          transformOrigin: 'right center',
          border: `1px solid ${palette.line}`,
          boxShadow: '0 28px 90px rgba(0,0,0,.54)',
        }}
      />
      <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #080d0a 0%, #080d0a 31%, rgba(8,13,10,.78) 50%, transparent 78%)'}} />

      <div style={{position: 'absolute', left: 116, top: 105, width: 760}}>
        <Eyebrow>2 · How we solved it</Eyebrow>
        <div style={{fontSize: 88, fontWeight: 850, lineHeight: 1.02, letterSpacing: -4.4, marginTop: 24}}>
          A decision trainer,<br />not a slide deck.
        </div>
        <p style={{fontSize: 31, color: '#c9d3cc', lineHeight: 1.42, width: 710, marginTop: 30}}>
          Every switch is interactive. Every proposed state is checked before it can alter the training network.
        </p>
        <div style={{display: 'flex', gap: 14, marginTop: 44}}>
          {statCards.map(([value, label], index) => (
            <div
              key={label}
              style={{
                width: 190,
                padding: '22px 20px',
                border: `1px solid ${index === 1 ? '#52653b' : palette.line}`,
                background: 'rgba(15,23,18,.94)',
              }}
            >
              <div style={{fontFamily: mono, fontSize: 40, fontWeight: 900, color: index === 1 ? palette.amber : palette.paper}}>{value}</div>
              <div style={{fontFamily: mono, color: palette.muted, fontSize: 14, marginTop: 9, textTransform: 'uppercase'}}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      <CaptionLayer>
        <BasicCaptions
          name="Concept captions"
          width={1570}
          captions={[
            {text: 'Restoration Lab turns high-stakes reasoning into a safe, repeatable drill.', startMs: 500, endMs: 5200, timestampMs: 2850, confidence: null, pageBreakAfter: true},
            {text: 'The one-line board is synthetic, local and built for junior distribution engineers.', startMs: 5200, endMs: 9700, timestampMs: 7450, confidence: null},
          ]}
        />
      </CaptionLayer>
    </SceneFrame>
  );
};

import {Audio} from '@remotion/media';
import {interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {BasicCaptions} from '../basic-captions';
import {CaptionLayer, Eyebrow, Grid, SceneFrame, font, palette} from '../scene-kit';

export const OpeningScene = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame, fps, config: {damping: 18, stiffness: 95}});
  const faultPulse = interpolate(frame % 36, [0, 18, 36], [0.55, 1, 0.55]);

  return (
    <SceneFrame>
      <Grid />
      <Audio name="Opening narration" from={9} src={staticFile('audio/01-intro.wav')} premountFor={fps} />
      <div
        style={{
          position: 'absolute',
          left: 118,
          top: 112,
          display: 'flex',
          alignItems: 'center',
          gap: 22,
          opacity: enter,
          transform: `translateY(${interpolate(enter, [0, 1], [38, 0])}px)`,
        }}
      >
        <div
          style={{
            width: 74,
            height: 74,
            borderRadius: '15px 15px 15px 4px',
            background: palette.green,
            color: '#08100a',
            display: 'grid',
            placeItems: 'center',
            fontSize: 43,
            fontWeight: 1000,
          }}
        >
          ⚡
        </div>
        <div>
          <div style={{fontFamily: font, fontSize: 28, fontWeight: 850, letterSpacing: 4}}>RESTORATION LAB</div>
          <div style={{color: palette.muted, fontSize: 20, marginTop: 4}}>Distribution switching trainer</div>
        </div>
      </div>

      <div style={{position: 'absolute', left: 118, top: 326, width: 1290}}>
        <Eyebrow>One fault. Four actions. Zero unsafe moves.</Eyebrow>
        <div
          style={{
            fontSize: 104,
            lineHeight: 0.98,
            fontWeight: 880,
            letterSpacing: -6,
            marginTop: 26,
            opacity: enter,
            transform: `translateX(${interpolate(enter, [0, 1], [-55, 0])}px)`,
          }}
        >
          Bring the hospital back.
          <br />
          <span style={{color: palette.green}}>Keep the fault dead.</span>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          right: 132,
          top: 340,
          width: 230,
          height: 230,
          border: `4px dashed ${palette.red}`,
          borderRadius: '50%',
          display: 'grid',
          placeItems: 'center',
          color: palette.red,
          fontSize: 90,
          opacity: faultPulse,
          boxShadow: `0 0 ${42 * faultPulse}px rgba(255,113,95,.42)`,
        }}
      >
        ⚡
      </div>

      <CaptionLayer>
        <BasicCaptions
          name="Opening captions"
          width={1450}
          captions={[
            {text: 'A fault has cut power to 700 customers, including a community hospital.', startMs: 300, endMs: 4500, timestampMs: 2400, confidence: null, pageBreakAfter: true},
            {text: 'One wrong switch can energize the damaged cable.', startMs: 4500, endMs: 7970, timestampMs: 6200, confidence: null},
          ]}
        />
      </CaptionLayer>
    </SceneFrame>
  );
};

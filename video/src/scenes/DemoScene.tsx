import {Audio, Video} from '@remotion/media';
import {Img, Sequence, staticFile, useVideoConfig} from 'remotion';
import {BasicCaptions} from '../basic-captions';
import {CaptionLayer, SceneFrame, mono, palette} from '../scene-kit';

export const DemoScene = () => {
  const {fps} = useVideoConfig();
  return (
    <SceneFrame>
      <Audio name="Demo narration" from={195} src={staticFile('audio/03-demo.wav')} premountFor={fps} />
      <div
        style={{
          position: 'absolute',
          left: 90,
          top: 54,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          zIndex: 4,
          fontFamily: mono,
          fontSize: 17,
          fontWeight: 800,
          letterSpacing: 2.2,
          color: palette.green,
        }}
      >
        <span style={{width: 12, height: 12, borderRadius: '50%', background: palette.red}} />
        4 · LIVE PROOF · DRILL RL-01
      </div>
      <div
        style={{
          position: 'absolute',
          left: 90,
          top: 92,
          width: 1740,
          height: 870,
          border: `1px solid ${palette.line}`,
          background: '#050806',
          padding: 16,
          boxShadow: '0 28px 100px rgba(0,0,0,.65)',
        }}
      >
        <Video
          name="Recorded app walkthrough"
          src={staticFile('media/restoration-lab-walkthrough.webm')}
          playbackRate={0.55}
          premountFor={fps}
          objectFit="contain"
          style={{width: '100%', height: '100%'}}
        />
        <Sequence from={805} premountFor={fps}>
          <Img
            src={staticFile('images/restored.png')}
            style={{width: '100%', height: '100%', objectFit: 'contain'}}
          />
        </Sequence>
      </div>
      <CaptionLayer>
        <BasicCaptions
          name="Demo captions"
          width={1450}
          captions={[
            {text: 'Closing Source A too soon is blocked before the network changes.', startMs: 6500, endMs: 10700, timestampMs: 8600, confidence: null, pageBreakAfter: true},
            {text: 'The exact unsafe path flashes red.', startMs: 10700, endMs: 13200, timestampMs: 11950, confidence: null, pageBreakAfter: true},
            {text: 'Now the trainee opens both isolators.', startMs: 13200, endMs: 16200, timestampMs: 14700, confidence: null, pageBreakAfter: true},
            {text: 'Source A safely restores West campus.', startMs: 16200, endMs: 19000, timestampMs: 17600, confidence: null, pageBreakAfter: true},
            {text: 'Backup Source B picks up Riverside and the hospital.', startMs: 19000, endMs: 22900, timestampMs: 20950, confidence: null, pageBreakAfter: true},
            {text: 'Four accepted actions. 700 customers restored. The fault stays dead.', startMs: 22900, endMs: 28650, timestampMs: 25775, confidence: null},
          ]}
        />
      </CaptionLayer>
    </SceneFrame>
  );
};

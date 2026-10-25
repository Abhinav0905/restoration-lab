import {Audio} from '@remotion/media';
import {Img, Sequence, staticFile, useVideoConfig} from 'remotion';
import {BasicCaptions} from '../basic-captions';
import {CaptionLayer, SceneFrame, mono, palette} from '../scene-kit';

const AppFrame = ({src, shade = false}: {src: string; shade?: boolean}) => (
  <div
    style={{
      position: 'absolute',
      left: 70,
      top: 138,
      width: 1780,
      height: 792,
      overflow: 'hidden',
      border: `2px solid ${palette.line}`,
      background: '#050806',
      boxShadow: '0 32px 110px rgba(0,0,0,.72)',
    }}
  >
    <Img
      src={staticFile(src)}
      style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top'}}
    />
    {shade ? <div style={{position: 'absolute', inset: 0, background: 'rgba(2,6,4,.38)'}} /> : null}
  </div>
);

const StageLabel = ({number, children}: {number: string; children: string}) => (
  <div
    style={{
      position: 'absolute', left: 92, top: 54, display: 'flex', alignItems: 'center', gap: 18,
      zIndex: 8, fontFamily: mono, fontSize: 27, fontWeight: 900, letterSpacing: 2.2, color: palette.paper,
    }}
  >
    <span style={{color: palette.green}}>{number}</span>
    <span style={{color: palette.muted}}>·</span>
    <span>{children}</span>
  </div>
);

export const DemoScene = () => {
  const {fps} = useVideoConfig();

  return (
    <SceneFrame>
      <Audio name="Demo narration" from={195} src={staticFile('audio/03-demo.wav')} premountFor={fps} />

      <Sequence name="Starting outage" durationInFrames={195} premountFor={fps}>
        <StageLabel number="2A">HOW THE DRILL STARTS</StageLabel>
        <AppFrame src="images/start.png" shade />
        <div
          style={{
            position: 'absolute', left: 122, top: 258, width: 940, padding: '34px 40px',
            background: 'rgba(7,14,9,.94)', borderLeft: `9px solid ${palette.amber}`,
            boxShadow: '0 24px 70px rgba(0,0,0,.62)',
          }}
        >
          <div style={{fontFamily: mono, color: palette.amber, fontSize: 22, letterSpacing: 2.4}}>THE JOB</div>
          <div style={{fontSize: 69, fontWeight: 900, lineHeight: 1.04, marginTop: 18}}>
            Isolate first.<br />Restore second.
          </div>
          <div style={{fontSize: 30, color: '#c8d3cc', lineHeight: 1.4, marginTop: 22}}>
            700 customers are out. The hospital is offline. The damaged cable must stay dead.
          </div>
        </div>
      </Sequence>

      <Sequence name="Unsafe action blocked" from={195} durationInFrames={201} premountFor={fps}>
        <StageLabel number="2B">THE SAFETY GATE REJECTS THE WRONG MOVE</StageLabel>
        <AppFrame src="images/blocked.png" shade />
        <div
          style={{
            position: 'absolute', left: 112, top: 245, width: 835, padding: '36px 42px',
            background: 'rgba(43,16,13,.96)', border: `3px solid ${palette.red}`,
            boxShadow: '0 25px 90px rgba(255,113,95,.22)',
          }}
        >
          <div style={{fontFamily: mono, color: palette.red, fontSize: 23, letterSpacing: 2.2}}>BLOCKED BEFORE COMMIT</div>
          <div style={{fontSize: 72, fontWeight: 920, lineHeight: 1.02, marginTop: 20}}>
            Fault would be energized.
          </div>
          <div style={{fontSize: 30, color: '#ffd0ca', lineHeight: 1.4, marginTop: 24}}>
            The network never changes. The unsafe path flashes red and the trainee gets a direct explanation.
          </div>
        </div>
        <div
          style={{
            position: 'absolute', right: 112, top: 282, width: 690, height: 300, overflow: 'hidden',
            border: `4px solid ${palette.red}`, background: '#090c0a',
          }}
        >
          <Img src={staticFile('images/blocked.png')} style={{position: 'absolute', width: 2240, height: 1260, left: -486, top: -530}} />
        </div>
      </Sequence>

      <Sequence name="Safe switching order" from={396} durationInFrames={291} premountFor={fps}>
        <StageLabel number="2C">THE TRAINEE CORRECTS THE ORDER</StageLabel>
        <AppFrame src="images/start.png" shade />
        <div style={{position: 'absolute', left: 125, right: 125, top: 268, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22}}>
          {[
            ['01', 'Open both isolators', 'Cut every source path to the faulted cable.'],
            ['02', 'Close Source A', 'Restore West campus from the healthy side.'],
            ['03', 'Close Backup Source B', 'Pick up Riverside and the hospital.'],
            ['04', 'Verify the receipt', '700 restored. Hospital online. Fault still dead.'],
          ].map(([number, title, detail], index) => (
            <div
              key={title}
              style={{
                minHeight: 185, padding: '29px 32px', background: 'rgba(7,15,10,.96)',
                border: `2px solid ${index === 3 ? palette.green : palette.line}`,
                borderLeft: `8px solid ${index === 3 ? palette.green : palette.amber}`,
              }}
            >
              <div style={{fontFamily: mono, color: index === 3 ? palette.green : palette.amber, fontSize: 20, letterSpacing: 2}}>{number}</div>
              <div style={{fontSize: 38, fontWeight: 880, marginTop: 11}}>{title}</div>
              <div style={{fontSize: 25, color: '#b7c3bc', lineHeight: 1.35, marginTop: 9}}>{detail}</div>
            </div>
          ))}
        </div>
      </Sequence>

      <Sequence name="Restoration confirmed" from={687} durationInFrames={213} premountFor={fps}>
        <StageLabel number="2D">THE RESULT IS EASY TO VERIFY</StageLabel>
        <AppFrame src="images/restored.png" shade />
        <div
          style={{
            position: 'absolute', left: 108, top: 256, width: 1040, padding: '34px 40px',
            background: 'rgba(7,22,12,.96)', border: `3px solid ${palette.green}`,
            boxShadow: '0 28px 90px rgba(55,242,117,.19)',
          }}
        >
          <div style={{fontFamily: mono, color: palette.green, fontSize: 23, letterSpacing: 2.2}}>RESTORATION COMPLETE</div>
          <div style={{fontSize: 86, fontWeight: 930, lineHeight: 1, marginTop: 20}}>700 / 700</div>
          <div style={{fontSize: 39, fontWeight: 820, marginTop: 20}}>Hospital restored. Fault isolated.</div>
          <div style={{fontSize: 29, color: '#c7d5cc', marginTop: 18}}>Four accepted actions. One blocked lesson. A clear switching record.</div>
        </div>
        <div style={{position: 'absolute', right: 126, top: 300, display: 'grid', gap: 18, width: 520}}>
          {['✓ FAULT STAYS DEAD', '✓ SOURCES SEPARATED', '✓ HOSPITAL RESTORED'].map((label) => (
            <div key={label} style={{padding: '24px 26px', background: 'rgba(7,22,12,.96)', border: `2px solid ${palette.green}`, color: palette.green, fontFamily: mono, fontSize: 24, fontWeight: 850}}>
              {label}
            </div>
          ))}
        </div>
      </Sequence>

      <CaptionLayer>
        <BasicCaptions
          name="Demo captions"
          width={1570}
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

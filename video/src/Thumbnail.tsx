import {Img, staticFile} from 'remotion';
import {Eyebrow, SceneFrame, palette} from './scene-kit';

export const Thumbnail = () => (
  <SceneFrame>
    <Img src={staticFile('images/restored.png')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover'}} />
    <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(5,9,6,.98) 0%, rgba(5,9,6,.91) 43%, rgba(5,9,6,.14) 79%)'}} />
    <div style={{position: 'absolute', left: 72, top: 72, width: 760}}>
      <Eyebrow>Interactive safety training</Eyebrow>
      <div style={{fontSize: 82, lineHeight: .98, letterSpacing: -4.4, fontWeight: 900, marginTop: 27}}>
        Restore power.<br /><span style={{color: palette.green}}>Keep the fault dead.</span>
      </div>
      <div style={{marginTop: 42, display: 'inline-block', padding: '15px 19px', background: palette.green, color: '#08100a', fontWeight: 900, fontSize: 22}}>
        RESTORATION LAB
      </div>
    </div>
  </SceneFrame>
);

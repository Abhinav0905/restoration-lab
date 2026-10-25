import type {CSSProperties, ReactNode} from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

export const palette = {
  background: '#080d0a',
  panel: '#111914',
  panelLight: '#172119',
  line: '#304038',
  paper: '#f0f5f1',
  muted: '#9aa89f',
  green: '#85f2a3',
  amber: '#f3bd68',
  red: '#ff715f',
};

export const font =
  'Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
export const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';

export const SceneFrame = ({children, style}: {children: ReactNode; style?: CSSProperties}) => (
  <AbsoluteFill
    style={{
      background:
        'radial-gradient(circle at 48% -20%, rgba(80, 150, 99, .22), transparent 48%), #080d0a',
      color: palette.paper,
      fontFamily: font,
      overflow: 'hidden',
      ...style,
    }}
  >
    {children}
  </AbsoluteFill>
);

export const Grid = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 0.22], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <AbsoluteFill
      style={{
        opacity,
        backgroundImage:
          'linear-gradient(rgba(255,255,255,.10) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.10) 1px, transparent 1px)',
        backgroundSize: '86px 86px',
      }}
    />
  );
};

export const Eyebrow = ({children, color = palette.amber}: {children: ReactNode; color?: string}) => (
  <div
    style={{
      color,
      fontFamily: mono,
      fontSize: 22,
      fontWeight: 800,
      letterSpacing: 3.2,
      textTransform: 'uppercase',
    }}
  >
    {children}
  </div>
);

export const CaptionLayer = ({children}: {children: ReactNode}) => (
  <div
    style={{
      position: 'absolute',
      left: 235,
      bottom: 42,
      width: 1450,
      zIndex: 20,
      transform: 'scale(.62)',
      transformOrigin: 'bottom center',
    }}
  >
    {children}
  </div>
);

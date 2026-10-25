# Restoration Lab demo video

This Remotion project turns the recorded browser drill into an 84-second, 1080p demo with scene graphics, generated narration and burned-in captions.

## Preview

```bash
npm install
npm run dev
```

Open the printed Studio URL and select `RestorationLabDemo`.

## Render

```bash
npx remotion render src/index.ts RestorationLabDemo out/restoration-lab-demo.mp4 \
  --codec=h264 --crf=18

npx remotion still src/index.ts RestorationLabThumbnail \
  out/restoration-lab-thumbnail.png
```

The source app recording is in `public/media/`. Narration clips are in `public/audio/`; the exact scripts are in `narration/`. Upload captions live at `../docs/restoration-lab-demo.srt`.

If Remotion's local renderer stalls from a parent folder containing spaces, render from a temporary path without spaces. The checked-in source remains the same.

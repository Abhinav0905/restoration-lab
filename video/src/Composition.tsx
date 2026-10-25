import {Composition, Folder, Series, Still, useVideoConfig} from 'remotion';
import {ClosingScene} from './scenes/ClosingScene';
import {ContextScene} from './scenes/ContextScene';
import {DemoScene} from './scenes/DemoScene';
import {EvidenceScene} from './scenes/EvidenceScene';
import {OpeningScene} from './scenes/OpeningScene';
import {Thumbnail} from './Thumbnail';

export const RestorationLabVideo = () => {
  const {fps} = useVideoConfig();
  return (
    <Series>
      <Series.Sequence name="Opening" durationInFrames={240} premountFor={fps}>
        <OpeningScene />
      </Series.Sequence>
      <Series.Sequence name="Concept" durationInFrames={330} premountFor={fps}>
        <ContextScene />
      </Series.Sequence>
      <Series.Sequence name="Recorded demo" durationInFrames={900} premountFor={fps}>
        <DemoScene />
      </Series.Sequence>
      <Series.Sequence name="Technical approach" durationInFrames={720} premountFor={fps}>
        <EvidenceScene />
      </Series.Sequence>
      <Series.Sequence name="Closing" durationInFrames={330} premountFor={fps}>
        <ClosingScene />
      </Series.Sequence>
    </Series>
  );
};

export const RestorationLabCompositions = () => (
  <>
    <Folder name="Scenes">
      <Composition id="Opening" component={OpeningScene} durationInFrames={240} fps={30} width={1920} height={1080} />
      <Composition id="Concept" component={ContextScene} durationInFrames={330} fps={30} width={1920} height={1080} />
      <Composition id="SafetyEvidence" component={EvidenceScene} durationInFrames={720} fps={30} width={1920} height={1080} />
      <Composition id="RecordedDemo" component={DemoScene} durationInFrames={900} fps={30} width={1920} height={1080} />
      <Composition id="Closing" component={ClosingScene} durationInFrames={330} fps={30} width={1920} height={1080} />
    </Folder>
    <Composition
      id="RestorationLabDemo"
      component={RestorationLabVideo}
      durationInFrames={2520}
      fps={30}
      width={1920}
      height={1080}
    />
    <Still id="RestorationLabThumbnail" component={Thumbnail} width={1280} height={720} />
  </>
);

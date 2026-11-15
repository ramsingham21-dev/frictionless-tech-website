import { Composition } from "remotion";
import { ScanStory } from "./ScanStory";
import { DURATION, FPS, HEIGHT, WIDTH } from "./constants";

/** Remotion Studio and render entry. The website embeds the same composition with @remotion/player. */
export const RemotionRoot = () => (
  <Composition id="ScanStory" component={ScanStory} durationInFrames={DURATION} fps={FPS} width={WIDTH} height={HEIGHT} defaultProps={{}} />
);

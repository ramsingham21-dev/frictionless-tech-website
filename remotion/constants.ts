/** Timeline for the checkout scan story. Each of the five steps gets one block of frames. */
export const FPS = 30;
export const STEP = 60;
export const STEPS = 5;
export const DURATION = STEP * STEPS; // 300 frames, 10 seconds when rendered as video
export const WIDTH = 1200;
export const HEIGHT = 960;

export const C = {
  cream: "#FCFCEE", // card stock
  peach: "#FBC02D", // product boxes: amber
  burgundy: "#161616", // ink: stage background and panel text
  deep: "#2B2B2B", // shadowed ink
  yellow: "#FBC02D", // highlighter, tags once read
  blue: "#FF8F00", // the scan: orange (key kept as "blue" so the composition needs no rename)
  red: "#C62828", // the signal and the paid stamp
  orange: "#FF8F00", // orange accent
};

/** First frame of step i (0 based). */
export const at = (step: number, offset = 0) => step * STEP + offset;

// Presentation of the existing concept only; these are not verified construction layers.
export const storyStops = [0, 0.25, 0.48, 0.72, 1] as const;
const cameras = [[2.2, 1.6, 7.4], [-1.2, 1.9, 7.5], [0.7, 1.2, 6.5], [2.4, 2.7, 9.2], [2.2, 1.6, 7.4]];
const targets = [[0, 0, 0], [0, 0.1, 0], [0, 0.25, 0.2], [0, 0.7, 0], [0, 0, 0]];
const separation = [0, 0, 0, 1, 0];
export function storyPose(progress: number, mobile: boolean, reduced: boolean) {
  const p = reduced ? 0 : Math.max(0, Math.min(1, progress));
  const i = Math.min(3, Math.max(0, storyStops.findIndex((stop, index) => index < 4 && p <= storyStops[index + 1])));
  const t = (p - storyStops[i]) / (storyStops[i + 1] - storyStops[i]);
  const ease = t * t * (3 - 2 * t);
  const mix = (a: number, b: number) => a + (b - a) * ease;
  const strength = mobile ? 0.35 : 1;
  return {
    camera: cameras[i].map((value, axis) => cameras[0][axis] + (mix(value, cameras[i + 1][axis]) - cameras[0][axis]) * strength),
    target: targets[i].map((value, axis) => targets[0][axis] + (mix(value, targets[i + 1][axis]) - targets[0][axis]) * strength),
    exploded: mix(separation[i], separation[i + 1]) * (mobile ? 0.55 : 1),
  };
}

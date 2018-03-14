import { random } from 'penplot/util/random';

export const randomCircle = (center, scale = 1) => {
  var r = random() * 2.0 * Math.PI;
  let out = [];
  out[0] = center[0] + Math.cos(r) * scale;
  out[1] = center[1] + Math.sin(r) * scale;
  return out;
};
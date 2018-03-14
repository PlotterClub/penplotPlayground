const clamp = (x, max, min = 0) => Math.max(min, Math.min(max, x));

/* TurtlePlotter
 *
 * options: {
 *  dimensions: [h, w] = [100, 100],
 *  startPosition: [x, y] = [0, 0]
 * }
 */

export default class TurtlePlotter {
  static clampNormalizer([x, y], [width, height]) {
    return [clamp(x, width), clamp(y, height)];
  }

  constructor() {
    this.lineSegments = [];
  }

  add(...points) {

  }

}
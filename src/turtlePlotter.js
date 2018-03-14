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

  constructor(options) {
    const {
      dimensions,
      startPosition = [0, 0],
      normalizer = TurtlePlotter.clampNormalizer,
    } = options;

    this.startPosition = startPosition;
    this.dimensions = dimensions

    const [width, height] = dimensions;
    this.width = width;
    this.height = height;

    this.position = [...startPosition];
    this.direction = 0;
    this.head = 'up';

    this.normalize = normalizer;

    this.points = [];
    this.lines = [];
  }

  reset() {
    this.up();
    this.position = [...startPosition];
    this.lines = [];
    this.points = [];
  }

  down() {
    if (this.head === 'down') {
      return;
    }

    this.head = 'down';
    this.points = [this.position];
    this.lines.push(this.points);
  }

  up() {
    this.head = 'up';
  }

  move(units) {
    const [x, y] = this.position;

    const deltaX = Math.cos(this.direction) * units;
    const deltaY = Math.sin(this.direction) * units;

    this.position = [x + deltaX, y + deltaY];

    if (this.head === 'down') {
      this.points.push(this.position);
    }
  }

  // degrees, not radians
  turn(units) {
    this.direction += units;
  }

  getLines() {
    return this.lines;
  }

  getUniqueLines() {
    const uniqueLines = [];

    const MARGIN = 0.02;
    const withinMargin = (a, b, margin) => Math.abs(a - b) < margin;

    const pointsEqual = (a, b) => withinMargin(a[0], b[0], MARGIN) && withinMargin(a[1], b[1], MARGIN);
    const lineSegmentsEqual = (a, b) => pointsEqual(a[0], b[0]) && pointsEqual(a[1], b[1])
      || pointsEqual(a[0], b[1]) && pointsEqual(a[1], b[0]);

    this.lines.forEach((points) => {
      points.forEach((point, idx) => {
        if (idx === points.length - 1) {
          return;
        }
        const nextPoint = points[idx + 1];

        if(uniqueLines.some(line => lineSegmentsEqual(line, [point, nextPoint]))) {
          return;
        }

        uniqueLines.push([point, nextPoint]);
      });
    });

    return uniqueLines;
  }

  getState() {
    const { direction, position } = this;

    return { direction, position };
  }

  restoreState(state) {
    const { direction, position } = state;

    this.direction = direction;
    this.position = position;
  }
}
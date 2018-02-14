import { PaperSize, Orientation } from 'penplot';
import { polylinesToSVG } from 'penplot/util/svg';
import { clipPolylinesToBox } from 'penplot/util/geom';

export const orientation = Orientation.LANDSCAPE;
export const dimensions = PaperSize.LETTER;

const [width, height] = dimensions;

function drawCircles(
  circleX,
  circleY,
  steps = 5,
  count = 20000,
  spacing = 1,
  radius = 2
) {
  circleX = circleX || width / 2;
  circleY = circleY || height / 2;
  const lines = [];
  // Draw some circles expanding outward
  for (let j = 0; j < count; j++) {
    const r = radius + j * spacing;
    const circle = [];
    for (let i = 0; i < steps; i++) {
      const t = i / Math.max(1, steps - 1);
      const angle = Math.PI * 2 * t;
      circle.push([
        circleX + Math.cos(angle) * r,
        circleY + Math.sin(angle) * r
      ]);
    }
    lines.push(circle);
  }
  return lines;
}

function renderFountain(
  drawShape,

) {

}


export default function createPlot (context, dimensions) {
  const [ width, height ] = dimensions;

  const xFactor = 1.2;
  const yFactor = 1.2;

  const centers = [];

  for (let i = 0; i < 10; i++) {
    let x = width / 2;
    let y = height / 2;
    x += i * xFactor;
    y += i * yFactor;
    centers.push([x, y]);
  }

  const circles = centers.map(coord => drawCircles(width, height, ...coord), );
  const lines = Array.prototype.concat.apply([], circles);


  // Clip all the lines to a margin
  const margin = 1.5;
  const box = [ margin, margin, width - margin, height - margin ];
  const clippedLines = clipPolylinesToBox(lines, box);

  return {
    draw,
    print,
    background: 'white',
    animate: false,
    clear: true
  };

  function draw () {
    clippedLines.forEach(points => {
      context.beginPath();
      points.forEach(p => context.lineTo(p[0], p[1]));
      context.stroke();
    });
  }

  function print () {
    return polylinesToSVG(clippedLines, {
      dimensions
    });
  }
}

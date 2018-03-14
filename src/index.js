import { PaperSize, Orientation } from 'penplot';
import { polylinesToSVG } from 'penplot/util/svg';
import { clipPolylinesToBox } from 'penplot/util/geom';

import TurtlePlotter from './turtlePlotter';
import penroseSystem from './penrose-system';

export const orientation = Orientation.LANDSCAPE;
export const dimensions = PaperSize.LETTER;



export default function createPlot (context, dimensions) {
  const [ width, height ] = dimensions;
  let lines = [];

  const start = [ width/2, height/2 ];

  const plotter = new TurtlePlotter({ dimensions, startPosition: start });

  penroseSystem(plotter, 4);

  lines = plotter.getUniqueLines();
  console.log('lines', lines);

  // Clip all the lines to a margin
  const margin = 1.5;
  const box = [ margin, margin, width - margin, height - margin ];
  lines = clipPolylinesToBox(lines, box);
  console.log(print())

  return {
    draw,
    print,
    background: 'white',
    animate: false,
    clear: true
  };

  function draw () {
    lines.forEach(points => {
      context.beginPath();
      points.forEach(p => {
        console.log('drew a line');
        context.lineTo(p[0], p[1])
      });
      context.stroke();
    });
  }

  function print () {
    return polylinesToSVG(lines, {
      dimensions
    });
  }
}
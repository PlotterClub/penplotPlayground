function degToRad(deg) {
  return deg * (Math.PI / 180);
}

export default function stackExecutor(leftAngle, rightAngle, forwardUnits) {
  const stack = [];

  const push = (p) => {
    const state = p.getState();
    stack.push(state);
  }

  const pop = (p) => {
    p.up()
    const state = stack.pop();
    p.restoreState(state);
    p.down();
  }

  const executors = {
    '-': (p) => p.turn(degToRad(-1*leftAngle)),
    '+': (p) => p.turn(degToRad(rightAngle)),
    'A': (p) => p.move(forwardUnits),
    '[': push,
    ']': pop,
  };

  return function execute(program, plotter) {
    plotter.down();

    const operations = program.split('');
    for (const op of operations) {
      const exec = executors[op];
      if (exec) {
        exec(plotter);
        const { direction } = plotter.getState();
      }
    }
  }
}
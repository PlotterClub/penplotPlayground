import LSystem from './l-system';
import stackExecutor from './stackExecutor';
function makePenroseSystem() {
  const constants = ['+', '-', '[', ']',];
  const variables = ['A', 'M', 'N', 'O', 'P'];
  const start = '[N]++[N]++[N]++[N]++[N]';
  const productions = {
    'A': '',
    'M': 'OA++PA----NA[-OA----MA]++',
    'N': '+OA--PA[---MA--NA]+',
    'O': '-MA++NA[+++OA++PA]-',
    'P': '--OA++++MA[+PA++++NA]--NA',
  };
  return new LSystem( constants, variables, start, productions, );
}
export default function penroseSystem(plotter, n = 4) {
  const system = makePenroseSystem();
  system.expand(n);
  const program = system.getState()//.slice(0,50);
  //console.log(program);
  const execute = stackExecutor(36, 36, 0.75);
  execute(program, plotter);
}
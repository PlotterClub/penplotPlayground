/*
 * constants: [char];
 * variables: [char];
 * start: string;
 * productions: { [char]: string }
 */

export default class LSystem {
  constructor(constants, variables, start, productions) {
    this.constants = constants;
    this.constantsSet = new Set(constants);

    this.variables = variables;
    this.variablesSet = new Set(variables);

    this.start = start;
    this.productions = productions;

    this.state = start.slice();
    this.runCount = 0;
  }

  isConstant(char) {
    return this.constantsSet.has(char);
  }

  isVariable(char) {
    return this.variablesSet.has(char);
  }

  getProductionFor(char) {
    if (!this.isVariable(char)) {
      return char;
    }

    if (this.productions[char] == null) {
      return char;
    }

    return this.productions[char];
  }

  expand(n = 1) {
    for (let i = 0; i < n; i++) {
      this.runCount += 1;
      let nextState = "";
      for (const char of this.state.split('')) {
        nextState += this.getProductionFor(char);
      }
      this.state = nextState;
    }
  }

  getState() {
    return this.state;
  }
}

// Stop coding and go outside!
import { immerable, produce } from "immer";

type State<T> = T;
export type Cell = [number, number]; // x, y
type Rule<T> = (world: GridWorld<T>, cell: Cell) => State<T>;

export class GridWorld<T> {
  [immerable] = true;
  private readonly grid: Array<State<T>>;

  constructor(
    public readonly width: number,
    public readonly height: number,
    public readonly defaultState: State<T>,
    public readonly rule: Rule<T>
  ) {
    this.grid = Array<State<T>>(height * width).fill(defaultState);
  }

  next(): GridWorld<T> {
    return produce(this, (world) => {
      for (let cell of this.cells()) {
        world.setCellState(cell, this.rule(this, cell));
      }
    });
  }

  *cells(): Generator<Cell> {
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        yield [i, j];
      }
    }
  }

  getCellState(cell: Cell): State<T> {
    return this.grid[this.cellToIndex(cell)];
  }

  setCellState(cell: Cell, state: State<T>): void {
    this.grid[this.cellToIndex(cell)] = state;
  }

  private cellToIndex([x, y]: Cell): number {
    if (x < 0) x = this.width + x;
    if (y < 0) y = this.height + y;
    return (y % this.height) * this.width + (x % this.width);
  }
}

export function rule1d(ruleNumber: number): Rule<Boolean> {
  return (world: GridWorld<Boolean>, [x, y]) => {
    const left = +world.getCellState([x - 1, y]);
    const center = +world.getCellState([x, y]);
    const right = +world.getCellState([x + 1, y]);
    const bitMask = 1 << ((left << 2) + (center << 1) + right);
    return !!(ruleNumber & bitMask);
  };
}

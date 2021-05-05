export type State2d = number;
export type Cell2d = [number, number];
export type Rule2d = (world: GridWorld2d, cell: Cell2d) => State2d;

export class GridWorld2d {
  readonly grid: Uint8Array;

  constructor(
    public readonly width: number,
    public readonly height: number,
    public readonly rule: Rule2d
  ) {
    this.grid = new Uint8Array(width * height);
  }

  next(): GridWorld2d {
    const nextWorld = new GridWorld2d(this.width, this.height, this.rule);
    console.time("next");
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        nextWorld.setCellState([x, y], this.rule(this, [x, y]));
      }
    }
    console.timeEnd("next");
    return nextWorld;
  }

  getCellState(cell: Cell2d): number {
    return this.grid[this.cellToIndex(cell)];
  }

  setCellState(cell: Cell2d, state: number): void {
    this.grid[this.cellToIndex(cell)] = state;
  }

  private cellToIndex([x, y]: Cell2d): number {
    const w = this.width;
    const h = this.height;
    if (x < 0) x = w + x;
    if (y < 0) y = h + y;
    return (y % h) * w + (x % w);
  }
}

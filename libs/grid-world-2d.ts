export type State2d = number;
export type Cell2d = [number, number];
export type Rule2d = (world: GridWorld2d, cell: Cell2d) => State2d;

export class GridWorld2d {
  private readonly grid: Uint8Array;

  constructor(
    public readonly width: number,
    public readonly height: number,
    public readonly initFn: (world: MutableGridWorld2d) => void = () => {},
    public readonly rule: Rule2d,
    initialize = true
  ) {
    this.grid = new Uint8Array(width * height);
    if (initialize) this.initFn((this as unknown) as MutableGridWorld2d);
  }

  clear(): GridWorld2d {
    return new GridWorld2d(
      this.width,
      this.height,
      this.initFn,
      this.rule,
      false
    );
  }

  reset(): GridWorld2d {
    return this.clear().mutate(this.initFn);
  }

  clone(): GridWorld2d {
    const cloned = this.clear();
    cloned.grid.set(this.grid);
    return cloned;
  }

  mutate(mutateFn: (w: MutableGridWorld2d) => void): GridWorld2d {
    const draft = this.clone() as MutableGridWorld2d;
    mutateFn(draft);
    return draft;
  }

  next(): GridWorld2d {
    const nextWorld = this.clear();
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        nextWorld.setCellState([x, y], this.rule(this, [x, y]));
      }
    }
    return nextWorld;
  }

  getCellState(cell: Cell2d): number {
    return this.grid[this.cellToIndex(cell)];
  }

  protected setCellState(cell: Cell2d, state: number): void {
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

export class MutableGridWorld2d extends GridWorld2d {
  public setCellState(cell: Cell2d, state: number) {
    super.setCellState(cell, state);
  }
}

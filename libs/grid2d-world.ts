import { mod } from "./utils";

export type State = number;
export type Cell2d = [number, number];
export type Rule2d = (world: Grid2dWorld, cell: Cell2d) => State;

export class Grid2dWorld {
  private readonly grid: Uint8Array;

  constructor(
    public readonly width: number,
    public readonly height: number,
    public readonly initFn: (world: MutableGrid2dWorld) => void = () => {},
    public readonly rule: Rule2d,
    public readonly history = new UndoHistory<Grid2dWorld>(1000),
    initialize = true
  ) {
    this.grid = new Uint8Array(width * height);
    if (initialize) this.initFn((this as unknown) as MutableGrid2dWorld);
  }

  clear(keepHistory: boolean = true): Grid2dWorld {
    const newWorld = new Grid2dWorld(
      this.width,
      this.height,
      this.initFn,
      this.rule,
      keepHistory ? this.history : undefined,
      false
    );
    if (keepHistory) newWorld.history.add(newWorld);
    return newWorld;
  }

  reset(): Grid2dWorld {
    return this.clear(false).mutate(this.initFn);
  }

  clone(): Grid2dWorld {
    const cloned = this.clear(true);
    cloned.grid.set(this.grid);
    return cloned;
  }

  mutate(mutateFn: (w: MutableGrid2dWorld) => void): Grid2dWorld {
    const draft = this.clone() as MutableGrid2dWorld;
    mutateFn(draft);
    return draft;
  }

  next(): Grid2dWorld {
    const nextWorld = this.clear(true);
    for (let cell of this.iterate()) {
      nextWorld.setCellState(cell, this.rule(this, cell));
    }
    return nextWorld;
  }

  *iterate(): Generator<Cell2d> {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        yield [x, y];
      }
    }
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

export class MutableGrid2dWorld extends Grid2dWorld {
  public setCellState(cell: Cell2d, state: number) {
    super.setCellState(cell, state);
  }
}

class UndoHistory<T> {
  private readonly items: T[];
  private size: number = 0;
  private current: number = -1;
  private last: number = -1;

  constructor(public readonly capacity: number) {
    this.items = new Array<T>(capacity);
  }

  public add(item: T) {
    this.current = mod(this.current + 1, this.capacity);
    this.items[this.current] = item;
    this.size = Math.min(this.capacity, this.size + 1);
    this.last = this.current;
  }

  public undo(): T {
    if (this.canUndo()) {
      this.current = mod(this.current - 1, this.capacity);
      this.size = Math.max(0, this.size - 1);
    }
    return this.items[this.current];
  }

  public redo(): T {
    if (this.canRedo()) {
      this.current = mod(this.current + 1, this.capacity);
      this.size = Math.min(this.capacity, this.size + 1);
    }
    return this.items[this.current];
  }

  public canUndo() {
    return this.size > 1;
  }

  public canRedo() {
    return this.current !== this.last;
  }
}

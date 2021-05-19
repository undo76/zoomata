import { Cell2d, MutableGrid2dWorld, State } from "./grid2d-world";

type Patch2d = (State | null)[][];

export function randomizeWorld(world: MutableGrid2dWorld) {
  for (const cell of world.iterate()) {
    world.setCellState(cell, +(Math.random() > 0.5));
  }
}

export function drawCircleInWorld(
  world: MutableGrid2dWorld,
  [cx, cy]: Cell2d,
  radius: number,
  state: State = 1
) {
  for (const [x, y] of world.iterate()) {
    if ((x - cx) ** 2 + (y - cy) ** 2 <= radius ** 2) {
      world.setCellState([x, y], state);
    }
  }
}

export function drawPatchInWorld(
  world: MutableGrid2dWorld,
  patch: Patch2d,
  [minX, minY]: Cell2d
) {
  for (const [x, y] of world.iterate()) {
    let stateValue = patch[y][x];
    if (stateValue !== null) {
      world.setCellState([x + minX, y + minY], stateValue);
    }
  }
}

export function mooreNeighborhood([x, y]: Cell2d): Cell2d[] {
  // prettier-ignore
  return [
    [x - 1, y - 1], [x, y - 1], [x + 1, y - 1],
    [x - 1, y], [x + 1, y],
    [x - 1, y + 1], [x, y + 1], [x + 1, y + 1],
  ];
}

export function vonNeumannNeighborhood([x, y]: Cell2d): Cell2d[] {
  // prettier-ignore
  return [
    [x, y - 1],
    [x - 1, y], [x + 1, y],
    [x, y + 1]
  ];
}

export function stringToPatch(
  str: string,
  emptyChar = " ",
  emptyValue: State | null = null,
  values = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
): Patch2d {
  return str
    .split("\n")
    .filter((line) => line.length > 0)
    .map((line) =>
      Array.from(line).map((c) =>
        c === emptyChar ? emptyValue : values.indexOf(c)
      )
    );
}

export function mod(a: number, b: number): number {
  return ((a % b) + b) % b;
}

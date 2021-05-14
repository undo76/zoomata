import { Cell2d, MutableGrid2dWorld, State } from "./grid2d-world";

type Patch2d = (State | null)[][];

export function randomizeWorld(world: MutableGrid2dWorld) {
  for (let x = 0; x < world.width; x++) {
    for (let y = 0; y < world.height; y++) {
      world.setCellState([x, y], +(Math.random() > 0.5));
    }
  }
}

export function drawCircleInWorld(
  world: MutableGrid2dWorld,
  [cx, cy]: Cell2d,
  radius: number
) {
  for (let x = 0; x < world.width; x++) {
    for (let y = 0; y < world.height; y++) {
      world.setCellState(
        [x, y],
        +((x - cx) ** 2 + (y - cy) ** 2 <= radius ** 2)
      );
    }
  }
}

export function drawPatchInWorld(
  world: MutableGrid2dWorld,
  patch: Patch2d,
  [minX, minY]: Cell2d
) {
  for (let y = 0; y < patch.length; y++) {
    for (let x = 0; x < patch[y].length; x++) {
      let stateValue = patch[y][x];
      if (stateValue !== null) {
        world.setCellState([x + minX, y + minY], stateValue);
      }
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

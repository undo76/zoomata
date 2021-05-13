import { Cell2d, MutableGridWorld2d } from "./grid-world-2d";

export function randomizeWorld(world: MutableGridWorld2d) {
  for (let x = 0; x < world.width; x++) {
    for (let y = 0; y < world.height; y++) {
      world.setCellState([x, y], +(Math.random() > 0.5));
    }
  }
}

export function drawCircleInWorld(
  world: MutableGridWorld2d,
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

function stringToCellValues(
  str: string,
  emptyChar = " ",
  emptyValue = 0
): (number | typeof emptyValue)[] {
  const chars: string[] = Array.from(new Set(str))
    .filter((c) => c !== emptyChar)
    .sort();
  return Array.from(str).map((c) =>
    c === emptyChar ? emptyValue : chars.indexOf(c)
  );
}

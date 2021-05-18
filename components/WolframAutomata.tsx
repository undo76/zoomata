import React, { useCallback } from "react";
import { ColorMap, GridCanvas } from "./GridCanvas";
import { Cell2d, Grid2dWorld, Rule2d } from "../libs/grid2d-world";
import { drawRectCell } from "../libs/canvas-utils";

export interface WolframAutomataProps {
  rule: number;
  width: number;
  steps: number;
  editable?: boolean;
  colorMapping?: ColorMap;
}

export const WolframAutomata: React.FC<WolframAutomataProps> = ({
  rule,
  width,
  steps,
  editable = false,
  colorMapping = ["#f6e7ba", "rgb(35,46,62)"],
}) => {
  const world = computeSteps(rule, width, steps);
  const fillStyleFn = useCallback(
    (cell) => colorMapping[world.getCellState(cell)],
    [world, colorMapping]
  );
  return (
    <GridCanvas
      cellWidth={Math.round(1000 / width)}
      cellHeight={Math.round(1000 / width)}
      padding={1}
      cols={width}
      rows={steps}
      editable={editable}
      drawCell={(...params) => drawRectCell(fillStyleFn, ...params)}
    />
  );
};

function computeSteps(rule: number, width: number, steps: number): Grid2dWorld {
  const world = new Grid2dWorld(width, steps, undefined, wolframRule(rule));
  return world.mutate((draft) => {
    draft.setCellState([Math.floor(width / 2), 0], 1);
    for (let y = 0; y < steps; y++) {
      for (let x = 0; x < width; x++) {
        draft.setCellState([x, y], draft.rule(draft, [x, y]));
      }
    }
  });
}

function wolfram1dNeighborhood([x, y]: Cell2d): Cell2d[] {
  return [
    [x - 1, y - 1],
    [x, y - 1],
    [x + 1, y - 1],
  ];
}

function wolframRule(ruleNumber: number): Rule2d {
  return (world: Grid2dWorld, cell: Cell2d) => {
    if (cell[1] === 0) return world.getCellState(cell);
    else {
      const [left, center, right] = wolfram1dNeighborhood(cell).map((n) =>
        world.getCellState(n)
      );
      const bitMask = 1 << ((left << 2) + (center << 1) + right);
      return +((ruleNumber & bitMask) > 0);
    }
  };
}

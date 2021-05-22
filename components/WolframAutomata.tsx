import React, { useCallback } from "react";
import { ColorMap, GridCanvas } from "./GridCanvas";
import { Cell2d, CellRule2d, Grid2dWorld } from "../libs/grid2d-world";
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

function computeSteps(
  ruleNumber: number,
  width: number,
  steps: number
): Grid2dWorld {
  const world = new Grid2dWorld(
    width,
    steps,
    (draft) => {
      draft.setCellState([Math.floor(width / 2), 0], 1);
    },
    () => {}
  );
  const rule = wolframRule(ruleNumber);
  return world.mutate((draft) => {
    for (const cell of draft) {
      draft.setCellState(cell, rule(draft, cell));
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

function wolframRule(ruleNumber: number): CellRule2d {
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

import React, { useCallback, useMemo } from "react";
import { ColorMap, GridCanvas } from "./GridCanvas";
import { Cell2d, GridWorld2d, Rule2d } from "../libs/grid-world-2d";

export interface WolframAutomataProps {
  rule: number;
  width: number;
  steps: number;
  editable?: boolean;
  colorMap?: ColorMap;
}

export const WolframAutomata: React.FC<WolframAutomataProps> = ({
  rule,
  width,
  steps,
  editable = false,
  colorMap = ["#f1e5c3", "rgb(31, 41, 55)"],
}) => {
  const world = computeSteps(rule, width, steps);
  const fillStyleFn = useCallback(
    ([x, y]) => colorMap[world.getCellState([x, y])],
    [world, colorMap]
  );
  return (
    <GridCanvas
      cellWidth={Math.round(1000 / width)}
      cellHeight={Math.round(1000 / width)}
      padding={1}
      cols={width}
      rows={steps}
      editable={editable}
      fillStyleFn={fillStyleFn}
    />
  );
};

function computeSteps(rule: number, width: number, steps: number): GridWorld2d {
  const world = new GridWorld2d(width, steps, undefined, wolframRule(rule));
  return world.mutate((draft) => {
    draft.setCellState([Math.floor(width / 2), 0], 1);
    for (let y = 0; y < steps; y++) {
      for (let x = 0; x < width; x++) {
        draft.setCellState([x, y], draft.rule(draft, [x, y]));
      }
    }
  });
}

function wolframRule(ruleNumber: number): Rule2d {
  return (world: GridWorld2d, [x, y]: Cell2d) => {
    if (y === 0) return world.getCellState([x, y]);
    else {
      const left = world.getCellState([x - 1, y - 1]);
      const center = world.getCellState([x, y - 1]);
      const right = world.getCellState([x + 1, y - 1]);
      const bitMask = 1 << ((left << 2) + (center << 1) + right);
      return +((ruleNumber & bitMask) > 0);
    }
  };
}

import React, { useCallback, useMemo } from "react";
import { ColorMap, GridCanvas } from "./GridCanvas";
import { Cell2d, GridWorld2d, Rule2d } from "../libs/grid-world2d";

export interface WolframAutomataProps {
  rule: number;
  width: number;
  steps: number;
  colorMap?: ColorMap;
}

export const WolframAutomata: React.FC<WolframAutomataProps> = ({
  rule,
  width,
  steps,
  colorMap = ["#f1e5c3", "rgb(31, 41, 55)"],
}) => {
  let world = useMemo(() => computeSteps(rule, width, steps), [
    rule,
    width,
    steps,
  ]);
  const fillStyleFn = useCallback(
    ([x, y]) => colorMap[world.getCellState([x, y])],
    [world, colorMap]
  );
  return (
    <GridCanvas
      cellWidth={Math.round(1000 / width)}
      cellHeight={Math.round(1000 / width)}
      cols={width}
      rows={steps}
      fillStyleFn={fillStyleFn}
    />
  );
};

function computeSteps(rule: number, width: number, steps: number): GridWorld2d {
  // This is an optimization to prevent creating a new grid every step.
  // It works because in a 1-D automata each row depends only of the previous row so we don't need
  // to use a copy of the whole previous world.
  // TODO: A better alternative would be to create a step-aware GridWorld1d.
  console.time("computeSteps");
  let world = new GridWorld2d(width, steps, wolframRule(rule));
  world.setCellState([Math.floor(width / 2), 0], 1);
  for (let y = 0; y < steps; y++) {
    for (let x = 0; x < width; x++) {
      world.setCellState([x, y], world.rule(world, [x, y]));
    }
  }
  console.timeEnd("computeSteps");
  return world;
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

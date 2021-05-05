import React, { useCallback } from "react";
import { ColorMap, GridCanvas } from "./GridCanvas";
import { GridWorld2d } from "../libs/grid-world2d";

export interface Grid2dAutomataProps {
  world: GridWorld2d;
  colorMap?: ColorMap;
}

export const Grid2dAutomata: React.FC<Grid2dAutomataProps> = ({
  world,
  colorMap = ["#ddd", "#5c0707"],
}) => {
  const fillStyleFn = ([x, y]: [number, number]) =>
    colorMap[world.getCellState([x, y])];
  return (
    <GridCanvas
      cellWidth={Math.round(500 / world.width)}
      cellHeight={Math.round(500 / world.width)}
      padding={1}
      cols={world.width}
      rows={world.height}
      fillStyleFn={fillStyleFn}
      onClick={(cell) => world.setCellState(cell, +!world.getCellState(cell))}
    />
  );
};

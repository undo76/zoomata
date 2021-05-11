import React, { Dispatch, SetStateAction } from "react";
import { ColorMap, GridCanvas } from "./GridCanvas";
import { Cell2d, GridWorld2d } from "../libs/grid-world-2d";

export interface Grid2dAutomataProps {
  world: GridWorld2d;
  setWorld?: Dispatch<SetStateAction<GridWorld2d>>;
  colorMap?: ColorMap;
  editable?: boolean;
}

export const GridWorld2dAutomata: React.FC<Grid2dAutomataProps> = ({
  world,
  setWorld,
  colorMap = ["#ddd", "#5c0707"],
  editable = false,
}) => {
  const fillStyleFn = ([x, y]: [number, number]) =>
    colorMap[world.getCellState([x, y])];
  return (
    <GridCanvas
      cellWidth={Math.round(1000 / world.width)}
      cellHeight={Math.round(1000 / world.width)}
      padding={1}
      cols={world.width}
      rows={world.height}
      fillStyleFn={fillStyleFn}
      editable={editable}
      onClick={(cell: Cell2d) => {
        if (editable && setWorld)
          setWorld((world) =>
            world.mutate((draft) =>
              draft.setCellState(cell, +!world.getCellState(cell))
            )
          );
      }}
    />
  );
};

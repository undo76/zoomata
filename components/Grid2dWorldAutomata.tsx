import React, { Dispatch, SetStateAction } from "react";
import { ColorMap, GridCanvas } from "./GridCanvas";
import { Cell2d, Grid2dWorld, MutableGrid2dWorld } from "../libs/grid2d-world";
import { drawPatchInWorld, stringToPatch } from "../libs/utils";
import { patches } from "../libs/patches";

export interface Grid2dWorldAutomataProps {
  world: Grid2dWorld;
  setWorld?: Dispatch<SetStateAction<Grid2dWorld>>;
  colorMapping?: ColorMap;
  editable?: boolean;
}

function handleEdit(
  world: Grid2dWorld,
  draft: MutableGrid2dWorld,
  cell: [number, number]
) {
  draft.setCellState(cell, +!world.getCellState(cell));
  // (draft) => drawPatchInWorld(draft, patches.gliderRightDown, cell)
}

export const Grid2dWorldAutomata: React.FC<Grid2dWorldAutomataProps> = ({
  world,
  setWorld,
  colorMapping = ["#ddd", "#5c0707"],
  editable = false,
}) => {
  const fillStyleFn = ([x, y]: [number, number]) =>
    colorMapping[world.getCellState([x, y])];
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
            world.mutate((draft) => handleEdit(world, draft, cell))
          );
      }}
    />
  );
};

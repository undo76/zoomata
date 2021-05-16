import React, { Dispatch, SetStateAction } from "react";
import { ColorMap, DrawCell, GridCanvas } from "./GridCanvas";
import { Cell2d, Grid2dWorld, MutableGrid2dWorld } from "../libs/grid2d-world";
import { drawRectCell } from "../libs/canvas-utils";

export interface Grid2dWorldAutomataProps {
  world: Grid2dWorld;
  setWorld?: Dispatch<SetStateAction<Grid2dWorld>>;
  colorMapping: ColorMap;
  editable?: boolean;
}

function handleEdit(
  world: Grid2dWorld,
  draft: MutableGrid2dWorld,
  cell: Cell2d
) {
  draft.setCellState(cell, +!world.getCellState(cell));
  // (draft) => drawPatchInWorld(draft, patches.gliderRightDown, cell)
}

export const Grid2dWorldAutomata: React.FC<Grid2dWorldAutomataProps> = React.memo(
  ({ world, setWorld, colorMapping, editable = false }) => {
    const fillStyleFn = (cell: Cell2d) =>
      colorMapping[world.getCellState(cell)];
    const drawCell: DrawCell = (...args) => drawRectCell(fillStyleFn, ...args);
    const onClick =
      editable && setWorld
        ? (cell: Cell2d) =>
            setWorld((world) =>
              world.mutate((draft) => handleEdit(world, draft, cell))
            )
        : undefined;
    return (
      <GridCanvas
        cellWidth={Math.round(1000 / world.width)}
        cellHeight={Math.round(1000 / world.width)}
        padding={1}
        cols={world.width}
        rows={world.height}
        editable={editable}
        drawCell={drawCell}
        onClick={onClick}
      />
    );
  }
);

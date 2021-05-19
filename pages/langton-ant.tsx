import {
  Cell2d,
  cellRule,
  Grid2dWorld,
  MutableGrid2dWorld,
  State,
} from "../libs/grid2d-world";
import { vonNeumannNeighborhood } from "../libs/utils";
import { Grid2dWorldAutomataPage } from "../components/Grid2dWorldAutomataPage";

enum CellState {
  OFF,
  ON,
}

enum AntState {
  NONE,
  NORTH,
  EAST,
  SOUTH,
  WEST,
}

function encodeState(antState: AntState, cellState: CellState): State {
  return (antState << 1) + cellState;
}

function decodeState(state: State): [AntState, CellState] {
  return [state >> 1, state & 1];
}

function turn(antState: AntState, cellState: CellState): AntState {
  switch (antState) {
    case AntState.NONE:
      return AntState.NONE;
    case AntState.NORTH:
      return cellState === CellState.ON ? AntState.WEST : AntState.EAST;
    case AntState.EAST:
      return cellState === CellState.ON ? AntState.NORTH : AntState.SOUTH;
    case AntState.SOUTH:
      return cellState === CellState.ON ? AntState.EAST : AntState.WEST;
    case AntState.WEST:
      return cellState === CellState.ON ? AntState.SOUTH : AntState.NORTH;
  }
}

function forward(antState: AntState, [x, y]: Cell2d): Cell2d {
  switch (antState) {
    case AntState.NONE:
      return [x, y];
    case AntState.NORTH:
      return [x, y - 1];
    case AntState.EAST:
      return [x + 1, y];
    case AntState.SOUTH:
      return [x, y + 1];
    case AntState.WEST:
      return [x - 1, y];
  }
}

export const langtonAntRule = (
  current: Grid2dWorld,
  draft: MutableGrid2dWorld
) => {
  for (const cell of current.iterate()) {
    const [antState, cellState] = decodeState(current.getCellState(cell));
    if (antState !== AntState.NONE) {
      const nextAntState = turn(antState, cellState);
      const nextAntCell = forward(nextAntState, cell);
      const [_, nextAntCellState] = decodeState(
        current.getCellState(nextAntCell)
      );
      draft.setCellState(cell, encodeState(AntState.NONE, cellState ^ 1));
      draft.setCellState(
        nextAntCell,
        encodeState(nextAntState, nextAntCellState)
      );
      return; // Just one ant in the world
    }
  }
};

// Not used, less efficient
export const langtonAntRuleByCell = cellRule(
  (world: Grid2dWorld, cell: Cell2d): State => {
    const state = world.getCellState(cell);
    const [antState, cellState] = decodeState(state);
    switch (antState) {
      case AntState.NONE:
        const nbs = vonNeumannNeighborhood(cell).map((n) =>
          turn(...decodeState(world.getCellState(n)))
        );
        const [n, w, e, s] = nbs;
        if (
          n === AntState.SOUTH ||
          e === AntState.WEST ||
          s === AntState.NORTH ||
          w === AntState.EAST
        ) {
          return encodeState(nbs.find((s) => s !== AntState.NONE)!, cellState);
        } else {
          return state;
        }
      default:
        return encodeState(AntState.NONE, cellState ^ 1);
    }
  }
);

export default function LangtonAnt() {
  return (
    <Grid2dWorldAutomataPage
      title="Langton's ant"
      initFn={(w) =>
        w.setCellState(
          [Math.floor(w.width / 2), Math.floor(w.height / 2)],
          encodeState(AntState.NORTH, CellState.OFF)
        )
      }
      initialColorMapping={[
        "#ddd",
        "#222",
        "#f00",
        "#f00",
        "#f00",
        "#f00",
        "#f00",
        "#f00",
        "#f00",
        "#f00",
      ]}
      rule={langtonAntRule}
    />
  );
}

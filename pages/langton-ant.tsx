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

function findAnt(
  world: Grid2dWorld
): [Cell2d, AntState, CellState] | undefined {
  for (const cell of world) {
    const [antState, cellState] = decodeState(world.getCellState(cell));
    if (antState !== AntState.NONE) {
      return [cell, antState, cellState];
    }
  }
}

export const langtonAntRule = (
  current: Grid2dWorld,
  draft: MutableGrid2dWorld
) => {
  const ant = findAnt(current);
  if (ant) {
    const [antCell, antState, cellState] = ant;
    const nextAntState = turn(antState, cellState);
    const nextAntCell = forward(nextAntState, antCell);
    const [_, nextAntCellState] = decodeState(
      current.getCellState(nextAntCell)
    );
    draft.setCellState(antCell, encodeState(AntState.NONE, cellState ^ 1));
    draft.setCellState(
      nextAntCell,
      encodeState(nextAntState, nextAntCellState)
    );
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
        "#dddddd",
        "#222222",
        "#ff0000",
        "#ff0000",
        "#ff0000",
        "#ff0000",
        "#ff0000",
        "#ff0000",
        "#ff0000",
        "#ff0000",
      ]}
      rule={langtonAntRule}
    />
  );
}

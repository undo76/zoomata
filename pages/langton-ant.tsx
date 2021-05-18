import { Cell2d, Grid2dWorld, State } from "../libs/grid2d-world";
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

function turn(antState: AntState, cellState: CellState) {
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

export function langtonAntRule(world: Grid2dWorld, cell: Cell2d): State {
  const state = world.getCellState(cell);
  const [antState, cellState] = decodeState(state);
  switch (antState) {
    case AntState.NONE:
      const [n, w, e, s] = vonNeumannNeighborhood(cell)
        .map((n) => decodeState(world.getCellState(n)))
        .map((d) => turn(...d));
      if (
        n === AntState.SOUTH ||
        e === AntState.WEST ||
        s === AntState.NORTH ||
        w === AntState.EAST
      ) {
        return encodeState(
          [n, e, s, w].find((s) => s !== AntState.NONE)!,
          cellState
        );
      }
      return state;
    default:
      return encodeState(AntState.NONE, cellState ^ 1);
  }
}

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

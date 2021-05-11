import { mooreNeighborhood, randomizeWorld } from "../libs/utils";
import { GridWorld2dAutomataPage } from "../components/GridWorld2dAutomataPage";
import { Cell2d, GridWorld2d, State2d } from "../libs/grid-world-2d";

export function gameOfLifeRule(world: GridWorld2d, cell: Cell2d): State2d {
  const count = mooreNeighborhood(cell)
    .map((c) => world.getCellState(c))
    .reduce((sum, current) => sum + current, 0);
  if (count === 3) {
    return 1;
  } else if (count < 2 || count > 3) {
    return 0;
  } else {
    return world.getCellState(cell);
  }
}

export default function GameOfLifePage() {
  return (
    <GridWorld2dAutomataPage
      title="Game of life"
      initFn={randomizeWorld}
      rule={gameOfLifeRule}
    />
  );
}

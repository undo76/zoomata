import { mooreNeighborhood, randomizeWorld } from "../libs/utils";
import { Grid2dWorldAutomataPage } from "../components/Grid2dWorldAutomataPage";
import { Cell2d, cellRule, Grid2dWorld, State } from "../libs/grid2d-world";

export const gameOfLifeRule = cellRule(
  (world: Grid2dWorld, cell: Cell2d): State => {
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
);

export default function GameOfLifePage() {
  return (
    <Grid2dWorldAutomataPage
      title="Game of life"
      initFn={randomizeWorld}
      rule={gameOfLifeRule}
    />
  );
}

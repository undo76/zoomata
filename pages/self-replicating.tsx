import { Cell2d, Grid2dWorld, State } from "../libs/grid2d-world";
import { drawCircleInWorld, vonNeumannNeighborhood } from "../libs/utils";
import { Grid2dWorldAutomataPage } from "../components/Grid2dWorldAutomataPage";

export function selfReproducingRule(world: Grid2dWorld, cell: Cell2d): State {
  return (
    vonNeumannNeighborhood(cell)
      .map((c) => world.getCellState(c))
      .reduce((sum, current) => sum + current, 0) % 2
  );
}

export default function SelfReplicating() {
  return (
    <Grid2dWorldAutomataPage
      title="Self-replicating"
      initFn={(w) =>
        drawCircleInWorld(
          w,
          [Math.floor(w.width / 2), Math.floor(w.height / 2)],
          3
        )
      }
      rule={selfReproducingRule}
    />
  );
}

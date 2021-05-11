import { Cell2d, GridWorld2d, State2d } from "../libs/grid-world-2d";
import { drawCircleInWorld, vonNeumannNeighborhood } from "../libs/utils";
import { GridWorld2dAutomataPage } from "../components/GridWorld2dAutomataPage";

export function selfReproducingRule(world: GridWorld2d, cell: Cell2d): State2d {
  return (
    vonNeumannNeighborhood(cell)
      .map((c) => world.getCellState(c))
      .reduce((sum, current) => sum + current, 0) % 2
  );
}

export default function SelfReproducing() {
  return (
    <GridWorld2dAutomataPage
      title="Self-reproducing cellular automata"
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

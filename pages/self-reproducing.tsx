import { PageLayout } from "../components/PageLayout";
import { useCallback } from "react";
import { Cell2d, GridWorld2d, State2d } from "../libs/grid-world2d";
import { Grid2dAutomata } from "../components/Grid2dAutomata";
import { useAnimatedWorld } from "../libs/use-animated-world";
import { AnimationControls } from "../components/animation-controls";

function selfReproducingRule(world: GridWorld2d, [x, y]: Cell2d): State2d {
  // prettier-ignore
  const neighbours: Cell2d[] = [
    [x, y - 1],
    [x - 1, y], [x + 1, y],
    [x, y + 1]
  ];
  return (
    neighbours
      .map((c) => world.getCellState(c))
      .reduce((sum, current) => sum + current, 0) % 2
  );
}

function drawCircle(world: GridWorld2d, [cx, cy]: Cell2d, radius: number) {
  for (let x = 0; x < world.width; x++) {
    for (let y = 0; y < world.height; y++) {
      world.setCellState(
        [x, y],
        +((x - cx) ** 2 + (y - cy) ** 2 <= radius ** 2)
      );
    }
  }
  return world;
}

export default function SelfReproducing() {
  const initFn = useCallback((w) => drawCircle(w, [50, 50], 3), []);
  const [
    world,
    running,
    setRunning,
    handleReset,
    handleClear,
  ] = useAnimatedWorld(100, 100, initFn, selfReproducingRule, 10);
  return (
    <PageLayout title="Self-reproducing">
      <AnimationControls
        setRunning={setRunning}
        running={running}
        onReset={handleReset}
        onClear={handleClear}
      />
      <div className="rounded rounded-lg overflow-hidden mt-2 p-1 shadow-lg bg-white">
        <Grid2dAutomata world={world} />
      </div>
    </PageLayout>
  );
}

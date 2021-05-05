import { PageLayout } from "../components/PageLayout";
import { Cell2d, GridWorld2d, State2d } from "../libs/grid-world2d";
import { Grid2dAutomata } from "../components/Grid2dAutomata";
import { useAnimatedWorld } from "../libs/use-animated-world";
import { AnimationControls } from "../components/animation-controls";

function gameOfLifeRule(world: GridWorld2d, [x, y]: Cell2d): State2d {
  // prettier-ignore
  const neighbors: Cell2d[] = [
    [x - 1, y - 1], [x, y - 1], [x + 1, y - 1],
    [x - 1, y], [x + 1, y],
    [x - 1, y + 1], [x, y + 1], [x + 1, y + 1],
  ];
  const count = neighbors
    .map((c) => world.getCellState(c))
    .reduce((sum, current) => sum + current, 0);
  if (count === 3) {
    return 1;
  } else if (count < 2 || count > 3) {
    return 0;
  } else {
    return world.getCellState([x, y]);
  }
}

function randomizeWorld(world: GridWorld2d) {
  for (let [k, v] of world.grid.entries()) {
    world.grid[k] = +(Math.random() > 0.5);
  }
  return world;
}

export default function GameOfLife() {
  const [
    world,
    running,
    setRunning,
    handleReset,
    handleClear,
  ] = useAnimatedWorld(100, 100, randomizeWorld, gameOfLifeRule, 10);
  return (
    <PageLayout title="Game of Life">
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

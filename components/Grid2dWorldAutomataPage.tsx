import { useAnimatedIterable } from "../libs/use-animated";
import { Grid2dWorld, MutableGrid2dWorld, Rule2d } from "../libs/grid2d-world";
import { PageLayout } from "./PageLayout";
import { Grid2dWorldAutomata } from "./Grid2dWorldAutomata";
import { AnimationControls } from "./AnimationControls";
import React from "react";

export interface GridWorld2dAutomataPageProps {
  title: string;
  initFn: (w: MutableGrid2dWorld) => void;
  rule: Rule2d;
}

export const Grid2dWorldAutomataPage: React.FC<GridWorld2dAutomataPageProps> = ({
  title,
  initFn,
  rule,
}) => {
  const [world, setWorld, running, setRunning] = useAnimatedIterable(
    () => new Grid2dWorld(100, 100, initFn, rule),
    0
  );
  return (
    <PageLayout title={title}>
      <div className="relative rounded rounded-lg overflow-hidden mb-2 p-1 shadow-lg bg-white">
        <div className="rounded overflow-hidden">
          <Grid2dWorldAutomata world={world} editable setWorld={setWorld} />
        </div>
        <div className="absolute bottom-2 left-2">
          <AnimationControls
            setRunning={setRunning}
            running={running}
            canUndo={world.history.canUndo()}
            canRedo={world.history.canRedo()}
            onStep={() => setWorld((w) => w.next())}
            onReset={() => setWorld((w) => w.reset())}
            onClear={() => setWorld((w) => w.clear())}
            onUndo={() => setWorld((w) => w.history.undo()!)}
            onRedo={() => setWorld((w) => w.history.redo()!)}
          />
        </div>
      </div>
    </PageLayout>
  );
};

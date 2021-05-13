import { useAnimatedIterable } from "../libs/use-animated";
import { GridWorld2d, MutableGridWorld2d, Rule2d } from "../libs/grid-world-2d";
import { PageLayout } from "./PageLayout";
import { GridWorld2dAutomata } from "./GridWorld2dAutomata";
import { AnimationControls } from "./AnimationControls";
import React from "react";

export interface GridWorld2dAutomataPageProps {
  title: string;
  initFn: (w: MutableGridWorld2d) => void;
  rule: Rule2d;
}

export const GridWorld2dAutomataPage: React.FC<GridWorld2dAutomataPageProps> = ({
  title,
  initFn,
  rule,
}) => {
  const [world, setWorld, running, setRunning] = useAnimatedIterable(
    () => new GridWorld2d(100, 100, initFn, rule),
    10
  );
  return (
    <PageLayout title={title}>
      <div className="rounded rounded-lg overflow-hidden mb-2 p-1 shadow-lg bg-white">
        <GridWorld2dAutomata world={world} editable setWorld={setWorld} />
        <div className="mt-1">
          <AnimationControls
            setRunning={setRunning}
            running={running}
            onStep={() => setWorld((w) => w.next())}
            onReset={() => setWorld((w) => w.reset())}
            onClear={() => setWorld((w) => w.clear())}
          />
        </div>
      </div>
    </PageLayout>
  );
};

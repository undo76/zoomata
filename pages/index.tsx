import { PageLayout } from "../components/PageLayout";
import { WolframAutomata } from "../components/WolframAutomata";
import { useAnimatedIterable } from "../libs/use-animated";
import { gameOfLifeRule } from "./game-of-life";
import { drawCircleInWorld, randomizeWorld } from "../libs/utils";
import { selfReproducingRule } from "./self-reproducing";
import React from "react";
import { GridWorld2dAutomata } from "../components/GridWorld2dAutomata";
import { GridWorld2d, MutableGridWorld2d } from "../libs/grid-world-2d";
import { AnimationControls } from "../components/AnimationControls";

const circleInitFn = (w: MutableGridWorld2d) =>
  drawCircleInWorld(w, [25, 25], 3);

export default function Dashboard() {
  return (
    <PageLayout title="Gallery">
      <div className="flex space-x-1">
        <Widget title="Wolfram 1D">
          <WolframAutomata rule={30} width={50} steps={50} />
        </Widget>

        <AnimatedGridWorld2Widget
          title="Self-reproducing"
          initialState={() =>
            new GridWorld2d(50, 50, circleInitFn, selfReproducingRule)
          }
          delay={100}
        />

        <AnimatedGridWorld2Widget
          title="Game of life"
          initialState={() =>
            new GridWorld2d(50, 50, randomizeWorld, gameOfLifeRule)
          }
          delay={100}
        />
      </div>
    </PageLayout>
  );
}

const Widget: React.FC<{ title: string }> = ({ title, children }) => {
  return (
    <div className="rounded rounded-lg overflow-hidden p-1 shadow-lg bg-white relative">
      <div className="absolute top-2 left-2 p-0.5 px-2 bg-gray-800 bg-opacity-75 text-white font-semibold rounded">
        {title}
      </div>
      {children}
    </div>
  );
};

const AnimatedGridWorld2Widget: React.FC<{
  title: string;
  initialState: GridWorld2d | (() => GridWorld2d);
  delay: number;
}> = ({ title, initialState, delay, children }) => {
  const [world, setWorld, running, setRunning] = useAnimatedIterable(
    initialState,
    delay
  );
  return (
    <Widget title={title}>
      <GridWorld2dAutomata world={world} />
      <div className="absolute p-1 bottom-1">
        <AnimationControls
          setRunning={setRunning}
          running={running}
          onStep={() => setWorld((w) => w.next())}
          onReset={() => setWorld((w) => w.reset())}
          onClear={() => setWorld((w) => w.clear())}
        />
      </div>
    </Widget>
  );
};

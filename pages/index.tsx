import { PageLayout } from "../components/PageLayout";
import { WolframAutomata } from "../components/WolframAutomata";
import { useAnimatedIterable } from "../libs/use-animated";
import { gameOfLifeRule } from "./game-of-life";
import { drawCircleInWorld, randomizeWorld } from "../libs/utils";
import { selfReproducingRule } from "./self-reproducing";
import React from "react";
import { Grid2dWorldAutomata } from "../components/Grid2dWorldAutomata";
import { Grid2dWorld, MutableGrid2dWorld } from "../libs/grid2d-world";
import Link from "next/link";

const circleInitFn = (w: MutableGrid2dWorld) =>
  drawCircleInWorld(w, [25, 25], 3);

export default function Dashboard() {
  return (
    <PageLayout title="Gallery">
      <div className="flex space-x-1">
        <Link href="/wolfram">
          <a>
            <Widget title="Wolfram 1D">
              <WolframAutomata rule={30} width={50} steps={50} />
            </Widget>
          </a>
        </Link>

        <Link href="/self-reproducing">
          <a>
            <AnimatedGridWorld2Widget
              title="Self-reproducing"
              initialState={() =>
                new Grid2dWorld(50, 50, circleInitFn, selfReproducingRule)
              }
              delay={100}
            />
          </a>
        </Link>
        <Link href="/game-of-life">
          <a>
            <AnimatedGridWorld2Widget
              title="Game of life"
              initialState={() =>
                new Grid2dWorld(50, 50, randomizeWorld, gameOfLifeRule)
              }
              delay={100}
            />
          </a>
        </Link>
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
  initialState: Grid2dWorld | (() => Grid2dWorld);
  delay: number;
}> = ({ title, initialState, delay, children }) => {
  const [world, setWorld, running, setRunning] = useAnimatedIterable(
    initialState,
    delay
  );
  return (
    <Widget title={title}>
      <Grid2dWorldAutomata world={world} />
    </Widget>
  );
};

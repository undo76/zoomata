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
import { ColorMap } from "../components/GridCanvas";

const circleInitFn = (w: MutableGrid2dWorld) =>
  drawCircleInWorld(w, [25, 25], 3);

export default function Gallery() {
  return (
    <PageLayout title="Gallery">
      <div className="flex flex-wrap">
        <Widget title="Wolfram 1D" href="/wolfram">
          <WolframAutomata rule={30} width={50} steps={50} />
        </Widget>

        <AnimatedGridWorld2Widget
          title="Self-reproducing"
          href="/self-reproducing"
          initialState={() =>
            new Grid2dWorld(50, 50, circleInitFn, selfReproducingRule)
          }
          colorMapping={["#f6f5da", "#011936"]}
          delay={100}
        />

        <AnimatedGridWorld2Widget
          title="Game of life"
          href="/game-of-life"
          initialState={() =>
            new Grid2dWorld(50, 50, randomizeWorld, gameOfLifeRule)
          }
          colorMapping={["#ddd", "#400202"]}
          delay={100}
        />
      </div>
    </PageLayout>
  );
}

let Widget: React.FC<{
  title: string;
  href: string;
}> = ({ title, href, children }) => {
  return (
    <Link href={href}>
      <a
        href={href}
        className="relative block overflow-hidden p-px w-1/2 bg-white"
      >
        <div className="absolute top-2 left-2 p-0.5 px-2 bg-gray-800 bg-opacity-75 text-white font-semibold rounded">
          {title}
        </div>
        {children}
      </a>
    </Link>
  );
};

const AnimatedGridWorld2Widget: React.FC<{
  title: string;
  href: string;
  initialState: Grid2dWorld | (() => Grid2dWorld);
  colorMapping: ColorMap;
  delay: number;
}> = ({ title, href, initialState, colorMapping, delay }) => {
  const [world] = useAnimatedIterable(initialState, delay);
  return (
    <Widget title={title} href={href}>
      <Grid2dWorldAutomata world={world} colorMapping={colorMapping} />
    </Widget>
  );
};

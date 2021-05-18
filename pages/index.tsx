import { PageLayout } from "../components/PageLayout";
import { WolframAutomata } from "../components/WolframAutomata";
import { useAnimatedIterable } from "../libs/use-animated";
import { gameOfLifeRule } from "./game-of-life";
import { drawCircleInWorld, randomizeWorld } from "../libs/utils";
import { selfReproducingRule } from "./self-replicating";
import React from "react";
import { Grid2dWorldAutomata } from "../components/Grid2dWorldAutomata";
import { Grid2dWorld, MutableGrid2dWorld } from "../libs/grid2d-world";
import Link from "next/link";
import { ColorMap } from "../components/GridCanvas";
import { langtonAntRule } from "./langton-ant";

const circleInitFn = (w: MutableGrid2dWorld) =>
  drawCircleInWorld(w, [25, 25], 3);

const singleDotInitFn = (w: MutableGrid2dWorld) =>
  w.setCellState([Math.floor(w.width / 2), Math.floor(w.height / 2)], 2);

export default function Gallery() {
  return (
    <PageLayout title="Gallery">
      <div className="flex flex-wrap">
        <Widget title="Wolfram 1D" href="/wolfram">
          <WolframAutomata rule={30} width={51} steps={51} />
        </Widget>

        <AnimatedGridWorld2Widget
          title="Replicating"
          href="/self-replicating"
          initialState={() =>
            new Grid2dWorld(51, 51, circleInitFn, selfReproducingRule)
          }
          colorMapping={["#f1d3d7", "#011936"]}
          delay={100}
        />

        <AnimatedGridWorld2Widget
          title="Game of life"
          href="/game-of-life"
          initialState={() =>
            new Grid2dWorld(51, 51, randomizeWorld, gameOfLifeRule)
          }
          colorMapping={["#ddd", "#400202"]}
          delay={100}
        />

        <AnimatedGridWorld2Widget
          title="Langton's ant"
          href="/langton-ant"
          initialState={() =>
            new Grid2dWorld(51, 51, singleDotInitFn, langtonAntRule)
          }
          colorMapping={[
            "#ded",
            "#030",
            "#f00",
            "#f00",
            "#f00",
            "#f00",
            "#f00",
            "#f00",
            "#f00",
            "#f00",
          ]}
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
    <div className="p-2 w-1/2 md:w-1/3">
      <Link href={href}>
        <a
          href={href}
          className="relative block bg-white p-1 rounded shadow transition-shadow transition-transform transform scale-100 hover:shadow-lg hover:scale-105"
        >
          <div className="absolute top-2 left-2 p-0.5 px-2 bg-gray-100 bg-opacity-95 text-gray-700 font-medium rounded">
            {title}
          </div>
          {children}
        </a>
      </Link>
    </div>
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

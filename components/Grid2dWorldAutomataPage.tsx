import { useAnimatedIterable } from "../libs/use-animated";
import {
  Grid2dWorld,
  MutableGrid2dWorld,
  WorldRule2d,
} from "../libs/grid2d-world";
import { PageLayout } from "./PageLayout";
import { Grid2dWorldAutomata } from "./Grid2dWorldAutomata";
import { AnimationControls } from "./AnimationControls";
import React, { useCallback, useState } from "react";
import { ColorMap } from "./GridCanvas";
import { Grid2dWorldAutomataSettings } from "./Grid2dWorldAutomataSettings";
import { AdjustmentsIcon } from "@heroicons/react/outline";

export interface GridWorld2dAutomataPageProps {
  title: string;
  initFn: (w: MutableGrid2dWorld) => void;
  rule: WorldRule2d;
  initialDelay?: number;
  initialColorMapping?: ColorMap;
}

export const Grid2dWorldAutomataPage: React.FC<GridWorld2dAutomataPageProps> = ({
  title,
  initFn,
  rule,
  initialDelay = 50,
  initialColorMapping = ["#dddddd", "#2d0000"],
}) => {
  const [delay, setDelay] = useState(initialDelay);
  const [colorMapping, setColorMapping] = useState(() => initialColorMapping);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [world, setWorld, running, setRunning] = useAnimatedIterable(
    () => new Grid2dWorld(100, 100, initFn, rule),
    delay
  );

  return (
    <PageLayout
      title={title}
      actions={
        <button className="h-8 w-8" onClick={() => setSettingsOpen(true)}>
          <AdjustmentsIcon className="stroke-current text-gray-400 hover:text-gray-500" />
          <span className="sr-only">Settings</span>
        </button>
      }
    >
      <div className="relative rounded overflow-hidden mb-2 p-1 shadow-lg bg-white">
        <Grid2dWorldAutomata
          world={world}
          editable
          setWorld={setWorld}
          colorMapping={colorMapping}
        />
        <div className="absolute bottom-2 left-2">
          <AnimationControls
            setRunning={setRunning}
            running={running}
            canUndo={world.history.canUndo()}
            canRedo={world.history.canRedo()}
            onStep={useCallback(() => setWorld((w) => w.next()), [setWorld])}
            onReset={useCallback(() => setWorld((w) => w.reset()), [setWorld])}
            onClear={useCallback(() => setWorld((w) => w.clear()), [setWorld])}
            onUndo={useCallback(() => setWorld((w) => w.history.undo()!), [
              setWorld,
            ])}
            onRedo={useCallback(() => setWorld((w) => w.history.redo()!), [
              setWorld,
            ])}
            onSettings={useCallback(() => setSettingsOpen((open) => !open), [
              setSettingsOpen,
            ])}
          />
        </div>
      </div>

      <Grid2dWorldAutomataSettings
        open={settingsOpen}
        setOpen={setSettingsOpen}
        world={world}
        setWorld={setWorld}
        delay={delay}
        setDelay={setDelay}
        colorMapping={colorMapping}
        setColorMapping={setColorMapping}
      />
    </PageLayout>
  );
};

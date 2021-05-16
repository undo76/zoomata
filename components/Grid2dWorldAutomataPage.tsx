import { useAnimatedIterable } from "../libs/use-animated";
import { Grid2dWorld, MutableGrid2dWorld, Rule2d } from "../libs/grid2d-world";
import { PageLayout } from "./PageLayout";
import { Grid2dWorldAutomata } from "./Grid2dWorldAutomata";
import { AnimationControls } from "./AnimationControls";
import React, { useCallback, useState } from "react";
import { ColorMap } from "./GridCanvas";
import { SettingsPanel } from "./SettingsPanel";
import { InputField } from "./InputField";

export interface GridWorld2dAutomataPageProps {
  title: string;
  initFn: (w: MutableGrid2dWorld) => void;
  rule: Rule2d;
  initialDelay?: number;
  initialColorMapping?: ColorMap;
}

export const Grid2dWorldAutomataPage: React.FC<GridWorld2dAutomataPageProps> = ({
  title,
  initFn,
  rule,
  initialDelay = 50,
  initialColorMapping = ["#ddd", "#2d0000"],
}) => {
  const [delay, setDelay] = useState(initialDelay);
  const [colorMapping, setColorMapping] = useState(() => initialColorMapping);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [world, setWorld, running, setRunning] = useAnimatedIterable(
    () => new Grid2dWorld(100, 100, initFn, rule),
    delay
  );

  return (
    <PageLayout title={title}>
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

      <SettingsPanel
        title="Settings"
        open={settingsOpen}
        setOpen={setSettingsOpen}
      >
        <div className="flex flex-col space-y-4">
          <div className="flex space-x-2 items-center">
            <InputField label="Width" name="width">
              <input
                type="number"
                placeholder="0-1000"
                min={1}
                max={1000}
                value={world.width}
                onChange={(ev) =>
                  setWorld((world) => {
                    const width = parseInt(ev.target.value, 10);
                    return new Grid2dWorld(
                      width,
                      world.height,
                      world.initFn,
                      world.rule
                    );
                  })
                }
              />
            </InputField>
            <InputField label="Height" name="height">
              <input
                type="number"
                placeholder="0-1000"
                min={1}
                max={1000}
                value={world.height}
                onChange={(ev) =>
                  setWorld((world) => {
                    const height = parseInt(ev.target.value, 10);
                    return new Grid2dWorld(
                      world.width,
                      height,
                      world.initFn,
                      world.rule
                    );
                  })
                }
              />
            </InputField>
          </div>
          <div className="w-24">
            <InputField label="Delay" name="delay">
              <input
                type="number"
                placeholder="0-1000"
                min={0}
                max={10000}
                value={delay}
                onChange={(ev) => setDelay(parseInt(ev.target.value, 10))}
              />
            </InputField>
          </div>
        </div>
      </SettingsPanel>
    </PageLayout>
  );
};

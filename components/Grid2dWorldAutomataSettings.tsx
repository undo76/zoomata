import React, { Dispatch, SetStateAction } from "react";
import { Grid2dWorld } from "../libs/grid2d-world";
import { SettingsPanel } from "./SettingsPanel";
import { InputField } from "./InputField";

export interface Grid2dWorldAutomataSettingsProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  world: Grid2dWorld;
  setWorld: Dispatch<SetStateAction<Grid2dWorld>>;
  delay: number;
  setDelay: Dispatch<SetStateAction<number>>;
}

export const Grid2dWorldAutomataSettings: React.FC<Grid2dWorldAutomataSettingsProps> = React.memo(
  ({ delay, open, setDelay, setOpen, setWorld, world: { height, width } }) => {
    return (
      <SettingsPanel title="Settings" open={open} setOpen={setOpen}>
        <div className="flex flex-col space-y-4">
          <div className="flex space-x-2 items-center">
            <InputField label="Width" name="width">
              <input
                type="number"
                placeholder="0-1000"
                min={1}
                max={1000}
                value={width}
                onChange={(ev) =>
                  setWorld((world) => {
                    const width = parseInt(ev.target.value, 10) || 1;
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
                value={height}
                onChange={(ev) =>
                  setWorld((world) => {
                    const height = parseInt(ev.target.value, 10) || 1;
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
                onChange={(ev) => setDelay(parseInt(ev.target.value, 10) || 0)}
              />
            </InputField>
          </div>
        </div>
      </SettingsPanel>
    );
  }
);

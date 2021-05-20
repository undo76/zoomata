import React, { Dispatch, SetStateAction } from "react";
import { Grid2dWorld } from "../libs/grid2d-world";
import { SettingsPanel } from "./SettingsPanel";
import { defaultInputClassName, InputField } from "./InputField";
import classNames from "../libs/class-names";
import { ColorMap } from "./GridCanvas";

export interface Grid2dWorldAutomataSettingsProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  world: Grid2dWorld;
  setWorld: Dispatch<SetStateAction<Grid2dWorld>>;
  delay: number;
  setDelay: Dispatch<SetStateAction<number>>;
  colorMapping: ColorMap;
  setColorMapping: Dispatch<SetStateAction<ColorMap>>;
}

export const Grid2dWorldAutomataSettings: React.FC<Grid2dWorldAutomataSettingsProps> = React.memo(
  ({
    delay,
    open,
    setDelay,
    setOpen,
    setWorld,
    world: { height, width },
    colorMapping,
    setColorMapping,
  }) => {
    const setColor = (idx: number, value: string) => {
      setColorMapping((cm: ColorMap) => {
        (cm = [...cm])[idx] = value;
        return cm;
      });
    };
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
          <div>
            <h4 className="mt-2 uppercase font-semibold text-sm text-gray-500">
              Colors
            </h4>
          </div>
          <div className="flex flex-wrap">
            {colorMapping.map((c, idx) => (
              <div
                key={idx}
                className="w-11 h-11 rounded-full overflow-hidden border-opacity-30 m-1 shadow"
              >
                <input
                  type="color"
                  name={`color-${idx}`}
                  className={classNames(" w-16 h-16 -m-2.5")}
                  onChange={(ev) => setColor(idx, ev.target.value)}
                  value={colorMapping[idx]}
                />
              </div>
            ))}
          </div>
        </div>
      </SettingsPanel>
    );
  }
);

import { defaultInputClassName, InputField } from "./InputField";
import React, { Dispatch, SetStateAction } from "react";
import classNames from "../libs/class-names";

interface WolframAutomataFormProps {
  rule: number;
  width: number;
  steps: number;
  colorMapping: string[];
  setRule: Dispatch<SetStateAction<number>>;
  setWidth: Dispatch<SetStateAction<number>>;
  setSteps: Dispatch<SetStateAction<number>>;
  setColorMapping: Dispatch<SetStateAction<string[]>>;
}

export const WolframAutomataSettings: React.FC<WolframAutomataFormProps> = ({
  rule,
  width,
  steps,
  colorMapping,
  setRule,
  setWidth,
  setSteps,
  setColorMapping,
}) => {
  const setColor = (idx: number, value: string) => {
    setColorMapping((cm: string[]) => {
      (cm = [...cm])[idx] = value;
      return cm;
    });
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="w-24">
        <InputField label="Rule" name="rule">
          <input
            type="number"
            placeholder="0-255"
            min={0}
            max={255}
            value={rule}
            onChange={(ev) => setRule(parseInt(ev.target.value, 10) || 0)}
          />
        </InputField>
      </div>
      <div className="flex space-x-2 items-center">
        <InputField label="Width" name="width">
          <input
            type="number"
            placeholder="0-1000"
            min={1}
            max={1000}
            value={width}
            onChange={(ev) => setWidth(parseInt(ev.target.value, 10) || 0)}
          />
        </InputField>
        <InputField label="Steps" name="steps">
          <input
            type="number"
            placeholder="0-1000"
            min={1}
            max={1000}
            value={steps}
            onChange={(ev) => setSteps(parseInt(ev.target.value, 10) || 0)}
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
  );
};

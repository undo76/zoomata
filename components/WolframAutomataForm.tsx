import { InputField } from "./InputField";
import React from "react";

interface FormState {
  rule: number;
  width: number;
  steps: number;
}

interface WolframAutomataFormProps {
  state: FormState;
  setState: (s: FormState) => void;
}

export const WolframAutomataForm: React.FC<WolframAutomataFormProps> = ({
  state,
  setState,
}) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="w-24">
        <InputField label="Rule" name="rule">
          <input
            type="number"
            placeholder="0-255"
            min={0}
            max={255}
            value={state.rule}
            onChange={(ev) =>
              setState({
                ...state,
                rule: parseInt(ev.target.value, 10) || 0,
              })
            }
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
            value={state.width}
            onChange={(ev) =>
              setState({
                ...state,
                width: parseInt(ev.target.value, 10) || 0,
              })
            }
          />
        </InputField>
        <InputField label="Steps" name="steps">
          <input
            type="number"
            placeholder="0-1000"
            min={1}
            max={1000}
            value={state.steps}
            onChange={(ev) =>
              setState({
                ...state,
                steps: parseInt(ev.target.value, 10) || 0,
              })
            }
          />
        </InputField>
      </div>
    </div>
  );
};

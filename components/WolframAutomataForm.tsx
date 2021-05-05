import { InputField } from "./InputField";
import React, { useRef } from "react";

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
    <div className="mb-4 bg-white overflow-hidden shadow sm:rounded-lg">
      <div className="flex px-4 py-5 sm:p-6 space-x-4">
        <InputField label="Rule" id="rule">
          <input
            type="number"
            name="rule"
            id="rule"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="0-255"
            min={0}
            max={255}
            value={state.rule}
            onChange={(ev) =>
              setState({
                ...state,
                rule: parseInt(ev.target.value, 10),
              })
            }
          />
        </InputField>
        <InputField label="Width" id="width">
          <input
            type="number"
            name="width"
            id="width"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="0-1000"
            min={1}
            max={1000}
            value={state.width}
            onChange={(ev) =>
              setState({
                ...state,
                width: parseInt(ev.target.value, 10),
              })
            }
          />
        </InputField>
        <InputField label="Steps" id="steps">
          <input
            type="number"
            name="steps"
            id="steps"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="0-1000"
            min={1}
            max={1000}
            value={state.steps}
            onChange={(ev) =>
              setState({
                ...state,
                steps: parseInt(ev.target.value, 10),
              })
            }
          />
        </InputField>
      </div>
    </div>
  );
};

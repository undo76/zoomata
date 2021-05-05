import {
  PauseIcon,
  PlayIcon,
  RefreshIcon,
  TrashIcon,
  ArrowRightIcon,
} from "@heroicons/react/outline";
import React from "react";
import { Button } from "./Button";

interface AnimationControlsProps {
  setRunning: (running: boolean) => void;
  running: boolean;
  onStep: () => void;
  onReset: () => void;
  onClear: () => void;
}

export const AnimationControls: React.FC<AnimationControlsProps> = ({
  setRunning,
  running,
  onStep,
  onReset,
  onClear,
}) => {
  return (
    <div className="flex space-x-1">
      <Button onClick={() => setRunning(!running)}>
        {running ? (
          <PauseIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
        ) : (
          <PlayIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
        )}
        {running ? "Pause" : "Run"}
      </Button>

      {!running && (
        <>
          <Button onClick={onStep}>
            <ArrowRightIcon
              className="-ml-0.5 mr-2 h-4 w-4"
              aria-hidden="true"
            />
            Step
          </Button>
          <Button onClick={onReset}>
            <RefreshIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            Reset
          </Button>
          <Button onClick={onClear}>
            <TrashIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            Clear
          </Button>
        </>
      )}
    </div>
  );
};

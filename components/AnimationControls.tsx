import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PauseIcon,
  PlayIcon,
  RefreshIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import React from "react";
import { Button } from "./Button";
import { ButtonGroup } from "./ButtonGroup";

interface AnimationControlsProps {
  setRunning: (running: boolean) => void;
  running: boolean;
  canUndo: boolean;
  canRedo: boolean;
  onStep: () => void;
  onReset: () => void;
  onClear: () => void;
  onUndo: () => void;
  onRedo: () => void;
}

export const AnimationControls: React.FC<AnimationControlsProps> = ({
  setRunning,
  running,
  canUndo,
  canRedo,
  onStep,
  onReset,
  onClear,
  onUndo,
  onRedo,
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

          <ButtonGroup>
            <Button onClick={onUndo} disabled={!canUndo}>
              <span className="sr-only">Undo</span>
              <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button onClick={onRedo} disabled={!canRedo}>
              <span className="sr-only">Redo</span>
              <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
          </ButtonGroup>

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

import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CogIcon,
  PauseIcon,
  PlayIcon,
  RefreshIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import React, { useEffect } from "react";
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
  onSettings: () => void;
}

export const AnimationControls: React.FC<AnimationControlsProps> = React.memo(
  ({
    setRunning,
    running,
    canUndo,
    canRedo,
    onStep,
    onReset,
    onClear,
    onUndo,
    onRedo,
    onSettings,
  }) => {
    const iconClassName = "sm:-ml-0.5 sm:mr-2 h-4 w-4";
    return (
      <div className="flex space-x-1 opacity-[90%]">
        <Button onClick={() => setRunning(!running)}>
          {running ? (
            <PauseIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
          ) : (
            <PlayIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
          )}
          <span>{running ? "Pause" : "Run"}</span>
        </Button>

        {!running && (
          <>
            <Button onClick={onStep}>
              <ArrowRightIcon
                className="sm:-ml-0.5 sm:mr-2 h-4 w-4"
                aria-hidden="true"
              />
              <span className="hidden sm:block">Step</span>
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
              <RefreshIcon className={iconClassName} aria-hidden="true" />
              <span className="hidden sm:block">Reset</span>
            </Button>

            <Button onClick={onClear}>
              <TrashIcon className={iconClassName} aria-hidden="true" />
              <span className="hidden sm:block">Clear</span>
            </Button>

            <Button onClick={onSettings}>
              <CogIcon className={iconClassName} aria-hidden="true" />
              <span className="hidden sm:block">Settings</span>
            </Button>
          </>
        )}
      </div>
    );
  }
);

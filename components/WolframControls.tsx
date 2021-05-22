import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import React from "react";
import { Button } from "./Button";
import { ButtonGroup } from "./ButtonGroup";

interface WolframControlsProps {
  rule: number;
  minRule: number;
  maxRule: number;
  onPrevious: () => void;
  onNext: () => void;
}

export const WolframControls: React.FC<WolframControlsProps> = React.memo(
  ({ rule, onPrevious, onNext, minRule, maxRule }) => {
    return (
      <div className="flex space-x-1 justify-between opacity-[95%]">
        <div className="mr-2 px-2 py-1 bg-gray-700 text-gray-100 text-xl text-center font-semibold rounded border-gray-100 border-2 w-16">
          {rule}
        </div>
        <ButtonGroup>
          <Button onClick={onPrevious} disabled={rule <= minRule}>
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
          </Button>

          <Button onClick={onNext} disabled={rule >= maxRule}>
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
        </ButtonGroup>
      </div>
    );
  }
);

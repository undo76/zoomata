import { WolframAutomata } from "../components/WolframAutomata";
import { PageLayout } from "../components/PageLayout";
import React, { useState } from "react";
import { WolframAutomataSettings } from "../components/WolframAutomataSettings";
import { SettingsPanel } from "../components/SettingsPanel";
import { Button } from "../components/Button";
import { AdjustmentsIcon, CogIcon } from "@heroicons/react/outline";
import { WolframControls } from "../components/WolframControls";

export default function Wolfram() {
  const [rule, setRule] = useState(30);
  const [width, setWidth] = useState(100);
  const [steps, setSteps] = useState(100);
  const [colorMapping, setColorMapping] = useState(["#eeeeee", "#000000"]);
  const [settingsOpen, setSettingsOpen] = useState(false);
  return (
    <PageLayout
      title="Wolfram"
      actions={
        <button className="h-8 w-8" onClick={() => setSettingsOpen(true)}>
          <AdjustmentsIcon className="stroke-current text-gray-400 hover:text-gray-500" />
          <span className="sr-only">Settings</span>
        </button>
      }
    >
      <div className="relative rounded overflow-hidden p-1 shadow-lg bg-white">
        <WolframAutomata
          rule={rule}
          width={width}
          steps={steps}
          colorMapping={colorMapping}
        />
        <div className="absolute top-2 left-2 right-2">
          <WolframControls
            rule={rule}
            minRule={0}
            maxRule={255}
            onPrevious={() => setRule((rule) => rule - 1)}
            onNext={() => setRule((rule) => rule + 1)}
          />
        </div>
      </div>
      <SettingsPanel
        title="Settings"
        open={settingsOpen}
        setOpen={setSettingsOpen}
      >
        <WolframAutomataSettings
          rule={rule}
          width={width}
          steps={steps}
          colorMapping={colorMapping}
          setRule={setRule}
          setWidth={setWidth}
          setSteps={setSteps}
          setColorMapping={setColorMapping}
        />
      </SettingsPanel>
    </PageLayout>
  );
}

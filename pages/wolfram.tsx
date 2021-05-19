import { WolframAutomata } from "../components/WolframAutomata";
import { PageLayout } from "../components/PageLayout";
import React, { useState } from "react";
import { WolframAutomataForm } from "../components/WolframAutomataForm";
import { SettingsPanel } from "../components/SettingsPanel";
import { Button } from "../components/Button";
import { CogIcon } from "@heroicons/react/outline";
import { WolframControls } from "../components/WolframControls";

export default function Wolfram() {
  let [state, setState] = useState({
    rule: 110,
    width: 100,
    steps: 100,
  });
  const { rule, width, steps } = state;
  const [settingsOpen, setSettingsOpen] = useState(false);
  return (
    <PageLayout
      title="Wolfram"
      actions={
        <Button onClick={() => setSettingsOpen(true)} icon={CogIcon}>
          <span className="hidden sm:block">Settings</span>
        </Button>
      }
    >
      <div className="relative rounded overflow-hidden p-1 shadow-lg bg-white">
        <WolframAutomata rule={rule} width={width} steps={steps} />
        <div className="absolute bottom-2 left-2">
          <WolframControls
            rule={rule}
            minRule={0}
            maxRule={255}
            onPrevious={() =>
              setState(({ rule, ...state }) => ({
                ...state,
                rule: rule - 1,
              }))
            }
            onNext={() =>
              setState(({ rule, ...state }) => ({
                ...state,
                rule: rule + 1,
              }))
            }
          />
        </div>
      </div>
      <SettingsPanel
        title="Settings"
        open={settingsOpen}
        setOpen={setSettingsOpen}
      >
        <WolframAutomataForm state={state} setState={setState} />
      </SettingsPanel>
    </PageLayout>
  );
}

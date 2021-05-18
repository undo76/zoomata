import { WolframAutomata } from "../components/WolframAutomata";
import { PageLayout } from "../components/PageLayout";
import React, { useState } from "react";
import { WolframAutomataForm } from "../components/WolframAutomataForm";
import { SettingsPanel } from "../components/SettingsPanel";
import { Button } from "../components/Button";
import { CogIcon } from "@heroicons/react/outline";

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
      <div className="rounded overflow-hidden p-1 shadow-lg bg-white">
        <WolframAutomata rule={rule} width={width} steps={steps} />
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

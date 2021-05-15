import { WolframAutomata } from "../components/WolframAutomata";
import { PageLayout } from "../components/PageLayout";
import { useState } from "react";
import { WolframAutomataForm } from "../components/WolframAutomataForm";

export default function Wolfram() {
  let [state, setState] = useState({
    rule: 110,
    width: 100,
    steps: 100,
  });
  const { rule, width, steps } = state;
  return (
    <PageLayout title="Wolfram">
      <WolframAutomataForm state={state} setState={setState} />

      <div className="rounded rounded-lg overflow-hidden p-1 shadow-lg bg-white">
        <div className="rounded overflow-hidden">
          <WolframAutomata rule={rule} width={width} steps={steps} />
        </div>
      </div>
    </PageLayout>
  );
}

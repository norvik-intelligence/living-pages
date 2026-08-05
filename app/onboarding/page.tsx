"use client";

import { useActionState, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Globe2 } from "lucide-react";
import { bootstrapWorkspace, type ActionResult } from "@/app/actions/core";
import { Logo } from "@/components/logo";

const initial: ActionResult = { ok: false, message: "" };
const steps = [
  { title: "What are you building?", key: "siteType", options: [["Business website", "business"], ["Portfolio", "portfolio"], ["Service business", "service"], ["Agency site", "agency"], ["Something else", "other"]] },
  { title: "What is your role?", key: "role", options: [["Founder", "Founder"], ["Creator", "Creator"], ["Marketer", "Marketer"], ["Designer", "Designer"], ["Developer", "Developer"], ["Agency", "Agency"]] },
  { title: "Choose a starting point", key: "startingPoint", options: [["Curated template", "template"], ["Business information", "business-information"], ["Blank structure", "blank"]] },
] as const;

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({ siteType: "", role: "", startingPoint: "", workspaceName: "", siteName: "" });
  const [state, action, pending] = useActionState(bootstrapWorkspace, initial);
  const optionStep = step < 3 ? steps[step] : null;
  const valid = optionStep ? Boolean(values[optionStep.key]) : step === 3 ? values.workspaceName.trim().length >= 2 : values.siteName.trim().length >= 2;
  return (
    <main id="content" className="onboarding-shell">
      <aside className="onboarding-rail"><Logo /><div><span className="eyebrow">Build the foundation</span><h2>One clear system before the first page goes live.</h2></div><p>Structured by default. Controlled at publish.</p></aside>
      <section className="onboarding-main">
        <form action={action}>
          {Object.entries(values).map(([key, value]) => <input key={key} type="hidden" name={key} value={value} />)}
          <div className="onboarding-progress"><span>0{step + 1}</span><i><b style={{ width: `${(step + 1) * 20}%` }} /></i><span>05</span></div>
          {optionStep ? <><span className="eyebrow">Workspace setup</span><h1>{optionStep.title}</h1><p>Your choices calibrate the starting structure. Nothing is published automatically.</p><div className="onboarding-options">{optionStep.options.map(([label, value]) => <button type="button" key={value} className={values[optionStep.key] === value ? "selected" : ""} onClick={() => setValues({ ...values, [optionStep.key]: value })}><span>{label}</span>{values[optionStep.key] === value && <Check size={16} />}</button>)}</div></> : <><span className="eyebrow">Workspace setup</span><h1>{step === 3 ? "Name your workspace." : "Create your first site."}</h1><p>{step === 3 ? "This is the operating space for your brand, team and sites." : "Start with a governed homepage you can edit, preview and publish."}</p><label className="onboarding-input"><span>{step === 3 ? "Workspace name" : "Site name"}</span><input autoFocus value={step === 3 ? values.workspaceName : values.siteName} onChange={(event) => setValues({ ...values, [step === 3 ? "workspaceName" : "siteName"]: event.target.value })} placeholder={step === 3 ? "Northstar Studio" : "Northstar Website"} maxLength={80} /></label></>}
          {state.message && <p className="form-error">{state.message}</p>}
          <div className="onboarding-actions"><button type="button" className="button" disabled={step === 0 || pending} onClick={() => setStep(step - 1)}><ArrowLeft size={14} /> Back</button>{step < 4 ? <button type="button" className="button dark" disabled={!valid} onClick={() => setStep(step + 1)}>Continue <ArrowRight size={14} /></button> : <button className="button dark" disabled={!valid || pending}>{pending ? "Creating system…" : <>Create workspace <Globe2 size={14} /></>}</button>}</div>
        </form>
      </section>
    </main>
  );
}

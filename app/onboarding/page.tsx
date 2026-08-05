"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Globe2 } from "lucide-react";
import { Logo } from "@/components/logo";
const steps = [
  {
    t: "What are you building?",
    o: [
      "Business website",
      "Portfolio",
      "Online store",
      "Service business",
      "Agency",
      "Other",
    ],
  },
  {
    t: "What is your role?",
    o: [
      "Founder",
      "Freelancer",
      "Creator",
      "Marketer",
      "Designer",
      "Developer",
      "Agency",
      "Other",
    ],
  },
  { t: "Name your workspace", o: ["Northstar Studio"] },
  {
    t: "Choose a starting point",
    o: [
      "Template",
      "Business information",
      "Existing website import",
      "Blank project",
    ],
  },
  { t: "Create your first site", o: ["Northstar Website"] },
];
export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<Record<number, string>>({});
  const current = steps[step];
  return (
    <main
      id="content"
      style={{
        minHeight: "100vh",
        padding: "28px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Logo />
      <div style={{ width: "min(650px,100%)", margin: "8vh auto" }}>
        <span className="eyebrow">Step {step + 1} of 5</span>
        <div className="bar" style={{ margin: "18px 0 45px" }}>
          <i style={{ width: `${(step + 1) * 20}%` }} />
        </div>
        <h1 style={{ fontSize: 55, margin: "0 0 12px" }}>{current.t}</h1>
        <p className="muted">
          This creates the structured foundation for your Living Pages
          workspace.
        </p>
        <div className="grid-2" style={{ marginTop: 30 }}>
          {current.o.map((x) => (
            <button
              key={x}
              onClick={() => setSelected({ ...selected, [step]: x })}
              className="card"
              style={{
                minHeight: 70,
                textAlign: "left",
                cursor: "pointer",
                outline: selected[step] === x ? "2px solid #23453a" : "none",
              }}
            >
              {selected[step] === x && (
                <Check size={15} style={{ float: "right" }} />
              )}
              {x}
            </button>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 30,
          }}
        >
          <button
            className="button"
            disabled={step === 0}
            onClick={() => setStep(step - 1)}
          >
            <ArrowLeft size={14} />
            Back
          </button>
          {step < 4 ? (
            <button
              className="button dark"
              disabled={!selected[step]}
              onClick={() => setStep(step + 1)}
            >
              Continue <ArrowRight size={14} />
            </button>
          ) : (
            <Link className="button dark" href="/app">
              Create workspace <Globe2 size={14} />
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}

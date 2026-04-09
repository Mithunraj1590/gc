"use client";

import { useEffect, useMemo, useState } from "react";

type NavItem = {
  id: string;
  href: string;
  label: string;
};

const NAV_ITEMS: NavItem[] = [
  { id: "home", href: "#home", label: "Home" },
  { id: "projects", href: "#projects", label: "Projects" },
  { id: "services", href: "#services", label: "Services" },
  { id: "approach", href: "#approach", label: "Approach" },
  { id: "about", href: "#about", label: "Contact" },
];

export type FloatingNavProps = {
  onAiToggle?: (open: boolean) => void;
};

export default function FloatingNav({ onAiToggle }: FloatingNavProps) {
  const [activeItem, setActiveItem] = useState<string>("home");
  const [aiOpen, setAiOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);
  const [reportInput, setReportInput] = useState("");
  const [reportGeneratedAt, setReportGeneratedAt] = useState("");
  const [messages, setMessages] = useState<
    Array<{ id: number; type: "bot" | "user"; text: string }>
  >([
    {
      id: 1,
      type: "bot",
      text: "I'm Creative Intelligence - a senior-level AI combining brand strategy, performance marketing, and creative direction.\n\nTo generate your Creative Intelligence Report, tell me about your business.",
    },
  ]);

  const canSend = input.trim().length > 0 && !typing;

  useEffect(() => {
    if (!reportOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [reportOpen]);

  const quickGuidance = useMemo(
    () => [
      "Clarify target audience in one line",
      "Define one primary conversion goal",
      "Use one dominant visual style across channels",
    ],
    [],
  );

  const handleSend = () => {
    const text = input.trim();
    if (!text || typing) return;

    const userId = Date.now();
    setMessages((prev) => [...prev, { id: userId, type: "user", text }]);
    setInput("");
    setTyping(true);

    window.setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: userId + 1,
          type: "bot",
          text: "Analysing input and preparing your report...",
        },
      ]);

      setReportOpen(true);
      setReportLoading(true);
      setReportInput(text);
      setReportGeneratedAt(new Date().toLocaleString());

      window.setTimeout(() => {
        setReportLoading(false);
      }, 1200);
    }, 600);
  };

  return (
    <>
      <nav
        className="pointer-events-none fixed inset-x-0 bottom-10 z-[4000] flex justify-center"
        aria-label="Bottom navigation"
      >
        <div className="pointer-events-auto flex items-center gap-1 rounded-[4px] border border-white/8 bg-[rgba(10,10,10,0.88)] px-4 py-[0.55rem] pr-[0.6rem] shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-[24px] [backdrop-filter:saturate(180%)]">
          {NAV_ITEMS.map((item, index) => {
            const isActive = activeItem === item.id;

            return (
              <a
                key={item.id}
                href={item.href}
                title={item.label}
                onClick={() => setActiveItem(item.id)}
                className={`font-home-banner-heading flex items-center gap-1 rounded-[2px] px-3 py-[0.35rem] text-[0.63rem] font-medium uppercase tracking-[0.1em] transition-opacity duration-200 ${
                  isActive ? "opacity-100" : "opacity-[0.38] hover:opacity-100"
                }`}
              >
                {index === 0 ? (
                  <svg className="h-[15px] w-[15px] shrink-0" viewBox="0 0 20 20" fill="none" aria-hidden>
                    <path
                      d="M3 9.5L10 3l7 6.5V17a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 18v-5h4v5"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : null}
                {index === 0 ? null : item.label}
              </a>
            );
          })}

          <div className="mx-1 h-[18px] w-px shrink-0 bg-white/10" aria-hidden />

          <button
            id="ci-trigger"
            type="button"
            title="Creative Intelligence"
            onClick={() => {
              setAiOpen((prev) => {
                const next = !prev;
                onAiToggle?.(next);
                return next;
              });
            }}
            className={`flex h-[34px] w-[34px] items-center justify-center p-0 transition-all duration-300 ease-[cubic-bezier(0.34_1.56_0.64_1)] ${
              aiOpen ? "scale-110 opacity-100" : "opacity-50 hover:scale-110 hover:opacity-100"
            }`}
            aria-pressed={aiOpen}
          >
            <svg className="h-[26px] w-[26px] animate-[spin_12s_linear_infinite]" viewBox="0 0 32 32" fill="none" aria-hidden>
              <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2.5" />
              <circle cx="16" cy="16" r="4" fill="currentColor" opacity="0.9" />
            </svg>
          </button>
        </div>
      </nav>

      <div
        id="ci-chat"
        aria-hidden={!aiOpen}
        className={`fixed bottom-26 right-8 z-[5000] flex w-[340px] flex-col overflow-hidden border border-white/8 bg-[#0d0d0d] shadow-[0_24px_64px_rgba(0,0,0,0.7)] transition-all duration-300 ease-out max-md:right-4 max-md:w-[calc(100vw-2rem)] ${
          aiOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-5 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/6 bg-[#0a0a0a] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 animate-[spin_12s_linear_infinite] text-white">
              <svg viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2.5" />
                <circle cx="16" cy="16" r="4" fill="currentColor" />
              </svg>
            </div>
            <div>
              <div className="font-home-banner-heading text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-white">
                Creative Intelligence
              </div>
              <div className="text-[0.65rem] text-white/40">
                <span className="mr-1.5 inline-block h-[5px] w-[5px] rounded-full bg-green-400" />
                Brand Report Engine
              </div>
            </div>
          </div>
          <button
            id="ci-close"
            type="button"
            title="Close"
            onClick={() => setAiOpen(false)}
            className="p-1 text-white/35 hover:text-white"
          >
            <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div id="ci-messages" className="flex min-h-[200px] max-h-[300px] flex-1 flex-col gap-3 overflow-y-auto p-5">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[88%] border px-4 py-3 text-[0.82rem] leading-[1.55] ${
                  msg.type === "user"
                    ? "border-transparent bg-white text-black"
                    : "border-white/6 bg-white/5 text-white"
                }`}
              >
                {msg.text.split("\n").map((line, i) => (
                  <p key={`${msg.id}-${i}`}>{line || <>&nbsp;</>}</p>
                ))}
              </div>
            </div>
          ))}
          {typing ? (
            <div className="flex justify-start">
              <div className="max-w-[88%] border border-white/6 bg-white/5 px-4 py-3 text-[1.1rem] tracking-[0.25rem] text-white/35">
                ···
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex gap-2 border-t border-white/6 bg-[#0a0a0a] px-4 py-3">
          <input
            id="ci-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            placeholder="Describe your business..."
            autoComplete="off"
            className="flex-1 border border-white/8 bg-white/4 px-3.5 py-2.5 text-[0.8rem] text-white outline-none placeholder:text-white/40 focus:border-white/25"
          />
          <button
            id="ci-send"
            type="button"
            title="Generate Report"
            onClick={handleSend}
            disabled={!canSend}
            className="flex h-[34px] w-[34px] shrink-0 items-center justify-center border-none bg-white text-black disabled:opacity-40"
          >
            <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
              <path
                d="M2 8h12M8 2l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        id="ci-report-modal"
        aria-hidden={!reportOpen}
        className={`fixed inset-0 z-[9000] overflow-y-auto bg-black/95 transition-opacity duration-300 ${
          reportOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="mx-auto flex min-h-screen w-full max-w-[900px] flex-col border-x border-white/6 bg-[#060606]">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/8 bg-[#060606] px-6 py-5 text-white md:px-10">
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
                <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2.5" />
                <circle cx="16" cy="16" r="4" fill="currentColor" />
              </svg>
              <span className="font-home-banner-heading text-[0.72rem] uppercase tracking-[0.15em]">
                Creative Intelligence Report
              </span>
            </div>
            <div id="ci-report-meta" className="font-home-banner-heading text-[0.55rem] uppercase tracking-[0.15em] text-white/35">
              {reportGeneratedAt ? `Generated ${reportGeneratedAt}` : ""}
            </div>
            <button
              id="ci-report-close"
              type="button"
              title="Close Report"
              onClick={() => setReportOpen(false)}
              className="p-1 text-white/50 hover:text-white"
            >
              <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div id="ci-report-body" className="flex-1 px-6 py-10 text-white md:px-10">
            {reportLoading ? (
              <div className="flex min-h-[50vh] items-center justify-center text-white/70">
                Processing...
              </div>
            ) : (
              <>
                <h2 className="font-home-banner-heading mb-4 text-[0.95rem] uppercase tracking-[0.08em]">
                  Creative Intelligence Report
                </h2>
                <p className="mb-3 leading-7 text-white/80">Input received:</p>
                <div className="border border-white/10 bg-white/3 p-4 leading-7 text-white/90">
                  {reportInput}
                </div>
                <div className="mt-6 border border-white/10 bg-white/3 p-4 leading-7 text-white/90">
                  <strong>Quick guidance:</strong>
                  <ul className="mt-2 list-disc pl-6">
                    {quickGuidance.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-white/6 px-6 py-6 text-[0.55rem] uppercase tracking-[0.12em] text-white/50 md:px-10">
            <span>Generated by Creative Intelligence</span>
            <button
              type="button"
              onClick={() => window.print()}
              className="font-home-banner-heading border-none bg-white px-6 py-2.5 text-[0.6rem] uppercase tracking-[0.12em] text-black"
            >
              Download Report
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

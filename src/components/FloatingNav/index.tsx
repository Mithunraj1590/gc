"use client";

import gsap from "gsap";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

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
      text: "I'm Creative Intelligence — strategy, performance, and creative direction in one thread.\n\nShare your business context and I'll shape a Creative Intelligence Report you can act on.",
    },
  ]);

  const messagesScrollRef = useRef<HTMLDivElement | null>(null);
  const bottomNavPillRef = useRef<HTMLDivElement | null>(null);

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY < 10) {
          setIsVisible(true);
        } else if (currentScrollY > lastScrollY && !aiOpen && !reportOpen) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        
        setLastScrollY(currentScrollY);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [lastScrollY, aiOpen, reportOpen]);

  useLayoutEffect(() => {
    const el = bottomNavPillRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(el, {
        opacity: 0,
        y: 28,
        duration: 0.85,
        ease: "power2.out",
        delay: 0.85,
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const setChatOpen = useCallback(
    (open: boolean) => {
      setAiOpen(open);
      onAiToggle?.(open);
    },
    [onAiToggle],
  );

  const toggleChat = useCallback(() => {
    setAiOpen((prev) => {
      const next = !prev;
      onAiToggle?.(next);
      return next;
    });
  }, [onAiToggle]);

  const canSend = input.trim().length > 0 && !typing;

  useEffect(() => {
    if (!reportOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [reportOpen]);

  useEffect(() => {
    if (!aiOpen) return;
    const el = messagesScrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [aiOpen, messages, typing]);

  useEffect(() => {
    if (!aiOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setChatOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [aiOpen, setChatOpen]);

  useEffect(() => {
    const handleOpenChat = () => setChatOpen(true);
    window.addEventListener("open-ci-chat", handleOpenChat);
    return () => window.removeEventListener("open-ci-chat", handleOpenChat);
  }, [setChatOpen]);

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
      {/* Floating Trigger */}
      <button
        onClick={() => setChatOpen(true)}
        className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[4500] flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/60 border border-white/10 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:bg-black/80 hover:scale-105 cursor-pointer group ${aiOpen ? 'opacity-0 pointer-events-none translate-y-4 scale-95' : 'opacity-100 pointer-events-auto translate-y-0 scale-100'}`}
        aria-label="Open Creative Intelligence"
      >
        <svg className="h-6 w-6 md:h-7 md:w-7 animate-[spin_12s_linear_infinite] text-white" viewBox="0 0 32 32" fill="none" aria-hidden>
          <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2.5" />
          <circle cx="16" cy="16" r="4" fill="currentColor" opacity="0.9" />
        </svg>
      </button>

      <div
        id="ci-chat"
        role="dialog"
        aria-modal="false"
        aria-labelledby="ci-chat-title"
        aria-hidden={!aiOpen}
        className={`fixed bottom-26 right-8 z-5000 flex w-[min(100%,380px)] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-sm border border-white/10 bg-[#0a0a0a] shadow-[0_24px_64px_rgba(0,0,0,0.72)] transition-all duration-300 ease-out max-md:right-4 ${
          aiOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-5 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 bg-[#080808] px-5 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="h-8 w-8 shrink-0 animate-[spin_12s_linear_infinite] text-white/80">
              <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2.5" />
                <circle cx="16" cy="16" r="4" fill="currentColor" />
              </svg>
            </div>
            <div className="min-w-0">
              <div
                id="ci-chat-title"
                className="font-home-banner-heading truncate text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-white"
              >
                Creative Intelligence
              </div>
              <div className="truncate text-[0.65rem] text-white/45">
                <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-white/60 align-middle ring-2 ring-white/10" />
                Brand report engine · Ready
              </div>
            </div>
          </div>
          <button
            id="ci-close"
            type="button"
            title="Close chat"
            aria-label="Close Creative Intelligence chat"
            onClick={() => setChatOpen(false)}
            className="shrink-0 rounded-sm p-1.5 text-white/40 transition-colors hover:bg-white/5 hover:text-white"
          >
            <svg viewBox="0 0 16 16" fill="none" width="14" height="14" aria-hidden="true">
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div
          id="ci-messages"
          ref={messagesScrollRef}
          className="flex min-h-[220px] max-h-[min(52vh,340px)] flex-col gap-3 overflow-y-auto scroll-smooth bg-[#0a0a0a] p-5"
        >
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[90%] rounded-sm border px-4 py-3 text-[0.82rem] leading-normal ${
                  msg.type === "user"
                    ? "border-[#C8A96E]/35 bg-white text-black"
                    : "border-white/8 bg-white/4 text-white/90"
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
              <div className="flex max-w-[90%] items-center gap-1 rounded-sm border border-white/8 bg-white/4 px-4 py-3">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C8A96E]" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C8A96E]" style={{ animationDelay: "150ms" }} />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C8A96E]" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex gap-2 border-t border-white/10 bg-[#080808] px-4 py-3">
          <input
            id="ci-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Describe your business, offer, and audience…"
            autoComplete="off"
            className="min-w-0 flex-1 rounded-sm border border-white/10 bg-white/4 px-3.5 py-2.5 text-[0.8rem] text-white outline-none placeholder:text-white/38 focus:border-[#C8A96E]/45 focus:ring-1 focus:ring-[#C8A96E]/30"
          />
          <button
            id="ci-send"
            type="button"
            title="Send and generate report"
            aria-label="Send message and generate report"
            onClick={handleSend}
            disabled={!canSend}
            className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-sm border border-[#C8A96E]/40 bg-[#C8A96E] text-black transition-[filter,opacity] hover:brightness-110 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/15 disabled:text-white/35 disabled:hover:brightness-100"
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
        className={`fixed inset-0 z-9000 overflow-y-auto bg-black/95 transition-opacity duration-300 ${
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

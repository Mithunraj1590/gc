"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";

type HomeLinesProps = Readonly<{
  className?: string;
}>;

type RevealOverlayProps = Readonly<{
  isActive: boolean;
  lines: string[];
}>;

function RevealOverlay({ isActive, lines }: RevealOverlayProps) {
  const [phase, setPhase] = useState<"hidden" | "shimmer" | "text">("hidden");
  const EXPAND_DURATION_MS = 500;
  const SHIMMER_DURATION_MS = 320;

  useEffect(() => {
    let shimmerTimer: number | null = null;
    let textTimer: number | null = null;

    if (isActive) {
      setPhase("hidden");
      shimmerTimer = window.setTimeout(() => setPhase("shimmer"), EXPAND_DURATION_MS);
      textTimer = window.setTimeout(
        () => setPhase("text"),
        EXPAND_DURATION_MS + SHIMMER_DURATION_MS
      );
    } else {
      setPhase("hidden");
    }

    return () => {
      if (shimmerTimer) window.clearTimeout(shimmerTimer);
      if (textTimer) window.clearTimeout(textTimer);
    };
  }, [isActive]);

  let wordIndex = 0;
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-3">
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
          phase === "shimmer" ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="w-[88%] max-w-[240px] space-y-1.5">
          <div className="relative h-[5px] w-full overflow-hidden rounded-sm bg-white/20">
            <span className="wave-shimmer absolute inset-y-0 left-[-45%] w-[45%] bg-linear-to-r from-transparent via-white to-transparent" />
          </div>
          <div className="relative h-[5px] w-[84%] overflow-hidden rounded-sm bg-white/20">
            <span
              className="wave-shimmer absolute inset-y-0 left-[-45%] w-[45%] bg-linear-to-r from-transparent via-white to-transparent"
              style={{ animationDelay: "120ms" }}
            />
          </div>
          <div className="relative h-[5px] w-[92%] overflow-hidden rounded-sm bg-white/20">
            <span
              className="wave-shimmer absolute inset-y-0 left-[-45%] w-[45%] bg-linear-to-r from-transparent via-white to-transparent"
              style={{ animationDelay: "240ms" }}
            />
          </div>
        </div>
      </div>

      <div className="relative z-1 space-y-1 text-center text-[0.56rem] font-semibold uppercase leading-tight tracking-[0.08em] text-black">
        {lines.map((line, lineIdx) => {
          const words = line.split(" ");
          return (
            <div key={`${line}-${lineIdx}`} className="whitespace-nowrap">
              {words.map((word) => {
                const currentIndex = wordIndex++;
                return (
                  <span
                    key={`${line}-${word}-${currentIndex}`}
                    className="inline-block transition-all duration-300"
                    style={{
                      opacity: phase === "text" ? 1 : 0,
                      transform: phase === "text" ? "translateY(0)" : "translateY(5px)",
                      transitionDelay: phase === "text" ? `${currentIndex * 55}ms` : "0ms",
                    }}
                  >
                    {word}&nbsp;
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .wave-shimmer {
          animation: wave-shimmer 1.1s linear infinite;
          opacity: 0.95;
        }
        @keyframes wave-shimmer {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(320%);
          }
        }
      `}</style>
    </div>
  );
}

export default function HomeLines({ className = "" }: HomeLinesProps) {
  const fadeTimersRef = useRef(new Map<HTMLElement, number>());
  const topElevenLeaveTimerRef = useRef<number | null>(null);
  const topTwentySevenLeaveTimerRef = useRef<number | null>(null);
  const bottomSevenFromRightLeaveTimerRef = useRef<number | null>(null);
  const [isTopElevenHovered, setIsTopElevenHovered] = useState(false);
  const [isTopTwentySevenHovered, setIsTopTwentySevenHovered] = useState(false);
  const [isBottomSevenFromRightHovered, setIsBottomSevenFromRightHovered] = useState(false);
  const TOP_ELEVEN_LEAVE_DELAY_MS = 120;
  const TOP_TWENTY_SEVEN_LEAVE_DELAY_MS = 120;
  const BOTTOM_SEVEN_FROM_RIGHT_LEAVE_DELAY_MS = 120;
  const TOP_ELEVEN_SCALE_X = 300 / 7;
  const TOP_TWENTY_SEVEN_SCALE_X = 300 / 7;
  const BOTTOM_SEVEN_FROM_RIGHT_SCALE_X = 300 / 7;
  const HOVER_COLOR = "#C8A96E";
  const FADE_TO_TRANSPARENT = "rgba(200, 169, 110, 0)";
  const revealLines = [
    "We diagnose brand systems",
    "Then rebuild core messaging",
    "Align creative with strategy",
    "And relaunch with precision",
  ];

  useEffect(() => {
    return () => {
      fadeTimersRef.current.forEach((timerId) => window.clearTimeout(timerId));
      fadeTimersRef.current.clear();
      if (topElevenLeaveTimerRef.current) {
        window.clearTimeout(topElevenLeaveTimerRef.current);
      }
      if (topTwentySevenLeaveTimerRef.current) {
        window.clearTimeout(topTwentySevenLeaveTimerRef.current);
      }
      if (bottomSevenFromRightLeaveTimerRef.current) {
        window.clearTimeout(bottomSevenFromRightLeaveTimerRef.current);
      }
    };
  }, []);

  const clearLineTimer = (el: HTMLElement) => {
    const existing = fadeTimersRef.current.get(el);
    if (existing) {
      window.clearTimeout(existing);
      fadeTimersRef.current.delete(el);
    }
  };

  const onLineEnter = (event: ReactMouseEvent<HTMLSpanElement>) => {
    const el = event.currentTarget;
    clearLineTimer(el);
    el.style.transition = "none";
    el.style.backgroundColor = HOVER_COLOR;
  };

  const onLineLeave = (event: ReactMouseEvent<HTMLSpanElement>) => {
    const el = event.currentTarget;
    clearLineTimer(el);
    void el.offsetWidth;
    el.style.transition = "background-color 1.2s ease-in";
    el.style.backgroundColor = FADE_TO_TRANSPARENT;

    const timerId = window.setTimeout(() => {
      el.style.transition = "background-color .3s ease-in";
      el.style.backgroundColor = el.dataset.originalColor ?? "#ffffff";
      fadeTimersRef.current.delete(el);
    }, 1150);

    fadeTimersRef.current.set(el, timerId);
  };

  const lineWidthClass = (index: number) => {
    if (index % 13 === 0) return "w-[5px]";
    if (index % 14 === 0) return "w-[5px]";
    if (index % 11 === 0) return "w-[4px]";
    if (index % 5 === 0) return "w-[1px]";
    return "w-[2px]";
  };

  const secondRowWidthClass = (index: number) => {
    // User-specified second-row overrides (1-indexed positions):
    // 11, 14, 15 => 5px and 1, 23 => 1px
    if (index === 10 || index === 13 || index === 14 || index === 15 || index === 16) return "w-[5px]";
    if (index === 0 || index === 22) return "w-[1px]";
    return lineWidthClass(index);
  };

  return (
    <section className={`py-10 md:py-14 lg:py-[100px] ${className}`.trim()} aria-label="Home lines">
      <div className="container">
        <div className="mb-8 flex items-center justify-between gap-4 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/55 md:mb-10">
          <span className="flex items-center gap-4 before:block before:h-px before:w-14 before:bg-white/45 md:before:w-24">
            Structured Signals
          </span>
          <span className="max-w-[560px] text-[18px] font-light normal-case tracking-normal text-white/50">
            We don't offer surface-level marketing. We diagnose, rebuild, and relaunch your brand — end to end.
            Designed for brands entering the market, established brands losing relevance, or those planning a
            comeback.
          </span>
        </div>

        <div className="relative min-h-[200px] sm:min-h-[240px] md:min-h-[280px] lg:min-h-[360px] xl:min-h-[420px] 2xl:min-h-[280px]">
          <div className="absolute inset-x-0 top-0 flex w-full items-end">
            {Array.from({ length: 33 }).map((_, i) => (
              <div
                key={`top-slot-${i}`}
                className="relative flex min-w-0 items-stretch justify-center overflow-hidden transition-[flex-basis,flex-grow,flex-shrink] duration-500 ease-in"
                style={{
                  flexGrow: i === 10 ? (isTopElevenHovered ? 0 : 1) : i === 26 ? (isTopTwentySevenHovered ? 0 : 1) : 1,
                  flexShrink: i === 10 ? (isTopElevenHovered ? 0 : 1) : i === 26 ? (isTopTwentySevenHovered ? 0 : 1) : 1,
                  flexBasis:
                    i === 10 && isTopElevenHovered
                      ? "min(300px, 38vw)"
                      : i === 26 && isTopTwentySevenHovered
                        ? "min(300px, 38vw)"
                        : 0,
                }}
                onMouseEnter={() => {
                  if (i === 10) {
                    if (topElevenLeaveTimerRef.current) {
                      window.clearTimeout(topElevenLeaveTimerRef.current);
                      topElevenLeaveTimerRef.current = null;
                    }
                    setIsTopElevenHovered(true);
                  }
                  if (i === 26) {
                    if (topTwentySevenLeaveTimerRef.current) {
                      window.clearTimeout(topTwentySevenLeaveTimerRef.current);
                      topTwentySevenLeaveTimerRef.current = null;
                    }
                    setIsTopTwentySevenHovered(true);
                  }
                }}
                onMouseLeave={() => {
                  if (i === 10) {
                    topElevenLeaveTimerRef.current = window.setTimeout(() => {
                      setIsTopElevenHovered(false);
                      topElevenLeaveTimerRef.current = null;
                    }, TOP_ELEVEN_LEAVE_DELAY_MS);
                  }
                  if (i === 26) {
                    topTwentySevenLeaveTimerRef.current = window.setTimeout(() => {
                      setIsTopTwentySevenHovered(false);
                      topTwentySevenLeaveTimerRef.current = null;
                    }, TOP_TWENTY_SEVEN_LEAVE_DELAY_MS);
                  }
                }}
              >
                <span
                  key={`top-${i}`}
                  data-original-color="#ffffff"
                  onMouseEnter={i === 10 || i === 26 ? undefined : onLineEnter}
                  onMouseLeave={i === 10 || i === 26 ? undefined : onLineLeave}
                  className={
                    i === 4
                      ? `inline-block h-[200px] sm:h-[240px] md:h-[280px] lg:h-[360px] xl:h-[420px] 2xl:h-[250px] ${lineWidthClass(i)} shrink-0 -rotate-[10deg] bg-white`
                    : i === 10
                        ? "inline-block h-[200px] sm:h-[240px] md:h-[280px] lg:h-[360px] xl:h-[420px] 2xl:h-[250px] w-[7px] shrink-0 origin-center bg-[#C8A96E] transition-transform duration-[500ms] ease-in"
                    : i === 26
                        ? "inline-block h-[200px] sm:h-[240px] md:h-[280px] lg:h-[360px] xl:h-[420px] 2xl:h-[250px] w-[7px] shrink-0 origin-center bg-[#C8A96E] transition-transform duration-[500ms] ease-in"
                        : `inline-block h-[200px] sm:h-[240px] md:h-[280px] lg:h-[360px] xl:h-[420px] 2xl:h-[250px] ${lineWidthClass(i)} shrink-0 bg-white`
                  }
                  style={
                    i === 10
                      ? {
                          transform: `scaleX(${isTopElevenHovered ? TOP_ELEVEN_SCALE_X : 1})`,
                        }
                      : i === 26
                        ? {
                            transform: `scaleX(${isTopTwentySevenHovered ? TOP_TWENTY_SEVEN_SCALE_X : 1})`,
                          }
                      : undefined
                  }
                />
                {(i === 10 || i === 26) &&
                  (
                    <RevealOverlay
                      isActive={(i === 10 && isTopElevenHovered) || (i === 26 && isTopTwentySevenHovered)}
                      lines={revealLines}
                    />
                  )}
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[200px] sm:min-h-[240px] md:min-h-[280px] lg:min-h-[360px] xl:min-h-[420px] 2xl:min-h-[250px]">
          <div className="absolute inset-x-0 top-0 flex w-full items-start">
            {Array.from({ length: 33 }).map((_, i) => (
              <div
                key={`bottom-slot-${i}`}
                className="relative flex min-w-0 items-stretch justify-center overflow-hidden transition-[flex-basis,flex-grow,flex-shrink] duration-500 ease-in"
                style={{
                  flexGrow: i === 6 ? (isBottomSevenFromRightHovered ? 0 : 1) : 1,
                  flexShrink: i === 6 ? (isBottomSevenFromRightHovered ? 0 : 1) : 1,
                  flexBasis: i === 6 && isBottomSevenFromRightHovered ? "min(300px, 38vw)" : 0,
                }}
                onMouseEnter={() => {
                  if (i === 6) {
                    if (bottomSevenFromRightLeaveTimerRef.current) {
                      window.clearTimeout(bottomSevenFromRightLeaveTimerRef.current);
                      bottomSevenFromRightLeaveTimerRef.current = null;
                    }
                    setIsBottomSevenFromRightHovered(true);
                  }
                }}
                onMouseLeave={() => {
                  if (i === 6) {
                    bottomSevenFromRightLeaveTimerRef.current = window.setTimeout(() => {
                      setIsBottomSevenFromRightHovered(false);
                      bottomSevenFromRightLeaveTimerRef.current = null;
                    }, BOTTOM_SEVEN_FROM_RIGHT_LEAVE_DELAY_MS);
                  }
                }}
              >
                <span
                  key={`bottom-${i}`}
                  data-original-color="#ffffff"
                  onMouseEnter={i === 6 ? undefined : onLineEnter}
                  onMouseLeave={i === 6 ? undefined : onLineLeave}
                  className={
                    i === 6
                      ? "inline-block h-[200px] sm:h-[240px] md:h-[280px] lg:h-[360px] xl:h-[420px] 2xl:h-[250px] w-[7px] shrink-0 origin-center bg-[#C8A96E] transition-transform duration-[500ms] ease-in"
                    : i === 26
                      ? `inline-block h-[200px] sm:h-[240px] md:h-[280px] lg:h-[360px] xl:h-[420px] 2xl:h-[250px] ${secondRowWidthClass(i)} shrink-0 rotate-[10deg] bg-white`
                      : `inline-block h-[200px] sm:h-[240px] md:h-[280px] lg:h-[360px] xl:h-[420px] 2xl:h-[250px] ${secondRowWidthClass(i)} shrink-0 bg-white`
                  }
                  style={
                    i === 6
                      ? {
                          transform: `scaleX(${isBottomSevenFromRightHovered ? BOTTOM_SEVEN_FROM_RIGHT_SCALE_X : 1})`,
                        }
                      : undefined
                  }
                />
                {i === 6 && <RevealOverlay isActive={isBottomSevenFromRightHovered} lines={revealLines} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

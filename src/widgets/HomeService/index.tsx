"use client";

import CreativeIntelligenceCTA from "@/components/CreativeIntelligenceCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import "./HomeService.scss";

type HomeServiceProps = Readonly<{
  className?: string;
}>;

type ServiceCard = Readonly<{
  id: number;
  title: string;
  icon: ReactNode;
}>;

const cycleOrder = [0, 1, 2, 5, 8, 7, 6, 3];

const cards: ServiceCard[] = [
  {
    id: 0,
    title: "Brand Strategy",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    id: 1,
    title: "Performance Media",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Creative Production",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Social Systems",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Mission Control",
    icon: (
      <div className="home-service__radar">
        <span className="home-service__pulse" />
        <span className="home-service__pulse" />
        <span className="home-service__pulse" />
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="relative z-2 h-12 w-12 text-black">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      </div>
    ),
  },
  {
    id: 5,
    title: "AI Video",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    id: 6,
    title: "Funnel Design",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
      </svg>
    ),
  },
  {
    id: 7,
    title: "Analytics",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83M22 12A10 10 0 0 0 12 2v10z" />
      </svg>
    ),
  },
  {
    id: 8,
    title: "Automation",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
];

const features = [
  "Deep brand diagnosis",
  "AI + Expert hybrid strategy",
  "Cost-controlled execution engine",
  "Forecast-driven planning",
  "Full brand transformation capability",
];

export default function HomeService({ className = "" }: HomeServiceProps) {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef, { stagger: 0.12, y: 36, duration: 0.8 });

  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [isHoveringGrid, setIsHoveringGrid] = useState(false);

  useEffect(() => {
    let index = 0;
    const timer = window.setInterval(() => {
      if (isHoveringGrid) return;
      setActiveCard(cycleOrder[index]);
      index = (index + 1) % cycleOrder.length;
    }, 2200);

    return () => window.clearInterval(timer);
  }, [isHoveringGrid]);

  const cardMap = useMemo(() => new Map(cards.map((card) => [card.id, card])), []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className={`home-service py-[100px] text-white ${className}`.trim()}
    >
      <div className="container relative z-1">
        <div
          data-reveal
          className="mb-8 flex items-center gap-4 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/55 before:block before:h-px before:w-24 before:bg-white/45 md:before:w-16 lg:before:w-18"
        >
          Core Difference
        </div>

        <div className="grid gap-10 lg:grid-cols-[480px_1fr] lg:gap-16">
          <div data-reveal>
            <h2 className="mb-5 font-home-banner-heading text-[2.5rem] font-bold leading-[1.1] tracking-tight">
              We don&apos;t guess.
              <br />
              <span className="text-[#C8A96E]">We calculate.</span>
            </h2>
            <p className="mb-8 max-w-[340px] text-[0.9rem] leading-[1.65] text-white/60">
              Traditional agencies run campaigns. We operate like mission control - scanning, diagnosing, and
              executing with precision. AI + human intelligence, always.
            </p>

            <span className="mb-3 block text-[0.58rem] font-bold uppercase tracking-[0.3em] text-white/40">
              Key Capabilities
            </span>

            <ul className="mb-8">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 border-b border-white/10 py-2.5 text-[0.85rem] leading-normal text-white/70 first:border-t"
                >
                  <svg className="mt-[3px] h-[13px] w-[13px] shrink-0 text-[#C8A96E]" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8l3.5 3.5L13 4.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {["Brand Identity", "Social Media", "AI Video"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="border-b border-white/20 pb-0.5 text-[0.7rem] font-semibold uppercase tracking-[0.06em] text-white/60 transition-colors duration-200 hover:border-[#C8A96E] hover:text-[#C8A96E]"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div
            className="home-service__grid"
            onMouseEnter={() => {
              setIsHoveringGrid(true);
              setActiveCard(null);
            }}
            onMouseLeave={() => setIsHoveringGrid(false)}
          >
            {Array.from({ length: 9 }).map((_, idx) => {
              const card = cardMap.get(idx);
              if (!card) return null;

              const isCenter = idx === 4;
              const isActive = activeCard === idx;

              return (
                <article
                  key={card.id}
                  className={`home-service__card ${isActive ? "home-service__card--active" : ""} ${isCenter ? "home-service__card--center" : ""}`}
                  onMouseEnter={() => !isCenter && setActiveCard(idx)}
                >
                  {/* Visual Accents */}
                  {!isCenter && (
                    <>
                      <span className="home-service__corner home-service__corner--tl" />
                      <span className="home-service__corner home-service__corner--tr" />
                      <span className="home-service__corner home-service__corner--bl" />
                      <span className="home-service__corner home-service__corner--br" />
                    </>
                  )}

                  <div className={`home-service__icon ${isCenter ? "h-full w-full" : "h-8 w-8"}`}>
                    {card.icon}
                  </div>

                  {!isCenter && (
                    <h3 className="home-service__title">{card.title}</h3>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-20">
        <CreativeIntelligenceCTA />
      </div>
    </section>
  );
}

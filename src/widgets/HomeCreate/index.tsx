"use client";

import ParticleMorphDemo from "@/components/ParticleMorphDemo";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import gsap from "gsap";
import { useLayoutEffect, useMemo, useRef, useSyncExternalStore } from "react";
import "./HomeCreate.scss";

const PARTICLE_TEXT = ["Create"] as const;

export type HomeCreateProps = Readonly<{
  className?: string;
  title?: string;
  subline?: string;
  lineCount?: number;
  /** Seconds for one full loop (two slabs = seamless). Lower = faster drift. */
  driftDurationSec?: number;
  /** Vertical travel (px); even/odd lines oppose. Use 0 to disable. */
  lineOscAmplitudePx?: number;
  /** Seconds for one full up→down cycle per line (yoyo). */
  lineOscDurationSec?: number;
}>;

type LineSpec = Readonly<{
  leftPct: number;
  heightPct: number;
  topPct: number;
  opacity: number;
  label: "top" | "bottom" | null;
}>;

function buildLineSpecs(count: number): LineSpec[] {
  return Array.from({ length: count }, (_, i) => {
    const t = i / Math.max(1, count - 1);
    const leftPct = (i / count) * 100 + (i % 5) * 0.35;
    const heightPct = 28 + ((i * 47 + 13) % 58);
    const topPct = 50 - heightPct / 2;
    const opacity = 0.38 + ((i * 19) % 42) / 100;
    const label: "top" | "bottom" | null = i % 5 === 0 ? (t < 0.5 ? "top" : "bottom") : null;
    return { leftPct, heightPct, topPct, opacity, label };
  });
}

function LinesSlab({ lines, slabKey }: Readonly<{ lines: LineSpec[]; slabKey: string }>) {
  return (
    <div className="home-create__lines-slab" aria-hidden>
      {lines.map((spec, i) => (
        <div
          key={`${slabKey}-${i}`}
          className="home-create__line"
          data-line-i={i}
          style={{
            left: `${spec.leftPct}%`,
            top: `${spec.topPct}%`,
            height: `${spec.heightPct}%`,
          }}
        >
          <span className="home-create__line-bar" style={{ opacity: spec.opacity }} aria-hidden />
          {spec.label === "top" ? (
            <span className="home-create__line-label home-create__line-label--top">03</span>
          ) : null}
          {spec.label === "bottom" ? (
            <span className="home-create__line-label home-create__line-label--bottom">03</span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default function HomeCreate({
  className = "",
  title = "Create",
  subline = "",
  lineCount = 52,
  driftDurationSec = 32,
  lineOscAmplitudePx = 100,
  lineOscDurationSec = 3.2,
}: HomeCreateProps) {
  const lines = useMemo(() => buildLineSpecs(lineCount), [lineCount]);
  const sectionRef = useRef<HTMLElement>(null);
  const linesShellRef = useRef<HTMLDivElement>(null);
  const linesTrackRef = useRef<HTMLDivElement>(null);

  useScrollReveal(sectionRef, { start: "top 78%", stagger: 0.2, y: 56, duration: 1 });

  const prefersReducedMotion = useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );

  useLayoutEffect(() => {
    const shell = linesShellRef.current;
    const track = linesTrackRef.current;
    if (!shell || !track) return;

    if (prefersReducedMotion) {
      gsap.set(track, { clearProps: "transform" });
      gsap.set(shell.querySelectorAll(".home-create__line"), { clearProps: "transform" });
      return;
    }

    let ro: ResizeObserver | null = null;

    const ctx = gsap.context(() => {
      const armDrift = () => {
        const w = shell.clientWidth;
        if (w <= 0) return;
        gsap.killTweensOf(track);
        gsap.set(track, { x: 0, force3D: true });
        gsap.to(track, {
          x: -w,
          duration: driftDurationSec,
          ease: "none",
          repeat: -1,
          force3D: true,
        });
      };

      const armLineOscillation = () => {
        const lineEls = shell.querySelectorAll<HTMLElement>(".home-create__line");
        gsap.killTweensOf(lineEls);
        gsap.set(lineEls, { y: 0, force3D: true });

        const oscPx = lineOscAmplitudePx <= 0 ? 0 : lineOscAmplitudePx;
        if (oscPx <= 0) return;

        lineEls.forEach((el) => {
          const idx = Number(el.dataset.lineI);
          const i = Number.isFinite(idx) ? idx : 0;
          const dir = i % 2 === 0 ? -1 : 1;
          gsap.to(el, {
            y: dir * oscPx,
            duration: lineOscDurationSec,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            force3D: true,
          });
        });
      };

      armDrift();
      armLineOscillation();
      ro = new ResizeObserver(armDrift);
      ro.observe(shell);
    }, shell);

    return () => {
      ro?.disconnect();
      ctx.revert();
    };
  }, [
    driftDurationSec,
    lineCount,
    lineOscAmplitudePx,
    lineOscDurationSec,
    prefersReducedMotion,
  ]);

  return (
    <section
      ref={sectionRef}
      id="create"
      className={`home-create ${className}`.trim()}
      aria-label="Create"
    >
      <div className="home-create__grid" aria-hidden />
      <div className="home-create__vignette" aria-hidden />

      <div ref={linesShellRef} className="home-create__lines" aria-hidden>
        <div ref={linesTrackRef} className="home-create__lines-track">
          <LinesSlab lines={lines} slabKey="a" />
          <LinesSlab lines={lines} slabKey="b" />
        </div>
      </div>

      <div className="home-create__particle-wrap" data-reveal>
        {prefersReducedMotion ? (
          <h2 className="home-create__title-visual">Create</h2>
        ) : (
          <ParticleMorphDemo
            className="home-create__particle-morph"
            autoCycleTexts={PARTICLE_TEXT}
            showBackgroundThrough
          />
        )}
      </div>

      <div className="home-create__inner" data-reveal>
        {!prefersReducedMotion ? (
          <h2 className="home-create__title-sr">Create</h2>
        ) : null}
        {subline ? <p className="home-create__sub">{subline}</p> : null}
      </div>
    </section>
  );
}

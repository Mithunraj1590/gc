"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HomeApproach.scss";

const FRAME_COUNT = 806;
const SEQUENCE_BASE = "/images/sequance/1775336546879794_";
const ENGINE_BG_SRC = `${SEQUENCE_BASE}00024.png`;
/** Total scroll (in 100vh units) to run the full sequence — higher = slower frame advance. */
const ENGINE_SCROLL_END_VH = 2800;
/** Share of timeline for the final frames (more = slower, calmer ending). */
const ENGINE_SEQUENCE_SLOW_END_PORTION = 0.58;
/** Share of frame range that counts as “ending” (gets SLOW_END_PORTION of scroll). */
const ENGINE_SEQUENCE_END_FRAME_RATIO = 0.22;

function frameUrl(index: number) {
  return `${SEQUENCE_BASE}${index.toString().padStart(5, "0")}.png`;
}

export type HomeApproachProps = Readonly<{
  className?: string;
}>;

export default function HomeApproach({ className = "" }: HomeApproachProps) {
  const figYearRef = useRef<HTMLSpanElement>(null);
  const frameImgRef = useRef<HTMLImageElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const yearEl = figYearRef.current;
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }
  }, []);

  useEffect(() => {
    const frameImg = frameImgRef.current;
    const track = trackRef.current;
    if (!frameImg || !track) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const engineFrames = { frame: 0 };

    const paint = () => {
      const fi = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(engineFrames.frame)));
      frameImg.src = frameUrl(fi);
    };

    frameImg.src = frameUrl(0);

    if (prefersReduced) {
      engineFrames.frame = 0;
      paint();
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const gsapCtx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: "top top",
          end: `+=${ENGINE_SCROLL_END_VH}vh`,
          scrub: 0.35,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          scroller: document.documentElement,
        },
      });

      const lastFrame = FRAME_COUNT - 1;
      const fastPortion = 1 - ENGINE_SEQUENCE_SLOW_END_PORTION;
      const frameAtSplit = Math.max(0, Math.round(lastFrame * (1 - ENGINE_SEQUENCE_END_FRAME_RATIO)));

      tl.to(
        engineFrames,
        {
          frame: frameAtSplit,
          ease: "none",
          duration: fastPortion,
          snap: { frame: 1 },
          onUpdate: paint,
        },
        0,
      );
      tl.to(engineFrames, {
        frame: lastFrame,
        ease: "none",
        duration: ENGINE_SEQUENCE_SLOW_END_PORTION,
        snap: { frame: 1 },
        onUpdate: paint,
      });

      const texts = gsap.utils.toArray<HTMLElement>(".home-approach .engine-text-step");
      if (texts.length > 0) {
        const slice = 1 / texts.length;
        const overlap = 0.05;

        texts.forEach((text, i) => {
          const leftBlock = text.querySelector<HTMLElement>(".ets-left");
          const rightBlock = text.querySelector<HTMLElement>(".ets-right");
          const startProgress = i * slice;
          const endProgress = (i + 1) * slice;
          const segmentDuration = slice / 3;

          tl.set(text, { autoAlpha: 1 }, startProgress);

          if (leftBlock) {
            tl.fromTo(
              leftBlock,
              { autoAlpha: 0, x: -40, yPercent: -50 },
              { autoAlpha: 1, x: 0, yPercent: -50, duration: segmentDuration, ease: "power2.out" },
              startProgress,
            ).to(
              leftBlock,
              { autoAlpha: 0, x: -40, yPercent: -50, duration: segmentDuration, ease: "power2.in" },
              endProgress - overlap,
            );
          }

          if (rightBlock) {
            tl.fromTo(
              rightBlock,
              { autoAlpha: 0, x: 40, yPercent: -50 },
              { autoAlpha: 1, x: 0, yPercent: -50, duration: segmentDuration, ease: "power2.out" },
              startProgress,
            ).to(
              rightBlock,
              { autoAlpha: 0, x: 40, yPercent: -50, duration: segmentDuration, ease: "power2.in" },
              endProgress - overlap,
            );
          }

          tl.set(text, { autoAlpha: 0 }, endProgress);
        });
      }
    }, track);

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      gsapCtx.revert();
    };
  }, []);

  return (
    <section
      id="approach"
      className={`home-approach section dark blueprint-section ${className}`.trim()}
      aria-label="GC 360 mission engine"
    >
      <div className="container container-large">
        <div className="fig-title-block">
          <div className="fig-tb-left">
            <div className="fig-tb-cell fig-tb-code">
              <span className="fig-meta-label">FIG</span>
              <span className="fig-meta-value">1.A</span>
            </div>
            <div className="fig-tb-cell">
              <span className="fig-meta-label">CLASSIFICATION</span>
              <span className="fig-meta-value">STRATEGY — INTERNAL</span>
            </div>
            <div className="fig-tb-cell">
              <span className="fig-meta-label">REV.</span>
              <span className="fig-meta-value">01</span>
            </div>
          </div>

          <div className="fig-tb-center">
            <div className="fig-tb-title">GC 360° MISSION ENGINE™</div>
            <div className="fig-tb-subtitle">Brand Transformation Execution System — Full Sequence</div>
          </div>

          <div className="fig-tb-right">
            <div className="fig-tb-cell">
              <span className="fig-meta-label">STATUS</span>
              <span className="fig-status-live">
                <span className="fig-status-dot" aria-hidden />
                LIVE
              </span>
            </div>
            <div className="fig-tb-cell">
              <span className="fig-meta-label">AGENCY</span>
              <span className="fig-meta-value">GC 360°</span>
            </div>
            <div className="fig-tb-cell">
              <span className="fig-meta-label">DATE</span>
              <span className="fig-meta-value" ref={figYearRef}>
                2024
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="engine-scroll-track" ref={trackRef}>
        <div className="engine-scroll-container">
          <div className="engine-sequence-wrap" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="engine-sequence-bg" src={ENGINE_BG_SRC} alt="" decoding="async" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={frameImgRef}
              className="engine-sequence-frame"
              src={frameUrl(0)}
              alt=""
              decoding="async"
            />
            <div className="engine-sequence-corner-blur" />
          </div>
          <div className="engine-scroll-gradient" aria-hidden />

          <div className="engine-overlay-texts">
            <div className="engine-text-step" data-step="0">
              <div className="ets-left">
                <div className="ets-line" />
                <h2 className="ets-heading">
                  <span>SCAN</span>
                  PHASE
                </h2>
                <div className="ets-line" />
              </div>
              <div className="ets-right">
                <div className="ets-line" />
                <p className="ets-description">
                  We study everything. Owner interviews, customer perception, and full market scans to map the
                  complete picture.
                </p>
                <div className="ets-line" />
              </div>
            </div>

            <div className="engine-text-step" data-step="1">
              <div className="ets-left">
                <div className="ets-line" />
                <h2 className="ets-heading">
                  <span>AI</span>
                  ANALYSIS
                </h2>
                <div className="ets-line" />
              </div>
              <div className="ets-right">
                <div className="ets-line" />
                <p className="ets-description">
                  AI-driven pattern detection decodes your brand position, maps consumer psychology, and identifies
                  hidden growth vectors.
                </p>
                <div className="bp-powered">
                  <svg viewBox="0 0 16 16" fill="none" width="12" height="12" aria-hidden>
                    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1" strokeDasharray="2 1.5" />
                    <circle cx="8" cy="8" r="2" fill="currentColor" />
                  </svg>
                  POWERED BY GC AI
                </div>
                <div className="ets-line" />
              </div>
            </div>

            <div className="engine-text-step" data-step="2">
              <div className="ets-left">
                <div className="ets-line" />
                <h2 className="ets-heading">
                  <span>STRATEGY</span>
                  BUILD
                </h2>
                <div className="ets-line" />
              </div>
              <div className="ets-right">
                <div className="ets-line" />
                <p className="ets-description">
                  The comeback design. Cost-optimised execution blueprints, forecast modelling, and launch
                  sequencing.
                </p>
                <div className="ets-line" />
              </div>
            </div>

            <div className="engine-text-step" data-step="3">
              <div className="ets-left">
                <div className="ets-line" />
                <h2 className="ets-heading">
                  <span>360°</span>
                  EXECUTION
                </h2>
                <div className="ets-line" />
              </div>
              <div className="ets-right">
                <div className="ets-line" />
                <p className="ets-description">
                  Rebuilding perception everywhere — social media, events, content systems, and precision
                  neuromarketing triggers.
                </p>
                <div className="ets-line" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import gsap from "gsap";
import { useCallback, useLayoutEffect, useRef, useSyncExternalStore } from "react";
import "./HomeBuildCreateCommunicate.scss";

type ProgressState = Readonly<{ build: number; create: number; communicate: number }>;

function setupCanvas(canvas: HTMLCanvasElement, cssW: number, cssH: number) {
  const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);
  const bw = Math.max(1, Math.floor(cssW * dpr));
  const bh = Math.max(1, Math.floor(cssH * dpr));
  canvas.width = bw;
  canvas.height = bh;
  canvas.style.width = `${cssW}px`;
  canvas.style.height = `${cssH}px`;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return ctx;
}

function smoothstep01(t: number): number {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

function mixGreyToBlack(t: number): string {
  const u = smoothstep01(t);
  if (u >= 0.92) return "#0a0a0a";
  const a = 0.22 + 0.78 * u;
  return `rgba(10, 10, 10, ${a})`;
}

/** Vertical interior: top of line is thin/grey, bottom is thick/black (junction around y = vy). */
function strokeVerticalGridLinePartial(
  ctx: CanvasRenderingContext2D,
  x: number,
  h: number,
  vy: number,
  thin: number,
  thick: number,
  t: number,
) {
  if (t <= 0) return;
  const end = Math.min(1, t);
  const band = Math.max(h * 0.07, 3);
  const steps = 40;
  for (let i = 0; i < steps; i++) {
    const sa = i / steps;
    const sb = (i + 1) / steps;
    if (sa >= end) break;
    const sbC = Math.min(sb, end);
    const yM = h * ((sa + sbC) / 2);
    const mix =
      yM <= vy - band ? 0 : yM >= vy + band ? 1 : (yM - (vy - band)) / (2 * band);
    const u = smoothstep01(mix);
    const lw = thin + (thick - thin) * u;
    const color = mixGreyToBlack(u);
    const ya = h * sa;
    const yb = h * sbC;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = lw;
    ctx.lineCap = "round";
    ctx.moveTo(x, ya);
    ctx.lineTo(x, yb);
    ctx.stroke();
  }
}

/** Horizontal interior: left thick/black → right thin/grey (junction around x = j). */
function strokeHorizontalGridLinePartial(
  ctx: CanvasRenderingContext2D,
  w: number,
  y: number,
  j: number,
  thin: number,
  thick: number,
  t: number,
) {
  if (t <= 0) return;
  const end = Math.min(1, t);
  const band = Math.max(w * 0.07, 3);
  const steps = 40;
  for (let i = 0; i < steps; i++) {
    const sa = i / steps;
    const sb = (i + 1) / steps;
    if (sa >= end) break;
    const sbC = Math.min(sb, end);
    const xM = w * ((sa + sbC) / 2);
    const mix =
      xM <= j - band ? 1 : xM >= j + band ? 0 : 1 - (xM - (j - band)) / (2 * band);
    const u = smoothstep01(mix);
    const lw = thin + (thick - thin) * u;
    const color = mixGreyToBlack(u);
    const xa = w * sa;
    const xb = w * sbC;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = lw;
    ctx.lineCap = "round";
    ctx.moveTo(xa, y);
    ctx.lineTo(xb, y);
    ctx.stroke();
  }
}

function strokeSegPartial(
  ctx: CanvasRenderingContext2D,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  lw: number,
  style: string,
  t: number,
) {
  if (t <= 0) return;
  const u = Math.min(1, t);
  const xe = x0 + (x1 - x0) * u;
  const ye = y0 + (y1 - y0) * u;
  ctx.beginPath();
  ctx.strokeStyle = style;
  ctx.lineWidth = lw;
  ctx.lineCap = "square";
  ctx.lineJoin = "miter";
  ctx.moveTo(x0, y0);
  ctx.lineTo(xe, ye);
  ctx.stroke();
}

function strokeCirclePartial(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  lw: number,
  style: string,
  t: number,
) {
  if (t <= 0) return;
  const u = Math.min(1, t);
  const start = -Math.PI / 2;
  const end = start + Math.PI * 2 * u;
  ctx.beginPath();
  ctx.strokeStyle = style;
  ctx.lineWidth = lw;
  ctx.lineCap = "round";
  ctx.arc(cx, cy, r, start, end);
  ctx.stroke();
}

function drawBuildGrid(ctx: CanvasRenderingContext2D, w: number, h: number, progress: number) {
  const vx = w / 3;
  const vy = h / 3;
  const thick = Math.max(2.75, Math.min(w, h) * 0.013);
  const thin = Math.max(1, thick * 0.32);
  const black = "#0a0a0a";

  /** 4 outer edges + 4 single interior lines (each line tapers along its length like the design). */
  const outer: ReadonlyArray<readonly [number, number, number, number, number, string]> = [
    [0, 0, w, 0, thick, black],
    [w, 0, w, h, thick, black],
    [w, h, 0, h, thick, black],
    [0, h, 0, 0, thick, black],
  ];

  const n = 8;
  const p = Math.max(0, Math.min(1, progress)) * n;

  for (let k = 0; k < 4; k++) {
    const [x0, y0, x1, y1, lw, style] = outer[k]!;
    const amt = Math.min(1, Math.max(0, p - k));
    strokeSegPartial(ctx, x0, y0, x1, y1, lw, style, amt);
  }

  const aV1 = Math.min(1, Math.max(0, p - 4));
  strokeVerticalGridLinePartial(ctx, vx, h, vy, thin, thick, aV1);

  const aV2 = Math.min(1, Math.max(0, p - 5));
  strokeVerticalGridLinePartial(ctx, 2 * vx, h, vy, thin, thick, aV2);

  const aH1 = Math.min(1, Math.max(0, p - 6));
  strokeHorizontalGridLinePartial(ctx, w, vy, 2 * vx, thin, thick, aH1);

  const aH2 = Math.min(1, Math.max(0, p - 7));
  strokeHorizontalGridLinePartial(ctx, w, 2 * vy, 2 * vx, thin, thick, aH2);
}

function drawCreateClover(ctx: CanvasRenderingContext2D, w: number, h: number, progress: number) {
  const cx = w / 2;
  const cy = h / 2;
  const s = Math.min(w, h);
  const d = s * 0.19;
  const R = s * 0.29;
  const lw = Math.max(1.5, s * 0.01);
  const centers: [number, number][] = [
    [cx - d, cy - d],
    [cx + d, cy - d],
    [cx - d, cy + d],
    [cx + d, cy + d],
  ];
  const n = centers.length;
  const p = Math.max(0, Math.min(1, progress)) * n;
  for (let k = 0; k < n; k++) {
    const amt = Math.min(1, Math.max(0, p - k));
    const [px, py] = centers[k]!;
    strokeCirclePartial(ctx, px, py, R, lw, "#ffffff", amt);
  }
}

function drawCommunicateRing(ctx: CanvasRenderingContext2D, w: number, h: number, progress: number) {
  const cx = w / 2;
  const cy = h / 2;
  const s = Math.min(w, h);
  const ringR = s * 0.36;
  const r = s * 0.065;
  const lw = Math.max(1.25, s * 0.008);
  const n = 8;
  const p = Math.max(0, Math.min(1, progress)) * n;
  ctx.strokeStyle = "#0a0a0a";
  for (let k = 0; k < n; k++) {
    const amt = Math.min(1, Math.max(0, p - k));
    const a = -Math.PI / 2 + (k * Math.PI) / 4;
    const px = cx + ringR * Math.cos(a);
    const py = cy + ringR * Math.sin(a);
    strokeCirclePartial(ctx, px, py, r, lw, "#0a0a0a", amt);
  }
}

export type HomeBuildCreateCommunicateProps = Readonly<{
  className?: string;
}>;

export default function HomeBuildCreateCommunicate({ className = "" }: HomeBuildCreateCommunicateProps) {
  const buildRef = useRef<HTMLCanvasElement>(null);
  const createRef = useRef<HTMLCanvasElement>(null);
  const communicateRef = useRef<HTMLCanvasElement>(null);
  const wrapBuildRef = useRef<HTMLDivElement>(null);
  const wrapCreateRef = useRef<HTMLDivElement>(null);
  const wrapCommRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef({ build: 0, create: 0, communicate: 0 });
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasPlayedRef = useRef(false);

  const prefersReducedMotion = useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );

  const paintFrame = useCallback((prog: ProgressState) => {
    const entries: ReadonlyArray<{
      key: keyof ProgressState;
      canvas: HTMLCanvasElement | null;
      wrap: HTMLDivElement | null;
      draw: (ctx: CanvasRenderingContext2D, w: number, h: number, p: number) => void;
    }> = [
      { key: "build", canvas: buildRef.current, wrap: wrapBuildRef.current, draw: drawBuildGrid },
      { key: "create", canvas: createRef.current, wrap: wrapCreateRef.current, draw: drawCreateClover },
      {
        key: "communicate",
        canvas: communicateRef.current,
        wrap: wrapCommRef.current,
        draw: drawCommunicateRing,
      },
    ];

    for (const { key, canvas, wrap, draw } of entries) {
      if (!canvas || !wrap) continue;
      const rect = wrap.getBoundingClientRect();
      const side = Math.max(120, Math.min(rect.width, 320));
      const ctx = setupCanvas(canvas, side, side);
      if (!ctx) continue;
      ctx.clearRect(0, 0, side, side);
      draw(ctx, side, side, prog[key]);
    }
  }, []);

  const paintFromRefs = useCallback(() => {
    paintFrame(progressRef.current);
  }, [paintFrame]);

  useLayoutEffect(() => {
    if (prefersReducedMotion) {
      progressRef.current = { build: 1, create: 1, communicate: 1 };
      paintFrame(progressRef.current);
      const ro = new ResizeObserver(() => paintFrame(progressRef.current));
      if (wrapBuildRef.current) ro.observe(wrapBuildRef.current);
      if (wrapCreateRef.current) ro.observe(wrapCreateRef.current);
      if (wrapCommRef.current) ro.observe(wrapCommRef.current);
      return () => ro.disconnect();
    }

    const runIntro = () => {
      if (hasPlayedRef.current) return;
      hasPlayedRef.current = true;
      gsap.set(progressRef.current, { build: 0, create: 0, communicate: 0 });
      timelineRef.current?.kill();
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        onUpdate: paintFromRefs,
      });
      tl.to(progressRef.current, { build: 1, duration: 2.35 }, 0);
      tl.to(progressRef.current, { create: 1, duration: 2.05 }, 0.12);
      tl.to(progressRef.current, { communicate: 1, duration: 1.85 }, 0.24);
      tl.eventCallback("onComplete", paintFromRefs);
      timelineRef.current = tl;
      tl.play(0);
    };

    paintFromRefs();

    const section = sectionRef.current;
    const io =
      section &&
      new IntersectionObserver(
        (hits) => {
          if (hits.some((h) => h.isIntersecting)) {
            runIntro();
          }
        },
        { root: null, threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
      );
    if (section) io?.observe(section);

    requestAnimationFrame(() => {
      const el = sectionRef.current;
      if (!el || hasPlayedRef.current) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.top < vh * 0.92 && r.bottom > vh * 0.08) {
        runIntro();
      }
    });

    const ro = new ResizeObserver(() => {
      paintFromRefs();
    });
    if (wrapBuildRef.current) ro.observe(wrapBuildRef.current);
    if (wrapCreateRef.current) ro.observe(wrapCreateRef.current);
    if (wrapCommRef.current) ro.observe(wrapCommRef.current);
    window.addEventListener("resize", paintFromRefs);

    return () => {
      io?.disconnect();
      ro.disconnect();
      window.removeEventListener("resize", paintFromRefs);
      timelineRef.current?.kill();
      timelineRef.current = null;
    };
  }, [paintFrame, paintFromRefs, prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className={`home-bcc ${className}`.trim()}
      aria-label="Build, Create, Communicate"
    >
      <div className="home-bcc__grid">
        <div className="home-bcc__panel home-bcc__panel--light">
          <div className="home-bcc__head">
            <h2 className="home-bcc__title">Build</h2>
            <span className="home-bcc__accent home-bcc__accent--fill" aria-hidden />
          </div>
          <div ref={wrapBuildRef} className="home-bcc__canvas-wrap">
            <canvas ref={buildRef} className="home-bcc__canvas" aria-hidden />
          </div>
        </div>

        <div className="home-bcc__panel home-bcc__panel--dark">
          <div className="home-bcc__head">
            <h2 className="home-bcc__title">Create</h2>
            <span className="home-bcc__accent home-bcc__accent--ring" aria-hidden />
          </div>
          <div ref={wrapCreateRef} className="home-bcc__canvas-wrap">
            <canvas ref={createRef} className="home-bcc__canvas" aria-hidden />
          </div>
        </div>

        <div className="home-bcc__panel home-bcc__panel--light">
          <div className="home-bcc__head">
            <h2 className="home-bcc__title">Communicate</h2>
            <span className="home-bcc__accent home-bcc__accent--fill" aria-hidden />
          </div>
          <div ref={wrapCommRef} className="home-bcc__canvas-wrap">
            <canvas ref={communicateRef} className="home-bcc__canvas" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}

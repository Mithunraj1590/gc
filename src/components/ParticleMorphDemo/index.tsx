"use client";

/**
 * Three.js + GSAP: sphere of points ↔ text morph.
 * Interactive (input) or automatic cycle via `autoCycleTexts`.
 */

import gsap from "gsap";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  WebGLRenderer,
} from "three";
import type { BufferAttribute as BufferAttributeType } from "three";
import "./ParticleMorphDemo.scss";

const COUNT = 12000;

function sphericalDistribution(i: number, count: number, radius: number) {
  const phi = Math.acos(-1 + (2 * i) / count);
  const theta = Math.sqrt(count * Math.PI) * phi;
  return {
    x: radius * Math.cos(theta) * Math.sin(phi),
    y: radius * Math.sin(theta) * Math.sin(phi),
    z: radius * Math.cos(phi),
  };
}

function createTextPoints(text: string): { x: number; y: number }[] {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return [];

  const fontSize = 100;
  const padding = 20;

  ctx.font = `bold ${fontSize}px Arial`;
  const textWidth = Math.ceil(ctx.measureText(text).width);
  canvas.width = textWidth + padding * 2;
  canvas.height = fontSize + padding * 2;

  ctx.fillStyle = "#ffffff";
  ctx.font = `bold ${fontSize}px Arial`;
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;
  const points: { x: number; y: number }[] = [];
  const threshold = 128;

  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i]! > threshold) {
      const x = (i / 4) % canvas.width;
      const y = Math.floor(i / 4 / canvas.width);
      if (Math.random() < 0.3) {
        points.push({
          x: (x - canvas.width / 2) / (fontSize / 10),
          y: -(y - canvas.height / 2) / (fontSize / 10),
        });
      }
    }
  }

  return points;
}

export type ParticleMorphDemoProps = Readonly<{
  className?: string;
  /** When set, input is hidden. One word: sphere → word, then stays on word. Several: sphere ↔ words loop. */
  autoCycleTexts?: readonly string[];
  /** Ms to hold each word before returning to sphere (auto mode). */
  holdOnTextMs?: number;
  /** Ms on sphere before the next word (auto mode). */
  pauseOnSphereMs?: number;
  /** Seconds on initial sphere before first morph (auto mode). */
  introSphereSec?: number;
  /** Button label (interactive mode only). */
  buttonLabel?: string;
  inputPlaceholder?: string;
  inputMaxLength?: number;
  /** Clear WebGL with alpha so layers behind (e.g. HomeCreate lines) stay visible. */
  showBackgroundThrough?: boolean;
}>;

export default function ParticleMorphDemo({
  className = "",
  autoCycleTexts,
  holdOnTextMs = 4000,
  pauseOnSphereMs = 900,
  introSphereSec = 1,
  buttonLabel = "Create",
  inputPlaceholder = "Type something...",
  inputMaxLength = 20,
  showBackgroundThrough = false,
}: ParticleMorphDemoProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);

  const [mounted, setMounted] = useState(false);
  const autoMode = Boolean(autoCycleTexts?.length);
  const cycleKey = autoMode ? autoCycleTexts!.join("\0") : "";

  const prefersReducedMotion = useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );

  useEffect(() => {
    setMounted(true);
    const container = containerRef.current;
    if (!container) return;

    if (prefersReducedMotion) return;

    const scene = new Scene();
    const camera = new PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new WebGLRenderer({ antialias: true, alpha: showBackgroundThrough });
    if (showBackgroundThrough) {
      scene.background = null;
      renderer.setClearColor(0x000000, 0);
    } else {
      renderer.setClearColor(0x000000);
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    camera.position.z = 25;

    const geometry = new BufferGeometry();
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      const point = sphericalDistribution(i, COUNT, 8);
      positions[i * 3] = point.x + (Math.random() - 0.5) * 0.5;
      positions[i * 3 + 1] = point.y + (Math.random() - 0.5) * 0.5;
      positions[i * 3 + 2] = point.z + (Math.random() - 0.5) * 0.5;

      const depth = Math.sqrt(point.x * point.x + point.y * point.y + point.z * point.z) / 8;
      const color = new Color();
      color.setHSL(0.5 + depth * 0.2, 0.7, 0.4 + depth * 0.3);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute("position", new BufferAttribute(positions, 3));
    geometry.setAttribute("color", new BufferAttribute(colors, 3));

    const material = new PointsMaterial({
      size: 0.08,
      vertexColors: true,
      blending: AdditiveBlending,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });

    const particles = new Points(geometry, material);
    scene.add(particles);

    const posAttr = geometry.attributes.position as BufferAttributeType;
    const colAttr = geometry.attributes.color as BufferAttributeType;
    const posArr = posAttr.array as Float32Array;
    const colArr = colAttr.array as Float32Array;

    let currentState: "sphere" | "text" = "sphere";
    let activeTween: gsap.core.Tween | null = null;
    let returnTimer: number | null = null;
    let introTimer: number | null = null;
    let spherePauseTimer: number | null = null;

    const killMorph = () => {
      activeTween?.kill();
      activeTween = null;
      if (returnTimer !== null) {
        clearTimeout(returnTimer);
        returnTimer = null;
      }
    };

    const killSequenceTimers = () => {
      if (introTimer !== null) {
        clearTimeout(introTimer);
        introTimer = null;
      }
      if (spherePauseTimer !== null) {
        clearTimeout(spherePauseTimer);
        spherePauseTimer = null;
      }
    };

    const resize = () => {
      const w = Math.max(1, container.clientWidth);
      const h = Math.max(1, container.clientHeight);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const morphToSphere = (onComplete?: () => void) => {
      killMorph();
      currentState = "sphere";

      const targetPositions = new Float32Array(COUNT * 3);
      const targetColors = new Float32Array(COUNT * 3);

      for (let i = 0; i < COUNT; i++) {
        const point = sphericalDistribution(i, COUNT, 8);
        targetPositions[i * 3] = point.x + (Math.random() - 0.5) * 0.5;
        targetPositions[i * 3 + 1] = point.y + (Math.random() - 0.5) * 0.5;
        targetPositions[i * 3 + 2] = point.z + (Math.random() - 0.5) * 0.5;

        const depth = Math.sqrt(point.x * point.x + point.y * point.y + point.z * point.z) / 8;
        const color = new Color();
        color.setHSL(0.5 + depth * 0.2, 0.7, 0.4 + depth * 0.3);
        targetColors[i * 3] = color.r;
        targetColors[i * 3 + 1] = color.g;
        targetColors[i * 3 + 2] = color.b;
      }

      const startPos = Float32Array.from(posArr);
      const startCol = Float32Array.from(colArr);
      const prog = { t: 0 };
      activeTween = gsap.to(prog, {
        t: 1,
        duration: 2,
        ease: "power2.inOut",
        onUpdate: () => {
          const t = prog.t;
          for (let i = 0; i < COUNT * 3; i++) {
            posArr[i] = startPos[i]! + (targetPositions[i]! - startPos[i]!) * t;
            colArr[i] = startCol[i]! + (targetColors[i]! - startCol[i]!) * t;
          }
          posAttr.needsUpdate = true;
          colAttr.needsUpdate = true;
        },
        onComplete: () => {
          activeTween = null;
          onComplete?.();
        },
      });
    };

    const morphToText = (
      text: string,
      holdMs: number,
      afterSphere?: () => void,
      stayOnText = false,
    ) => {
      killMorph();
      currentState = "text";

      const textPoints = createTextPoints(text);
      const targetPositions = new Float32Array(COUNT * 3);

      for (let i = 0; i < COUNT; i++) {
        if (i < textPoints.length) {
          const p = textPoints[i]!;
          targetPositions[i * 3] = p.x;
          targetPositions[i * 3 + 1] = p.y;
          targetPositions[i * 3 + 2] = 0;
        } else {
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * 20 + 10;
          targetPositions[i * 3] = Math.cos(angle) * radius;
          targetPositions[i * 3 + 1] = Math.sin(angle) * radius;
          targetPositions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
      }

      gsap.to(particles.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.5,
      });

      const startPos = Float32Array.from(posArr);
      const prog = { t: 0 };
      activeTween = gsap.to(prog, {
        t: 1,
        duration: 2,
        ease: "power2.inOut",
        onUpdate: () => {
          const t = prog.t;
          for (let i = 0; i < COUNT * 3; i++) {
            posArr[i] = startPos[i]! + (targetPositions[i]! - startPos[i]!) * t;
          }
          posAttr.needsUpdate = true;
        },
        onComplete: () => {
          activeTween = null;
          if (stayOnText) return;
          returnTimer = window.setTimeout(() => {
            returnTimer = null;
            morphToSphere(afterSphere);
          }, holdMs);
        },
      });
    };

    if (autoMode && autoCycleTexts!.length > 0) {
      const words = autoCycleTexts!;

      if (words.length === 1) {
        introTimer = window.setTimeout(() => {
          introTimer = null;
          morphToText(words[0]!, holdOnTextMs, undefined, true);
        }, introSphereSec * 1000);
      } else {
        let idx = 0;
        const runNext = () => {
          const w = words[idx]!;
          morphToText(w, holdOnTextMs, () => {
            idx = (idx + 1) % words.length;
            spherePauseTimer = window.setTimeout(() => {
              spherePauseTimer = null;
              runNext();
            }, pauseOnSphereMs);
          });
        };

        introTimer = window.setTimeout(() => {
          introTimer = null;
          runNext();
        }, introSphereSec * 1000);
      }
    }

    const submit = () => {
      if (autoMode) return;
      const raw = inputRef.current?.value.trim() ?? "";
      if (raw) morphToText(raw.slice(0, inputMaxLength), 4000);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") submit();
    };

    const inputEl = inputRef.current;
    const btn = submitRef.current;
    if (!autoMode) {
      inputEl?.addEventListener("keydown", onKeyDown);
      btn?.addEventListener("click", submit);
    }

    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (currentState === "sphere") {
        particles.rotation.y += 0.002;
      }
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      killMorph();
      killSequenceTimers();
      if (!autoMode) {
        inputEl?.removeEventListener("keydown", onKeyDown);
        btn?.removeEventListener("click", submit);
      }
      ro.disconnect();
      gsap.killTweensOf(particles.rotation);
      scene.remove(particles);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [
    autoMode,
    cycleKey,
    holdOnTextMs,
    inputMaxLength,
    introSphereSec,
    pauseOnSphereMs,
    prefersReducedMotion,
    showBackgroundThrough,
  ]);

  return (
    <div
      ref={rootRef}
      className={`particle-morph-demo${showBackgroundThrough ? " particle-morph-demo--through" : ""} ${className}`.trim()}
    >
      {mounted && prefersReducedMotion ? (
        <div className="particle-morph-demo__fallback">
          Particle morph is disabled when &quot;Reduce motion&quot; is on.
        </div>
      ) : null}
      <div ref={containerRef} className="particle-morph-demo__container" id="particle-morph-container" />
      {!autoMode ? (
        <div className="particle-morph-demo__input-container">
          <div className="particle-morph-demo__input-wrapper">
            <input
              ref={inputRef}
              type="text"
              className="particle-morph-demo__input"
              placeholder={inputPlaceholder}
              maxLength={inputMaxLength}
              id="particle-morph-text"
              aria-label={inputPlaceholder}
            />
            <button ref={submitRef} type="button" className="particle-morph-demo__submit">
              <span className="particle-morph-demo__button-content">
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="particle-morph-demo__button-label">{buttonLabel}</span>
              </span>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

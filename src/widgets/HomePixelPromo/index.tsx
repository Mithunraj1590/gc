"use client";

import { useMemo } from "react";
import type { CSSProperties } from "react";
import "./HomePixelPromo.scss";

type PixelDot = Readonly<{
  x: number;
  y: number;
  size: number;
  cluster: "tl" | "br" | "top";
  speed: number;
}>;

const PIXELS: readonly PixelDot[] = [
  // Top-Left Cluster (High density chunky pixels)
  { x: -40, y: -40, size: 280, cluster: "tl", speed: 0.12 },
  { x: 220, y: -40, size: 120, cluster: "tl", speed: 0.18 },
  { x: -40, y: 220, size: 120, cluster: "tl", speed: 0.15 },
  { x: 320, y: 0, size: 80, cluster: "tl", speed: 0.22 },
  { x: 0, y: 320, size: 80, cluster: "tl", speed: 0.25 },
  { x: 380, y: 80, size: 40, cluster: "tl", speed: 0.3 },
  { x: 80, y: 380, size: 40, cluster: "tl", speed: 0.32 },
  { x: 400, y: 0, size: 40, cluster: "tl", speed: 0.35 },

  // Bottom-Right Cluster (Anchored - use negative X/Y to move inside)
  { x: -20, y: -20, size: 240, cluster: "br", speed: 0.1 },
  { x: -140, y: -40, size: 120, cluster: "br", speed: 0.15 },
  { x: -60, y: -140, size: 120, cluster: "br", speed: 0.14 },
  { x: -260, y: -80, size: 100, cluster: "br", speed: 0.18 },
  { x: -200, y: -120, size: 60, cluster: "br", speed: 0.22 },
  { x: -320, y: -40, size: 80, cluster: "br", speed: 0.2 },
  { x: -240, y: -180, size: 40, cluster: "br", speed: 0.3 },
  { x: -140, y: -220, size: 60, cluster: "br", speed: 0.28 },
  { x: -60, y: -280, size: 80, cluster: "br", speed: 0.22 },
  { x: -380, y: -20, size: 60, cluster: "br", speed: 0.35 },
  { x: -440, y: -100, size: 40, cluster: "br", speed: 0.4 },
  { x: -500, y: -40, size: 80, cluster: "br", speed: 0.25 },
  { x: -580, y: -10, size: 120, cluster: "br", speed: 0.15 },

  // Scattered "Top" cluster for the jagged transition
  { x: 600, y: -20, size: 100, cluster: "top", speed: 0.12 },
  { x: 640, y: 80, size: 60, cluster: "top", speed: 0.2 },
  { x: 740, y: 0, size: 40, cluster: "top", speed: 0.28 },
  { x: 540, y: 60, size: 20, cluster: "top", speed: 0.4 },
];

export default function HomePixelPromo({ className = "" }: { className?: string }) {
  const dots = useMemo(() => PIXELS, []);

  return (
    <section
      className={`home-pixel-promo ${className}`.trim()}
    >

      <div className="home-pixel-promo__panel">
        <div className="home-pixel-promo__cluster home-pixel-promo__cluster--tl" aria-hidden>
          {dots.filter(d => d.cluster === "tl").map((dot, i) => (
            <span
              key={`tl-${i}`}
              className="home-pixel-promo__pixel"
              style={{ "--x": `${dot.x}px`, "--y": `${dot.y}px`, "--size": `${dot.size}px` } as CSSProperties}
            />
          ))}
        </div>

        <div className="home-pixel-promo__cluster home-pixel-promo__cluster--top" aria-hidden>
          {dots.filter(d => d.cluster === "top").map((dot, i) => (
            <span
              key={`top-${i}`}
              className="home-pixel-promo__pixel"
              style={{ "--x": `${dot.x}px`, "--y": `${dot.y}px`, "--size": `${dot.size}px` } as CSSProperties}
            />
          ))}
        </div>

        <div className="home-pixel-promo__cluster home-pixel-promo__cluster--br" aria-hidden>
          {dots.filter(d => d.cluster === "br").map((dot, i) => (
            <span
              key={`br-${i}`}
              className="home-pixel-promo__pixel"
              style={{ "--x": `${dot.x}px`, "--y": `${dot.y}px`, "--size": `${dot.size}px` } as CSSProperties}
            />
          ))}
        </div>

        <div className="home-pixel-promo__content">
          <div className="container">

            <div className="home-pixel-promo__headline">
              <h2 data-pixel-text>GC 360⁰</h2>
              <p data-pixel-text>
                The new way
                <br />
                of marketing
              </p>
            </div>
            <div className="home-pixel-promo__cta">
              <button className="home-pixel-promo__button">Know More &gt;</button>
            </div>
          </div>


        </div>
      </div>

    </section>
  );
}

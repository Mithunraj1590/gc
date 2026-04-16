"use client";

import { Button } from "@/components/Button";
import gsap from "gsap";
import { useLayoutEffect, useMemo, useRef } from "react";
import type { CSSProperties } from "react";
import "./HomePixelPromo.scss";

type PixelDot = Readonly<{
  x: number;
  y: number;
  size: number;
  delay: number;
  cluster: "tl" | "br";
}>;

const TOP_LEFT_PIXELS: readonly PixelDot[] = [
  { x: 0, y: 0, size: 96, delay: 0, cluster: "tl" },
  { x: 80, y: 0, size: 72, delay: 0.08, cluster: "tl" },
  { x: 152, y: 0, size: 56, delay: 0.13, cluster: "tl" },
  { x: 216, y: 0, size: 38, delay: 0.19, cluster: "tl" },
  { x: 216, y: 38, size: 38, delay: 0.24, cluster: "tl" },
  { x: 254, y: 38, size: 28, delay: 0.28, cluster: "tl" },
  { x: 282, y: 66, size: 22, delay: 0.34, cluster: "tl" },
  { x: 322, y: 8, size: 18, delay: 0.38, cluster: "tl" },
];

const BOTTOM_RIGHT_PIXELS: readonly PixelDot[] = [
  { x: 0, y: 0, size: 98, delay: 0, cluster: "br" },
  { x: 98, y: 0, size: 66, delay: 0.06, cluster: "br" },
  { x: 164, y: 0, size: 42, delay: 0.12, cluster: "br" },
  { x: 206, y: 42, size: 42, delay: 0.18, cluster: "br" },
  { x: 248, y: 42, size: 28, delay: 0.22, cluster: "br" },
  { x: 276, y: 70, size: 20, delay: 0.29, cluster: "br" },
  { x: 138, y: 66, size: 18, delay: 0.34, cluster: "br" },
  { x: 182, y: 84, size: 16, delay: 0.4, cluster: "br" },
];

export type HomePixelPromoProps = Readonly<{
  className?: string;
}>;

export default function HomePixelPromo({ className = "" }: HomePixelPromoProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const dots = useMemo(() => [...TOP_LEFT_PIXELS, ...BOTTOM_RIGHT_PIXELS], []);

  useLayoutEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const pixelEls = root.querySelectorAll<HTMLElement>("[data-pixel-dot]");
      const textEls = root.querySelectorAll<HTMLElement>("[data-pixel-text]");
      const buttonEl = root.querySelector<HTMLElement>("[data-pixel-cta]");

      gsap.fromTo(
        pixelEls,
        { opacity: 0.25 },
        {
          opacity: 1,
          duration: 0.45,
          ease: "steps(1)",
          stagger: 0.03,
          yoyo: true,
          repeat: -1,
          repeatDelay: 0.25,
        },
      );

      gsap.from(textEls, {
        opacity: 0,
        y: 36,
        duration: 0.9,
        stagger: 0.08,
        ease: "power2.out",
      });

      if (buttonEl) {
        gsap.from(buttonEl, {
          opacity: 0,
          y: 24,
          duration: 0.72,
          ease: "power2.out",
          delay: 0.35,
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`home-pixel-promo ${className}`.trim()}
      aria-label="GC 360 pixel promo"
    >
      <div className="home-pixel-promo__panel">
        <div className="home-pixel-promo__cluster home-pixel-promo__cluster--tl" aria-hidden>
          {dots
            .filter((dot) => dot.cluster === "tl")
            .map((dot, i) => (
              <span
                key={`tl-${i}`}
                data-pixel-dot
                className="home-pixel-promo__pixel"
                style={
                  {
                    "--x": `${dot.x}px`,
                    "--y": `${dot.y}px`,
                    "--size": `${dot.size}px`,
                    "--delay": `${dot.delay}s`,
                  } as CSSProperties
                }
              />
            ))}
        </div>

        <div className="home-pixel-promo__cluster home-pixel-promo__cluster--br" aria-hidden>
          {dots
            .filter((dot) => dot.cluster === "br")
            .map((dot, i) => (
              <span
                key={`br-${i}`}
                data-pixel-dot
                className="home-pixel-promo__pixel"
                style={
                  {
                    "--x": `${dot.x}px`,
                    "--y": `${dot.y}px`,
                    "--size": `${dot.size}px`,
                    "--delay": `${dot.delay}s`,
                  } as CSSProperties
                }
              />
            ))}
        </div>

        <div className="home-pixel-promo__content">
          <div className="home-pixel-promo__headline">
            <h2 data-pixel-text>GC 360⁰</h2>
            <p data-pixel-text>
              The new way
              <br />
              of marketing
            </p>
          </div>

          <div data-pixel-cta>
            <Button variant="secondary" size="md" className="home-pixel-promo__button">
              Know More &gt;
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

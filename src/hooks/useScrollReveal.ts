"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, type RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

export type ScrollRevealConfig = Readonly<{
  selector?: string;
  start?: string;
  y?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
}>;

/**
 * Scroll-driven fade + rise for `[data-reveal]` descendants (or custom selector).
 * Works with Lenis via ScrollTrigger scrollerProxy on `document.documentElement`.
 */
export function useScrollReveal(
  rootRef: RefObject<HTMLElement | null>,
  {
    selector = "[data-reveal]",
    start = "top 88%",
    y = 44,
    duration = 0.85,
    stagger = 0.09,
    delay = 0,
  }: ScrollRevealConfig = {},
) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const els = root.querySelectorAll<HTMLElement>(selector);
      if (!els.length) return;

      gsap.from(els, {
        opacity: 0,
        y,
        duration,
        ease: "power2.out",
        stagger,
        delay,
        scrollTrigger: {
          trigger: root,
          start,
          toggleActions: "play none none none",
          once: true,
          invalidateOnRefresh: true,
        },
      });
    }, root);

    const raf = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, [rootRef, selector, start, y, duration, stagger, delay]);
}

"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function LenisProvider() {
  useEffect(() => {
    const lenis = new Lenis({
      // Use lerp-based smoothing for steadier frame pacing.
      lerp: 0.085,
      smoothWheel: true,
      syncTouch: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
      autoRaf: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}

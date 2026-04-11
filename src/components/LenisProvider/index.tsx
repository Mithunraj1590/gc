"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

    const onLenisScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", onLenisScroll);

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    const onStRefresh = () => {
      lenis.resize();
    };
    ScrollTrigger.addEventListener("refresh", onStRefresh);

    return () => {
      ScrollTrigger.removeEventListener("refresh", onStRefresh);
      lenis.off("scroll", onLenisScroll);
      lenis.destroy();
      ScrollTrigger.clearScrollMemory();
      ScrollTrigger.refresh();
    };
  }, []);

  return null;
}

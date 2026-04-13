"use client";

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

gsap.registerPlugin(ScrollTrigger);

type LenisScrollToOptions = NonNullable<Parameters<Lenis["scrollTo"]>[1]>;

export interface LenisContextType {
  start: () => void;
  stop: () => void;
  raf: (time: number) => void;
  destroy: () => void;
  scrollTo: (target: number | string | HTMLElement, options?: LenisScrollToOptions) => void;
  /** Current animated scroll (reads live from the Lenis instance). */
  get scroll(): number;
}

const LenisContext = createContext<LenisContextType | null>(null);

export function useLenis(): LenisContextType | null {
  return useContext(LenisContext);
}

interface LenisScrollProps {
  children: ReactNode;
}

/**
 * Lenis + React context. Options match your snippet, mapped to Lenis v1.3 API.
 * GSAP ScrollTrigger uses the same ticker as Lenis for smooth updates.
 */
export default function LenisScroll({ children }: LenisScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      // v1.3 names (was: smooth, mouseMultiplier, smoothTouch, direction, gestureDirection)
      duration: 2.0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      syncTouch: false,
      touchMultiplier: 2,
      infinite: false,
      autoRaf: false,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    const onLenisScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", onLenisScroll);

    const onTick = () => {
      lenis.raf(performance.now());
    };
    gsap.ticker.add(onTick);

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
      gsap.ticker.remove(onTick);
      ScrollTrigger.removeEventListener("refresh", onStRefresh);
      lenis.off("scroll", onLenisScroll);
      lenis.destroy();
      lenisRef.current = null;
      ScrollTrigger.clearScrollMemory();
      ScrollTrigger.refresh();
    };
  }, []);

  /** Recalc scroll range after fonts/images/layout — avoids max scroll ending early (e.g. before footer). */
  useEffect(() => {
    if (!lenisInstance) return;

    const sync = () => {
      lenisInstance.resize();
      ScrollTrigger.refresh();
    };

    sync();
    let cancelled = false;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!cancelled) sync();
      });
    });

    const onLoad = () => sync();
    window.addEventListener("load", onLoad);

    return () => {
      cancelled = true;
      window.removeEventListener("load", onLoad);
    };
  }, [lenisInstance]);

  const contextValue = useMemo<LenisContextType | null>(() => {
    if (!lenisInstance) return null;
    const l = lenisInstance;
    return {
      start: () => l.start(),
      stop: () => l.stop(),
      raf: (time: number) => l.raf(time),
      destroy: () => {
        l.destroy();
        lenisRef.current = null;
      },
      scrollTo: (target, options) => {
        l.scrollTo(target, options);
      },
      get scroll() {
        return l.scroll;
      },
    };
  }, [lenisInstance]);

  return <LenisContext.Provider value={contextValue}>{children}</LenisContext.Provider>;
}

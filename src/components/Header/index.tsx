"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type LocationItem = Readonly<{
  city: string;
  zone: string;
  offset: number;
}>;

const locations: LocationItem[] = [
  { city: "UNITED KINGDOM", zone: "BST", offset: 1 },
  { city: "NEW ZEALAND", zone: "NZST", offset: 13 },
  { city: "INDIA", zone: "IST", offset: 5.5 },
];

const formatLocationTime = (zone: string, offset: number) => {
  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  const shifted = new Date(utcMs + offset * 3600000);
  const hh = shifted.getHours().toString().padStart(2, "0");
  const mm = shifted.getMinutes().toString().padStart(2, "0");
  return `${zone} ${hh}:${mm}`;
};

export default function Header() {
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
  const locTextRef = useRef<HTMLSpanElement>(null);
  const locTimeRef = useRef<HTMLSpanElement>(null);

  const current = locations[currentLocationIndex];
  const currentTime = formatLocationTime(current.zone, current.offset);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const targets = [locTextRef.current, locTimeRef.current].filter(
        (node): node is HTMLElement => Boolean(node)
      );

      if (!targets.length) {
        setCurrentLocationIndex((prev) => (prev + 1) % locations.length);
        return;
      }

      gsap.to(targets, {
        opacity: 0,
        y: -10,
        duration: 0.45,
        onComplete: () => {
          setCurrentLocationIndex((prev) => (prev + 1) % locations.length);
          gsap.to(targets, {
            opacity: 1,
            y: 0,
            duration: 0.45,
          });
        },
      });
    }, 4000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return (
    <header className="pointer-events-none fixed top-0 z-2000 flex w-full items-center justify-between bg-linear-to-b from-black/65 to-transparent px-6 py-4 md:px-10">
      <div className="pointer-events-auto">
        <div className="flex items-center text-white">
          <svg width="72" height="36" viewBox="0 0 368 187" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="360" height="179" rx="18" stroke="currentColor" strokeWidth="8" />
            <path
              d="M91 94c0-25 18-43 44-43 12 0 23 3 31 10l-8 16c-6-5-13-7-22-7-16 0-27 10-27 24s11 24 27 24c9 0 16-2 22-7l8 16c-8 7-19 10-31 10-26 0-44-18-44-43Z"
              fill="currentColor"
            />
            <path
              d="M189 50h30c33 0 54 17 54 43s-21 43-54 43h-30V50Zm29 68c20 0 33-9 33-25s-13-25-33-25h-8v50h8Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>

      <div className="pointer-events-auto text-right text-[0.58rem] tracking-[0.12em]">
        <span ref={locTextRef} className="block font-normal text-white/35">
          {current.city}
        </span>
        <span ref={locTimeRef} className="text-[0.6rem] font-semibold text-white/70">
          {currentTime}
        </span>
      </div>
    </header>
  );
}

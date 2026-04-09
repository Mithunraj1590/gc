"use client";

import Link from "next/link";
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
    <header className="pointer-events-none fixed top-0 z-2000 flex w-full items-center justify-between px-6 py-4 md:px-10">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/75 via-black/35 to-transparent" />
      <div className="pointer-events-auto">
        <Link
          href="/"
          className="inline-flex items-center text-white outline-offset-4 transition-opacity"
          aria-label="Back to home"
        >
          <svg
            width="72"
            height="36"
            viewBox="0 0 368 187"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
                    <g clipPath="url(#clip0_2_16)">
                        <path d="M0 96.5341C0 78.5039 4.02492 62.5373 12.0573 48.5993C20.0896 34.6788 31.9369 23.7662 47.599 15.8966C63.2612 8.02698 82.6508 4.09216 105.768 4.09216C114.955 4.09216 123.197 4.70425 130.495 5.92841C137.792 7.15258 143.165 8.51665 146.612 9.98564V53.7408H143.655C140.207 51.9395 135.255 50.4181 128.78 49.1939C122.305 47.9697 115.463 47.3577 108.235 47.3577C89.0557 47.3577 75.0735 51.7821 66.2887 60.6311C57.5213 69.4801 53.1289 81.7742 53.1289 97.5135C53.1289 106.695 54.9314 114.844 58.5363 121.979C62.1412 129.114 67.2686 134.676 73.9185 138.698C80.5684 142.72 88.3907 144.714 97.403 144.714C102.163 144.714 106.013 144.189 108.97 143.122C111.928 142.056 114.465 139.975 116.6 136.862L107.255 164.878V93.089H154.487V177.154C147.592 180.11 139.227 182.488 129.392 184.289C119.558 186.091 108.568 187 96.423 187C75.1085 187 57.3113 183.24 43.0491 175.685C28.7869 168.148 18.0421 157.585 10.8323 143.979C3.62243 130.374 0.0174996 114.564 0.0174996 96.5341" fill="currentColor"/>
                        <path d="M164.812 95.5549C164.812 76.8776 168.539 60.6837 176.011 47.008C183.466 33.3323 194.701 22.752 209.716 15.3021C224.713 7.85219 243.542 4.10974 266.169 4.10974C274.534 4.10974 282.164 4.72182 289.041 5.94599C295.936 7.17016 301.099 8.53422 304.546 10.0032V53.7584H301.589C298.141 51.9571 293.626 50.4357 288.062 49.2115C282.479 47.9873 276.494 47.3752 270.107 47.3752C257.315 47.3752 247.112 49.4738 239.483 53.636C231.853 57.8156 226.358 63.5517 222.998 70.8442C219.638 78.1368 217.958 86.3737 217.958 95.5549C217.958 104.736 219.638 112.973 222.998 120.266C226.358 127.558 231.853 133.294 239.483 137.474C247.112 141.653 257.315 143.735 270.107 143.735C276.494 143.735 282.479 143.087 288.062 141.776C293.626 140.464 298.141 138.995 301.589 137.351H304.546V181.107C301.099 182.576 295.936 183.94 289.041 185.164C282.147 186.388 274.534 187 266.169 187C243.542 187 224.713 183.275 209.716 175.808C194.718 168.358 183.484 157.777 176.011 144.102C168.539 130.426 164.812 114.232 164.812 95.5549Z" fill="currentColor"/>
                        <path d="M340.946 187C332.914 187 326.386 184.499 321.381 179.498C316.376 174.496 313.874 167.99 313.874 159.946C313.874 151.901 316.376 145.203 321.381 140.272C326.386 135.358 332.896 132.892 340.946 132.892C348.996 132.892 355.698 135.358 360.633 140.272C365.55 145.186 368.018 151.744 368.018 159.946C368.018 168.148 365.55 174.496 360.633 179.498C355.716 184.499 349.153 187 340.946 187Z" fill="currentColor"/>
                        <path d="M333.49 0H344.148V1.59142H339.738V13.6757H337.9V1.59142H333.49V0Z" fill="currentColor"/>
                        <path d="M345.093 13.6757V0H346.615L351.445 7.51987H350.675L355.505 0H357.028V13.6757H355.208V2.97297L355.593 3.09539L351.778 8.97138H350.343L346.51 3.09539L346.913 2.97297V13.6757H345.093Z" fill="currentColor"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_2_16">
                            <rect width="368" height="187" fill="white"/>
                        </clipPath>
                    </defs>
          </svg>
        </Link>
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

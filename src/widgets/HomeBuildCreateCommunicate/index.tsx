"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import gsap from "gsap";
import { useCallback, useLayoutEffect, useRef } from "react";
import "./HomeBuildCreateCommunicate.scss";
import CreativeIntelligenceCTA from "@/components/CreativeIntelligenceCTA";

type ProgressState = Readonly<{ build: number; create: number; communicate: number }>;

type HomeBuildCreateCommunicateProps = Readonly<{
  className?: string;
}>;

export default function HomeBuildCreateCommunicate({ className = "" }: HomeBuildCreateCommunicateProps) {
  const buildSvgRef = useRef<SVGSVGElement>(null);
  const createSvgRef = useRef<SVGSVGElement>(null);
  const communicateSvgRef = useRef<SVGSVGElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useScrollReveal(sectionRef, { stagger: 0.18, y: 48 });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Drawing animation for SVGs
    const animateSvg = (svg: SVGSVGElement | null, type: "build" | "create" | "communicate") => {
      if (!svg) return;
      const paths = Array.from(svg.querySelectorAll("path"));

      // Reset
      gsap.set(paths, { opacity: 0, clipPath: "inset(0% 0% 0% 0%)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: svg,
          start: "top 85%",
          toggleActions: "play none none none",
          refreshPriority: 1,
        }
      });

      paths.forEach((path, i) => {
        let fromClip = "inset(0% 0% 100% 0%)"; // Default top-down

        if (type === "build") {
          // Vertical lines (indices 1, 2) reveal top-down
          // Horizontal lines (indices 3, 4) reveal left-right
          if (i === 3 || i === 4) {
            fromClip = "inset(0% 100% 0% 0%)";
          }
        } else if (type === "create" || type === "communicate") {
          // For circles/complex paths, wealternate reveal directions
          const dirs = ["inset(0% 0% 100% 0%)", "inset(0% 100% 0% 0%)", "inset(100% 0% 0% 0%)", "inset(0% 0% 0% 100%)"];
          fromClip = dirs[i % dirs.length]!;
        }

        tl.fromTo(path,
          { opacity: 1, clipPath: fromClip },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.1,
            ease: "power2.inOut"
          },
          i * 0.25 // Stagger
        );
      });
    };

    animateSvg(buildSvgRef.current, "build");
    animateSvg(createSvgRef.current, "create");
    animateSvg(communicateSvgRef.current, "communicate");

    return () => {
      gsap.killTweensOf(section.querySelectorAll("path"));
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`home-bcc ${className}`.trim()}
      aria-label="Build, Create, Communicate"
    >
      <div className="home-bcc__grid">
        {/* Build Panel */}
        <div className="home-bcc__panel home-bcc__panel--light" data-reveal>
          <span className="home-bcc__accent home-bcc__accent--fill" aria-hidden />
          <div className="home-bcc__card-inner">
            <div className="home-bcc__card-front">
              <div className="home-bcc__head">
                <h2 className="home-bcc__title">Build</h2>
              </div>
              <div className="home-bcc__canvas-wrap">
                <svg
                  ref={buildSvgRef}
                  width="296" height="296" viewBox="0 0 296 296" fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="home-bcc__svg"
                >
                  <path d="M294.03 294.05C221.24 294.49 74.78 295.38 1.98999 295.58H0.459991V294.04L0.269989 221.03C0.209989 173.47 0.06 49.09 0 0C49.62 0.06 172.98 0.210004 221.03 0.270004L294.04 0.460007H295.59V1.99001C295.26 74.78 294.62 221.27 294.05 294.03L294.03 294.05ZM294.03 294.05C293.44 221.24 292.8 74.78 292.49 2.01001L294.03 3.55C212.53 3.66 84.42 4.00001 1.98999 4.01001L3.98999 2.01001C4.07999 84.79 3.63999 212.21 3.51999 294.05L1.98999 292.52C74.76 292.71 221.26 293.59 294.03 294.05Z" fill="#231F20" />
                  <path d="M95.9301 0.989746C98.6301 95.1197 98.5701 190.75 96.2301 284.89L95.9301 294.05L95.6301 284.89C93.3001 190.75 93.2301 95.1197 95.9301 0.989746Z" fill="#231F20" />
                  <path d="M202.12 0.989746C204.82 95.1197 204.76 190.75 202.42 284.89L202.12 294.05L201.82 284.89C199.49 190.75 199.42 95.1197 202.12 0.989746Z" fill="#231F20" />
                  <path d="M1.47998 200.62C95.61 197.92 191.24 197.98 285.38 200.32L294.54 200.62L285.38 200.92C191.24 203.25 95.61 203.32 1.47998 200.62Z" fill="#231F20" />
                  <path d="M1.47998 94.42C95.61 91.72 191.24 91.78 285.38 94.12L294.54 94.42L285.38 94.72C191.24 97.05 95.61 97.12 1.47998 94.42Z" fill="#231F20" />
                </svg>
              </div>
            </div>
            <div className="home-bcc__card-back">
              <p className="home-bcc__desc">
                Systematic architecture for modern brands. We build execution-ready foundations that scale.
              </p>
              <button className="home-bcc__btn">Explore Build</button>
            </div>
          </div>
        </div>

        {/* Create Panel */}
        <div className="home-bcc__panel home-bcc__panel--dark" data-reveal>
          <span className="home-bcc__accent home-bcc__accent--ring" aria-hidden />
          <div className="home-bcc__card-inner">
            <div className="home-bcc__card-front">
              <div className="home-bcc__head">
                <h2 className="home-bcc__title">Create</h2>
              </div>
              <div className="home-bcc__canvas-wrap">
                <svg
                  ref={createSvgRef}
                  width="342" height="347" viewBox="0 0 342 347" fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="home-bcc__svg"
                >
                  <path d="M226.4 173.506C226.93 218.026 198.51 260.746 157.38 277.756C82.97 309.276 -0.0299919 254.396 8.13013e-06 173.506C-0.0299919 92.5957 82.97 37.7157 157.39 69.2457C198.52 86.2557 226.94 128.976 226.41 173.506H226.4ZM226.4 173.506C226.87 129.136 198.2 86.5657 156.9 70.4157C84.06 40.8557 3.88 94.9557 3.99 173.506C3.87 252.066 84.05 306.166 156.9 276.606C198.2 260.446 226.87 217.876 226.4 173.506Z" fill="white" />
                  <path d="M286.61 113.296C287.14 157.816 258.72 200.536 217.59 217.546C143.18 249.066 60.18 194.186 60.21 113.296C60.18 32.3857 143.18 -22.4943 217.6 9.0357C258.73 26.0457 287.15 68.7657 286.62 113.296H286.61ZM286.61 113.296C287.08 68.9257 258.41 26.3557 217.11 10.2057C144.27 -19.3543 64.09 34.7457 64.2 113.296C64.08 191.856 144.26 245.956 217.11 216.396C258.41 200.236 287.08 157.666 286.61 113.296Z" fill="white" />
                  <path d="M286.61 233.716C287.14 278.236 258.72 320.956 217.59 337.966C143.18 369.486 60.18 314.606 60.21 233.716C60.18 152.806 143.18 97.9256 217.6 129.456C258.73 146.466 287.15 189.186 286.62 233.716H286.61ZM286.61 233.716C287.08 189.346 258.41 146.776 217.11 130.626C144.27 101.066 64.09 155.166 64.2 233.716C64.08 312.276 144.26 366.376 217.11 336.816C258.41 320.656 287.08 278.086 286.61 233.716Z" fill="white" />
                  <path d="M341.34 173.506C341.87 218.026 313.45 260.746 272.32 277.756C197.91 309.276 114.91 254.396 114.94 173.506C114.91 92.5957 197.91 37.7157 272.33 69.2457C313.46 86.2557 341.88 128.976 341.35 173.506H341.34ZM341.34 173.506C341.81 129.136 313.14 86.5657 271.84 70.4157C199 40.8557 118.82 94.9557 118.93 173.506C118.81 252.066 198.99 306.166 271.84 276.606C313.14 260.446 341.81 217.876 341.34 173.506Z" fill="white" />
                </svg>
              </div>
            </div>
            <div className="home-bcc__card-back">
              <p className="home-bcc__desc">
                Aesthetic precision meets high-intent narrative. We craft visual stories that scale across every dimension.
              </p>
              <button className="home-bcc__btn home-bcc__btn--white">Explore Create</button>
            </div>
          </div>
        </div>

        {/* Communicate Panel */}
        <div className="home-bcc__panel home-bcc__panel--light" data-reveal>
          <span className="home-bcc__accent home-bcc__accent--fill" aria-hidden />
          <div className="home-bcc__card-inner">
            <div className="home-bcc__card-front">
              <div className="home-bcc__head">
                <h2 className="home-bcc__title">Communicate</h2>
              </div>
              <div className="home-bcc__canvas-wrap">
                <svg
                  ref={communicateSvgRef}
                  width="343" height="343" viewBox="0 0 343 343" fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="home-bcc__svg"
                >
                  <path d="M90.8013 170.218C91.2813 194.078 70.6713 215.358 46.6313 215.628C28.4213 216.358 10.5813 204.938 3.61125 188.038C-1.19875 176.788 -1.20875 163.648 3.61125 152.398C10.5613 135.488 28.4213 124.068 46.6413 124.798C70.6813 125.078 91.2913 146.358 90.8113 170.218H90.8013ZM90.8013 170.218C90.8713 146.198 70.6413 126.448 46.6313 127.308C23.9413 127.618 4.52135 147.698 4.96135 170.218C4.52135 192.738 23.9213 212.838 46.6313 213.138C70.6413 213.998 90.8713 194.238 90.8013 170.218Z" fill="#231F20" />
                  <path d="M342.881 170.218C343.361 194.078 322.751 215.358 298.711 215.628C280.501 216.358 262.661 204.938 255.691 188.038C250.881 176.788 250.871 163.648 255.691 152.398C262.641 135.488 280.501 124.068 298.721 124.798C322.761 125.078 343.371 146.358 342.891 170.218H342.881ZM342.881 170.218C342.951 146.198 322.721 126.448 298.711 127.308C276.021 127.618 256.601 147.698 257.041 170.218C256.591 192.738 276.001 212.838 298.711 213.138C322.721 213.998 342.951 194.238 342.881 170.218Z" fill="#231F20" />
                  <path d="M114.781 228.108C131.991 244.648 132.461 274.258 115.661 291.448C103.301 304.838 82.6113 309.388 65.7313 302.358C54.3813 297.798 45.0713 288.518 40.5213 277.158C33.4813 260.278 38.0313 239.578 51.4313 227.218C68.6213 210.418 98.2413 210.898 114.781 228.108ZM114.781 228.108C97.8513 211.078 69.5714 211.418 53.2114 228.998C37.3814 245.268 37.8514 273.188 54.0914 288.808C69.7014 305.048 97.6413 305.538 113.901 289.698C131.481 273.328 131.821 245.058 114.781 228.118V228.108Z" fill="#231F20" />
                  <path d="M293.031 49.8685C310.241 66.4085 310.711 96.0185 293.911 113.208C281.551 126.598 260.861 131.148 243.981 124.118C232.631 119.558 223.331 110.278 218.771 98.9185C211.731 82.0385 216.281 61.3385 229.681 48.9785C246.871 32.1785 276.491 32.6585 293.031 49.8685ZM293.031 49.8685C276.101 32.8385 247.821 33.1785 231.461 50.7585C215.631 67.0285 216.101 94.9485 232.341 110.568C247.951 126.808 275.891 126.808 292.151 111.458C309.731 95.0885 310.071 66.8185 293.031 49.8785V49.8685Z" fill="#231F20" />
                  <path d="M172.681 252.089C196.541 251.609 217.821 272.219 218.091 296.259C218.821 314.469 207.411 332.309 190.501 339.279C179.251 344.089 166.111 344.099 154.861 339.279C137.951 332.329 126.531 314.469 127.261 296.249C127.541 272.209 148.821 251.599 172.681 252.079V252.089ZM172.681 252.089C148.661 252.019 128.911 272.249 129.771 296.259C130.081 318.949 150.161 338.369 172.681 337.929C195.201 338.369 215.301 318.959 215.601 296.259C216.461 272.249 196.701 252.019 172.681 252.089Z" fill="#231F20" />
                  <path d="M172.681 0.0182142C196.541 -0.461786 217.821 20.1482 218.091 44.1882C218.821 62.3982 207.411 80.2382 190.501 87.2082C179.251 92.0182 166.111 92.0282 154.861 87.2082C137.951 80.2582 126.531 62.3982 127.261 44.1782C127.541 20.1382 148.821 -0.47178 172.681 0.00821967V0.0182142ZM172.681 0.0182142C148.661 -0.0517858 128.911 20.1782 129.771 44.1882C130.081 66.8782 150.161 86.2982 172.681 85.8582C195.201 86.2982 215.301 66.8882 215.601 44.1882C216.461 20.1782 196.701 -0.0517858 172.681 0.0182142Z" fill="#231F20" />
                  <path d="M230.571 228.108C247.111 210.898 276.721 210.428 293.911 227.228C307.301 239.588 311.851 260.278 304.821 277.158C300.261 288.508 290.971 297.808 279.621 302.368C262.741 309.408 242.041 304.858 229.681 291.458C212.881 274.268 213.361 244.648 230.571 228.108ZM230.571 228.108C213.541 245.038 213.881 273.318 231.461 289.678C247.731 305.508 275.651 305.038 291.271 288.798C307.511 273.188 308.001 245.248 292.161 228.988C275.791 211.408 247.521 211.068 230.581 228.108H230.571Z" fill="#231F20" />
                  <path d="M52.3212 49.8682C68.8612 32.6582 98.4712 32.1882 115.661 48.9882C129.051 61.3482 133.601 82.0382 126.571 98.9182C122.011 110.268 112.721 119.568 101.371 124.128C84.4912 131.168 63.7912 126.618 51.4312 113.218C34.6312 96.0282 35.1112 66.4082 52.3212 49.8682ZM52.3212 49.8682C35.2912 66.7982 35.6313 95.0782 53.2113 111.438C69.4813 127.268 97.4012 126.798 113.021 110.558C129.261 94.9482 129.751 67.0082 113.911 50.7482C97.5412 33.1682 69.2712 32.8282 52.3312 49.8682H52.3212Z" fill="#231F20" />
                </svg>
              </div>
            </div>
            <div className="home-bcc__card-back">
              <p className="home-bcc__desc">
                Signal-driven distribution systems. We move your message where it matters, with precision and impact.
              </p>
              <button className="home-bcc__btn">Explore Communication</button>
            </div>
          </div>
        </div>
      </div>
      <CreativeIntelligenceCTA />
    </section>
  );
}

"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./CreativeIntelligenceCTA.scss";

gsap.registerPlugin(ScrollTrigger);

export type CreativeIntelligenceCTAProps = {
  className?: string;
  onButtonClick?: () => void;
};

export default function CreativeIntelligenceCTA({ 
  className = "", 
  onButtonClick 
}: CreativeIntelligenceCTAProps) {
  const containerRef = useRef<HTMLElement>(null);
  const iconRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!containerRef.current || !iconRef.current) return;

    const icon = iconRef.current;

    const tl = gsap.to(icon, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none",
      paused: true
    });

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 85%",
      onEnter: () => tl.play(),
      onEnterBack: () => tl.play(),
      onLeave: () => tl.pause(),
      onLeaveBack: () => tl.pause(),
    });

    return () => {
      tl.kill();
      trigger.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className={`creative-cta ${className}`.trim()}>
      <div className="creative-cta__left">
        <div className="creative-cta__icon-wrap">
          <img 
            ref={iconRef}
            src="/swss.svg" 
            alt="Creative Intelligence" 
            className="creative-cta__icon-svg" 
          />
        </div>
        <h2 className="creative-cta__text">
          Explore Our <strong>Creative intelligence</strong>
        </h2>
      </div>
      
      <div className="creative-cta__right">
        <button 
          className="creative-cta__button" 
          onClick={onButtonClick}
          type="button"
        >
          Know More &gt;
        </button>
      </div>
    </section>
  );
}

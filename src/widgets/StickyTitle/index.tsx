"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StickyTitleProps {
  title?: string;
}

const StickyTitle: React.FC<StickyTitleProps> = ({ title = "WE CREATE DIGITAL EXPERIENCES" }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const span2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !span2Ref.current) return;

    const section = sectionRef.current;
    const span2 = span2Ref.current;

    // Set initial state
    span2.style.setProperty('--size-blend', '0%');

    // Create ScrollTrigger with pin
    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=100%', // Scroll distance equal to viewport height
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        // Map progress (0-1) to blend value (0-150%)
        const blendValue = progress * 150;
        span2.style.setProperty('--size-blend', `${blendValue}%`);
      },
    });

    // Refresh ScrollTrigger after setup
    ScrollTrigger.refresh();

    return () => {
      if (scrollTrigger) {
        scrollTrigger.kill();
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-black" style={{ height: '100vh', minHeight: '100vh' }}>
      <div className="relative w-full h-full flex items-center justify-center">
        <div className='max-w-[90%] mx-auto relative'>
          <h2 className="h1 text-white stickytitle text-center font-bold tracking-tight uppercase">
            <span className="span1">{title}</span>
            <span ref={span2Ref} className="span2" style={{ '--size-blend': '0%' } as React.CSSProperties}>{title}</span>
          </h2>
        </div>
      </div>
    </section>
  );
};

export default StickyTitle;

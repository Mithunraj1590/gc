"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    id: "foundation",
    number: "01",
    category: "FOUNDATION",
    title: "Brand Identity",
    image: "/Experience-Abu-Dhabi/1.png", // Using a placeholder from existing assets
    description: "The foundation of every project — how your brand looks, feels, and communicates.",
    points: [
      "Positioning and messaging frameworks",
      "Visual identity systems",
      "Brand guidelines for consistent use",
      "Digital-first brand systems",
      "Branded assets across campaigns and touchpoints",
    ],
  },
  {
    id: "growth",
    number: "02",
    category: "GROWTH",
    title: "Strategy",
    image: "/Leisurescapes/1.png",
    description: "Data-driven roadmaps to navigate complex markets and accelerate sustainable growth.",
    points: [
      "Market and competitor analysis",
      "Go-to-market strategies",
      "Performance auditing and KPI setting",
      "Audience segmentation and targeting",
      "Growth playbooks and operational alignment",
    ],
  },
  {
    id: "experience",
    number: "03",
    category: "EXPERIENCE",
    title: "Digital Design",
    image: "/PAREED-TRADING/1.png",
    description: "Immersive, high-performance digital experiences engineered for maximum conversion.",
    points: [
      "UX/UI design and prototyping",
      "Web and mobile application design",
      "Interactive experiences and motion",
      "Conversion rate optimization (CRO)",
      "Design systems and component libraries",
    ],
  },
];

export default function HomeServices() {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".service-card");

      cards.forEach((card, i) => {
        const inner = card.querySelector(".card-inner");
        if (inner && i < cards.length - 1) {
          gsap.to(inner, {
            scale: 0.95,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-white text-black pb-[50px] lg:pb-32">
      {/* Intro section before cards */}
      <div className="sticky top-0 z-0 pt-24 md:pt-32 pb-16 md:pb-[50px] bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="flex flex-col items-start w-full relative">
            <h2 className="text-[18vw] sm:text-[22vw] lg:text-[19vw] xl:text-[17rem] leading-[0.75] font-bold tracking-tighter text-[#111] lowercase -ml-1 md:-ml-2 mb-[30px] lg:mb-[50px]">
              services
            </h2>
            <p className="text-[14px] sm:text-[0.65rem] md:text-[1rem] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-black/50 md:pl-2">
              WHAT WE DO BEST, AND WHAT YOUR NEXT PROJECT NEEDS MOST.
            </p>
          </div>
        </div>
      </div>

      {/* Stack Cards */}
      <div className="relative z-10">
        {servicesData.map((svc, index) => (
          <div
            key={svc.id}
            className="service-card sticky top-0 w-full bg-white before:content-[''] before:absolute before:-top-[30px] before:left-0 before:w-full before:h-[30px] before:bg-gradient-to-t before:from-white before:to-transparent before:pointer-events-none"
          >
            <div className="card-inner relative w-full bg-white px-0 lg:px-12 py-[30px] md:py-24 flex flex-col">
              {/* Top Gradient Accent */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-white to-white/0"></div>

              <div className="container mx-auto flex flex-col">

                {/* Header Row */}
                <div className="flex justify-between items-end pb-4 border-b border-black/10 relative mb-12 md:mb-16">
                  <div className="absolute left-0 bottom-[-1px] w-12 h-[2px] bg-[#FF5033]"></div>
                  <span className="font-mono text-xs uppercase tracking-widest text-black/50 font-semibold">
                    {svc.category}
                  </span>
                  <span className="text-sm lg:text-3xl font-light text-black/20 font-mono">
                    /{svc.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="h3 font-bold tracking-tight mb-[20px] md:mb-20 text-[#111]">
                  {svc.title}
                </h3>

                {/* Columns */}
                <div className="flex flex-col lg:flex-row gap-5 lg:gap-12 lg:gap-24 flex-grow">
                  {/* Left Column */}
                  <div className="lg:w-5/12 flex flex-col">
                    <div className="relative w-full w-full lg:max-w-[320px] lg:max-w-[380px] aspect-[16/9] rounded-2xl overflow-hidden bg-zinc-100 mb-8">
                      <Image
                        src={svc.image}
                        alt={svc.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                    <p className="text-lg md:text-xl font-light text-black/60 leading-relaxed max-w-md">
                      {svc.description}
                    </p>
                  </div>

                  {/* Right Column */}
                  <div className="lg:w-7/12 flex flex-col justify-center">
                    <ul className="flex flex-col gap-6">
                      {svc.points.map((pt, j) => (
                        <li key={j} className="flex items-start gap-4 text-black/60 text-lg">
                          <span className="text-[#FF5033] font-bold shrink-0">+</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

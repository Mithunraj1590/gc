"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { galleryItems } from "@/data/galleryItems";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HomeProjects() {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".project-card");

      cards.forEach((card, i) => {
        const inner = card.querySelector(".card-inner");
        if (inner && i < cards.length - 1) {
          gsap.to(inner, {
            scale: 0.9,
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
    <section
      ref={containerRef}
      className="relative w-full bg-black text-[#f5f5f7]"
    >
      {/* Intro section before cards */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6 text-center z-0">
        <div className="mb-4 flex items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-[#f5f5f7]/40 before:block before:h-px before:w-5 before:shrink-0 before:bg-white/45 before:content-[''] after:block after:h-px after:w-5 after:shrink-0 after:bg-white/45 after:content-['']">
          Featured Work
        </div>
        <h2 className="text-4xl md:text-7xl font-bold uppercase tracking-[-0.03em] mb-8">
          Selected <span className="text-white/50">Projects</span>
        </h2>
        <p className="max-w-md text-white/50">Scroll to explore our recent case studies and brand transformations.</p>
      </div>

      <div className="relative z-10">
        {galleryItems.map((item, index) => (
          <div
            key={item.slug}
            className="project-card sticky top-0 h-screen w-full overflow-hidden"
          >
            <div className="card-inner absolute inset-0 h-full w-full bg-black">
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover opacity-60"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="absolute inset-0 flex flex-col justify-end pb-24 md:pb-32">
                <div className="container mx-auto">
                  <div className="mb-6 flex items-center gap-4">
                    <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest backdrop-blur-md">
                      {item.category}
                    </span>
                    <span className="text-sm font-mono text-white/50">
                      {item.year}
                    </span>
                  </div>
                  <h3 className="mb-4 text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight text-white drop-shadow-lg">
                    {item.title}
                  </h3>
                  <div className="mb-8 text-lg font-light text-white/70">
                    <p>{item.objective}</p>
                  </div>
                  <Link
                    href={`/work/${item.slug}`}
                    className="group inline-flex items-center gap-3 text-sm font-medium uppercase tracking-widest hover:text-white transition-colors"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/5 transition-all group-hover:bg-white group-hover:text-black">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    View Case Study
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

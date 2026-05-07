"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./HomeWork.scss";

type WorkItem = Readonly<{
  id: string;
  title: string;
  category: string;
  tag?: string;
  image: string;
  year: string;
  isNew?: boolean;
}>;

const WORK_ITEMS: readonly WorkItem[] = [
  {
    id: "01",
    title: "Sprint Valley",
    category: "Marketing & advertising",
    tag: "Brand",
    image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&w=1200&q=80",
    year: "2026",
    isNew: true
  },
  {
    id: "02",
    title: "NoteWorthy",
    category: "Travel & tourism",
    tag: "Website",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80",
    year: "2025",
    isNew: true
  },
  {
    id: "03",
    title: "Vortex Energy",
    category: "Sustainable Tech",
    tag: "Platform",
    image: "/vortex_energy_project.png",
    year: "2026"
  },
  {
    id: "04",
    title: "Elysium Real Estate",
    category: "Luxury Living",
    tag: "Brand",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    year: "2025"
  }
];

export type HomeWorkProps = Readonly<{
  className?: string;
}>;

export default function HomeWork({ className = "" }: HomeWorkProps) {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef, { stagger: 0.1, y: 30 });

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={`home-work py-[120px] bg-[#0a0a0a] ${className}`.trim()}
      aria-label="Selected Projects"
    >
      <div className="container">
        <header className="home-work__header mb-14 flex items-center gap-6">
          <h2 data-reveal className="text-[2.2rem] md:text-[3rem] font-medium text-white tracking-tight">
            Featured projects
          </h2>
          <button data-reveal className="text-[0.6rem] font-bold uppercase tracking-[0.15em] text-white/50 hover:text-white transition-all border border-white/20 rounded-full px-3 py-1 mt-2">
            VIEW ALL
          </button>
        </header>

        <div className="home-work__grid grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
          {WORK_ITEMS.slice(0, 2).map((item) => (
            <article key={item.id} className="work-card group" data-reveal>
              <div className="work-card__image-box relative aspect-[1.45/1] overflow-hidden rounded-[2px] bg-[#1a1a1a]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
                
                {item.isNew && (
                  <div className="absolute top-5 left-5 bg-[#ff4d2a] text-white text-[0.6rem] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter shadow-xl">
                    NEW
                  </div>
                )}

                {/* View Circle Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/10 backdrop-blur-[2px]">
                  <div className="w-16 h-16 rounded-full bg-black/80 border border-white/10 flex items-center justify-center scale-90 group-hover:scale-100 transition-transform duration-500">
                    <span className="text-[0.6rem] font-bold text-white tracking-widest uppercase">VIEW</span>
                  </div>
                </div>
              </div>
              
              <div className="work-card__content mt-8 flex justify-between items-start border-t border-white/[0.03] pt-6">
                <div className="flex flex-col">
                  <h3 className="text-[1.2rem] font-medium text-white tracking-tight">{item.title}</h3>
                </div>
                <div className="flex flex-col items-end text-right">
                  <p className="text-[1.2rem] font-medium text-white tracking-tight">{item.category}</p>
                  {item.tag && <p className="text-[1rem] text-white/30 font-serif italic mt-1">{item.tag}</p>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

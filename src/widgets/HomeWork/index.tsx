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
  image: string;
  year: string;
}>;

const WORK_ITEMS: readonly WorkItem[] = [
  {
    id: "01",
    title: "Aura Wealth",
    category: "Financial Technology",
    image: "/aura_wealth_project.png",
    year: "2026"
  },
  {
    id: "02",
    title: "Lumina Skincare",
    category: "Luxury Beauty",
    image: "/lumina_skincare_project.png",
    year: "2025"
  },
  {
    id: "03",
    title: "Vortex Energy",
    category: "Sustainable Tech",
    image: "/vortex_energy_project.png",
    year: "2026"
  },
  {
    id: "04",
    title: "Elysium Real Estate",
    category: "Luxury Living",
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
        <header className="home-work__header mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[700px]">
            <div
              data-reveal
              className="mb-6 flex items-center gap-4 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/45 before:block before:h-px before:w-20 before:bg-white/45 md:before:w-28"
            >
              Case Studies
            </div>
            <h2 data-reveal className="font-home-banner-heading text-[2.8rem] font-bold leading-[1.05] text-white md:text-[3.6rem]">
              Crafting narratives that <span className="opacity-80">scale beyond the noise.</span>
            </h2>
          </div>
          
          <div data-reveal className="home-work__nav-controls hidden md:flex items-center gap-4">
             <button className="swiper-prev-btn group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 transition-all hover:bg-white hover:text-black">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
             </button>
             <button className="swiper-next-btn group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 transition-all hover:bg-white hover:text-black">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14m-7 7 7-7-7-7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
             </button>
          </div>
        </header>

        <div data-reveal className="home-work__slider-container">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={32}
            slidesPerView={1}
            navigation={{
              prevEl: ".swiper-prev-btn",
              nextEl: ".swiper-next-btn",
            }}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              }
            }}
            className="home-work__swiper"
          >
            {WORK_ITEMS.map((item) => (
              <SwiperSlide key={item.id}>
                <article className="work-card group">
                  <div className="work-card__image-box relative aspect-[16/10] overflow-hidden rounded-[2px] bg-[#1a1a1a]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  
                  <div className="work-card__content mt-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-[1.2rem] font-bold text-white tracking-tight">{item.title}</h3>
                        <p className="mt-1 text-[0.75rem] uppercase tracking-wider text-white/40">{item.category}</p>
                      </div>
                      <span className="text-[0.85rem] font-mono text-white/30">{item.year}</span>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div data-reveal className="mt-16 flex justify-center md:justify-start">
          <Button variant="primary" size="lg">
            No More
          </Button>
        </div>
      </div>
    </section>
  );
}

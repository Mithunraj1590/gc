"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { galleryItems } from "@/data/galleryItems";
import "./HomeGallery.scss";

type HomeGalleryProps = Readonly<{
  className?: string;
}>;

export default function HomeGallery({ className = "" }: HomeGalleryProps) {
  const [hero, topRightA, topRightB, ...bottomRow] = galleryItems;
  const sectionRef = useRef<HTMLElement>(null);
  
  useScrollReveal(sectionRef, {
    selector: "[data-gallery-reveal]",
    start: "top 90%",
    stagger: 0.12,
    y: 32,
    duration: 0.72,
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const images = Array.from(section.querySelectorAll<HTMLImageElement>("[data-parallax-image]"));
    if (!images.length) return;

    let rafId = 0;
    const updateParallax = () => {
      const viewportH = window.innerHeight;
      images.forEach((img) => {
        const rect = img.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const progress = (center - viewportH / 2) / viewportH;
        const speed = Number(img.dataset.parallaxSpeed ?? 1);
        const offsetY = progress * -42 * speed;
        img.style.transform = `translate3d(0, ${offsetY.toFixed(2)}px, 0) scale(1.15)`;
      });
      rafId = 0;
    };

    const requestTick = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(updateParallax);
    };

    requestTick();
    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", requestTick);
    
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", requestTick);
      window.removeEventListener("resize", requestTick);
    };
  }, []);

  const GalleryItem = ({ item, speed, className: itemClass = "" }: { item: any, speed: string, className?: string }) => (
    <Link
      href={`/case-study/${item.slug}`}
      className={`home-gallery__item ${itemClass}`}
    >
      <div className="home-gallery__meta">
        <span className="home-gallery__category">{item.category}</span>
        <span className="home-gallery__title">{item.title}</span>
      </div>
      <span className="home-gallery__year">{item.year}</span>
      <div className="home-gallery__overlay" aria-hidden="true" />
      <div className="home-gallery__image-wrap">
        <img
          src={item.src}
          alt={item.title}
          data-parallax-image
          data-parallax-speed={speed}
          className="h-full w-full object-cover will-change-transform"
          loading="lazy"
        />
      </div>
    </Link>
  );

  return (
    <section ref={sectionRef} className={`home-gallery py-[100px] ${className}`.trim()} aria-label="Gallery">
      <div className="container pb-12">
        <p
          data-gallery-reveal
          className="flex items-center gap-4 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/55 before:block before:h-px before:w-14 before:bg-white/45 md:before:w-36 lg:before:w-18"
        >
          Selected Works
        </p>
      </div>

      <div data-gallery-reveal className="home-gallery__grid">
        <div className="grid grid-cols-1 gap-0 md:grid-cols-[1fr_0.6fr]">
          <GalleryItem item={hero} speed="1.35" className="aspect-[16/10] md:aspect-auto md:min-h-[520px]" />
          <div className="grid grid-cols-1 gap-0">
            <GalleryItem item={topRightA} speed="0.9" className="aspect-[16/9] md:aspect-auto md:min-h-[260px]" />
            <GalleryItem item={topRightB} speed="1.15" className="aspect-[16/9] md:aspect-auto md:min-h-[260px]" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-0 md:grid-cols-4">
          {bottomRow.map((item, index) => (
            <GalleryItem 
              key={item.src} 
              item={item} 
              speed={index % 2 === 0 ? "1.1" : "0.85"} 
              className="aspect-square" 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

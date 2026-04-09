"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { galleryItems, type GalleryItem } from "@/data/galleryItems";

type HomeGalleryProps = Readonly<{
  className?: string;
}>;

export default function HomeGallery({ className = "" }: HomeGalleryProps) {
  const [hero, topRightA, topRightB, ...bottomRow] = galleryItems;
  const sectionRef = useRef<HTMLElement>(null);

  const renderMeta = (item: GalleryItem) => (
    <div className="pointer-events-none absolute left-0 right-0 top-0 z-2 flex items-start justify-between bg-linear-to-b from-black/55 to-transparent p-4 text-[0.64rem] uppercase tracking-[0.14em] text-white md:p-5">
      <div>
        <p className="font-semibold">{item.title}</p>
        <p className="mt-1 text-[0.58rem] text-white/70">{item.category}</p>
      </div>
      <p className="font-semibold text-white/75">{item.year}</p>
    </div>
  );

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
        const offsetY = progress * -72 * speed;
        img.style.transform = `translate3d(0, ${offsetY.toFixed(2)}px, 0) scale(1.16)`;
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
      images.forEach((img) => {
        img.style.transform = "";
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className={`w-full py-[100px] ${className}`.trim()} aria-label="Gallery">
      <div className="container pb-8">
        <p className="flex items-center gap-4 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/55 before:block before:h-px before:w-14 before:bg-white/45 md:before:w-36 lg:before:w-18">
          Selected Works
        </p>
      </div>
      <div className="grid w-full gap-0">
        <div className="grid grid-cols-1 gap-0 md:grid-cols-[5fr_3fr]">
          <Link href={`/case-study/${hero.slug}`} className="group relative m-0 block overflow-hidden md:min-h-[460px]">
            {renderMeta(hero)}
            <img
              src={hero.src}
              alt="Gallery image 1"
              data-parallax-image
              data-parallax-speed="1.35"
              className="h-full w-full object-cover will-change-transform"
              loading="lazy"
            />
          </Link>

          <div className="grid grid-cols-1 gap-0">
            <Link href={`/case-study/${topRightA.slug}`} className="group relative m-0 block overflow-hidden md:min-h-[230px]">
              {renderMeta(topRightA)}
              <img
                src={topRightA.src}
                alt="Gallery image 2"
                data-parallax-image
                data-parallax-speed="0.9"
                className="h-full w-full object-cover will-change-transform"
                loading="lazy"
              />
            </Link>
            <Link href={`/case-study/${topRightB.slug}`} className="group relative m-0 block overflow-hidden md:min-h-[230px]">
              {renderMeta(topRightB)}
              <img
                src={topRightB.src}
                alt="Gallery image 3"
                data-parallax-image
                data-parallax-speed="1.15"
                className="h-full w-full object-cover will-change-transform"
                loading="lazy"
              />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-0 md:grid-cols-4">
          {bottomRow.map((item, index) => (
            <Link
              key={item.src}
              href={`/case-study/${item.slug}`}
              className="group relative m-0 block aspect-square overflow-hidden"
            >
              {renderMeta(item)}
              <img
                src={item.src}
                alt={`Gallery image ${index + 4}`}
                data-parallax-image
                data-parallax-speed={index % 2 === 0 ? "1.1" : "0.85"}
                className="h-full w-full object-cover will-change-transform"
                loading="lazy"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import "./HomeStackCards.scss";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

type StackItem = Readonly<{
  title: string;
  indexLabel: string;
  theme: "dark" | "light";
  description: string;
  image: string;
}>;

const STACK_ITEMS: readonly StackItem[] = [
  {
    title: "Activation",
    indexLabel: "01",
    theme: "dark",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad",
    image: "/images/activation-portrait.png"
  },
  {
    title: "Activation",
    indexLabel: "02",
    theme: "light",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad",
    image: "/images/activation-portrait.png"
  },
  {
    title: "Activation",
    indexLabel: "03",
    theme: "dark",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad",
    image: "/images/activation-portrait.png"
  },
];

export type HomeStackCardsProps = Readonly<{
  className?: string;
}>;

export default function HomeStackCards({ className = "" }: HomeStackCardsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = sectionRef.current;
    const container = containerRef.current;
    if (!root || !container) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = Array.from(container.querySelectorAll<HTMLElement>(".stack-card"));

    const ctx = gsap.context(() => {
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: `+=${cards.length * 100}%`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          refreshPriority: 1,
          invalidateOnRefresh: true,
        }
      });

      cards.forEach((card, i) => {
        if (i === 0) return;

        const hH = Math.max(80, window.innerHeight * 0.12);
        const startY = window.innerHeight - ((cards.length - i) * hH);

        mainTl.fromTo(card,
          { y: startY, yPercent: 0 },
          {
            y: i * hH,
            yPercent: 0,
            duration: 1,
            ease: "power2.inOut"
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`home-stack-cards ${className}`.trim()}
      aria-label="Stacked activation cards"
    >
      <div className="home-stack-cards__container" ref={containerRef}>
        {STACK_ITEMS.map((item, i) => (
          <article
            key={item.indexLabel}
            className={`stack-card stack-card--${item.theme}`}
            style={{ zIndex: i + 1 }}
          >
            <div className="container">

              <div className="stack-card__header">
                <div className="stack-card__title-wrap">
                  <h2 className="stack-card__title">{item.title}</h2>
                </div>
                <div className="stack-card__index-wrap">
                  <span className="stack-card__divider" />
                  <span className="stack-card__index">{item.indexLabel}</span>
                </div>
              </div>
              <div className="stack-card__corner" />

              <div className="stack-card__content">
                <div className="stack-card__image-container">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="stack-card__image"
                    priority={i === 0}
                  />
                  <div className="stack-card__image-label">Dithering</div>
                </div>
                <div className="stack-card__text-container">
                  <p className="stack-card__description">{item.description}</p>
                </div>
              </div>
            </div>


          </article>
        ))}
      </div>
    </section>
  );
}

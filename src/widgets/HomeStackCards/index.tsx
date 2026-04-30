"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, useState } from "react";
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
  const [hH, setHH] = useState(80); // Stable fallback

  useLayoutEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const calculateHH = () => {
      const currentHH = Math.min(120, Math.max(90, window.innerHeight * 0.1));
      setHH(currentHH);
    };

    calculateHH();
    window.addEventListener('resize', calculateHH);

    return () => window.removeEventListener('resize', calculateHH);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`home-stack-cards ${className}`.trim()}
      aria-label="Stacked activation cards"
      style={{
        "--header-height": `${hH}px`,
        "--stack-offset": `${hH}px`,
        "--total-cards": STACK_ITEMS.length,
      } as React.CSSProperties}
    >
      <div className="home-stack-cards__container" ref={containerRef}>
        {STACK_ITEMS.map((item, i) => (
          <article
            key={item.indexLabel}
            className={`stack-card stack-card--${item.theme}`}
            style={{ zIndex: i + 1, top: i * hH }}
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
                </div>
                <div className="stack-card__text-container">
                  <p className="stack-card__description">{item.description}</p>
                  <button className="stack-card__button">
                    Explore
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>


          </article>
        ))}
      </div>
    </section>
  );
}

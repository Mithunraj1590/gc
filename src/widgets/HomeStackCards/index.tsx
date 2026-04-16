"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import "./HomeStackCards.scss";

gsap.registerPlugin(ScrollTrigger);

type StackItem = Readonly<{
  title: string;
  indexLabel: string;
}>;

const STACK_ITEMS: readonly StackItem[] = [
  { title: "Activation", indexLabel: "01" },
  { title: "Activation", indexLabel: "02" },
  { title: "Activation", indexLabel: "03" },
];

export type HomeStackCardsProps = Readonly<{
  className?: string;
}>;

export default function HomeStackCards({ className = "" }: HomeStackCardsProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-stack-card]"));
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        gsap.set(card, {
          yPercent: i * 28,
          scale: 1 - i * 0.04,
          zIndex: cards.length - i,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=220%",
          scrub: 0.7,
          pin: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          scroller: document.documentElement,
        },
      });

      cards.forEach((card, i) => {
        const cardInner = card.querySelector<HTMLElement>(".stack-card__inner");
        const isMiddle = i === 1;
        const rowDuration = 1 / cards.length;
        const rowStart = i * rowDuration;

        tl.to(
          card,
          {
            yPercent: i * -22,
            scale: 0.96 - i * 0.015,
            duration: rowDuration,
            ease: "none",
          },
          rowStart,
        );

        if (cardInner) {
          tl.to(
            cardInner,
            {
              backgroundColor: isMiddle ? "#ececec" : "#060606",
              color: isMiddle ? "#0a0a0a" : "#f5f5f5",
              duration: rowDuration * 0.72,
              ease: "none",
            },
            rowStart + rowDuration * 0.14,
          );
        }
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
      <div className="home-stack-cards__viewport">
        <div className="home-stack-cards__deck">
          {STACK_ITEMS.map((item, i) => (
            <article key={item.indexLabel} className="stack-card" data-stack-card>
              <div className="stack-card__inner">
                <span className="stack-card__edge" aria-hidden />
                <div className="stack-card__left">
                  <span className="stack-card__dash" aria-hidden />
                  <h2>{item.title}</h2>
                </div>
                <div className="stack-card__right">
                  <span className="stack-card__divider" aria-hidden />
                  <span className="stack-card__index">{item.indexLabel}</span>
                </div>
                {i === 1 ? <span className="stack-card__shade" aria-hidden /> : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

type HomeServiceProps = Readonly<{
  className?: string;
}>;

type ServiceCard = Readonly<{
  id: number;
  title: string;
  icon: ReactNode;
}>;

const cycleOrder = [0, 1, 2, 5, 8, 7, 6, 3];

const cards: ServiceCard[] = [
  {
    id: 0,
    title: "Brand Strategy",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
        <path d="M4 10h12M10 4v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 1,
    title: "Performance Media",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
        <path d="M4 14V6m6 8V4m6 10v-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Creative Production",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
        <rect x="4" y="5" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Social Systems",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
        <path d="M4 6h12M4 10h12M4 14h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Mission Control",
    icon: (
      <svg
        className="center-banner-svg h-auto w-full"
        viewBox="0 0 312 122"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_119_5)">
          <path d="M311.27 0.950012H0V122.78H311.27V0.950012Z" fill="white" />
          <g opacity="0.49">
            <mask id="mask0_119_5" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="312" height="122">
              <path d="M311.27 0H0V121.83H311.27V0Z" fill="white" />
            </mask>
            <g mask="url(#mask0_119_5)">
              <g opacity="0.38">
                <path d="M155.6 70.93C159.256 70.93 162.22 67.9661 162.22 64.31C162.22 60.6539 159.256 57.69 155.6 57.69C151.944 57.69 148.98 60.6539 148.98 64.31C148.98 67.9661 151.944 70.93 155.6 70.93Z" stroke="#6D6D6D" strokeWidth="0.5" strokeMiterlimit="10" />
                <path d="M155.6 81.53C165.11 81.53 172.82 73.8204 172.82 64.31C172.82 54.7997 165.11 47.09 155.6 47.09C146.09 47.09 138.38 54.7997 138.38 64.31C138.38 73.8204 146.09 81.53 155.6 81.53Z" stroke="#6D6D6D" strokeWidth="0.5" strokeMiterlimit="10" />
                <path d="M155.6 89.91C169.738 89.91 181.2 78.4485 181.2 64.31C181.2 50.1715 169.738 38.71 155.6 38.71C141.462 38.71 130 50.1715 130 64.31C130 78.4485 141.462 89.91 155.6 89.91Z" stroke="#6D6D6D" strokeWidth="0.5" strokeMiterlimit="10" />
                <path d="M155.6 97.92C174.163 97.92 189.21 82.8723 189.21 64.31C189.21 45.7477 174.163 30.7 155.6 30.7C137.038 30.7 121.99 45.7477 121.99 64.31C121.99 82.8723 137.038 97.92 155.6 97.92Z" stroke="#6D6D6D" strokeWidth="0.5" strokeMiterlimit="10" />
                <path d="M155.6 107.54C179.475 107.54 198.83 88.1853 198.83 64.31C198.83 40.4347 179.475 21.08 155.6 21.08C131.725 21.08 112.37 40.4347 112.37 64.31C112.37 88.1853 131.725 107.54 155.6 107.54Z" stroke="#6D6D6D" strokeWidth="0.5" strokeMiterlimit="10" />
                <path d="M155.6 117.33C184.882 117.33 208.62 93.5922 208.62 64.31C208.62 35.0279 184.882 11.29 155.6 11.29C126.318 11.29 102.58 35.0279 102.58 64.31C102.58 93.5922 126.318 117.33 155.6 117.33Z" stroke="#6D6D6D" strokeWidth="0.5" strokeMiterlimit="10" />
                <path d="M155.6 129.72C191.725 129.72 221.01 100.435 221.01 64.31C221.01 28.1851 191.725 -1.09998 155.6 -1.09998C119.475 -1.09998 90.1899 28.1851 90.1899 64.31C90.1899 100.435 119.475 129.72 155.6 129.72Z" stroke="#6D6D6D" strokeWidth="0.5" strokeMiterlimit="10" />
              </g>
            </g>
          </g>
          <path d="M81.5601 63.39C81.5601 60.1 82.2901 57.19 83.7601 54.64C85.2301 52.1 87.3901 50.11 90.2501 48.67C93.1101 47.23 96.6501 46.52 100.87 46.52C102.55 46.52 104.05 46.63 105.38 46.86C106.71 47.08 107.69 47.33 108.32 47.6V55.58H107.78C107.15 55.25 106.25 54.97 105.07 54.75C103.89 54.53 102.64 54.41 101.32 54.41C97.8201 54.41 95.2701 55.22 93.6701 56.83C92.0701 58.44 91.2701 60.69 91.2701 63.56C91.2701 65.24 91.6001 66.72 92.2601 68.02C92.9201 69.32 93.8501 70.34 95.0701 71.07C96.2801 71.8 97.7101 72.17 99.3601 72.17C100.23 72.17 100.93 72.07 101.47 71.88C102.01 71.69 102.47 71.31 102.86 70.74L101.15 75.85V62.75H109.77V78.09C108.51 78.63 106.99 79.06 105.19 79.39C103.4 79.72 101.39 79.88 99.1701 79.88C95.2801 79.88 92.0301 79.19 89.4301 77.82C86.8301 76.44 84.8701 74.52 83.5501 72.03C82.2301 69.55 81.5801 66.66 81.5801 63.37" fill="#111111" />
          <path d="M111.63 63.21C111.63 59.8 112.31 56.85 113.67 54.35C115.03 51.85 117.08 49.92 119.82 48.56C122.56 47.2 125.99 46.52 130.12 46.52C131.65 46.52 133.04 46.63 134.29 46.86C135.55 47.08 136.49 47.33 137.12 47.6V55.58H136.58C135.95 55.25 135.13 54.97 134.11 54.75C133.09 54.53 132 54.41 130.83 54.41C128.5 54.41 126.63 54.79 125.24 55.55C123.85 56.31 122.84 57.36 122.23 58.69C121.62 60.02 121.31 61.52 121.31 63.2C121.31 64.88 121.62 66.38 122.23 67.71C122.84 69.04 123.85 70.09 125.24 70.85C126.63 71.61 128.49 71.99 130.83 71.99C132 71.99 133.09 71.87 134.11 71.63C135.13 71.39 135.95 71.12 136.58 70.82H137.12V78.81C136.49 79.08 135.55 79.33 134.29 79.55C133.03 79.77 131.64 79.89 130.12 79.89C125.99 79.89 122.55 79.21 119.82 77.85C117.08 76.49 115.03 74.56 113.67 72.06C112.31 69.56 111.63 66.61 111.63 63.2V63.21Z" fill="#111111" />
          <path d="M153.86 46.92H141.79V52.03H153.86C155.85 52.03 156.59 52.77 156.59 54.76V57.93C156.59 59.92 155.85 60.66 153.86 60.66H141.79V65.77H153.86C155.85 65.77 156.59 66.51 156.59 68.5V71.67C156.59 73.66 155.85 74.4 153.86 74.4H141.79V79.51H153.86C158.92 79.51 161.7 76.73 161.7 71.67V68.5C161.7 65.85 160.89 64.22 159.87 63.22C160.9 62.22 161.7 60.59 161.7 57.94V54.77C161.7 49.72 158.92 46.93 153.86 46.93V46.92Z" fill="#6D6D6D" />
          <path d="M178.44 59.6H169.37V56.87C169.37 53.48 170.82 52.03 174.21 52.03H184.16V46.92H174.21C167.79 46.92 164.26 50.45 164.26 56.87V71.66C164.26 76.72 167.04 79.5 172.1 79.5H178.44C183.5 79.5 186.28 76.72 186.28 71.66V67.43C186.28 62.37 183.5 59.59 178.44 59.59V59.6ZM169.38 64.71H178.45C180.44 64.71 181.18 65.45 181.18 67.44V71.67C181.18 73.66 180.44 74.4 178.45 74.4H172.11C170.12 74.4 169.38 73.66 169.38 71.67V64.72V64.71Z" fill="#6D6D6D" />
          <path d="M204.09 46.92H196.69C191.63 46.92 188.85 49.7 188.85 54.76V71.67C188.85 76.73 191.63 79.51 196.69 79.51H204.09C209.15 79.51 211.93 76.73 211.93 71.67V54.76C211.93 49.71 209.15 46.92 204.09 46.92ZM193.96 70.36L206.81 61.97V71.67C206.81 73.66 206.07 74.4 204.08 74.4H196.68C194.69 74.4 193.95 73.66 193.95 71.67V70.37L193.96 70.36ZM196.69 52.03H204.09C206.08 52.03 206.82 52.77 206.82 54.76V56.06L193.97 64.45V54.75C193.97 52.76 194.71 52.02 196.7 52.02L196.69 52.03Z" fill="#6D6D6D" />
          <path d="M217.68 52.71C219.447 52.71 220.88 51.2773 220.88 49.51C220.88 47.7427 219.447 46.31 217.68 46.31C215.913 46.31 214.48 47.7427 214.48 49.51C214.48 51.2773 215.913 52.71 217.68 52.71Z" stroke="#111111" strokeWidth="2" strokeMiterlimit="10" />
          <path d="M216.642 76.0913V78.41H216.291V76.0913H215.395V75.8026H217.538V76.0913H216.642ZM218.252 76.6705V78.41H217.938V75.8026H218.402L219.096 77.6106C219.121 77.6834 219.144 77.7617 219.167 77.8456C219.19 77.9283 219.206 77.9881 219.213 78.0251C219.22 77.9918 219.233 77.9462 219.25 77.8882C219.267 77.829 219.285 77.7722 219.302 77.7179C219.319 77.6636 219.331 77.6279 219.339 77.6106L220.02 75.8026H220.473V78.41H220.155V76.6705C220.155 76.5743 220.156 76.4799 220.159 76.3873C220.162 76.2948 220.167 76.2041 220.172 76.1153C220.141 76.2251 220.112 76.3238 220.085 76.4114C220.059 76.4978 220.033 76.5718 220.009 76.6335L219.335 78.41H219.087L218.404 76.6335L218.24 76.1153C218.242 76.2078 218.244 76.3004 218.247 76.3929C218.251 76.4854 218.252 76.578 218.252 76.6705Z" fill="black" />
        </g>
        <defs>
          <clipPath id="clip0_119_5">
            <rect width="311.27" height="121.83" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    id: 5,
    title: "AI Video",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
        <path d="M7 6l6 4-6 4V6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 6,
    title: "Funnel Design",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
        <path d="M3 5h14l-5 5v5l-4-2v-3L3 5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 7,
    title: "Analytics",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
        <path d="M4 15h12M6 13l3-4 3 2 2-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 8,
    title: "Automation",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
        <path d="M10 3l2 3 3 .5-2.2 2.2.5 3-3-1.6-3 1.6.5-3L5 6.5 8 6l2-3z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
];

const features = [
  "Deep brand diagnosis",
  "AI + Expert hybrid strategy",
  "Cost-controlled execution engine",
  "Forecast-driven planning",
  "Full brand transformation capability",
];

export default function HomeService({ className = "" }: HomeServiceProps) {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [isHoveringGrid, setIsHoveringGrid] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    let index = 0;
    const timer = window.setInterval(() => {
      if (isHoveringGrid) return;
      setActiveCard(cycleOrder[index]);
      index = (index + 1) % cycleOrder.length;
    }, 2200);

    return () => window.clearInterval(timer);
  }, [isHoveringGrid]);

  const cardMap = useMemo(() => new Map(cards.map((card) => [card.id, card])), []);

  return (
    <section
      id="services"
      className={`relative border-t border-white/10 py-[100px] text-white ${className}`.trim()}
      style={{
        backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <div className="container">
        <div className="mb-8 flex items-center gap-4 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/55 before:block before:h-px before:w-24 before:bg-white/45 md:before:w-16 lg:before:w-18">
          Core Difference
        </div>

        <div className="grid gap-10 lg:grid-cols-[480px_1fr] lg:gap-16">
          <div>
         
            <h2 className="h2 mb-5">
              We don&apos;t guess.
              <br />
              <span >We calculate.</span>
            </h2>
            <p className="mb-8 max-w-[340px] text-sm leading-[1.65] text-white/60">
              Traditional agencies run campaigns. We operate like mission control - scanning, diagnosing, and
              executing with precision. AI + human intelligence, always.
            </p>

            <span className="mb-3 block text-[0.58rem] font-bold uppercase tracking-[0.3em] text-white/40">
              Key Capabilities
            </span>

            <ul className="mb-8">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 border-b border-white/10 py-2.5 text-[0.82rem] leading-normal text-white/70 first:border-t"
                >
                  <svg className="mt-[3px] h-[13px] w-[13px] shrink-0 text-[#C8A96E]" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8l3.5 3.5L13 4.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {["Brand Identity", "Social Media", "AI Video"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="border-b border-white/20 pb-0.5 text-[0.7rem] font-semibold uppercase tracking-[0.06em] text-white/60 transition-colors duration-200 hover:border-[#C8A96E] hover:text-[#C8A96E]"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div
            id="services-grid"
            className="grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3"
            onMouseEnter={() => {
              setIsHoveringGrid(true);
              setActiveCard(null);
            }}
            onMouseLeave={() => {
              setIsHoveringGrid(false);
              setHoveredCard(null);
            }}
          >
            {Array.from({ length: 9 }).map((_, idx) => {
              const card = cardMap.get(idx);
              if (!card) return null;

              const isCenter = idx === 4;
              const isActive = activeCard === idx;
              const isCardHovered = hoveredCard === idx && !isCenter;
              const showHighlight = isActive || isCardHovered;

              return (
                <article
                  key={card.id}
                  data-card={card.id}
                  onMouseEnter={() => {
                    if (!isCenter) setHoveredCard(idx);
                  }}
                  onMouseLeave={() => {
                    setHoveredCard(null);
                  }}
                  className={`relative h-[150px] border p-5 transition-all duration-300 sm:h-[180px] ${
                    isCenter
                      ? "bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                      : showHighlight
                        ? "border-transparent bg-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.55)]"
                        : "border-transparent bg-transparent"
                  }`}
                >
                  {!isCenter && (
                    <>
                      <span className={`absolute left-[-1px] top-[-1px] h-2 w-2 border-l border-t ${showHighlight ? "border-[#C8A96E]" : "border-transparent"}`} />
                      <span className={`absolute right-[-1px] top-[-1px] h-2 w-2 border-r border-t ${showHighlight ? "border-[#C8A96E]" : "border-transparent"}`} />
                      <span className={`absolute bottom-[-1px] left-[-1px] h-2 w-2 border-b border-l ${showHighlight ? "border-[#C8A96E]" : "border-transparent"}`} />
                      <span className={`absolute bottom-[-1px] right-[-1px] h-2 w-2 border-b border-r ${showHighlight ? "border-[#C8A96E]" : "border-transparent"}`} />
                    </>
                  )}

                  {isCenter ? (
                    <div className="flex h-full items-center justify-center text-black">
                      <div className="w-full max-w-[300px]">{card.icon}</div>
                    </div>
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                      <div className={`h-6 w-6 ${showHighlight ? "text-[#C8A96E]" : "text-white/50"}`}>{card.icon}</div>
                      <div className={`text-[14px] font-semibold uppercase tracking-[0.1em] ${showHighlight ? "text-[#C8A96E]" : "text-white/75"}`}>
                        {card.title}
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

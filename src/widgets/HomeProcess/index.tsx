import React from "react";
import { Button } from "@/components/Button/Button";

const processes = [
  {
    id: "01",
    title: "DISCOVERY",
    description:
      "We start by listening. Goals, challenges, and vision are mapped out clearly, setting the foundation for everything that follows.",
    icon: (
      <svg className="w-8 h-8 text-[#FF5033]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    id: "02",
    title: "STRATEGY",
    description:
      "With insights in place, we define the roadmap. Positioning, priorities, and the best way to align design and execution.",
    icon: (
      <svg className="w-8 h-8 text-[#FF5033]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    id: "03",
    title: "DESIGN & BUILD",
    description:
      "Ideas take shape. From visuals to digital experiences, we design and develop with sharp attention to detail.",
    icon: (
      <svg className="w-8 h-8 text-[#FF5033]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
  },
  {
    id: "04",
    title: "LAUNCH & GROW",
    description:
      "Delivery is just the beginning. We measure, refine, and scale to ensure your project continues to perform.",
    icon: (
      <svg className="w-8 h-8 text-[#FF5033]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v8l9-11h-7z" />
      </svg>
    ),
  },
];

export default function HomeProcess() {
  return (
    <section className="relative w-full bg-[#050505] text-white py-24 md:py-32 overflow-hidden border-t border-white/5">
      {/* Background Gradients */}
      <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none translate-y-1/3 -translate-x-1/4"></div>
      <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none translate-y-1/4 translate-x-1/4"></div>

      <div className="container relative z-10">
        <div className="flex flex-col xl:flex-row gap-16 lg:gap-24 items-center">

          {/* Left Content */}
          <div className="xl:w-7/12 flex flex-col w-full">
            <h2 className="h2 tracking-tight leading-[1.05] mb-8 text-[#f5f5f7]">
              Services built on process,
              precision, and people.
            </h2>
            <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-lg mb-12">
              We combine strategy, design, content, and technology, giving you a single partner for every stage of your brand&apos;s growth.
            </p>

            {/* CTA Button (Desktop) */}
            <div className="mt-2 hidden xl:block">
              <Button variant="ghost" className="!p-0 !bg-transparent !border-transparent hover:!bg-transparent active:!bg-transparent group gap-6 !normal-case !tracking-normal !h-auto flex items-center text-left">
                <span className="w-14 h-14 rounded-xl bg-white shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center justify-center shrink-0 group-hover:bg-neutral-100 transition-colors">
                  <svg className="w-6 h-6 text-black group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </span>
                <span className="font-medium text-white/90 text-lg group-hover:text-white transition-colors">Chat with our Operations Manager</span>
              </Button>
            </div>
          </div>

          {/* Right Grid */}
          <div className="xl:w-7/12 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {processes.map((process) => (
              <div
                key={process.id}
                className="flex flex-col bg-[#0a0a0a]/80 backdrop-blur-md border border-white/5 rounded-2xl p-5 md:p-6 hover:bg-[#111]/80 transition-colors duration-300"
              >
                {/* Icon & Number Row */}
                <div className="flex justify-between items-start mb-4">
                  <div className="text-[#FF5033] scale-90 origin-top-left">
                    {process.icon}
                  </div>
                  <span className="font-mono text-[10px] text-[#FF5033] font-semibold tracking-widest">//{process.id}</span>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-white/10 mb-4"></div>

                {/* Content */}
                <h3 className="text-base font-bold text-white tracking-widest uppercase mb-2">
                  {process.title}
                </h3>
                <p className="text-white/50 text-xs md:text-sm leading-relaxed font-light">
                  {process.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Button (Mobile) */}
          <div className="mt-8 block xl:hidden w-full">
            <Button variant="ghost" className="!p-0 !bg-transparent !border-transparent hover:!bg-transparent active:!bg-transparent group gap-6 !normal-case !tracking-normal !h-auto flex items-center text-left">
              <span className="w-14 h-14 rounded-xl bg-white shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center justify-center shrink-0 group-hover:bg-neutral-100 transition-colors">
                <svg className="w-6 h-6 text-black group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
              <span className="font-medium text-white/90 text-lg group-hover:text-white transition-colors">Chat with our Operations Manager</span>
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}

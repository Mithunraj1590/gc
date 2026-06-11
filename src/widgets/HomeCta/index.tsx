import React from "react";
import Image from "next/image";
import { Button } from "@/components/Button/Button";

export default function HomeCta() {
  return (
    <section className="relative w-full bg-[#ececec] text-black py-[50px] md:py-32 overflow-hidden border-t border-black/5">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/bg.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-stretch gap-16 lg:gap-8">

          {/* Left Column */}
          <div className="w-full lg:w-5/12 flex flex-col justify-between relative">
            <div>
              <h3 className="text-4xl md:text-[2.75rem] font-medium tracking-tight text-[#6b7280] mb-4">
                9 years
              </h3>
              <p className="text-black/50 text-sm md:text-base max-w-[280px] leading-relaxed font-medium">
                Building lasting partnerships, scaling brands, and shipping work that stands out.
              </p>
            </div>

            {/* List Items */}
            <div className="mt-16  mb-[30px] lg:mb-32 lg:my-auto flex flex-col gap-4">
              <div className="flex items-center gap-3 text-black/60 font-medium text-sm md:text-base">
                <div className="w-[18px] h-[18px] bg-[#111] rounded-[4px] flex items-center justify-center text-white text-[11px] font-bold leading-none pb-[1px] shadow-sm shadow-black/20">+</div>
                120+ projects delivered
              </div>
              <div className="flex items-center gap-3 text-black/60 font-medium text-sm md:text-base">
                <div className="w-[18px] h-[18px] bg-[#111] rounded-[4px] flex items-center justify-center text-white text-[11px] font-bold leading-none pb-[1px] shadow-sm shadow-black/20">+</div>
                99% on-time launches
              </div>
              <div className="flex items-center gap-3 text-black/60 font-medium text-sm md:text-base">
                <div className="w-[18px] h-[18px] bg-[#111] rounded-[4px] flex items-center justify-center text-white text-[11px] font-bold leading-none pb-[1px] shadow-sm shadow-black/20">+</div>
                84% average boost in engagement
              </div>
            </div>

            {/* Watermark 2016 - 2025 */}
            <div className="mt-8 pt-8 border-t border-white/60 w-full relative z-10">
              <div className="text-[5rem] sm:text-[6rem] lg:text-[7rem] xl:text-[8rem] font-bold tracking-tighter text-white/80 leading-none pointer-events-none select-none">
                2016<span className="text-white/50 font-normal mx-1 sm:mx-2">-</span>2025
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-7/12 flex flex-col items-start lg:pl-12 relative z-10">
            <h2 className="h2 tracking-tight text-[#737373] leading-[0.95] mb-16 max-w-2xl">
              Let us <span className="text-black font-semibold">inspire</span><br /> your next<br /> project
            </h2>

            <Button variant="dark" size="lg" className="group">
              BOOK AN INTRO CALL
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}

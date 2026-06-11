import React from "react";
import Image from "next/image";
import { Button } from "@/components/Button/Button";

const logos = ["dholm", "Vornberg", "Wendrich", "Blackwell", "Numeriq", "Monolith", "Oblivion"];

const testimonials = [
  {
    quote: "Working with them felt effortless. They understood our vision from day one and kept us informed through all milestones. The end result elevated our brand voice.",
    name: "James Wilson",
    title: "Founder",
    company: "BLACKWELL",
    image: "/pricing/8u5d3cZ4VIJFXUuXv6uDyiZodU.jpg"
  },
  {
    quote: "Every meeting felt productive, every deadline was hit, and the end result nailed our brand better than we could describe.",
    name: "Rachel Morgan",
    title: "Head of Design",
    company: "AURELIS",
    image: "/pricing/CJl8tlOKKSddqB3VWFVMoZ15Y.jpg"
  },
  {
    quote: "Create took our messy brief and turned it into a site we're proud to show. Fast, sharp, and no overthinking.",
    name: "Edward Bright",
    title: "Marketing Lead",
    company: "MADISON SQUARE",
    image: "/pricing/rdZyayoCvYwSSSt6UhP5GPn8fA.jpg"
  },
  {
    quote: "Create has a rare balance of speed and taste. They made complex flows feel effortless and turned them into quick iterations that are both user-friendly and beautiful.",
    name: "Margaret Brooks",
    title: "UX Lead",
    company: "MONOLITH",
    image: "/pricing/8u5d3cZ4VIJFXUuXv6uDyiZodU.jpg"
  }
];

export default function HomeClients() {
  return (
    <section className="relative w-full bg-white text-black py-[50px] md:py-32 overflow-hidden border-t border-black/5">
      <div className="container">

        {/* Top Split section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-[30px] lg:mb-24">

          {/* Left Card */}
          <div className="bg-[#f8f8f8] rounded-3xl p-[20px] py-[30px] md:p-16 flex flex-col justify-between">
            <div>
              <div className="mb-8">
                <span className="text-xs font-bold tracking-widest uppercase text-black/50 flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-black/40"></div>
                  What Our Clients Say
                </span>
              </div>
              <h2 className="text-[2rem] md:text-5xl tracking-tight text-black mb-8 leading-[1.1]">
                Partnerships that last, results that stick.
              </h2>
              <p className="text-black/50 text-base md:text-lg max-w-sm leading-relaxed font-medium mb-[30px] lg:mb-16">
                From kickoff to launch, brands trust us to stay close, adapt fast, and deliver without any drama.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8 mt-auto">
              <div className="flex flex-col gap-6">
                <div>
                  <span className="text-black text-sm tracking-widest">★★★★★</span>
                  <div className="text-xs font-semibold text-black mt-2">5 / 5 <span className="font-medium text-black/40">(98 reviews)</span></div>
                </div>
                <Button variant="dark" size="md" className="w-fit group">
                  WRITE A REVIEW
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </Button>
              </div>
              <div className="max-w-[160px]">
                <p className="text-xs text-black/40 leading-relaxed font-medium">Backed by feedback from 120+ brands we've worked with.</p>
              </div>
            </div>
          </div>

          {/* Right Card (Spotlight) */}
          <div className="bg-[#5e5e64] rounded-3xl p-[20px] py-[30px] md:p-16 flex flex-col text-white overflow-hidden relative">
            {/* Background Texture/Pattern */}
            <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

            <h2 className="text-[4rem] sm:text-[7rem] md:text-[9rem] lg:text-[7.5rem] xl:text-[9rem] font-bold tracking-tighter leading-none text-white mb-8 sm:mb-16 -ml-1 relative z-10 select-none">
              Spotlight
            </h2>

            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start relative z-10 mt-auto">
              {/* Profile Image */}
              <div className="w-full sm:w-36 h-56 sm:h-48 shrink-0 rounded-2xl overflow-hidden relative shadow-2xl shadow-black/20">
                <Image
                  src="/pricing/CJl8tlOKKSddqB3VWFVMoZ15Y.jpg"
                  alt="Samuel Laronde"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 144px"
                />
              </div>

              {/* Quote details */}
              <div className="flex flex-col h-full justify-between pt-2">
                <p className="text-white font-medium text-base sm:text-lg leading-relaxed max-w-md">
                  "They didn't just hit the brief, they raised it. The project felt collaborative from start to finish, with clear updates, quick turns, and a final product that carried our brand further than we imagined."
                </p>
                <div className="flex justify-between items-end mt-8">
                  <div className="flex flex-col">
                    <span className="text-white font-semibold text-sm">Samuel Laronde</span>
                    <span className="text-white/60 text-[0.65rem] font-medium tracking-wide mt-0.5">Marketing Lead</span>
                  </div>
                  <div className="bg-white/90 px-2 py-1 rounded text-[0.55rem] font-bold tracking-[0.15em] uppercase text-[#5e5e64]">
                    LINDHOLM
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Logos Marquee */}
        <div className="w-full overflow-hidden mb-[30px] lg:mb-16 py-8 relative">
          {/* Gradient fades for edges */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          <div className="flex w-max animate-marquee items-center gap-16 md:gap-24 opacity-30">
            {[...logos, ...logos, ...logos].map((logo, idx) => (
              <div key={idx} className="flex items-center gap-2 shrink-0">
                {/* Minimal abstract icon next to some logos for visual variety */}
                {idx % 3 === 0 && <div className="w-4 h-4 rounded-sm bg-black rotate-45"></div>}
                {idx % 4 === 0 && <div className="w-4 h-4 rounded-full border-[3px] border-black"></div>}
                {idx % 5 === 0 && <div className="w-4 h-4 bg-black"></div>}
                <span className="text-2xl md:text-3xl font-bold tracking-tighter text-black select-none">
                  {logo}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="w-full overflow-hidden lg:pb-12 group relative">
          <div className="flex gap-6 w-max animate-marquee [animation-duration:150s] group-hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((test, idx) => (
              <div
                key={idx}
                className="w-[85vw] sm:w-[380px] md:w-[420px] bg-white border border-black/5 shadow-[0_15px_40px_rgba(0,0,0,0.03)] rounded-3xl p-8 sm:p-10 relative overflow-hidden flex flex-col shrink-0"
              >
                {/* Giant background quote */}
                <div className="absolute top-2 right-4 text-[12rem] font-serif leading-none text-black/[0.03] select-none pointer-events-none">
                  "
                </div>

                <p className="text-black/60 text-base md:text-lg leading-relaxed relative z-10 mb-12 font-medium">
                  {test.quote}
                </p>

                <div className="w-6 h-[2px] bg-black/10 mb-8 mt-auto relative z-10"></div>

                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden relative border border-black/5">
                      <Image src={test.image} alt={test.name} fill className="object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-black">{test.name}</span>
                      <span className="text-[0.65rem] text-black/50 font-medium tracking-wide">{test.title}</span>
                    </div>
                  </div>
                  <div className="bg-black/5 px-2 py-1 rounded text-[0.55rem] font-bold tracking-[0.15em] uppercase text-black/60">
                    {test.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS to hide scrollbar for the carousel */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
}

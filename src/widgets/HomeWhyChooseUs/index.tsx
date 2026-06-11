import React from "react";
import Image from "next/image";

export default function HomeWhyChooseUs() {
   return (
      <section className="relative w-full bg-white text-black py-[50px] md:py-32 overflow-hidden border-t border-black/5">
         <div className="container">

            {/* Top Header */}
            <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-24 mb-16 relative w-full">
               <div className="lg:w-48 shrink-0 pt-2 lg:pt-4">
                  <span className="text-xs font-bold tracking-widest uppercase text-black/50 flex items-center gap-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-black/40"></div>
                     Why Choose Us
                  </span>
               </div>
               <div className="flex flex-col items-start flex-grow">
                  <h2 className="h2 tracking-tight mb-8 text-[#111] max-w-4xl">
                     Designed to Make<br className="hidden md:block" />Your Life Easier
                  </h2>
                  <div className="flex items-start gap-4 text-left max-w-lg">
                     <div className="w-12 h-[2px] bg-black/20 mt-2 shrink-0"></div>
                     <p className="text-black/50 leading-relaxed text-sm md:text-base font-light">
                        Clear process, quick reviews, and a clean launch at the end. We keep the steps simple so projects never get stuck.
                     </p>
                  </div>
               </div>
            </div>



            {/* Grid Container */}
            <div className="grid grid-cols-12 gap-6 relative z-10">

               {/* Card 1 */}
               <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-white border border-black/5 shadow-[0_10px_40px_rgba(0,0,0,0.03)] rounded-3xl p-8 md:p-10 flex flex-col min-h-[400px] justify-between">
                  <div>
                     <h3 className="text-3xl lg:text-4xl font-bold tracking-tight leading-tight text-black mb-1">We Create.</h3>
                     <h3 className="text-3xl lg:text-4xl font-bold tracking-tight leading-tight text-black/60 mb-1">We Build.</h3>
                     <h3 className="text-3xl lg:text-4xl font-bold tracking-tight leading-tight text-[#111]">We Communicate.</h3>
                  </div>

                  {/* Dots graphic */}
                  <div className="flex items-center justify-between gap-6 my-10 pl-2">
                     <div className="w-4 h-4 bg-[#111] rounded-full"></div>
                     <div className="w-4 h-4 bg-[#111] rounded-full"></div>
                     <div className="w-20 h-20 bg-white shadow-xl shadow-black/8 rounded-full flex items-center justify-center relative -ml-2">
                        <div className="w-5 h-5 bg-black rounded-full"></div>
                     </div>
                  </div>

                  <div className="flex items-center gap-4 mt-auto">
                     <div className="flex-grow h-2 bg-gray-100 rounded-full overflow-hidden relative">
                        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(0,0,0,0.05)_2px,rgba(0,0,0,0.05)_4px)]"></div>
                     </div>
                     <span className="text-xs lg:text-sm font-semibold text-black/60 uppercase tracking-widest whitespace-nowrap"><span className="text-[#111]">Ideas</span> that start with you</span>
                  </div>
               </div>

               {/* Card 2 */}
               <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-[#f8f8f8] border border-black/5 rounded-3xl p-8 md:p-10 flex flex-col min-h-[400px] relative overflow-hidden group">
                  <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>

                  <div className="relative z-10 flex justify-between items-start mb-8">
                     <h3 className="text-2xl lg:text-3xl font-bold tracking-tight leading-tight text-[#111] max-w-[150px]">Client Satisfaction Rate</h3>
                     <span className="text-3xl lg:text-4xl font-light text-[#111]">99.9%</span>
                  </div>

                  <div className="relative z-10 flex flex-col gap-3 flex-grow justify-center py-4 w-full">
                     {/* Badges */}
                     <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-lg p-2 w-full shadow-sm border border-black/5">
                        <span className="bg-[#111] text-white text-sm font-mono font-bold w-12 py-1.5 rounded text-center shrink-0">12+</span>
                        <span className="text-xs font-bold tracking-widest text-black/60 uppercase">INDUSTRIES SERVED</span>
                     </div>
                     <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-lg p-2 w-full shadow-sm border border-black/5">
                        <span className="bg-[#111] text-white text-sm font-mono font-bold w-12 py-1.5 rounded text-center shrink-0">24H</span>
                        <span className="text-xs font-bold tracking-widest text-black/60 uppercase">AVG RESPONSE TIME</span>
                     </div>
                     <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-lg p-2 w-full shadow-sm border border-black/5">
                        <span className="bg-[#111] text-white text-sm font-mono font-bold w-12 py-1.5 rounded text-center shrink-0">96%</span>
                        <span className="text-xs font-bold tracking-widest text-black/60 uppercase">FIRST DRAFT APPROVED</span>
                     </div>
                     <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-lg p-2 w-full shadow-sm border border-black/5">
                        <span className="bg-[#111] text-white text-sm font-mono font-bold w-12 py-1.5 rounded text-center shrink-0">99%</span>
                        <span className="text-xs font-bold tracking-widest text-black/60 uppercase">SHIP ON-TIME</span>
                     </div>
                  </div>

                  <div className="relative z-10 mt-6 pt-6 border-t border-black/5 flex flex-col gap-2">
                     <div className="flex items-center text-[#111] text-base tracking-widest">★★★★★ <span className="text-black/40 text-sm ml-2 font-medium tracking-normal">5 / 5 (98 reviews)</span></div>
                     <p className="text-xs md:text-sm text-black/40 mt-1">Backed by feedback from 120+ brands we've worked with.</p>
                  </div>
               </div>

               {/* Card 3 */}
               <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-white border border-black/5 shadow-[0_10px_40px_rgba(0,0,0,0.03)] rounded-3xl p-8 md:p-10 flex flex-col min-h-[400px] justify-between">
                  <div>
                     <span className="text-xs font-semibold text-black/40 mb-2 block tracking-wide">No reheated or pre-made.</span>
                     <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-black leading-tight">Every project starts fresh.</h3>
                  </div>

                  <div className="flex-grow flex items-center justify-between w-full px-2 lg:px-6 my-8">
                     {/* Step 1: Single dot */}
                     <div className="w-2 h-2 rounded-full bg-black/20 shrink-0"></div>

                     {/* Step 2: Four dots */}
                     <div className="grid grid-cols-2 gap-1.5 shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-black/20"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-black/50"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-black/50"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-black/30"></div>
                     </div>

                     {/* Step 3: Burst / Spiral */}
                     <div className="relative w-50 h-50 flex items-center justify-center shrink-0">
                        {/* SVG Fibonacci Spiral */}
                        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full animate-[spin_60s_linear_infinite]">
                           {[...Array(250)].map((_, i) => {
                              const r = 4.5 * Math.sqrt(i);
                              const theta = i * 137.508 * (Math.PI / 180);
                              const x = 100 + r * Math.cos(theta);
                              const y = 100 + r * Math.sin(theta);
                              const opacity = Math.max(0, 1 - Math.pow(i / 250, 1.5));
                              const size = 1 + (i / 250) * 1.5;
                              return (
                                 <circle key={i} cx={x} cy={y} r={size} fill={`rgba(0,0,0,${opacity * 0.3})`} />
                              );
                           })}
                        </svg>
                        <div className="relative z-10 flex items-start bg-transparent px-2 py-0.5 rounded-md">
                           <span className="text-black font-bold text-[2.2rem] tracking-tighter leading-none bg-transparent">create</span>
                           <span className="text-black text-[0.6rem] font-bold leading-none mt-1 ml-0.5">®</span>
                        </div>
                     </div>
                  </div>

                  <div className="flex items-center gap-4 mt-auto">
                     <div className="flex-grow h-2 bg-gray-100 rounded-full overflow-hidden relative">
                        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(0,0,0,0.05)_2px,rgba(0,0,0,0.05)_4px)]"></div>
                     </div>
                     <span className="text-xs lg:text-sm font-semibold text-black/60 uppercase tracking-widest whitespace-nowrap"><span className="text-[#111]">Custom work</span> from day one.</span>
                  </div>
               </div>

               {/* Row 2 */}

               {/* Card 4 */}
               <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-white border border-black/5 shadow-[0_10px_40px_rgba(0,0,0,0.03)] rounded-3xl p-8 md:p-10 flex flex-col min-h-[400px] justify-between relative overflow-hidden group">
                  <div className="relative z-10">
                     <div className="flex items-center gap-3 mb-4">
                        <div className="w-6 h-6 rounded-full bg-black/5 flex items-center justify-center text-black/40 text-xs font-bold">%</div>
                        <h3 className="text-2xl font-bold tracking-tight text-[#111]">Simple Pricing</h3>
                     </div>
                     <p className="text-sm text-black/50 leading-relaxed max-w-[240px]">Plans that scale with your project and give you room for unlimited creative opportunities.</p>
                  </div>

                  {/* Vertical auto-scrolling images (One card in view) */}
                  <div className="relative h-48 my-6 rounded-xl overflow-hidden pointer-events-none bg-zinc-100 shadow-inner">
                     <div className="flex flex-col w-full animate-vertical-slide">
                        {[
                           "/pricing/8u5d3cZ4VIJFXUuXv6uDyiZodU.jpg",
                           "/pricing/CJl8tlOKKSddqB3VWFVMoZ15Y.jpg",
                           "/pricing/rdZyayoCvYwSSSt6UhP5GPn8fA.jpg",
                           "/pricing/8u5d3cZ4VIJFXUuXv6uDyiZodU.jpg" // Duplicate 1st for seamless loop
                        ].map((src, idx) => (
                           <div key={`${src}-${idx}`} className="relative w-full h-48 shrink-0">
                              <Image
                                 src={src}
                                 alt={`Pricing Feature ${idx + 1}`}
                                 fill
                                 className="object-cover"
                                 sizes="(max-width: 768px) 100vw, 33vw"
                              />
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="relative z-10 flex flex-col items-start gap-5 mt-auto pt-4">
                     <p className="text-xs xl:text-sm text-black/40 max-w-full leading-relaxed">Pick a plan that grows with you and keeps creative costs predictable.</p>
                     <button className="flex items-center gap-3 text-black hover:text-[#111] transition-colors shrink-0">
                        <div className="w-10 h-10 rounded-full bg-[#111] flex items-center justify-center text-white shadow-lg shadow-[#111]/20 group-hover:scale-110 transition-transform">
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </div>
                        <span className="text-base font-semibold">Explore plans</span>
                     </button>
                  </div>
               </div>

               {/* Card 5 */}
               <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-[#f8f8f8] border border-black/5 rounded-3xl p-8 flex flex-col min-h-[400px] relative overflow-hidden group">
                  <div className="relative z-10 mb-8">
                     <span className="text-xs font-semibold text-[#111] mb-3 block tracking-wide uppercase">Built for the long run</span>
                     <h3 className="text-2xl xl:text-3xl font-bold tracking-tight text-[#111] max-w-[180px] leading-tight">With You Beyond Launch</h3>
                  </div>

                  {/* Giant Infinity Icon Faded */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black/[0.03] text-[15rem] xl:text-[20rem] pointer-events-none leading-none select-none">
                     ∞
                  </div>

                  <div className="relative z-10 flex flex-col justify-end flex-grow gap-4 mt-auto pt-12">
                     <div className="flex items-center gap-4">
                        <div className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center shrink-0"><svg className="w-3 h-3 text-black/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg></div>
                        <span className="text-[0.8rem] xl:text-sm font-semibold text-black/60">Ongoing support</span>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center shrink-0"><svg className="w-3 h-3 text-black/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg></div>
                        <span className="text-[0.8rem] xl:text-sm font-semibold text-black/60">Long-term partnership</span>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center shrink-0"><svg className="w-3 h-3 text-black/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg></div>
                        <span className="text-[0.8rem] xl:text-sm font-semibold text-black/60">Future-ready builds</span>
                     </div>
                  </div>
               </div>

               {/* Card 6 */}
               <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-[#f8f8f8] border border-black/5 rounded-3xl p-8 flex flex-col min-h-[400px] relative overflow-hidden group">
                  <div className="relative z-10">
                     <span className="text-[0.65rem] xl:text-xs font-semibold text-black/40 mb-3 block tracking-wide">Quick intro call, no strings attached.</span>
                     <h3 className="text-2xl xl:text-3xl font-bold tracking-tight text-[#111] max-w-[220px] leading-tight">Let's chat or just say hello.</h3>
                  </div>

                  {/* Character Placeholder */}
                  <div className="absolute right-0 top-1/4 text-8xl xl:text-9xl drop-shadow-2xl z-0 pointer-events-none transform -scale-x-100">
                     👷‍♂️
                  </div>

                  <div className="relative z-10 bg-white shadow-xl shadow-black/5 rounded-2xl p-5 xl:p-6 mt-auto border border-black/5">
                     <div className="flex items-center gap-2 text-[0.6rem] xl:text-[0.65rem] uppercase tracking-widest font-bold text-black/40 mb-2">
                        <svg className="w-3.5 h-3.5 text-[#111]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        Next Availability
                     </div>
                     <div className="text-sm xl:text-base font-semibold text-black mb-6">from 14 September 2025</div>

                     <button className="flex items-center gap-4 text-black hover:text-[#111] transition-colors">
                        <div className="w-10 h-10 rounded-full bg-[#111] flex items-center justify-center text-white shadow-lg shadow-[#111]/20 group-hover:scale-110 transition-transform shrink-0">
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </div>
                        <span className="text-sm xl:text-base font-semibold">Book now</span>
                     </button>
                  </div>
               </div>

               {/* 7th Element: Vertical Text */}
               <div className="hidden lg:flex col-span-2 items-center justify-center relative min-h-[400px]">
                  <div className="-rotate-90 text-[6rem] xl:text-[8rem] font-bold text-black/[0.04] pointer-events-none tracking-tighter whitespace-nowrap select-none">
                     create
                  </div>
               </div>

            </div>
         </div>
      </section>
   );
}

import React from "react";
import Image from "next/image";
import { Button } from "@/components/Button/Button";

export default function HomeBlog() {
   return (
      <section className="relative w-full bg-white text-black py-[50px] md:py-32 overflow-hidden border-t border-black/5">
         <div className="container">

            {/* Header Section */}
            <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-24 mb-[40px] relative w-full">
               <div className="lg:w-48 shrink-0 pt-2 lg:pt-4">
                  <span className="text-xs font-bold tracking-widest uppercase text-black/50 flex items-center gap-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-black/40"></div>
                     Insights
                  </span>
               </div>
               <div className="flex flex-col items-start flex-grow">
                  <h2 className="h2 tracking-tight text-black leading-[1.05] mb-8 max-w-4xl">
                     What bubbles up <br /> needs to be shared
                  </h2>
                  <div className="flex items-start gap-4 text-left max-w-md">
                     <div className="w-10 h-px bg-black/30 mt-2.5 shrink-0"></div>
                     <p className="text-black text-sm md:text-base font-medium leading-relaxed">
                        From new launches to design explorations and team experiments, this is where ideas take shape and stories unfold.
                     </p>
                  </div>
               </div>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-12 gap-4 md:gap-6">

               {/* Card 1: Intro Card */}
               <div className="col-span-12 lg:col-span-5 bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] rounded-3xl p-8 md:p-12 flex flex-col justify-between text-white relative overflow-hidden min-h-[400px]">
                  <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

                  <div className="relative z-10">
                     <div className="w-6 h-px bg-white/40 mb-6"></div>
                     <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">Whispers - Blog</h3>
                     <p className="text-xl md:text-2xl font-medium mb-4">From small sparks to big ideas.</p>
                  </div>

                  <div className="relative z-10 flex flex-col gap-4 mt-12 text-sm text-white/80 font-medium">
                     <div className="flex items-center gap-3">
                        <span className="text-[#FF5033] font-bold">+</span> Studio projects and case studies
                     </div>
                     <div className="flex items-center gap-3">
                        <span className="text-[#FF5033] font-bold">+</span> Notes on design and process
                     </div>
                     <div className="flex items-center gap-3">
                        <span className="text-[#FF5033] font-bold">+</span> Ideas, insights, and inspiration
                     </div>
                  </div>
               </div>

               {/* Card 2: Rethinking Product Design */}
               <div className="col-span-12 lg:col-span-7 bg-zinc-900 rounded-3xl p-8 md:p-12 flex flex-col justify-between text-white relative overflow-hidden min-h-[400px] group cursor-pointer">
                  <Image src="/pricing/8u5d3cZ4VIJFXUuXv6uDyiZodU.jpg" alt="Blog 1" fill className="object-cover opacity-50 group-hover:scale-105 group-hover:opacity-60 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

                  <div className="relative z-10 flex justify-between items-start">
                     <div className="flex items-center gap-4">
                        <div className="w-[2px] h-8 bg-white/40"></div>
                        <div className="flex flex-col">
                           <span className="text-sm font-semibold">Lucas Marino</span>
                           <span className="text-xs text-white/60 font-medium mt-0.5">Technical Director</span>
                        </div>
                     </div>
                     <span className="text-[0.65rem] font-bold text-white tracking-widest uppercase">Jul 30, 2025</span>
                  </div>

                  <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mt-32">
                     <h3 className="text-3xl md:text-[2.5rem] font-semibold tracking-tight leading-tight max-w-md">Rethinking Product Design with Intelligence</h3>
                  </div>
               </div>

               {/* Card 3: Digital Identities */}
               <div className="col-span-12 bg-zinc-900 rounded-3xl p-8 md:p-12 flex flex-col justify-between text-white relative overflow-hidden min-h-[450px] group cursor-pointer">
                  <Image src="/pricing/rdZyayoCvYwSSSt6UhP5GPn8fA.jpg" alt="Blog 2" fill className="object-cover opacity-50 group-hover:scale-105 group-hover:opacity-60 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>

                  <div className="relative z-10 flex justify-between items-start w-full">
                     <div className="flex items-center gap-4">
                        <div className="w-[2px] h-8 bg-white/40"></div>
                        <div className="flex flex-col">
                           <span className="text-sm font-semibold">Edward Bright</span>
                           <span className="text-xs text-white/60 font-medium mt-0.5">Marketing Lead</span>
                        </div>
                     </div>
                     <span className="text-[0.65rem] font-bold text-white tracking-widest uppercase">Jul 25, 2025</span>
                  </div>

                  <div className="relative z-10 mt-auto">
                     <h3 className="text-3xl md:text-[3rem] font-semibold tracking-tight leading-[1.1] max-w-sm">Digital Identities Across Cultures</h3>
                  </div>
               </div>

               {/* Card 4: Automotive */}
               <div className="col-span-12 md:col-span-8 bg-zinc-900 rounded-3xl p-8 md:p-12 flex flex-col justify-between text-white relative overflow-hidden min-h-[400px] group cursor-pointer">
                  <Image src="/pricing/CJl8tlOKKSddqB3VWFVMoZ15Y.jpg" alt="Blog 3" fill className="object-cover opacity-50 group-hover:scale-105 group-hover:opacity-60 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/20 to-transparent"></div>

                  <div className="relative z-10 flex justify-between items-start w-full">
                     <div className="flex items-center gap-4">
                        <div className="w-[2px] h-8 bg-white/40"></div>
                        <div className="flex flex-col">
                           <span className="text-sm font-semibold">Jordan Ellis</span>
                           <span className="text-xs text-white/60 font-medium mt-0.5">UX Strategist</span>
                        </div>
                     </div>
                     <span className="text-[0.65rem] font-bold text-white tracking-widest uppercase">Dec 7, 2025</span>
                  </div>

                  <div className="relative z-10 mt-24 md:mt-auto">
                     <h3 className="text-3xl md:text-[2.5rem] font-semibold tracking-tight leading-tight max-w-sm">How Automotive Brands Win Online</h3>
                  </div>
               </div>

               {/* CTA Button Block */}
               <div className="col-span-12 md:col-span-4 flex items-center justify-start md:justify-center px-0 py-8 md:p-8 min-h-[100px] md:min-h-full">
                  <Button variant="ghost" className="!p-0 !bg-transparent !border-transparent hover:!bg-transparent active:!bg-transparent group gap-6 !normal-case !tracking-normal !h-auto flex items-center text-left !text-black">
                     <span className="w-14 h-14 rounded-[300px] bg-[#111] flex items-center justify-center text-white shadow-[0_0_20px_rgba(0,0,0,0.1)] shrink-0 group-hover:bg-black transition-colors">
                        <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                     </span>
                     <div className="flex items-start gap-1 font-medium text-lg !text-black group-hover:!text-black/70 transition-colors">
                        <span>More Whispers</span>
                     </div>
                  </Button>
               </div>

            </div>
         </div>
      </section>
   );
}

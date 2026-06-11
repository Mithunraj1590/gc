"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/Button/Button";

const faqs = [
  {
    question: "What kind of projects does Create take on?",
    answer: "We focus on brand identity, digital products, and websites that need both design clarity and technical polish."
  },
  {
    question: "How do you approach new projects?",
    answer: "Every project starts with a deep dive into your business goals. We then move through strategy, design, and development phases with clear milestones."
  },
  {
    question: "What's a realistic project timeline?",
    answer: "Most full-scale projects take between 6 to 12 weeks, depending on the scope and complexity of the requirements."
  },
  {
    question: "Who actually does the work?",
    answer: "Our in-house team of senior designers and developers handles everything. We don't outsource our core creative or technical work."
  },
  {
    question: "How do we communicate during the process?",
    answer: "We set up a dedicated Slack channel and schedule weekly syncs. You'll always have direct access to the team working on your project."
  },
  {
    question: "What happens after launch?",
    answer: "We offer ongoing support and maintenance packages to ensure your digital product continues to perform optimally."
  },
  {
    question: "Do you work with startups as well as big companies?",
    answer: "Yes, we partner with ambitious startups looking to make their mark, as well as established enterprises needing digital transformation."
  },
  {
    question: "How do you measure success for a project?",
    answer: "We define KPIs during the discovery phase, which typically include user engagement metrics, conversion rates, and performance benchmarks."
  },
  {
    question: "Can we start small and scale later?",
    answer: "Absolutely. We often start with an MVP or core brand identity and scale the deliverables as your business grows."
  }
];

export default function HomeFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative w-full bg-[#fafafa] text-black py-[50px] md:py-32 overflow-hidden border-t border-black/5">
      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

          {/* Left Column (Sticky) */}
          <div className="lg:w-5/12 flex flex-col">
            <div className="sticky top-32 flex flex-col h-full lg:h-[calc(100vh-160px)]">

              {/* Header */}
              <div className="mb-6 lg:mb-10 w-full">
                <span className="text-xs font-bold tracking-widest uppercase text-black/50 flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-black/40"></div>
                  FAQ
                </span>
              </div>

              <h2 className="text-[2rem] md:text-6xl lg:text-[4.5rem] tracking-tight text-black leading-[1.05] mb-8">
                Clearing doubts <br /> and concerns
              </h2>

              <div className="flex items-start gap-4 lg:mb-16">
                <div className="w-8 h-px bg-black/30 mt-3 shrink-0"></div>
                <p className="text-black text-sm md:text-base leading-relaxed max-w-sm font-medium">
                  Explore the most common questions about working with Create, all in one place.
                </p>
              </div>



              {/* Bottom CTA Block (Desktop) */}
              <div className="hidden lg:flex flex-col gap-6 mt-auto">
                <p className="text-black/60 text-sm md:text-base max-w-xs leading-relaxed font-medium">
                  Book a quick chat and we'll walk you through how we do things.
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-2">
                  {/* Profile */}
                  <div className="flex items-center gap-4 mb-[30px]">
                    <div className="w-12 h-12 rounded-lg bg-gray-200 overflow-hidden relative shadow-sm border border-black/5">
                      {/* Placeholder avatar */}
                      <Image
                        src="/pricing/8u5d3cZ4VIJFXUuXv6uDyiZodU.jpg"
                        alt="Lynn Bergmann"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-black">Lynn Bergmann</span>
                      <span className="text-[0.65rem] text-black/50 font-medium tracking-wide">Project Manager</span>
                    </div>
                  </div>

                  {/* Button */}
                  <Button variant="dark" size="md" className="sm:ml-auto group">
                    BOOK A CALL
                    <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </Button>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column (Accordion) */}
          <div className="lg:w-7/12 flex flex-col w-full">
            <div className="flex flex-col">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={index}
                    className={`flex flex-col transition-all duration-300 ease-in-out ${isOpen
                      ? ""
                      : ""
                      }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="flex justify-between items-center w-full text-left p-6 md:p-8 cursor-pointer relative z-20"
                    >
                      <span className={`text-lg md:text-xl font-medium tracking-tight pr-4 pointer-events-none ${isOpen ? "text-black" : "text-black/60"}`}>
                        {faq.question}
                      </span>
                      <div className="text-[#FF5033] shrink-0 pointer-events-none">
                        {isOpen ? (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 12H4"></path>
                          </svg>
                        ) : (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4"></path>
                          </svg>
                        )}
                      </div>
                    </button>

                    {/* Answer */}
                    <div
                      className={`grid transition-all duration-300 ease-in-out px-6 md:px-8 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-black/50 text-sm leading-relaxed max-w-xl font-medium pb-6 md:pb-8 mt-2">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom CTA Block (Mobile) */}
          <div className="flex lg:hidden flex-col gap-6 mt-4">
            <p className="text-black/60 text-sm md:text-base max-w-xs leading-relaxed font-medium">
              Book a quick chat and we'll walk you through how we do things.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-2">
              {/* Profile */}
              <div className="flex items-center gap-4 mb-[30px]">
                <div className="w-12 h-12 rounded-lg bg-gray-200 overflow-hidden relative shadow-sm border border-black/5">
                  <Image
                    src="/pricing/8u5d3cZ4VIJFXUuXv6uDyiZodU.jpg"
                    alt="Lynn Bergmann"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-black">Lynn Bergmann</span>
                  <span className="text-[0.65rem] text-black/50 font-medium tracking-wide">Project Manager</span>
                </div>
              </div>

              {/* Button */}
              <Button variant="dark" size="md" className="sm:ml-auto group">
                BOOK A CALL
                <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

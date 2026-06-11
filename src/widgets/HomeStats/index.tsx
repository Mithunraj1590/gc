import React from "react";

export default function HomeStats() {
  const stats = [
    {
      number: "86+",
      label: "PROJECTS SHIPPED",
      index: "001",
    },
    {
      number: "80%",
      label: "REPEAT COLLABORATIONS",
      index: "002",
    },
    {
      number: "32",
      label: "INDUSTRY AWARDS",
      index: "003",
    },
    {
      number: "89%",
      label: "CLIENT RETENTION RATE",
      index: "004",
    },
  ];

  return (
    <section className="relative w-full bg-[#0a0a0a] text-[#f5f5f7] lg:pt-32 py-[50px] md:pb-32 overflow-hidden border-t border-white/5">
      {/* Background abstract decoration placeholder - in a real scenario you might place a video or image here */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-white/5 via-[#0a0a0a] to-[#0a0a0a]"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="w-full">
          <div className="max-w-2xl mb-24">
            <h2 className="h2 font-medium tracking-tight mb-8">
              The proof behind <br />
              <span className="text-white/60">our work</span>
            </h2>
            <div className="flex items-start gap-4">
              <div className="w-8 h-px bg-white/40 mt-3 shrink-0"></div>
              <p className="text-lg font-light text-white/50 leading-relaxed max-w-md">
                From first launches to lasting collaborations, we&apos;re trusted to deliver on time and at quality.
              </p>
            </div>
          </div>

          {/* Divider lines */}
          <div className="flex gap-2 md:gap-4 mb-24 opacity-20">
            {[...Array(30)].map((_, i) => (
              <div key={i} className="w-[1px] h-6 bg-white shrink-0"></div>
            ))}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {stats.map((stat) => (
              <div key={stat.index} className="flex flex-col">
                <div className="text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-white mb-6">
                  {stat.number}
                </div>
                <div className="font-mono text-[0.65rem] md:text-xs font-semibold uppercase tracking-widest text-white/50 mb-4">
                  {stat.label}
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-px bg-white/20 flex-grow"></div>
                  <span className="font-mono text-[0.6rem] text-white/40">
                    //{stat.index}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

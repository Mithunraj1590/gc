export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-white/10 bg-black/40 backdrop-blur-[2px]">
      <div className="container py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/55">
              GC Mission Control
            </p>
            <h3 className="mb-4 text-xl font-semibold tracking-tight text-white">Built for precision growth.</h3>
            <p className="max-w-[420px] text-sm leading-relaxed text-white/60">
              We align brand, strategy, and execution into one system that moves with precision.
            </p>
            <div className="mt-6 inline-flex items-center gap-3 border border-white/15 bg-white/3 px-4 py-2 text-[0.65rem] uppercase tracking-[0.14em] text-white/65">
              <span className="h-2 w-2 rounded-full bg-[#C8A96E]" />
              Available for new missions
            </div>
          </div>

          <div>
            <p className="mb-4 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-white/50">
              Navigation
            </p>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a href="#home" className="transition-colors hover:text-[#C8A96E]">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="transition-colors hover:text-[#C8A96E]">
                  Services
                </a>
              </li>
              <li>
                <a href="#gallery" className="transition-colors hover:text-[#C8A96E]">
                  Gallery
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-white/50">
              Services
            </p>
            <ul className="space-y-2 text-sm text-white/70">
              <li>Brand Identity</li>
              <li>Performance Media</li>
              <li>AI Video Production</li>
              <li>Mission Strategy</li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-white/50">
              Contact
            </p>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a href="mailto:hello@gc.studio" className="transition-colors hover:text-[#C8A96E]">
                  hello@gc.studio
                </a>
              </li>
              <li>
                <a href="tel:+10000000000" className="transition-colors hover:text-[#C8A96E]">
                  +1 (000) 000-0000
                </a>
              </li>
            </ul>
            <p className="mt-5 text-xs uppercase tracking-[0.14em] text-white/45">Mon - Fri / 09:00 - 18:00</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-5 text-[0.72rem] text-white/45 md:flex-row md:items-center md:justify-between">
          <p>© {year} GC. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="transition-colors hover:text-[#C8A96E]">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-[#C8A96E]">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-[#C8A96E]">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

type LocationItem = Readonly<{
  city: string;
  zone: string;
  offset: number;
}>;

const locations: LocationItem[] = [
  { city: "UNITED KINGDOM", zone: "BST", offset: 1 },
  { city: "NEW ZEALAND", zone: "NZST", offset: 13 },
  { city: "INDIA", zone: "IST", offset: 5.5 },
];

const formatLocationTime = (zone: string, offset: number) => {
  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  const shifted = new Date(utcMs + offset * 3600000);
  const hh = shifted.getHours().toString().padStart(2, "0");
  const mm = shifted.getMinutes().toString().padStart(2, "0");
  return `${zone} ${hh}:${mm}`;
};

type NavItemType = "stats" | "quote" | "clients" | "split-buttons" | "article" | "contact";

type NavItem = {
  id: string;
  href: string;
  label: string;
  type: NavItemType;
  title: string;
  description?: string;
  stats?: { value: string; label: string }[];
  quote?: { text: string; author: string; role: string };
  clients?: string[];
  article?: { title: string; category: string; date: string };
  contact?: { email: string; phone: string; address: string };
  buttonText?: string;
  secondaryButtonText?: string;
};

const NAV_ITEMS: NavItem[] = [
  { 
    id: "impact", 
    href: "#impact", 
    label: "Impact",
    type: "stats",
    title: "Our Impact",
    description: "Every innovation that happens here is out of a quest to get better at what we are already doing. We deliver ideas that make a difference, create experiences that transform lives and build ecosystems that foster progress.",
    stats: [
      { value: "700+", label: "Projects launched successfully across the globe" },
      { value: "10M", label: "Daily customer engagement through our projects" },
      { value: "100+", label: "Digital transformation stories that made a difference" }
    ],
    buttonText: "Our Impact"
  },
  { 
    id: "testimonials", 
    href: "#testimonials", 
    label: "Testimonials",
    type: "quote",
    title: "Client Stories",
    quote: {
      text: "\"Their strategic approach and creative intelligence transformed our brand presence completely. The results exceeded all our expectations.\"",
      author: "Sarah Jenkins",
      role: "CMO, Global Tech"
    },
    buttonText: "Read Testimonials"
  },
  { 
    id: "clients", 
    href: "#clients", 
    label: "Clients",
    type: "clients",
    title: "Who We Work With",
    description: "We partner with visionary leaders and forward-thinking organizations across industries. From ambitious startups to established global enterprises.",
    clients: ["TechCorp", "InnovateSpace", "FutureDynamics", "GlobalReach"],
    buttonText: "View All Clients"
  },
  { 
    id: "partnership", 
    href: "#partnership", 
    label: "Partnership",
    type: "split-buttons",
    title: "Better Together",
    description: "We believe in the power of synergy. Our strategic partnerships enable us to deliver comprehensive, cutting-edge solutions that drive mutual success. Join our network of industry leaders.",
    buttonText: "Partner With Us",
    secondaryButtonText: "Find a Partner"
  },
  { 
    id: "insights", 
    href: "#insights", 
    label: "Insights",
    type: "article",
    title: "Knowledge Hub",
    description: "Dive into our latest thinking, research, and perspectives on the trends shaping the future of technology, business, and human experience.",
    article: {
      title: "The Future of AI in Enterprise Digital Transformation",
      category: "Technology",
      date: "October 12, 2026"
    },
    buttonText: "Explore Insights"
  },
  { 
    id: "contact", 
    href: "#contact", 
    label: "Contact",
    type: "contact",
    title: "Let's Talk",
    description: "Ready to start your next big project? Have a question about our services? Our team is here to help you navigate your digital transformation journey.",
    contact: {
      email: "hello@creativeintelligence.com",
      phone: "+1 (555) 123-4567",
      address: "120 Innovation Drive, Tech District, NY 10001"
    },
    buttonText: "Get In Touch"
  },
];

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(80);
  const [hoveredItemId, setHoveredItemId] = useState(NAV_ITEMS[0].id);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const headerRef = useRef<HTMLElement>(null);
  const locTextRef = useRef<HTMLSpanElement>(null);
  const locTimeRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (!headerRef.current) return;
    const updateHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const current = locations[currentLocationIndex];
  const currentTime = mounted ? formatLocationTime(current.zone, current.offset) : current.zone;

  useEffect(() => {
    setMounted(true);
    const timer = window.setInterval(() => {
      const targets = [locTextRef.current, locTimeRef.current].filter(
        (node): node is HTMLElement => Boolean(node)
      );

      if (!targets.length) {
        setCurrentLocationIndex((prev) => (prev + 1) % locations.length);
        return;
      }

      gsap.to(targets, {
        opacity: 0,
        y: -10,
        duration: 0.45,
        onComplete: () => {
          setCurrentLocationIndex((prev) => (prev + 1) % locations.length);
          gsap.to(targets, {
            opacity: 1,
            y: 0,
            duration: 0.45,
          });
        },
      });
    }, 4000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  useLayoutEffect(() => {
    const root = headerRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const els = root.querySelectorAll<HTMLElement>("[data-header-reveal]");
      if (!els.length) return;
      gsap.from(els, {
        opacity: 0,
        y: -14,
        duration: 0.75,
        ease: "power2.out",
        stagger: 0.12,
        delay: 0.2,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const activeContent = NAV_ITEMS.find(item => item.id === hoveredItemId) || NAV_ITEMS[0];

  return (
    <header
      ref={headerRef}
      className="pointer-events-none fixed top-0 z-2000 flex w-full items-center justify-between px-6 py-4 md:px-10"
    >
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/75 via-black/35 to-transparent" />
      <div className={`pointer-events-none absolute inset-0 bg-[#0a0a0a] transition-opacity duration-500 ${isMenuOpen ? "opacity-100" : "opacity-0"}`} />
      <div className={`pointer-events-auto relative z-10 transition-opacity duration-500 ${isMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`} data-header-reveal>
        <Link
          href="/"
          className="inline-flex items-center text-white outline-offset-4 transition-opacity"
          aria-label="Back to home"
        >
          <svg
            width="72"
            height="36"
            viewBox="0 0 368 187"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
                    <g clipPath="url(#clip0_2_16)">
                        <path d="M0 96.5341C0 78.5039 4.02492 62.5373 12.0573 48.5993C20.0896 34.6788 31.9369 23.7662 47.599 15.8966C63.2612 8.02698 82.6508 4.09216 105.768 4.09216C114.955 4.09216 123.197 4.70425 130.495 5.92841C137.792 7.15258 143.165 8.51665 146.612 9.98564V53.7408H143.655C140.207 51.9395 135.255 50.4181 128.78 49.1939C122.305 47.9697 115.463 47.3577 108.235 47.3577C89.0557 47.3577 75.0735 51.7821 66.2887 60.6311C57.5213 69.4801 53.1289 81.7742 53.1289 97.5135C53.1289 106.695 54.9314 114.844 58.5363 121.979C62.1412 129.114 67.2686 134.676 73.9185 138.698C80.5684 142.72 88.3907 144.714 97.403 144.714C102.163 144.714 106.013 144.189 108.97 143.122C111.928 142.056 114.465 139.975 116.6 136.862L107.255 164.878V93.089H154.487V177.154C147.592 180.11 139.227 182.488 129.392 184.289C119.558 186.091 108.568 187 96.423 187C75.1085 187 57.3113 183.24 43.0491 175.685C28.7869 168.148 18.0421 157.585 10.8323 143.979C3.62243 130.374 0.0174996 114.564 0.0174996 96.5341" fill="currentColor"/>
                        <path d="M164.812 95.5549C164.812 76.8776 168.539 60.6837 176.011 47.008C183.466 33.3323 194.701 22.752 209.716 15.3021C224.713 7.85219 243.542 4.10974 266.169 4.10974C274.534 4.10974 282.164 4.72182 289.041 5.94599C295.936 7.17016 301.099 8.53422 304.546 10.0032V53.7584H301.589C298.141 51.9571 293.626 50.4357 288.062 49.2115C282.479 47.9873 276.494 47.3752 270.107 47.3752C257.315 47.3752 247.112 49.4738 239.483 53.636C231.853 57.8156 226.358 63.5517 222.998 70.8442C219.638 78.1368 217.958 86.3737 217.958 95.5549C217.958 104.736 219.638 112.973 222.998 120.266C226.358 127.558 231.853 133.294 239.483 137.474C247.112 141.653 257.315 143.735 270.107 143.735C276.494 143.735 282.479 143.087 288.062 141.776C293.626 140.464 298.141 138.995 301.589 137.351H304.546V181.107C301.099 182.576 295.936 183.94 289.041 185.164C282.147 186.388 274.534 187 266.169 187C243.542 187 224.713 183.275 209.716 175.808C194.718 168.358 183.484 157.777 176.011 144.102C168.539 130.426 164.812 114.232 164.812 95.5549Z" fill="currentColor"/>
                        <path d="M340.946 187C332.914 187 326.386 184.499 321.381 179.498C316.376 174.496 313.874 167.99 313.874 159.946C313.874 151.901 316.376 145.203 321.381 140.272C326.386 135.358 332.896 132.892 340.946 132.892C348.996 132.892 355.698 135.358 360.633 140.272C365.55 145.186 368.018 151.744 368.018 159.946C368.018 168.148 365.55 174.496 360.633 179.498C355.716 184.499 349.153 187 340.946 187Z" fill="currentColor"/>
                        <path d="M333.49 0H344.148V1.59142H339.738V13.6757H337.9V1.59142H333.49V0Z" fill="currentColor"/>
                        <path d="M345.093 13.6757V0H346.615L351.445 7.51987H350.675L355.505 0H357.028V13.6757H355.208V2.97297L355.593 3.09539L351.778 8.97138H350.343L346.51 3.09539L346.913 2.97297V13.6757H345.093Z" fill="currentColor"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_2_16">
                            <rect width="368" height="187" fill="white"/>
                        </clipPath>
                    </defs>
          </svg>
        </Link>
      </div>

      <div className="pointer-events-auto flex items-center gap-4 md:gap-6 relative z-10" data-header-reveal>
        <div className={`text-right text-[0.58rem] tracking-[0.12em] hidden sm:block transition-opacity duration-500 ${isMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
          <span ref={locTextRef} className="block font-normal text-white/35">
            {current.city}
          </span>
          <span ref={locTimeRef} className="text-[0.6rem] font-semibold text-white/70">
            {currentTime}
          </span>
        </div>
        <button
          onClick={() => setIsMenuOpen(true)}
          className={`flex flex-col justify-center items-center w-12 h-12 md:w-14 md:h-14 hover:opacity-70 transition-opacity duration-500 relative cursor-pointer ${isMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          aria-label="Open menu"
        >
          <div className="absolute w-6 md:w-8 bg-white h-[2px] -translate-y-1.5 md:-translate-y-2"></div>
          <div className="absolute w-6 md:w-8 bg-white h-[2px] translate-y-1.5 md:translate-y-2"></div>
        </button>
      </div>

      {/* Menu Overlay & Drawer */}
      <div
        className={`pointer-events-auto fixed inset-0 z-[1500] transition-opacity duration-500 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-full bg-[#030303] shadow-2xl flex flex-col md:flex-row transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] overflow-hidden ${
            isMenuOpen ? "translate-x-0 md:translate-y-0" : "translate-x-full md:translate-x-0 md:-translate-y-full"
          }`}
        >
          {/* Close Menu Button */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 md:top-10 md:right-10 z-50 p-2 text-white/50 hover:text-white transition-colors cursor-pointer group"
            aria-label="Close menu"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-90 transition-transform duration-500">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          {/* Left Side: Impact Content */}
          <div className="flex-1 flex flex-col justify-center px-8 md:px-20 lg:px-32 py-12 relative z-10 bg-[#030303]">
            {/* Background ambient glow for left side */}
            <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-[#002244]/40 blur-[120px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2" />
            
            <h2 className="text-5xl md:text-6xl text-white font-light mb-8 tracking-tight">{activeContent.title}</h2>
            {activeContent.type === 'stats' && (
              <>
                <p className="text-white/80 text-base md:text-lg max-w-xl leading-relaxed mb-16 font-light">
                  {activeContent.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16 max-w-2xl">
                  {activeContent.stats?.map((stat, i) => (
                    <div key={i}>
                      <h3 className="text-4xl md:text-[2.75rem] text-white font-light mb-4">{stat.value}</h3>
                      <p className="text-xs md:text-sm text-white/90 leading-tight font-medium max-w-[140px]">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeContent.type === 'quote' && (
              <div className="mb-16 max-w-2xl">
                <p className="text-3xl md:text-4xl text-white font-light leading-snug mb-8">
                  {activeContent.quote?.text}
                </p>
                <div>
                  <p className="text-white text-lg font-medium">{activeContent.quote?.author}</p>
                  <p className="text-white/60 text-sm">{activeContent.quote?.role}</p>
                </div>
              </div>
            )}

            {activeContent.type === 'clients' && (
              <>
                <p className="text-white/80 text-base md:text-lg max-w-xl leading-relaxed mb-12 font-light">
                  {activeContent.description}
                </p>
                <div className="grid grid-cols-2 gap-4 mb-16 max-w-xl">
                  {activeContent.clients?.map((client, i) => (
                    <div key={i} className="border border-white/10 flex items-center justify-center py-8 text-white/50 text-xl font-light hover:text-white hover:border-white/30 transition-colors">
                      {client}
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeContent.type === 'split-buttons' && (
              <>
                <p className="text-white/80 text-base md:text-lg max-w-xl leading-relaxed mb-16 font-light">
                  {activeContent.description}
                </p>
              </>
            )}

            {activeContent.type === 'article' && (
              <>
                <p className="text-white/80 text-base md:text-lg max-w-xl leading-relaxed mb-12 font-light">
                  {activeContent.description}
                </p>
                <div className="border border-white/10 p-6 max-w-md mb-16 group hover:border-white/30 transition-colors cursor-pointer">
                  <span className="text-[#0088ff] text-xs font-semibold tracking-wider uppercase mb-3 block">{activeContent.article?.category}</span>
                  <h3 className="text-2xl text-white font-light mb-4 group-hover:text-[#0088ff] transition-colors">{activeContent.article?.title}</h3>
                  <p className="text-white/50 text-sm">{activeContent.article?.date}</p>
                </div>
              </>
            )}

            {activeContent.type === 'contact' && (
              <>
                <p className="text-white/80 text-base md:text-lg max-w-xl leading-relaxed mb-12 font-light">
                  {activeContent.description}
                </p>
                <div className="flex flex-col gap-6 mb-16 max-w-xl">
                  <div>
                    <h4 className="text-white/50 text-sm mb-1">Email</h4>
                    <a href={`mailto:${activeContent.contact?.email}`} className="text-white text-xl font-light hover:text-[#0088ff] transition-colors">{activeContent.contact?.email}</a>
                  </div>
                  <div>
                    <h4 className="text-white/50 text-sm mb-1">Phone</h4>
                    <p className="text-white text-xl font-light">{activeContent.contact?.phone}</p>
                  </div>
                  <div>
                    <h4 className="text-white/50 text-sm mb-1">Address</h4>
                    <p className="text-white text-xl font-light max-w-xs">{activeContent.contact?.address}</p>
                  </div>
                </div>
              </>
            )}

            <div className="flex items-center gap-4">
              {activeContent.buttonText && (
                <button className="group border border-white/40 text-white text-xs md:text-sm px-6 py-3 w-fit hover:bg-white hover:text-black transition-colors duration-300 flex items-center gap-3">
                  <span className="font-medium tracking-wide">{activeContent.buttonText}</span>
                  <span className="text-lg leading-none font-light group-hover:translate-x-1 transition-transform duration-300">&rsaquo;</span>
                </button>
              )}
              {activeContent.secondaryButtonText && (
                <button className="group border border-white/10 bg-white/5 text-white text-xs md:text-sm px-6 py-3 w-fit hover:bg-white hover:text-black transition-colors duration-300 flex items-center gap-3">
                  <span className="font-medium tracking-wide">{activeContent.secondaryButtonText}</span>
                  <span className="text-lg leading-none font-light group-hover:translate-x-1 transition-transform duration-300">&rsaquo;</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Side: Navigation Links */}
          <div className="flex-1 flex flex-col justify-center px-8 md:px-20 lg:px-32 py-12 relative z-10 bg-[#030303] overflow-hidden">
            {/* The blue glowing gradient */}
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#0088ff]/30 blur-[150px] rounded-full pointer-events-none translate-x-1/4 translate-y-1/4" />
            
            <nav className="flex flex-col gap-6 md:gap-8 relative z-10">
              {NAV_ITEMS.map((item, i) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  onMouseEnter={() => setHoveredItemId(item.id)}
                  className={`text-4xl sm:text-5xl md:text-6xl font-light tracking-wide transition-colors duration-300 ${item.id === hoveredItemId ? 'text-white' : 'text-white/40 hover:text-white'}`}
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

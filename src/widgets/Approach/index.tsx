"use client";

import React, { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import "./Approach.scss";

const LOGOS = [
  { name: "Norton", url: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Norton_logo.svg" },
  { name: "RCA", url: "https://upload.wikimedia.org/wikipedia/commons/c/c5/RCA_logo.svg" },
  { name: "Emirates", url: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Emirates_logo.svg" },
  { name: "EE", url: "https://upload.wikimedia.org/wikipedia/commons/5/5e/EE_logo.svg" },
  { name: "Sky", url: "https://upload.wikimedia.org/wikipedia/commons/d/da/Sky_Group_logo.svg" },
  { name: "GOV.UK", url: "https://upload.wikimedia.org/wikipedia/commons/0/07/Gov.uk_logo.svg" },
  { name: "Apollo", url: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Apollo_Global_Management_logo.svg" },
  { name: "Land Rover", url: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Land_Rover_logo_white.svg" },
  { name: "Panasonic", url: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Panasonic_logo.svg" },
  { name: "M&C Saatchi", url: "https://upload.wikimedia.org/wikipedia/commons/4/47/M%26C_Saatchi_logo.svg" },
];

export default function Approach() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef, { stagger: 0.1, y: 40 });

  return (
    <section ref={sectionRef} className="approach-section">
      <div className="container">
        <header className="approach-header">
          <div className="approach-header__left">
            <h2 data-reveal className="approach-title">Approach</h2>
          </div>
          <div className="approach-header__right">
            <div data-reveal className="approach-badge">OUR APPROACH</div>
            <p data-reveal className="approach-subtext">
              Work that works. Clear, collaborative, and crafted with care.
            </p>
          </div>
        </header>

        <div className="approach-grid">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} data-reveal className="approach-tile">
              <div className="approach-tile__inner">
                {/* Placeholder for logos since we don't have the exact ones */}
                <div className="approach-tile__logo">
                   {/* In a real scenario, we'd use item.url */}
                   <span className="text-white/20 text-[0.6rem] uppercase tracking-widest font-bold">Logo {i + 1}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

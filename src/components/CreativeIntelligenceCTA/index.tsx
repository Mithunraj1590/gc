"use client";

import React from "react";
import "./CreativeIntelligenceCTA.scss";

export type CreativeIntelligenceCTAProps = {
  className?: string;
  onButtonClick?: () => void;
};

export default function CreativeIntelligenceCTA({ 
  className = "", 
  onButtonClick 
}: CreativeIntelligenceCTAProps) {
  return (
    <section className={`creative-cta ${className}`.trim()}>
      <div className="creative-cta__left">
        <div className="creative-cta__icon" aria-hidden="true" />
        <h2 className="creative-cta__text">
          Explore Our <strong>Creative intelligence</strong>
        </h2>
      </div>
      
      <div className="creative-cta__right">
        <button 
          className="creative-cta__button" 
          onClick={onButtonClick}
          type="button"
        >
          Know More &gt;
        </button>
      </div>
    </section>
  );
}

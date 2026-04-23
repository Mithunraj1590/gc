"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useRef } from "react";
import "./HomeBlog.scss";

type HomeBlogProps = Readonly<{
  className?: string;
}>;

type BlogPost = Readonly<{
  title: string;
  category: string;
  date: string;
  excerpt: string;
  readTime: string;
  image: string;
}>;

const posts: BlogPost[] = [
  {
    title: "Why Most Brand Funnels Leak Before They Scale",
    category: "Strategy",
    date: "Apr 2026",
    excerpt:
      "A practical framework to identify weak signal points in your funnel and fix them before spend increases.",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "AI-Assisted Creative Testing Without Losing Brand Voice",
    category: "Creative",
    date: "Mar 2026",
    excerpt:
      "How to use AI for velocity while keeping tone, narrative coherence, and strategic messaging consistent.",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Forecast-Led Campaign Planning for Lean Teams",
    category: "Performance",
    date: "Feb 2026",
    excerpt:
      "Move from reactive media planning to forecast-led execution with a simple weekly mission-control cadence.",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function HomeBlog({ className = "" }: HomeBlogProps) {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef, { stagger: 0.11, y: 40 });

  return (
    <section
      ref={sectionRef}
      id="blog"
      className={`home-blog py-[100px] ${className}`.trim()}
      aria-label="Blog"
    >
      <div className="container">
        <div
          data-reveal
          className="mb-10 flex items-center gap-4 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/55 before:block before:h-px before:w-24 before:bg-white/45 md:before:w-36 lg:before:w-24"
        >
          Insights
        </div>

        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 data-reveal className="max-w-[760px] font-home-banner-heading text-[2.4rem] font-bold leading-[1.1] text-white">
            Signal-driven thinking for <span className="text-[#C8A96E]">modern growth teams.</span>
          </h2>
          <a
            data-reveal
            href="#"
            className="inline-flex w-fit items-center gap-2 border-b border-white/25 pb-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-white/70 transition-colors hover:border-[#C8A96E] hover:text-[#C8A96E]"
          >
            Explore Data Repository
          </a>
        </div>

        <div data-reveal className="home-blog__grid">
          {posts.map((post) => (
            <article key={post.title} className="home-blog__card">
              <div className="home-blog__image-box">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="home-blog__details">
                <div className="home-blog__top-meta">
                  <span>{post.category}</span>
                  <span>{post.date}</span>
                </div>

                <h3 className="home-blog__title">{post.title}</h3>
                <p className="home-blog__excerpt">{post.excerpt}</p>

                <div className="home-blog__footer">
                  <span>{post.readTime}</span>
                  <a href="#" className="home-blog__read-more">
                    Analyze Full File
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

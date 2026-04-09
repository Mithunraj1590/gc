"use client";

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
  return (
    <section id="blog" className={`py-16 md:py-20 ${className}`.trim()} aria-label="Blog">
      <div className="container">
        <div className="mb-10 flex items-center gap-4 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/55 before:block before:h-px before:w-24 before:bg-white/45 md:before:w-36 lg:before:w-48">
          Insights
        </div>

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="h2 max-w-[760px]">Signal-driven thinking for modern growth teams.</h2>
          <a
            href="#"
            className="inline-flex w-fit items-center gap-2 border-b border-white/25 pb-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-white/70 transition-colors hover:border-[#C8A96E] hover:text-[#C8A96E]"
          >
            View all posts
          </a>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.title}
              className="group relative overflow-hidden border border-white/10 bg-white/2 transition-colors duration-300 hover:border-[#C8A96E]/45 hover:bg-white/4"
            >
              <div className="relative h-48 overflow-hidden border-b border-white/10">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent" />
              </div>

              <div className="p-6">
              <div className="mb-5 flex items-center justify-between text-[0.62rem] uppercase tracking-[0.14em] text-white/50">
                <span>{post.category}</span>
                <span>{post.date}</span>
              </div>

              <h3 className="mb-4 text-[1.05rem] font-semibold leading-snug text-white transition-colors duration-300 group-hover:text-[#C8A96E]">
                {post.title}
              </h3>

              <p className="mb-6 text-sm leading-relaxed text-white/65">{post.excerpt}</p>

              <div className="flex items-center justify-between border-t border-white/10 pt-4 text-[0.68rem] uppercase tracking-[0.12em] text-white/50">
                <span>{post.readTime}</span>
                <a href="#" className="transition-colors hover:text-[#C8A96E]">
                  Read more
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

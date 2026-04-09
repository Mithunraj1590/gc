import { notFound } from "next/navigation";
import { galleryItems } from "@/data/galleryItems";

type CaseStudyPageProps = Readonly<{
  params: Promise<{
    projectname: string;
  }>;
}>;

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { projectname } = await params;
  const item = galleryItems.find((entry) => entry.slug === projectname);

  if (!item) notFound();

  return (
    <main className="min-h-screen py-16 md:py-20">
      <div className="container">
        <div className="mb-6 flex items-center justify-between text-[0.72rem] uppercase tracking-[0.14em] text-white/55">
          <span>{item.category}</span>
          <span>{item.year}</span>
        </div>

        <a
          href="/"
          className="mb-6 inline-flex items-center gap-2 border-b border-white/20 pb-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white/65 transition-colors hover:border-[#C8A96E] hover:text-[#C8A96E]"
        >
          ← Back
        </a>

        <h1 className="h2 mb-10">{item.title}</h1>

        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <section className="border border-white/10 bg-white/2 p-6">
            <h2 className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/55">Challenge</h2>
            <p className="text-sm leading-relaxed text-white/70">{item.challenge}</p>
          </section>
          <section className="border border-white/10 bg-white/2 p-6">
            <h2 className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/55">Objective</h2>
            <p className="text-sm leading-relaxed text-white/70">{item.objective}</p>
            <p className="mt-3 text-[0.68rem] uppercase tracking-[0.14em] text-white/50">Timeline: {item.timeline}</p>
          </section>
        </div>

        <div className="mb-12 overflow-hidden border border-white/10">
          <img src={item.src} alt={item.title} className="h-auto w-full object-cover" />
        </div>
        <p className="mb-10 max-w-[980px] whitespace-pre-line text-base leading-relaxed text-white/70">
          {item.longDescription}
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          <section className="border border-white/10 bg-white/2 p-6">
            <h2 className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/55">
              Mode of Operation
            </h2>
            <ul className="space-y-3 text-sm leading-relaxed text-white/70">
              {item.modeOfOperation.map((entry) => (
                <li key={entry} className="border-b border-white/10 pb-3 last:border-b-0 last:pb-0">
                  {entry}
                </li>
              ))}
            </ul>
          </section>

          <section className="border border-white/10 bg-white/2 p-6">
            <h2 className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/55">Approach</h2>
            <ul className="space-y-3 text-sm leading-relaxed text-white/70">
              {item.approach.map((entry) => (
                <li key={entry} className="border-b border-white/10 pb-3 last:border-b-0 last:pb-0">
                  {entry}
                </li>
              ))}
            </ul>
          </section>

          <section className="border border-white/10 bg-white/2 p-6">
            <h2 className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/55">Outcomes</h2>
            <ul className="space-y-3 text-sm leading-relaxed text-white/70">
              {item.outcomes.map((entry) => (
                <li key={entry} className="border-b border-white/10 pb-3 last:border-b-0 last:pb-0">
                  {entry}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="border border-white/10 bg-white/2 p-6">
            <h2 className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/55">Deliverables</h2>
            <ul className="space-y-3 text-sm leading-relaxed text-white/70">
              {item.deliverables.map((entry) => (
                <li key={entry} className="border-b border-white/10 pb-3 last:border-b-0 last:pb-0">
                  {entry}
                </li>
              ))}
            </ul>
          </section>

          <section className="border border-white/10 bg-white/2 p-6">
            <h2 className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/55">Stack</h2>
            <div className="mb-6 flex flex-wrap gap-2">
              {item.stack.map((entry) => (
                <span
                  key={entry}
                  className="border border-white/15 bg-white/3 px-3 py-1 text-[0.66rem] uppercase tracking-[0.12em] text-white/65"
                >
                  {entry}
                </span>
              ))}
            </div>

            <h3 className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/55">KPI Snapshot</h3>
            <div className="space-y-2">
              {item.kpis.map((entry) => (
                <div key={entry.label} className="flex items-center justify-between border-b border-white/10 pb-2 text-sm text-white/70 last:border-b-0">
                  <span>{entry.label}</span>
                  <span className="font-semibold text-[#C8A96E]">{entry.value}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

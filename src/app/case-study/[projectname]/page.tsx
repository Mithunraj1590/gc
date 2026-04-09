import fs from "node:fs/promises";
import path from "node:path";

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { galleryItems } from "@/data/galleryItems";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif"]);

function getPublicFolderFromSrc(src: string): string {
  const trimmed = src.replace(/^\/+/, "");
  const segment = trimmed.split("/")[0];
  return segment ?? "";
}

function naturalCompare(a: string, b: string): number {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

async function listImagesInPublicFolder(folder: string): Promise<string[]> {
  if (!folder) return [];

  const dir = path.join(process.cwd(), "public", folder);

  let names: string[];
  try {
    names = await fs.readdir(dir);
  } catch {
    return [];
  }

  return names
    .filter((name) => IMAGE_EXT.has(path.extname(name).toLowerCase()))
    .sort(naturalCompare)
    .map((name) => `/${folder}/${name}`);
}

type CaseStudyPageProps = Readonly<{
  params: Promise<{
    projectname: string;
  }>;
}>;

function toMetaDescription(longText: string, fallback: string): string {
  const one = longText.replace(/\s+/g, " ").trim();
  if (!one) return fallback;
  if (one.length <= 160) return one;
  return `${one.slice(0, 157)}…`;
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { projectname } = await params;
  const item = galleryItems.find((entry) => entry.slug === projectname);
  if (!item) return {};

  const description = toMetaDescription(
    item.longDescription,
    `${item.title} — ${item.category} (${item.year}). Case study · ${SITE_NAME}.`,
  );
  const ogImage = absoluteUrl(item.src);
  const path = `/case-study/${item.slug}`;

  return {
    title: item.title,
    description,
    openGraph: {
      title: item.title,
      description,
      type: "article",
      url: path,
      images: [{ url: ogImage, alt: item.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: path,
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { projectname } = await params;
  const item = galleryItems.find((entry) => entry.slug === projectname);

  if (!item) notFound();

  const folder = getPublicFolderFromSrc(item.src);
  const imagesFromFolder = await listImagesInPublicFolder(folder);
  const images = imagesFromFolder.length > 0 ? imagesFromFolder : [item.src];
  const [bannerSrc, ...restImages] = images;

  return (
    <main className="min-h-screen py-12 md:py-16 lg:py-20">
      <div className="container">
        <a
          href="/"
          className="mb-8 inline-flex items-center gap-2 border-b border-white/20 pb-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white/65 transition-colors hover:border-[#C8A96E] hover:text-[#C8A96E]"
        >
          ← Back
        </a>

        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-4 text-[0.72rem] uppercase tracking-[0.14em] text-white/55">
          <span>{item.category}</span>
          <span>{item.year}</span>
        </div>

        <h1 className="h2 mb-8 md:mb-10">{item.title}</h1>

        <figure className="relative mb-12 w-full overflow-hidden border border-white/10 bg-black/20">
          <img
            src={bannerSrc}
            alt={`${item.title} — hero`}
            className="block aspect-21/9 w-full object-cover md:aspect-auto md:h-[min(60vh,720px)]"
            loading="eager"
            fetchPriority="high"
          />
        </figure>

        {restImages.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:gap-6 xl:grid-cols-2">
            {restImages.map((src, index) => (
              <figure key={src} className="overflow-hidden border border-white/10 bg-black/20">
                <img
                  src={src}
                  alt={`${item.title} — frame ${index + 2} of ${images.length}`}
                  className="h-auto w-full object-cover"
                  loading="lazy"
                />
              </figure>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

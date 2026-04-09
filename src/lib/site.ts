/** Canonical site origin for metadata, OG URLs, and sitemap. Set in production via NEXT_PUBLIC_SITE_URL. */
export const SITE_NAME = "GC Mission Control";

export const SITE_DESCRIPTION =
  "We align brand, strategy, and execution into one precision growth system — from diagnosis through relaunch. Creative Intelligence, selected works, and mission-ready partnerships.";

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/^https?:\/\//, "")}`;

  return "http://localhost:3000";
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  if (path.startsWith("http")) return path;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

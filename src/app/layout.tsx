import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import FloatingNav from "@/components/FloatingNav";
import LenisProvider from "@/components/LenisProvider";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SITE_DESCRIPTION, SITE_NAME, getSiteUrl } from "@/lib/site";
import "./globals.css";
import "../styles/main.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE_NAME} — Brand, strategy & precision growth`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "brand strategy",
    "creative direction",
    "performance marketing",
    "campaign systems",
    "brand relaunch",
    "GC Mission Control",
    "Creative Intelligence",
  ],
  authors: [{ name: SITE_NAME, url: siteUrl }],
  creator: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Brand, strategy & precision growth`,
    description: SITE_DESCRIPTION,
    images: [{ url: "/welcome.webp", alt: `${SITE_NAME} — selected work` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Brand, strategy & precision growth`,
    description: SITE_DESCRIPTION,
    images: ["/welcome.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "/",
  },
  category: "business",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: siteUrl,
  description: SITE_DESCRIPTION,
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    url: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="relative min-h-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <LenisProvider />
        <Header />
        <div className="grid-overlay" aria-hidden />
        <div className="dots-overlay" aria-hidden />
        <div className="relative z-10 flex min-h-full flex-col">
          {children}
          <Footer />
        </div>
        <FloatingNav />
      </body>
    </html>
  );
}

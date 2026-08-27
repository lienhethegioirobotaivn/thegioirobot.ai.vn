import "./globals.css";

import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";

import { getSiteConfig } from "@/actions/admin/site-config";

export const dynamic = "force-dynamic";

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();
  if (!config) {
    return {};
  }

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
    metadataBase: new URL(config.canonicalUrl),
    alternates: { canonical: config.canonicalUrl },
    icons: {
      icon: config.faviconUrl ?? undefined,
      apple: config.appleTouchIconUrl ?? undefined,
    },
    openGraph: {
      title: config.ogTitle ?? config.title,
      description: config.ogDescription ?? config.description,
      url: config.canonicalUrl,
      siteName: config.siteName,
      images: config.ogImageUrl
        ? [{ url: config.ogImageUrl, width: 1200, height: 630 }]
        : undefined,
      locale: config.ogLocale,
      type: config.ogType as "website",
    },
    twitter: {
      card: config.twitterCard as "summary_large_image",
      site: config.twitterSite ?? undefined,
      creator: config.twitterCreator ?? undefined,
      images: config.twitterImageUrl ?? config.ogImageUrl ?? undefined,
    },
    robots: config.robotsIndex,
    verification: config.googleSiteVerification
      ? { google: config.googleSiteVerification }
      : undefined,
    themeColor: config.themeColor,
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={`${beVietnam.variable} h-full antialiased`}>
      <body className="bg-void text-text-primary flex min-h-full flex-col font-sans">
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}

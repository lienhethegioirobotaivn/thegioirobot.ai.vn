import type { MetadataRoute } from "next";

import { getSiteConfig } from "@/actions/admin/site-config";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const config = await getSiteConfig();
  const baseUrl = config?.canonicalUrl ?? "https://www.thegioirobot.ai.vn";

  const isIndexable = config?.robotsIndex?.includes("noindex") !== true;

  return {
    rules: {
      userAgent: "*",
      allow: isIndexable ? "/" : undefined,
      disallow: isIndexable ? ["/admin", "/login"] : "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

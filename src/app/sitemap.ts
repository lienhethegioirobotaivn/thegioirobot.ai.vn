import { eq } from "drizzle-orm";
import type { MetadataRoute } from "next";

import { getSiteConfig } from "@/actions/admin/site-config";
import { getDb } from "@/db";
import { homeNews } from "@/db/schema";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const config = await getSiteConfig();
  const baseUrl = (
    config?.canonicalUrl ?? "https://www.thegioirobot.ai.vn"
  ).replace(/\/$/, "");

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  // Nếu /tin-tuc là anchor trên trang chủ (không phải route riêng), bỏ phần này.
  // Nếu sau này có trang chi tiết bài viết riêng (/tin-tuc/[slug]), thêm vào đây.
  const db = getDb();
  const news = await db
    .select({
      id: homeNews.id,
      href: homeNews.href,
      updatedAt: homeNews.updatedAt,
    })
    .from(homeNews)
    .where(eq(homeNews.isPublished, true));

  const newsRoutes: MetadataRoute.Sitemap = news
    .filter((item) => item.href.startsWith("/")) // chỉ lấy internal link thật, bỏ qua "#"
    .map((item) => ({
      url: `${baseUrl}${item.href}`,
      lastModified: item.updatedAt,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  return [...staticRoutes, ...newsRoutes];
}

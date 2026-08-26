import { sql } from "drizzle-orm";
import { pgPolicy, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { anonRole, authenticatedRole } from "drizzle-orm/supabase";

export const siteConfig = pgTable(
  "site_config",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    // Basic SEO
    siteName: text("site_name").notNull().default("Thegioirobot"),
    title: text("title").notNull().default("Thegioirobot – Trí tuệ đồng hành"),
    description: text("description").notNull().default(""),
    keywords: text("keywords").notNull().default(""), // comma-separated
    canonicalUrl: text("canonical_url")
      .notNull()
      .default("https://thegioirobot.ai.vn"),

    // Icons
    faviconUrl: text("favicon_url"),
    appleTouchIconUrl: text("apple_touch_icon_url"),
    themeColor: text("theme_color").notNull().default("#0a0e1a"),

    // Open Graph
    ogTitle: text("og_title"),
    ogDescription: text("og_description"),
    ogImageUrl: text("og_image_url"),
    ogType: text("og_type").notNull().default("website"),
    ogLocale: text("og_locale").notNull().default("vi_VN"),

    // Twitter
    twitterCard: text("twitter_card").notNull().default("summary_large_image"),
    twitterSite: text("twitter_site"), // @thegioirobot
    twitterCreator: text("twitter_creator"),
    twitterImageUrl: text("twitter_image_url"),

    // Misc
    googleSiteVerification: text("google_site_verification"),
    robotsIndex: text("robots_index").notNull().default("index, follow"),

    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    pgPolicy("public_can_read_site_config", {
      for: "select",
      to: anonRole,
      using: sql`true`,
    }),
    pgPolicy("authenticated_can_read_site_config", {
      for: "select",
      to: authenticatedRole,
      using: sql`true`,
    }),
    pgPolicy("authenticated_can_update_site_config", {
      for: "update",
      to: authenticatedRole,
      using: sql`true`,
      withCheck: sql`true`,
    }),
  ],
).enableRLS();

import { sql } from "drizzle-orm";
import { pgPolicy, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { anonRole, authenticatedRole } from "drizzle-orm/supabase";

export const homeHero = pgTable(
  "home_hero",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    eyebrow: text("eyebrow").notNull().default(""),
    titleLine1: text("title_line1").notNull().default(""),
    titleGradient: text("title_gradient").notNull().default(""),
    titleLine2: text("title_line2").notNull().default(""),
    description: text("description").notNull().default(""),
    primaryCtaLabel: text("primary_cta_label").notNull().default(""),
    primaryCtaHref: text("primary_cta_href").notNull().default("#"),
    secondaryCtaLabel: text("secondary_cta_label").notNull().default(""),
    secondaryCtaHref: text("secondary_cta_href").notNull().default("#"),
    badgeTitle: text("badge_title").notNull().default(""),
    badgeText: text("badge_text").notNull().default(""),
    imageUrl: text("image_url"),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    pgPolicy("public_can_read_home_hero", {
      for: "select",
      to: anonRole,
      using: sql`true`,
    }),
    pgPolicy("authenticated_can_read_home_hero", {
      for: "select",
      to: authenticatedRole,
      using: sql`true`,
    }),
    pgPolicy("authenticated_can_update_home_hero", {
      for: "update",
      to: authenticatedRole,
      using: sql`true`,
      withCheck: sql`true`,
    }),
  ],
).enableRLS();

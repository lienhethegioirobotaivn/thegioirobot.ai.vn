import { sql } from "drizzle-orm";
import {
  jsonb,
  pgPolicy,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { anonRole, authenticatedRole } from "drizzle-orm/supabase";

type IconItem = { icon: string; label: string };
type AboutStat = { value: string; label: string };

export const homeSolutionsTechAbout = pgTable(
  "home_solutions_tech_about",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    solutionsHeading: text("solutions_heading").notNull().default(""),
    solutionsDescription: text("solutions_description").notNull().default(""),
    solutionsItems: jsonb("solutions_items")
      .$type<IconItem[]>()
      .notNull()
      .default([]),
    solutionsCtaLabel: text("solutions_cta_label").notNull().default(""),
    solutionsCtaHref: text("solutions_cta_href").notNull().default("#"),

    techHeading: text("tech_heading").notNull().default(""),
    techDescription: text("tech_description").notNull().default(""),
    techImageUrl: text("tech_image_url"),
    techItems: jsonb("tech_items").$type<IconItem[]>().notNull().default([]),
    techCtaLabel: text("tech_cta_label").notNull().default(""),
    techCtaHref: text("tech_cta_href").notNull().default("#"),

    aboutHeading: text("about_heading").notNull().default(""),
    aboutDescription: text("about_description").notNull().default(""),
    aboutStats: jsonb("about_stats").$type<AboutStat[]>().notNull().default([]),
    aboutCtaLabel: text("about_cta_label").notNull().default(""),
    aboutCtaHref: text("about_cta_href").notNull().default("#"),

    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    pgPolicy("public_can_read_stab", {
      for: "select",
      to: anonRole,
      using: sql`true`,
    }),
    pgPolicy("authenticated_can_read_stab", {
      for: "select",
      to: authenticatedRole,
      using: sql`true`,
    }),
    pgPolicy("authenticated_can_update_stab", {
      for: "update",
      to: authenticatedRole,
      using: sql`true`,
      withCheck: sql`true`,
    }),
  ],
).enableRLS();

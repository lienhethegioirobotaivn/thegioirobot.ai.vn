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

type VicoFeature = { icon: string; title: string; description: string };

export const homeVico = pgTable(
  "home_vico",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    eyebrow: text("eyebrow").notNull().default("Sản phẩm đầu tiên"),
    heading: text("heading").notNull().default("VICO"),
    subheading: text("subheading").notNull().default(""),
    description: text("description").notNull().default(""),
    ctaLabel: text("cta_label").notNull().default(""),
    ctaHref: text("cta_href").notNull().default("#"),
    speechBubbleText: text("speech_bubble_text").notNull().default(""),
    imageUrl: text("image_url"),
    features: jsonb("features").$type<VicoFeature[]>().notNull().default([]),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    pgPolicy("public_can_read_home_vico", {
      for: "select",
      to: anonRole,
      using: sql`true`,
    }),
    pgPolicy("authenticated_can_read_home_vico", {
      for: "select",
      to: authenticatedRole,
      using: sql`true`,
    }),
    pgPolicy("authenticated_can_update_home_vico", {
      for: "update",
      to: authenticatedRole,
      using: sql`true`,
      withCheck: sql`true`,
    }),
  ],
).enableRLS();

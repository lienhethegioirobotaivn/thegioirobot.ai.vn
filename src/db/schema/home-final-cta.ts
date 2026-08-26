import { sql } from "drizzle-orm";
import { pgPolicy, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { anonRole, authenticatedRole } from "drizzle-orm/supabase";

export const homeFinalCta = pgTable(
  "home_final_cta",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    imageUrl: text("image_url"),
    heading: text("heading").notNull().default(""),
    description: text("description").notNull().default(""),
    ctaLabel: text("cta_label").notNull().default(""),
    ctaHref: text("cta_href").notNull().default("#"),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    pgPolicy("public_can_read_final_cta", {
      for: "select",
      to: anonRole,
      using: sql`true`,
    }),
    pgPolicy("authenticated_can_read_final_cta", {
      for: "select",
      to: authenticatedRole,
      using: sql`true`,
    }),
    pgPolicy("authenticated_can_update_final_cta", {
      for: "update",
      to: authenticatedRole,
      using: sql`true`,
      withCheck: sql`true`,
    }),
  ],
).enableRLS();

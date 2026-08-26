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

type StatItem = { value: string; label: string };

export const homeStats = pgTable(
  "home_stats",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    items: jsonb("items").$type<StatItem[]>().notNull().default([]),
    footnote: text("footnote").notNull().default(""),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    pgPolicy("public_can_read_stats", {
      for: "select",
      to: anonRole,
      using: sql`true`,
    }),
    pgPolicy("authenticated_can_read_stats", {
      for: "select",
      to: authenticatedRole,
      using: sql`true`,
    }),
    pgPolicy("authenticated_can_update_stats", {
      for: "update",
      to: authenticatedRole,
      using: sql`true`,
      withCheck: sql`true`,
    }),
  ],
).enableRLS();

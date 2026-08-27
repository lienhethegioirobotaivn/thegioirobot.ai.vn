import { sql } from "drizzle-orm";
import {
  jsonb,
  pgPolicy,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { anonRole, authenticatedRole, serviceRole } from "drizzle-orm/supabase";

type NavLink = { label: string; href: string };

export const siteHeader = pgTable(
  "site_header",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    logoUrl: text("logo_url"),
    navLinks: jsonb("nav_links").$type<NavLink[]>().notNull().default([]),
    ctaLabel: text("cta_label").notNull().default("Dùng thử AI"),
    ctaHref: text("cta_href").notNull().default("#dung-thu"),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    pgPolicy("public_can_read_site_header", {
      for: "select",
      to: anonRole,
      using: sql`true`,
    }),
    pgPolicy("authenticated_can_read_site_header", {
      for: "select",
      to: authenticatedRole,
      using: sql`true`,
    }),
    pgPolicy("authenticated_can_update_site_header", {
      for: "update",
      to: authenticatedRole,
      using: sql`true`,
      withCheck: sql`true`,
    }),
    pgPolicy("service_role_full_access_site_header", {
      for: "all",
      to: serviceRole,
      using: sql`true`,
      withCheck: sql`true`,
    }),
  ],
).enableRLS();

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

type FooterLink = { label: string; href: string };
type FooterColumn = { title: string; links: FooterLink[] };
type SocialLink = { icon: string; href: string; label: string };

export const siteFooter = pgTable(
  "site_footer",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    logoUrl: text("logo_url"),
    description: text("description").notNull().default(""),

    socials: jsonb("socials").$type<SocialLink[]>().notNull().default([]),
    columns: jsonb("columns").$type<FooterColumn[]>().notNull().default([]),
    legalLinks: jsonb("legal_links")
      .$type<FooterLink[]>()
      .notNull()
      .default([]),

    newsletterHeading: text("newsletter_heading")
      .notNull()
      .default("Đăng ký nhận tin"),
    newsletterDescription: text("newsletter_description").notNull().default(""),

    copyrightText: text("copyright_text").notNull().default(""),
    hotline: text("hotline").notNull().default(""),
    email: text("email").notNull().default(""),

    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    pgPolicy("public_can_read_site_footer", {
      for: "select",
      to: anonRole,
      using: sql`true`,
    }),
    pgPolicy("authenticated_can_read_site_footer", {
      for: "select",
      to: authenticatedRole,
      using: sql`true`,
    }),
    pgPolicy("authenticated_can_update_site_footer", {
      for: "update",
      to: authenticatedRole,
      using: sql`true`,
      withCheck: sql`true`,
    }),
    pgPolicy("service_role_full_access_site_footer", {
      for: "all",
      to: serviceRole,
      using: sql`true`,
      withCheck: sql`true`,
    }),
  ],
).enableRLS();

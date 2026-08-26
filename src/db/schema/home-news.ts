import { sql } from "drizzle-orm";
import {
  boolean,
  pgPolicy,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { anonRole, authenticatedRole } from "drizzle-orm/supabase";

export const homeNews = pgTable(
  "home_news",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    imageUrl: text("image_url"),
    publishedAt: text("published_at").notNull(), // "15.05.2024" giữ format hiển thị hiện tại
    href: text("href").notNull().default("#"),
    isPublished: boolean("is_published").notNull().default(true),
    sortOrder: text("sort_order").notNull().default("0"),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    pgPolicy("public_can_read_published_news", {
      for: "select",
      to: anonRole,
      using: sql`is_published = true`,
    }),
    pgPolicy("authenticated_can_read_all_news", {
      for: "select",
      to: authenticatedRole,
      using: sql`true`,
    }),
    pgPolicy("authenticated_can_all_news", {
      for: "all",
      to: authenticatedRole,
      using: sql`true`,
      withCheck: sql`true`,
    }),
  ],
).enableRLS();

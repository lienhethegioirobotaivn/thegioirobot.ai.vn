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

export type PreorderImageLabel = {
  title: string;
  subtitle: string;
  position: "top-right" | "bottom-left";
};

export type PreorderVersionOption = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
};

export type PreorderColorOption = {
  id: string;
  name: string;
  swatch: string;
};

export type PreorderContactField = {
  id: string;
  label: string;
  placeholder: string;
};

export type PreorderPaymentOption = {
  id: string;
  code: string;
  name: string;
  tag: string | null;
};

export const homePreorder = pgTable(
  "home_preorder",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    eyebrow: text("eyebrow").notNull().default(""),
    heading: text("heading").notNull().default(""),
    headingHighlight: text("heading_highlight").notNull().default(""),
    description: text("description").notNull().default(""),
    footnote: text("footnote").notNull().default(""),
    imageUrl: text("image_url"),
    imageLabels: jsonb("image_labels")
      .$type<PreorderImageLabel[]>()
      .notNull()
      .default(sql`'[]'::jsonb`),

    formTitle: text("form_title").notNull().default(""),
    formBadge: text("form_badge").notNull().default(""),
    formSubtitle: text("form_subtitle").notNull().default(""),

    versionStepTitle: text("version_step_title").notNull().default(""),
    versionOptions: jsonb("version_options")
      .$type<PreorderVersionOption[]>()
      .notNull()
      .default(sql`'[]'::jsonb`),

    colorStepTitle: text("color_step_title").notNull().default(""),
    colorOptions: jsonb("color_options")
      .$type<PreorderColorOption[]>()
      .notNull()
      .default(sql`'[]'::jsonb`),
    colorNote: text("color_note").notNull().default(""),
    colorNoteBadge: text("color_note_badge").notNull().default(""),

    contactStepTitle: text("contact_step_title").notNull().default(""),
    contactFields: jsonb("contact_fields")
      .$type<PreorderContactField[]>()
      .notNull()
      .default(sql`'[]'::jsonb`),

    paymentStepTitle: text("payment_step_title").notNull().default(""),
    paymentBadge: text("payment_badge").notNull().default(""),
    paymentOptions: jsonb("payment_options")
      .$type<PreorderPaymentOption[]>()
      .notNull()
      .default(sql`'[]'::jsonb`),

    summaryConfigLabel: text("summary_config_label").notNull().default(""),
    summaryDepositLabel: text("summary_deposit_label").notNull().default(""),
    summaryDepositAmount: text("summary_deposit_amount").notNull().default(""),
    summaryDisclaimer: text("summary_disclaimer").notNull().default(""),

    ctaLabel: text("cta_label").notNull().default(""),
    ctaFootnote: text("cta_footnote").notNull().default(""),

    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  () => [
    pgPolicy("public_can_read_preorder", {
      for: "select",
      to: anonRole,
      using: sql`true`,
    }),
    pgPolicy("authenticated_can_read_preorder", {
      for: "select",
      to: authenticatedRole,
      using: sql`true`,
    }),
    pgPolicy("authenticated_can_all_preorder", {
      for: "all",
      to: authenticatedRole,
      using: sql`true`,
      withCheck: sql`true`,
    }),
  ],
).enableRLS();

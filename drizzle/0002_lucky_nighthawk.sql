CREATE TABLE "home_preorder" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"eyebrow" text DEFAULT '' NOT NULL,
	"heading" text DEFAULT '' NOT NULL,
	"heading_highlight" text DEFAULT '' NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"footnote" text DEFAULT '' NOT NULL,
	"image_url" text,
	"image_labels" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"form_title" text DEFAULT '' NOT NULL,
	"form_badge" text DEFAULT '' NOT NULL,
	"form_subtitle" text DEFAULT '' NOT NULL,
	"version_step_title" text DEFAULT '' NOT NULL,
	"version_options" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"color_step_title" text DEFAULT '' NOT NULL,
	"color_options" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"color_note" text DEFAULT '' NOT NULL,
	"color_note_badge" text DEFAULT '' NOT NULL,
	"contact_step_title" text DEFAULT '' NOT NULL,
	"contact_fields" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"payment_step_title" text DEFAULT '' NOT NULL,
	"payment_badge" text DEFAULT '' NOT NULL,
	"payment_options" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"summary_config_label" text DEFAULT '' NOT NULL,
	"summary_deposit_label" text DEFAULT '' NOT NULL,
	"summary_deposit_amount" text DEFAULT '' NOT NULL,
	"summary_disclaimer" text DEFAULT '' NOT NULL,
	"cta_label" text DEFAULT '' NOT NULL,
	"cta_footnote" text DEFAULT '' NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "home_preorder" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE POLICY "public_can_read_preorder" ON "home_preorder" AS PERMISSIVE FOR SELECT TO "anon" USING (true);--> statement-breakpoint
CREATE POLICY "authenticated_can_read_preorder" ON "home_preorder" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "authenticated_can_all_preorder" ON "home_preorder" AS PERMISSIVE FOR ALL TO "authenticated" USING (true) WITH CHECK (true);
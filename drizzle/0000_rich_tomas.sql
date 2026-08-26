CREATE TABLE "home_final_cta" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"image_url" text,
	"heading" text DEFAULT '' NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"cta_label" text DEFAULT '' NOT NULL,
	"cta_href" text DEFAULT '#' NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "home_final_cta" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "home_hero" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"eyebrow" text DEFAULT '' NOT NULL,
	"title_line1" text DEFAULT '' NOT NULL,
	"title_gradient" text DEFAULT '' NOT NULL,
	"title_line2" text DEFAULT '' NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"primary_cta_label" text DEFAULT '' NOT NULL,
	"primary_cta_href" text DEFAULT '#' NOT NULL,
	"secondary_cta_label" text DEFAULT '' NOT NULL,
	"secondary_cta_href" text DEFAULT '#' NOT NULL,
	"badge_title" text DEFAULT '' NOT NULL,
	"badge_text" text DEFAULT '' NOT NULL,
	"image_url" text,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "home_hero" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "home_news" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"image_url" text,
	"published_at" text NOT NULL,
	"href" text DEFAULT '#' NOT NULL,
	"is_published" boolean DEFAULT true NOT NULL,
	"sort_order" text DEFAULT '0' NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "home_news" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "home_partners" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"logo_url" text,
	"sort_order" text DEFAULT '0' NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "home_partners" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "home_solutions_tech_about" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"solutions_heading" text DEFAULT '' NOT NULL,
	"solutions_description" text DEFAULT '' NOT NULL,
	"solutions_items" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"solutions_cta_label" text DEFAULT '' NOT NULL,
	"solutions_cta_href" text DEFAULT '#' NOT NULL,
	"tech_heading" text DEFAULT '' NOT NULL,
	"tech_description" text DEFAULT '' NOT NULL,
	"tech_image_url" text,
	"tech_items" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"tech_cta_label" text DEFAULT '' NOT NULL,
	"tech_cta_href" text DEFAULT '#' NOT NULL,
	"about_heading" text DEFAULT '' NOT NULL,
	"about_description" text DEFAULT '' NOT NULL,
	"about_stats" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"about_cta_label" text DEFAULT '' NOT NULL,
	"about_cta_href" text DEFAULT '#' NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "home_solutions_tech_about" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "home_stats" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"items" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"footnote" text DEFAULT '' NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "home_stats" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "home_vico" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"eyebrow" text DEFAULT 'Sản phẩm đầu tiên' NOT NULL,
	"heading" text DEFAULT 'VICO' NOT NULL,
	"subheading" text DEFAULT '' NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"cta_label" text DEFAULT '' NOT NULL,
	"cta_href" text DEFAULT '#' NOT NULL,
	"speech_bubble_text" text DEFAULT '' NOT NULL,
	"image_url" text,
	"features" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "home_vico" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "site_config" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"site_name" text DEFAULT 'Thegioirobot' NOT NULL,
	"title" text DEFAULT 'Thegioirobot – Trí tuệ đồng hành' NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"keywords" text DEFAULT '' NOT NULL,
	"canonical_url" text DEFAULT 'https://thegioirobot.ai.vn' NOT NULL,
	"favicon_url" text,
	"apple_touch_icon_url" text,
	"theme_color" text DEFAULT '#0a0e1a' NOT NULL,
	"og_title" text,
	"og_description" text,
	"og_image_url" text,
	"og_type" text DEFAULT 'website' NOT NULL,
	"og_locale" text DEFAULT 'vi_VN' NOT NULL,
	"twitter_card" text DEFAULT 'summary_large_image' NOT NULL,
	"twitter_site" text,
	"twitter_creator" text,
	"twitter_image_url" text,
	"google_site_verification" text,
	"robots_index" text DEFAULT 'index, follow' NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "site_config" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE POLICY "public_can_read_final_cta" ON "home_final_cta" AS PERMISSIVE FOR SELECT TO "anon" USING (true);--> statement-breakpoint
CREATE POLICY "authenticated_can_read_final_cta" ON "home_final_cta" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "authenticated_can_update_final_cta" ON "home_final_cta" AS PERMISSIVE FOR UPDATE TO "authenticated" USING (true) WITH CHECK (true);--> statement-breakpoint
CREATE POLICY "public_can_read_home_hero" ON "home_hero" AS PERMISSIVE FOR SELECT TO "anon" USING (true);--> statement-breakpoint
CREATE POLICY "authenticated_can_read_home_hero" ON "home_hero" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "authenticated_can_update_home_hero" ON "home_hero" AS PERMISSIVE FOR UPDATE TO "authenticated" USING (true) WITH CHECK (true);--> statement-breakpoint
CREATE POLICY "public_can_read_published_news" ON "home_news" AS PERMISSIVE FOR SELECT TO "anon" USING (is_published = true);--> statement-breakpoint
CREATE POLICY "authenticated_can_read_all_news" ON "home_news" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "authenticated_can_all_news" ON "home_news" AS PERMISSIVE FOR ALL TO "authenticated" USING (true) WITH CHECK (true);--> statement-breakpoint
CREATE POLICY "public_can_read_partners" ON "home_partners" AS PERMISSIVE FOR SELECT TO "anon" USING (true);--> statement-breakpoint
CREATE POLICY "authenticated_can_read_partners" ON "home_partners" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "authenticated_can_all_partners" ON "home_partners" AS PERMISSIVE FOR ALL TO "authenticated" USING (true) WITH CHECK (true);--> statement-breakpoint
CREATE POLICY "public_can_read_stab" ON "home_solutions_tech_about" AS PERMISSIVE FOR SELECT TO "anon" USING (true);--> statement-breakpoint
CREATE POLICY "authenticated_can_read_stab" ON "home_solutions_tech_about" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "authenticated_can_update_stab" ON "home_solutions_tech_about" AS PERMISSIVE FOR UPDATE TO "authenticated" USING (true) WITH CHECK (true);--> statement-breakpoint
CREATE POLICY "public_can_read_stats" ON "home_stats" AS PERMISSIVE FOR SELECT TO "anon" USING (true);--> statement-breakpoint
CREATE POLICY "authenticated_can_read_stats" ON "home_stats" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "authenticated_can_update_stats" ON "home_stats" AS PERMISSIVE FOR UPDATE TO "authenticated" USING (true) WITH CHECK (true);--> statement-breakpoint
CREATE POLICY "public_can_read_home_vico" ON "home_vico" AS PERMISSIVE FOR SELECT TO "anon" USING (true);--> statement-breakpoint
CREATE POLICY "authenticated_can_read_home_vico" ON "home_vico" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "authenticated_can_update_home_vico" ON "home_vico" AS PERMISSIVE FOR UPDATE TO "authenticated" USING (true) WITH CHECK (true);--> statement-breakpoint
CREATE POLICY "public_can_read_site_config" ON "site_config" AS PERMISSIVE FOR SELECT TO "anon" USING (true);--> statement-breakpoint
CREATE POLICY "authenticated_can_read_site_config" ON "site_config" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "authenticated_can_update_site_config" ON "site_config" AS PERMISSIVE FOR UPDATE TO "authenticated" USING (true) WITH CHECK (true);
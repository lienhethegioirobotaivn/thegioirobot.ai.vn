CREATE TABLE "site_footer" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"logo_url" text,
	"description" text DEFAULT '' NOT NULL,
	"socials" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"columns" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"legal_links" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"newsletter_heading" text DEFAULT 'Đăng ký nhận tin' NOT NULL,
	"newsletter_description" text DEFAULT '' NOT NULL,
	"copyright_text" text DEFAULT '' NOT NULL,
	"hotline" text DEFAULT '' NOT NULL,
	"email" text DEFAULT '' NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "site_footer" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "site_header" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"logo_url" text,
	"nav_links" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"cta_label" text DEFAULT 'Dùng thử AI' NOT NULL,
	"cta_href" text DEFAULT '#dung-thu' NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "site_header" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE POLICY "public_can_read_site_footer" ON "site_footer" AS PERMISSIVE FOR SELECT TO "anon" USING (true);--> statement-breakpoint
CREATE POLICY "authenticated_can_read_site_footer" ON "site_footer" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "authenticated_can_update_site_footer" ON "site_footer" AS PERMISSIVE FOR UPDATE TO "authenticated" USING (true) WITH CHECK (true);--> statement-breakpoint
CREATE POLICY "service_role_full_access_site_footer" ON "site_footer" AS PERMISSIVE FOR ALL TO "service_role" USING (true) WITH CHECK (true);--> statement-breakpoint
CREATE POLICY "public_can_read_site_header" ON "site_header" AS PERMISSIVE FOR SELECT TO "anon" USING (true);--> statement-breakpoint
CREATE POLICY "authenticated_can_read_site_header" ON "site_header" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "authenticated_can_update_site_header" ON "site_header" AS PERMISSIVE FOR UPDATE TO "authenticated" USING (true) WITH CHECK (true);--> statement-breakpoint
CREATE POLICY "service_role_full_access_site_header" ON "site_header" AS PERMISSIVE FOR ALL TO "service_role" USING (true) WITH CHECK (true);
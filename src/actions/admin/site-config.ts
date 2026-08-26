"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { siteConfig } from "@/db/schema";
import { cleanupReplacedImages } from "@/lib/supabase/cleanup-images";
import { requireAdmin } from "@/lib/supabase/require-admin";

export async function getSiteConfig() {
  const [row] = await db.select().from(siteConfig).limit(1);
  return row ?? null;
}

export async function updateSiteConfig(
  id: string,
  values: Partial<typeof siteConfig.$inferInsert>,
) {
  await requireAdmin();

  const [before] = await db
    .select()
    .from(siteConfig)
    .where(eq(siteConfig.id, id))
    .limit(1);

  await db
    .update(siteConfig)
    .set({ ...values, updatedAt: new Date() })
    .where(eq(siteConfig.id, id));

  if (before) {
    await cleanupReplacedImages(
      [
        before.faviconUrl,
        before.appleTouchIconUrl,
        before.ogImageUrl,
        before.twitterImageUrl,
      ],
      [
        values.faviconUrl,
        values.appleTouchIconUrl,
        values.ogImageUrl,
        values.twitterImageUrl,
      ],
    );
  }

  revalidatePath("/", "layout");
  revalidatePath("/admin");

  return { success: true };
}

"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { siteFooter, siteHeader } from "@/db/schema";
import { cleanupReplacedImages } from "@/lib/supabase/cleanup-images";
import { requireAdmin } from "@/lib/supabase/require-admin";

function revalidateLayout() {
  revalidatePath("/", "layout");
  revalidatePath("/admin/header-footer");
}

/* ---------- Header ---------- */
export async function getSiteHeader() {
  const [row] = await db.select().from(siteHeader).limit(1);
  return row ?? null;
}

export async function updateSiteHeader(
  id: string,
  values: Partial<typeof siteHeader.$inferInsert>,
) {
  await requireAdmin();

  const [before] = await db
    .select()
    .from(siteHeader)
    .where(eq(siteHeader.id, id))
    .limit(1);

  await db
    .update(siteHeader)
    .set({ ...values, updatedAt: new Date() })
    .where(eq(siteHeader.id, id));

  if (before) {
    await cleanupReplacedImages([before.logoUrl], [values.logoUrl]);
  }

  revalidateLayout();
  return { success: true };
}

/* ---------- Footer ---------- */
export async function getSiteFooter() {
  const [row] = await db.select().from(siteFooter).limit(1);
  return row ?? null;
}

export async function updateSiteFooter(
  id: string,
  values: Partial<typeof siteFooter.$inferInsert>,
) {
  await requireAdmin();

  const [before] = await db
    .select()
    .from(siteFooter)
    .where(eq(siteFooter.id, id))
    .limit(1);

  await db
    .update(siteFooter)
    .set({ ...values, updatedAt: new Date() })
    .where(eq(siteFooter.id, id));

  if (before) {
    await cleanupReplacedImages([before.logoUrl], [values.logoUrl]);
  }

  revalidateLayout();
  return { success: true };
}

"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import {
  homeFinalCta,
  homeHero,
  homeNews,
  homePartners,
  homeSolutionsTechAbout,
  homeStats,
  homeVico,
} from "@/db/schema";
import { cleanupReplacedImages } from "@/lib/supabase/cleanup-images";
import { requireAdmin } from "@/lib/supabase/require-admin";

function revalidateHome() {
  revalidatePath("/", "layout");
  revalidatePath("/admin/home");
}

/* ---------- Hero ---------- */
export async function updateHomeHero(
  id: string,
  values: Partial<typeof homeHero.$inferInsert>,
) {
  await requireAdmin();

  const [before] = await db
    .select()
    .from(homeHero)
    .where(eq(homeHero.id, id))
    .limit(1);

  await db
    .update(homeHero)
    .set({ ...values, updatedAt: new Date() })
    .where(eq(homeHero.id, id));

  if (before) {
    await cleanupReplacedImages([before.imageUrl], [values.imageUrl]);
  }

  revalidateHome();
  return { success: true };
}

/* ---------- Vico product ---------- */
export async function updateHomeVico(
  id: string,
  values: Partial<typeof homeVico.$inferInsert>,
) {
  await requireAdmin();

  const [before] = await db
    .select()
    .from(homeVico)
    .where(eq(homeVico.id, id))
    .limit(1);

  await db
    .update(homeVico)
    .set({ ...values, updatedAt: new Date() })
    .where(eq(homeVico.id, id));

  if (before) {
    await cleanupReplacedImages([before.imageUrl], [values.imageUrl]);
  }

  revalidateHome();
  return { success: true };
}

/* ---------- Solutions / Tech / About ---------- */
export async function updateHomeSolutionsTechAbout(
  id: string,
  values: Partial<typeof homeSolutionsTechAbout.$inferInsert>,
) {
  await requireAdmin();

  const [before] = await db
    .select()
    .from(homeSolutionsTechAbout)
    .where(eq(homeSolutionsTechAbout.id, id))
    .limit(1);

  await db
    .update(homeSolutionsTechAbout)
    .set({ ...values, updatedAt: new Date() })
    .where(eq(homeSolutionsTechAbout.id, id));

  if (before) {
    await cleanupReplacedImages([before.techImageUrl], [values.techImageUrl]);
  }

  revalidateHome();
  return { success: true };
}

/* ---------- Stats (không có ảnh, giữ nguyên) ---------- */
export async function updateHomeStats(
  id: string,
  values: Partial<typeof homeStats.$inferInsert>,
) {
  await requireAdmin();
  await db
    .update(homeStats)
    .set({ ...values, updatedAt: new Date() })
    .where(eq(homeStats.id, id));
  revalidateHome();
  return { success: true };
}

/* ---------- Final CTA ---------- */
export async function updateHomeFinalCta(
  id: string,
  values: Partial<typeof homeFinalCta.$inferInsert>,
) {
  await requireAdmin();

  const [before] = await db
    .select()
    .from(homeFinalCta)
    .where(eq(homeFinalCta.id, id))
    .limit(1);

  await db
    .update(homeFinalCta)
    .set({ ...values, updatedAt: new Date() })
    .where(eq(homeFinalCta.id, id));

  if (before) {
    await cleanupReplacedImages([before.imageUrl], [values.imageUrl]);
  }

  revalidateHome();
  return { success: true };
}

/* ---------- Partners (multi-row: replace toàn bộ danh sách) ---------- */
export async function replaceHomePartners(
  items: (typeof homePartners.$inferInsert)[],
) {
  await requireAdmin();

  const before = await db.select().from(homePartners);

  await db.transaction(async (tx) => {
    await tx.delete(homePartners);
    if (items.length > 0) {
      await tx.insert(homePartners).values(items);
    }
  });

  await cleanupReplacedImages(
    before.map((p) => p.logoUrl),
    items.map((p) => p.logoUrl),
  );

  revalidateHome();
  return { success: true };
}

export async function getHomePartners() {
  return db.select().from(homePartners).orderBy(homePartners.sortOrder);
}

/* ---------- News (multi-row: replace toàn bộ danh sách) ---------- */
export async function replaceHomeNews(items: (typeof homeNews.$inferInsert)[]) {
  await requireAdmin();

  const before = await db.select().from(homeNews);

  await db.transaction(async (tx) => {
    await tx.delete(homeNews);
    if (items.length > 0) {
      await tx.insert(homeNews).values(items);
    }
  });

  await cleanupReplacedImages(
    before.map((n) => n.imageUrl),
    items.map((n) => n.imageUrl),
  );

  revalidateHome();
  return { success: true };
}

export async function getHomeNews() {
  return db.select().from(homeNews).orderBy(homeNews.sortOrder);
}

/* ---------- getters cho singleton ---------- */
export async function getHomeHero() {
  const [row] = await db.select().from(homeHero).limit(1);
  return row ?? null;
}
export async function getHomeVico() {
  const [row] = await db.select().from(homeVico).limit(1);
  return row ?? null;
}
export async function getHomeSolutionsTechAbout() {
  const [row] = await db.select().from(homeSolutionsTechAbout).limit(1);
  return row ?? null;
}
export async function getHomeStats() {
  const [row] = await db.select().from(homeStats).limit(1);
  return row ?? null;
}
export async function getHomeFinalCta() {
  const [row] = await db.select().from(homeFinalCta).limit(1);
  return row ?? null;
}

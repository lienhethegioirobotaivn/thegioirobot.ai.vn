"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cache } from "react";

import { db } from "@/db";
import {
  homeFinalCta,
  homeHero,
  homeNews,
  homePartners,
  homePreorder,
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

export const getHomePartners = cache(async function getHomePartners() {
  return db.select().from(homePartners).orderBy(homePartners.sortOrder);
});

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

export const getHomeNews = cache(async function getHomeNews() {
  return db.select().from(homeNews).orderBy(homeNews.sortOrder);
});

/* ---------- Pre-order (singleton chứa nhiều danh sách jsonb) ---------- */
/**
 * Upsert: bảng có thể chưa có dòng nào (chưa seed / bị xoá).
 * Nếu chưa có -> insert mới. Nếu đã có -> update dòng duy nhất đó.
 */
export async function saveHomePreorder(
  values: typeof homePreorder.$inferInsert,
) {
  await requireAdmin();

  const [before] = await db.select().from(homePreorder).limit(1);

  if (!before) {
    const {
      id: _ignoredId,
      updatedAt: _ignoredUpdatedAt,
      ...insertValues
    } = values;
    await db.insert(homePreorder).values(insertValues);
    revalidateHome();
    return { success: true };
  }

  await db
    .update(homePreorder)
    .set({ ...values, id: before.id, updatedAt: new Date() })
    .where(eq(homePreorder.id, before.id));

  const beforeImages = [
    before.imageUrl,
    ...before.versionOptions.map((v) => v.imageUrl),
  ];
  const afterImages = [
    values.imageUrl,
    ...(values.versionOptions ?? before.versionOptions).map((v) => v.imageUrl),
  ];
  await cleanupReplacedImages(beforeImages, afterImages);

  revalidateHome();
  return { success: true };
}

export const getHomePreorder = cache(async function getHomePreorder() {
  const [row] = await db.select().from(homePreorder).limit(1);
  return row ?? null;
});

/* ---------- getters cho singleton ---------- */
export const getHomeHero = cache(async function getHomeHero() {
  const [row] = await db.select().from(homeHero).limit(1);
  return row ?? null;
});

export const getHomeVico = cache(async function getHomeVico() {
  const [row] = await db.select().from(homeVico).limit(1);
  return row ?? null;
});

export const getHomeSolutionsTechAbout = cache(
  async function getHomeSolutionsTechAbout() {
    const [row] = await db.select().from(homeSolutionsTechAbout).limit(1);
    return row ?? null;
  },
);

export const getHomeStats = cache(async function getHomeStats() {
  const [row] = await db.select().from(homeStats).limit(1);
  return row ?? null;
});

export const getHomeFinalCta = cache(async function getHomeFinalCta() {
  const [row] = await db.select().from(homeFinalCta).limit(1);
  return row ?? null;
});

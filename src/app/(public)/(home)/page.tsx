import { eq } from "drizzle-orm";

import { getDb } from "@/db";
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

import { FinalCta } from "./_components/FinalCta";
import { Hero } from "./_components/Hero";
import { News } from "./_components/News";
import { Partners } from "./_components/Partners";
import { PreOrder } from "./_components/PreOrder";
import { SolutionsTechAbout } from "./_components/SolutionsTechAbout";
import { Stats } from "./_components/Stats";
import { VicoProduct } from "./_components/VicoProduct";

export default async function HomePage() {
  const db = getDb();

  const [hero, vico, stab, partners, stats, news, finalCta, preorder] =
    await Promise.all([
      db
        .select()
        .from(homeHero)
        .limit(1)
        .then((r) => r[0] ?? null),
      db
        .select()
        .from(homeVico)
        .limit(1)
        .then((r) => r[0] ?? null),
      db
        .select()
        .from(homeSolutionsTechAbout)
        .limit(1)
        .then((r) => r[0] ?? null),
      db.select().from(homePartners).orderBy(homePartners.sortOrder),
      db
        .select()
        .from(homeStats)
        .limit(1)
        .then((r) => r[0] ?? null),
      db
        .select()
        .from(homeNews)
        .where(eq(homeNews.isPublished, true))
        .orderBy(homeNews.sortOrder),
      db
        .select()
        .from(homeFinalCta)
        .limit(1)
        .then((r) => r[0] ?? null),
      db
        .select()
        .from(homePreorder)
        .limit(1)
        .then((r) => r[0] ?? null),
    ]);

  return (
    <>
      <Hero data={hero} />
      <VicoProduct data={vico} />
      <SolutionsTechAbout data={stab} />
      <Partners items={partners} />
      <Stats data={stats} />
      <News items={news} />
      <PreOrder data={preorder} />
      <FinalCta data={finalCta} />
    </>
  );
}

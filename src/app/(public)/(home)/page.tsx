import type {
  homeFinalCta,
  homeHero,
  homeNews,
  homePartners,
  homePreorder,
  homeSolutionsTechAbout,
  homeStats,
  homeVico,
} from "@/db/schema";
import { createClient } from "@/lib/supabase/server";

import { FinalCta } from "./_components/FinalCta";
import { Hero } from "./_components/Hero";
import { News } from "./_components/News";
import { Partners } from "./_components/Partners";
import { PreOrder } from "./_components/PreOrder";
import { SolutionsTechAbout } from "./_components/SolutionsTechAbout";
import { Stats } from "./_components/Stats";
import { VicoProduct } from "./_components/VicoProduct";

type HeroData = typeof homeHero.$inferSelect;
type VicoData = typeof homeVico.$inferSelect;
type SolutionsTechAboutData = typeof homeSolutionsTechAbout.$inferSelect;
type PartnerItem = typeof homePartners.$inferSelect;
type StatsData = typeof homeStats.$inferSelect;
type NewsItem = typeof homeNews.$inferSelect;
type FinalCtaData = typeof homeFinalCta.$inferSelect;
type PreorderData = typeof homePreorder.$inferSelect;

export const revalidate = 60;

function camelize<T>(obj: unknown): T {
  if (Array.isArray(obj)) {
    return obj.map((v) => camelize(v)) as T;
  }
  if (obj !== null && typeof obj === "object" && obj.constructor === Object) {
    return Object.keys(obj as Record<string, unknown>).reduce(
      (result, key) => {
        const camelKey = key.replace(/_([a-z])/g, (_, letter: string) =>
          letter.toUpperCase(),
        );
        (result as Record<string, unknown>)[camelKey] = camelize(
          (obj as Record<string, unknown>)[key],
        );
        return result;
      },
      {} as Record<string, unknown>,
    ) as T;
  }
  return obj as T;
}

export default async function HomePage() {
  const supabase = await createClient();

  const [
    { data: rawHero },
    { data: rawVico },
    { data: rawStab },
    { data: rawPartners },
    { data: rawStats },
    { data: rawNews },
    { data: rawFinalCta },
    { data: rawPreorder },
  ] = await Promise.all([
    supabase.from("home_hero").select("*").limit(1).maybeSingle(),
    supabase.from("home_vico").select("*").limit(1).maybeSingle(),
    supabase
      .from("home_solutions_tech_about")
      .select("*")
      .limit(1)
      .maybeSingle(),
    supabase.from("home_partners").select("*").order("sort_order"),
    supabase.from("home_stats").select("*").limit(1).maybeSingle(),
    supabase
      .from("home_news")
      .select("*")
      .eq("is_published", true)
      .order("sort_order"),
    supabase.from("home_final_cta").select("*").limit(1).maybeSingle(),
    supabase.from("home_preorder").select("*").limit(1).maybeSingle(),
  ]);

  const hero = rawHero ? camelize<HeroData>(rawHero) : null;
  const vico = rawVico ? camelize<VicoData>(rawVico) : null;
  const stab = rawStab ? camelize<SolutionsTechAboutData>(rawStab) : null;
  const partners = rawPartners ? camelize<PartnerItem[]>(rawPartners) : [];
  const stats = rawStats ? camelize<StatsData>(rawStats) : null;
  const news = rawNews ? camelize<NewsItem[]>(rawNews) : [];
  const finalCta = rawFinalCta ? camelize<FinalCtaData>(rawFinalCta) : null;
  const preorder = rawPreorder ? camelize<PreorderData>(rawPreorder) : null;

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

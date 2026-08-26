import {
  getHomeFinalCta,
  getHomeHero,
  getHomeNews,
  getHomePartners,
  getHomeSolutionsTechAbout,
  getHomeStats,
  getHomeVico,
} from "@/actions/admin/home-content";

import { FinalCtaEditor } from "./_components/FinalCtaEditor";
import { HeroEditor } from "./_components/HeroEditor";
import { NewsEditor } from "./_components/NewsEditor";
import { PartnersEditor } from "./_components/PartnersEditor";
import { SolutionsTechAboutEditor } from "./_components/SolutionsTechAboutEditor";
import { StatsEditor } from "./_components/StatsEditor";
import { VicoProductEditor } from "./_components/VicoProductEditor";

export default async function AdminHomePage() {
  const [hero, vico, stab, partners, stats, news, finalCta] = await Promise.all(
    [
      getHomeHero(),
      getHomeVico(),
      getHomeSolutionsTechAbout(),
      getHomePartners(),
      getHomeStats(),
      getHomeNews(),
      getHomeFinalCta(),
    ],
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-text-primary text-xl font-bold">
          Quản trị trang chủ
        </h1>
        <p className="text-text-secondary mt-1 text-[13px]">
          Mỗi khối bên dưới có nút Lưu riêng — chỉnh xong khối nào lưu khối đó.
        </p>
      </div>

      <HeroEditor data={hero!} />
      <VicoProductEditor data={vico!} />
      <SolutionsTechAboutEditor data={stab!} />
      <PartnersEditor items={partners} />
      <StatsEditor data={stats!} />
      <NewsEditor items={news} />
      <FinalCtaEditor data={finalCta!} />
    </div>
  );
}

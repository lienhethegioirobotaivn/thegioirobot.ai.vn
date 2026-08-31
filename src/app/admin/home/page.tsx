import {
  getHomeFinalCta,
  getHomeHero,
  getHomeNews,
  getHomePartners,
  getHomePreorder,
  getHomeSolutionsTechAbout,
  getHomeStats,
  getHomeVico,
} from "@/actions/admin/home-content";

import { FinalCtaEditor } from "./_components/FinalCtaEditor";
import { HeroEditor } from "./_components/HeroEditor";
import { NewsEditor } from "./_components/NewsEditor";
import { PartnersEditor } from "./_components/PartnersEditor";
import { PreOrderEditor } from "./_components/PreOrderEditor";
import { SolutionsTechAboutEditor } from "./_components/SolutionsTechAboutEditor";
import { StatsEditor } from "./_components/StatsEditor";
import { VicoProductEditor } from "./_components/VicoProductEditor";

export default async function AdminHomePage() {
  const [hero, vico, stab, partners, stats, news, finalCta, preorder] =
    await Promise.all([
      getHomeHero(),
      getHomeVico(),
      getHomeSolutionsTechAbout(),
      getHomePartners(),
      getHomeStats(),
      getHomeNews(),
      getHomeFinalCta(),
      getHomePreorder(),
    ]);

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

      <div id="hero">
        <HeroEditor data={hero!} />
      </div>
      <div id="vico">
        <VicoProductEditor data={vico!} />
      </div>
      <div id="solutions-tech-about">
        <SolutionsTechAboutEditor data={stab!} />
      </div>
      <div id="partners">
        <PartnersEditor items={partners} />
      </div>
      <div id="stats">
        <StatsEditor data={stats!} />
      </div>
      <div id="news">
        <NewsEditor items={news} />
      </div>
      <div id="preorder">
        <PreOrderEditor item={preorder} />
      </div>
      <div id="final-cta">
        <FinalCtaEditor data={finalCta!} />
      </div>
    </div>
  );
}

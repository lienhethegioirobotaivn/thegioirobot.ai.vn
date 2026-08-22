import { Hero } from "./_components/Hero";
import { VicoProduct } from "./_components/VicoProduct";
import { SolutionsTechAbout } from "./_components/SolutionsTechAbout";
import { Partners } from "./_components/Partners";
import { Stats } from "./_components/Stats";
import { News } from "./_components/News";
import { FinalCta } from "./_components/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <VicoProduct />
      <SolutionsTechAbout />
      <Partners />
      <Stats />
      <News />
      <FinalCta />
    </>
  );
}

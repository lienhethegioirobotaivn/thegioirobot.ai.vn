import { FinalCta } from "./_components/FinalCta";
import { Hero } from "./_components/Hero";
import { News } from "./_components/News";
import { Partners } from "./_components/Partners";
import { SolutionsTechAbout } from "./_components/SolutionsTechAbout";
import { Stats } from "./_components/Stats";
import { VicoProduct } from "./_components/VicoProduct";

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

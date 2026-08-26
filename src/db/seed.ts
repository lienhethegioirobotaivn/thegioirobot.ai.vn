import "dotenv/config";

import { db } from "./index";
import {
  homeFinalCta,
  homeHero,
  homeSolutionsTechAbout,
  homeStats,
  homeVico,
  siteConfig,
} from "./schema";

async function seed() {
  await db.insert(siteConfig).values({});
  await db.insert(homeHero).values({
    eyebrow: "Empowering companions. Enriching lives.",
    titleLine1: "Chúng tôi tạo ra",
    titleGradient: "Trí tuệ đồng hành",
    titleLine2: "cho cuộc sống tốt đẹp hơn",
  });
  await db.insert(homeVico).values({});
  await db.insert(homeSolutionsTechAbout).values({});
  await db.insert(homeStats).values({});
  await db.insert(homeFinalCta).values({});
  console.log("Seed done");
  process.exit(0);
}
seed();

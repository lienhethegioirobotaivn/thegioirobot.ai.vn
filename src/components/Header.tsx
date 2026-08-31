import { getDb } from "@/db";
import { siteHeader } from "@/db/schema";

import { HeaderClient } from "./HeaderClient";

export async function Header() {
  const db = getDb();
  const [data] = await db.select().from(siteHeader).limit(1);
  if (!data) {
    return null;
  }

  return (
    <HeaderClient
      logoUrl={data.logoUrl}
      navLinks={data.navLinks}
      ctaLabel={data.ctaLabel}
      ctaHref={data.ctaHref}
    />
  );
}

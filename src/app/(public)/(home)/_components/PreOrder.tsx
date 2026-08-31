import { db } from "@/db";
import { homePreorder } from "@/db/schema";

import { PreOrderClient } from "./PreOrderClient";

export async function PreOrder() {
  const [data] = await db.select().from(homePreorder).limit(1);
  if (!data) {
    return null;
  }

  return <PreOrderClient data={data} />;
}

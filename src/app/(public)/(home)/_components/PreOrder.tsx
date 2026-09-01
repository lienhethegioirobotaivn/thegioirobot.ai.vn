import type { homePreorder } from "@/db/schema";

import { PreOrderClient } from "./PreOrderClient";

type PreorderData = typeof homePreorder.$inferSelect;

export function PreOrder({ data }: { data: PreorderData | null }) {
  if (!data) {
    return null;
  }

  return <PreOrderClient data={data} />;
}

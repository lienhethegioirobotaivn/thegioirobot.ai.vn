import { getHomePreorder } from "@/actions/admin/home-content";

import { PreOrderClient } from "./PreOrderClient";

export async function PreOrder() {
  const data = await getHomePreorder();
  if (!data) {
    return null;
  }

  return <PreOrderClient data={data} />;
}

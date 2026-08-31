import { getHomePreorder } from "@/actions/admin/home-content";

import { PreOrderClient } from "./PreOrderClient";

export async function PreOrder() {
  let data;
  try {
    data = await getHomePreorder();
  } catch (error) {
    console.error("Không thể tải dữ liệu Pre-order:", error);
    return null;
  }

  if (!data) {
    return null;
  }

  return <PreOrderClient data={data} />;
}

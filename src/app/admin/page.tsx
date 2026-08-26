import { getSiteConfig } from "@/actions/admin/site-config";

import { SiteConfigEditor } from "./_components/SiteConfigEditor";

export default async function AdminSeoPage() {
  const config = await getSiteConfig();

  if (!config) {
    return (
      <p className="text-text-secondary text-sm">
        Chưa có dữ liệu site_config, vui lòng seed trước.
      </p>
    );
  }

  return (
    <div>
      <h1 className="font-display text-text-primary text-xl font-bold">
        Cấu hình SEO & Metadata
      </h1>
      <p className="text-text-secondary mt-1 text-[13px]">
        Cấu hình này ảnh hưởng tới toàn bộ website: title tab, ảnh chia sẻ mạng
        xã hội, favicon...
      </p>
      <div className="mt-8">
        <SiteConfigEditor config={config} />
      </div>
    </div>
  );
}

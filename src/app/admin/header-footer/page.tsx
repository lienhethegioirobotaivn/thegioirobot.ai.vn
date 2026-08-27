import { getSiteFooter, getSiteHeader } from "@/actions/admin/site-layout";

import { FooterEditor } from "./_components/FooterEditor";
import { HeaderEditor } from "./_components/HeaderEditor";

export default async function AdminHeaderFooterPage() {
  const [header, footer] = await Promise.all([
    getSiteHeader(),
    getSiteFooter(),
  ]);

  if (!header || !footer) {
    return (
      <p className="text-text-secondary text-sm">
        Chưa có dữ liệu, vui lòng seed trước.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-text-primary text-xl font-bold">
          Header & Footer
        </h1>
        <p className="text-text-secondary mt-1 text-[13px]">
          Cấu hình menu điều hướng và chân trang, áp dụng cho toàn bộ website.
        </p>
      </div>

      <HeaderEditor data={header} />
      <FooterEditor data={footer} />
    </div>
  );
}

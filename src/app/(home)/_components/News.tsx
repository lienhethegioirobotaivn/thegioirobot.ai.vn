import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/Reveal";

/* News items — điền `image` thật khi có; hiện dùng placeholder theo đúng bảng màu thương hiệu. */
const newsItems = [
  {
    image: "https://placehold.co/400x300/0a0e1a/5ec8ff?text=Vico&font=raleway",
    date: "15.05.2024",
    title: "Vico chính thức ra mắt – Người bạn AI đầu tiên của mọi nhà",
  },
  {
    image:
      "https://placehold.co/400x300/0a0e1a/5ec8ff?text=Series+A&font=raleway",
    date: "02.05.2024",
    title: "Thegioirobot gọi vốn thành công vòng Series A từ quỹ VinVentures",
  },
  {
    image:
      "https://placehold.co/400x300/0a0e1a/5ec8ff?text=Giao+duc&font=raleway",
    date: "20.04.2024",
    title: "Robot AI trong giáo dục: Tương lai của việc học cá nhân hóa",
  },
  {
    image:
      "https://placehold.co/400x300/0a0e1a/5ec8ff?text=Kho+van&font=raleway",
    date: "10.04.2024",
    title: "Ứng dụng robot tự hành trong kho vận: Hiệu quả vượt trội",
  },
];

export function News() {
  return (
    <section id="tin-tuc" className="border-line-soft bg-surface border-t">
      <div className="mx-auto px-6 py-20 sm:px-8 lg:px-12 lg:py-24">
        <Reveal className="flex flex-col items-center justify-between gap-4 lg:flex-row">
          <div>
            <span className="border-accent/30 bg-accent/10 text-accent-2 inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xl font-bold tracking-wider uppercase sm:text-xl">
              Tin tức & cập nhật
            </span>
          </div>
          <Link
            href="#"
            className="group text-text-secondary hover:text-accent-2 flex shrink-0 items-center gap-1.5 text-sm font-semibold transition-colors"
          >
            Xem tất cả
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {newsItems.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 100}
              className="group border-line bg-void hover:border-accent/40 overflow-hidden rounded-2xl border transition-colors"
            >
              <div className="border-line-soft aspect-4/3 overflow-hidden border-b">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-5">
                <span className="text-text-secondary text-xs font-semibold">
                  {item.date}
                </span>
                <h3 className="text-text-primary mt-2 text-[14px] leading-snug font-semibold">
                  {item.title}
                </h3>
                <Link
                  href="#"
                  className="group/link text-accent-2 mt-3 inline-flex items-center gap-1.5 text-[12.5px] font-semibold"
                >
                  Tìm hiểu thêm
                  <ArrowRight className="h-3 w-3 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <Link
          href="#"
          className="text-text-secondary mt-8 flex items-center justify-center gap-1.5 text-[13px] font-semibold sm:hidden"
        >
          Xem tất cả
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}

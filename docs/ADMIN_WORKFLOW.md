# Quy trình xây dựng trang quản trị (Admin Panel)

Tài liệu này mô tả quy trình chuẩn để thêm 1 khu vực quản trị mới (ví dụ: quản trị 1 trang mới, 1 section mới) vào project **Thegioirobot**. Dùng làm checklist khi cần mở rộng admin panel trong tương lai.

---

## 1. Tổng quan kiến trúc

```
Người dùng cuối  →  Landing page (Server Components, đọc DB qua Drizzle)
Admin            →  /admin/*  (Server Actions ghi DB qua Drizzle + Supabase Storage)
```

Nguyên tắc cốt lõi:

| Việc | Công cụ |
|---|---|
| Đọc/ghi dữ liệu bảng (CRUD thuần) | **Drizzle ORM** (kết nối trực tiếp Postgres qua connection string) |
| Auth (đăng nhập/đăng xuất/kiểm tra session) | **Supabase Auth** (`@supabase/ssr`) |
| Lưu trữ ảnh | **Supabase Storage** (bucket `media`) |
| Hạ tầng (bucket, cron, Edge Function) | **Supabase CLI migration** (không thao tác tay trên Dashboard) |

---

## 2. Folder structure

```
src/
├── actions/
│   └── admin/
│       ├── site-config.ts       # Server Actions cho từng nhóm nội dung
│       ├── home-content.ts      # (1 file = 1 nhóm bảng liên quan, VD: toàn bộ trang chủ)
│       └── site-layout.ts       # (VD: header + footer)
│
├── app/
│   ├── (home)/                  # Route group cho landing page
│   │   ├── page.tsx
│   │   └── _components/         # Server Components đọc DB, render UI công khai
│   │       ├── Hero.tsx
│   │       └── ...
│   │
│   ├── login/
│   │   └── page.tsx
│   │
│   └── admin/
│       ├── layout.tsx           # Check auth (redirect nếu chưa login) + Sidebar
│       ├── page.tsx             # /admin — trang quản trị đầu tiên (SEO/metadata)
│       ├── _components/
│       │   └── SiteConfigEditor.tsx
│       ├── home/
│       │   ├── page.tsx         # Fetch toàn bộ data, render các editor
│       │   └── _components/
│       │       ├── HeroEditor.tsx
│       │       └── ...
│       └── header-footer/
│           ├── page.tsx
│           └── _components/
│               ├── HeaderEditor.tsx
│               └── FooterEditor.tsx
│
├── components/
│   ├── Header.tsx / Footer.tsx  # Server wrapper đọc DB (nếu component cần "use client")
│   ├── HeaderClient.tsx         # Phần Client Component thật sự (nhận props, không tự fetch)
│   └── admin/
│       ├── AdminSidebar.tsx
│       ├── SaveBar.tsx          # Nút Lưu dùng chung cho mọi editor
│       ├── FormField.tsx        # TextInput, TextArea, FormField wrapper
│       └── ImageUploadField.tsx # Upload ảnh lên Supabase Storage
│
├── db/
│   ├── index.ts                 # Khởi tạo Drizzle client
│   └── schema/
│       ├── index.ts             # Re-export toàn bộ schema
│       ├── site-config.ts       # 1 bảng = 1 file
│       ├── home-hero.ts
│       └── ...
│
├── lib/
│   ├── icon-map.ts               # Map tên string → Lucide icon component
│   ├── social-icon-map.ts        # Map tên string → react-icons component
│   └── supabase/
│       ├── client.ts             # Supabase client cho Client Component
│       ├── server.ts             # Supabase client cho Server Component/Action
│       ├── middleware.ts         # updateSession() dùng trong middleware
│       ├── require-admin.ts      # Helper check auth trong Server Action
│       └── cleanup-images.ts     # Helper dọn ảnh cũ khi update thành công
│
└── middleware.ts                 # Gọi updateSession(), redirect nếu chưa login

supabase/
├── migrations/                   # Mọi thay đổi hạ tầng (bucket, GRANT, cron, RLS bổ sung)
└── functions/
    └── cleanup-orphan-media/     # Edge Function dọn ảnh mồ côi định kỳ
```

**Quy tắc đặt tên:**
- Component React: `PascalCase.tsx`
- Hook/util/service: `kebab-case.ts`
- Hằng số: `UPPER_SNAKE_CASE`
- Boolean: tiền tố `is/has/can/should`

---

## 3. Quy trình thêm 1 khu vực quản trị mới — từng bước

Ví dụ minh hoạ: giả sử cần thêm quản trị cho 1 section mới tên `Testimonials` (đánh giá khách hàng).

### Bước 1 — Tạo schema (1 bảng = 1 file)

`src/db/schema/home-testimonials.ts`:

```typescript
import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, uuid, pgPolicy } from "drizzle-orm/pg-core";
import { authenticatedRole, anonRole, serviceRole } from "drizzle-orm/supabase";

export const homeTestimonials = pgTable(
  "home_testimonials",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    customerName: text("customer_name").notNull(),
    customerAvatarUrl: text("customer_avatar_url"),
    content: text("content").notNull().default(""),
    sortOrder: text("sort_order").notNull().default("0"),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    pgPolicy("public_can_read_testimonials", { for: "select", to: anonRole, using: sql`true` }),
    pgPolicy("authenticated_can_read_testimonials", { for: "select", to: authenticatedRole, using: sql`true` }),
    pgPolicy("authenticated_can_all_testimonials", {
      for: "all",
      to: authenticatedRole,
      using: sql`true`,
      withCheck: sql`true`,
    }),
    pgPolicy("service_role_full_access_testimonials", {
      for: "all",
      to: serviceRole,
      using: sql`true`,
      withCheck: sql`true`,
    }),
  ],
).enableRLS();
```

Checklist bắt buộc cho mọi schema mới:
- [ ] `.enableRLS()` ở cuối
- [ ] Policy `select` cho `anonRole` (nếu cần public đọc được)
- [ ] Policy `select` cho `authenticatedRole`
- [ ] Policy ghi (`update`/`all`) cho `authenticatedRole`
- [ ] Policy `all` tường minh cho `serviceRole` — **bắt buộc** nếu sau này có Edge Function cần đọc bảng này (bài học từ vụ `permission denied`)

Thêm export vào `src/db/schema/index.ts`:

```typescript
export * from "./home-testimonials";
```

### Bước 2 — Push schema + GRANT quyền

```bash
pnpm db:push
```

> `db:push` (Drizzle) tạo bảng nhưng **không tự cấp GRANT** cho `anon`/`authenticated`/`service_role`. Nếu đã chạy migration `alter default privileges` từ trước, bảng mới tự động thừa hưởng GRANT — không cần làm gì thêm. Nếu là project mới hoàn toàn, chạy 1 lần duy nhất:

```bash
pnpm supabase migration new grant_default_privileges
```

```sql
alter default privileges in schema public grant select on tables to anon, authenticated;
alter default privileges in schema public grant all on tables to service_role;
```

```bash
pnpm supabase db push
```

### Bước 3 — Viết Server Actions

`src/actions/admin/home-testimonials.ts`:

```typescript
"use server";

import { cache } from "react";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { homeTestimonials } from "@/db/schema";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { cleanupReplacedImages } from "@/lib/supabase/cleanup-images";

export const getHomeTestimonials = cache(async function getHomeTestimonials() {
  return db.select().from(homeTestimonials).orderBy(homeTestimonials.sortOrder);
});

export async function replaceHomeTestimonials(
  items: (typeof homeTestimonials.$inferInsert)[],
) {
  await requireAdmin();

  const before = await db.select().from(homeTestimonials);

  await db.transaction(async (tx) => {
    await tx.delete(homeTestimonials);
    if (items.length > 0) await tx.insert(homeTestimonials).values(items);
  });

  await cleanupReplacedImages(
    before.map((t) => t.customerAvatarUrl),
    items.map((t) => t.customerAvatarUrl),
  );

  revalidatePath("/", "layout");
  revalidatePath("/admin/home");
  return { success: true };
}
```

Quy tắc:
- **Bảng dạng danh sách** (nhiều dòng, admin có thể thêm/xoá): dùng pattern "xoá hết – chèn lại trong transaction" (`replaceXxx`)
- **Bảng dạng singleton** (1 dòng duy nhất, chỉ sửa field): dùng `updateXxx(id, values)` — fetch `before` trước khi update để so sánh ảnh cũ/mới
- Luôn gọi `requireAdmin()` đầu tiên trong mọi action ghi dữ liệu
- Luôn gọi `cleanupReplacedImages` sau khi update thành công nếu bảng có cột ảnh
- Luôn bọc getter bằng `cache()` từ `react` để dedupe query trong cùng 1 request
- Luôn `revalidatePath("/", "layout")` (không phải `"page"`) để đảm bảo Header/Footer cũng được làm mới

### Bước 4 — Viết Admin Editor (Client Component)

`src/app/admin/home/_components/TestimonialsEditor.tsx` — copy pattern từ `NewsEditor.tsx` hoặc `PartnersEditor.tsx` (đều là dạng danh sách):

- `useState` giữ toàn bộ list trong local state
- Nút "Thêm" tạo item mới với `crypto.randomUUID()`
- Nút xoá từng item lọc khỏi mảng
- `SaveBar` với `status: "idle" | "saving" | "saved" | "error"`
- Gọi đúng 1 Server Action khi bấm Lưu — **không** đụng tới bảng khác

### Bước 5 — Thêm vào trang admin

Trong `src/app/admin/home/page.tsx`:

```typescript
import { getHomeTestimonials } from "@/actions/admin/home-testimonials";
import { TestimonialsEditor } from "./_components/TestimonialsEditor";

// Trong component:
const testimonials = await getHomeTestimonials();
// ...
<TestimonialsEditor items={testimonials} />
```

### Bước 6 — Đưa lên landing page (Server Component)

`src/app/(home)/_components/Testimonials.tsx`:

```tsx
import { getHomeTestimonials } from "@/actions/admin/home-testimonials";

export async function Testimonials() {
  const items = await getHomeTestimonials();
  if (items.length === 0) return null;
  // render UI
}
```

Thêm vào `page.tsx`, bọc `<Suspense fallback={null}>` để tránh render waterfall (xem mục 6).

### Bước 7 — Cập nhật Edge Function cleanup ảnh mồ côi (nếu bảng có cột ảnh)

Trong `supabase/functions/cleanup-orphan-media/index.ts`, thêm vào mảng `TARGETS`:

```typescript
{ table: "home_testimonials", column: "customer_avatar_url" },
```

```bash
pnpm supabase functions deploy cleanup-orphan-media --no-verify-jwt
```

---

## 4. Checklist đầy đủ cho 1 tính năng admin mới

```
[ ] Schema mới trong src/db/schema/<ten-bang>.ts
    [ ] .enableRLS()
    [ ] Policy select cho anon + authenticated
    [ ] Policy ghi cho authenticated
    [ ] Policy all cho serviceRole
    [ ] Export vào src/db/schema/index.ts
[ ] pnpm db:push
[ ] Server Actions trong src/actions/admin/<ten-nhom>.ts
    [ ] Getter bọc cache()
    [ ] Action ghi gọi requireAdmin() đầu tiên
    [ ] Action ghi gọi cleanupReplacedImages() nếu có cột ảnh
    [ ] revalidatePath("/", "layout") sau khi ghi
[ ] Editor Component trong _components/, có SaveBar riêng
[ ] Gắn Editor vào page.tsx tương ứng trong /admin
[ ] Server Component đọc DB cho landing page, bọc Suspense
[ ] Thêm vào TARGETS của Edge Function cleanup-orphan-media (nếu có ảnh)
[ ] Deploy lại Edge Function nếu có sửa
[ ] Test: sửa trong admin → F5 landing page → thấy cập nhật
[ ] Test: xoá ảnh trong admin nhưng KHÔNG lưu → ảnh cũ vẫn còn nguyên
```

---

## 5. Quy ước quan trọng đã rút ra trong quá trình build

| Vấn đề | Bài học |
|---|---|
| `db:push` không tự cấp quyền cho role Supabase | Luôn có sẵn `alter default privileges` từ đầu project |
| API key mới `sb_secret_...` không tự bypass RLS như JWT `service_role` cũ | Dùng JWT `service_role` cũ (`LEGACY_SERVICE_ROLE_KEY`) cho các thao tác cần bypass RLS trong Edge Function |
| `DELETE` trực tiếp trên `storage.objects` bị chặn bởi `protect_delete` trigger | Luôn thao tác Storage qua Storage API (`supabase.storage.from(...).remove()`), không dùng SQL thuần |
| Ảnh mồ côi khi admin upload nhưng không lưu | Không xoá storage ngay khi bấm nút X trên UI — chỉ xoá khỏi state form. Xoá thật diễn ra ở server action sau khi lưu thành công, cộng thêm cron job dọn định kỳ (grace period 24h) làm lưới an toàn thứ 2 |
| Cleanup job lỗi đọc DB nhưng vẫn tiếp tục xoá | Luôn "fail-safe": nếu đọc bất kỳ bảng nào lỗi, dừng toàn bộ job, không xoá gì — tuyệt đối không coi lỗi = "không dùng" |
| `revalidatePath("/", "page")` không đủ để làm mới Header/Footer | Dùng `revalidatePath("/", "layout")` để invalidate luôn layout cha |
| `force-dynamic` toàn site gây nhiều query DB tuần tự → timeout 504 | Ưu tiên cache tĩnh + on-demand revalidation qua `revalidatePath`; nếu nhiều Server Component sibling cùng query DB, bọc từng cái bằng `<Suspense>` để render song song thay vì tuần tự |
| Supabase Free tier tự pause khi không hoạt động | Cân nhắc nâng Pro cho production, hoặc chấp nhận độ trễ cold-start lần đầu |
| Thao tác hạ tầng Supabase (bucket, cron, policy) qua Dashboard | Luôn dùng `supabase migration new` + `supabase db push` để version control, review được, và reproducible trên môi trường khác |

---

## 6. Tối ưu hiệu năng khi trang chủ có nhiều Server Component đọc DB

Vì mỗi section landing page (`Hero`, `VicoProduct`, `Stats`,...) là 1 Server Component tự `await db.select()`, nếu chúng là sibling thuần trong JSX, Next.js render tuần tự → cộng dồn latency. Luôn bọc mỗi section bằng `Suspense` để chúng render song song:

```tsx
export default function HomePage() {
  return (
    <>
      <Suspense fallback={null}><Hero /></Suspense>
      <Suspense fallback={null}><VicoProduct /></Suspense>
      {/* ... */}
    </>
  );
}
```

---

## 7. Lệnh thường dùng

```bash
# Schema
pnpm db:push                    # Push schema Drizzle lên Supabase (dev)
pnpm db:studio                  # Mở Drizzle Studio xem data trực quan

# Supabase CLI
pnpm supabase migration new <ten>   # Tạo migration mới cho hạ tầng
pnpm supabase db push               # Push migration lên remote
pnpm supabase db diff                # Kiểm tra local/remote đã khớp chưa
pnpm supabase functions deploy <ten> --no-verify-jwt   # Deploy Edge Function
pnpm supabase functions logs <ten>  # Xem log Edge Function
pnpm supabase secrets list          # Xem danh sách secret đã set
pnpm supabase secrets set KEY=value # Set secret cho Edge Function

# Seed data
pnpm tsx src/db/seed.ts         # Chạy script seed (nhớ có "dotenv/config" ở đầu file)
```

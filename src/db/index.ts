import { drizzle } from "drizzle-orm/postgres-js";
import { after } from "next/server";
import postgres from "postgres";
import { cache } from "react";

import { env } from "@/env";

import * as schema from "./schema";

const isProduction = process.env.NODE_ENV === "production";

/**
 * PRODUCTION (Vercel serverless): tạo 1 client MỚI cho mỗi request
 * (cache() dedupe trong cùng request), max:1 vì pooler Supabase đã lo
 * việc pooling, và chủ động đóng connection bằng after() ngay sau khi
 * response gửi xong — không dựa vào idle_timeout (JS timer không chạy
 * khi container serverless bị đóng băng sau response).
 */
function createProductionDb() {
  const client = postgres(env.DATABASE_URL, {
    prepare: false,
    max: 1,
    connect_timeout: 10,
  });

  try {
    after(() => {
      void client.end({ timeout: 5 });
    });
  } catch {
    // after() chỉ khả dụng trong request context. Bỏ qua nếu module
    // được dùng ngoài request (VD: script seed / drizzle-kit).
  }

  return drizzle({ client, schema });
}

/**
 * DEV: giữ 1 client sống xuyên suốt cả phiên `pnpm dev`, cache qua
 * globalThis để KHÔNG bị tạo mới mỗi lần Next.js hot-reload module
 * này — nếu không, mỗi lần sửa file sẽ rò rỉ 1 connection (đây chính
 * là nguyên nhân lỗi "statement timeout" khi chạy local).
 */
const globalForDb = globalThis as unknown as {
  devClient: postgres.Sql | undefined;
};

function getDevDb() {
  if (!globalForDb.devClient) {
    globalForDb.devClient = postgres(env.DATABASE_URL, {
      prepare: false,
      max: 10,
      idle_timeout: 20,
      connect_timeout: 10,
    });
  }
  return drizzle({ client: globalForDb.devClient, schema });
}

export const getDb: () => ReturnType<typeof createProductionDb> = isProduction
  ? cache(createProductionDb)
  : getDevDb;

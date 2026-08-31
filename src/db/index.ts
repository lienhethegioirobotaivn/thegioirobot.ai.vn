import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "@/env";

import * as schema from "./schema";

// Next.js dev server hot-reload chạy lại module này mỗi lần sửa file,
// nếu không cache client qua globalThis thì mỗi lần reload sẽ tạo 1
// client/connection MỚI mà connection cũ không được đóng -> rò rỉ
// connection rất nhanh khi dev (dù production không bị vì mỗi
// serverless invocation vốn đã là 1 process riêng, không HMR).
const globalForDb = globalThis as unknown as {
  postgresClient: postgres.Sql | undefined;
};

const client =
  globalForDb.postgresClient ??
  postgres(env.DATABASE_URL, {
    prepare: false,
    // Production kết nối qua Supabase Transaction Pooler (chỉ 15
    // connection thật phía Postgres) -> mỗi serverless instance chỉ
    // giữ 1 connection. Dev chạy 1 process duy nhất nên có thể thoải
    // mái hơn.
    max: process.env.NODE_ENV === "production" ? 1 : 10,
    idle_timeout: 20,
    connect_timeout: 10,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.postgresClient = client;
}

export const db = drizzle({ client, schema });

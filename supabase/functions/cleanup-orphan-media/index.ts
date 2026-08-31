import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

interface TargetConfig {
  table: string;
  column: string;
  /**
   * Nếu column là jsonb array (VD: version_options: [{ imageUrl, ... }]),
   * chỉ định tên field chứa URL trong mỗi phần tử của mảng.
   * Bỏ trống nếu column là 1 URL string đơn giản.
   */
  arrayField?: string;
}

const BUCKET = "media";
const GRACE_PERIOD_HOURS = 24;

const TARGETS: TargetConfig[] = [
  { table: "home_hero", column: "image_url" },
  { table: "home_vico", column: "image_url" },
  { table: "home_solutions_tech_about", column: "tech_image_url" },
  { table: "home_partners", column: "logo_url" },
  { table: "home_news", column: "image_url" },
  { table: "home_final_cta", column: "image_url" },
  { table: "home_preorder", column: "image_url" },
  { table: "home_preorder", column: "version_options", arrayField: "imageUrl" },
  { table: "site_config", column: "favicon_url" },
  { table: "site_config", column: "apple_touch_icon_url" },
  { table: "site_config", column: "og_image_url" },
  { table: "site_config", column: "twitter_image_url" },
  { table: "site_header", column: "logo_url" },
  { table: "site_footer", column: "logo_url" },
];

function extractStoragePath(url: string): string | null {
  const marker = `/object/public/${BUCKET}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) {
    return null;
  }
  return url.slice(idx + marker.length);
}

function collectUrlsFromRow(
  row: Record<string, unknown>,
  target: TargetConfig,
): string[] {
  const value = row[target.column];

  if (target.arrayField) {
    if (!Array.isArray(value)) {
      return [];
    }
    return value
      .map((item) => (item as Record<string, unknown>)?.[target.arrayField!])
      .filter(
        (url): url is string => typeof url === "string" && url.length > 0,
      );
  }

  return typeof value === "string" && value.length > 0 ? [value] : [];
}

Deno.serve(async (req) => {
  const legacyKey = Deno.env.get("LEGACY_SERVICE_ROLE_KEY")!;

  const authHeader = req.headers.get("Authorization") ?? "";
  const expected = `Bearer ${legacyKey}`;
  if (authHeader !== expected) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabase = createClient(supabaseUrl, legacyKey);

    const referencedPaths = new Set<string>();

    for (const target of TARGETS) {
      const { data, error } = await supabase
        .from(target.table)
        .select(target.column);

      if (error) {
        console.error(
          `Failed to read ${target.table}.${target.column}:`,
          error.message,
        );
        return new Response(
          JSON.stringify({
            success: false,
            error: `Aborted: could not read ${target.table}.${target.column} — ${error.message}`,
          }),
          { status: 500 },
        );
      }

      for (const row of data ?? []) {
        const urls = collectUrlsFromRow(row as Record<string, unknown>, target);
        for (const url of urls) {
          const path = extractStoragePath(url);
          if (path) {
            referencedPaths.add(path);
          }
        }
      }
    }

    const { data: files, error: listError } = await supabase.storage
      .from(BUCKET)
      .list("", { limit: 1000 });

    if (listError) {
      return new Response(
        JSON.stringify({ success: false, error: listError.message }),
        {
          status: 500,
        },
      );
    }

    if (!files || files.length === 0) {
      return new Response(JSON.stringify({ success: true, deleted: [] }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    const cutoff = Date.now() - GRACE_PERIOD_HOURS * 60 * 60 * 1000;

    const orphanFiles = files
      .filter((file) => file.name !== ".emptyFolderPlaceholder")
      .filter((file) => !referencedPaths.has(file.name))
      .filter((file) => {
        const createdAt = file.created_at
          ? new Date(file.created_at).getTime()
          : 0;
        return createdAt < cutoff;
      })
      .map((file) => file.name);

    let deleteError: unknown = null;
    if (orphanFiles.length > 0) {
      const { error } = await supabase.storage.from(BUCKET).remove(orphanFiles);
      deleteError = error;
    }

    return new Response(
      JSON.stringify({
        success: !deleteError,
        deleted: orphanFiles,
        referencedCount: referencedPaths.size,
        totalFiles: files.length,
        error: deleteError,
      }),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500 },
    );
  }
});

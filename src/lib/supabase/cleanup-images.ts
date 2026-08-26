import "server-only";

import { createClient } from "@/lib/supabase/server";

function extractStoragePath(publicUrl: string): string | null {
  const marker = "/object/public/media/";
  const idx = publicUrl.indexOf(marker);
  if (idx === -1) {
    return null;
  }
  return publicUrl.slice(idx + marker.length);
}

/**
 * So sánh các URL ảnh cũ (trước khi update) với URL ảnh mới (sau khi update).
 * URL nào bị bỏ đi hoặc bị thay thế sẽ bị xoá khỏi bucket "media".
 * Gọi hàm này SAU KHI update DB thành công, không gọi trước.
 */
export async function cleanupReplacedImages(
  oldUrls: (string | null | undefined)[],
  newUrls: (string | null | undefined)[],
) {
  const newSet = new Set(newUrls.filter((u): u is string => !!u));

  const pathsToDelete = oldUrls
    .filter((u): u is string => !!u && !newSet.has(u))
    .map(extractStoragePath)
    .filter((p): p is string => !!p);

  if (pathsToDelete.length === 0) {
    return;
  }

  const supabase = await createClient();
  await supabase.storage.from("media").remove(pathsToDelete);
}

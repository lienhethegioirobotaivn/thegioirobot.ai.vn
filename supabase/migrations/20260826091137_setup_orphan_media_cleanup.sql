-- Bật extension pg_cron (Supabase đã cài sẵn, chỉ cần enable trong schema riêng)
create extension if not exists pg_cron with schema extensions;

-- Bật extension pg_net để cron job có thể gọi (không bắt buộc ở đây vì ta xử lý thuần SQL, nhưng giữ lại phòng khi cần gọi Edge Function sau này)
-- create extension if not exists pg_net with schema extensions;

-- Hàm dọn ảnh mồ côi trong bucket "media":
-- Một file được coi là mồ côi nếu KHÔNG được tham chiếu bởi bất kỳ cột image_url/logo_url nào
-- trong các bảng nội dung, VÀ đã tồn tại quá 24 giờ (grace period để tránh xoá nhầm ảnh
-- admin vừa upload nhưng chưa kịp bấm Lưu).
create or replace function public.cleanup_orphan_media()
returns void
language plpgsql
security definer
set search_path = public, storage
as $$
declare
  deleted_count int;
begin
  with referenced_urls as (
    select image_url as url from home_hero where image_url is not null
    union all
    select image_url from home_vico where image_url is not null
    union all
    select tech_image_url from home_solutions_tech_about where tech_image_url is not null
    union all
    select logo_url from home_partners where logo_url is not null
    union all
    select image_url from home_news where image_url is not null
    union all
    select image_url from home_final_cta where image_url is not null
    union all
    select favicon_url from site_config where favicon_url is not null
    union all
    select apple_touch_icon_url from site_config where apple_touch_icon_url is not null
    union all
    select og_image_url from site_config where og_image_url is not null
    union all
    select twitter_image_url from site_config where twitter_image_url is not null
  ),
  referenced_paths as (
    -- Trích phần path sau "/object/public/media/" từ full public URL
    select regexp_replace(url, '^.*\/object\/public\/media\/', '') as path
    from referenced_urls
  ),
  orphan_objects as (
    select o.name
    from storage.objects o
    where o.bucket_id = 'media'
      and o.created_at < now() - interval '24 hours'
      and o.name not in (select path from referenced_paths)
  )
  delete from storage.objects
  where bucket_id = 'media'
    and name in (select name from orphan_objects);

  get diagnostics deleted_count = row_count;
  raise notice 'cleanup_orphan_media: deleted % orphan file(s)', deleted_count;
end;
$$;

-- Chỉ cho phép role có quyền admin database gọi hàm này (service_role, postgres)
revoke all on function public.cleanup_orphan_media() from public, anon, authenticated;

-- Lên lịch chạy mỗi ngày lúc 03:00 sáng (giờ UTC, tức 10:00 sáng giờ Việt Nam)
select cron.schedule(
  'cleanup-orphan-media-daily',
  '0 3 * * *',
  $$select public.cleanup_orphan_media();$$
);
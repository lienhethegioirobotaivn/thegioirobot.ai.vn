select cron.unschedule('cleanup-orphan-media-daily');
drop function if exists public.cleanup_orphan_media();
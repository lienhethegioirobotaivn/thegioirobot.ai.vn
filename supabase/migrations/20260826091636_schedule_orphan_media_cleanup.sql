create extension if not exists pg_cron with schema extensions;
create extension if not exists pg_net with schema extensions;

-- Lưu service role key vào Vault để cron job dùng gọi Edge Function
-- (không hardcode key trực tiếp trong migration để tránh lộ trong git history)
select vault.create_secret(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsY3dlb3Rjb29yc3BreHlhdHdkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NzU1OTY0MCwiZXhwIjoyMTAzMTM1NjQwfQ.NhsH_bu1h34rag8zk8IaqvHVIoKUt2mQfTjEcCzp2iI',
  'service_role_key',
  'Service role key dùng để gọi Edge Function cleanup-orphan-media'
);

select cron.schedule(
  'cleanup-orphan-media-daily',
  '0 3 * * *', -- 03:00 UTC = 10:00 sáng giờ Việt Nam
  $$
  select net.http_post(
    url := 'https://tlcweotcoorspkxyatwd.supabase.co/functions/v1/cleanup-orphan-media',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || (select decrypted_secret from vault.decrypted_secrets where name = 'service_role_key')
    ),
    body := '{}'::jsonb
  );
  $$
);
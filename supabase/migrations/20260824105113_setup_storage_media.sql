-- Tạo bucket "media" (public, dùng cho ảnh hero, vico, news, partners...)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media',
  'media',
  true,
  5242880, -- 5MB
  array['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']
)
on conflict (id) do nothing;

-- Policy: ai cũng đọc được ảnh (để hiển thị trên landing page công khai)
create policy "public_read_media"
on storage.objects
for select
to public
using (bucket_id = 'media');

-- Policy: chỉ user đã đăng nhập (admin) mới upload được
create policy "authenticated_insert_media"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'media');

-- Policy: chỉ user đã đăng nhập mới update được (đổi ảnh)
create policy "authenticated_update_media"
on storage.objects
for update
to authenticated
using (bucket_id = 'media')
with check (bucket_id = 'media');

-- Policy: chỉ user đã đăng nhập mới xoá được
create policy "authenticated_delete_media"
on storage.objects
for delete
to authenticated
using (bucket_id = 'media');
-- Cấp quyền SELECT cho anon và authenticated (đọc công khai/đã đăng nhập)
-- Cấp toàn quyền cho service_role (bypass mọi thao tác, dùng cho admin/backend)

grant select on table home_hero to anon, authenticated;
grant all on table home_hero to service_role;

grant select on table home_vico to anon, authenticated;
grant all on table home_vico to service_role;

grant select on table home_solutions_tech_about to anon, authenticated;
grant all on table home_solutions_tech_about to service_role;

grant select on table home_partners to anon, authenticated;
grant all on table home_partners to service_role;

grant select on table home_news to anon, authenticated;
grant all on table home_news to service_role;

grant select on table home_final_cta to anon, authenticated;
grant all on table home_final_cta to service_role;

grant select on table site_config to anon, authenticated;
grant all on table site_config to service_role;

-- Đảm bảo mọi bảng tạo MỚI trong tương lai (qua Drizzle db:push) cũng tự động
-- được cấp quyền này mà không cần nhớ thêm GRANT thủ công mỗi lần
alter default privileges in schema public
  grant select on tables to anon, authenticated;

alter default privileges in schema public
  grant all on tables to service_role;
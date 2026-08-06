# Supabase database

Apply `migrations/20260806180000_create_portfolios.sql` in the Supabase SQL Editor, or run it with the Supabase CLI after linking this project.

The `portfolios` table contains:

- `title`: portfolio title
- `content`: portfolio description/content
- `tags`: list of tags, such as `{website,ecommerce}`
- `company`: client or company name
- `image_urls`: ordered list of image URLs
- `video_url`: optional public video URL

Portfolio records are publicly readable. Insert, update, and delete operations require an authenticated user with `app_metadata.role` set to `admin`.

To grant an existing user admin access, run this in the SQL Editor, replacing the email address:

```sql
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
where email = 'admin@your-domain.com';
```

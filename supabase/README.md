# Supabase database

Apply every SQL file in `migrations/` in chronological order in the Supabase SQL Editor, or run them with the Supabase CLI after linking this project.

The `portfolios` table contains:

- `title`: portfolio title
- `content`: portfolio description/content
- `tags`: list of tags, such as `{website,ecommerce}`
- `company`: client or company name
- `image_urls`: ordered list of image URLs
- `video_url`: optional public video URL

Portfolio records are publicly readable. Insert, update, and delete operations require an authenticated user.

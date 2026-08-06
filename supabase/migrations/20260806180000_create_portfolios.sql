create table public.portfolios (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  tags text[] not null default '{}',
  company text not null,
  image_urls text[] not null default '{}',
  video_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.portfolios is 'Portfolio projects displayed on the Kawantara website.';
comment on column public.portfolios.image_urls is 'Ordered list of public image URLs for this portfolio project.';
comment on column public.portfolios.video_url is 'Optional public video URL, for example YouTube, Vimeo, or a Supabase Storage URL.';

create index portfolios_tags_idx on public.portfolios using gin (tags);
create index portfolios_created_at_idx on public.portfolios (created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger portfolios_set_updated_at
before update on public.portfolios
for each row
execute function public.set_updated_at();

alter table public.portfolios enable row level security;

create policy "Anyone can view portfolios"
on public.portfolios
for select
to anon, authenticated
using (true);

create policy "Admins can create portfolios"
on public.portfolios
for insert
to authenticated
with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Admins can update portfolios"
on public.portfolios
for update
to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Admins can delete portfolios"
on public.portfolios
for delete
to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

grant select on public.portfolios to anon, authenticated;
grant insert, update, delete on public.portfolios to authenticated;

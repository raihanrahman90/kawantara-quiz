drop policy if exists "Admins can create portfolios" on public.portfolios;
drop policy if exists "Admins can update portfolios" on public.portfolios;
drop policy if exists "Admins can delete portfolios" on public.portfolios;
drop policy if exists "Authenticated users can create portfolios" on public.portfolios;
drop policy if exists "Authenticated users can update portfolios" on public.portfolios;
drop policy if exists "Authenticated users can delete portfolios" on public.portfolios;

create policy "Authenticated users can create portfolios"
on public.portfolios
for insert
to authenticated
with check (true);

create policy "Authenticated users can update portfolios"
on public.portfolios
for update
to authenticated
using (true)
with check (true);

create policy "Authenticated users can delete portfolios"
on public.portfolios
for delete
to authenticated
using (true);

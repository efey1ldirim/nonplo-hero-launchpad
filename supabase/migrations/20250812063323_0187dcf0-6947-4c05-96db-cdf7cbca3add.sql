-- Create table to store a single global settings object
create table if not exists public.global_employee_settings (
  id uuid primary key default gen_random_uuid(),
  singleton boolean not null default true unique,
  settings jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Ensure RLS is enabled
alter table public.global_employee_settings enable row level security;

-- Policies: allow only authenticated users full access
create policy if not exists "Authenticated can read global settings"
  on public.global_employee_settings
  for select
  to authenticated
  using (true);

create policy if not exists "Authenticated can insert global settings"
  on public.global_employee_settings
  for insert
  to authenticated
  with check (true);

create policy if not exists "Authenticated can update global settings"
  on public.global_employee_settings
  for update
  to authenticated
  using (true);

create policy if not exists "Authenticated can delete global settings"
  on public.global_employee_settings
  for delete
  to authenticated
  using (true);

-- Trigger to keep updated_at fresh
create trigger if not exists update_global_employee_settings_updated_at
before update on public.global_employee_settings
for each row execute function public.update_updated_at_column();

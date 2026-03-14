create table public.extractions (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  normalized_url text not null,
  user_id uuid references auth.users(id) on delete set null,
  source text not null check (source in ('session', 'api_key', 'anonymous')),
  success boolean not null,
  result jsonb,
  error text,
  created_at timestamptz not null default now()
);

-- Cache lookup: find fresh result for a normalized URL
create index idx_extractions_cache on public.extractions (normalized_url, created_at desc) where success = true;

-- User history: list extractions by user
create index idx_extractions_user on public.extractions (user_id, created_at desc) where user_id is not null;

-- Analytics: query by time range
create index idx_extractions_created on public.extractions (created_at desc);

alter table public.extractions enable row level security;

-- Users can view their own extractions
create policy "Users can view own extractions"
  on public.extractions for select
  using (auth.uid() = user_id);

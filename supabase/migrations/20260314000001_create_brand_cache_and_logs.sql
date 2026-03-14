-- Drop the old single-table design (no production data to preserve)
drop policy if exists "Users can view own extractions" on public.extractions;
drop table if exists public.extractions;

-- Cache table: one row per scrape, append model for history
create table public.brand_cache (
  id uuid primary key default gen_random_uuid(),
  normalized_url text not null,
  result jsonb not null,
  created_at timestamptz not null default now()
);

create index idx_brand_cache_lookup on public.brand_cache (normalized_url, created_at desc);

alter table public.brand_cache enable row level security;

-- Log table: one lightweight row per API request
create table public.extraction_logs (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  normalized_url text not null,
  user_id uuid references auth.users(id) on delete set null,
  source text not null check (source in ('session', 'api_key', 'anonymous')),
  cache_hit boolean not null,
  success boolean not null,
  error text,
  brand_cache_id uuid references public.brand_cache(id) on delete set null,
  created_at timestamptz not null default now()
);

create index idx_extraction_logs_user on public.extraction_logs (user_id, created_at desc) where user_id is not null;
create index idx_extraction_logs_created on public.extraction_logs (created_at desc);
create index idx_extraction_logs_cache on public.extraction_logs (brand_cache_id) where brand_cache_id is not null;

alter table public.extraction_logs enable row level security;

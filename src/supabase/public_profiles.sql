-- Run this in your Supabase SQL editor (Dashboard → SQL Editor → New query)

create table if not exists public_profiles (
  slug            text        primary key,
  user_id         uuid        not null references auth.users(id) on delete cascade,
  display_name    text,
  generated_at    timestamptz not null default now(),
  total_topics    int         not null default 0,
  completed_topics int        not null default 0,
  completion_pct  int         not null default 0,
  level_stats     jsonb       not null default '{}',
  -- Array of { levelId, catId, catName, topicTitle, note? }
  completed_list  jsonb       not null default '[]',
  notes_count     int         not null default 0
);

-- One profile row per user — subsequent "Generate" calls update the same row
create unique index if not exists public_profiles_user_id_idx on public_profiles (user_id);

-- Anyone can read public profiles (no auth required — this is intentional)
alter table public_profiles enable row level security;

create policy "Public read" on public_profiles
  for select using (true);

create policy "Owner upsert" on public_profiles
  for insert with check (auth.uid() = user_id);

create policy "Owner update" on public_profiles
  for update using (auth.uid() = user_id);

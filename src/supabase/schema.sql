-- Run this once in your Supabase project → SQL Editor → New query

create table if not exists user_progress (
  user_id       uuid primary key references auth.users(id) on delete cascade,
  checked       jsonb   default '{}',
  notes         jsonb   default '{}',
  bookmarks     jsonb   default '{}',
  planner_tasks jsonb   default '[]',
  dark          boolean default false,
  updated_at    timestamptz default now()
);

-- Row Level Security: users can only access their own row
alter table user_progress enable row level security;

create policy "Users can manage own progress"
  on user_progress for all
  using  (auth.uid() = user_id)
  with check (auth.uid() = user_id);

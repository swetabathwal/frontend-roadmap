-- =============================================================================
-- Interview Intelligence — Database Migration
-- Run this in: Supabase Dashboard > SQL Editor
-- =============================================================================

-- ─── Tables ──────────────────────────────────────────────────────────────────

create table if not exists public.interview_experiences (
  id           uuid        primary key default gen_random_uuid(),
  user_id      uuid        not null references auth.users(id) on delete cascade,
  company_name text        not null,
  raw_text     text        not null,
  created_at   timestamptz not null default now()
);

create table if not exists public.interview_questions (
  id                   uuid        primary key default gen_random_uuid(),
  experience_id        uuid        not null references public.interview_experiences(id) on delete cascade,
  question_text        text        not null,
  category             text        not null,
  ai_generated_answer  text        not null,
  user_edited_answer   text,
  status               text        not null default 'unreviewed'
                         check (status in ('reviewed', 'unreviewed')),
  created_at           timestamptz not null default now()
);

-- ─── Indexes ─────────────────────────────────────────────────────────────────

create index if not exists interview_experiences_user_id_idx
  on public.interview_experiences (user_id);

create index if not exists interview_questions_experience_id_idx
  on public.interview_questions (experience_id);

-- ─── Row Level Security ───────────────────────────────────────────────────────

alter table public.interview_experiences enable row level security;
alter table public.interview_questions   enable row level security;

-- interview_experiences: users can only touch their own rows
create policy "Users can select their own experiences"
  on public.interview_experiences for select
  using (auth.uid() = user_id);

create policy "Users can insert their own experiences"
  on public.interview_experiences for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own experiences"
  on public.interview_experiences for update
  using (auth.uid() = user_id);

create policy "Users can delete their own experiences"
  on public.interview_experiences for delete
  using (auth.uid() = user_id);

-- interview_questions: access is gated through experience ownership
create policy "Users can select questions for their experiences"
  on public.interview_questions for select
  using (
    exists (
      select 1 from public.interview_experiences e
      where e.id = experience_id
        and e.user_id = auth.uid()
    )
  );

create policy "Users can insert questions for their experiences"
  on public.interview_questions for insert
  with check (
    exists (
      select 1 from public.interview_experiences e
      where e.id = experience_id
        and e.user_id = auth.uid()
    )
  );

create policy "Users can update questions for their experiences"
  on public.interview_questions for update
  using (
    exists (
      select 1 from public.interview_experiences e
      where e.id = experience_id
        and e.user_id = auth.uid()
    )
  );

create policy "Users can delete questions for their experiences"
  on public.interview_questions for delete
  using (
    exists (
      select 1 from public.interview_experiences e
      where e.id = experience_id
        and e.user_id = auth.uid()
    )
  );

-- Supabase schema for the online instructor platform (Phase 3, step 1).
-- Run this in the Supabase SQL editor.

-- ---------- Courses / classes ----------
create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  short_description text default '',
  full_description text default '',
  level text default 'All levels',
  duration text default '',
  format text default 'Live online',
  schedule text default '',
  price text default '',
  thumbnail_label text default '',
  published boolean default true,
  created_at timestamptz default now()
);

-- ---------- Videos ----------
create table if not exists videos (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text default '',
  category text default 'Lesson',
  date text default '',
  duration text default '',
  embed_url text default '',
  published boolean default true,
  created_at timestamptz default now()
);

-- ---------- Schedules ----------
create table if not exists schedules (
  id uuid primary key default gen_random_uuid(),
  day text not null,
  date text default '',
  time text default '',
  class_title text not null,
  platform text default '',
  note text default '',
  published boolean default true,
  created_at timestamptz default now()
);

-- ---------- Contact messages ----------
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text default '',
  interest text default '',
  message text not null,
  read boolean default false,
  created_at timestamptz default now()
);

-- ---------- Testimonials (for later; only show real ones) ----------
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  author text not null,
  text text not null,
  published boolean default false,
  created_at timestamptz default now()
);

-- ---------- Row Level Security ----------
alter table courses enable row level security;
alter table videos enable row level security;
alter table schedules enable row level security;
alter table contact_messages enable row level security;
alter table testimonials enable row level security;

-- Public read for published content
drop policy if exists "public read courses" on courses;
create policy "public read courses" on courses for select using (published = true);

drop policy if exists "public read videos" on videos;
create policy "public read videos" on videos for select using (published = true);

drop policy if exists "public read schedules" on schedules;
create policy "public read schedules" on schedules for select using (published = true);

drop policy if exists "public read testimonials" on testimonials;
create policy "public read testimonials" on testimonials for select using (published = true);

-- Anyone can submit a contact message; only admins read them
drop policy if exists "anyone can insert contact" on contact_messages;
create policy "anyone can insert contact" on contact_messages for insert with check (true);

-- Authenticated (admin) users manage everything
drop policy if exists "admin manage courses" on courses;
create policy "admin manage courses" on courses for all to authenticated using (true) with check (true);

drop policy if exists "admin manage videos" on videos;
create policy "admin manage videos" on videos for all to authenticated using (true) with check (true);

drop policy if exists "admin manage schedules" on schedules;
create policy "admin manage schedules" on schedules for all to authenticated using (true) with check (true);

drop policy if exists "admin manage contact" on contact_messages;
create policy "admin manage contact" on contact_messages for all to authenticated using (true) with check (true);

drop policy if exists "admin manage testimonials" on testimonials;
create policy "admin manage testimonials" on testimonials for all to authenticated using (true) with check (true);

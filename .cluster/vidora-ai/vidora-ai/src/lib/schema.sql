-- ===========================================================================
-- Vidora AI — Supabase Schema
-- Run this in the Supabase SQL Editor to set up all tables and policies.
-- ===========================================================================

-- Extensions
create extension if not exists "uuid-ossp";

-- ===========================================================================
-- Users (profile table — mirrors auth.users)
-- ===========================================================================
create table if not exists public.users (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text not null unique,
  name        text,
  role        text not null default 'user',
  plan        text not null default 'free',
  created_at  timestamptz not null default now()
);

-- ===========================================================================
-- Projects
-- ===========================================================================
create table if not exists public.projects (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references public.users(id) on delete cascade,
  title       text not null,
  status      text not null default 'draft',
  duration    integer default 0,
  voice_id    text,
  script      text,
  thumbnail   text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ===========================================================================
-- Voices
-- ===========================================================================
create table if not exists public.voices (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  gender      text,
  language    text,
  region      text,
  description text
);

-- ===========================================================================
-- Pages (CMS)
-- ===========================================================================
create table if not exists public.pages (
  id          uuid primary key default uuid_generate_v4(),
  slug        text not null unique,
  title       text not null,
  content     text,
  status      text not null default 'draft',
  author_id   uuid references public.users(id) on delete set null,
  created_at  timestamptz not null default now()
);

-- ===========================================================================
-- Posts (Blog)
-- ===========================================================================
create table if not exists public.posts (
  id          uuid primary key default uuid_generate_v4(),
  title       text not null,
  slug        text not null unique,
  content     text,
  excerpt     text,
  category    text,
  tags        text[] default '{}',
  status      text not null default 'draft',
  view_count  integer not null default 0,
  created_at  timestamptz not null default now()
);

-- ===========================================================================
-- Settings (site-wide configuration)
-- ===========================================================================
create table if not exists public.settings (
  id               uuid primary key default uuid_generate_v4(),
  site_name        text not null default 'Vidora AI',
  site_description text,
  hero_headline    text,
  primary_color    text default '#8B5CF6',
  secondary_color  text default '#06B6D4'
);

-- ===========================================================================
-- Row Level Security
-- ===========================================================================
alter table public.users    enable row level security;
alter table public.projects enable row level security;
alter table public.voices   enable row level security;
alter table public.pages    enable row level security;
alter table public.posts    enable row level security;
alter table public.settings enable row level security;

-- ---------------------------------------------------------------------------
-- Users policies
-- ---------------------------------------------------------------------------
create policy "Users can view their own profile"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.users for update
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.users for insert
  with check (auth.uid() = id);

-- ---------------------------------------------------------------------------
-- Projects policies
-- ---------------------------------------------------------------------------
create policy "Users can view their own projects"
  on public.projects for select
  using (auth.uid() = user_id);

create policy "Users can create their own projects"
  on public.projects for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own projects"
  on public.projects for update
  using (auth.uid() = user_id);

create policy "Users can delete their own projects"
  on public.projects for delete
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Voices policies (public read)
-- ---------------------------------------------------------------------------
create policy "Anyone can read voices"
  on public.voices for select
  using (true);

-- ---------------------------------------------------------------------------
-- Pages policies (public read published, author manage)
-- ---------------------------------------------------------------------------
create policy "Anyone can read published pages"
  on public.pages for select
  using (status = 'published' or auth.uid() = author_id);

create policy "Authenticated users can create pages"
  on public.pages for insert
  with check (auth.uid() = author_id);

create policy "Authors can update pages"
  on public.pages for update
  using (auth.uid() = author_id);

create policy "Authors can delete pages"
  on public.pages for delete
  using (auth.uid() = author_id);

-- ---------------------------------------------------------------------------
-- Posts policies (public read published, author manage)
-- ---------------------------------------------------------------------------
create policy "Anyone can read published posts"
  on public.posts for select
  using (status = 'published');

create policy "Authenticated users can create posts"
  on public.posts for insert
  with check (auth.role() = 'authenticated');

create policy "Authenticated users can update posts"
  on public.posts for update
  using (auth.role() = 'authenticated');

create policy "Authenticated users can delete posts"
  on public.posts for delete
  using (auth.role() = 'authenticated');

-- ---------------------------------------------------------------------------
-- Settings policies (public read, admin update)
-- ---------------------------------------------------------------------------
create policy "Anyone can read settings"
  on public.settings for select
  using (true);

create policy "Authenticated users can update settings"
  on public.settings for update
  using (auth.role() = 'authenticated');

create policy "Authenticated users can insert settings"
  on public.settings for insert
  with check (auth.role() = 'authenticated');

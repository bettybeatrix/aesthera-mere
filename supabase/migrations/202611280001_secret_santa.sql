-- Aesthera Mère Secret Santa 2026
-- All access is performed server-side with the Supabase service-role key.
-- RLS is enabled and client roles are explicitly denied access.

create extension if not exists pgcrypto;

create table if not exists public.ss_participants (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  access_code_hash text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.ss_wishlists (
  participant_id uuid primary key references public.ss_participants(id) on delete cascade,
  gift_ideas text[] not null default '{}',
  preferred_colors text not null default '',
  preferred_style text not null default '',
  avoid text not null default '',
  notes text not null default '',
  updated_at timestamptz not null default now(),
  constraint ss_wishlist_gift_ideas_limit check (cardinality(gift_ideas) <= 5)
);

create table if not exists public.ss_assignments (
  giver_id uuid primary key references public.ss_participants(id) on delete cascade,
  recipient_id uuid not null unique references public.ss_participants(id) on delete cascade,
  created_at timestamptz not null default now(),
  constraint ss_no_self_assignment check (giver_id <> recipient_id)
);

create table if not exists public.ss_sessions (
  token_hash text primary key,
  participant_id uuid not null references public.ss_participants(id) on delete cascade,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create index if not exists ss_sessions_expires_at_idx on public.ss_sessions(expires_at);

alter table public.ss_participants enable row level security;
alter table public.ss_wishlists enable row level security;
alter table public.ss_assignments enable row level security;
alter table public.ss_sessions enable row level security;

revoke all on public.ss_participants, public.ss_wishlists, public.ss_assignments, public.ss_sessions from anon, authenticated;
grant all on public.ss_participants, public.ss_wishlists, public.ss_assignments, public.ss_sessions to service_role;

-- Draw is atomic: it refuses incomplete wishlists and refuses to overwrite an existing draw.
create or replace function public.draw_secret_santa()
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  participant_ids uuid[];
  recipient_ids uuid[];
  participant_total integer;
  wishlist_total integer;
  attempt integer := 0;
begin
  perform pg_advisory_xact_lock(hashtext('aesthera-secret-santa-2026'));

  select count(*) into participant_total from public.ss_participants;
  select count(*) into wishlist_total from public.ss_wishlists;

  if participant_total <> 13 then
    raise exception 'Expected 13 participants; found %.', participant_total;
  end if;

  if wishlist_total <> participant_total then
    raise exception 'All 13 participants must submit a wishlist before the draw.';
  end if;

  if exists (select 1 from public.ss_assignments) then
    raise exception 'The Secret Santa draw has already been completed.';
  end if;

  select array_agg(id order by id) into participant_ids from public.ss_participants;

  if participant_total < 2 then
    raise exception 'At least two participants are required.';
  end if;

  loop
    attempt := attempt + 1;
    select array_agg(id order by random()) into recipient_ids from public.ss_participants;

    exit when not exists (
      select 1
      from generate_subscripts(participant_ids, 1) as s(i)
      where participant_ids[s.i] = recipient_ids[s.i]
    );

    if attempt > 10000 then
      raise exception 'Could not generate a valid assignment. Please try again.';
    end if;
  end loop;

  insert into public.ss_assignments (giver_id, recipient_id)
  select participant_ids[i], recipient_ids[i]
  from generate_subscripts(participant_ids, 1) as s(i);
end;
$$;

revoke all on function public.draw_secret_santa() from public, anon, authenticated;
grant execute on function public.draw_secret_santa() to service_role;

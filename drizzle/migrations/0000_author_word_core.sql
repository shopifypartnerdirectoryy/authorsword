
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

create policy "Users read own roles" on public.user_roles for select to authenticated
using (user_id = auth.uid() or public.has_role(auth.uid(), 'admin'));

-- Grant admin to the official business email once confirmed
create or replace function public.grant_official_admin()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  if new.email_confirmed_at is not null and lower(new.email) = 'authorswordofficial@gmail.com' then
    insert into public.user_roles (user_id, role) values (new.id, 'admin')
    on conflict (user_id, role) do nothing;
  end if;
  return new;
end;
$$;

create trigger on_auth_user_admin_insert after insert on auth.users
for each row execute function public.grant_official_admin();
create trigger on_auth_user_admin_update after update of email_confirmed_at on auth.users
for each row execute function public.grant_official_admin();

-- Book submissions
create table public.book_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  author_name text not null check (char_length(author_name) between 1 and 150),
  email text not null check (char_length(email) between 3 and 255),
  book_title text not null check (char_length(book_title) between 1 and 250),
  genre text not null check (char_length(genre) between 1 and 120),
  synopsis text not null check (char_length(synopsis) between 1 and 5000),
  cover_path text check (cover_path is null or char_length(cover_path) <= 500),
  book_link text check (book_link is null or char_length(book_link) <= 500),
  author_website text check (author_website is null or char_length(author_website) <= 500),
  social_links text check (social_links is null or char_length(social_links) <= 1000),
  services text[] not null default '{}',
  budget text check (budget is null or char_length(budget) <= 100),
  additional_info text check (additional_info is null or char_length(additional_info) <= 5000),
  privacy_consent boolean not null check (privacy_consent = true),
  status text not null default 'new' check (status in ('new','reviewing','proposal_sent','closed'))
);
grant insert on public.book_submissions to anon, authenticated;
grant select, update, delete on public.book_submissions to authenticated;
grant all on public.book_submissions to service_role;
alter table public.book_submissions enable row level security;
create policy "Anyone can submit a book" on public.book_submissions for insert to anon, authenticated with check (status = 'new');
create policy "Admins read submissions" on public.book_submissions for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins update submissions" on public.book_submissions for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete submissions" on public.book_submissions for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

-- Book-to-Film enquiries
create table public.film_enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  author_name text not null check (char_length(author_name) between 1 and 150),
  email text not null check (char_length(email) between 3 and 255),
  book_title text not null check (char_length(book_title) between 1 and 250),
  genre text not null check (char_length(genre) between 1 and 120),
  synopsis text not null check (char_length(synopsis) between 1 and 5000),
  book_link text check (book_link is null or char_length(book_link) <= 500),
  rights_info text not null check (char_length(rights_info) between 1 and 2000),
  adaptation_materials text check (adaptation_materials is null or char_length(adaptation_materials) <= 2000),
  additional_details text check (additional_details is null or char_length(additional_details) <= 5000),
  privacy_consent boolean not null check (privacy_consent = true),
  status text not null default 'new' check (status in ('new','reviewing','proposal_sent','closed'))
);
grant insert on public.film_enquiries to anon, authenticated;
grant select, update, delete on public.film_enquiries to authenticated;
grant all on public.film_enquiries to service_role;
alter table public.film_enquiries enable row level security;
create policy "Anyone can send a film enquiry" on public.film_enquiries for insert to anon, authenticated with check (status = 'new');
create policy "Admins read film enquiries" on public.film_enquiries for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins update film enquiries" on public.film_enquiries for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete film enquiries" on public.film_enquiries for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

-- Consultations
create table public.consultations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 150),
  email text not null check (char_length(email) between 3 and 255),
  project_title text not null check (char_length(project_title) between 1 and 250),
  interest text not null check (char_length(interest) between 1 and 150),
  preferred_date date not null,
  preferred_time text not null check (char_length(preferred_time) between 1 and 20),
  timezone text not null check (char_length(timezone) between 1 and 80),
  details text check (details is null or char_length(details) <= 5000),
  privacy_consent boolean not null check (privacy_consent = true),
  status text not null default 'requested' check (status in ('requested','confirmed','declined','completed'))
);
grant insert on public.consultations to anon, authenticated;
grant select, update, delete on public.consultations to authenticated;
grant all on public.consultations to service_role;
alter table public.consultations enable row level security;
create policy "Anyone can request a consultation" on public.consultations for insert to anon, authenticated with check (status = 'requested');
create policy "Admins read consultations" on public.consultations for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins update consultations" on public.consultations for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete consultations" on public.consultations for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

-- Contact messages
create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 150),
  email text not null check (char_length(email) between 3 and 255),
  subject text not null check (char_length(subject) between 1 and 200),
  message text not null check (char_length(message) between 1 and 5000),
  privacy_consent boolean not null check (privacy_consent = true),
  status text not null default 'new' check (status in ('new','read','replied'))
);
grant insert on public.contact_messages to anon, authenticated;
grant select, update, delete on public.contact_messages to authenticated;
grant all on public.contact_messages to service_role;
alter table public.contact_messages enable row level security;
create policy "Anyone can send a message" on public.contact_messages for insert to anon, authenticated with check (status = 'new');
create policy "Admins read messages" on public.contact_messages for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins update messages" on public.contact_messages for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete messages" on public.contact_messages for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

-- Service overrides (editable price labels / summaries)
create table public.service_overrides (
  slug text primary key check (char_length(slug) between 1 and 120),
  price_label text check (price_label is null or char_length(price_label) <= 120),
  summary text check (summary is null or char_length(summary) <= 600),
  updated_at timestamptz not null default now()
);
grant select on public.service_overrides to anon, authenticated;
grant insert, update, delete on public.service_overrides to authenticated;
grant all on public.service_overrides to service_role;
alter table public.service_overrides enable row level security;
create policy "Anyone reads service overrides" on public.service_overrides for select to anon, authenticated using (true);
create policy "Admins insert overrides" on public.service_overrides for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins update overrides" on public.service_overrides for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete overrides" on public.service_overrides for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

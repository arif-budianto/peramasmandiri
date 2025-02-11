-- Buat tabel galeri
create table if not exists galeri (
  id uuid default gen_random_uuid() primary key,
  kategori text not null check (kategori in ('tenda', 'combine', 'internet')),
  type text not null check (type in ('image', 'video')),
  url text not null,
  caption text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Aktifkan RLS
alter table galeri enable row level security;

-- Buat policy untuk membaca
create policy "Galeri dapat dibaca oleh semua orang"
  on galeri for select
  to public
  using (true);

-- Buat policy untuk mengelola
create policy "Galeri dapat dikelola oleh admin"
  on galeri for all
  to authenticated
  using (true)
  with check (true);

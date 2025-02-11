-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create tables
create table if not exists public.berita (
    id uuid default uuid_generate_v4() primary key,
    judul text not null,
    tanggal timestamp with time zone default timezone('utc'::text, now()) not null,
    ringkasan text,
    isi text not null,
    gambar text,
    kategori text not null check (kategori in ('berita', 'pengumuman')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.galeri (
    id uuid default uuid_generate_v4() primary key,
    judul text not null,
    deskripsi text,
    file_url text not null,
    tipe text not null check (tipe in ('foto', 'video')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.berita enable row level security;
alter table public.galeri enable row level security;

-- Create policies for berita table
create policy "Berita dapat dibaca oleh semua orang"
on public.berita for select
to public
using (true);

create policy "Berita hanya dapat diubah oleh user yang terautentikasi"
on public.berita for insert
to authenticated
with check (true);

create policy "Berita hanya dapat diupdate oleh user yang terautentikasi"
on public.berita for update
to authenticated
using (true);

create policy "Berita hanya dapat dihapus oleh user yang terautentikasi"
on public.berita for delete
to authenticated
using (true);

-- Create policies for galeri table
create policy "Galeri dapat dibaca oleh semua orang"
on public.galeri for select
to public
using (true);

create policy "Galeri hanya dapat diubah oleh user yang terautentikasi"
on public.galeri for insert
to authenticated
with check (true);

create policy "Galeri hanya dapat diupdate oleh user yang terautentikasi"
on public.galeri for update
to authenticated
using (true);

create policy "Galeri hanya dapat dihapus oleh user yang terautentikasi"
on public.galeri for delete
to authenticated
using (true);

-- Create storage bucket for media
insert into storage.buckets (id, name, public)
values ('media', 'media', true);

-- Create storage policies
create policy "Media dapat diakses oleh semua orang"
on storage.objects for select
to public
using ( bucket_id = 'media' );

create policy "Media hanya dapat diupload oleh user yang terautentikasi"
on storage.objects for insert
to authenticated
with check ( bucket_id = 'media' );

create policy "Media hanya dapat diupdate oleh user yang terautentikasi"
on storage.objects for update
to authenticated
using ( bucket_id = 'media' );

create policy "Media hanya dapat dihapus oleh user yang terautentikasi"
on storage.objects for delete
to authenticated
using ( bucket_id = 'media' );

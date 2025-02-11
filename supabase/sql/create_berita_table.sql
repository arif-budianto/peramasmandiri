-- Create the berita table
create table if not exists public.berita (
    id uuid default gen_random_uuid() primary key,
    judul text not null,
    ringkasan text,
    isi text,
    gambar text,
    kategori text check (kategori in ('berita', 'pengumuman')),
    tanggal date default current_date,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.berita enable row level security;

-- Create policies
create policy "Berita viewable by everyone" 
on public.berita for select 
using (true);

create policy "Users can insert berita" 
on public.berita for insert 
with check (auth.role() = 'authenticated');

create policy "Users can update own berita" 
on public.berita for update 
using (auth.role() = 'authenticated');

create policy "Users can delete own berita" 
on public.berita for delete 
using (auth.role() = 'authenticated');

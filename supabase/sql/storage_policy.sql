-- Buat bucket storage
insert into storage.buckets (id, name, public)
values ('galeri', 'galeri', true)
on conflict (id) do nothing;

-- Buat policy storage
create policy "Galeri dapat diakses oleh semua orang"
  on storage.objects for select
  to public
  using (bucket_id = 'galeri');

create policy "Galeri dapat diupload oleh user yang login"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'galeri');

create policy "Galeri dapat dihapus oleh user yang login"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'galeri');

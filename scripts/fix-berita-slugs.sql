-- Tambah kolom slug jika belum ada
ALTER TABLE berita ADD COLUMN IF NOT EXISTS slug TEXT;

-- Hapus index yang mungkin sudah ada (untuk menghindari error)
DROP INDEX IF EXISTS berita_slug_idx;

-- Buat index baru
CREATE INDEX berita_slug_idx ON berita(slug);

-- Update data yang belum memiliki slug
UPDATE berita 
SET slug = 
  LOWER(
    REGEXP_REPLACE(
      REGEXP_REPLACE(
        REGEXP_REPLACE(judul, '[^a-zA-Z0-9\s-]', ''),
        '\s+',
        '-'
      ),
      '-+',
      '-'
    )
  ) || '-' || id::text
WHERE slug IS NULL OR slug = '';

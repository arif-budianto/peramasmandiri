const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Hapus karakter spesial
    .replace(/\s+/g, '-') // Ganti spasi dengan tanda hubung
    .replace(/-+/g, '-') // Hapus tanda hubung berlebih
    .trim(); // Hapus spasi di awal dan akhir
};

const updateSlugs = async () => {
  try {
    // Ambil semua berita
    const { data: berita, error } = await supabase
      .from('berita')
      .select('*');

    if (error) throw error;

    // Update setiap berita dengan slug baru
    for (const item of berita) {
      const slug = generateSlug(item.judul);
      const { error: updateError } = await supabase
        .from('berita')
        .update({ slug })
        .eq('id', item.id);

      if (updateError) {
        console.error(`Gagal memperbarui berita ${item.id}:`, updateError);
        continue;
      }

      console.log(`Berhasil memperbarui slug untuk berita: ${item.judul}`);
    }

    console.log('Selesai memperbarui semua slug');
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
  }
};

updateSlugs();

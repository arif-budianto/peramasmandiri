import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

// Baca kredensial dari environment variables
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY harus diset di environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixSlugs() {
  try {
    // Baca file SQL
    const sql = readFileSync('./scripts/fix-berita-slugs.sql', 'utf8');

    // Jalankan SQL
    const { error } = await supabase.rpc('exec_sql', { sql });
    
    if (error) {
      throw error;
    }

    // Verifikasi hasilnya
    const { data: berita, error: fetchError } = await supabase
      .from('berita')
      .select('id, judul, slug');

    if (fetchError) {
      throw fetchError;
    }

    console.log('Berita yang sudah diupdate:');
    berita.forEach(item => {
      console.log(`ID: ${item.id}`);
      console.log(`Judul: ${item.judul}`);
      console.log(`Slug: ${item.slug}`);
      console.log('---');
    });

  } catch (error) {
    console.error('Error:', error);
  }
}

fixSlugs();

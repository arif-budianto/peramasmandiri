import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cciikicxagltholyagoj.supabase.co";
const supabaseServiceKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjaWlraWN4YWdsdGhvbHlhZ29qIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczODk5NjY1MywiZXhwIjoyMDU0NTcyNjUzfQ.zVUnnDUDBYk9rym67o7-LiACFGGjh5XYn2pRSkZNIGQ";

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupDatabase() {
  try {
    console.log("Membuat tabel berita...");
    const { error: beritaError } = await supabase
      .from("berita")
      .select()
      .limit(0);

    if (beritaError?.code === "PGRST204") {
      const { error } = await supabase.from("berita").insert([
        {
          judul: "Contoh Berita",
          ringkasan: "Ini adalah contoh berita",
          isi: "Ini adalah isi dari contoh berita",
          kategori: "berita",
        },
      ]);

      if (error) throw error;
      console.log("Tabel berita berhasil dibuat!");
    }

    console.log("Membuat tabel galeri...");
    const { error: galeriError } = await supabase
      .from("galeri")
      .select()
      .limit(0);

    if (galeriError?.code === "PGRST204") {
      const { error } = await supabase.from("galeri").insert([
        {
          judul: "Contoh Foto",
          deskripsi: "Ini adalah contoh foto",
          file_url: "https://example.com/photo.jpg",
          tipe: "foto",
        },
      ]);

      if (error) throw error;
      console.log("Tabel galeri berhasil dibuat!");
    }

    console.log("Membuat bucket penyimpanan...");
    const { data: buckets, error: bucketsError } =
      await supabase.storage.listBuckets();

    if (!buckets?.find((b) => b.name === "media")) {
      const { error } = await supabase.storage.createBucket("media", {
        public: true,
      });

      if (error) throw error;
      console.log("Bucket penyimpanan media berhasil dibuat!");
    }

    console.log("Penyiapan database selesai!");
  } catch (error) {
    console.error("Terjadi kesalahan saat menyiapkan database:", error);
  }
}

setupDatabase();

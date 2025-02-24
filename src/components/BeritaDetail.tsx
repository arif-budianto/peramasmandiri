import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { ArrowLeft, Share2 } from "lucide-react";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

interface Berita {
  id: string;
  judul: string;
  ringkasan: string;
  isi: string;
  kategori: "berita" | "pengumuman";
  gambar?: string;
  created_at: string;
  slug: string;
}

const BeritaDetail: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [berita, setBerita] = useState<Berita | null>(null);

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        setLoading(true);

        // Coba cari berdasarkan slug terlebih dahulu
        let { data, error } = await supabase
          .from("berita")
          .select("*")
          .eq("slug", slug)
          .single();

        // Jika tidak ditemukan dengan slug, coba cari berdasarkan ID
        if (error) {
          ({ data, error } = await supabase
            .from("berita")
            .select("*")
            .eq("id", slug)
            .single());
        }

        if (error) {
          throw new Error("Berita tidak ditemukan");
        }

        if (!data) {
          throw new Error("Berita tidak ditemukan");
        }

        setBerita(data);

        // Update URL dengan slug yang benar jika diperlukan
        if (data.slug && data.slug !== slug) {
          const newPath = `/${data.kategori}/${data.slug}`;
          window.history.replaceState(null, "", newPath);
        }
      } catch (error: any) {
        toast.error(error.message || "Gagal memuat berita");
        setTimeout(() => navigate("/"), 2000);
      } finally {
        setLoading(false);
        window.scrollTo(0, 0);
      }
    };

    fetchBerita();
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!berita) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Berita tidak ditemukan</h1>
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-green-600 hover:text-green-700"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{berita.judul} - BUMDesa Peramas Mandiri</title>
        <meta name="description" content={berita.ringkasan} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Meta Tags untuk Open Graph */}
        <meta property="og:site_name" content="BUMDesa Peramas Mandiri" />
        <meta property="og:locale" content="id_ID" />
        <meta property="og:title" content={`${berita.judul} - BUMDesa Peramas Mandiri`} />
        <meta property="og:description" content={berita.ringkasan} />
        <meta 
          property="og:image" 
          content={berita.gambar?.startsWith('http') ? berita.gambar : `https://peramasmandiri.net${berita.gambar}`} 
        />
        <meta 
          property="og:image:secure_url" 
          content={berita.gambar?.startsWith('http') ? berita.gambar : `https://peramasmandiri.net${berita.gambar}`} 
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={berita.judul} />
        <meta property="og:url" content={`https://peramasmandiri.net/${berita.kategori}/${berita.slug}`} />
        <meta property="og:type" content="article" />
        
        {/* Meta Tags untuk Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@peramasmandiri" />
        <meta name="twitter:creator" content="@peramasmandiri" />
        <meta name="twitter:title" content={`${berita.judul} - BUMDesa Peramas Mandiri`} />
        <meta name="twitter:description" content={berita.ringkasan} />
        <meta name="twitter:image" content={berita.gambar || "https://peramasmandiri.net/Logo%20Bumdes%203.png"} />
        <meta name="twitter:image:alt" content={berita.judul} />
        <meta name="twitter:domain" content="peramasmandiri.net" />

        {/* Tambahan meta tags untuk SEO dan sharing */}
        <link rel="canonical" href={`https://peramasmandiri.net/${berita.kategori}/${berita.slug}`} />
        <meta name="author" content="BUMDesa Peramas Mandiri" />
        <meta name="robots" content="index, follow" />
        <meta property="article:published_time" content={berita.created_at} />
        <meta property="article:section" content={berita.kategori === 'berita' ? 'Berita' : 'Pengumuman'} />
        <meta property="article:author" content="https://peramasmandiri.net" />
        <meta property="article:publisher" content="https://peramasmandiri.net" />
        <meta
          property="article:section"
          content={berita.kategori === "berita" ? "Berita" : "Pengumuman"}
        />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <button
          onClick={() => navigate("/semua-berita")}
          className="flex items-center text-green-600 hover:text-green-700 mb-8 mt-16"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Kembali ke Berita
        </button>

        <article className="prose prose-lg dark:prose-invert max-w-none">
          {berita.gambar && (
            <img
              src={berita.gambar}
              alt={berita.judul}
              className="w-full h-auto object-contain md:h-96 md:object-cover rounded-lg mb-8"
            />
          )}

          <div className="flex items-center space-x-4 mb-8">
            <span className="text-sm text-gray-500">
              {new Date(berita.created_at).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                berita.kategori === "berita"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {berita.kategori === "berita" ? "Berita" : "Pengumuman"}
            </span>
          </div>

          <h1 className="text-4xl text-gray-600 dark:text-white font-bold mb-4">
            {berita.judul}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {berita.ringkasan}
          </p>
          <div
            className="prose prose-lg dark:prose-invert text-gray-600 dark:text-gray-300 space-y-6"
            dangerouslySetInnerHTML={{ __html: berita.isi }}
          />

          {/* Tombol Share WhatsApp */}
          <div className="flex justify-center mt-12">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                `${berita.judul}\n\n${berita.ringkasan}\n\nBaca selengkapnya di:\n${window.location.href}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Share2 className="w-5 h-5 transition-transform group-hover:rotate-12" />
              <span className="font-medium">Bagikan via WhatsApp</span>
            </a>
          </div>
        </article>
      </div>
    </>
  );
};

export default BeritaDetail;

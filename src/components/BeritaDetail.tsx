import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { ArrowLeft, Share2 } from "lucide-react";
import toast from "react-hot-toast";

const BeritaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [berita, setBerita] = useState<any>(null);

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("berita")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          setBerita(data);
        }
      } catch (error: any) {
        toast.error("Gagal memuat berita: " + error.message);
        navigate("/");
      } finally {
        setLoading(false);
        window.scrollTo(0, 0);
      }
    };

    fetchBerita();
  }, [id, navigate]);

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
            className="w-full h-96 object-cover rounded-lg mb-8"
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

        <h1 className="text-4xl text-gray-600 dark:text-white font-bold mb-4">{berita.judul}</h1>
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
            href={`https://wa.me/?text=${encodeURIComponent(`${berita.judul}\n\n${berita.ringkasan}\n\nBaca selengkapnya di:\n${window.location.href}`)}`}
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
  );
};

export default BeritaDetail;

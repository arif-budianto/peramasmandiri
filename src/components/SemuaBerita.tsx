import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, ArrowLeft, Edit, Trash2, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

interface BeritaProps {
  id: string;
  judul: string;
  tanggal: string;
  ringkasan: string;
  gambar: string;
  kategori: "berita" | "pengumuman";
  isi: string;
}

const SemuaBerita = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [berita, setBerita] = useState<BeritaProps[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBerita = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('berita')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        const mappedData = data.map(item => ({
          id: item.id,
          judul: item.judul || '',
          tanggal: item.created_at || new Date().toISOString(),
          ringkasan: item.ringkasan || '',
          gambar: item.gambar || '',
          kategori: item.kategori || 'berita',
          isi: item.isi || ''
        }));
        setBerita(mappedData);
      }
    } catch (error: any) {
      toast.error('Gagal memuat berita: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBerita();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
      try {
        const { error } = await supabase
          .from('berita')
          .delete()
          .eq('id', id);

        if (error) throw error;
        toast.success('Berita berhasil dihapus!');
        fetchBerita();
      } catch (error: any) {
        toast.error('Gagal menghapus berita: ' + error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-green-600 hover:text-green-700 w-fit"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Kembali ke Beranda
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-center mx-auto sm:mx-0">
            <span className="block sm:inline">Semua Berita</span>
            <span className="block sm:inline sm:ml-1">&</span>
            <span className="block sm:inline sm:ml-1">Pengumuman</span>
          </h1>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : berita.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 dark:text-gray-400">
              Belum ada berita atau pengumuman
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {berita.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
              >
                <div className="relative h-48">
                  <img
                    src={item.gambar}
                    alt={item.judul}
                    className="w-full h-full object-cover"
                  />
                  {user && (
                    <div className="absolute top-4 left-4 flex space-x-2">
                      <Link
                        to={`/edit-berita/${item.id}`}
                        className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item.kategori === "berita"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {item.kategori === "berita" ? "Berita" : "Pengumuman"}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(item.tanggal).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {item.judul}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {item.ringkasan}
                  </p>
                  <Link
                    to={`/pengumuman/${item.id}`}
                    className="flex items-center text-green-600 dark:text-green-500 hover:text-green-700 transition-colors duration-300 group"
                  >
                    Baca selengkapnya
                    <ArrowRight className="h-4 w-4 ml-2 transform transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SemuaBerita;

import { Bell, ArrowRight, Plus, Calendar, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import BeritaForm from './BeritaForm';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

interface BeritaProps {
  id: string;
  judul: string;
  tanggal: string;
  ringkasan: string;
  gambar: string;
  kategori: "berita" | "pengumuman";
  isi: string;
  slug: string;
}

import { supabase } from '../lib/supabase';

const BeritaPengumuman = () => {
  const { user } = useAuth();
  const [berita, setBerita] = useState<BeritaProps[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [beritaToEdit, setBeritaToEdit] = useState<BeritaProps | undefined>();
  const [loading, setLoading] = useState(true);

  const fetchBerita = async () => {
    try {
      console.log('Mulai fetch berita...'); // Debug log
      setLoading(true);
      
      const { data, error } = await supabase
        .from('berita')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('Raw data from Supabase:', data); // Debug log

      if (error) {
        console.error('Error fetching berita:', error);
        throw error;
      }

      if (data && Array.isArray(data)) {
        // Map data to match BeritaProps interface
        const mappedData = data.map(item => {
          console.log('Processing item:', item); // Debug log
          return {
            id: item.id,
            judul: item.judul || '',
            tanggal: item.created_at || new Date().toISOString(),
            ringkasan: item.ringkasan || '',
            gambar: item.gambar || '',
            kategori: item.kategori || 'berita',
            isi: item.isi || '',
            slug: item.slug || ''
          };
        });
        console.log('Mapped data:', mappedData); // Debug log
        setBerita(mappedData);
      } else {
        console.log('No data or invalid data structure received'); // Debug log
        setBerita([]);
      }
    } catch (error: any) {
      console.error('Error detail:', error);
      toast.error('Gagal memuat berita: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('BeritaPengumuman component mounted'); // Debug log
    fetchBerita();
  }, []);

  // Tambahkan effect untuk memantau perubahan isFormOpen
  useEffect(() => {
    if (!isFormOpen) {
      console.log('Form closed, fetching new data...'); // Debug log
      fetchBerita();
    }
  }, [isFormOpen]);

  const handleEdit = (item: BeritaProps) => {
    setBeritaToEdit(item);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus item ini?')) {
      try {
        const { error } = await supabase
          .from('berita')
          .delete()
          .eq('id', id);

        if (error) throw error;
        toast.success('Item berhasil dihapus!');
        fetchBerita();
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setBeritaToEdit(undefined);
    fetchBerita();
  };
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/semua-berita');
    // Scroll ke atas halaman
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <section id="berita" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Berita & Pengumuman
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Informasi terkini seputar kegiatan dan layanan BUMDesa
          </p>
        </div>

        {user && (
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setIsFormOpen(true)}
              className="flex items-center px-6 py-3 text-lg font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-lg"
            >
              <Plus className="w-6 h-6 mr-2" />
              Tambah Berita Baru
            </button>
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Memuat data...</p>
          </div>
        ) : berita.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">Belum ada berita atau pengumuman</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {berita.slice(0, 3).map((item, index) => (
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
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleEdit(item);
                        }}
                        className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(item.id);
                        }}
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
                    to={`/${item.kategori}/${item.slug || item.id}`}
                    className="flex items-center text-green-600 dark:text-green-500 hover:text-green-700 transition-colors duration-300 group"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    Baca selengkapnya
                    <ArrowRight className="h-4 w-4 ml-2 transform transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {berita.length > 3 && (
          <div className="text-center">
            <button 
              onClick={handleButtonClick}
              className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-300"
            >
              <Bell className="h-5 w-5 mr-2" />
              Lihat Semua Berita/Pengumuman
            </button>
          </div>
        )}


        {isFormOpen && (
          <BeritaForm
            isOpen={isFormOpen}
            onClose={handleFormClose}
            beritaToEdit={beritaToEdit}
          />
        )}
      </div>
    </section>
  );
};

export default BeritaPengumuman;

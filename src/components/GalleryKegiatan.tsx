import { useState, useCallback } from "react";
import { Tent, Tractor, Wifi } from "lucide-react";
import { MediaManager } from "./MediaManager";

const GalleryKegiatan = () => {
  const [selectedKategori, setSelectedKategori] = useState<'tenda' | 'combine' | 'internet' | null>(null);

  const handleCardClick = useCallback((kategori: 'tenda' | 'combine' | 'internet') => {
    setSelectedKategori(kategori);
  }, []);

  return (
    <section id="galeri" className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Dokumentasi Kegiatan & Layanan
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Komitmen kami dalam memberikan layanan terbaik untuk kesejahteraan dan kemajuan masyarakat desa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Penyewaan Tenda & Kursi */}
          <div 
            onClick={() => handleCardClick('tenda')}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          >
            <div className="flex justify-center mb-6">
              <Tent className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-4">
              Tenda & Kursi
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Solusi lengkap untuk berbagai acara Anda. Tersedia berbagai ukuran tenda dan kursi berkualitas.
            </p>
          </div>

          {/* Penyewaan Combine Harvester */}
          <div 
            onClick={() => handleCardClick('combine')}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          >
            <div className="flex justify-center mb-6">
              <Tractor className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-4">
              Combine Harvester
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Membantu petani dengan alat pertanian modern dan efisien untuk meningkatkan hasil panen.
            </p>
          </div>

          {/* Layanan Internet Desa */}
          <div 
            onClick={() => handleCardClick('internet')}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          >
            <div className="flex justify-center mb-6">
              <Wifi className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-4">
              Layanan Internet Desa
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Konektivitas internet cepat dan stabil untuk masyarakat desa dengan harga terjangkau.
            </p>
          </div>
        </div>

        {selectedKategori && (
          <MediaManager
            kategori={selectedKategori}
            onClose={() => setSelectedKategori(null)}
          />
        )}
      </div>
    </section>
  );
};

export default GalleryKegiatan;

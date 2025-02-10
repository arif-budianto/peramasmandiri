import { ArrowLeft, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface DetailPengumumanProps {
  id: string;
  judul: string;
  tanggal: string;
  isi: string;
  gambar?: string;
}

const DetailPengumuman: React.FC<DetailPengumumanProps> = ({
  judul,
  tanggal,
  isi,
  gambar,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleKembali = () => {
    navigate('/');
    setTimeout(() => {
      const beritaSection = document.getElementById('berita');
      if (beritaSection) {
        beritaSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tombol Kembali */}
        <button
          onClick={handleKembali}
          className="mb-8 inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mt-16"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>Kembali ke Berita & Pengumuman</span>
        </button>

        {/* Konten Utama */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {/* Gambar Header */}
          {gambar && (
            <div className="relative h-72 w-full">
              <img
                src={gambar}
                alt={judul}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Konten */}
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {judul}
            </h1>

            {/* Tanggal */}
            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-6">
              <Calendar className="h-5 w-5 mr-2" />
              <time dateTime={tanggal}>
                {format(new Date(tanggal), "dd MMMM yyyy", { locale: id })}
              </time>
            </div>

            {/* Konten Artikel */}
            <div className="prose prose-lg dark:prose-invert max-w-none text-gray-900 dark:text-white">
              <div dangerouslySetInnerHTML={{ __html: isi }} />
            </div>
          </div>
        </div>

        {/* Tombol Share */}
        <div className="mt-8 flex justify-center space-x-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Bagikan ke Facebook
          </button>
          <button className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors">
            Bagikan ke Twitter
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Bagikan ke WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailPengumuman;

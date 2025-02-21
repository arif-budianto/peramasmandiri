import { Trophy, Target, TrendingUp, X, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";

interface PengurusProps {
  nama: string;
  jabatan: string;
  foto: string;
  deskripsi: string;
}

const pengurusList: PengurusProps[] = [
  {
    nama: "INDRA KURNIAWAN",
    jabatan: "Direktur",
    foto: "https://i.imgur.com/GW3JJq8.png?1",
    deskripsi: "Sebagai Direktur BUMDesa Peramas Mandiri, bertanggung jawab dalam memimpin dan mengembangkan strategi bisnis yang inovatif untuk kemajuan ekonomi desa. Memiliki pengalaman dalam manajemen bisnis desa dan pengembangan komunitas.",
  },
  {
    nama: "SUBANDI",
    jabatan: "Sekretaris",
    foto: "https://i.imgur.com/nRFeP7p.png?1",
    deskripsi: "Menjabat sebagai Sekretaris BUMDesa, bertanggung jawab dalam pengelolaan administrasi dan dokumentasi. Berperan penting dalam memastikan kelancaran komunikasi antar divisi dan pemangku kepentingan.",
  },
  {
    nama: "EKO ALFIANSYAH",
    jabatan: "Bendahara",
    foto: "https://i.imgur.com/NLWTp9S.png?1",
    deskripsi: "Sebagai Bendahara BUMDesa, mengelola keuangan dan pencatatan dengan teliti dan transparan. Berpengalaman dalam manajemen keuangan dan pelaporan keuangan desa.",
  },
  {
    nama: "ARIF BUDIANTO",
    jabatan: "IT Engineer",
    foto: "https://i.imgur.com/eLmCYJz.jpg",
    deskripsi: "Profesional berpengalaman dalam Network Engineering dan Pengembangan Web, spesialisasi infrastruktur jaringan enterprise dan konfigurasi perangkat Mikrotik dan OLT. Mengintegrasikan pengembangan web dan arsitektur jaringan untuk solusi teknologi efisien. Berkomitmen menjaga keandalan IT dan optimalkan performa jaringan.",
  },
];

const ManajemenProfil = () => {
  const [selectedPengurus, setSelectedPengurus] = useState<PengurusProps | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAllDocuments, setShowAllDocuments] = useState(false);
  const [showAllPengurus, setShowAllPengurus] = useState(false);

  // Handle ESC key press
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isModalOpen]);

  const handlePengurusClick = (pengurus: PengurusProps) => {
    setSelectedPengurus(pengurus);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPengurus(null);
  };

  // Handle overlay click
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <section
      id="profil"
      className="py-20 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Manajemen BUMDesa
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Tim profesional yang berdedikasi untuk kemajuan desa
          </p>
        </div>

        {/* Visi Misi */}
        <div className="grid grid-cols-1 gap-8 mb-14">
          <div className="bg-white dark:bg-gray-900 p-10 rounded-2xl shadow-lg transform hover:scale-105 transition duration-300">
            <div className="flex flex-col">
              <div className="flex items-center mb-4">
                <Target className="h-10 w-10 text-green-500 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Visi
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Menjadi Badan Usaha Milik Desa yang unggul, inovatif, dan
                berkelanjutan dalam mengembangkan potensi ekonomi digital dan
                sumber daya lokal
              </p>
              <div className="flex items-center mb-4">
                <Trophy className="h-10 w-10 text-green-500 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Misi
                </h2>
              </div>
              <ul className="text-gray-600 dark:text-gray-300 list-disc list-inside space-y-2 mb-6">
                <li>
                  Mengembangkan usaha ekonomi produktif berbasis potensi lokal
                  (Pertanian, Perkebunan dan Pariwisata) dan teknologi digital
                </li>
                <li>
                  Mengimplementasikan program internet desa untuk meningkatkan
                  akses informasi dan peluang ekonomi digital masyarakat
                </li>
                <li>
                  Meningkatkan kapasitas pengelolaan BUMDES melalui tata kelola
                  transparan, akuntabel, dan berbasis teknologi
                </li>
                <li>
                  Menciptakan ekosistem kewirausahaan digital yang mendukung
                  produktivitas dan kemandirian ekonomi desa
                </li>
                <li>
                  Memberikan kontribusi strategis pada pendapatan asli desa
                  melalui pengembangan layanan berbasis teknologi informasi
                </li>
                <li>
                  Memberdayakan masyarakat melalui penyediaan sarana teknologi
                  digital
                </li>
              </ul>
              <div className="flex items-center">
                <TrendingUp className="h-10 w-10 text-green-500 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Tujuan
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mt-4">
                Meningkatkan kesejahteraan masyarakat desa melalui pengembangan
                usaha dan layanan berkualitas
              </p>
            </div>
          </div>
        </div>

        {/* Dokumen */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
            Dokumen BUMDesa
          </h2>
          <div className={`grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8 ${
            !showAllDocuments && 'max-h-[280px] overflow-hidden md:max-h-none md:overflow-visible'
          }`}>
            {/* Grid columns modified for mobile - always 2 columns */}
            {/* First two documents will always be visible */}
            {/* Modified grid-cols-1 to grid-cols-2 for mobile */}
            <div className="col-span-1 text-center bg-white dark:bg-gray-900 p-6 rounded-2xl shadow hover:shadow-xl transition">
              <h3 className="text-gray-900 dark:text-white">SK BUMDesa</h3>
              <img
                src="https://i.imgur.com/b8CcGDj.png"
                alt="Cover SK BUMDesa"
                className="w-32 h-40 mx-auto mb-2"
              />
              <a
                href="https://cciikicxagltholyagoj.supabase.co/storage/v1/object/public/media//SK%20Pengurus%20Bumdes.pdf"
                className="text-blue-500"
              >
                Lihat Dokumen
              </a>
            </div>
            <div className="col-span-1 text-center bg-white dark:bg-gray-900 p-6 rounded-2xl shadow hover:shadow-xl transition">
              <h3 className="text-gray-900 dark:text-white">AD dan ART</h3>
              <img
                src="https://i.imgur.com/ysXbDPs.png"
                alt="Cover Anggaran Dasar"
                className="w-32 h-40 mx-auto mb-2"
              />
              <a
                href="https://cciikicxagltholyagoj.supabase.co/storage/v1/object/public/media//AD%20dan%20ART%20Peramas%20Mandiri.pdf"
                className="text-blue-500"
              >
                Lihat Dokumen
              </a>
            </div>
            <div className={`col-span-1 text-center bg-white dark:bg-gray-900 p-6 rounded-2xl shadow hover:shadow-xl transition ${!showAllDocuments && 'hidden md:block'}`}>
              <h3 className="text-gray-900 dark:text-white">Akta Pendirian</h3>
              <img
                src="https://i.imgur.com/AaPv8W7.png"
                alt="Cover Akta Pendirian"
                className="w-32 h-40 mx-auto mb-2"
              />
              <a
                href="https://cciikicxagltholyagoj.supabase.co/storage/v1/object/public/media//Akta%20Notaris.pdf"
                className="text-blue-500"
              >
                Lihat Dokumen
              </a>
            </div>
            <div className={`col-span-1 text-center bg-white dark:bg-gray-900 p-6 rounded-2xl shadow hover:shadow-xl transition ${!showAllDocuments && 'hidden md:block'}`}>
              <h3 className="text-gray-900 dark:text-white">AHU</h3>
              <img
                src="https://i.imgur.com/0UKtkjn.png"
                alt="Cover AHU"
                className="w-32 h-40 mx-auto mb-2"
              />
              <a
                href="https://cciikicxagltholyagoj.supabase.co/storage/v1/object/public/media//AHU.pdf"
                className="text-blue-500"
              >
                Lihat Dokumen
              </a>
            </div>
            <div className={`col-span-1 text-center bg-white dark:bg-gray-900 p-6 rounded-2xl shadow hover:shadow-xl transition ${!showAllDocuments && 'hidden md:block'}`}>
              <h3 className="text-gray-900 dark:text-white">NIB</h3>
              <img
                src="https://i.imgur.com/L3qvJYx.png"
                alt="Cover NIB"
                className="w-32 h-40 mx-auto mb-2"
              />
              <a href="/path/to/nib.pdf" className="text-blue-500">
                Lihat Dokumen
              </a>
            </div>
          </div>
          {/* Tombol untuk menampilkan/menyembunyikan dokumen */}
          <div className="text-center mt-4 mb-8 md:hidden">
            <button
              onClick={() => setShowAllDocuments(!showAllDocuments)}
              className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              {showAllDocuments ? (
                <><ChevronUp className="w-5 h-5 mr-2" /> Sembunyikan Dokumen</>
              ) : (
                <><ChevronDown className="w-5 h-5 mr-2" /> Lihat Semua Dokumen</>
              )}
            </button>
          </div>
        </div>

        {/* Pengurus */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
            Pengurus BUMDesa
          </h2>
          <div className={`grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 ${
            !showAllPengurus && 'max-h-[600px] overflow-hidden md:max-h-none md:overflow-visible'}`}>
            {pengurusList.slice(0, showAllPengurus ? pengurusList.length : 4).map((pengurus, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow transform hover:scale-105 transition duration-300 text-center cursor-pointer"
                onClick={() => handlePengurusClick(pengurus)}
              >
                <img
                  src={pengurus.foto}
                  alt={pengurus.nama}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-green-500"
                />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {pengurus.nama}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {pengurus.jabatan}
                </p>
              </div>
            ))}
          </div>
          {/* Tombol untuk menampilkan/menyembunyikan pengurus tambahan */}
          {pengurusList.length > 4 && (
            <div className="text-center mt-4 md:hidden">
              <button
                onClick={() => setShowAllPengurus(!showAllPengurus)}
                className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                {showAllPengurus ? (
                  <><ChevronUp className="w-5 h-5 mr-2" /> Sembunyikan Pengurus</>
                ) : (
                  <><ChevronDown className="w-5 h-5 mr-2" /> Lihat Semua Pengurus</>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedPengurus && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl transform transition-all">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <img
                  src={selectedPengurus.foto}
                  alt={selectedPengurus.nama}
                  className="w-40 h-40 rounded-full object-cover border-4 border-green-500"
                />
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {selectedPengurus.nama}
                  </h3>
                  <p className="text-lg text-green-600 dark:text-green-400 mb-4">
                    {selectedPengurus.jabatan}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                    {selectedPengurus.deskripsi}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ManajemenProfil;

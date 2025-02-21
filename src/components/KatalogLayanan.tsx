import { Package, Clock, CheckCircle, X } from "lucide-react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface LayananProps {
  nama: string;
  deskripsi: string;
  harga: string;
  fitur: string[];
  icon: JSX.Element;
}

interface FormData {
  nama: string;
  alamat: string;
  tanggal: Date | null;
}

const daftarLayanan: LayananProps[] = [
  {
    nama: "Penyewaan Tenda & Kursi",
    deskripsi: "Paket lengkap untuk berbagai acara",
    harga: "Mulai dari Rp 350.000",
    fitur: [
      "Berbagai ukuran tenda",
      "Kursi berkualitas",
      "Pemasangan profesional",
      "Layanan 24/7",
    ],
    icon: <Package className="h-12 w-12 text-green-600" />,
  },
  {
    nama: "Penyewaan Combine Harvester",
    deskripsi: "Solusi panen modern dan efisien",
    harga: "Mulai Rp 70.000/Hanggar",
    fitur: [
      "Operator berpengalaman",
      "Perawatan berkala",
      "Hasil panen maksimal",
      "Jadwal fleksibel",
    ],
    icon: <Clock className="h-12 w-12 text-green-600" />,
  },
  {
    nama: "Internet Desa",
    deskripsi: "Koneksi stabil untuk kebutuhan digital",
    harga: "Mulai dari Rp 160.000/bulan",
    fitur: [
      "Kecepatan mulai 10 Mbps",
      "Instalasi gratis",
      "Support teknis 24/7",
      "Tanpa FUP",
    ],
    icon: <CheckCircle className="h-12 w-12 text-green-600" />,
  },
];

const KatalogLayanan = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedLayanan, setSelectedLayanan] = useState<LayananProps | null>(null);
  const [formData, setFormData] = useState<FormData>({
    nama: "",
    alamat: "",
    tanggal: null,
  });

  const handlePesanClick = (layanan: LayananProps) => {
    setSelectedLayanan(layanan);
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedLayanan) {
      const message = `Halo, saya ingin memesan layanan ${selectedLayanan.nama}
      
Detail Pesanan:
- Nama: ${formData.nama}
- Alamat: ${formData.alamat}
- Tanggal Penggunaan: ${formData.tanggal?.toLocaleDateString('id-ID') || 'Belum ditentukan'}

Mohon informasi lebih lanjut mengenai ketersediaan layanan. Terima kasih.`;

      window.open(`https://wa.me/6281349993773?text=${encodeURIComponent(message)}`, '_blank');
      setShowModal(false);
      setFormData({ nama: "", alamat: "", tanggal: null });
    }
  };

  return (
    <section id="katalog" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Katalog Jasa & Layanan
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Pilihan layanan berkualitas untuk memenuhi kebutuhan Anda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {daftarLayanan.map((layanan, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <div className="p-8">
                <div className="flex justify-center mb-4">{layanan.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
                  {layanan.nama}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
                  {layanan.deskripsi}
                </p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-500 text-center mb-6">
                  {layanan.harga}
                </p>
                <ul className="space-y-3">
                  {layanan.fitur.map((fitur, idx) => (
                    <li key={idx} className="flex items-center text-gray-600 dark:text-gray-300">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      {fitur}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-600">
                <button
                  onClick={() => handlePesanClick(layanan)}
                  className="block w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-300 text-center"
                >
                  Pesan Sekarang
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 w-full max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="h-6 w-6" />
            </button>

            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Form Pemesanan {selectedLayanan?.nama}
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Alamat Lengkap
                  </label>
                  <textarea
                    required
                    value={formData.alamat}
                    onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tanggal Penggunaan
                  </label>
                  <DatePicker
                    selected={formData.tanggal}
                    onChange={(date) => setFormData({ ...formData, tanggal: date })}
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date()}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholderText="Pilih tanggal"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-300"
                >
                  Kirim Pesan WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default KatalogLayanan;

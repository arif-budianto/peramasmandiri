import { Package, Clock, CheckCircle } from "lucide-react";

interface LayananProps {
  nama: string;
  deskripsi: string;
  harga: string;
  fitur: string[];
  icon: JSX.Element;
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
    nama: "Layanan Internet",
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
  const getWhatsAppLink = (layanan: LayananProps) => {
    const message = `Halo, saya tertarik dengan layanan ${layanan.nama} di BUMDesa Peramas Mandiri. Mohon informasi lebih lanjut.`;
    return `https://wa.me/6281349993773?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="katalog" className="py-20 bg-white dark:bg-gray-800">
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
                <a
                  href={getWhatsAppLink(layanan)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-300 text-center"
                >
                  Pesan Sekarang
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KatalogLayanan;

import { Calendar, Bell, ArrowRight } from "lucide-react";
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface BeritaProps {
  id: string;
  judul: string;
  tanggal: string;
  ringkasan: string;
  gambar: string;
  kategori: "berita" | "pengumuman";
  isi: string;
}

export const daftarBerita: BeritaProps[] = [
  {
    id: "1",
    judul: "BUMDesa Pangkalan Buton Menuju Internet Desa Mandiri",
    tanggal: "2025-02-09",
    ringkasan:
      "BUMDesa Pangkalan Buton mengadakan program untuk meningkatkan akses internet di desa, memastikan semua masyarakat mendapatkan koneksi yang stabil dan cepat.",
    gambar: "https://i.imgur.com/6aFxl1B.jpg",
    kategori: "berita",
    isi: `<p>BUMDesa Pangkalan Buton telah meluncurkan program inovatif yang bertujuan untuk meningkatkan akses internet di seluruh wilayah desa. Program ini merupakan langkah penting dalam upaya memastikan bahwa seluruh masyarakat desa memiliki akses ke koneksi internet yang stabil dan cepat.</p>

<p>Beberapa poin penting dari program ini meliputi:</p>

<ul>
  <li>Pemasangan infrastruktur jaringan fiber optik</li>
  <li>Pembangunan menara wifi di titik-titik strategis</li>
  <li>Pelatihan digital literacy untuk warga</li>
  <li>Kerjasama dengan provider internet terkemuka</li>
</ul>

<p>Program ini diharapkan dapat mendukung berbagai aktivitas masyarakat, mulai dari pendidikan daring hingga pengembangan UMKM digital di desa.</p>`,
  },
  {
    id: "2",
    judul: "Pertemuan di Kecamatan Membahas Program Internet Desa",
    tanggal: "2025-02-06",
    ringkasan:
      "Jadwal pertemuan di kecamatan untuk membahas program internet desa yang bertujuan meningkatkan aksesibilitas dan konektivitas di wilayah tersebut.",
    gambar: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    kategori: "pengumuman",
    isi: `<p>Pada tanggal 6 Februari 2025, akan diadakan pertemuan penting di kantor kecamatan untuk membahas implementasi program internet desa. Pertemuan ini akan membahas beberapa agenda penting:</p>

<ul>
  <li>Evaluasi infrastruktur internet yang ada</li>
  <li>Perencanaan pengembangan jaringan baru</li>
  <li>Diskusi anggaran dan pendanaan</li>
  <li>Penetapan timeline implementasi</li>
</ul>

<p>Pertemuan ini akan dihadiri oleh:</p>
<ul>
  <li>Camat dan jajarannya</li>
  <li>Kepala Desa se-kecamatan</li>
  <li>Perwakilan BUMDesa</li>
  <li>Tim teknis provider internet</li>
</ul>

<p>Diharapkan dengan adanya pertemuan ini, program internet desa dapat segera direalisasikan untuk mendukung kemajuan digital di wilayah kita.</p>`,
  },
  {
    id: "3",
    judul: "Perencanaan Layanan Internet Desa",
    tanggal: "2025-02-03",
    ringkasan:
      "BUMDesa sedang merencanakan peningkatan layanan internet untuk memberikan koneksi yang lebih stabil dan cepat dan menjangkau seluruh masyarakat.",
    gambar: "https://i.imgur.com/jmCx8LD.jpg",
    kategori: "pengumuman",
    isi: `<p>BUMDesa kami dengan bangga mengumumkan inisiatif baru dalam peningkatan layanan internet desa. Program ini dirancang untuk memberikan solusi konektivitas yang lebih baik bagi seluruh warga.</p>

<p>Beberapa poin penting dalam perencanaan ini meliputi:</p>

<ul>
  <li>Survei kebutuhan internet per wilayah</li>
  <li>Analisis infrastruktur yang dibutuhkan</li>
  <li>Perhitungan biaya dan manfaat</li>
  <li>Rencana implementasi bertahap</li>
</ul>

<p>Target yang ingin dicapai:</p>
<ul>
  <li>Kecepatan internet minimal 20 Mbps</li>
  <li>Jangkauan hingga 95% wilayah desa</li>
  <li>Harga yang terjangkau untuk warga</li>
  <li>Layanan pelanggan 24/7</li>
</ul>

<p>Kami berharap dengan peningkatan layanan ini, dapat mendukung berbagai aktivitas digital warga, dari pendidikan hingga UMKM.</p>`,
  },
];

const BeritaPengumuman = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const handleButtonClick = () => {
    setIsPopupOpen(true);
  };

  return (
    <section id="berita" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Berita & Pengumuman
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Informasi terkini seputar kegiatan dan layanan BUMDesa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {daftarBerita.map((item, index) => (
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
                  {item.tanggal}
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

        <div className="text-center mt-12">
          <button className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-300" onClick={handleButtonClick}>
            <Bell className="h-5 w-5 mr-2" />
            Lihat Semua Pengumuman
          </button>
        </div>
        {isPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold">Belum Ada Pengumuman Lainnya</h2>
              <p>Silakan cek kembali nanti.</p>
              <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded" onClick={() => setIsPopupOpen(false)}>Tutup</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BeritaPengumuman;

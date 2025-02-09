import { Trophy, Target, TrendingUp } from "lucide-react";

interface PengurusProps {
  nama: string;
  jabatan: string;
  foto: string;
}

const pengurusList: PengurusProps[] = [
  {
    nama: "INDRA KURNIAWAN",
    jabatan: "Direktur",
    foto: "https://i.imgur.com/GW3JJq8.png?1",
  },
  {
    nama: "SUBANDI",
    jabatan: "Sekretaris",
    foto: "https://i.imgur.com/nRFeP7p.png?1",
  },
  {
    nama: "EKO ALFIANSYAH",
    jabatan: "Bendahara",
    foto: "https://i.imgur.com/NLWTp9S.png?1",
  },
  {
    nama: "ARIFBUDIANTO",
    jabatan: "IT",
    foto: "https://i.imgur.com/eLmCYJz.jpg",
  },
];

const ManajemenProfil = () => {
  return (
    <section id="profil" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Manajemen BUMDesa
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Tim profesional yang berdedikasi untuk kemajuan desa
          </p>
        </div>

        {/* Visi Misi */}
        <div className="grid grid-cols-1 gap-8 mb-12">
          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div className="flex items-center mb-4">
                <Target className="h-8 w-8 text-green-600 dark:text-green-500 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Visi
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Menjadi Badan Usaha Milik Desa yang unggul, inovatif, dan
                berkelanjutan dalam mengembangkan potensi ekonomi digital dan
                sumber daya lokal
              </p>
              <div className="flex items-center mb-4">
                <Trophy className="h-8 w-8 text-green-600 dark:text-green-500 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Misi
                </h2>
              </div>
              <ul className="text-gray-600 dark:text-gray-300 list-disc list-inside space-y-2 mb-8">
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
              <div className="flex items-center mb-4">
                <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-500 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Tujuan
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
              Meningkatkan kesejahteraan masyarakat desa melalui pengembangan usaha dan layanan berkualitas
              </p>
            </div>
          </div>
        </div>

        {/* Dokumen */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div className="col-span-1 text-center">
            <h3>SK BUMDesa</h3>
            <img src="https://i.imgur.com/b8CcGDj.png" alt="Cover SK BUMDesa" className="w-32 h-40 mx-auto mb-2" />
            <a href="/path/to/sk-bumdesa.pdf" className="text-blue-500">Lihat Dokumen</a>
          </div>
          <div className="col-span-1 text-center">
            <h3>AD dan ART</h3>
            <img src="https://i.imgur.com/ysXbDPs.png" alt="Cover Anggaran Dasar" className="w-32 h-40 mx-auto mb-2" />
            <a href="/path/to/anggaran-dasar.pdf" className="text-blue-500">Lihat Dokumen</a>
          </div>
          <div className="col-span-1 text-center">
            <h3>Akta Pendirian</h3>
            <img src="https://i.imgur.com/AaPv8W7.png" alt="Cover Akta Pendirian" className="w-32 h-40 mx-auto mb-2" />
            <a href="/path/to/akta-pendirian.pdf" className="text-blue-500">Lihat Dokumen</a>
          </div>
          <div className="col-span-1 text-center">
            <h3>AHU</h3>
            <img src="https://i.imgur.com/0UKtkjn.png" alt="Cover AHU" className="w-32 h-40 mx-auto mb-2" />
            <a href="/path/to/ahu.pdf" className="text-blue-500">Lihat Dokumen</a>
          </div>
          <div className="col-span-1 text-center">
            <h3>NIB</h3>
            <img src="https://i.imgur.com/L3qvJYx.png" alt="Cover NIB" className="w-32 h-40 mx-auto mb-2" />
            <a href="/path/to/nib.pdf" className="text-blue-500">Lihat Dokumen</a>
          </div>
        </div>

        {/* Pengurus */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pengurusList.map((pengurus, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center"
            >
              <img
                src={pengurus.foto}
                alt={pengurus.nama}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover pt-0"
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
      </div>
    </section>
  );
};

export default ManajemenProfil;

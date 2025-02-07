import { Target, Users, TrendingUp } from 'lucide-react';

const About = () => {
  return (
    <section id="tentang" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Tentang Kami</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            BUMDesa Peramas Mandiri hadir untuk mendorong ekonomi desa dan kesejahteraan masyarakat
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Target className="h-12 w-12 text-green-600 dark:text-green-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Visi</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Menjadi BUMDesa terdepan dalam pengembangan ekonomi desa yang mandiri dan berkelanjutan
            </p>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Users className="h-12 w-12 text-green-600 dark:text-green-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Misi</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Memberikan layanan terbaik untuk masyarakat desa dan mendorong pertumbuhan ekonomi lokal
            </p>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-4">
              <TrendingUp className="h-12 w-12 text-green-600 dark:text-green-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Tujuan</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Meningkatkan kesejahteraan masyarakat desa melalui pengembangan usaha dan layanan berkualitas
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
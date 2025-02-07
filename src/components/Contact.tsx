import { MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
  return (
    <section id="kontak" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Hubungi Kami</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Silakan hubungi kami untuk informasi lebih lanjut
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Kirim Pesan</h3>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                  Nama
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-green-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Nama Anda"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-green-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="email@example.com"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                  Pesan
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-green-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  rows={4}
                  placeholder="Tulis pesan Anda"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
              >
                Kirim Pesan
              </button>
            </form>
          </div>

          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Informasi Kontak</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-green-600 dark:text-green-500 mr-4" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Alamat</h4>
                  <p className="text-gray-600 dark:text-gray-300">Jl. M Nuur Sei Gali kode pos 78852, Desa Pangkalan Buton, Kecamatan Sukadana, Kabupaten Kayong Utara</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-6 w-6 text-green-600 dark:text-green-500 mr-4" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Telepon</h4>
                  <p className="text-gray-600 dark:text-gray-300">+62 813 4999 3773</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-green-600 dark:text-green-500 mr-4" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Email</h4>
                  <p className="text-gray-600 dark:text-gray-300">peramasmandiri@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
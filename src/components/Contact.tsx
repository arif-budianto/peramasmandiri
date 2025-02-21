import { MapPin, Phone, Mail } from "lucide-react";
import { useState, FormEvent } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    pesan: ""
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const subject = `Pesan dari ${formData.nama} melalui Website Peramas Mandiri`;
    const body = `Nama: ${formData.nama}
Email: ${formData.email}

Pesan:
${formData.pesan}`;

    window.location.href = `mailto:peramasmandiri@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Reset form
    setFormData({
      nama: "",
      email: "",
      pesan: ""
    });
  };

  return (
    <section
      id="kontak"
      className="py-20 bg-gray-50 dark:bg-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 tracking-wide">
            Hubungi Kami
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Silakan hubungi kami untuk informasi lebih lanjut
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Kontak */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 transition transform hover:-translate-y-1 hover:shadow-2xl">
              <h3 className="text-xl font-semibold mb-6 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                Kirim Pesan
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                    Nama
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    placeholder="Nama Anda"
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                    Pesan
                  </label>
                  <textarea
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    rows={4}
                    placeholder="Tulis pesan Anda"
                    value={formData.pesan}
                    onChange={(e) => setFormData({ ...formData, pesan: e.target.value })}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg font-medium hover:from-green-700 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02]"
                >
                  Kirim Pesan
                </button>
              </form>
            </div>
          </div>

          {/* Informasi Kontak */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 transition transform hover:-translate-y-1 hover:shadow-2xl">
              <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                Informasi Kontak
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-16 w-16 text-green-600 dark:text-green-500 mr-4" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Alamat
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Jl. M Nuur Sei Gali kode pos 78852, Desa Pangkalan Buton,
                      Kecamatan Sukadana, Kabupaten Kayong Utara
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-green-600 dark:text-green-500 mr-4" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Telepon
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      +62 813 4999 3773
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-green-600 dark:text-green-500 mr-4" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Email
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      peramasmandiri@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Peta Lokasi */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 h-full transition transform hover:-translate-y-1 hover:shadow-2xl">
              <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                Lokasi Kami
              </h3>
              <div className="h-[400px] w-full rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6720.858086997912!2d109.9650903768026!3d-1.2383894987498054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e049892025f9787%3A0xed6b31c9368e9448!2sKantor%20Desa%20Pangkalan%20Buton!5e1!3m2!1sid!2sid!4v1739038681248!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

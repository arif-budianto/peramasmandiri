const Hero = () => {
  return (
    <div id="beranda" className="pt-16">
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/2131650/pexels-photo-2131650.jpeg"
            alt="Village landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex flex-col justify-center h-full">
            <div className="text-white mb-8">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                BUMDesa Peramas Mandiri
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                Melayani Kebutuhan Desa, Membangun Ekonomi Bersama
              </p>
              <a
                href="#layanan"
                className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition duration-300"
              >
                Lihat Layanan Kami
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
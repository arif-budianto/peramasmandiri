const Hero = () => {
  return (
    <div id="beranda" className="pt-16">
      <div className="relative h-[600px]">
        <div className="absolute inset-0">
          <img
            src="https://plus.unsplash.com/premium_photo-1661964030420-15481be20d5f?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Village landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center h-full">
            <div className="text-white">
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
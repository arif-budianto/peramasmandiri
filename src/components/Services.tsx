import { Tent, Tractor, Wifi } from 'lucide-react';

const services = [
  {
    icon: <Tent className="h-12 w-12 text-green-600 dark:text-green-500 cursor-pointer" />,
    title: 'Penyewaan Tenda & Kursi',
    description: 'Solusi lengkap untuk berbagai acara Anda. Tersedia berbagai ukuran tenda dan kursi berkualitas.',
    image: 'src/img/Tenda.jpeg'
  },
  {
    icon: <Tractor className="h-12 w-12 text-green-600 dark:text-green-500 cursor-pointer" />,
    title: 'Penyewaan Combine Harvester',
    description: 'Tingkatkan efisiensi panen dengan mesin pemanen modern dan operator berpengalaman.',
    image: 'src/img/combine.jpeg'
  },
  {
    icon: <Wifi className="h-12 w-12 text-green-600 dark:text-green-500 cursor-pointer" />,
    title: 'Layanan Internet Desa',
    description: 'Koneksi internet cepat dan stabil untuk kebutuhan digital masyarakat desa.',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  }
];

const Services = () => {
  return (
    <section id="layanan" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Layanan Kami</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">Berbagai layanan untuk memenuhi kebutuhan masyarakat desa</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transform hover:scale-110 transition duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
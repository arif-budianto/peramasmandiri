import { useState } from 'react';
import { Tent, Tractor, Wifi, X } from 'lucide-react';

type GalleryItem = {
  type: 'image' | 'video';
  url: string;
  caption: string;
};

type ServiceType = {
  icon: JSX.Element;
  title: string;
  description: string;
  image: string;
  gallery: GalleryItem[];
};

const services: ServiceType[] = [
  {
    icon: <Tent className="h-12 w-12 text-green-600 dark:text-green-500" />,
    title: 'Penyewaan Tenda & Kursi',
    description: 'Solusi lengkap untuk berbagai acara Anda. Tersedia berbagai ukuran tenda dan kursi berkualitas.',
    image: 'https://drive.google.com/uc?export=view&id=1c4-fGN9o5j4zyL1uuE1ASyB65bsQS3uf',
    gallery: [
      { type: 'image', url: '/src/img/Tenda.jpeg', caption: 'Kursi Pernikahan' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80', caption: 'Setup Kursi Event' }
    ]
  },
  {
    icon: <Tractor className="h-12 w-12 text-green-600 dark:text-yellow-500" />,
    title: 'Penyewaan Combine Harvester',
    description: 'Membantu petani dengan alat pertanian modern dan efisien untuk meningkatkan hasil panen.',
    image: '/src/img/combine.jpeg',
    gallery: [
      { type: 'image', url: '/src/img/combine.jpeg', caption: 'Traktor di Ladang' },
      { type: 'video', url: 'https://drive.google.com/file/d/1JGYlZixZwJ3IO706idu5Ydd6Xfqspm5N/view?usp=sharing', caption: 'Demonstrasi Penggunaan Traktor' }
    ]
  },
  {
    icon: <Wifi className="h-12 w-12 text-green-600 dark:text-blue-500" />,
    title: 'Layanan Internet Desa',
    description: 'Konektivitas internet cepat dan stabil untuk masyarakat desa dengan harga terjangkau.',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    gallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80', caption: 'Internet Desa' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80', caption: 'Warga Menggunakan Internet' }
    ]
  }
];

type GalleryProps = {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceType | null;
};

const Gallery: React.FC<GalleryProps> = ({ isOpen, onClose, service }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  if (!isOpen || !service) return null;
  const activeItem = service.gallery[activeIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
      <div className="relative w-full max-w-6xl bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="p-6">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{service.title}</h3>
          
          <div className="aspect-video w-full mb-4 bg-black rounded-lg overflow-hidden">
            {activeItem.type === 'image' ? (
              <img src={activeItem.url} alt={activeItem.caption} className="w-full h-full object-contain" />
            ) : (
              <iframe src={activeItem.url} className="w-full h-full" allowFullScreen />
            )}
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-4">{activeItem.caption}</p>

          <div className="grid grid-cols-4 gap-4">
            {service.gallery.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`relative aspect-video rounded-lg overflow-hidden ${
                  activeIndex === index ? 'ring-2 ring-green-500' : ''
                }`}
              >
                {item.type === 'image' ? (
                  <img src={item.url} alt={item.caption} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                    <span className="text-white">Video</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);

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
              <button
                onClick={() => setSelectedService(service)}
                className="w-full h-48 overflow-hidden"
              >
                <img src={service.image} alt={service.title} className="w-full h-full object-cover transform hover:scale-110 transition duration-500" />
              </button>
              <div className="p-6">
                <div className="flex justify-center mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Gallery isOpen={selectedService !== null} onClose={() => setSelectedService(null)} service={selectedService} />
    </section>
  );
};

export default Services;

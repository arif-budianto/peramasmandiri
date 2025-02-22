import { useState, useEffect } from 'react';

interface WaktuSholat {
  nama: string;
  countdown: string;
}

interface HariBesar {
  nama: string;
  tanggal: string;
  countdown: string;
}

interface HariBesarTetap {
  nama: string;
  bulan: number;
  tanggal: number;
}

interface HariBesarData {
  nama: string;
  tanggal: string;
}

type HariBesarList = HariBesarData[];

// Jadwal waktu sholat (WIB)
const jadwalSholat = {
  subuh: { nama: 'Subuh', jam: 4, menit: 45 },
  dzuhur: { nama: 'Dzuhur', jam: 12, menit: 15 },
  ashar: { nama: 'Ashar', jam: 15, menit: 30 },
  maghrib: { nama: 'Maghrib', jam: 18, menit: 30 },
  isya: { nama: 'Isya', jam: 19, menit: 45 }
};

// Fungsi untuk menghitung tanggal hari besar berdasarkan tahun
const getHariBesarTahunan = (tahun: number) => {
  // Data dasar 2025
  const baseYear = 2025;
  
  // Hari raya dengan tanggal tetap
  const tanggalTetap: HariBesarTetap[] = [
    { nama: 'Tahun Baru', bulan: 1, tanggal: 1 },
    { nama: 'Hari Raya Natal', bulan: 12, tanggal: 25 },
    { nama: 'Hari Kemerdekaan', bulan: 8, tanggal: 17 },
    { nama: 'Hari Buruh', bulan: 5, tanggal: 1 }
  ];

  // Hari raya Islam 2025 sebagai basis
  const islamicHolidays2025: HariBesarData[] = [
    { nama: 'Isra Miraj', tanggal: '2025-01-27' },
    { nama: 'Malam Nisfu Syaban', tanggal: '2025-02-14' },
    { nama: 'Awal Ramadhan', tanggal: '2025-03-01' },
    { nama: 'Idul Fitri', tanggal: '2025-03-31' },
    { nama: 'Idul Adha', tanggal: '2025-06-06' },
    { nama: 'Tahun Baru Islam', tanggal: '2025-06-27' },
    { nama: 'Maulid Nabi', tanggal: '2025-09-05' }
  ];

  // Hari raya lainnya 2025 sebagai basis
  const otherHolidays2025: HariBesarData[] = [
    { nama: 'Tahun Baru Imlek', tanggal: '2025-01-29' },
    { nama: 'Hari Raya Nyepi', tanggal: '2025-03-29' },
    { nama: 'Hari Raya Waisak', tanggal: '2025-05-13' },
    { nama: 'Hari Raya Galungan', tanggal: '2025-04-16' },
    { nama: 'Hari Raya Kuningan', tanggal: '2025-04-26' }
  ];

  const hariBesar: HariBesarList = [];

  // Tambahkan hari raya dengan tanggal tetap
  tanggalTetap.forEach(hari => {
    hariBesar.push({
      nama: hari.nama,
      tanggal: `${tahun}-${String(hari.bulan).padStart(2, '0')}-${String(hari.tanggal).padStart(2, '0')}`
    });
  });

  // Hitung hari raya Islam untuk tahun yang diminta
  // Rata-rata tahun Hijriah bergeser 11 hari lebih awal di kalender Masehi
  if (tahun > baseYear) {
    const yearDiff = tahun - baseYear;
    islamicHolidays2025.forEach(hari => {
      const date = new Date(hari.tanggal);
      date.setDate(date.getDate() - (yearDiff * 11));
      hariBesar.push({
        nama: hari.nama,
        tanggal: date.toISOString().split('T')[0]
      });
    });
  } else if (tahun < baseYear) {
    const yearDiff = baseYear - tahun;
    islamicHolidays2025.forEach(hari => {
      const date = new Date(hari.tanggal);
      date.setDate(date.getDate() + (yearDiff * 11));
      hariBesar.push({
        nama: hari.nama,
        tanggal: date.toISOString().split('T')[0]
      });
    });
  } else {
    islamicHolidays2025.forEach(hari => {
      hariBesar.push({
        nama: hari.nama,
        tanggal: hari.tanggal
      });
    });
  }

  // Hitung hari raya lainnya untuk tahun yang diminta
  // Rata-rata kalender lunar bergeser sekitar 10 hari per tahun
  if (tahun > baseYear) {
    const yearDiff = tahun - baseYear;
    otherHolidays2025.forEach(hari => {
      const date = new Date(hari.tanggal);
      date.setDate(date.getDate() - (yearDiff * 10));
      hariBesar.push({
        nama: hari.nama,
        tanggal: date.toISOString().split('T')[0]
      });
    });
  } else if (tahun < baseYear) {
    const yearDiff = baseYear - tahun;
    otherHolidays2025.forEach(hari => {
      const date = new Date(hari.tanggal);
      date.setDate(date.getDate() + (yearDiff * 10));
      hariBesar.push({
        nama: hari.nama,
        tanggal: date.toISOString().split('T')[0]
      });
    });
  } else {
    otherHolidays2025.forEach(hari => {
      hariBesar.push({ ...hari });
    });
  }

  return hariBesar.sort((a, b) => new Date(a.tanggal).getTime() - new Date(b.tanggal).getTime());
};

const getWaktuSholatBerikutnya = () => {
  try {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;

    const waktuSholatList = Object.values(jadwalSholat).map(sholat => ({
      ...sholat,
      totalMenit: sholat.jam * 60 + sholat.menit
    }));

    const waktuBerikutnya = waktuSholatList.find(sholat => 
      sholat.totalMenit > currentTime
    );

    if (!waktuBerikutnya) {
      const besok = new Date(now);
      besok.setDate(besok.getDate() + 1);
      besok.setHours(waktuSholatList[0].jam, waktuSholatList[0].menit, 0, 0);
      return {
        ...waktuSholatList[0],
        target: besok
      };
    }

    const target = new Date(now);
    target.setHours(waktuBerikutnya.jam, waktuBerikutnya.menit, 0, 0);

    return {
      ...waktuBerikutnya,
      target
    };
  } catch (error) {
    console.error('Error in getWaktuSholatBerikutnya:', error);
    return null;
  }
};

const formatCountdown = (diff: number): string => {
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return `${hours}j ${minutes}m ${seconds}d`;
};

const getHariBesarBerikutnya = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  
  // Dapatkan daftar hari besar untuk tahun ini
  let hariBesarList = getHariBesarTahunan(currentYear);
  
  // Cari hari besar berikutnya di tahun ini
  const hariBesarBerikutnya = hariBesarList.find(hari => {
    const tanggal = new Date(hari.tanggal);
    return tanggal.getTime() > now.getTime();
  });

  // Jika tidak ada hari besar tersisa di tahun ini
  // ambil hari besar pertama tahun depan
  if (!hariBesarBerikutnya) {
    const nextYearHolidays = getHariBesarTahunan(currentYear + 1);
    return nextYearHolidays[0];
  }

  // Format nama hari besar dengan tahun
  return {
    ...hariBesarBerikutnya,
    nama: `${hariBesarBerikutnya.nama} ${new Date(hariBesarBerikutnya.tanggal).getFullYear()}`
  };
};

const Hero = () => {
  const [waktuSholat, setWaktuSholat] = useState<WaktuSholat>({
    nama: 'Loading...',
    countdown: '00:00:00'
  });

  const [hariBesar, setHariBesar] = useState<HariBesar>({
    nama: 'Loading...',
    tanggal: '',
    countdown: '00:00:00'
  });

  useEffect(() => {
    const timer = setInterval(() => {
      updateWaktuSholat();
      updateHariBesar();
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const updateWaktuSholat = () => {
    try {
      const nextSholat = getWaktuSholatBerikutnya();
      
      if (!nextSholat || !nextSholat.target) {
        throw new Error('Tidak dapat menentukan waktu sholat berikutnya');
      }

      const now = new Date().getTime();
      const diff = nextSholat.target.getTime() - now;
      
      if (diff < 0) {
        throw new Error('Waktu sholat sudah lewat');
      }

      setWaktuSholat({
        nama: nextSholat.nama,
        countdown: formatCountdown(diff)
      });
    } catch (error) {
      console.error('Error updating waktu sholat:', error);
      setWaktuSholat({
        nama: 'Error',
        countdown: '00j 00m 00d'
      });
    }
  };

  const updateHariBesar = () => {
    try {
      const nextHariBesar = getHariBesarBerikutnya();
      const now = new Date();
      const target = new Date(nextHariBesar.tanggal);
      const diff = target.getTime() - now.getTime();

      if (diff < 0) {
        throw new Error('Tanggal sudah lewat');
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setHariBesar({
        nama: nextHariBesar.nama,
        tanggal: nextHariBesar.tanggal,
        countdown: `${days}h ${hours}j ${minutes}m ${seconds}d`
      });
    } catch (error) {
      console.error('Error updating hari besar:', error);
      setHariBesar(prev => ({
        ...prev,
        countdown: '0h 0j 0m 0d'
      }));
    }
  };

  const TimerCard: React.FC<{
    title: string;
    name: string;
    time: string;
  }> = ({ title, name, time }) => (
    <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg text-center border border-green-500/30 hover:border-green-500/50 transition-all duration-300">
      <h3 className="text-base md:text-lg font-semibold mb-2 text-green-400">{title}</h3>
      <p className="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-green-500 to-white bg-clip-text text-transparent">{name}</p>
      <p className="text-2xl md:text-3xl font-mono tracking-wider text-white">{time}</p>
    </div>
  );

  return (
    <div id="beranda" className="pt-16">
      <div className="relative h-[600px] md:h-[700px]">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/2131650/pexels-photo-2131650.jpeg"
            alt="Village landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        <div className="relative h-full">
          {/* Hero Content Container */}
          <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-full flex flex-col">
              {/* Main Content */}
              <div className="flex-1 flex items-center">
                <div className="text-white w-full">
                  <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-500 to-white bg-clip-text text-transparent animate-gradient">
                    BUMDesa Peramas Mandiri
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl mb-6">
                    Melayani Kebutuhan Desa, Membangun Ekonomi Bersama
                  </p>
                  <a
                    href="#katalog"
                    className="inline-block bg-green-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-lg text-base md:text-lg font-semibold hover:bg-green-700 transition duration-300"
                  >
                    Lihat Layanan Kami
                  </a>
                </div>
              </div>

              {/* Timer Cards */}
              <div className="w-full pb-8">
                <div className="max-w-4xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TimerCard title="Menuju Waktu Sholat" name={waktuSholat.nama} time={waktuSholat.countdown} />
                    <TimerCard title="Menuju Hari Besar" name={hariBesar.nama} time={hariBesar.countdown} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

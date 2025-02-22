import { useState, useEffect, useCallback, memo } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  isSameDay
} from 'date-fns';

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

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  hariBesar: HariBesarData[];
}

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

// Komponen CalendarModal
const CalendarModal = memo(({ isOpen, onClose, hariBesar: daftarHariBesar }: CalendarModalProps) => {
  if (!isOpen) return null;

  const currentYear = new Date().getFullYear();
  const months = Array.from({ length: 12 }, (_, i) => new Date(currentYear, i));

  const getCalendarDays = useCallback((date: Date) => {
    const start = startOfWeek(startOfMonth(date), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(date), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, []);

  const getDayName = useCallback((day: number): string => {
    const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    return days[day];
  }, []);

  const renderCalendarDays = useCallback((month: Date, hariBesarBulanIni: HariBesarData[]) => {
    const days = getCalendarDays(month);
    const dayHeaders = [1, 2, 3, 4, 5, 6, 0].map(day => (
      <div key={day} className="text-center font-semibold text-gray-600 dark:text-gray-400 text-sm py-2">
        {getDayName(day)}
      </div>
    ));

    const calendarDays = days.map(day => {
      const isCurrentMonth = day.getMonth() === month.getMonth();
      const hariBesarToday = hariBesarBulanIni.find(hb => 
        isSameDay(new Date(hb.tanggal), day)
      );

      return (
        <div
          key={day.toISOString()}
          className={`
            p-2 text-center relative min-h-[40px]
            ${isCurrentMonth ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}
            ${hariBesarToday ? 'bg-green-50 dark:bg-green-900/20' : 'bg-white dark:bg-gray-800'}
          `}
        >
          <span className={`text-sm ${hariBesarToday ? 'font-bold text-green-600 dark:text-green-400' : 'text-inherit'}`}>{format(day, 'd')}</span>
        </div>
      );
    });
    return { dayHeaders, calendarDays };
  }, [getCalendarDays, getDayName]);

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-start justify-center p-4"
         onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full h-[90vh] my-8 flex flex-col"
           onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Kalender Nasional {currentYear}</h2>  
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {months.map((month, index) => {
              const hariBesarBulanIni = daftarHariBesar.filter(hari => {
                const tanggal = new Date(hari.tanggal);
                return tanggal.getMonth() === index;
              });

              return (
                <div key={index} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                    {format(month, 'MMMM yyyy')}
                  </h3>
                  
                  <div className="mb-4">
                    <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700">
                      {renderCalendarDays(month, hariBesarBulanIni).dayHeaders}
                    </div>
                    <div className="grid grid-cols-7 gap-px bg-white dark:bg-gray-800">
                      {renderCalendarDays(month, hariBesarBulanIni).calendarDays}</div>
                  </div>

                  {hariBesarBulanIni.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Hari Besar:</h4>
                      {hariBesarBulanIni.map((hari, idx) => {
                        const tanggal = new Date(hari.tanggal);
                        return (
                          <div
                            key={idx}
                            className="flex items-center bg-green-50 dark:bg-green-900/20 p-2 rounded-md border-l-4 border-green-500"
                          >
                            <div className="mr-3 text-lg font-bold text-green-600">
                              {format(tanggal, 'd')}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-800 dark:text-gray-100">
                                {hari.nama}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {format(tanggal, 'EEEE')}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {hariBesarBulanIni.length === 0 && (
                    <div className="text-sm text-gray-500 dark:text-gray-400">Tidak ada hari besar di bulan ini</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});

const Hero = () => {
  const [waktuSholat, setWaktuSholat] = useState<WaktuSholat>({
    nama: 'Loading...',
    countdown: '00:00:00'
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const [hariBesar, setHariBesar] = useState<HariBesar>({
    nama: 'Loading...',
    tanggal: '',
    countdown: '00:00:00'
  });

  const [daftarHariBesar, setDaftarHariBesar] = useState<HariBesarData[]>([]);

  useEffect(() => {
    // Get initial hari besar list
    const currentYear = new Date().getFullYear();
    const hariBesarList = getHariBesarTahunan(currentYear);
    setDaftarHariBesar(hariBesarList);

    const timer = setInterval(() => {
      updateWaktuSholat();
      updateHariBesar();
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleHariBesarClick = () => {
    setIsCalendarOpen(true);
  };

  const TimerCard: React.FC<{
    title: string;
    name: string;
    time: string;
    onClick?: () => void;
  }> = ({ title, name, time, onClick }) => (
    <div 
      className={`
        bg-white/10 backdrop-blur-md p-4 rounded-lg text-center 
        border border-green-500/30 hover:border-green-500/50 
        transition-all duration-300
        ${onClick ? 'cursor-pointer' : ''}
      `}
      onClick={onClick}
    >
      <h3 className="text-base md:text-lg font-semibold mb-2 text-green-400">{title}</h3>
      <p className="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-green-500 to-white bg-clip-text text-transparent">{name}</p>
      <p className="text-2xl md:text-3xl font-mono tracking-wider text-white">{time}</p>
    </div>
  );

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
                    <TimerCard title="Menuju Hari Besar" name={hariBesar.nama} time={hariBesar.countdown} onClick={handleHariBesarClick} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <CalendarModal 
            isOpen={isCalendarOpen} 
            onClose={() => setIsCalendarOpen(false)}
            hariBesar={daftarHariBesar}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;

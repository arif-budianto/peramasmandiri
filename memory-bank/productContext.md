## Project Overview
BUMDesa Peramas Mandiri Website

## Features

### Hero Section
1. Landing View
   - Judul dan tagline
   - Background image dengan overlay
   - CTA button untuk layanan

2. Timer System
   - Timer Waktu Sholat
     * Menampilkan countdown ke waktu sholat berikutnya
     * Format waktu dalam bahasa Indonesia
     * Auto-update setiap detik
     * Transisi smooth antar perubahan waktu
   
   - Timer Hari Besar Nasional
     * Sistem hari besar komprehensif mencakup:
       - Hari raya Islam (Isra Miraj, Ramadhan, Idul Fitri, dll)
       - Hari raya Hindu (Galungan, Kuningan, Nyepi)
       - Hari raya Buddha (Waisak)
       - Hari raya Kristen (Natal)
       - Hari raya lainnya (Imlek)
       - Hari nasional (Tahun Baru, Kemerdekaan, Hari Buruh)
     * Sistem perhitungan otomatis untuk tahun-tahun mendatang
     * Pergantian otomatis ke hari besar berikutnya
     * Format lengkap countdown (hari, jam, menit, detik)
     * Penambahan tahun pada nama hari besar

3. Responsive Design
   - Mobile-first approach
   - Breakpoint optimization
   - Dynamic layout adjustments
   - Font scaling system

## Technical Stack
- React with TypeScript
- Tailwind CSS for styling
- useState for state management
- useEffect for timer logic
- Custom date calculation system

## Design System
- Colors:
  * Primary: Green (#10B981)
  * Text: White
  * Overlay: Black (50% opacity)
  * Accent: Green gradient

- Typography:
  * Headings: 3xl to 6xl (responsive)
  * Body: lg to 2xl (responsive)
  * Timer: Custom mono font
  * Holiday names: Gradient text

- Spacing:
  * Consistent padding/margin system
  * Responsive gaps
  * Container max-width

## Date Calculation System
1. Kategori Tanggal
   - Tanggal Tetap: Menggunakan tanggal yang sama setiap tahun
   - Kalender Hijriah: Pergeseran 11 hari per tahun
   - Kalender Lunar: Pergeseran 10 hari per tahun

2. Mekanisme Perhitungan
   - Basis tahun 2025
   - Kalkulasi otomatis untuk tahun-tahun berikutnya
   - Sistem pergantian tahun otomatis

3. Data Management
   - Array terstruktur untuk setiap kategori
   - Sorting berdasarkan tanggal
   - Type safety dengan TypeScript

## Future Improvements
1. Integration Points
   - API waktu sholat
   - Sumber data resmi kalender nasional
   - User location services

2. Enhanced Features
   - Notifikasi waktu sholat dan hari besar
   - Kalender visual interaktif
   - Multiple timezone support
   - Preferensi hari besar yang dapat disesuaikan

3. Performance Optimization
   - Caching sistem waktu sholat
   - Optimasi perhitungan tanggal
   - Lazy loading komponen
   - Image optimization

4. Accuracy Improvements
   - Validasi perhitungan dengan sumber resmi
   - Penyesuaian berdasarkan lokasi geografis
   - Peningkatan akurasi kalender lunar
   - Sinkronisasi dengan kalender nasional
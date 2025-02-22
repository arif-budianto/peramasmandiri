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

   - Modal Kalender Nasional
     * Tampilan kalender visual untuk seluruh tahun
     * Grid layout responsif (3 kolom desktop, 1 kolom mobile)
     * Highlight otomatis untuk tanggal dengan hari besar
     * Daftar detail hari besar per bulan
     * Navigasi smooth dengan scrolling
     * Interaksi modal yang optimal
     * Header bulan dan hari dalam Bahasa Indonesia

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
- date-fns untuk manipulasi tanggal
- React.memo untuk optimasi performa

## Design System
- Colors:
  * Primary: Green (#10B981)
  * Text: White
  * Overlay: Black (50% opacity)
  * Accent: Green gradient
  * Calendar:
    - Background: White
    - Highlight: Light green (#F0FDF4)
    - Border: Green (30% opacity)

- Typography:
  * Headings: 3xl to 6xl (responsive)
  * Body: lg to 2xl (responsive)
  * Timer: Custom mono font
  * Holiday names: Gradient text
  * Calendar:
    - Day names: Semi-bold gray
    - Dates: Regular & bold for holidays
    - Month names: Bold gray

- Spacing:
  * Consistent padding/margin system
  * Responsive gaps
  * Container max-width
  * Modal padding and margins
  * Grid gaps for calendar

## Date Calculation System
1. Kategori Tanggal
   - Tanggal Tetap: Menggunakan tanggal yang sama setiap tahun
   - Kalender Hijriah: Pergeseran 11 hari per tahun
   - Kalender Lunar: Pergeseran 10 hari per tahun

2. Mekanisme Perhitungan
   - Basis tahun 2025
   - Kalkulasi otomatis untuk tahun-tahun berikutnya
   - Sistem pergantian tahun otomatis
   - Perhitungan grid kalender menggunakan date-fns

3. Data Management
   - Array terstruktur untuk setiap kategori
   - Sorting berdasarkan tanggal
   - Type safety dengan TypeScript
   - Memoization untuk kalkulasi kalender

## User Interface Components
1. Calendar Modal
   - Struktur:
     * Modal overlay dengan background semi-transparan
     * Container utama dengan max-height 90vh
     * Header sticky dengan judul dan tombol close
     * Content area dengan scrolling independen
   
   - Grid Kalender:
     * Header hari dalam bahasa Indonesia
     * Grid 7x6 untuk tanggal
     * Highlight untuk hari besar
     * Daftar detail hari besar
   
   - Interaksi:
     * Click outside untuk menutup
     * Smooth scrolling
     * Proper event delegation

## Future Improvements
1. Integration Points
   - API waktu sholat
   - Sumber data resmi kalender nasional
   - User location services

2. Enhanced Features
   - Notifikasi waktu sholat dan hari besar
   - Filter kategori hari besar dalam kalender
   - Multiple timezone support
   - Preferensi hari besar yang dapat disesuaikan
   - Ekspor kalender ke format lain

3. Performance Optimization
   - Caching sistem waktu sholat
   - Optimasi perhitungan tanggal
   - Lazy loading komponen
   - Image optimization
   - Virtual scrolling untuk kalender

4. Accuracy Improvements
   - Validasi perhitungan dengan sumber resmi
   - Penyesuaian berdasarkan lokasi geografis
   - Peningkatan akurasi kalender lunar
   - Sinkronisasi dengan kalender nasional

5. UI/UX Enhancements
   - Animasi transisi modal
   - Fitur pencarian hari besar
   - Filter dan kategorisasi yang lebih detail
   - Preview hari besar saat hover
   - Integrasi dengan kalender sistem
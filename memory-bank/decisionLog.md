## [2025-02-22] - Implementasi Timer pada Hero Section

**Context:**
Kebutuhan untuk menampilkan dua timer di hero section website:
1. Timer untuk waktu sholat berikutnya
2. Timer untuk countdown menuju hari besar Islam

**Decisions:**
1. Layout dan Desain
   - Menggunakan grid system 2 kolom untuk desktop dan 1 kolom untuk mobile
   - Implementasi backdrop blur dengan transparansi untuk estetika modern
   - Penggunaan warna hijau sesuai tema website

2. Teknis Timer
   - Menggunakan state management dengan useState untuk tracking waktu
   - Implementasi interval 1 detik untuk update waktu real-time
   - Format waktu dalam bahasa Indonesia (j untuk jam, m untuk menit, d untuk detik)

3. Responsive Design
   - Menggunakan flexbox untuk positioning yang dinamis
   - Pengaturan font size yang responsif dengan breakpoint mobile dan desktop
   - Optimasi spacing untuk mencegah overlap konten

**Rationale:**
- Pemilihan layout grid memungkinkan penempatan timer yang seimbang dan rapi
- Penggunaan backdrop blur memberikan kesan modern dan tetap menjaga keterbacaan
- Format waktu dalam bahasa Indonesia untuk konsistensi dengan target pengguna
- Responsive design memastikan pengalaman pengguna yang baik di semua perangkat

**Implementation:**
- Timer waktu sholat:
  * Perhitungan otomatis waktu sholat berikutnya
  * Update countdown setiap detik
  * Handling pergantian hari

- Timer hari besar:
  * Countdown menuju Idul Fitri 2025
  * Format menampilkan hari, jam, menit, dan detik
  * Error handling untuk tanggal yang sudah lewat

**Future Considerations:**
1. Integrasi dengan API waktu sholat untuk akurasi lebih baik
2. Penambahan lebih banyak hari besar Islam
3. Sistem notifikasi saat waktu sholat tiba
4. Penyesuaian timezone berdasarkan lokasi pengguna
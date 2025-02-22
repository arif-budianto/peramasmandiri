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

## [2025-02-23] - Sistem Hari Besar Nasional Komprehensif

**Context:**
Kebutuhan untuk sistem hari besar yang mencakup semua hari besar nasional dan dapat memperbarui diri secara otomatis setiap tahun.

**Decisions:**
1. Data dan Kategorisasi
   - Pembagian hari besar menjadi tiga kategori:
     * Tanggal tetap (Tahun Baru, Natal, Kemerdekaan, dll)
     * Kalender Hijriah (hari raya Islam)
     * Kalender lunar lainnya (Imlek, Nyepi, Waisak, dll)
   - Penggunaan tahun 2025 sebagai tahun dasar untuk perhitungan

2. Sistem Perhitungan Otomatis
   - Tanggal tetap: menggunakan tanggal yang sama setiap tahun
   - Kalender Hijriah: pergeseran 11 hari lebih awal per tahun
   - Kalender lunar lainnya: pergeseran 10 hari lebih awal per tahun
   - Implementasi fungsi perhitungan yang dapat digunakan untuk tahun berapa saja

3. Mekanisme Pergantian Otomatis
   - Penggunaan array terurut berdasarkan tanggal
   - Pencarian hari besar terdekat yang belum lewat
   - Pergantian otomatis ke tahun berikutnya jika semua hari besar telah lewat

**Rationale:**
- Pembagian kategori memudahkan maintenance dan perhitungan
- Penggunaan tahun dasar 2025 karena data tersedia dan terkonfirmasi
- Pemilihan rata-rata pergeseran berdasarkan observasi historis
- Sistem pergantian otomatis menghilangkan kebutuhan update manual

**Implementation:**
- Struktur data:
  * Interface dan type yang jelas untuk type safety
  * Array terpisah untuk setiap kategori hari besar
  * Fungsi helper untuk perhitungan tanggal

- Sistem perhitungan:
  * Fungsi getHariBesarTahunan untuk menghitung semua tanggal
  * Fungsi getHariBesarBerikutnya untuk mencari hari besar terdekat
  * Format tanggal ISO untuk konsistensi

- Pergantian otomatis:
  * Pengecekan tanggal setiap detik
  * Pembaruan state ketika hari besar berganti
  * Penambahan tahun pada nama hari besar

## [2025-02-23] - Implementasi Modal Kalender Nasional

**Context:**
Kebutuhan untuk menampilkan kalender visual yang menunjukkan semua hari besar nasional dalam format yang mudah dibaca dan interaktif.

**Decisions:**
1. Arsitektur Komponen
   - Memisahkan CalendarModal sebagai komponen terpisah dari Hero
   - Menggunakan React.memo untuk mencegah render ulang yang tidak perlu
   - Memindahkan fungsi helper ke level komponen untuk optimasi performa

2. Layout dan Tampilan
   - Grid 3 kolom untuk desktop, 1 kolom untuk mobile
   - Tampilan kalender bulanan dengan grid 7 kolom untuk hari
   - Highlight khusus untuk tanggal yang memiliki hari besar
   - Daftar detail hari besar di bawah setiap kalender bulan

3. Penanganan Modal dan Scrolling
   - Menggunakan flex layout untuk struktur modal
   - Area konten dengan overflow-y-auto untuk scrolling
   - Event handling yang tepat untuk mencegah event bubbling
   - Struktur fixed untuk modal dengan tinggi maksimum 90vh

**Rationale:**
- Pemisahan komponen meningkatkan maintainability dan performa
- Grid layout memudahkan navigasi dan pembacaan kalender
- Struktur flex dengan overflow yang tepat menyelesaikan masalah scrolling
- Event handling yang proper mencegah interaksi yang tidak diinginkan

**Implementation:**
- Modal structure:
  * Container utama dengan fixed positioning
  * Header yang selalu visible
  * Content area dengan scrolling independent
  * Proper event delegation

- Kalendar rendering:
  * Perhitungan hari dalam bulan menggunakan date-fns
  * Grid system untuk layout hari dan tanggal
  * Styling khusus untuk tanggal dengan hari besar
  * Daftar detail yang informatif

- Optimasi performa:
  * Memoization untuk fungsi-fungsi kalkulasi
  * Lazy loading untuk modal content
  * Proper cleanup pada unmount

**Future Considerations:**
1. Penambahan animasi untuk transisi modal
2. Filter hari besar berdasarkan kategori
3. Opsi untuk ekspor kalender ke format lain
4. Integrasi dengan kalender sistem
5. Fitur pencarian hari besar
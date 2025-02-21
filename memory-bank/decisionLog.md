# Log Keputusan Arsitektur

## 21 Februari 2025 - Implementasi Form Pemesanan Layanan

**Konteks:** Perlu mengimplementasikan sistem pemesanan yang mudah digunakan dan efektif untuk menghubungkan pelanggan dengan layanan BUMDesa.

**Keputusan:** Mengimplementasikan modal form dengan integrasi WhatsApp untuk pemesanan layanan.

**Rasional:** 
- WhatsApp adalah platform komunikasi yang umum digunakan di Indonesia
- Modal form memberikan pengalaman pengguna yang lebih baik daripada redirect langsung
- Pengumpulan informasi terstruktur sebelum mengirim pesan ke WhatsApp
- DatePicker memudahkan pemilihan tanggal dengan format yang konsisten

**Implementasi:**
- Menggunakan React state untuk manajemen modal dan form data
- Implementasi react-datepicker untuk pemilihan tanggal
- Format pesan WhatsApp yang terstruktur dengan data form
- Validasi form untuk memastikan kelengkapan data

## 21 Februari 2025 - Sistem Pengiriman Pesan Kontak

**Konteks:** Perlu menyediakan cara yang mudah bagi pengunjung website untuk menghubungi BUMDesa melalui email.

**Keputusan:** Menggunakan mailto link dengan format email terstruktur untuk pengiriman pesan.

**Rasional:**
- Mailto link bekerja dengan aplikasi email default pengguna
- Tidak memerlukan backend atau konfigurasi server email
- Format email terstruktur memudahkan pengelolaan pesan
- Solusi sederhana namun efektif untuk kebutuhan kontak

**Implementasi:**
- Form validasi dengan required fields
- Format subject dan body email yang terstruktur
- Reset form setelah pengiriman
- Integrasi langsung dengan email BUMDesa (peramasmandiri@gmail.com)
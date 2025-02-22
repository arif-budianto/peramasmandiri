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
   
   - Timer Hari Besar Islam
     * Countdown menuju hari besar terdekat
     * Format lengkap (hari, jam, menit, detik)
     * Support untuk multiple hari besar

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

- Spacing:
  * Consistent padding/margin system
  * Responsive gaps
  * Container max-width

## Future Improvements
1. Integration Points
   - API waktu sholat
   - Database hari besar Islam
   - User location services

2. Enhanced Features
   - Notifikasi waktu sholat
   - Customizable hari besar
   - Multiple timezone support

3. Performance Optimization
   - Caching sistem waktu sholat
   - Lazy loading komponen
   - Image optimization
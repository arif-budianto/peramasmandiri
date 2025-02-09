import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GalleryKegiatan from './components/GalleryKegiatan';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ManajemenProfil from './components/ManajemenProfil';
import KatalogLayanan from './components/KatalogLayanan';
import BeritaPengumuman from './components/BeritaPengumuman';
import LaporanKeuangan from './components/LaporanKeuangan';
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <Hero />
      <ManajemenProfil />
      <KatalogLayanan />
      <GalleryKegiatan />
      <BeritaPengumuman />
      <LaporanKeuangan />
      <Contact />
      <Analytics />
      <Footer />
    </div>
  );
}

export default App;
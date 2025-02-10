import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GalleryKegiatan from './components/GalleryKegiatan';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ManajemenProfil from './components/ManajemenProfil';
import KatalogLayanan from './components/KatalogLayanan';
import BeritaPengumuman from './components/BeritaPengumuman';
import DetailPengumuman from './components/DetailPengumuman';
import { daftarBerita } from './components/BeritaPengumuman';
import { Analytics } from "@vercel/analytics/react";

const DetailPengumumanWrapper = () => {
  const { id } = useParams();
  const pengumuman = daftarBerita.find(item => item.id === id);

  if (!pengumuman) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center text-red-500 dark:text-red-400">
          <h2 className="text-2xl font-bold mb-2">Pengumuman tidak ditemukan</h2>
          <p>Maaf, pengumuman yang Anda cari tidak tersedia.</p>
        </div>
      </div>
    );
  }

  return <DetailPengumuman {...pengumuman} />;
};

const HomePage = () => (
  <>
    <Hero />
    <ManajemenProfil />
    <KatalogLayanan />
    <GalleryKegiatan />
    <BeritaPengumuman />
    <Contact />
  </>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pengumuman/:id" element={<DetailPengumumanWrapper />} />
        </Routes>
        <Analytics />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
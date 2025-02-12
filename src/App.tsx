import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GalleryKegiatan from './components/GalleryKegiatan';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ManajemenProfil from './components/ManajemenProfil';
import KatalogLayanan from './components/KatalogLayanan';
import BeritaPengumuman from './components/BeritaPengumuman';
import BeritaDetail from './components/BeritaDetail';
import SemuaBerita from './components/SemuaBerita';
import { Analytics } from "@vercel/analytics/react";

import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';



const HomePage = () => (
  <div className="bg-white dark:bg-gray-900">
    <Hero />
    <ManajemenProfil />
    <KatalogLayanan />
    <BeritaPengumuman />
    <GalleryKegiatan />
    <Contact />
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profil" element={<ManajemenProfil />} />
            <Route path="/katalog" element={<KatalogLayanan />} />

            <Route path="/pengumuman/:slug" element={<BeritaDetail />} />
            <Route path="/berita/:slug" element={<BeritaDetail />} />
            <Route path="/semua-berita" element={<SemuaBerita />} />
          </Routes>
          <Footer />
          <Analytics />
          <Toaster position="top-right" />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
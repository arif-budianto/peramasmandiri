import { useState, useEffect } from 'react';
import { Menu, X, Building2, Sun, Moon } from 'lucide-react';
import { useScrollToSection } from '../hooks/useScrollToSection';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const scrollToSection = useScrollToSection();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Building2 className="h-8 w-8 text-green-600 dark:text-green-500" />
            <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white">BUMDesa Peramas Mandiri</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#beranda" onClick={(e) => scrollToSection(e, 'beranda')} className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500">Beranda</a>
            <a href="#profil" onClick={(e) => scrollToSection(e, 'profil')} className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500">Profil</a>
            <a href="#katalog" onClick={(e) => scrollToSection(e, 'katalog')} className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500">Katalog</a>
            <a href="#layanan" onClick={(e) => scrollToSection(e, 'layanan')} className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500">Gallery</a>
            <a href="#berita" onClick={(e) => scrollToSection(e, 'berita')} className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500">Berita</a>
            <a href="#laporan" onClick={(e) => scrollToSection(e, 'laporan')} className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500">Laporan</a>
            <a href="#kontak" onClick={(e) => scrollToSection(e, 'kontak')} className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500">Kontak</a>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed inset-0 bg-gray-800 bg-opacity-50 ${isOpen ? 'block' : 'hidden'}`}>
        <div className="bg-white dark:bg-gray-800 h-screen w-screen p-4 bg-opacity-60 backdrop-blur-lg">
          <div className="flex justify-end">
            <button onClick={() => setIsOpen(false)} className="text-gray-600 dark:text-gray-300">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col space-y-8 mt-8 text-center font-bold">
            <a href="#beranda" onClick={(e) => { scrollToSection(e, 'beranda'); setIsOpen(false); }} className="text-gray-600 dark:text-gray-300">Beranda</a>
            <a href="#profil" onClick={(e) => { scrollToSection(e, 'profil'); setIsOpen(false); }} className="text-gray-600 dark:text-gray-300">Profil</a>
            <a href="#katalog" onClick={(e) => { scrollToSection(e, 'katalog'); setIsOpen(false); }} className="text-gray-600 dark:text-gray-300">Katalog</a>
            <a href="#layanan" onClick={(e) => { scrollToSection(e, 'layanan'); setIsOpen(false); }} className="text-gray-600 dark:text-gray-300">Gallery</a>
            <a href="#berita" onClick={(e) => { scrollToSection(e, 'berita'); setIsOpen(false); }} className="text-gray-600 dark:text-gray-300">Berita</a>
            <a href="#laporan" onClick={(e) => { scrollToSection(e, 'laporan'); setIsOpen(false); }} className="text-gray-600 dark:text-gray-300">Laporan</a>
            <a href="#kontak" onClick={(e) => { scrollToSection(e, 'kontak'); setIsOpen(false); }} className="text-gray-600 dark:text-gray-300">Kontak</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
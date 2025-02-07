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
            <a href="#layanan" onClick={(e) => scrollToSection(e, 'layanan')} className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500">Layanan</a>
            <a href="#tentang" onClick={(e) => scrollToSection(e, 'tentang')} className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500">Tentang</a>
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
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-800">
            <a href="#beranda" onClick={(e) => { scrollToSection(e, 'beranda'); setIsOpen(false); }} className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500">Beranda</a>
            <a href="#layanan" onClick={(e) => { scrollToSection(e, 'layanan'); setIsOpen(false); }} className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500">Layanan</a>
            <a href="#tentang" onClick={(e) => { scrollToSection(e, 'tentang'); setIsOpen(false); }} className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500">Tentang</a>
            <a href="#kontak" onClick={(e) => { scrollToSection(e, 'kontak'); setIsOpen(false); }} className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500">Kontak</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
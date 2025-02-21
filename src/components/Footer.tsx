import { Building2, Facebook, Instagram, Twitter } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useScrollToSection } from "../hooks/useScrollToSection";

const Footer = () => {
  const scrollToSection = useScrollToSection();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    section: string
  ) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
      // Add small delay to ensure navigation completes before scrolling
      setTimeout(() => {
        const element = document.getElementById(section);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      scrollToSection(e, section);
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Building2 className="h-8 w-8 text-green-500" />
              <span className="ml-2 text-xl font-bold">
                BUMDesa Peramas Mandiri
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Melayani kebutuhan masyarakat desa dengan berbagai layanan
              berkualitas untuk mendorong pertumbuhan ekonomi lokal.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                className="text-gray-400 hover:text-white"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://instagram.com"
                className="text-gray-400 hover:text-white"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-400 hover:text-white"
              >
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Layanan</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#katalog"
                  onClick={(e) => handleNavigation(e, "katalog")}
                  className="text-gray-400 hover:text-white"
                >
                  Penyewaan Tenda & Kursi
                </a>
              </li>
              <li>
                <a
                  href="#katalog"
                  onClick={(e) => handleNavigation(e, "katalog")}
                  className="text-gray-400 hover:text-white"
                >
                  Penyewaan Combine Harvester
                </a>
              </li>
              <li>
                <a
                  href="#katalog"
                  onClick={(e) => handleNavigation(e, "katalog")}
                  className="text-gray-400 hover:text-white"
                >
                  Layanan Internet Desa
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Tautan</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#beranda"
                  onClick={(e) => handleNavigation(e, "beranda")}
                  className="text-gray-400 hover:text-white"
                >
                  Beranda
                </a>
              </li>
              <li>
                <a
                  href="#profil"
                  onClick={(e) => handleNavigation(e, "profil")}
                  className="text-gray-400 hover:text-white"
                >
                  Profil
                </a>
              </li>
              <li>
                <a
                  href="#berita"
                  onClick={(e) => handleNavigation(e, "berita")}
                  className="text-gray-400 hover:text-white"
                >
                  Berita
                </a>
              </li>
              <li>
                <a
                  href="#galeri"
                  onClick={(e) => handleNavigation(e, "galeri")}
                  className="text-gray-400 hover:text-white"
                >
                  Galeri
                </a>
              </li>
              <li>
                <a
                  href="#kontak"
                  onClick={(e) => handleNavigation(e, "kontak")}
                  className="text-gray-400 hover:text-white"
                >
                  Kontak
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            {new Date().getFullYear()} BUMDesa Peramas Mandiri. All rights
            reserved.
            <br />
            Created by{" "}
            <a
              href="http://arifbudianto.peramasmandiri.net"
              target="_blank"
              rel="noopener noreferrer"
            >
              ARIFBUDIANTO
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

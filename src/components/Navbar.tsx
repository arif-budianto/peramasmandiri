import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import Login from "./Login";
import { User } from "@supabase/supabase-js";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Building2, Sun, Moon } from "lucide-react";
import { useScrollToSection } from "../hooks/useScrollToSection";

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const scrollToSection = useScrollToSection();

  const handleNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
      // Tunggu sebentar untuk memastikan navigasi selesai sebelum scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      scrollToSection(e, sectionId);
    }
  };

  const toggleDarkMode = () => {
    const currentMode = localStorage.getItem("theme");
    const newMode = currentMode === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newMode);
    document.documentElement.classList.toggle("dark", newMode === "dark");
  };

  useEffect(() => {
    // Cek status autentikasi saat komponen dimount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Subscribe ke perubahan autentikasi
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  return (
    <>
      <nav className="bg-white dark:bg-gray-800 shadow-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <a
                href="/"
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500"
                onClick={() => window.location.reload()}
              >
                <Building2 className="h-8 w-8 text-green-600 dark:text-green-500" />
                <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white">
                  BUMDesa Peramas Mandiri
                </span>
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#beranda"
                onClick={(e) => handleNavigation(e, "beranda")}
                className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500"
              >
                Beranda
              </a>
              <a
                href="#profil"
                onClick={(e) => handleNavigation(e, "profil")}
                className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500"
              >
                Profil
              </a>
              <a
                href="#katalog"
                onClick={(e) => handleNavigation(e, "katalog")}
                className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500"
              >
                Katalog
              </a>
              <a
                href="#berita"
                onClick={(e) => handleNavigation(e, "berita")}
                className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500"
              >
                Berita
              </a>
              <a
                href="#galeri"
                onClick={(e) => handleNavigation(e, "galeri")}
                className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500"
              >
                Galeri
              </a>
              <a
                href="#kontak"
                onClick={(e) => handleNavigation(e, "kontak")}
                className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500"
              >
                Kontak
              </a>
              {user ? (
                <button
                  onClick={() => supabase.auth.signOut()}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Login
                </button>
              )}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                {localStorage.getItem("theme") === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                {localStorage.getItem("theme") === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-0 bg-gray-800 bg-opacity-50 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="bg-white dark:bg-gray-800 h-screen w-screen p-4 bg-opacity-60 backdrop-blur-lg">
            <div className="flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-600 dark:text-gray-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex flex-col space-y-8 mt-8 text-center font-bold">
              <a
                href="#beranda"
                onClick={(e) => {
                  handleNavigation(e, "beranda");
                  setIsOpen(false);
                }}
                className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500"
              >
                Beranda
              </a>
              <a
                href="#profil"
                onClick={(e) => {
                  handleNavigation(e, "profil");
                  setIsOpen(false);
                }}
                className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500"
              >
                Profil
              </a>
              <a
                href="#katalog"
                onClick={(e) => {
                  handleNavigation(e, "katalog");
                  setIsOpen(false);
                }}
                className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500"
              >
                Katalog
              </a>
              <a
                href="#berita"
                onClick={(e) => {
                  handleNavigation(e, "berita");
                  setIsOpen(false);
                }}
                className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500"
              >
                Berita
              </a>
              <a
                href="#galeri"
                onClick={(e) => {
                  handleNavigation(e, "galeri");
                  setIsOpen(false);
                }}
                className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500"
              >
                Galeri
              </a>
              <a
                href="#kontak"
                onClick={(e) => {
                  handleNavigation(e, "kontak");
                  setIsOpen(false);
                }}
                className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500"
              >
                Kontak
              </a>
              {user ? (
                <button
                  onClick={() => {
                    supabase.auth.signOut();
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mx-auto w-32"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsLoginOpen(true);
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mx-auto w-32"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

export default Navbar;

// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDarkBg, setIsDarkBg] = useState(false);
  const { t, i18n } = useTranslation();

  // Toggle mobile menu
  const toggleMenu = () => setMenuOpen((o) => !o);

  // Language change
  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
    setMenuOpen(false);
  };

  // Observe dark-bg sections
  useEffect(() => {
    const sections = document.querySelectorAll('.dark-bg');
    const visible = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        });
        setIsDarkBg(visible.size > 0);
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );
    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  // Header classes: always transparent bg; text color toggles
  const baseClass = 'fixed top-0 left-0 w-full z-50 backdrop-blur-md py-5 px-6 flex justify-between items-center transition-colors duration-300 bg-transparent';

  return (
    <header className={baseClass}>
      {/* Logo */}
      <Link to="/" className={`text-3xl font-extrabold tracking-tight transition-colors ${isDarkBg ? 'text-white' : 'text-black'} hover:opacity-80 cursor-pointer`}>
        AutoMR
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8">
        <nav className="flex gap-6 text-lg font-bold">
          <Link
            to="/"
            className={`text-xl tracking-wide transition-colors ${isDarkBg ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-700'}`}
          >
            {t('nav.home')}
          </Link>
          <Link
            to="/contact"
            className={`text-xl tracking-wide transition-colors ${isDarkBg ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-700'}`}
          >
            {t('nav.contact')}
          </Link>
        </nav>

        {/* Language Selector */}
        <div className="relative">
          <select
            onChange={changeLanguage}
            defaultValue={i18n.language}
            className={`appearance-none border rounded-md px-4 py-2 pr-8 text-sm font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
              isDarkBg ? 'bg-black text-white border-gray-700' : 'bg-white text-black border-gray-300'
            }`}
          >
            <option value="en">English</option>
            <option value="gr">Greek</option>
            <option value="bg">Bulgarian</option>
          </select>
          <div className={`pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 ${
            isDarkBg ? 'text-gray-300' : 'text-gray-500'
          }`}>▼</div>
        </div>
      </div>

      {/* Mobile Toggle */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className={`text-3xl transition-colors ${isDarkBg ? 'text-white' : 'text-black'}`}
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#1D3A6C] text-white shadow-md flex flex-col items-start px-6 py-4 gap-4 md:hidden transition-all">
          <Link
            to="/"
            className="text-lg font-semibold tracking-wide hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            {t('nav.home')}
          </Link>
          <Link
            to="/contact"
            className="text-lg font-semibold tracking-wide hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            {t('nav.contact')}
          </Link>
          <select
            onChange={changeLanguage}
            defaultValue={i18n.language}
            className="bg-white text-black border-none rounded-md px-4 py-2 w-full focus:outline-none"
          >
            <option value="en">English</option>
            <option value="gr">Greek</option>
            <option value="bg">Bulgarian</option>
          </select>
        </div>
      )}
    </header>
  );
}

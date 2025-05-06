import { Link } from 'react-router-dom';
import { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const changeLanguage = (e) => i18n.changeLanguage(e.target.value);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md py-5 px-6 flex justify-between items-center border-b border-white/10 transition-all">
      <h1 className="text-3xl font-extrabold text-primary tracking-tight">AutoMR</h1>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8">
        <nav className="flex gap-6 text-lg font-bold text-neutral-900">
          <Link to="/" className="hover:text-primary transition-colors text-xl tracking-wide">
            {t('nav.home')}
          </Link>
          <Link to="/contact" className="hover:text-primary transition-colors text-xl tracking-wide">
            {t('nav.contact')}
          </Link>
        </nav>
        <div className="relative">
          <select
            onChange={changeLanguage}
            className="appearance-none bg-white border border-gray-300 text-sm font-semibold rounded-md px-4 py-2 text-neutral-800 shadow-md focus:outline-none focus:ring-2 focus:ring-primary pr-8"
            defaultValue={i18n.language}
          >
            <option value="en">English</option>
            <option value="gr">Greek</option>
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">▼</div>
        </div>
      </div>

      {/* Mobile Toggle */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-3xl text-neutral-900">
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#1D3A6C] text-white shadow-md flex flex-col items-start px-6 py-4 gap-4 md:hidden transition-all">
          <Link to="/" className="text-lg font-semibold tracking-wide hover:underline" onClick={() => setMenuOpen(false)}>
            {t('nav.home')}
          </Link>
          <Link to="/contact" className="text-lg font-semibold tracking-wide hover:underline" onClick={() => setMenuOpen(false)}>
            {t('nav.contact')}
          </Link>
          <select
            onChange={changeLanguage}
            className="bg-white text-black border-none rounded-md px-4 py-2 w-full focus:outline-none"
            defaultValue={i18n.language}
          >
            <option value="en">English</option>
            <option value="gr">Greek</option>
          </select>
        </div>
      )}
    </header>
  );
}

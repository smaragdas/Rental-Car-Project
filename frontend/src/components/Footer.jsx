import { useTranslation } from 'react-i18next';
import logo from '../assets/blacklogo.png';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#f4f4f4] py-4 px-6 text-black font-inter w-full">
      <div className="flex flex-col md:flex-row justify-between items-center w-full mb-3 gap-4">
        <div className="text-left w-full md:w-1/3">
          <p className="text-sm font-semibold text-gray-600">{t('footer.connect')}<sup>®</sup></p>
          <a href="mailto:auto.mercedes21@gmail.com" className="text-lg font-bold underline hover:text-blue-600 transition">
            auto.mercedes21@gmail.com
          </a>
        </div>

        <div className="flex items-center gap-3 justify-center w-full md:w-1/3">
          <img src={logo} alt="AutoMr Logo Car" className="w-20 h-auto object-contain" />
          <span className="text-3xl font-extrabold">AutoMr</span>
        </div>

        <div className="flex justify-end items-center w-full md:w-1/3 text-sm">
          <a href="#top" className="text-base font-semibold hover:underline text-black">
            ⤴ {t('footer.backToTop')}
          </a>
        </div>
      </div>

      <div className="border-t pt-2 text-xs text-gray-500 text-left w-full">
        &copy; {new Date().getFullYear()} AutoMr
      </div>
    </footer>
  );
}

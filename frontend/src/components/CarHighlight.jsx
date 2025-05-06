import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import carImage from '../assets/2020-MB-E_Class-MLP-Hero.png.avif';

export default function CarHighlight() {
  const { t } = useTranslation();

  return (
    <section className="py-32 px-8 bg-white text-black">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="flex justify-center">
          <img src={carImage} alt="Mercedes-Benz E200" className="w-full max-w-lg object-contain" />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}>
          <h2 className="text-5xl sm:text-6xl font-extrabold mb-6">{t('carHighlight.title')}</h2>
          <h3 className="text-3xl font-semibold mb-4">{t('carHighlight.subtitle')}</h3>
          <p className="text-gray-700 text-lg mb-8 leading-relaxed">{t('carHighlight.description')}</p>
          <div className="flex items-center gap-3 text-blue-600 text-xl">
            <span>★★★★★</span>
            <span className="text-gray-700 text-base">{t('carHighlight.rating')}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

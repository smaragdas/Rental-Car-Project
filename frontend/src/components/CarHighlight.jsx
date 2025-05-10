import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import carImage from '../assets/2020-MB-E_Class-MLP-Hero.png.avif';

export default function CarHighlight() {
  const { t } = useTranslation();

  return (
    <section className="py-20 px-4 sm:px-6 bg-white text-black font-inter">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        
        {/* Car Image */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <img
            src={carImage}
            alt="Mercedes-Benz E200"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md object-contain"
          />
        </motion.div>

        {/* Text Section */}
        <motion.div
          className="w-full md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-snug break-words">
            {t('carHighlight.title')}
          </h2>
          <h3 className="text-xl sm:text-2xl font-semibold mb-3">{t('carHighlight.subtitle')}</h3>
          <p className="text-gray-700 text-base sm:text-lg mb-6 leading-relaxed">
            {t('carHighlight.description')}
          </p>
          <div className="flex items-center justify-center md:justify-start gap-2 text-blue-600 text-lg">
            <span>★★★★★</span>
            <span className="text-gray-700 text-sm">{t('carHighlight.rating')}</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom'; // <-- Added

export default function PremiumExplanation() {
  const { t } = useTranslation();
  const navigate = useNavigate(); // <-- Added

  return (
    <motion.section
      className="min-h-screen flex items-center justify-center bg-white px-4 text-black text-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="w-full max-w-7xl">
        <h2 className="text-3xl sm:text-5xl font-bold leading-snug sm:leading-[1.4] mb-8 tracking-tight font-sans">
          {t('premium.description')}
        </h2>
        <div className="flex justify-center">
          <button
            onClick={() => navigate('/booking')} // <-- Navigate on click
            className="mt-4 px-6 py-3 bg-black text-white text-base sm:text-lg font-medium rounded-full hover:bg-gray-800 transition duration-300"
          >
            {t('button.book')}
          </button>
        </div>
      </div>
    </motion.section>
  );
}

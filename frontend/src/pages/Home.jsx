import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import CarHighlight from '../components/CarHighlight';
import PremiumPlan from '../components/PremiumPlan';
import PremiumExplanation from '../components/PremiumExplanation';
import PoliciesGrid from '../components/PoliciesGrid';
import RentalTerms from '../components/RentalTerms';
import FaqSection from '../components/FaqSection';
import heroBg from '../assets/hero.jpg';
import interiorImage from '../assets/interior.png';

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const heroSlogan = t('hero.slogan').split('.'); // ["Drive in Style", " Rent with Confidence"]

  return (
    <>
      {/* Hero Section */}
      <motion.section
        className="relative w-full h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundPosition: 'center 20%',
        }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-black/50 transition-all duration-700" />

        <div className="relative z-10 flex flex-col justify-center h-full px-8 max-w-7xl mx-auto text-center items-center">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white/80 text-6xl font-extrabold leading-tight mb-6 tracking-tight"
          >
            {heroSlogan[0]}.
            <br />
            {heroSlogan[1]}
          </motion.h1>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/booking')}
            className="mt-6 px-8 py-3 bg-white text-black font-bold rounded-full shadow hover:bg-black hover:text-white transition-all"
          >
            {t('button.book')} →
          </motion.button>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
        <CarHighlight />
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
        <PremiumPlan />
      </motion.section>

      <motion.section
        className="w-full h-[100vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${interiorImage})` }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      />

      <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
        <PremiumExplanation />
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
        <PoliciesGrid />
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
        <RentalTerms />
        <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <FaqSection />
        </motion.section>
      </motion.section>
    </>
  );
}

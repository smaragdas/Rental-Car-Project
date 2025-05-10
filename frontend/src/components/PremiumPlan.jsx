import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom'; // <-- import navigation
=======
import { useNavigate } from 'react-router-dom';
>>>>>>> f75c3fea7c71f3b4390d4e28c1757205d2af77cd
import heroBg from '../assets/hero.jpg';

export default function PremiumPlan() {
  const { t } = useTranslation();
<<<<<<< HEAD
  const navigate = useNavigate(); // <-- set up navigation
=======
  const navigate = useNavigate();

  const features1 = t('premiumPlan.features1', { returnObjects: true });
  const features2 = t('premiumPlan.features2', { returnObjects: true });
>>>>>>> f75c3fea7c71f3b4390d4e28c1757205d2af77cd

  return (
    <section className="bg-white py-24 px-6 text-center">
      <div className="max-w-6xl mx-auto">
<<<<<<< HEAD
        <h2 className="text-4xl sm:text-6xl font-extrabold text-black mb-4">
=======
        <h2 className="text-7xl font-extrabold text-black mb-4">
>>>>>>> f75c3fea7c71f3b4390d4e28c1757205d2af77cd
          {t('premiumPlan.title')}
        </h2>
        <p className="text-gray-700 text-lg mb-8">
          {t('premiumPlan.subtitle')}
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
<<<<<<< HEAD
          onClick={() => navigate('/booking')} // <-- navigate on click
          className="mt-6 px-8 py-3 bg-white text-black font-bold rounded-full shadow hover:bg-black hover:text-white transition-all"
        >
          {t('button.book')} →
=======
          onClick={() => navigate('/booking')}
          className="mt-6 px-8 py-3 bg-white text-black font-bold rounded-full shadow hover:bg-black hover:text-white transition-all"
        >
          {t('button.book')}
>>>>>>> f75c3fea7c71f3b4390d4e28c1757205d2af77cd
        </motion.button>

        <div className="relative overflow-hidden rounded-2xl max-w-6xl mx-auto shadow-lg mt-16">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${heroBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
<<<<<<< HEAD
              filter: 'brightness(30%)',
=======
              filter: 'brightness(30%)'
>>>>>>> f75c3fea7c71f3b4390d4e28c1757205d2af77cd
            }}
          />
          <div className="relative z-10 bg-black/60 backdrop-blur-sm rounded-2xl p-10 text-white text-center">
            <div className="mb-10">
              <h3 className="text-4xl font-extrabold mb-2">
                {t('premiumPlan.price')}
              </h3>
              <p className="text-gray-300 max-w-xl mx-auto text-sm leading-relaxed">
                {t('premiumPlan.description')}
              </p>
            </div>

            <h4 className="text-white font-semibold text-lg mb-6">
              {t('premiumPlan.included')}
            </h4>

            <div className="grid sm:grid-cols-2 gap-6 text-sm text-gray-300 text-left max-w-4xl mx-auto">
              <ul className="space-y-2">
<<<<<<< HEAD
                {t('premiumPlan.features1', { returnObjects: true }).map((item, i) => (
=======
                {features1.map((item, i) => (
>>>>>>> f75c3fea7c71f3b4390d4e28c1757205d2af77cd
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-500 text-lg">✔</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <ul className="space-y-2">
<<<<<<< HEAD
                {t('premiumPlan.features2', { returnObjects: true }).map((item, i) => (
=======
                {features2.map((item, i) => (
>>>>>>> f75c3fea7c71f3b4390d4e28c1757205d2af77cd
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-500 text-lg">✔</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function PoliciesGrid() {
  const { t } = useTranslation();

  return (
    <motion.section
      className="py-24 px-6 bg-black text-white font-inter"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-y-16 gap-x-20">
        {[
          ['policy.lateTitle', 'policy.late'],
          ['policy.cleanTitle', 'policy.clean'],
          ['policy.minRentalTitle', 'policy.minRental'],
          ['policy.fuelTitle', 'policy.fuel'],
          ['policy.smokePetsTitle', 'policy.smokePets'],
          ['policy.trafficTitle', 'policy.traffic'],
        ].map(([titleKey, descKey], i) => (
          <div key={i}>
            <h4 className="text-xl font-semibold mb-2">{t(titleKey)}</h4>
            <p className="text-lg text-gray-300 leading-relaxed">{t(descKey)}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

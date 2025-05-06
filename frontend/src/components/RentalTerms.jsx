import { motion } from 'framer-motion';
import { FaIdCard, FaCreditCard, FaPassport, FaClipboardList, FaUser } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

export default function RentalTerms() {
  const { t } = useTranslation();

  return (
    <motion.section
      className="bg-[#FAFAFA] py-20 px-6 text-black"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
        {/* Left Column */}
        <div className="flex-1">
          <h3 className="text-3xl font-extrabold mb-6 leading-tight">{t('terms.title')}</h3>
          <div className="border-t border-gray-300 pt-6 space-y-4">
            {[t('terms.fullInsurance'), t('terms.airportPickup')].map((text, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-3 h-3 rounded-full bg-blue-600 mt-1" />
                <p className="text-base leading-snug">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1 space-y-5">
          {[
            { icon: <FaIdCard />, title: 'terms.licenseTitle', desc: 'terms.licenseDesc' },
            { icon: <FaCreditCard />, title: 'terms.cardTitle', desc: 'terms.cardDesc' },
            { icon: <FaPassport />, title: 'terms.passportTitle', desc: 'terms.passportDesc' },
            { icon: <FaClipboardList />, title: 'terms.reservationTitle', desc: 'terms.reservationDesc' },
            { icon: <FaUser />, title: 'terms.ageTitle', desc: 'terms.ageDesc' },
          ].map(({ icon, title, desc }, i) => (
            <div key={i} className="bg-white shadow-sm p-5 rounded-xl flex items-start gap-4">
              <div className="mt-1 text-xl text-gray-600">{icon}</div>
              <div>
                <h4 className="font-semibold text-base">{t(title)}</h4>
                <p className="text-sm text-gray-700">{t(desc)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

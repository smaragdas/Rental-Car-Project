import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);
  const { t } = useTranslation();
  const faqData = t('faq.items', { returnObjects: true });

  const toggleIndex = (index) => setActiveIndex(index === activeIndex ? null : index);

  return (
    <section className="w-full bg-white text-black px-4 sm:px-8 lg:px-16 py-20">
      <div className="w-full max-w-screen-xl mx-auto">
        <div className="grid md:grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2 text-left font-semibold">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-blue-600 rounded-full" />
              <span>{t('faq.label')}</span>
            </div>
          </div>

          <div className="col-span-12 md:col-span-10">
            {faqData.map((item, index) => (
              <div key={item.id} className="border-t border-gray-200 py-6 cursor-pointer" onClick={() => toggleIndex(index)}>
                <div className="flex justify-between items-center text-base sm:text-lg font-medium text-gray-800">
                  <div className="flex gap-6 items-center w-full">
                    <span className="text-gray-500 text-sm">{item.id}</span>
                    <span>{item.question}</span>
                  </div>
                  <span className="text-xl font-light">{activeIndex === index ? '✕' : '+'}</span>
                </div>

                <AnimatePresence initial={false}>
                  {activeIndex === index && (
                    <motion.div className="pt-4 pr-2 text-sm sm:text-base text-gray-600" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5 }}>
                      {item.answer.split('\n').map((line, i) => (
                        <p key={i} className="mb-3 leading-relaxed">{line}</p>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

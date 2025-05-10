import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import gr from './locales/gr.json';
<<<<<<< HEAD
import bg from './locales/bg.json';
=======
>>>>>>> f75c3fea7c71f3b4390d4e28c1757205d2af77cd

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
<<<<<<< HEAD
    gr: { translation: gr },
    bg: { translation: bg }
=======
    gr: { translation: gr }
>>>>>>> f75c3fea7c71f3b4390d4e28c1757205d2af77cd
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;

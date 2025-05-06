import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section className="bg-white text-black px-6 pt-20 pb-32 min-h-screen w-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid grid-cols-12 mb-10">
          <div className="col-span-12 md:col-span-2 flex items-center gap-2 font-semibold">
            <span className="w-3 h-3 rounded-full bg-blue-600" />
            {t('contact.fillForm')}
          </div>
          <div className="col-span-12 md:col-span-8 text-center text-sm text-gray-500">
            {t('contact.letUsKnow')}
          </div>
          <div className="col-span-12 md:col-span-2 text-right text-sm text-gray-500">
            ©2025
          </div>
        </div>

        {/* Title */}
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">
          {t('contact.title')}
        </h2>

        {/* Content: Map + Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left - Map and Info */}
          <div>
            <iframe
              title="AutoMR Location"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12130.790145139914!2d22.991839!3d40.526176!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a83f003d20c6d3%3A0xd86e89f570ae5c00!2sThessCar4u!5e0!3m2!1sen!2sus!4v1746193424519!5m2!1sen!2sus"
              className="rounded-md w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px]"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            <div className="mt-6 text-sm space-y-2 font-medium">
              <p>Phone : +30 6977405939</p>
              <p>Instagram: AutoMr</p>
              <p>Facebook: AutoMr-Rental Cars</p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-4">
              <a
                href="#"
                className="w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-black transition"
                aria-label="Instagram"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-black transition"
                aria-label="Facebook"
              >
                <FaFacebookF className="text-xl" />
              </a>
            </div>
          </div>

          {/* Right - Form */}
          <form className="space-y-4">
            <input
              type="text"
              placeholder={t('contact.name')}
              className="w-full px-4 py-3 bg-gray-100 text-sm rounded-md outline-none"
              required
            />
            <input
              type="email"
              placeholder={t('contact.email')}
              className="w-full px-4 py-3 bg-gray-100 text-sm rounded-md outline-none"
              required
            />
            <textarea
              placeholder={t('contact.message')}
              rows="5"
              className="w-full px-4 py-3 bg-gray-100 text-sm rounded-md outline-none"
              required
            />
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition font-semibold"
            >
              {t('contact.submit')}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

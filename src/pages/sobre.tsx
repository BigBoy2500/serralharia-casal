import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';

export default function Sobre() {
  const { t } = useTranslation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <>
      <Head>
        <title>{t('nav.about')} - Serralharia Casal</title>
        <meta name="description" content={t('about.metaDescription')} />
      </Head>

      <Header />

      <main className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
            {t('about.heading')}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative h-[400px]">
              <Image
                src="/images/sobre.jpeg"
                alt={t('about.imageAlt')}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">{t('about.subheading')}</h2>
              <p className="text-gray-600 mb-4">{t('about.p1')}</p>
              <p className="text-gray-600 mb-4">{t('about.p2')}</p>
              <p className="text-gray-600 mb-4 font-bold">{t('about.callToAction')}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-2">{t('about.mission.title')}</h3>
              <p className="text-gray-600">{t('about.mission.text')}</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-4xl mb-4">👁️</div>
              <h3 className="text-xl font-bold mb-2">{t('about.vision.title')}</h3>
              <p className="text-gray-600">{t('about.vision.text')}</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-bold mb-2">{t('about.values.title')}</h3>
              <p className="text-gray-600">{t('about.values.text')}</p>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">{t('about.statsTitle')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">+1000</div>
                <p className="text-gray-600">{t('about.stats.projects')}</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">+500</div>
                <p className="text-gray-600">{t('about.stats.clients')}</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">20+</div>
                <p className="text-gray-600">{t('about.stats.experience')}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageModal from '../components/ImageModal';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null);
  const { t } = useTranslation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

if (!isClient) return null;

  const rawServicos = t('services', { returnObjects: true });
  const rawTrabalhos = t('trabalhos', { returnObjects: true });

  const servicos = Array.isArray(rawServicos) ? rawServicos : [];
  const trabalhos = Array.isArray(rawTrabalhos) ? rawTrabalhos : [];

  const imagensServico = [
    '/images/servicos/ferro.jpg',
    '/images/servicos/aluminio.jpg',
    '/images/servicos/portao-seccionado.jpg',
    '/images/servicos/painel-sandwich.jpg'
  ];

  const imagensTrabalho = [
    '/images/trabalhos/esplanada-em-painel-sandwich.jpeg',
    '/images/trabalhos/ripado-em-tubo.jpeg',
    '/images/trabalhos/portao-de-correr.jpeg'
  ];

  return (
    <>
      <Head>
        <title>Serralharia Casal - {t('index.title')}</title>
        <meta
          name="description"
          content={t('index.metaDescription')}
        />
        <meta
          name="keywords"
          content={t('index.metaKeywords')}
        />
      </Head>

      <Header />

      <main>
        {/* Banner */}
        <section className="relative h-[600px]">
          <Image
            src="/images/banner.jpg"
            alt={t('index.bannerAlt')}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{t('hero.title')}</h1>
              <p className="text-xl md:text-2xl mb-8">{t('hero.subtitle')}</p>
              <Link
                href="/contacto"
                className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-md transition-colors duration-200"
              >
                {t('hero.cta')}
              </Link>
            </div>
          </div>
        </section>

        {/* Serviços */}
        <section className="section bg-gray-50">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {t('services.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {servicos.map((servico, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={imagensServico[index]}
                      alt={servico.titulo}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{servico.titulo}</h3>
                    <p className="text-gray-600">{servico.descricao}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Galeria de Trabalhos */}
        <section className="section">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {t('gallery.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {trabalhos.map((trabalho, index) => (
                <div
                  key={index}
                  className="group relative h-64 overflow-hidden rounded-lg cursor-pointer"
                  onClick={() => setSelectedImage({ url: imagensTrabalho[index], title: trabalho.titulo })}
                >
                  <Image
                    src={imagensTrabalho[index]}
                    alt={trabalho.titulo}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <h3 className="text-white text-xl font-bold">{trabalho.titulo}</h3>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                href="/trabalhos"
                className="inline-block bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-md transition-colors duration-200"
              >
                {t('gallery.cta')}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <ImageModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        imageUrl={selectedImage?.url || ''}
        title={selectedImage?.title || ''}
      />
    </>
  );
}

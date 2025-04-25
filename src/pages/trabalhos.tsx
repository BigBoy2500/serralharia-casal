import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageModal from '../components/ImageModal';

export default function Trabalhos() {
  const { t } = useTranslation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null);

  const rawObras = t('obras.itens', { returnObjects: true });
  const obras = Array.isArray(rawObras) ? rawObras : [];

  const rawDepoimentos = t('obras.depoimentos', { returnObjects: true });
  const depoimentos = Array.isArray(rawDepoimentos) ? rawDepoimentos : [];

  if (!isClient) return null;

  return (
    <>
      <Head>
        <title>{t('nav.projects')} - Serralharia Casal</title>
        <meta name="description" content={t('obras.metaDescription')} />
      </Head>

      <Header />

      <main className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
            {t('obras.title')}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {obras.map((trabalho, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => setSelectedImage({ url: trabalho.imagem, title: trabalho.titulo })}
              >
                <div className="relative h-64">
                  <Image
                    src={trabalho.imagem}
                    alt={trabalho.titulo}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 text-sm font-semibold text-primary bg-primary/10 rounded-full mb-2">
                    {trabalho.categoria}
                  </span>
                  <h2 className="text-xl font-bold mb-2">{trabalho.titulo}</h2>
                  <p className="text-gray-600">{trabalho.descricao}</p>
                </div>
              </div>
            ))}
          </div>

          <section className="mt-24">
            <h2 className="text-3xl font-bold text-center mb-12">
              {t('obras.testemunhosTitle')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {depoimentos.map((depoimento, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <div className="text-primary text-4xl mb-4">⭐⭐⭐⭐⭐</div>
                  <p className="text-gray-600 mb-4">"{depoimento.texto}"</p>
                  <p className="font-bold">- {depoimento.autor}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
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
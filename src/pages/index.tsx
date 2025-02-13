import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageModal from '../components/ImageModal';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null);

  const servicos = [
    {
      titulo: 'Trabalho em Ferro e Aço Inox',
      descricao: 'Fabricação e instalação de estruturas em ferro e aço inox para diversos fins.',
      imagem: '/images/servicos/ferro.jpg',
    },
    {
      titulo: 'Portões e Caixilharia em Alumínio',
      descricao: 'Soluções completas em portões soldados e caixilharia de alumínio.',
      imagem: '/images/servicos/aluminio.jpg',
    },
    {
      titulo: 'Portões Seccionados',
      descricao: 'Instalação e manutenção de todo o tipo de portões seccionados.',
      imagem: '/images/servicos/portao-seccionado.jpg',
    },
    {
      titulo: 'Coberturas em Painel Sandwich',
      descricao: 'Montagem de todo o tipo de coberturas em painel sandwich.',
      imagem: '/images/servicos/painel-sandwich.jpg',
    },
  ];

  const trabalhos = [
    {
      titulo: 'Esplanada em Painel Sandwich',
      imagem: '/images/trabalhos/esplanada-em-painel-sandwich.jpeg',
    },
    {
      titulo: 'Ripado em Tubo Galvanizado',
      imagem: '/images/trabalhos/ripado-em-tubo.jpeg',
    },
    {
      titulo: 'Portão de Correr',
      imagem: '/images/trabalhos/portao-de-correr.jpeg',
    },
  ];

  return (
    <>
      <Head>
        <title>Serralharia Casal - Especialistas em Ferro e Alumínio</title>
        <meta name="description" content="Serralharia Casal em Barcelos: 20+ anos de experiência em portões, estruturas metálicas, coberturas e alumínios. Peça já o seu orçamento gratuito!" />
        <meta name="keywords" content="serralharia barcelos, portões automáticos, estruturas metálicas, coberturas, alumínio, ferro, aço inox, orçamento grátis" />
      </Head>

      <Header />

      <main>
        {/* Banner */}
        <section className="relative h-[600px]">
          <Image
            src="/images/banner.jpg"
            alt="Serralharia Casal - Trabalhos em Ferro e Alumínio em Barcelos"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Qualidade e Precisão em Cada Projeto
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                Soluções personalizadas em ferro e alumínio
              </p>
              <Link
                href="/contacto"
                className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-md transition-colors duration-200"
              >
                Solicite um Orçamento
              </Link>
            </div>
          </div>
        </section>

        {/* Serviços */}
        <section className="section bg-gray-50">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Nossos Serviços
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {servicos.map((servico, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={servico.imagem}
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
              Trabalhos Realizados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {trabalhos.map((trabalho, index) => (
                <div
                  key={index}
                  className="group relative h-64 overflow-hidden rounded-lg cursor-pointer"
                  onClick={() => setSelectedImage({ url: trabalho.imagem, title: trabalho.titulo })}
                >
                  <Image
                    src={trabalho.imagem}
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
                Ver Todos os Trabalhos
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
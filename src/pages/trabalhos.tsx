import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageModal from '../components/ImageModal';

export default function Trabalhos() {
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null);

  const trabalhos = [
    {
      titulo: 'Viveiros para Aves',
      categoria: 'Estruturas',
      imagem: '/images/trabalhos/viveiros-em-rede.jpeg',
      descricao: 'Viveiros para aves em rede entrelaçada pintada a verde',
    },
    {
      titulo: 'Portão seccionado',
      categoria: 'Portões',
      imagem: '/images/trabalhos/portao-seccionado.jpeg',
      descricao: 'Portão seccionado com motor cor RAL 7016',
    },
    {
      titulo: 'Portão e Porta Pedonal',
      categoria: 'Portões',
      imagem: '/images/trabalhos/portao-e-porta-pedonal.jpeg',
      descricao: 'Portão e porta pedonal em ferro galvanizado',
    },
    {
      titulo: 'Esplanada em Painel Sandwich',
      categoria: 'Coberturas',
      imagem: '/images/trabalhos/esplanada-em-painel-sandwich.jpeg',
      descricao: 'Esplanada com fachada e cobertura em painel sandwich',
    },
    {
      titulo: 'Gradeamento',
      categoria: 'Proteções',
      imagem: '/images/trabalhos/grades.jpeg',
      descricao: 'Gradeamento em ferro para proteção',
    },
    {
      titulo: 'Estrutura em Ferro',
      categoria: 'Estruturas',
      imagem: '/images/trabalhos/estrutura.jpeg',
      descricao: 'Estrutura em ferro para colocação de elevador',
    },
    {
      titulo: 'Cobertura em Painel Sandwich',
      categoria: 'Coberturas',
      imagem: '/images/trabalhos/cobertura-painel-sandwich.jpeg',
      descricao: 'Telhado totalmente coberto com painel sandwich',
    },
    {
      titulo: 'Ripado em Tubo',
      categoria: 'Proteções',
      imagem: '/images/trabalhos/ripado-em-tubo.jpeg',
      descricao: 'Ripado em tubo galvanizado',
    },
    {
      titulo: 'Porta Pedonal',
      categoria: 'Portões',
      imagem: '/images/trabalhos/porta-pedonal.jpeg',
      descricao: 'Porta pedonal em ferro trabalhado',
    },
    {
      titulo: 'Porta Pedonal',
      categoria: 'Portões',
      imagem: '/images/trabalhos/porta-pedonal-2.jpeg',
      descricao: 'Porta pedonal em alumínio',
    },
    {
      titulo: 'Portão de Correr',
      categoria: 'Portões',
      imagem: '/images/trabalhos/portao-de-correr.jpeg',
      descricao: 'Portão de correr em alumínio',
    },
  ];

  return (
    <>
      <Head>
        <title>Nossos Trabalhos - Serralharia Casal</title>
        <meta name="description" content="Conheça alguns dos nossos trabalhos na Serralharia Casal" />
      </Head>

      <Header />

      <main className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Nossos Trabalhos
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {trabalhos.map((trabalho, index) => (
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

          {/* Seção de Depoimentos */}
          <section className="mt-24">
            <h2 className="text-3xl font-bold text-center mb-12">
              O que Nossos Clientes Dizem
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-primary text-4xl mb-4">⭐⭐⭐⭐⭐</div>
                <p className="text-gray-600 mb-4">
                  "Excelente trabalho! A equipa foi muito profissional e entregou o projeto
                  exatamente como planeado."
                </p>
                <p className="font-bold">- Cliente Anónimo</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-primary text-4xl mb-4">⭐⭐⭐⭐⭐</div>
                <p className="text-gray-600 mb-4">
                  "Ótimo atendimento e qualidade excecional no serviço. Cumpriram todos
                  os prazos estabelecidos."
                </p>
                <p className="font-bold">- Cliente Anónimo</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-primary text-4xl mb-4">⭐⭐⭐⭐⭐</div>
                <p className="text-gray-600 mb-4">
                  "Profissionais altamente qualificados. O resultado final superou as nossas
                  expectativas."
                </p>
                <p className="font-bold">- Cliente Anónimo</p>
              </div>
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
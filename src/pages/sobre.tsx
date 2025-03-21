import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Sobre() {
  return (
    <>
      <Head>
        <title>Sobre Nós - Serralharia Casal</title>
        <meta name="description" content="Conheça a história da Serralharia Casal" />
      </Head>

      <Header />

      <main className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Sobre Nós
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative h-[400px]">
              <Image
                src="/images/sobre.jpeg"
                alt="História da Serralharia"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Tradição e Inovação à mais de 20 anos</h2>
              <p className="text-gray-600 mb-4">
              A Serralharia Casal, fundada à mais de 20 anos, situa-se atualmente na freguesia de Aldreu no concelho de Barcelos.
              </p>
              <p className="text-gray-600 mb-4">
              Os nossos funcionários são profissionais, experientes e competentes. Executamos 
              trabalhos em alumínio, ferro e aço inox. Fabricamos toda a caixilharia em alumínio 
              e aço inox, estruturas metálicas, grades de segurança, coberturas em painel sandwich, 
              portões seccionados e todos os automatismos para a sua correta funcionalidade.
              </p>
              <p className="text-gray-600 mb-4 font-bold">
              Contacte-nos e peça já o seu orçamento!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-2">Missão</h3>
              <p className="text-gray-600">
                Oferecer soluções em serralharia com excelência, qualidade e compromisso com a
                satisfação dos nossos clientes.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-4xl mb-4">👁️</div>
              <h3 className="text-xl font-bold mb-2">Visão</h3>
              <p className="text-gray-600">
                Ser reconhecida como referência em qualidade e inovação no setor de serralharia
                em toda a região.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-bold mb-2">Valores</h3>
              <p className="text-gray-600">
                Qualidade, compromisso, inovação, ética e respeito são os pilares que guiam
                nosso trabalho diário.
              </p>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">Números que nos Orgulham</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">+1000</div>
                <p className="text-gray-600">Obras Realizadas</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">+500</div>
                <p className="text-gray-600">Clientes Satisfeitos</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">20+</div>
                <p className="text-gray-600">Anos de Experiência</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

 
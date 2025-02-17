import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import Head from 'next/head';
import Script from 'next/script';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Serralharia Casal - Soluções em Ferro e Alumínio em Barcelos</title>
        <meta name="description" content="Serralharia Casal em Barcelos - Especialistas em trabalhos com ferro, alumínio, portões, estruturas metálicas e muito mais. Mais de 20 anos de experiência." />
        <meta name="keywords" content="serralharia, serralharia casal, serralharia barcelos, portões, alumínio, ferro, estruturas metálicas, portões seccionados, coberturas" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Serralharia Casal" />
        <meta name="geo.region" content="PT-03" />
        <meta name="geo.placename" content="Barcelos" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Serralharia Casal - Soluções em Ferro e Alumínio em Barcelos" />
        <meta property="og:description" content="Serralharia Casal em Barcelos - Especialistas em trabalhos com ferro, alumínio, portões, estruturas metálicas e muito mais. Mais de 20 anos de experiência." />
        <meta property="og:url" content="https://www.serralhariacasal.pt" />
        <meta property="og:site_name" content="Serralharia Casal" />
        
        {/* Favicon básico */}
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        
        {/* Favicon PNG em vários tamanhos */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
        
        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        {/* Meta tags para dispositivos móveis */}
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-TileImage" content="/favicon-144x144.png" />
      </Head>

      {/* Google Analytics */}
      <Script async
        src="https://www.googletagmanager.com/gtag/js?id=G-0D4MB29C30"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-0D4MB29C30');
        `}
      </Script>

      <Component {...pageProps} />
    </>
  );
}

export default App; 
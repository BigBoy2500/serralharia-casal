import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import SocialIcons from './SocialIcons';
import { AnimatePresence, motion } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { i18n, t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const currentLang = i18n.language.startsWith('pt') ? 'pt' : 'en';

  const handleChangeLanguage = (lang: 'pt' | 'en') => {
    i18n.changeLanguage(lang);
    setIsLangMenuOpen(false);
  };

  const languages = {
    pt: {
      code: 'pt',
      flag: '/images/flags/portugal.svg',
      name: 'Português'
    },
    en: {
      code: 'en',
      flag: '/images/flags/uk.svg',
      name: 'English'
    }
  };

  return (
    <>
      <header className="bg-white shadow-lg sticky top-0 z-40">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/logo.jpg"
                  alt="Logo Serralharia"
                  width={300}
                  height={60}
                  className="h-16 w-auto transition-transform duration-300 hover:scale-105"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center">
              <div className="flex items-center space-x-12">
                <Link href="/" className={`text-gray-700 hover:text-accent relative group py-2 ${router.pathname === '/' ? 'text-accent' : ''}`}>
                  <span className="cursor-pointer">{t('nav.home', 'Início')}</span>
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300 ${router.pathname === '/' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </Link>
                <Link href="/sobre" className={`text-gray-700 hover:text-accent relative group py-2 ${router.pathname === '/sobre' ? 'text-accent' : ''}`}>
                  <span className="cursor-pointer">{t('nav.about', 'Sobre nós')}</span>
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300 ${router.pathname === '/sobre' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </Link>
                <Link href="/trabalhos" className={`text-gray-700 hover:text-accent relative group py-2 ${router.pathname === '/trabalhos' ? 'text-accent' : ''}`}>
                  <span className="cursor-pointer">{t('nav.projects', 'Trabalhos')}</span>
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300 ${router.pathname === '/trabalhos' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </Link>
                <Link href="/contacto" className={`bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-colors duration-300 ${router.pathname === '/contacto' ? 'bg-primary/90' : ''}`}>
                  <span className="cursor-pointer">{t('nav.contact', 'Contacto')}</span>
                </Link>
              </div>

              {/* Social + Language */}
              <div className="flex items-center ml-8 space-x-20 relative">
                <SocialIcons />

                {/* Language Selector */}
                <div
                  className="relative border border-gray-200 rounded py-1 px-2"
                  onMouseEnter={() => setIsLangMenuOpen(true)}
                  onMouseLeave={() => setIsLangMenuOpen(false)}
                >
                  <button className="w-6 h-4">
                    <Image
                      src={languages[currentLang].flag}
                      alt={languages[currentLang].name}
                      width={24}
                      height={16}
                      className="object-cover"
                    />
                  </button>

                  {/* Dropdown */}
                  {isLangMenuOpen && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded shadow-md min-w-[40px]">
                      {Object.keys(languages)
                        .filter((code) => code !== currentLang)
                        .map((code) => (
                          <button
                            key={code}
                            onClick={() => handleChangeLanguage(code as 'pt' | 'en')}
                            className="flex items-center px-2 py-2 hover:bg-gray-100 w-full"
                          >
                            <Image
                              src={languages[code as 'pt' | 'en'].flag}
                              alt={languages[code as 'pt' | 'en'].name}
                              width={24}
                              height={16}
                              className="w-6 h-4 object-cover"
                            />
                          </button>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary transition-colors duration-300 cursor-pointer"
              >
                <span className="sr-only">{t('headerSpan')}</span>
                {!isMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation (fora do nav/header para animar o fundo todo) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="md:hidden absolute top-20 left-0 w-full bg-white px-4 pt-4 pb-6 space-y-6 shadow-lg z-30"
          >
            <div className="space-y-2">
              <Link href="/" className={`block px-4 py-3 rounded-lg text-gray-700 hover:text-primary hover:bg-gray-50 transition-all duration-300 ${router.pathname === '/' ? 'text-primary bg-gray-50' : ''}`}>
                {t('nav.home', 'Início')}
              </Link>
              <Link href="/sobre" className={`block px-4 py-3 rounded-lg text-gray-700 hover:text-primary hover:bg-gray-50 transition-all duration-300 ${router.pathname === '/sobre' ? 'text-primary bg-gray-50' : ''}`}>
                {t('nav.about', 'Sobre')}
              </Link>
              <Link href="/trabalhos" className={`block px-4 py-3 rounded-lg text-gray-700 hover:text-primary hover:bg-gray-50 transition-all duration-300 ${router.pathname === '/trabalhos' ? 'text-primary bg-gray-50' : ''}`}>
                {t('nav.projects', 'Trabalhos')}
              </Link>
              <Link href="/contacto" className={`block px-4 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-all duration-300 ${router.pathname === '/contacto' ? 'bg-primary/90' : ''}`}>
                {t('nav.contact', 'Contacto')}
              </Link>
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
              <SocialIcons />
              <div className="flex space-x-4">
                <button onClick={() => handleChangeLanguage('pt')}>
                  <Image src={languages.pt.flag} alt="Português" width={24} height={16} className="object-cover" />
                </button>
                <button onClick={() => handleChangeLanguage('en')}>
                  <Image src={languages.en.flag} alt="English" width={24} height={16} className="object-cover" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

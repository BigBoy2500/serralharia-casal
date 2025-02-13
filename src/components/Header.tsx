import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import SocialIcons from './SocialIcons';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  return (
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
              <Link 
                href="/" 
                className={`text-gray-700 hover:text-accent relative group py-2 ${
                  router.pathname === '/' ? 'text-accent' : ''
                }`}
              >
                <span className="cursor-pointer">Início</span>
                <span className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300 ${
                  router.pathname === '/' ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
              <Link 
                href="/sobre" 
                className={`text-gray-700 hover:text-accent relative group py-2 ${
                  router.pathname === '/sobre' ? 'text-accent' : ''
                }`}
              >
                <span className="cursor-pointer">Sobre nós</span>
                <span className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300 ${
                  router.pathname === '/sobre' ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
              <Link 
                href="/trabalhos" 
                className={`text-gray-700 hover:text-accent relative group py-2 ${
                  router.pathname === '/trabalhos' ? 'text-accent' : ''
                }`}
              >
                <span className="cursor-pointer">Trabalhos</span>
                <span className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300 ${
                  router.pathname === '/trabalhos' ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
              <Link 
                href="/contacto" 
                className={`bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-colors duration-300 ${
                  router.pathname === '/contacto' ? 'bg-primary/90' : ''
                }`}
              >
                <span className="cursor-pointer">Contacto</span>
              </Link>
            </div>
            <div className="ml-12">
              <SocialIcons />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary transition-colors duration-300 cursor-pointer"
            >
              <span className="sr-only">Abrir menu principal</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-2">
              <Link
                href="/"
                className={`block px-4 py-3 rounded-lg text-gray-700 hover:text-primary hover:bg-gray-50 transition-all duration-300 ${
                  router.pathname === '/' ? 'text-primary bg-gray-50' : ''
                }`}
              >
                Início
              </Link>
              <Link
                href="/sobre"
                className={`block px-4 py-3 rounded-lg text-gray-700 hover:text-primary hover:bg-gray-50 transition-all duration-300 ${
                  router.pathname === '/sobre' ? 'text-primary bg-gray-50' : ''
                }`}
              >
                História
              </Link>
              <Link
                href="/trabalhos"
                className={`block px-4 py-3 rounded-lg text-gray-700 hover:text-primary hover:bg-gray-50 transition-all duration-300 ${
                  router.pathname === '/trabalhos' ? 'text-primary bg-gray-50' : ''
                }`}
              >
                Trabalhos
              </Link>
              <Link
                href="/contacto"
                className={`block px-4 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-all duration-300 ${
                  router.pathname === '/contacto' ? 'bg-primary/90' : ''
                }`}
              >
                Contacto
              </Link>
              <div className="px-4 py-3">
                <SocialIcons />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
} 
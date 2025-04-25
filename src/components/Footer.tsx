'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import SocialIcons from './SocialIcons';

export default function Footer() {
  const { i18n, t } = useTranslation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (typeof window !== 'undefined' && !i18n.language) return null;
  const router = useRouter();
  const [formData, setFormData] = useState({ nome: '', email: '', mensagem: '' });
  const [language, setLanguage] = useState(() => i18n.language);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentLang = i18n.language || 'pt';
  const mapLang = currentLang.startsWith('pt') ? 'pt-PT' : 'en-US';
  const mapLangUnique = currentLang.startsWith('pt') ? 'pt' : 'en';


  const languages = [
    { code: 'pt', name: 'Português', flag: 'images/flags/portugal.svg' },
    { code: 'en', name: 'English', flag: 'images/flags/uk.svg' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isClient) return null;

  const selectedLanguage = languages.find(lang => lang.code === language);

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode);
    setIsOpen(false);
    i18n.changeLanguage(langCode.startsWith('pt') ? 'pt' : 'en');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const queryParams = new URLSearchParams(formData).toString();
    router.push(`/contacto?${queryParams}`);
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        {router.pathname !== '/contacto' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">{t('footer.contactTitle')}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium mb-1">{t('footer.name')}</label>
                  <input type="text" id="nome" value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-white" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">{t('footer.email')}</label>
                  <input type="email" id="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-white" required />
                </div>
                <div>
                  <label htmlFor="mensagem" className="block text-sm font-medium mb-1">{t('footer.message')}</label>
                  <textarea id="mensagem" value={formData.mensagem} onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })} rows={4} className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-white" required />
                </div>
                <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200">
                  {t('footer.submit')}
                </button>
              </form>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">{t('footer.locationTitle')}</h3>
              <div className="mb-6">
                <p className="mb-2"><strong>{t('footer.addressLabel')}:</strong> Rua De Brirães 20, 4905-013 Aldreu</p>
                <p className="mb-2"><strong>{t('footer.phoneLabel')}:</strong> 934 984 968 | 961 286 919</p>
                <p className="mb-2"><strong>Email:</strong> serralhariacasal@gmail.com</p>
                <div className="mt-4">
                  <strong className="block mb-2">{t('footer.followUs')}</strong>
                  <SocialIcons className="text-white" />
                </div>
              </div>
              <div className="h-64 w-full rounded-md overflow-hidden">
                <iframe src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13015.735281983738!2d-8.724721404373287!3d41.59368486489668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd25b3fd8ea92abd%3A0x4cf9138da10e7e00!2sSerralharia%20Casal!5e0!3m2!1s ${mapLang}!2s${mapLangUnique}!4v1739377634528!5m2!1s${mapLang}!2s${mapLangUnique}`} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>
          </div>
        )}

        <div className={`${router.pathname === '/contacto' ? '' : 'mt-12 pt-8 border-t border-gray-800'} text-sm`}>
          <div className="flex flex-col md:flex-row md:justify-between items-center text-center gap-y-4">
            <SocialIcons className="text-gray-400" />

            <p className="text-center">&copy; {new Date().getFullYear()} Serralharia Casal. {t('footer.copyright')}</p>

            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 bg-gray-900 text-white border border-gray-700 rounded-md px-3 py-2 text-sm">
                <img src={selectedLanguage?.flag} alt={selectedLanguage?.name} className="w-5 h-4 object-cover" />
                <span>{selectedLanguage?.name}</span>
                <ChevronUpDownIcon className="h-4 w-4 text-gray-400" />
              </button>
              {isOpen && (
                <div className="absolute right-0 bottom-full mb-1 w-40 bg-gray-900 rounded-md shadow-lg z-50">
                  <ul className="py-1">
                    {languages.map(lang => (
                      <li key={lang.code}>
                        <button onClick={() => handleLanguageChange(lang.code)} className="flex items-center gap-2 w-full px-4 py-2 text-sm text-white hover:bg-gray-800">
                          <img src={lang.flag} alt={lang.name} className="w-5 h-4 object-cover" />
                          {lang.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

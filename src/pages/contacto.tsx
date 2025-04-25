import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

export default function Contacto() {
  const { i18n, t } = useTranslation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (typeof window !== 'undefined' && !i18n.language) return null;
  const currentLang = i18n.language || 'pt';
  const mapLang = currentLang.startsWith('pt') ? 'pt-PT' : 'en-US';
  const mapLangUnique = currentLang.startsWith('pt') ? 'pt' : 'en';
  const router = useRouter();

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: '',
  });

  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      const { nome, email, mensagem } = router.query;
      if (nome || email || mensagem) {
        setFormData(prev => ({
          ...prev,
          nome: nome as string || '',
          email: email as string || '',
          mensagem: mensagem as string || '',
        }));
      }
    }
  }, [router.isReady, router.query]);

  if (!isClient) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: t('contact.success') });
        setFormData({ nome: '', email: '', telefone: '', assunto: '', mensagem: '' });
        router.replace('/contacto', undefined, { shallow: true });
      } else {
        throw new Error(data.message || 'Erro ao enviar mensagem');
      }
    } catch {
      setStatus({ type: 'error', message: t('contact.error') });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Head>
        <title>{t('nav.contact')} - Serralharia Casal</title>
        <meta name="description" content={t('contact.metaDescription')} />
      </Head>

      <Header />

      <main className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
            {t('contact.title')}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Informações de Contato */}
            <div>
              <h2 className="text-2xl font-bold mb-6">{t('contact.infoTitle')}</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">📍</div>
                  <div>
                    <h3 className="font-bold">{t('contact.addressLabel')}</h3>
                    {t('contact.address').split('\n').map((line, idx) => (
                      <p key={idx} className="text-gray-600">{line}</p>
                    ))}
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">📞</div>
                  <div>
                    <h3 className="font-bold">{t('contact.phoneLabel')}</h3>
                    {t('contact.phone').split('\n').map((line, idx) => (
                      <p key={idx} className="text-gray-600">{line}</p>
                    ))}
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">✉️</div>
                  <div>
                    <h3 className="font-bold">{t('contact.email')}</h3>
                    <p className="text-gray-600">serralhariacasal@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">⏰</div>
                  <div>
                    <h3 className="font-bold">{t('contact.hoursTitle')}</h3>
                    <p className="text-gray-600">{t('contact.hours')}</p>
                    <p className="underline text-sm text-gray-700">
                      ({t('contact.lunchNote')})
                    </p>
                  </div>
                </div>
              </div>

              {/* Mapa */}
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-6">{t('contact.locationTitle')}</h2>
                <div className="h-[300px] rounded-lg overflow-hidden">
                  <iframe
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13015.735281983738!2d-8.724721404373287!3d41.59368486489668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd25b3fd8ea92abd%3A0x4cf9138da10e7e00!2sSerralharia%20Casal!5e0!3m2!1s ${mapLang}!2s${mapLangUnique}!4v1739377634528!5m2!1s${mapLang}!2s${mapLangUnique}`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>

            {/* Formulário */}
            <div>
              <h2 className="text-2xl font-bold mb-6">{t('contact.formTitle')}</h2>
              {status.message && (
                <div className={`p-4 rounded-md mb-6 ${status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  {status.message}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                {['nome', 'email', 'telefone', 'assunto'].map((field) => (
                  <div key={field}>
                    <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">
                      {t(`contact.${field}`)}
                    </label>
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      id={field}
                      name={field}
                      value={formData[field as keyof typeof formData]}
                      onChange={handleChange}
                      required={field === 'nome' || field === 'email'}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                ))}
                <div>
                  <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('contact.message')}
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleChange}
                    rows={6}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-md transition-colors duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? t('contact.sending') : t('contact.submit')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

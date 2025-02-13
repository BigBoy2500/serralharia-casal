import { useState } from 'react';
import { useRouter } from 'next/router';
import SocialIcons from './SocialIcons';

export default function Footer() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    mensagem: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Criar query string com os dados do formulário
    const queryParams = new URLSearchParams({
      nome: formData.nome,
      email: formData.email,
      mensagem: formData.mensagem,
    }).toString();

    // Redirecionar para a página de contato com os dados
    router.push(`/contacto?${queryParams}`);
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        {router.pathname !== '/contacto' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Formulário de Contato Simplificado */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Entre em Contacto</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium mb-1">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-accent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-accent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="mensagem" className="block text-sm font-medium mb-1">
                    Mensagem
                  </label>
                  <textarea
                    id="mensagem"
                    value={formData.mensagem}
                    onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-accent"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                >
                  Continuar
                </button>
              </form>
            </div>

            {/* Informações de Contato e Mapa */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Localização</h3>
              <div className="mb-6">
                <p className="mb-2">
                  <strong>Endereço:</strong> Rua De Brirães 20, 4905-013 Aldreu
                </p>
                <p className="mb-2">
                  <strong>Telefone:</strong> 934 984 968⠀|⠀961 286 919
                </p>
                <p className="mb-2">
                  <strong>Email:</strong> serralhariacasal@gmail.com
                </p>
                <div className="mt-4">
                  <strong className="block mb-2">Siga-nos nas redes sociais:</strong>
                  <SocialIcons className="text-white" />
                </div>
              </div>
              
              {/* Google Maps Embed */}
              <div className="h-64 w-full rounded-md overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13015.735281983738!2d-8.724721404373287!3d41.59368486489668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd25b3fd8ea92abd%3A0x4cf9138da10e7e00!2sSerralharia%20Casal!5e0!3m2!1spt-PT!2spt!4v1739377634528!5m2!1spt-PT!2spt"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        )}

        {/* Copyright */}
        <div className={`${router.pathname === '/contacto' ? '' : 'mt-12 pt-8 border-t border-gray-800'} text-center text-sm`}>
          <div className="flex flex-col items-center space-y-4">
            <SocialIcons className="text-gray-400" />
            <p>&copy; {new Date().getFullYear()} Serralharia Casal. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
} 
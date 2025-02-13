import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const emailTo = process.env.EMAIL_TO;

if (!resendApiKey) {
  console.error('RESEND_API_KEY não está configurada');
  throw new Error('A chave API do Resend não está configurada');
}

if (!emailTo) {
  console.error('EMAIL_TO não está configurado');
  throw new Error('O email de destino não está configurado');
}

const resend = new Resend(resendApiKey);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const { nome, email, telefone, assunto, mensagem } = req.body;

    console.log('Dados recebidos:', { nome, email, telefone, assunto });

    // Validação dos campos
    if (!nome || !email || !mensagem) {
      console.log('Campos obrigatórios faltando:', { nome, email, mensagem });
      return res.status(400).json({ 
        message: 'Por favor, preencha todos os campos obrigatórios' 
      });
    }

    console.log('Tentando enviar email para:', emailTo);

    const { data, error } = await resend.emails.send({
      from: 'Serralharia Casal <onboarding@resend.dev>',
      to: emailTo,
      subject: `Nova mensagem de contato: ${assunto || 'Sem assunto'}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nova Mensagem de Contato</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #ED691E; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: white; margin: 0;">Nova Mensagem de Contato</h1>
            </div>
            
            <div style="background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 8px 8px;">
              <div style="margin-bottom: 20px; padding: 15px; background-color: white; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h2 style="color: #ED691E; margin-top: 0;">Informações do Remetente</h2>
                <p style="margin: 10px 0;"><strong>Nome:</strong> ${nome}</p>
                <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
                ${telefone ? `<p style="margin: 10px 0;"><strong>Telefone:</strong> ${telefone}</p>` : ''}
                ${assunto ? `<p style="margin: 10px 0;"><strong>Assunto:</strong> ${assunto}</p>` : ''}
              </div>

              <div style="padding: 15px; background-color: white; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h2 style="color: #ED691E; margin-top: 0;">Mensagem</h2>
                <p style="margin: 10px 0; white-space: pre-wrap;">${mensagem}</p>
              </div>
            </div>

            <div style="text-align: center; margin-top: 20px; padding: 20px; font-size: 12px; color: #666;">
              <p>Este email foi enviado através do formulário de contato do website da Serralharia Casal.</p>
              <p style="margin: 5px 0;">© ${new Date().getFullYear()} Serralharia Casal. Todos os direitos reservados.</p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Erro do Resend:', error);
      return res.status(500).json({ 
        message: 'Erro ao enviar mensagem. Por favor, tente novamente mais tarde.',
        error: error.message
      });
    }

    console.log('Email enviado com sucesso:', data);
    return res.status(200).json({ 
      message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.' 
    });
  } catch (error) {
    console.error('Erro inesperado:', error);
    return res.status(500).json({ 
      message: 'Erro ao enviar mensagem. Por favor, tente novamente mais tarde.',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
} 
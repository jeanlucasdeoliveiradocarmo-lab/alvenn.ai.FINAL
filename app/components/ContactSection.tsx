'use client';

import Link from 'next/link';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { type FormEvent, useState } from 'react';
import { db } from '@/lib/firebase';

const Arrow = () => <span aria-hidden="true">↗</span>;

type Feedback = {
  type: 'success' | 'error';
  message: string;
};

export default function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setLoading(true);
    setFeedback(null);

    try {
      await addDoc(collection(db, 'leads'), {
        nome: String(formData.get('nome') ?? '').trim(),
        email: String(formData.get('email') ?? '').trim(),
        whatsapp: String(formData.get('whatsapp') ?? '').trim(),
        mensagem: String(formData.get('mensagem') ?? '').trim(),
        createdAt: serverTimestamp(),
      });

      form.reset();
      setFeedback({
        type: 'success',
        message:
          'Mensagem enviada com sucesso! Em breve entraremos em contato.',
      });
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setFeedback({
        type: 'error',
        message: 'Não foi possível enviar sua mensagem. Tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contato" className="contact section-dark">
      <div className="contact-glow" />

      <div className="wrap contact-grid">
        <div>
          <span className="eyebrow light">
            <i /> VAMOS CONVERSAR
          </span>

          <h2>
            Sua empresa já existe.
            <br />
            Agora faça ela ser <em>percebida.</em>
          </h2>

          <p>
            Conte um pouco sobre seu projeto. Em breve, entraremos em contato
            para dar o próximo passo.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label>
            Nome
            <input
              name="nome"
              autoComplete="name"
              placeholder="Como podemos chamar você?"
              required
            />
          </label>

          <label>
            E-mail
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="voce@empresa.com"
              required
            />
          </label>

          <label>
            WhatsApp
            <input
              name="whatsapp"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="(00) 00000-0000"
              required
            />
          </label>

          <label>
            Mensagem
            <textarea
              name="mensagem"
              rows={3}
              placeholder="Conte brevemente sobre o seu projeto"
            />
          </label>

          <label
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              margin: '0 0 18px',
              color: '#8f96a6',
              fontSize: '10px',
              lineHeight: 1.7,
              letterSpacing: 'normal',
              textTransform: 'none',
            }}
          >
            <input
              name="consentimentoLgpd"
              type="checkbox"
              required
              style={{
                width: '16px',
                height: '16px',
                flex: '0 0 auto',
                margin: '2px 0 0',
                padding: 0,
                border: 0,
                accentColor: '#6033ff',
                cursor: 'pointer',
              }}
            />
            <span>
              Concordo com o tratamento dos meus dados pessoais para fins de
              contato comercial e aceito a{' '}
              <Link
                href="/politica-de-privacidade"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 transition-colors hover:text-[#6033ff]"
              >
                Política de Privacidade e Termos de Uso
              </Link>
              .
            </span>
          </label>

          <button
            className="button button-light"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Criar meu projeto'} <Arrow />
          </button>

          {feedback ? (
            <p
              role="status"
              aria-live="polite"
              style={{
                margin: '18px 0 0',
                color: feedback.type === 'success' ? '#8de8ae' : '#ff9aa8',
                lineHeight: 1.6,
              }}
            >
              {feedback.message}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}

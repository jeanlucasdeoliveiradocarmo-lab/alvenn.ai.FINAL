import Image from 'next/image';
import DeferredContactSection from './components/DeferredContactSection';
import DeferredWebGL from './components/DeferredWebGL';
import FaqAccordion from './components/FaqAccordion';
import JsonLd from './components/JsonLd';
import SiteFooter from './components/SiteFooter';
import {
  faqPageSchema,
  faqSchemaItems,
} from '@/lib/structured-data';

const solutions = [
  [
    'Design premium',
    'Uma estética exclusiva, construída para posicionar sua marca acima da média.',
  ],
  [
    'Experiência',
    'Navegação intuitiva e envolvente em cada tela, do primeiro clique ao contato.',
  ],
  [
    'Conversão',
    'Estratégia, hierarquia e chamadas pensadas para transformar visitas em oportunidades.',
  ],
  [
    'Performance',
    'Carregamento rápido, código otimizado e a melhor experiência em qualquer dispositivo.',
  ],
] as const;

const steps = [
  [
    '01',
    'Briefing',
    'Você responde algumas perguntas para entendermos seu negócio, público e objetivos.',
  ],
  [
    '02',
    'Criação',
    'Transformamos estratégia em uma experiência digital única, com acompanhamento próximo.',
  ],
  [
    '03',
    'No ar',
    'Após sua aprovação, publicamos tudo e sua nova presença começa a trabalhar por você.',
  ],
] as const;

const faqs = [
  [
    'O site será personalizado?',
    'Sim. Cada projeto é criado do zero para refletir a personalidade, o posicionamento e os objetivos da sua empresa.',
  ],
  [
    'Funciona no celular?',
    'Perfeitamente. O site é responsivo e testado para entregar uma experiência impecável em celulares, tablets e computadores.',
  ],
  [
    'Posso pedir alterações?',
    'Sim. Você acompanha o processo e pode solicitar ajustes nas etapas de revisão antes da publicação.',
  ],
  [
    'Preciso enviar os textos?',
    'Não necessariamente. Podemos organizar e refinar sua mensagem a partir do briefing para que ela seja clara, estratégica e convincente.',
  ],
  ...faqSchemaItems.map(
    (item) =>
      [item.question, item.answer] as const,
  ),
] as const;

const WHATSAPP_URL =
  'https://wa.me/5521991182709';

const Arrow = () => (
  <span aria-hidden="true">↗</span>
);

export default function Home() {
  return (
    <main>
      <JsonLd
        id="faq-page-json-ld"
        data={faqPageSchema}
      />

      <header className="island">
        <a
          href="#inicio"
          className="brand"
          aria-label="Alvenn - início"
        >
          <Image
            src="/alvenn-logo.png"
            width={34}
            height={34}
            sizes="34px"
            alt=""
          />
          <span>alvenn.ai</span>
        </a>

        <nav aria-label="Navegação principal">
          <a href="#sobre">Sobre</a>
          <a href="#solucao">Solução</a>
          <a href="#processo">Processo</a>
          <a href="#faq">FAQ</a>
        </nav>

        <a
          className="nav-cta"
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Iniciar projeto pelo WhatsApp"
        >
          Iniciar projeto <Arrow />
        </a>
      </header>

      <section
        id="inicio"
        className="hero section-dark"
      >
        <div className="webgl-layer hero-webgl-fallback">
          <DeferredWebGL variant="color-bends" />
        </div>

        <div className="hero-shade" />

        <div className="hero-content wrap">
          <span className="eyebrow light">
            <i /> DESIGN • ESTRATÉGIA • PERFORMANCE
          </span>

          <h1>
            Sua marca merece uma{' '}
            <em>presença à altura.</em>
          </h1>

          <p>
            Sites estratégicos, sofisticados e
            construídos para transformar atenção em
            oportunidade.
          </p>

          <a
            href="#contato"
            className="button button-light"
          >
            Quero meu projeto <Arrow />
          </a>
        </div>

        <div className="scroll-note">
          Explore <span>↓</span>
        </div>
      </section>

      <section
        id="sobre"
        className="about section-light"
      >
        <div className="wrap about-grid">
          <div>
            <span className="eyebrow">
              <i /> QUEM ESTÁ POR TRÁS
            </span>

            <div className="portrait-photo">
              <Image
                src="/jean-lucas.png"
                alt="Jean Lucas, fundador da Alvenn"
                fill
                sizes="(max-width: 800px) 72vw, 360px"
                loading="lazy"
              />
            </div>
          </div>

          <div>
            <p className="lead">
              Prazer, eu sou{' '}
              <strong>Jean Lucas.</strong>{' '}
              Empreendedor, autodidata e apaixonado por
              tecnologia.
            </p>

            <p className="body-copy">
              Fundei a Alvenn com um objetivo simples:
              criar experiências digitais que unam
              design, estratégia e performance para
              transformar a forma como empresas se
              apresentam no digital.
            </p>

            <div className="signature">
              Jean Lucas
              <small>Fundador da Alvenn</small>
            </div>
          </div>
        </div>
      </section>

      <section
        id="solucao"
        className="solution section-dark"
      >
        <div className="webgl-layer aurora aurora-webgl-fallback">
          <DeferredWebGL variant="aurora" />
        </div>

        <div className="wrap solution-card">
          <span className="eyebrow">
            <i /> O QUE ENTREGAMOS
          </span>

          <div className="solution-head">
            <h2>
              Muito além de um
              <br />
              <em>site bonito.</em>
            </h2>

            <p>
              Criamos um ativo digital que trabalha para
              construir percepção, comunicar valor e
              gerar novas oportunidades.
            </p>
          </div>

          <div className="feature-grid">
            {solutions.map(
              ([title, text], index) => (
                <article key={title}>
                  <span>0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      <section
        id="processo"
        className="process section-dark"
      >
        <div className="webgl-layer blinds blinds-webgl-fallback">
          <DeferredWebGL variant="gradient-blinds" />
        </div>

        <div className="process-shade" />

        <div className="wrap process-content">
          <span className="eyebrow light">
            <i /> NOSSO PROCESSO
          </span>

          <h2>
            Simples do início
            <br />
            <em>ao fim.</em>
          </h2>

          <div className="steps">
            {steps.map(
              ([number, title, text]) => (
                <article key={number}>
                  <span>{number}</span>

                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="offer section-light">
        <div className="wrap offer-grid">
          <div>
            <span className="eyebrow">
              <i /> SUA NOVA PRESENÇA
            </span>

            <h2>
              Uma presença digital feita para{' '}
              <em>impressionar.</em>
            </h2>

            <p>
              Do conceito à publicação, cuidamos de cada
              detalhe para sua empresa ser vista como
              merece.
            </p>
          </div>

          <div className="offer-card">
            <ul>
              {[
                'Design exclusivo e alinhado à sua marca',
                'Experiência responsiva em todos os dispositivos',
                'Estrutura estratégica focada em conversão',
                'Otimização de velocidade e SEO',
                'Domínio, publicação e suporte especializado',
              ].map((item) => (
                <li key={item}>
                  <span>✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="#contato"
              className="button button-blue"
            >
              Quero começar <Arrow />
            </a>
          </div>
        </div>
      </section>

      <section
        id="faq"
        className="faq section-light"
      >
        <div className="wrap faq-grid">
          <div>
            <span className="eyebrow">
              <i /> PERGUNTAS FREQUENTES
            </span>

            <h2>
              Antes de começar,
              <br />
              <em>tire suas dúvidas.</em>
            </h2>
          </div>

          <FaqAccordion items={faqs} />
        </div>
      </section>

      <DeferredContactSection />
      <SiteFooter />
    </main>
  );
}

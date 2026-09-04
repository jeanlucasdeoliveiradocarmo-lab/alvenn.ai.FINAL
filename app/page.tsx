'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import {
  type ComponentType,
  type CSSProperties,
  useState,
} from 'react';
import ContactSection from './components/ContactSection';
import JsonLd from './components/JsonLd';
import SiteFooter from './components/SiteFooter';
import {
  faqPageSchema,
  faqSchemaItems,
} from '@/lib/structured-data';

type ColorBendsProps = {
  className?: string;
  style?: CSSProperties;
  rotation?: number;
  speed?: number;
  colors?: string[];
  transparent?: boolean;
  autoRotate?: number;
  scale?: number;
  frequency?: number;
  warpStrength?: number;
  mouseInfluence?: number;
  parallax?: number;
  noise?: number;
  iterations?: number;
  intensity?: number;
  bandWidth?: number;
};

type AuroraProps = {
  colorStops?: string[];
  speed?: number;
  blend?: number;
  amplitude?: number;
};

type GradientBlindsProps = {
  gradientColors?: string[];
  blindCount?: number;
};

const ColorBends = dynamic(
  () => import('./components/ColorBends'),
  { ssr: false },
) as ComponentType<ColorBendsProps>;

const Aurora = dynamic(
  () => import('./components/Aurora'),
  { ssr: false },
) as ComponentType<AuroraProps>;

const GradientBlinds = dynamic(
  () => import('./components/GradientBlinds'),
  { ssr: false },
) as ComponentType<GradientBlindsProps>;

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
];

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
];

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
  ...faqSchemaItems.map((item) => [
    item.question,
    item.answer,
  ]),
];

const WHATSAPP_URL = 'https://wa.me/5521991182709';

const Arrow = () => <span aria-hidden="true">↗</span>;

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main>
      <JsonLd id="faq-page-json-ld" data={faqPageSchema} />

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
            alt=""
            priority
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

      <section id="inicio" className="hero section-dark">
        <div className="webgl-layer">
          <ColorBends
            colors={['#ff5c7a', '#8a5cff', '#00ffd1']}
            rotation={46}
            speed={0.6}
            scale={0.5}
            frequency={0.9}
            warpStrength={1}
            mouseInfluence={1}
            noise={0.15}
            parallax={0.5}
            iterations={1}
            intensity={1.5}
            bandWidth={6}
            transparent
          />
        </div>

        <div className="hero-shade" />

        <div className="hero-content wrap">
          <span className="eyebrow light">
            <i /> DESIGN • ESTRATÉGIA • PERFORMANCE
          </span>

          <h1>
            Sua marca merece uma <em>presença à altura.</em>
          </h1>

          <p>
            Sites estratégicos, sofisticados e construídos para transformar
            atenção em oportunidade.
          </p>

          <a href="#contato" className="button button-light">
            Quero meu projeto <Arrow />
          </a>
        </div>

        <div className="scroll-note">
          Explore <span>↓</span>
        </div>
      </section>

      <section id="sobre" className="about section-light">
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
              />
            </div>
          </div>

          <div>
            <p className="lead">
              Prazer, eu sou <strong>Jean Lucas.</strong> Empreendedor,
              autodidata e apaixonado por tecnologia.
            </p>

            <p className="body-copy">
              Fundei a Alvenn com um objetivo simples: criar experiências
              digitais que unam design, estratégia e performance para
              transformar a forma como empresas se apresentam no digital.
            </p>

            <div className="signature">
              Jean Lucas
              <small>Fundador da Alvenn</small>
            </div>
          </div>
        </div>
      </section>

      <section id="solucao" className="solution section-dark">
        <div className="webgl-layer aurora">
          <Aurora
            colorStops={['#01061b', '#0b42d2', '#55aaff']}
            blend={0.55}
            amplitude={1.2}
            speed={0.55}
          />
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
              Criamos um ativo digital que trabalha para construir percepção,
              comunicar valor e gerar novas oportunidades.
            </p>
          </div>

          <div className="feature-grid">
            {solutions.map(([title, text], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="processo" className="process section-dark">
        <div className="webgl-layer blinds">
          <GradientBlinds
            gradientColors={['#02030a', '#0638ba', '#5ba9ff']}
            blindCount={10}
          />
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
            {steps.map(([number, title, text]) => (
              <article key={number}>
                <span>{number}</span>

                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
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
              Uma presença digital feita para <em>impressionar.</em>
            </h2>

            <p>
              Do conceito à publicação, cuidamos de cada detalhe para sua
              empresa ser vista como merece.
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

            <a href="#contato" className="button button-blue">
              Quero começar <Arrow />
            </a>
          </div>
        </div>
      </section>

      <section id="faq" className="faq section-light">
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

          <div className="accordion">
            {faqs.map(([question, answer], index) => (
              <article
                className={openFaq === index ? 'open' : ''}
                key={question}
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenFaq(openFaq === index ? -1 : index)
                  }
                  aria-expanded={openFaq === index}
                >
                  <span>{question}</span>
                  <b>{openFaq === index ? '−' : '+'}</b>
                </button>

                <div className="answer">
                  <p>{answer}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
      <SiteFooter />
    </main>
  );
}

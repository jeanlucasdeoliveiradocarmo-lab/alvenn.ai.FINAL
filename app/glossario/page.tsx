import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SiteFooter from '@/app/components/SiteFooter';
import GlossaryExplorer from './GlossaryExplorer';
import styles from './glossario.module.css';

const WHATSAPP_URL = `https://wa.me/5521991182709?text=${encodeURIComponent(
  'Quero uma solução para o meu negócio',
)}`;

export const metadata: Metadata = {
  title: 'Glossário de Vendas, Marketing e Tecnologia',
  description:
    'Conheça 100 conceitos essenciais de vendas, marketing, sites, SEO, tecnologia e negócios no glossário da Alvenn.ai.',
  alternates: {
    canonical: 'https://alvenn.ai/glossario',
  },
  openGraph: {
    title: 'Glossário Alvenn.ai — 100 conceitos para o seu negócio',
    description:
      'Explore conceitos essenciais de vendas, marketing, sites, SEO e tecnologia.',
    url: 'https://alvenn.ai/glossario',
  },
};

export default function GlossaryPage() {
  return (
    <>
      <header className="island">
        <Link href="/" className="brand" aria-label="Alvenn.ai — início">
          <Image
            src="/alvenn-logo.png"
            width={34}
            height={34}
            alt=""
            priority
          />

          <span>alvenn.ai</span>
        </Link>

        <nav aria-label="Navegação do glossário">
          <Link href="/">Início</Link>
          <Link href="/#sobre">Sobre</Link>
          <Link href="/politica-de-privacidade">Privacidade</Link>
        </nav>

        <a
          className="nav-cta"
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Falar com a Alvenn <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main className={styles.glossaryPage}>
        <div className={styles.glowOne} />
        <div className={styles.glowTwo} />

        <section className={`wrap ${styles.hero}`}>
          <span className="eyebrow light">
            <i /> CONHECIMENTO PARA DECIDIR MELHOR
          </span>

          <h1>
            Glossário <em>Alvenn.</em>
          </h1>

          <p>
            100 conceitos essenciais de vendas, marketing, sites, SEO e
            tecnologia. Selecione um termo para entender seu significado e
            descobrir como aplicá-lo no seu negócio.
          </p>

          <div className={styles.heroMeta}>
            <span>100 TERMOS</span>
            <span>05 ÁREAS DE NEGÓCIO</span>
            <span>APLICAÇÃO PRÁTICA</span>
          </div>
        </section>

        <section className={`wrap ${styles.explorerSection}`}>
          <div className={styles.sectionHeading}>
            <span>SELECIONE UM CONCEITO</span>

            <p>
              Cada termo abre uma explicação objetiva e um caminho direto para
              conversar com a Alvenn.ai.
            </p>
          </div>

          <GlossaryExplorer />
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import {
  glossaryEntries,
  type GlossaryEntry,
} from './glossary-data';
import styles from './glossario.module.css';

const WHATSAPP_URL = `https://wa.me/5521991182709?text=${encodeURIComponent(
  'Quero uma solução para o meu negócio',
)}`;

type GlossaryExplorerProps = {
  initialQuery?: string;
};

export default function GlossaryExplorer({
  initialQuery = '',
}: GlossaryExplorerProps) {
  const [query, setQuery] = useState(initialQuery);
  const [selectedEntry, setSelectedEntry] =
    useState<GlossaryEntry | null>(null);

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!selectedEntry) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedEntry(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedEntry]);

  const normalizedQuery = query
    .trim()
    .toLocaleLowerCase('pt-BR');

  const filteredEntries = normalizedQuery
    ? glossaryEntries.filter(
        (entry) =>
          entry.term
            .toLocaleLowerCase('pt-BR')
            .includes(normalizedQuery) ||
          entry.definition
            .toLocaleLowerCase('pt-BR')
            .includes(normalizedQuery),
      )
    : glossaryEntries;

  return (
    <>
      <div className={styles.searchArea}>
        <label htmlFor="glossary-search">
          Buscar no glossário
        </label>

        <div className={styles.searchField}>
          <span aria-hidden="true">⌕</span>

          <input
            id="glossary-search"
            type="search"
            name="busca"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ex.: SEO, inteligência artificial, vendas"
            autoComplete="off"
          />
        </div>

        <p aria-live="polite">
          {filteredEntries.length}{' '}
          {filteredEntries.length === 1
            ? 'conceito encontrado'
            : 'conceitos encontrados'}
        </p>
      </div>

      <div
        className={styles.wordGrid}
        aria-label="Termos do glossário"
      >
        {filteredEntries.map((entry) => {
          const originalIndex = glossaryEntries.findIndex(
            (item) => item.term === entry.term,
          );

          return (
            <button
              type="button"
              className={styles.wordButton}
              key={entry.term}
              onClick={() => setSelectedEntry(entry)}
              aria-haspopup="dialog"
            >
              <span>
                {String(originalIndex + 1).padStart(2, '0')}
              </span>
              {entry.term}
            </button>
          );
        })}
      </div>

      {filteredEntries.length === 0 ? (
        <div className={styles.emptyState}>
          Nenhum conceito corresponde à busca “{query}”.
        </div>
      ) : null}

      {selectedEntry ? (
        <div
          className={styles.modalBackdrop}
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedEntry(null);
            }
          }}
        >
          <article
            className={styles.definitionCard}
            role="dialog"
            aria-modal="true"
            aria-labelledby="glossary-card-title"
            aria-describedby="glossary-card-description"
          >
            <button
              ref={closeButtonRef}
              type="button"
              className={styles.closeButton}
              onClick={() => setSelectedEntry(null)}
              aria-label="Fechar definição"
            >
              ×
            </button>

            <span className={styles.cardEyebrow}>
              CONCEITO SELECIONADO
            </span>

            <h2 id="glossary-card-title">
              {selectedEntry.term}
            </h2>

            <p id="glossary-card-description">
              {selectedEntry.definition}
            </p>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cardCta}
              aria-label={`Quero aplicar ${selectedEntry.term} no meu negócio`}
            >
              Quero aplicar no meu negócio
              <span aria-hidden="true">↗</span>
            </a>
          </article>
        </div>
      ) : null}
    </>
  );
}

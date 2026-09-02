'use client';

import { useEffect, useRef, useState } from 'react';
import { glossaryEntries, type GlossaryEntry } from './glossary-data';
import styles from './glossario.module.css';

const WHATSAPP_URL = `https://wa.me/5521991182709?text=${encodeURIComponent(
  'Quero uma solução para o meu negócio',
)}`;

export default function GlossaryExplorer() {
  const [selectedEntry, setSelectedEntry] = useState<GlossaryEntry | null>(
    null,
  );

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

  return (
    <>
      <div className={styles.wordGrid} aria-label="Termos do glossário">
        {glossaryEntries.map((entry, index) => (
          <button
            type="button"
            className={styles.wordButton}
            key={entry.term}
            onClick={() => setSelectedEntry(entry)}
            aria-haspopup="dialog"
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            {entry.term}
          </button>
        ))}
      </div>

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

            <span className={styles.cardEyebrow}>CONCEITO SELECIONADO</span>

            <h2 id="glossary-card-title">{selectedEntry.term}</h2>

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

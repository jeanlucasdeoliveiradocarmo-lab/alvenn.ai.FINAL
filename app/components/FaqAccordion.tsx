'use client';

import { useCallback, useState } from 'react';

type FaqItem = readonly [
  question: string,
  answer: string,
];

type FaqAccordionProps = {
  items: readonly FaqItem[];
};

export default function FaqAccordion({
  items,
}: FaqAccordionProps) {
  const [openFaq, setOpenFaq] = useState(0);

  const handleToggle = useCallback(
    (index: number) => {
      setOpenFaq((currentIndex) =>
        currentIndex === index ? -1 : index,
      );
    },
    [],
  );

  return (
    <div className="accordion">
      {items.map(([question, answer], index) => {
        const isOpen = openFaq === index;

        return (
          <article
            className={isOpen ? 'open' : ''}
            key={question}
          >
            <button
              type="button"
              onClick={() => handleToggle(index)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
            >
              <span>{question}</span>
              <b aria-hidden="true">
                {isOpen ? '−' : '+'}
              </b>
            </button>

            <div
              className="answer"
              id={`faq-answer-${index}`}
            >
              <p>{answer}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

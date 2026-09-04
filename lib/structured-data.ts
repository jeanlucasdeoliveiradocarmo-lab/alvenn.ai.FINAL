const SITE_URL = 'https://alvenn.dev.br';
const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: 'Alven.ai',
  alternateName: 'Alvenn.ai',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/logo.png`,
    contentUrl: `${SITE_URL}/logo.png`,
    width: 1254,
    height: 1254,
  },
  telephone: '+5521991182709',
  sameAs: ['https://www.instagram.com/alvenn.ai/'],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+5521991182709',
    contactType: 'customer service',
    availableLanguage: ['Portuguese'],
    areaServed: 'BR',
    hoursAvailable: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'https://schema.org/Monday',
        'https://schema.org/Tuesday',
        'https://schema.org/Wednesday',
        'https://schema.org/Thursday',
        'https://schema.org/Friday',
      ],
      opens: '09:00',
      closes: '17:00',
    },
  },
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE_URL,
  name: 'Alven.ai',
  alternateName: 'Alvenn.ai',
  inLanguage: 'pt-BR',
  publisher: {
    '@id': ORGANIZATION_ID,
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/glossario?busca={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

export const faqSchemaItems = [
  {
    question: 'Como a inteligência artificial pode ajudar o meu negócio?',
    answer:
      'A inteligência artificial pode automatizar tarefas repetitivas, organizar informações, acelerar o atendimento, apoiar análises e criar experiências digitais mais personalizadas. A solução ideal depende dos processos, objetivos e dados disponíveis em cada empresa.',
  },
  {
    question: 'A Alven.ai desenvolve soluções personalizadas?',
    answer:
      'Sim. A Alven.ai desenvolve sites, automações, integrações e experiências digitais personalizadas de acordo com o contexto, os objetivos e a operação de cada negócio.',
  },
] as const;

export const faqPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/#faq`,
  url: `${SITE_URL}/#faq`,
  inLanguage: 'pt-BR',
  mainEntity: faqSchemaItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

type DefinedTermInput = {
  term: string;
  definition: string;
};

export function createDefinedTermSetSchema(terms: DefinedTermInput[]) {
  const termSetId = `${SITE_URL}/glossario/#defined-term-set`;

  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': termSetId,
    name: 'Glossário Alven.ai',
    description:
      'Glossário de conceitos essenciais de vendas, marketing, sites, SEO, tecnologia e negócios.',
    url: `${SITE_URL}/glossario`,
    inLanguage: 'pt-BR',
    publisher: {
      '@id': ORGANIZATION_ID,
    },
    hasDefinedTerm: terms.map((item) => ({
      '@type': 'DefinedTerm',
      name: item.term,
      description: item.definition,
      inDefinedTermSet: {
        '@id': termSetId,
      },
    })),
  };
}

export type BlogPostingSchemaInput = {
  headline: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
};

export function createBlogPostingSchema({
  headline,
  description,
  url,
  image,
  datePublished,
  dateModified = datePublished,
}: BlogPostingSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}/#article`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline,
    description,
    image: {
      '@type': 'ImageObject',
      url: image,
    },
    datePublished,
    dateModified,
    inLanguage: 'pt-BR',
    author: {
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
      name: 'Alven.ai',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
      name: 'Alven.ai',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
  };
}

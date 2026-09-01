import type { MetadataRoute } from 'next';

const SITE_URL = 'https://alvenn.ai';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${SITE_URL}/politica-de-privacidade`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];
}

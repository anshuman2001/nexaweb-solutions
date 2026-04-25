import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/portal/', '/api/', '/_next/', '/admin/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/portal/', '/api/'],
      },
    ],
    sitemap: 'https://digiagentix.com/sitemap.xml',
    host: 'https://digiagentix.com',
  };
}

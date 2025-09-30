import type { NextApiRequest, NextApiResponse } from 'next';
import { services } from '@/lib/mockData';

function generateSiteMap() {
  const baseUrl = 'https://cagleslandscaping.com';
  const currentDate = new Date().toISOString();

  // Static pages with their priorities and change frequencies
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'weekly' }, // Homepage
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/contact', priority: '0.9', changefreq: 'monthly' },
    { url: '/portfolio', priority: '0.8', changefreq: 'weekly' },
    { url: '/services', priority: '0.9', changefreq: 'monthly' }, // Services overview page
  ];

  // Service pages
  const servicePages = services.map(service => ({
    url: `/services/${service.fields.slug}`,
    priority: '0.9',
    changefreq: 'monthly'
  }));

  const allPages = [...staticPages, ...servicePages];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(page => {
    return `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set the content type to XML
  res.setHeader('Content-Type', 'text/xml');

  // Cache the sitemap for 24 hours
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');

  // Generate and return the sitemap
  const sitemap = generateSiteMap();
  res.status(200).send(sitemap);
}
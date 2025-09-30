import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const baseUrl = 'https://cagleslandscaping.com';

  const robotsTxt = `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/api/sitemap.xml

# Disallow admin and private areas
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /private/

# Allow important pages
Allow: /
Allow: /about
Allow: /contact
Allow: /portfolio
Allow: /services/

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Host preference
Host: ${baseUrl}`;

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.status(200).send(robotsTxt);
}
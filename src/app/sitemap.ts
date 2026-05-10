// next
import type { MetadataRoute } from 'next';

// data
import { SERVICE_AREAS } from 'src/data/serviceAreas';

const STATIC_PATHS = [
  '/',
  '/about',
  '/services',
  '/photos',
  '/reviews',
  '/contact',
  '/request',
  '/service-areas',
  '/privacy-policy',
  '/terms',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? '';
  const now = new Date();

  const staticEntries = STATIC_PATHS.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: path === '/' ? 1.0 : 0.7,
  }));

  const areaEntries = SERVICE_AREAS.map((area) => ({
    url: `${base}/service-areas/${area.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...areaEntries];
}

// Pick the assets for the page level slots, while the gallery shows the full set.
// Spend the two source photos above 600px on the largest surfaces, since the rest are small.
import { getMedia, pickVideos, type DescribedMedia } from 'src/data/mediaCaptions';

/** Back the recurring request a quote band. */
export const QUOTE_CTA_MEDIA = getMedia('1976410277356390327');

/** Show the workshop in the About page body. */
export const ABOUT_MEDIA = getMedia('img-2387');

/**
 * Back each inner page hero. `satisfies` keeps the keys literal, so PAGE_HERO_MEDIA.legal
 * is known to exist and an unknown route is a compile error rather than an undefined.
 */
export const PAGE_HERO_MEDIA = {
  about: getMedia('img-2118'),
  services: getMedia('img-1567'),
  reviews: getMedia('img-3049'),
  photos: getMedia('7263495715122942951-jpg-1'),
  contact: getMedia('490754b5-69ae-4ae0-a545-d0f714170e2d'),
  request: getMedia('img-2797'),
  serviceAreas: getMedia('3914887227531153922'),
  legal: getMedia('3531799507795455560'),
} satisfies Record<string, DescribedMedia>;

export type PageHeroRoute = keyof typeof PAGE_HERO_MEDIA;

/** Feature these clips on the services page. */
export const FEATURED_VIDEOS = pickVideos(
  '833465387477952285',
  '1390147046224996442',
  '2195008587047542519',
);

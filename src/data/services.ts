import { getMedia, type DescribedMedia } from 'src/data/mediaCaptions';

export type Service = {
  title: string;
  description?: string;
};

/** A promoted card or slide, carrying the artwork that sits behind it. */
export type Promo = {
  eyebrow: string;
  title: string;
  tagline: string;
  media: DescribedMedia;
};

export type HeroSlide = Promo & {
  cta: { label: string; href: string };
};

export const SERVICES: readonly Service[] = [
  { title: 'Collision Repair' },
  { title: 'Restoration to Pre-Accident Condition' },
  { title: 'Dent Repair' },
  { title: 'Insurance Work' },
  { title: 'Fleets' },
  { title: 'Headlight Installation' },
  { title: 'Custom Paint Work' },
  { title: 'Motorcycle Painting' },
  { title: 'Expert Color Matching' },
  { title: 'Powder Coating' },
  { title: 'Custom Services' },
];

/**
 * Attach each background to the card it belongs to, rather than keeping a
 * parallel media array that a length change could silently knock out of step.
 */
export const HOME_SERVICE_HIGHLIGHTS: readonly Promo[] = [
  {
    eyebrow: 'Auto Body Shop',
    title: 'Auto Body Shop',
    tagline:
      '30+ Years Experience · Elite-Level Work · Trained & Qualified · All Major Brands · Domestic & Import',
    media: getMedia('3531799507795455560'),
  },
  {
    eyebrow: 'Collision Repair',
    title: 'Collision Repair',
    tagline: 'Frame Straightening · Dent Removal · Insurance Claims · Pre-Accident Restoration',
    media: getMedia('img-2597'),
  },
  {
    eyebrow: 'Custom Painting',
    title: 'Custom Painting',
    tagline: 'Expert Color Matching · Finest Paints, Primers & Sealers · Attention to Detail',
    media: getMedia('img-1567'),
  },
];

export const HERO_SLIDES: readonly HeroSlide[] = [
  {
    eyebrow: 'Charlotte Body Shop',
    title: 'Quality Craftsmanship Since 1990',
    tagline:
      'Owner-operated body shop serving Charlotte and surrounding neighborhoods for over 30 years.',
    cta: { label: 'Request a Quote', href: '/request' },
    media: getMedia('img-3046'),
  },
  {
    eyebrow: 'Collision Repair',
    title: 'Restored to Pre-Accident Condition',
    tagline: 'We repair damages and remove dents. We do not just fill them in like most shops.',
    cta: { label: 'View Services', href: '/services' },
    media: getMedia('490754b5-69ae-4ae0-a545-d0f714170e2d'),
  },
  {
    eyebrow: 'Custom Paint',
    title: 'Expert Color Matching',
    tagline:
      'From classic restorations to motorcycle painting and powder coating, done right the first time.',
    cta: { label: 'See Photos', href: '/photos' },
    media: getMedia('7263495715122942951-jpg-1'),
  },
];

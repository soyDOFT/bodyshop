export type Service = {
  title: string;
  description?: string;
};

export const SERVICES: Service[] = [
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

export const HOME_SERVICE_HIGHLIGHTS = [
  {
    eyebrow: 'Auto Body Shop',
    title: 'Auto Body Shop',
    tagline:
      '30+ Years Experience · Elite-Level Work · Trained & Qualified · All Major Brands · Domestic & Import',
  },
  {
    eyebrow: 'Collision Repair',
    title: 'Collision Repair',
    tagline:
      'Frame Straightening · Dent Removal · Insurance Claims · Pre-Accident Restoration',
  },
  {
    eyebrow: 'Custom Painting',
    title: 'Custom Painting',
    tagline:
      'Expert Color Matching · Finest Paints, Primers & Sealers · Attention to Detail',
  },
] as const;

export const HERO_SLIDES = [
  {
    eyebrow: 'Charlotte Body Shop',
    title: 'Quality Craftsmanship Since 1990',
    tagline:
      'Owner-operated body shop serving Charlotte and surrounding neighborhoods for over 30 years.',
    cta: { label: 'Request a Quote', href: '/request' },
  },
  {
    eyebrow: 'Collision Repair',
    title: 'Restored to Pre-Accident Condition',
    tagline:
      'We repair damages and remove dents — we do not just fill them in like most shops.',
    cta: { label: 'View Services', href: '/services' },
  },
  {
    eyebrow: 'Custom Paint',
    title: 'Expert Color Matching',
    tagline:
      'From classic restorations to motorcycle painting and powder coating — done right the first time.',
    cta: { label: 'See Photos', href: '/photos' },
  },
] as const;

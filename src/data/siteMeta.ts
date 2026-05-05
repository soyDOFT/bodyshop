export const SITE_META = {
  name: "Green's Body Shop",
  shortName: "Green's",
  ownerName: "Irvin Green",
  tagline: 'Your choice for Charlotte body shops.',
  description:
    "Charlotte's trusted body shop for collision repair, custom paint, and restoration. 30+ years of experience serving Charlotte and surrounding neighborhoods.",
  city: 'Charlotte',
  state: 'NC',
  address: 'Serving Charlotte, NC & Surrounding Areas',
  phone: '(555) 123-4567',
  phoneHref: 'tel:+15551234567',
  email: 'info@example.com',
  emailHref: 'mailto:info@example.com',
  hours: 'Mon–Fri: 8am – 5pm · Sat by appointment',
  yearsInBusiness: '30+',
  socials: {
    facebook: '#',
    yelp: '#',
    googleReview: '#',
  },
  copyrightHolder: "Green's Body Shop",
} as const;

export type SiteMeta = typeof SITE_META;

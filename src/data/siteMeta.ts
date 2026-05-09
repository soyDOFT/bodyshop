export const SITE_META = {
  name: 'Exclusive Body Shop',
  shortName: 'Exclusive',
  ownerName: 'Walter Salazar',
  tagline: 'Your choice for Charlotte body shops.',
  description:
    "Charlotte's trusted body shop for collision repair, custom paint, and restoration. 30+ years of experience serving Charlotte and surrounding neighborhoods.",
  city: 'Charlotte',
  state: 'NC',
  address: '2316 Beattles Ford Rd. Charlotte, NC 28216-4314',
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
  copyrightHolder: 'Exclusive Body Shop',
} as const;

export type SiteMeta = typeof SITE_META;

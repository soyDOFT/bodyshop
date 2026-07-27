export const SITE_META = {
  name: 'Exclusive Body Shop',
  shortName: 'Exclusive',
  ownerName: 'Walter Salazar',
  tagline: 'Your choice for Charlotte body shops.',
  description:
    "Charlotte's trusted body shop for collision repair, custom paint, and restoration. 30+ years of experience serving Charlotte and surrounding neighborhoods.",
  city: 'Charlotte',
  state: 'NC',
  address: '2316 Beatties Ford Rd. Charlotte, NC 28216-4314',
  phone: '(704) 617-7546',
  phoneHref: 'tel:+17046177546',
  email: 'bodyshop2316@gmail.com',
  emailHref: 'mailto:bodyshop2316@gmail.com',
  hours: 'Mon to Fri: 8am to 5pm. Sat by appointment.',
  yearsInBusiness: '30+',
  socials: {
    // No Facebook page yet, so the footer omits it rather than linking nowhere.
    yelp: 'https://www.yelp.com/biz/exclusive-bodyshop-charlotte',
    googleReview: '#',
  },
  copyrightHolder: 'Exclusive Body Shop',
} as const;

export type SiteMeta = typeof SITE_META;

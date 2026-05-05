export type NavLink = {
  label: string;
  href: string;
};

export const PRIMARY_NAV: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Our Services', href: '/services' },
  { label: 'Photos', href: '/photos' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Contact Us', href: '/contact' },
];

export const QUOTE_LINK: NavLink = {
  label: 'Request a Quote',
  href: '/request',
};

export const FOOTER_NAV: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Service Areas', href: '/service-areas' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Our Services', href: '/services' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Photos', href: '/photos' },
  { label: 'Request a Quote', href: '/request' },
  { label: 'Terms & Conditions', href: '/terms' },
];

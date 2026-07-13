import './globals.css';

// next
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

// components
import { Footer } from 'src/components/layout/Footer/Footer';
import { Header } from 'src/components/layout/Header/Header';
import { SkipLink } from 'src/components/layout/SkipLink/SkipLink';

// data
import { SITE_META } from 'src/data/siteMeta';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_META.name} | ${SITE_META.city} Body Shop`,
    template: `%s | ${SITE_META.name}`,
  },
  description: SITE_META.description,
  applicationName: SITE_META.name,
  authors: [{ name: SITE_META.ownerName }],
  openGraph: {
    type: 'website',
    siteName: SITE_META.name,
    title: SITE_META.name,
    description: SITE_META.description,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_META.name,
    description: SITE_META.description,
  },
  robots: { index: true, follow: true },
};

/** Wrap every page in the shared header, footer, and fonts. */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <SkipLink />
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

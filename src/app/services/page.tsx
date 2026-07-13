// next
import type { Metadata } from 'next';

// components
import { PageHero } from 'src/components/layout/PageHero/PageHero';
import { PageWithAside } from 'src/components/layout/PageWithAside/PageWithAside';
import { QuoteCta } from 'src/components/sections/QuoteCta/QuoteCta';
import { QuoteForm } from 'src/components/form/QuoteForm/QuoteForm';
import { VideoShowcase } from 'src/components/sections/VideoShowcase/VideoShowcase';

// data
import { PAGE_HERO_MEDIA } from 'src/data/mediaSelections';
import { SERVICES } from 'src/data/services';
import { SITE_META } from 'src/data/siteMeta';

export const metadata: Metadata = {
  title: 'Our Services',
  description: `Collision repair, custom paint, dent removal, color matching, powder coating, and more, from ${SITE_META.name} in ${SITE_META.city}.`,
};

/** Render the Services page. */
export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Everything from collision to custom."
        subtitle="A full range of professional auto body services, backed by 30+ years of experience."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Our Services' }]}
        media={PAGE_HERO_MEDIA.services}
      />
      <PageWithAside aside={<QuoteForm />}>
        <h2>Here are some of the services we offer:</h2>
        <ul>
          {SERVICES.map((service) => (
            <li key={service.title}>{service.title}</li>
          ))}
        </ul>
        <p>…and much more.</p>
        <p>
          Read some of our <a href="/reviews">reviews</a>, browse our{' '}
          <a href="/photos">photo gallery</a>, or <a href="/contact">contact us today</a> for a
          no-obligation consultation.
        </p>
      </PageWithAside>
      <VideoShowcase />
      <QuoteCta />
    </>
  );
}

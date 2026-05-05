import type { Metadata } from 'next';
import { PageHero } from 'src/components/layout/PageHero/PageHero';
import { ServiceAreasList } from 'src/components/sections/ServiceAreasList/ServiceAreasList';
import { QuoteCta } from 'src/components/sections/QuoteCta/QuoteCta';
import { SITE_META } from 'src/data/siteMeta';

export const metadata: Metadata = {
  title: 'Service Areas',
  description: `Neighborhoods served by ${SITE_META.name} — based in ${SITE_META.city}, ${SITE_META.state}.`,
};

export default function ServiceAreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Service Areas"
        title="One shop. Many neighborhoods served."
        subtitle={`We work on cars from across the ${SITE_META.city} metro. Pick your neighborhood for details.`}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Service Areas' }]}
      />
      <ServiceAreasList
        variant="plain"
        heading="Areas we serve"
        intro={`All work happens at our shop in ${SITE_META.city}, ${SITE_META.state}. The neighborhoods below are the areas we most commonly serve.`}
      />
      <QuoteCta />
    </>
  );
}

import type { Metadata } from 'next';
import { PageHero } from 'src/components/layout/PageHero/PageHero';
import { TestimonialList } from 'src/components/sections/TestimonialList/TestimonialList';
import { QuoteCta } from 'src/components/sections/QuoteCta/QuoteCta';
import { SITE_META } from 'src/data/siteMeta';

export const metadata: Metadata = {
  title: 'Reviews',
  description: `What our customers say about ${SITE_META.name} — body-shop work in ${SITE_META.city} and surrounding neighborhoods.`,
};

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Reviews"
        title="What our customers say."
        subtitle="Repeat customers, fair prices, work that lasts. Hear it in their words."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Reviews' }]}
      />
      <TestimonialList />
      <QuoteCta />
    </>
  );
}

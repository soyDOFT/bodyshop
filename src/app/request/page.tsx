import styles from './page.module.css';

// next
import type { Metadata } from 'next';

// components
import { Container } from 'src/components/ui/Container/Container';
import { PageHero } from 'src/components/layout/PageHero/PageHero';
import { QuoteForm } from 'src/components/form/QuoteForm/QuoteForm';

// data
import { PAGE_HERO_MEDIA } from 'src/data/mediaSelections';
import { SITE_META } from 'src/data/siteMeta';

export const metadata: Metadata = {
  title: 'Request a Quote',
  description: `Request a no-obligation quote from ${SITE_META.name} in ${SITE_META.city}, ${SITE_META.state}.`,
};

/** Render the quote request page. */
export default function RequestPage() {
  return (
    <>
      <PageHero
        eyebrow="Request a Quote"
        title="Tell us about your project."
        subtitle="The more detail you can share, such as the make, model, and what happened, the faster we can scope and price the work."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Request a Quote' }]}
        media={PAGE_HERO_MEDIA.request}
      />
      <section className={styles.section}>
        <Container width="narrow">
          <QuoteForm heading="Get a no-obligation quote" />
        </Container>
      </section>
    </>
  );
}

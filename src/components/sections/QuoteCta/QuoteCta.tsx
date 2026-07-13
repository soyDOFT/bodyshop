import styles from './QuoteCta.module.css';

// components
import { Button } from 'src/components/ui/Button/Button';
import { Container } from 'src/components/ui/Container/Container';
import { MediaImage } from 'src/components/media/MediaImage/MediaImage';

// data
import { QUOTE_CTA_MEDIA } from 'src/data/mediaSelections';

type QuoteCtaProps = {
  heading?: string;
  body?: string;
  ctaLabel?: string;
};

/** Invite the visitor to request a quote. */
export function QuoteCta({
  heading = 'Interested in our services? Request a quote.',
  body = 'Exclusive Body Shop is not a large, fancy hub of bustling activity, frantically trying to meet deadlines so as to move on to the next job as quickly as possible. Rather, it is a small business with all the necessary tools and equipment to complete any repair as well as, if not better than, the mega shops.',
  ctaLabel = 'Request a Quote',
}: QuoteCtaProps) {
  return (
    <section className={styles.section} aria-labelledby="quote-cta-heading">
      <div className={styles.bg}>
        <MediaImage item={QUOTE_CTA_MEDIA} fill decorative sizes="100vw" />
      </div>
      <div className={styles.overlay} aria-hidden />
      <Container className={styles.inner}>
        <h2 id="quote-cta-heading" className={styles.heading}>
          {heading}
        </h2>
        <p className={styles.body}>{body}</p>
        <Button as="link" href="/request" variant="primary" size="lg">
          {ctaLabel}
        </Button>
      </Container>
    </section>
  );
}

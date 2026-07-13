import styles from '../legal.module.css';

// next
import type { Metadata } from 'next';

// components
import { Container } from 'src/components/ui/Container/Container';
import { PageHero } from 'src/components/layout/PageHero/PageHero';

// data
import { TERMS_SECTIONS } from 'src/data/legal/terms';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and conditions of use for our website.',
};

/** Render the Terms page. */
export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Terms & Conditions"
        title="Terms of Use"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Terms & Conditions' }]}
      />
      <section className={styles.section}>
        <Container width="narrow" className={styles.body}>
          {TERMS_SECTIONS.map((section) => (
            <article key={section.heading}>
              <h2>{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </article>
          ))}
        </Container>
      </section>
    </>
  );
}

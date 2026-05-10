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
          {TERMS_SECTIONS.map((s) => (
            <article key={s.heading}>
              <h2>{s.heading}</h2>
              {s.body.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </article>
          ))}
        </Container>
      </section>
    </>
  );
}

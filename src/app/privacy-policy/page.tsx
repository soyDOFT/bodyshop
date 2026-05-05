import type { Metadata } from 'next';
import { Container } from 'src/components/ui/Container/Container';
import { PageHero } from 'src/components/layout/PageHero/PageHero';
import { PRIVACY_INTRO, PRIVACY_SECTIONS } from 'src/data/legal/privacy';
import styles from '../legal.module.css';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How we collect, use, and protect information from visitors to our website.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy Policy"
        title="Privacy Policy"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]}
      />
      <section className={styles.section}>
        <Container width="narrow" className={styles.body}>
          {PRIVACY_INTRO.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
          {PRIVACY_SECTIONS.map((s) => (
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

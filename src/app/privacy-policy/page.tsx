import styles from '../legal.module.css';

// next
import type { Metadata } from 'next';

// components
import { Container } from 'src/components/ui/Container/Container';
import { PageHero } from 'src/components/layout/PageHero/PageHero';

// data
import { PRIVACY_INTRO, PRIVACY_SECTIONS } from 'src/data/legal/privacy';

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
          {PRIVACY_INTRO.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
          {PRIVACY_SECTIONS.map((section) => (
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

import styles from './page.module.css';

// next
import type { Metadata } from 'next';

// components
import { Icon } from 'src/components/ui/Icon/Icon';
import { PageHero } from 'src/components/layout/PageHero/PageHero';
import { PageWithAside } from 'src/components/layout/PageWithAside/PageWithAside';
import { QuoteCta } from 'src/components/sections/QuoteCta/QuoteCta';
import { QuoteForm } from 'src/components/form/QuoteForm/QuoteForm';

// data
import { PAGE_HERO_MEDIA } from 'src/data/mediaSelections';
import { SITE_META } from 'src/data/siteMeta';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: `Get in touch with ${SITE_META.name} in ${SITE_META.city}, ${SITE_META.state}.`,
};

/** Render the Contact page. */
export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Let's talk about your project."
        subtitle="Call, email, or send a quote request. We typically respond within one business day."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact Us' }]}
        media={PAGE_HERO_MEDIA.contact}
      />
      <PageWithAside aside={<QuoteForm heading="Send us a message" />}>
        <h2>Reach us directly</h2>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Icon name="map-pin" size={22} />
            <div>
              <p className={styles.label}>Service area</p>
              <p className={styles.value}>{SITE_META.address}</p>
            </div>
          </li>
          <li className={styles.item}>
            <Icon name="phone" size={22} />
            <div>
              <p className={styles.label}>Phone</p>
              <a href={SITE_META.phoneHref} className={styles.value}>
                {SITE_META.phone}
              </a>
            </div>
          </li>
          <li className={styles.item}>
            <Icon name="mail" size={22} />
            <div>
              <p className={styles.label}>Email</p>
              <a href={SITE_META.emailHref} className={styles.value}>
                {SITE_META.email}
              </a>
            </div>
          </li>
          <li className={styles.item}>
            <Icon name="clock" size={22} />
            <div>
              <p className={styles.label}>Hours</p>
              <p className={styles.value}>{SITE_META.hours}</p>
            </div>
          </li>
        </ul>
        <p>
          Owner: <strong>{SITE_META.ownerName}</strong>
        </p>
      </PageWithAside>
      <QuoteCta />
    </>
  );
}

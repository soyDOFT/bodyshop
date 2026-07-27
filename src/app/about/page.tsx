import styles from './about.module.css';

// next
import type { Metadata } from 'next';

// components
import { MediaImage } from 'src/components/media/MediaImage/MediaImage';
import { PageHero } from 'src/components/layout/PageHero/PageHero';
import { PageWithAside } from 'src/components/layout/PageWithAside/PageWithAside';
import { QuoteCta } from 'src/components/sections/QuoteCta/QuoteCta';
import { QuoteForm } from 'src/components/form/QuoteForm/QuoteForm';

// data
import { ABOUT_MEDIA, PAGE_HERO_MEDIA } from 'src/data/mediaSelections';
import { SITE_META } from 'src/data/siteMeta';

export const metadata: Metadata = {
  title: 'About Us',
  description: `Meet ${SITE_META.ownerName} and learn about ${SITE_META.yearsInBusiness} years of body-shop craftsmanship in ${SITE_META.city}, ${SITE_META.state}.`,
};

/** Render the About page. */
export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Owner-operated. Detail-obsessed."
        subtitle={`Owner ${SITE_META.ownerName} brings ${SITE_META.yearsInBusiness} years of auto-body and custom-painting experience to every job.`}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About Us' }]}
        media={PAGE_HERO_MEDIA.about}
      />
      <PageWithAside aside={<QuoteForm />}>
        <div className={styles.photo}>
          <MediaImage
            item={ABOUT_MEDIA}
            fill
            sizes="(max-width: 959px) 100vw, (max-width: 1200px) 55vw, 700px"
          />
        </div>
        <h2>About {SITE_META.name}</h2>
        <p>
          {SITE_META.name}&rsquo;s owner {SITE_META.ownerName} is a 3-time winner for &ldquo;Best
          in Show&rdquo; and has over {SITE_META.yearsInBusiness} years of auto-body and
          custom-painting experience.
        </p>
        <p>
          {SITE_META.ownerName} will take care of you from concept to completion with the extreme
          attention to detail and top-notch craftsmanship your project deserves. He has access to
          the most advanced technology in the industry and devotes himself to each specialized
          project. As a result, you can expect personalized care and close individual attention
          throughout your project.
        </p>
        <p>
          We can repair damages and &ldquo;remove&rdquo; dents, not just fill them in like most shops. Our
          upholstery department can accommodate all your upholstery needs as well. We do powder
          coating, too.
        </p>
        <p>
          For a complete list of what we offer, visit our{' '}
          <a href="/services">services page</a>. Read some of our <a href="/reviews">reviews</a>,
          take a look at our <a href="/photos">photo gallery</a>, or{' '}
          <a href="/contact">contact us today</a> for a no-obligation consultation.
        </p>
      </PageWithAside>
      <QuoteCta />
    </>
  );
}

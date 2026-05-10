import styles from './page.module.css';

// components
import { Container } from 'src/components/ui/Container/Container';
import { FeatureCards } from 'src/components/sections/FeatureCards/FeatureCards';
import { HeroCarousel } from 'src/components/hero/HeroCarousel/HeroCarousel';
import { QuoteCta } from 'src/components/sections/QuoteCta/QuoteCta';
import { ServiceAreasList } from 'src/components/sections/ServiceAreasList/ServiceAreasList';
import { ServiceCards } from 'src/components/sections/ServiceCards/ServiceCards';

// data
import { SITE_META } from 'src/data/siteMeta';

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <ServiceCards />
      <section className={styles.intro} aria-labelledby="intro-heading">
        <Container>
          <p className={styles.eyebrow}>Your choice for {SITE_META.city} body shops</p>
          <h1 id="intro-heading" className={styles.heading}>
            Quality craftsmanship and outstanding customer service for over {SITE_META.yearsInBusiness} years.
          </h1>
          <p className={styles.body}>
            When it comes to {SITE_META.city} body shops, accept only the best. We offer a wide
            array of professional auto-body and custom-painting services. Our years of experience,
            unmatched quality, and personalized customer service make us a leader for body shops
            in {SITE_META.city}. We specialize in insurance work, insurance claims, and insurance
            repairs. If you&rsquo;re looking for timely and reliable service from a shop that
            really cares and takes pride in its work, trust {SITE_META.name}.
          </p>
        </Container>
      </section>
      <FeatureCards />
      <ServiceAreasList
        intro={`We serve the following ${SITE_META.city}-area neighborhoods from our shop in ${SITE_META.city}, ${SITE_META.state}.`}
      />
      <QuoteCta />
    </>
  );
}

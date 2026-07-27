import styles from './FeatureCards.module.css';

// components
import { Button } from 'src/components/ui/Button/Button';
import { Container } from 'src/components/ui/Container/Container';
import { Icon } from 'src/components/ui/Icon/Icon';
import { MediaImage } from 'src/components/media/MediaImage/MediaImage';

// data
import { getMedia } from 'src/data/mediaCaptions';

const FEATURES = [
  {
    eyebrow: 'About Us',
    title: 'About Us',
    body:
      'With our expertise and the quality auto body services we provide, you can rest assured that your project will receive extreme attention to detail.',
    cta: { label: 'Learn More', href: '/about' },
    media: getMedia('img-2118'),
  },
  {
    eyebrow: 'Our Services',
    title: 'Our Services',
    body:
      'Our seasoned pros specialize in collision repair, restoring to pre-accident condition, insurance work, custom paint, expert color matching, and more.',
    cta: { label: 'View Services', href: '/services' },
    media: getMedia('img-1433-1'),
  },
  {
    eyebrow: 'Customer Reviews',
    title: 'Customer Reviews',
    body:
      "Read what owner Walter Salazar's satisfied customers have to say and find out why they're so loyal. See the real results he has achieved.",
    cta: { label: 'Read Reviews', href: '/reviews' },
    media: getMedia('3914887227531153922'),
  },
] as const;

/** Link to the About, Services, and Reviews pages. */
export function FeatureCards() {
  return (
    <section className={styles.section} aria-labelledby="feature-cards-heading">
      <Container>
        <h2 id="feature-cards-heading" className="visually-hidden-heading">
          Explore our shop
        </h2>
        <ul className={styles.grid}>
          {FEATURES.map((feature) => (
            <li key={feature.title} className={styles.card}>
              <div className={styles.media}>
                <MediaImage
                  item={feature.media}
                  fill
                  decorative
                  rounded="md"
                  sizes="(max-width: 719px) 100vw, 33vw"
                />
              </div>
              <div className={styles.body}>
                <p className={styles.eyebrow}>{feature.eyebrow}</p>
                <h3 className={styles.title}>{feature.title}</h3>
                <p className={styles.copy}>{feature.body}</p>
                <Button as="link" href={feature.cta.href} variant="ghost" size="sm">
                  {feature.cta.label}
                  <Icon name="arrow-right" size={16} />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

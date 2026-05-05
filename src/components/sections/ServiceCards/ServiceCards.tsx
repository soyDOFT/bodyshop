import { Container } from 'src/components/ui/Container/Container';
import { Button } from 'src/components/ui/Button/Button';
import { Placeholder } from 'src/components/media/Placeholder/Placeholder';
import { HOME_SERVICE_HIGHLIGHTS } from 'src/data/services';
import styles from './ServiceCards.module.css';

export function ServiceCards() {
  return (
    <section className={styles.section} aria-labelledby="service-highlights-heading">
      <Container>
        <h2 id="service-highlights-heading" className="visually-hidden-heading">
          Service highlights
        </h2>
        <ul className={styles.grid}>
          {HOME_SERVICE_HIGHLIGHTS.map((card) => (
            <li key={card.title} className={styles.card}>
              <div className={styles.cardMedia}>
                <Placeholder decorative fill />
              </div>
              <div className={styles.cardOverlay} aria-hidden />
              <div className={styles.cardBody}>
                <p className={styles.cardEyebrow}>{card.eyebrow}</p>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardTagline}>{card.tagline}</p>
                <Button as="link" href="/request" variant="onDark" size="sm">
                  Request a Quote
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

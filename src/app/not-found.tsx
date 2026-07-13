import styles from './not-found.module.css';

// next
import Link from 'next/link';

// components
import { Button } from 'src/components/ui/Button/Button';
import { Container } from 'src/components/ui/Container/Container';

/** Render the 404 page. */
export default function NotFound() {
  return (
    <section className={styles.section}>
      <Container width="narrow" className={styles.inner}>
        <p className={styles.eyebrow}>404</p>
        <h1 className={styles.heading}>We can&rsquo;t find that page.</h1>
        <p className={styles.body}>
          The page you were looking for moved or never existed. Try one of the links below.
        </p>
        <div className={styles.actions}>
          <Button as="link" href="/" variant="primary">
            Back to Home
          </Button>
          <Button as="link" href="/contact" variant="ghost">
            Contact us
          </Button>
        </div>
        <ul className={styles.linkList}>
          <li>
            <Link href="/services">Our Services</Link>
          </li>
          <li>
            <Link href="/photos">Photos</Link>
          </li>
          <li>
            <Link href="/reviews">Reviews</Link>
          </li>
          <li>
            <Link href="/service-areas">Service Areas</Link>
          </li>
        </ul>
      </Container>
    </section>
  );
}

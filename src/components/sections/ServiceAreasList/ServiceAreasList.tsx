import styles from './ServiceAreasList.module.css';

// next
import Link from 'next/link';

// helpers
import clsx from 'clsx';

// components
import { Container } from 'src/components/ui/Container/Container';

// data
import { SERVICE_AREAS } from 'src/data/serviceAreas';

type ServiceAreasListProps = {
  variant?: 'plain' | 'banded';
  heading?: string;
  intro?: string;
};

export function ServiceAreasList({
  variant = 'banded',
  heading = 'Our Service Areas',
  intro,
}: ServiceAreasListProps) {
  return (
    <section
      className={clsx(styles.section, variant === 'banded' && styles.banded)}
      aria-labelledby="service-areas-heading"
    >
      <Container>
        <div className={styles.head}>
          <h2 id="service-areas-heading" className={styles.heading}>
            {heading}
          </h2>
          {intro && <p className={styles.intro}>{intro}</p>}
        </div>
        <ul className={styles.grid}>
          {SERVICE_AREAS.map((area) => (
            <li key={area.slug}>
              <Link href={`/service-areas/${area.slug}`} className={styles.tile}>
                {area.name}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

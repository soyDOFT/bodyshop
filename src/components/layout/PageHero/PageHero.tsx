import { Container } from 'src/components/ui/Container/Container';
import { Breadcrumbs, type BreadcrumbItem } from 'src/components/layout/Breadcrumbs/Breadcrumbs';
import { Placeholder } from 'src/components/media/Placeholder/Placeholder';
import styles from './PageHero.module.css';

type PageHeroProps = {
  title: string;
  eyebrow?: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
};

export function PageHero({ title, eyebrow, subtitle, breadcrumbs }: PageHeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="page-hero-title">
      <div className={styles.bg}>
        <Placeholder decorative fill />
      </div>
      <div className={styles.overlay} aria-hidden />
      <Container className={styles.inner}>
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h1 id="page-hero-title" className={styles.title}>
          {title}
        </h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </Container>
    </section>
  );
}

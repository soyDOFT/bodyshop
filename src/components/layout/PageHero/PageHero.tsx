import styles from './PageHero.module.css';

// components
import { Breadcrumbs, type BreadcrumbItem } from 'src/components/layout/Breadcrumbs/Breadcrumbs';
import { Container } from 'src/components/ui/Container/Container';
import { MediaImage } from 'src/components/media/MediaImage/MediaImage';

// data
import type { DescribedMedia } from 'src/data/mediaCaptions';
import { PAGE_HERO_MEDIA } from 'src/data/mediaSelections';

type PageHeroProps = {
  title: string;
  eyebrow?: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  /** Back this route, falling back to a general shop photo. */
  media?: DescribedMedia;
};

/** Render an inner page hero over a background photo. */
export function PageHero({ title, eyebrow, subtitle, breadcrumbs, media }: PageHeroProps) {
  const background = media ?? PAGE_HERO_MEDIA.legal;

  return (
    <section className={styles.hero} aria-labelledby="page-hero-title">
      <div className={styles.bg}>
        <MediaImage item={background} fill decorative eager lcp sizes="100vw" />
      </div>
      <div className={styles.overlay} aria-hidden />
      <Container className={styles.inner}>
        {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : null}
        {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
        <h1 id="page-hero-title" className={styles.title}>
          {title}
        </h1>
        {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
      </Container>
    </section>
  );
}

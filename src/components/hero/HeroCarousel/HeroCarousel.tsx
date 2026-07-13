'use client';
import styles from './HeroCarousel.module.css';
import { useCallback, useEffect, useState } from 'react';

// helpers
import clsx from 'clsx';

// hooks
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

// components
import { Button } from 'src/components/ui/Button/Button';
import { Container } from 'src/components/ui/Container/Container';
import { Icon } from 'src/components/ui/Icon/Icon';
import { MediaImage } from 'src/components/media/MediaImage/MediaImage';
import { VisuallyHidden } from 'src/components/ui/VisuallyHidden/VisuallyHidden';

// data
import { HERO_SLIDES } from 'src/data/services';

// Keep the carousel advancing after someone uses the controls instead of freezing for good.
const AUTOPLAY_OPTIONS = {
  delay: 5000,
  stopOnFocusIn: true,
  playOnInit: true,
  stopOnInteraction: false,
};

const SYNC_EVENTS = ['select', 'reInit', 'init'] as const;

/** Rotate the home page hero slides, with arrows and dots. */
export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [
    Autoplay(AUTOPLAY_OPTIONS),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  type EmblaApi = NonNullable<typeof emblaApi>;

  const totalSlides = HERO_SLIDES.length;

  // Reset autoplay on every manual move, since it only restarts its countdown on pointer
  // interaction and would otherwise fire the pending tick right after an arrow or dot click.
  const navigate = useCallback(
    (move: (api: EmblaApi) => void) => {
      if (!emblaApi) return;
      move(emblaApi);
      emblaApi.plugins().autoplay?.reset();
    },
    [emblaApi],
  );

  const scrollPrev = useCallback(() => navigate((api) => api.scrollPrev()), [navigate]);
  const scrollNext = useCallback(() => navigate((api) => api.scrollNext()), [navigate]);
  const scrollTo = useCallback(
    (slideIndex: number) => navigate((api) => api.scrollTo(slideIndex)),
    [navigate],
  );

  // Mirror the carousel position into state so the dots can show which slide is current.
  useEffect(() => {
    if (!emblaApi) return;

    const syncSelectedIndex = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    SYNC_EVENTS.forEach((event) => emblaApi.on(event, syncSelectedIndex));

    return () => {
      SYNC_EVENTS.forEach((event) => emblaApi.off(event, syncSelectedIndex));
    };
  }, [emblaApi]);

  return (
    <section
      className={styles.hero}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured services"
    >
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.track}>
          {HERO_SLIDES.map((slide, slideIndex) => (
            <article
              key={slide.title}
              className={styles.slide}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${slideIndex + 1} of ${totalSlides}: ${slide.title}`}
              aria-hidden={slideIndex !== selectedIndex || undefined}
            >
              <div className={styles.media}>
                <MediaImage
                  item={slide.media}
                  fill
                  decorative
                  eager={slideIndex === 0}
                  sizes="100vw"
                />
              </div>
              <div className={styles.overlay} aria-hidden />
              <Container className={styles.content}>
                <p className={styles.eyebrow}>{slide.eyebrow}</p>
                <h2 className={styles.title}>{slide.title}</h2>
                <p className={styles.tagline}>{slide.tagline}</p>
                <Button as="link" href={slide.cta.href} variant="primary" size="lg">
                  {slide.cta.label}
                </Button>
              </Container>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.controls} aria-label="Carousel controls">
        <button
          type="button"
          className={styles.navBtn}
          onClick={scrollPrev}
          aria-label="Previous slide"
        >
          <Icon name="chevron-left" size={24} />
        </button>
        <ul className={styles.dots}>
          {HERO_SLIDES.map((slide, slideIndex) => (
            <li key={slide.title}>
              <button
                type="button"
                className={clsx(styles.dot, slideIndex === selectedIndex && styles.dotActive)}
                onClick={() => scrollTo(slideIndex)}
                aria-current={slideIndex === selectedIndex || undefined}
                aria-label={`Go to slide ${slideIndex + 1}`}
              >
                <VisuallyHidden>Slide {slideIndex + 1}</VisuallyHidden>
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className={styles.navBtn}
          onClick={scrollNext}
          aria-label="Next slide"
        >
          <Icon name="chevron-right" size={24} />
        </button>
      </div>
    </section>
  );
}

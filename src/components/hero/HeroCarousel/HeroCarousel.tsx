'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import clsx from 'clsx';
import { Container } from 'src/components/ui/Container/Container';
import { Button } from 'src/components/ui/Button/Button';
import { Icon } from 'src/components/ui/Icon/Icon';
import { Placeholder } from 'src/components/media/Placeholder/Placeholder';
import { VisuallyHidden } from 'src/components/ui/VisuallyHidden/VisuallyHidden';
import { HERO_SLIDES } from 'src/data/services';
import styles from './HeroCarousel.module.css';

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const total = HERO_SLIDES.length;

  useEffect(() => {
    if (!emblaApi) return;
    const handler = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', handler);
    emblaApi.on('reInit', handler);
    emblaApi.on('init', handler);
    return () => {
      emblaApi.off('select', handler);
      emblaApi.off('reInit', handler);
      emblaApi.off('init', handler);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((idx: number) => emblaApi?.scrollTo(idx), [emblaApi]);

  return (
    <section
      className={styles.hero}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured services"
    >
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.track}>
          {HERO_SLIDES.map((slide, i) => (
            <article
              key={slide.title}
              className={styles.slide}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${i + 1} of ${total}: ${slide.title}`}
              aria-hidden={i !== selectedIndex || undefined}
            >
              <div className={styles.media}>
                <Placeholder decorative fill priority={i === 0} />
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
          {HERO_SLIDES.map((slide, i) => (
            <li key={slide.title}>
              <button
                type="button"
                className={clsx(styles.dot, i === selectedIndex && styles.dotActive)}
                onClick={() => scrollTo(i)}
                aria-current={i === selectedIndex || undefined}
                aria-label={`Go to slide ${i + 1}`}
              >
                <VisuallyHidden>Slide {i + 1}</VisuallyHidden>
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

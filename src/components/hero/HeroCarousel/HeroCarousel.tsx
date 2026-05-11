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
import { Placeholder } from 'src/components/media/Placeholder/Placeholder';
import { VisuallyHidden } from 'src/components/ui/VisuallyHidden/VisuallyHidden';

// data
import { HERO_SLIDES } from 'src/data/services';

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [Autoplay({ delay: 5000, stopOnFocusIn: true, playOnInit: true })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const totalSlides = HERO_SLIDES.length;

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((slideIndex: number) => emblaApi?.scrollTo(slideIndex), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const syncSelectedIndex = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', syncSelectedIndex);
    emblaApi.on('reInit', syncSelectedIndex);
    emblaApi.on('init', syncSelectedIndex);

    return () => {
      // cleanup event listeners on unmount
      emblaApi.off('select', syncSelectedIndex);
      emblaApi.off('reInit', syncSelectedIndex);
      emblaApi.off('init', syncSelectedIndex);
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
                <Placeholder decorative fill priority={slideIndex === 0} />
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

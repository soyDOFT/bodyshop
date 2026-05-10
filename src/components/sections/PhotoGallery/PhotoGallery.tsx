'use client';
import styles from './PhotoGallery.module.css';
import { useState } from 'react';

// components
import { Container } from 'src/components/ui/Container/Container';
import { Lightbox, type LightboxImage } from 'src/components/ui/Lightbox/Lightbox';
import { Placeholder } from 'src/components/media/Placeholder/Placeholder';

type PhotoGalleryProps = {
  count?: number;
  altPrefix?: string;
};

export function PhotoGallery({ count = 20, altPrefix = 'Body shop project photo' }: PhotoGalleryProps) {
  const images: LightboxImage[] = Array.from({ length: count }, (_, imageIndex) => ({
    alt: `${altPrefix} ${imageIndex + 1}`,
  }));
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function open(imageIndex: number) {
    setOpenIndex(imageIndex);
  }
  function close() {
    setOpenIndex(null);
  }
  function prev() {
    setOpenIndex((current) => (current === null ? null : (current - 1 + images.length) % images.length));
  }
  function next() {
    setOpenIndex((current) => (current === null ? null : (current + 1) % images.length));
  }

  return (
    <section className={styles.section} aria-labelledby="gallery-heading">
      <Container>
        <h2 id="gallery-heading" className="visually-hidden-heading">
          Photo gallery
        </h2>
        <ul className={styles.grid}>
          {images.map((image, imageIndex) => (
            <li key={imageIndex} className={styles.cell}>
              <button
                type="button"
                className={styles.tile}
                onClick={() => open(imageIndex)}
                aria-label={`Open ${image.alt} (photo ${imageIndex + 1} of ${images.length})`}
              >
                <span className={styles.imageWrap}>
                  <Placeholder
                    fill
                    alt=""
                    sizes="(max-width: 540px) 50vw, (max-width: 960px) 33vw, 25vw"
                  />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Container>
      <Lightbox
        images={images}
        openIndex={openIndex}
        onClose={close}
        onPrev={prev}
        onNext={next}
      />
    </section>
  );
}

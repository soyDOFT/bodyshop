'use client';

import { useState } from 'react';
import { Container } from 'src/components/ui/Container/Container';
import { Placeholder } from 'src/components/media/Placeholder/Placeholder';
import { Lightbox, type LightboxImage } from 'src/components/ui/Lightbox/Lightbox';
import styles from './PhotoGallery.module.css';

type PhotoGalleryProps = {
  count?: number;
  altPrefix?: string;
};

export function PhotoGallery({ count = 20, altPrefix = 'Body shop project photo' }: PhotoGalleryProps) {
  const images: LightboxImage[] = Array.from({ length: count }, (_, i) => ({
    alt: `${altPrefix} ${i + 1}`,
  }));
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function open(idx: number) {
    setOpenIndex(idx);
  }
  function close() {
    setOpenIndex(null);
  }
  function prev() {
    setOpenIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }
  function next() {
    setOpenIndex((i) => (i === null ? null : (i + 1) % images.length));
  }

  return (
    <section className={styles.section} aria-labelledby="gallery-heading">
      <Container>
        <h2 id="gallery-heading" className="visually-hidden-heading">
          Photo gallery
        </h2>
        <ul className={styles.grid}>
          {images.map((img, idx) => (
            <li key={idx} className={styles.cell}>
              <button
                type="button"
                className={styles.tile}
                onClick={() => open(idx)}
                aria-label={`Open ${img.alt} (photo ${idx + 1} of ${images.length})`}
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

'use client';

import { useEffect, useRef } from 'react';
import { Icon } from 'src/components/ui/Icon/Icon';
import { Placeholder } from 'src/components/media/Placeholder/Placeholder';
import { useLockBodyScroll } from 'src/utils/hooks/useLockBodyScroll';
import styles from './Lightbox.module.css';

export type LightboxImage = {
  alt: string;
};

type LightboxProps = {
  images: LightboxImage[];
  openIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export function Lightbox({ images, openIndex, onClose, onPrev, onNext }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const open = openIndex !== null;

  useLockBodyScroll(open);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      requestAnimationFrame(() => closeBtnRef.current?.focus());
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        onNext();
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onPrev, onNext]);

  const current = open ? images[openIndex!] : null;

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      aria-label={current ? `Photo ${openIndex! + 1} of ${images.length}: ${current.alt}` : 'Photo viewer'}
    >
      {current && (
        <div className={styles.inner}>
          <div className={styles.toolbar}>
            <span className={styles.counter} aria-live="polite">
              {openIndex! + 1} / {images.length}
            </span>
            <button
              ref={closeBtnRef}
              type="button"
              className={styles.toolbarBtn}
              onClick={onClose}
              aria-label="Close photo viewer"
            >
              <Icon name="close" size={24} />
            </button>
          </div>
          <div className={styles.stage}>
            <button
              type="button"
              className={styles.nav}
              onClick={onPrev}
              aria-label="Previous photo"
            >
              <Icon name="chevron-left" size={28} />
            </button>
            <figure className={styles.figure}>
              <div className={styles.imageWrap}>
                <Placeholder
                  alt={current.alt}
                  fill
                  sizes="(max-width: 768px) 90vw, 80vw"
                />
              </div>
              <figcaption className={styles.caption}>{current.alt}</figcaption>
            </figure>
            <button
              type="button"
              className={styles.nav}
              onClick={onNext}
              aria-label="Next photo"
            >
              <Icon name="chevron-right" size={28} />
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}

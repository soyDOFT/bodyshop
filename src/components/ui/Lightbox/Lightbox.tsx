'use client';
import styles from './Lightbox.module.css';
import { useEffect, useRef } from 'react';

// hooks
import { useLockBodyScroll } from 'src/utils/hooks/useLockBodyScroll';

// components
import { Icon } from 'src/components/ui/Icon/Icon';
import { MediaImage } from 'src/components/media/MediaImage/MediaImage';
import { VideoPlayer } from 'src/components/media/VideoPlayer/VideoPlayer';

// data
import type { DescribedMedia } from 'src/data/mediaCaptions';

type LightboxProps = {
  items: readonly DescribedMedia[];
  openIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

/** Show one gallery item full screen, handling photos and clips alike. */
export function Lightbox({ items, openIndex, onClose, onPrev, onNext }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const currentItem = openIndex === null ? undefined : items[openIndex];
  const isOpen = currentItem !== undefined;

  useLockBodyScroll(isOpen);

  // Drive the native dialog, which gives focus trapping and Escape for free.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
      requestAnimationFrame(() => closeBtnRef.current?.focus());
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    /** Step through the gallery, leaving the arrow keys to a focused video. */
    function handleArrowKeys(event: KeyboardEvent) {
      // Leave the arrow keys alone for a focused video, which uses them to seek and set volume.
      if (event.target instanceof HTMLMediaElement) return;
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;

      event.preventDefault();
      if (event.key === 'ArrowLeft') onPrev();
      else onNext();
    }

    document.addEventListener('keydown', handleArrowKeys);
    return () => document.removeEventListener('keydown', handleArrowKeys);
  }, [isOpen, onPrev, onNext]);

  const position = openIndex === null ? 0 : openIndex + 1;
  const label = currentItem
    ? `${currentItem.kind === 'video' ? 'Video' : 'Photo'} ${position} of ${items.length}: ${currentItem.alt}`
    : 'Media viewer';

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      aria-label={label}
    >
      {currentItem ? (
        <div className={styles.inner}>
          <div className={styles.toolbar}>
            <span className={styles.counter} aria-live="polite">
              {position} / {items.length}
            </span>
            <button
              ref={closeBtnRef}
              type="button"
              className={styles.toolbarBtn}
              onClick={onClose}
              aria-label="Close media viewer"
            >
              <Icon name="close" size={24} />
            </button>
          </div>

          <div className={styles.stage}>
            <button type="button" className={styles.nav} onClick={onPrev} aria-label="Previous item">
              <Icon name="chevron-left" size={28} />
            </button>

            <figure className={styles.figure}>
              <div className={styles.mediaWrap}>
                {currentItem.kind === 'video' ? (
                  // Key by id so stepping to another clip mounts a fresh element rather than reusing one mid playback.
                  <VideoPlayer key={currentItem.id} item={currentItem} autoPlay />
                ) : (
                  <MediaImage item={currentItem} fill sizes="(max-width: 768px) 90vw, 80vw" eager />
                )}
              </div>
              <figcaption className={styles.caption}>{currentItem.alt}</figcaption>
            </figure>

            <button type="button" className={styles.nav} onClick={onNext} aria-label="Next item">
              <Icon name="chevron-right" size={28} />
            </button>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}

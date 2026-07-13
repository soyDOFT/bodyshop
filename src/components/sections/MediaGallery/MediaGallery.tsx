'use client';
import styles from './MediaGallery.module.css';

// helpers
import clsx from 'clsx';

// hooks
import { useLightbox } from 'src/utils/hooks/useLightbox';

// components
import { Container } from 'src/components/ui/Container/Container';
import { Lightbox } from 'src/components/ui/Lightbox/Lightbox';
import { MediaImage } from 'src/components/media/MediaImage/MediaImage';

// data
import type { DescribedMedia, DescribedVideo } from 'src/data/mediaCaptions';

type MediaGalleryProps = {
  items: readonly DescribedMedia[];
  /** Render this many tiles eagerly before lazy loading takes over. */
  eagerCount?: number;
};

const TILE_SIZES = '(max-width: 540px) 50vw, (max-width: 960px) 33vw, 25vw';

/** Format a runtime in seconds as m:ss. */
function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${minutes}:${String(remainder).padStart(2, '0')}`;
}

/** Mark a tile as a clip so it is not mistaken for a still. */
function VideoTileBadge({ item }: { item: DescribedVideo }) {
  return (
    <>
      <span className={styles.playBadge} aria-hidden>
        <span className={styles.playIcon}>
          <span className={styles.playGlyph} />
        </span>
      </span>
      <span className={styles.duration} aria-hidden>
        {formatDuration(item.duration)}
      </span>
    </>
  );
}

/** Show photos and clips in a grid, opening any tile in the full screen viewer. */
export function MediaGallery({ items, eagerCount = 8 }: MediaGalleryProps) {
  const { openIndex, open, close, prev, next } = useLightbox(items.length);

  return (
    <section className={styles.section} aria-labelledby="gallery-heading">
      <Container>
        <h2 id="gallery-heading" className="visually-hidden-heading">
          Photo and video gallery
        </h2>
        <ul className={styles.grid}>
          {items.map((item, itemIndex) => {
            const isVideo = item.kind === 'video';
            const action = isVideo ? 'Play video' : 'Open photo';

            return (
              <li key={item.id} className={styles.cell}>
                <button
                  type="button"
                  className={clsx(styles.tile, isVideo && styles.tileVideo)}
                  onClick={() => open(itemIndex)}
                  aria-label={`${action} ${itemIndex + 1} of ${items.length}: ${item.alt}`}
                >
                  <span className={styles.imageWrap}>
                    <MediaImage
                      item={item}
                      fill
                      decorative
                      eager={itemIndex < eagerCount}
                      sizes={TILE_SIZES}
                    />
                    {item.kind === 'video' ? <VideoTileBadge item={item} /> : null}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </Container>

      <Lightbox items={items} openIndex={openIndex} onClose={close} onPrev={prev} onNext={next} />
    </section>
  );
}

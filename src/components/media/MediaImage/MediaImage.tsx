import styles from './MediaImage.module.css';

// next
import Image from 'next/image';

// helpers
import clsx from 'clsx';

// data
import type { DescribedMedia } from 'src/data/mediaCaptions';

type Rounded = 'sm' | 'md' | 'lg' | 'none';

type MediaImageProps = {
  /** Accept a clip too and render its poster frame as the still. */
  item: DescribedMedia;
  /** Stretch to the nearest positioned ancestor instead of the intrinsic size. */
  fill?: boolean;
  sizes?: string;
  /** Skip lazy loading for above the fold art. */
  eager?: boolean;
  /** Hide from assistive tech when nearby text already carries the meaning. */
  decorative?: boolean;
  rounded?: Rounded;
  className?: string;
};

/** Render a manifest asset through next/image, blurring up from its inline placeholder. */
export function MediaImage({
  item,
  fill,
  sizes,
  eager,
  decorative,
  rounded = 'none',
  className,
}: MediaImageProps) {
  const roundedClass = rounded !== 'none' && styles[`rounded-${rounded}`];
  // Keep alt out of the spread below, since jsx-a11y cannot see it through one.
  const alt = decorative ? '' : item.alt;

  // Next 16 deprecated `priority`, so express urgency through loading and fetchPriority.
  const shared = {
    src: item.kind === 'video' ? item.poster : item.src,
    placeholder: 'blur' as const,
    blurDataURL: item.blurDataUrl,
    loading: eager ? ('eager' as const) : ('lazy' as const),
    fetchPriority: eager ? ('high' as const) : undefined,
    'aria-hidden': decorative || undefined,
  };

  if (fill) {
    return (
      <span aria-hidden={decorative || undefined} className={clsx(styles.fillWrap, roundedClass, className)}>
        <Image {...shared} alt={alt} fill sizes={sizes ?? '100vw'} className={styles.image} />
      </span>
    );
  }

  return (
    <Image
      {...shared}
      alt={alt}
      width={item.width}
      height={item.height}
      sizes={sizes}
      className={clsx(roundedClass, className)}
    />
  );
}

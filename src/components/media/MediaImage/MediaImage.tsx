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
  /** Skip lazy loading for art that must be present before it scrolls into view. */
  eager?: boolean;
  /** Mark the single image that is the page's LCP, so it outranks the other eager art. */
  lcp?: boolean;
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
  lcp,
  decorative,
  rounded = 'none',
  className,
}: MediaImageProps) {
  const roundedClass = rounded !== 'none' && styles[`rounded-${rounded}`];
  // Keep alt out of the spread below, since jsx-a11y cannot see it through one.
  const alt = decorative ? '' : item.alt;

  // Next 16 deprecated `priority` in favour of `preload`, but `preload` is documented as the
  // wrong tool once `loading` or `fetchPriority` is set, so drive both of those directly.
  // They are separate axes: `eager` says fetch it now, `lcp` says outrank the other eager art.
  //
  // No blur placeholder: Next renders blurDataUrl as an SVG with preserveAspectRatio='none', so
  // it stretches where the real image crops, which reads as a broken image rather than a loading
  // one. The wrapper carries a flat tint instead.
  const shared = {
    src: item.kind === 'video' ? item.poster : item.src,
    loading: eager || lcp ? ('eager' as const) : ('lazy' as const),
    fetchPriority: lcp ? ('high' as const) : undefined,
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

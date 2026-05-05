import Image from 'next/image';
import clsx from 'clsx';
import styles from './Placeholder.module.css';

const PLACEHOLDER_SRC = '/checkerboardpattern.svg';

type Rounded = 'sm' | 'md' | 'lg' | 'pill' | 'none';

type FillProps = {
  fill: true;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  rounded?: Rounded;
};

type SizedProps = {
  width: number;
  height: number;
  alt: string;
  className?: string;
  priority?: boolean;
  rounded?: Rounded;
};

type DecorativeProps = {
  decorative: true;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  rounded?: Rounded;
};

export type PlaceholderProps = FillProps | SizedProps | DecorativeProps;

type AllProps = {
  fill?: boolean;
  width?: number;
  height?: number;
  alt?: string;
  sizes?: string;
  priority?: boolean;
  rounded?: Rounded;
  decorative?: boolean;
  className?: string;
};

export function Placeholder({
  fill,
  width,
  height,
  alt,
  sizes,
  priority,
  rounded = 'none',
  decorative,
  className,
}: PlaceholderProps & AllProps) {
  const wrapperClass = clsx(
    styles.placeholder,
    rounded !== 'none' && styles[`rounded-${rounded}`],
    className,
  );

  if (decorative) {
    if (fill) {
      return (
        <span aria-hidden className={clsx(wrapperClass, styles.fillWrap)}>
          <Image
            src={PLACEHOLDER_SRC}
            alt=""
            fill
            sizes="100vw"
            className={styles.image}
          />
        </span>
      );
    }
    return (
      <Image
        src={PLACEHOLDER_SRC}
        alt=""
        aria-hidden
        width={width ?? 64}
        height={height ?? 64}
        className={wrapperClass}
      />
    );
  }

  if (fill) {
    return (
      <span className={wrapperClass + ' ' + styles.fillWrap}>
        <Image
          src={PLACEHOLDER_SRC}
          alt={alt ?? ''}
          fill
          sizes={sizes ?? '100vw'}
          priority={priority}
          className={styles.image}
        />
      </span>
    );
  }

  return (
    <Image
      src={PLACEHOLDER_SRC}
      alt={alt ?? ''}
      width={width!}
      height={height!}
      priority={priority}
      className={wrapperClass}
    />
  );
}

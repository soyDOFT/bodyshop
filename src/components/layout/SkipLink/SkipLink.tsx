import styles from './SkipLink.module.css';

type SkipLinkProps = {
  href?: string;
  children?: React.ReactNode;
};

/** Let keyboard users jump straight to the main content. */
export function SkipLink({ href = '#main-content', children = 'Skip to main content' }: SkipLinkProps) {
  return (
    <a href={href} className={styles.skipLink}>
      {children}
    </a>
  );
}

import styles from './VisuallyHidden.module.css';

type VisuallyHiddenProps = {
  children: React.ReactNode;
  as?: 'span' | 'div';
};

/** Hide content visually while leaving it available to screen readers. */
export function VisuallyHidden({ children, as: Tag = 'span' }: VisuallyHiddenProps) {
  return <Tag className={styles.hidden}>{children}</Tag>;
}

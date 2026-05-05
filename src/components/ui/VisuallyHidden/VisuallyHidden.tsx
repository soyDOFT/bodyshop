import styles from './VisuallyHidden.module.css';

type VisuallyHiddenProps = {
  children: React.ReactNode;
  as?: 'span' | 'div';
};

export function VisuallyHidden({ children, as: Tag = 'span' }: VisuallyHiddenProps) {
  return <Tag className={styles.hidden}>{children}</Tag>;
}

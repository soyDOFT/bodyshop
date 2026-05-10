import styles from './Container.module.css';

// helpers
import clsx from 'clsx';

type ContainerProps = {
  children: React.ReactNode;
  width?: 'default' | 'narrow';
  as?: 'div' | 'section' | 'article' | 'header' | 'footer' | 'main' | 'nav' | 'aside';
  className?: string;
};

export function Container({
  children,
  width = 'default',
  as: Tag = 'div',
  className,
}: ContainerProps) {
  return (
    <Tag
      className={clsx(
        styles.container,
        width === 'narrow' && styles.narrow,
        className,
      )}
    >
      {children}
    </Tag>
  );
}

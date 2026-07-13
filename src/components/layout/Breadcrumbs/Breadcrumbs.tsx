import styles from './Breadcrumbs.module.css';

// next
import Link from 'next/link';

// components
import { Icon } from 'src/components/ui/Icon/Icon';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

/** Show the trail back to the home page. */
export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={styles.nav}>
      <ol className={styles.list}>
        {items.map((item, itemIndex) => {
          const isLast = itemIndex === items.length - 1;
          return (
            <li key={`${item.label}-${itemIndex}`} className={styles.item}>
              {item.href && !isLast ? (
                <Link href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              ) : (
                <span className={styles.current} aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast ? (
                <Icon name="chevron-right" size={14} className={styles.separator} />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

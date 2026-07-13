'use client';
import styles from './Disclosure.module.css';
import { useId, useState } from 'react';

// helpers
import clsx from 'clsx';

// components
import { Icon } from 'src/components/ui/Icon/Icon';

type DisclosureProps = {
  summary: React.ReactNode;
  expandedSummary?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
};

/** Toggle a block of content open and closed. */
export function Disclosure({
  summary,
  expandedSummary,
  children,
  defaultOpen = false,
  className,
}: DisclosureProps) {
  const id = useId();
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={clsx(styles.root, className)}>
      <div id={`${id}-content`} className={styles.content} hidden={!open}>
        {children}
      </div>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-controls={`${id}-content`}
        onClick={() => setOpen((v) => !v)}
      >
        <Icon name={open ? 'minus' : 'plus'} size={16} />
        <span>{open ? (expandedSummary ?? 'Show less') : summary}</span>
      </button>
    </div>
  );
}

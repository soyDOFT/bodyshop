'use client';

import { useId, useState } from 'react';
import clsx from 'clsx';
import { Icon } from 'src/components/ui/Icon/Icon';
import styles from './Disclosure.module.css';

type DisclosureProps = {
  summary: React.ReactNode;
  expandedSummary?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
};

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

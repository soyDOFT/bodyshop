'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { Icon } from 'src/components/ui/Icon/Icon';
import { Button } from 'src/components/ui/Button/Button';
import { useLockBodyScroll } from 'src/utils/hooks/useLockBodyScroll';
import type { NavLink } from 'src/data/navigation';
import styles from './NavMenu.module.css';

type NavMenuProps = {
  links: NavLink[];
  quoteLink: NavLink;
  open: boolean;
  onClose: () => void;
  triggerId: string;
};

export function NavMenu({ links, quoteLink, open, onClose, triggerId }: NavMenuProps) {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => closeBtnRef.current?.focus());

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
      if (e.key === 'Tab') {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(id);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <>
      <div
        className={clsx(styles.backdrop, open && styles.backdropOpen)}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={dialogRef}
        id="primary-nav-drawer"
        className={clsx(styles.drawer, open && styles.drawerOpen)}
        role="dialog"
        aria-modal="true"
        aria-label="Primary navigation"
        aria-labelledby={triggerId}
        aria-hidden={!open}
        inert={!open}
      >
        <div className={styles.header}>
          <span className={styles.heading}>Menu</span>
          <button
            ref={closeBtnRef}
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close menu"
          >
            <Icon name="close" size={24} />
          </button>
        </div>
        <nav aria-label="Primary">
          <ul className={styles.list}>
            {links.map((link) => {
              const active = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={clsx(styles.link, active && styles.linkActive)}
                    aria-current={active ? 'page' : undefined}
                    onClick={onClose}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className={styles.footer}>
          <Button as="link" href={quoteLink.href} variant="primary" fullWidth onClick={onClose}>
            {quoteLink.label}
          </Button>
        </div>
      </div>
    </>
  );
}

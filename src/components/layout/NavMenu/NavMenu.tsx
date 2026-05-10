'use client';
import styles from './NavMenu.module.css';
import { useEffect, useRef } from 'react';

// next
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// helpers
import clsx from 'clsx';

// hooks
import { useLockBodyScroll } from 'src/utils/hooks/useLockBodyScroll';

// components
import { Button } from 'src/components/ui/Button/Button';
import { Icon } from 'src/components/ui/Icon/Icon';

// data
import type { NavLink } from 'src/data/navigation';

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
    const focusFrameId = requestAnimationFrame(() => closeBtnRef.current?.focus());

    function handleKeydown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
      }
      if (event.key === 'Tab') {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        );
        if (!focusables || focusables.length === 0) return;
        const firstFocusable = focusables[0];
        const lastFocusable = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === firstFocusable) {
          event.preventDefault();
          lastFocusable.focus();
        } else if (!event.shiftKey && document.activeElement === lastFocusable) {
          event.preventDefault();
          firstFocusable.focus();
        }
      }
    }
    document.addEventListener('keydown', handleKeydown);
    return () => {
      cancelAnimationFrame(focusFrameId);
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [open, onClose]);

  return (
    <div className={styles.overlay}>
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
    </div>
  );
}

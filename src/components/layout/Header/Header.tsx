'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { Container } from 'src/components/ui/Container/Container';
import { Button } from 'src/components/ui/Button/Button';
import { Icon } from 'src/components/ui/Icon/Icon';
import { Placeholder } from 'src/components/media/Placeholder/Placeholder';
import { NavMenu } from 'src/components/layout/NavMenu/NavMenu';
import { PRIMARY_NAV, QUOTE_LINK } from 'src/data/navigation';
import { SITE_META } from 'src/data/siteMeta';
import styles from './Header.module.css';

const TRIGGER_ID = 'primary-nav-trigger';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <Container className={styles.bar}>
        <Link href="/" className={styles.brand} aria-label={`${SITE_META.name} home`}>
          <span className={styles.logo}>
            <Placeholder
              decorative
              width={48}
              height={48}
              rounded="sm"
            />
          </span>
          <span className={styles.brandText}>
            <span className={styles.brandName}>{SITE_META.name}</span>
            <span className={styles.brandTagline}>{SITE_META.city}, {SITE_META.state}</span>
          </span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary">
          <ul className={styles.desktopList}>
            {PRIMARY_NAV.map((link) => {
              const active = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={clsx(styles.desktopLink, active && styles.desktopLinkActive)}
                    aria-current={active ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.cta}>
          <Button as="link" href={QUOTE_LINK.href} variant="primary" size="sm">
            {QUOTE_LINK.label}
          </Button>
          <button
            id={TRIGGER_ID}
            type="button"
            className={styles.menuTrigger}
            aria-expanded={menuOpen}
            aria-controls="primary-nav-drawer"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <Icon name="menu" size={28} />
          </button>
        </div>
      </Container>

      <NavMenu
        links={PRIMARY_NAV}
        quoteLink={QUOTE_LINK}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        triggerId={TRIGGER_ID}
      />
    </header>
  );
}

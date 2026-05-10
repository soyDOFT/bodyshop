import styles from './Footer.module.css';

// next
import Link from 'next/link';

// components
import { Container } from 'src/components/ui/Container/Container';
import { Icon } from 'src/components/ui/Icon/Icon';
import { Placeholder } from 'src/components/media/Placeholder/Placeholder';

// data
import { FOOTER_NAV } from 'src/data/navigation';
import { SITE_META } from 'src/data/siteMeta';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container className={styles.grid}>
        <div className={styles.brandCol}>
          <Link href="/" className={styles.brand} aria-label={`${SITE_META.name} home`}>
            <Placeholder decorative width={56} height={56} rounded="sm" />
            <span className={styles.brandName}>{SITE_META.name}</span>
          </Link>
          <p className={styles.tagline}>{SITE_META.tagline}</p>
        </div>

        <div className={styles.navCol}>
          <h2 className={styles.heading}>Information</h2>
          <ul className={styles.linkList}>
            {FOOTER_NAV.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.link}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.contactCol}>
          <h2 className={styles.heading}>Contact</h2>
          <address className={styles.address}>
            <span>{SITE_META.name}</span>
            <span>{SITE_META.address}</span>
            <a href={SITE_META.phoneHref} className={styles.contactLink}>
              <Icon name="phone" size={16} />
              {SITE_META.phone}
            </a>
            <a href={SITE_META.emailHref} className={styles.contactLink}>
              <Icon name="mail" size={16} />
              {SITE_META.email}
            </a>
          </address>
          <ul className={styles.socials} aria-label="Social media">
            <li>
              <a
                href={SITE_META.socials.facebook}
                className={styles.socialLink}
                aria-label="Visit our Facebook page"
              >
                <Icon name="facebook" size={20} />
              </a>
            </li>
            <li>
              <a
                href={SITE_META.socials.yelp}
                className={styles.socialLink}
                aria-label="Read our Yelp reviews"
              >
                <Icon name="yelp" size={20} />
              </a>
            </li>
            <li>
              <a
                href={SITE_META.socials.googleReview}
                className={styles.socialLink}
                aria-label="Leave us a Google review"
              >
                <Icon name="google" size={20} />
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className={styles.bottom}>
        <Container className={styles.bottomInner}>
          <small>
            © {new Date().getFullYear()} {SITE_META.copyrightHolder}. All rights reserved.
          </small>
          <small className={styles.legalLinks}>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <span aria-hidden>·</span>
            <Link href="/terms">Terms &amp; Conditions</Link>
          </small>
        </Container>
      </div>
    </footer>
  );
}

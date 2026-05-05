import { Container } from 'src/components/ui/Container/Container';
import styles from './Aside.module.css';

type AsideProps = {
  children: React.ReactNode;
  aside: React.ReactNode;
  asideLabel?: string;
};

/** Two-column page body: prose content on the left, a sticky aside on the right. */
export function Aside({ children, aside, asideLabel = 'Request a quote' }: AsideProps) {
  return (
    <section className={styles.section}>
      <Container className={styles.grid}>
        <div className={styles.main}>{children}</div>
        <aside className={styles.aside} aria-label={asideLabel}>
          {aside}
        </aside>
      </Container>
    </section>
  );
}

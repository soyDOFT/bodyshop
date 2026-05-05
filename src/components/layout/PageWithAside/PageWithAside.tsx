import { Container } from 'src/components/ui/Container/Container';
import styles from './PageWithAside.module.css';

type PageWithAsideProps = {
  children: React.ReactNode;
  aside: React.ReactNode;
  asideLabel?: string;
};

export function PageWithAside({ children, aside, asideLabel = 'Request a quote' }: PageWithAsideProps) {
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

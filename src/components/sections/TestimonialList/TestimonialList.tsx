import styles from './TestimonialList.module.css';

// components
import { Container } from 'src/components/ui/Container/Container';
import { Disclosure } from 'src/components/ui/Disclosure/Disclosure';

// data
import { TESTIMONIALS } from 'src/data/testimonials';

export function TestimonialList() {
  return (
    <section className={styles.section} aria-labelledby="testimonials-heading">
      <Container>
        <h2 id="testimonials-heading" className="visually-hidden-heading">
          Customer testimonials
        </h2>
        <ul className={styles.list}>
          {TESTIMONIALS.map((t) => {
            const expandable = typeof t.expandableAt === 'number' && t.body.length > t.expandableAt;
            const summary = expandable ? `${t.body.slice(0, t.expandableAt!).trim()}…` : t.body;
            const tail = expandable ? t.body.slice(t.expandableAt!).trim() : '';

            return (
              <li key={`${t.name}-${t.area}`} className={styles.card}>
                <header className={styles.head}>
                  <h3 className={styles.name}>{t.name}</h3>
                  <p className={styles.area}>{t.area}</p>
                </header>
                <blockquote className={styles.quote}>
                  <p>{`“${summary}`}{!expandable && '”'}</p>
                  {expandable ? (
                    <Disclosure summary="Show more" expandedSummary="Show less">
                      <p>{tail}”</p>
                    </Disclosure>
                  ) : null}
                </blockquote>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

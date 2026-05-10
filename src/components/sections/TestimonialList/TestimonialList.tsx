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
          {TESTIMONIALS.map((testimonial) => {
            const expandable =
              typeof testimonial.expandableAt === 'number' &&
              testimonial.body.length > testimonial.expandableAt;
            const summary = expandable
              ? `${testimonial.body.slice(0, testimonial.expandableAt!).trim()}…`
              : testimonial.body;
            const expandedBody = expandable
              ? testimonial.body.slice(testimonial.expandableAt!).trim()
              : '';

            return (
              <li key={`${testimonial.name}-${testimonial.area}`} className={styles.card}>
                <header className={styles.head}>
                  <h3 className={styles.name}>{testimonial.name}</h3>
                  <p className={styles.area}>{testimonial.area}</p>
                </header>
                <blockquote className={styles.quote}>
                  <p>{`“${summary}`}{!expandable && '”'}</p>
                  {expandable ? (
                    <Disclosure summary="Show more" expandedSummary="Show less">
                      <p>{expandedBody}”</p>
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

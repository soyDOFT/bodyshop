import styles from './TestimonialList.module.css';

// components
import { Container } from 'src/components/ui/Container/Container';
import { Disclosure } from 'src/components/ui/Disclosure/Disclosure';

// data
import { TESTIMONIALS, type Testimonial } from 'src/data/testimonials';

/**
 * A quote, split in two only when it is long enough to collapse.
 * The union ties `rest` to the expandable case, so there is no empty string
 * standing in for "nothing to expand" and no need to assert expandableAt.
 */
type Quote =
  | { expandable: false; summary: string }
  | { expandable: true; summary: string; rest: string };

/** Split a testimonial into its visible summary and any collapsed remainder. */
function toQuote({ body, expandableAt }: Testimonial): Quote {
  if (expandableAt === undefined || body.length <= expandableAt) {
    return { expandable: false, summary: body };
  }

  return {
    expandable: true,
    summary: `${body.slice(0, expandableAt).trim()}…`,
    rest: body.slice(expandableAt).trim(),
  };
}

/** List customer testimonials, collapsing the long ones behind a disclosure. */
export function TestimonialList() {
  return (
    <section className={styles.section} aria-labelledby="testimonials-heading">
      <Container>
        <h2 id="testimonials-heading" className="visually-hidden-heading">
          Customer testimonials
        </h2>
        <ul className={styles.list}>
          {TESTIMONIALS.map((testimonial) => {
            const quote = toQuote(testimonial);

            return (
              <li key={`${testimonial.name}-${testimonial.area}`} className={styles.card}>
                <header className={styles.head}>
                  <h3 className={styles.name}>{testimonial.name}</h3>
                  <p className={styles.area}>{testimonial.area}</p>
                </header>
                <blockquote className={styles.quote}>
                  <p>
                    {`“${quote.summary}`}
                    {quote.expandable ? null : '”'}
                  </p>
                  {quote.expandable ? (
                    <Disclosure summary="Show more" expandedSummary="Show less">
                      <p>{quote.rest}”</p>
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

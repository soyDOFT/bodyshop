import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHero } from 'src/components/layout/PageHero/PageHero';
import { PageWithAside } from 'src/components/layout/PageWithAside/PageWithAside';
import { QuoteForm } from 'src/components/form/QuoteForm/QuoteForm';
import { QuoteCta } from 'src/components/sections/QuoteCta/QuoteCta';
import { SERVICES } from 'src/data/services';
import { SERVICE_AREAS, findServiceArea } from 'src/data/serviceAreas';
import { SITE_META } from 'src/data/siteMeta';

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return SERVICE_AREAS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = findServiceArea(slug);
  if (!area) return { title: 'Service Area Not Found' };
  return {
    title: `${area.name} Body Shop`,
    description: `Body-shop work for ${area.name} residents — collision repair, custom paint, and more — performed at our ${SITE_META.city} shop.`,
    alternates: { canonical: `/service-areas/${area.slug}` },
  };
}

export default async function ServiceAreaPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const area = findServiceArea(slug);
  if (!area) notFound();

  return (
    <>
      <PageHero
        eyebrow="Service Area"
        title={`${area.name} Body Shop`}
        subtitle={`We serve ${area.name} from our shop in ${SITE_META.city}, ${SITE_META.state}. Drop your vehicle off — we will handle the rest.`}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Service Areas', href: '/service-areas' },
          { label: area.name },
        ]}
      />
      <PageWithAside aside={<QuoteForm heading={`Quote for ${area.name}`} />}>
        <h2>Looking for a reliable body shop near {area.name}?</h2>
        <p>
          When it comes to finding a quality body shop for your collision-repair needs near{' '}
          {area.name}, accept only the best. For over {SITE_META.yearsInBusiness} years,{' '}
          {SITE_META.name} has been providing quality craftsmanship and outstanding customer
          service from our shop in {SITE_META.city}. We offer a wide range of professional
          auto-body and custom-painting services.
        </p>
        <p>
          Our years of experience, unmatched attention to detail, and personalized customer service
          make us a trusted choice for {area.name} residents. We specialize in insurance work,
          insurance claims, and insurance repairs.
        </p>
        <h3>Why choose {SITE_META.name}?</h3>
        <ul>
          <li>
            <strong>Reliable.</strong> Owner {SITE_META.ownerName} is there from start to finish.
          </li>
          <li>
            <strong>Trustworthy.</strong> {SITE_META.yearsInBusiness} years in business — for a
            reason.
          </li>
          <li>
            <strong>Qualified.</strong> {SITE_META.ownerName}&rsquo;s industry experience is immense.
          </li>
          <li>
            <strong>Locally owned.</strong> And proud of it.
          </li>
        </ul>
        <h2>Our services</h2>
        <ul>
          {SERVICES.map((service) => (
            <li key={service.title}>{service.title}</li>
          ))}
        </ul>
        <p>
          …and much more. Read some of our <a href="/reviews">reviews</a>, browse the{' '}
          <a href="/photos">photo gallery</a>, or <a href="/contact">contact us today</a> for a
          no-obligation consultation.
        </p>
      </PageWithAside>
      <QuoteCta heading={`Ready to schedule? We will take care of ${area.name}.`} />
    </>
  );
}

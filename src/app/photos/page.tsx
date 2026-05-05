import type { Metadata } from 'next';
import { PageHero } from 'src/components/layout/PageHero/PageHero';
import { PhotoGallery } from 'src/components/sections/PhotoGallery/PhotoGallery';
import { QuoteCta } from 'src/components/sections/QuoteCta/QuoteCta';
import { SITE_META } from 'src/data/siteMeta';

export const metadata: Metadata = {
  title: 'Photo Gallery',
  description: `See examples of work from ${SITE_META.name} — collision repair, custom paint, and restoration projects.`,
};

export default function PhotosPage() {
  return (
    <>
      <PageHero
        eyebrow="Photo Gallery"
        title="A look at our work."
        subtitle="Selected projects from the shop. Click any tile to view it larger."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Photos' }]}
      />
      <PhotoGallery />
      <QuoteCta />
    </>
  );
}

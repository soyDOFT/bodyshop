// next
import type { Metadata } from 'next';

// components
import { MediaGallery } from 'src/components/sections/MediaGallery/MediaGallery';
import { PageHero } from 'src/components/layout/PageHero/PageHero';
import { QuoteCta } from 'src/components/sections/QuoteCta/QuoteCta';

// data
import { DESCRIBED_MEDIA } from 'src/data/mediaCaptions';
import { PAGE_HERO_MEDIA } from 'src/data/mediaSelections';
import { SITE_META } from 'src/data/siteMeta';

const PHOTO_COUNT = DESCRIBED_MEDIA.filter((item) => item.kind === 'image').length;
const VIDEO_COUNT = DESCRIBED_MEDIA.length - PHOTO_COUNT;

export const metadata: Metadata = {
  title: 'Photo & Video Gallery',
  description: `See ${PHOTO_COUNT} photos and ${VIDEO_COUNT} videos of work from ${SITE_META.name}, including collision repair, custom paint, and restoration projects.`,
};

/** Render the gallery of every shop photo and clip. */
export default function PhotosPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="A look at our work."
        subtitle={`${PHOTO_COUNT} photos and ${VIDEO_COUNT} videos from the shop floor, covering teardown, bodywork, booth time, and finished cars. Select any tile to view it larger.`}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Gallery' }]}
        media={PAGE_HERO_MEDIA.photos}
      />
      <MediaGallery items={DESCRIBED_MEDIA} />
      <QuoteCta />
    </>
  );
}

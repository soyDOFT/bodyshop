export type ServiceArea = {
  slug: string;
  name: string;
};

export const SERVICE_AREAS: readonly ServiceArea[] = [
  { slug: 'charlotte', name: 'Charlotte' },
  { slug: 'oak-forest', name: 'Oak Forest' },
  { slug: 'hickory-grove', name: 'Hickory Grove' },
  { slug: 'shannon-park', name: 'Shannon Park' },
  { slug: 'windsor-park', name: 'Windsor Park' },
  { slug: 'newell', name: 'Newell' },
  { slug: 'hampshire-hills', name: 'Hampshire Hills' },
  { slug: 'noda', name: 'NoDa' },
  { slug: 'wildwoods', name: 'Wildwoods' },
  { slug: 'bradfield-farms', name: 'Bradfield Farms' },
  { slug: 'allen', name: 'Allen' },
  { slug: 'mint-hill', name: 'Mint Hill' },
  { slug: 'east-forest', name: 'East Forest' },
  { slug: 'rocky-river', name: 'Rocky River' },
  { slug: 'harrisburg', name: 'Harrisburg' },
  { slug: 'university-city', name: 'University City' },
  { slug: 'sugar-creek', name: 'Sugar Creek' },
  { slug: 'west-sugar-creek', name: 'West Sugar Creek' },
  { slug: 'silverwood', name: 'Silverwood' },
  { slug: 'plaza-midwood', name: 'Plaza Midwood' },
  { slug: 'becton-park', name: 'Becton Park' },
  { slug: 'wilgrove', name: 'Wilgrove' },
  { slug: 'stonehaven', name: 'Stonehaven' },
] as const;

/** Find a service area by slug, or undefined when the slug is unknown. */
export function findServiceArea(slug: string): ServiceArea | undefined {
  return SERVICE_AREAS.find((area) => area.slug === slug);
}

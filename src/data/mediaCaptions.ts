// Keep alt text here so re-running scripts/build-media.mjs never overwrites it.
// Add an entry keyed by media id whenever you add an asset.
import {
  MEDIA,
  type ImageMedia,
  type MediaId,
  type VideoId,
  type VideoMedia,
} from 'src/data/media';

const FALLBACK_ALT = 'Auto body repair and custom paint work at Exclusive Body Shop';

// Require every id to exist in the manifest, so a renamed asset fails to compile here.
const MEDIA_ALT: Partial<Record<MediaId, string>> = {
  'img-3051':
    'Silver 1979 Chevrolet Camaro Z28 outside the shop after a full restoration and repaint',
  'img-3053':
    'Silver 1979 Chevrolet Camaro Z28 outside the shop after a full restoration and repaint',
  'img-3052':
    'Silver 1979 Chevrolet Camaro Z28 outside the shop after a full restoration and repaint',
  'img-3050':
    'Silver 1979 Chevrolet Camaro Z28 outside the shop after a full restoration and repaint',
  'img-3049':
    'Front end of a restored silver Camaro Z28 showing the finished paint and trim',
  'img-3048':
    'Front end of a restored silver Camaro Z28 showing the finished paint and trim',
  'img-3047':
    'Restored silver Camaro Z28 in profile, showing the repainted body panels',
  'img-3046':
    'Restored silver Camaro Z28 in profile, showing the repainted body panels',
  'img-3045':
    'Restored silver Camaro Z28 in profile, showing the repainted body panels',
  'video-2025-08-29-11-15-10':
    'Walkaround of the restored silver Camaro Z28 in the shop',
  'img-3022':
    'Vehicle sealed under protective sheeting in preparation for painting',
  'img-3028':
    'Dark BMW sedan masked with tape and film before a panel repaint',
  'img-3011':
    'White Ram pickup finished and ready for pickup',
  'img-3010':
    'White Ram pickup finished and ready for pickup',
  'img-2997':
    'Cadillac sedan wrapped and masked inside the spray booth',
  'img-2994':
    'Cadillac sedan wrapped and masked inside the spray booth',
  'img-2948':
    'Silver BMW 5 Series with collision damage down the driver-side doors',
  'img-2947':
    'Silver BMW 5 Series after collision repair, restored to pre-accident condition',
  'img-2946':
    'Silver BMW 5 Series after collision repair, restored to pre-accident condition',
  'img-2874':
    'BMW 5 Series raised on the lift with a wheel removed during repair',
  'img-2856':
    'Body panel masked with tape and film, prepped for primer',
  'img-2869':
    'Silver Lexus RX after rear-end collision repair',
  'img-2842':
    'Lexus RX rear quarter panel stripped and sanded ahead of refinishing',
  'img-2790':
    'Blue Acura RDX rear quarter panel after paint work and color matching',
  'img-2790-1':
    'Blue Acura RDX rear quarter panel after paint work and color matching',
  'img-2789':
    'Blue Acura RDX rear quarter panel after paint work and color matching',
  'img-2631':
    'BMW X3 stripped to the frame after front-end collision damage',
  'img-2764':
    'BMW X3 masked and prepped for refinishing',
  'renderedvideo':
    'Bodywork in progress on a vehicle in the shop',
  'img-2597':
    'BMW X3 with heavy front-end collision damage on the frame rack',
  'img-2508':
    'Rear quarter panel in primer with a wheel removed during repair',
  'img-2527':
    'Black BMW X3 after collision repair and refinishing',
  'img-2528':
    'Black BMW X3 after collision repair and refinishing',
  'img-2536':
    'Black BMW X3 after collision repair and refinishing',
  'img-2755':
    'Kia Soul with front-end collision damage before repair',
  'img-2756':
    'Bumper and fender panels on stands in the spray booth',
  'img-2758':
    'Bumper and fender panels on stands in the spray booth',
  'img-2762':
    'Silver Kia Soul repaired and back on the road',
  'img-2260':
    'Bumper cover masked off and ready for paint',
  'img-2263':
    'Silver BMW X3 outside the shop after refinishing',
  '9db1db65-d711-44fa-8f16-dc2b6d27e097':
    'Close-up of dent damage on a bumper before repair',
  'img-1573':
    'Camaro Z28 body in primer inside the spray booth during restoration',
  'img-1572':
    'Camaro Z28 body in primer inside the spray booth during restoration',
  'img-1571':
    'Camaro Z28 body in primer inside the spray booth during restoration',
  'img-1570':
    'Camaro Z28 body in primer inside the spray booth during restoration',
  'img-1569':
    'Camaro Z28 body in primer inside the spray booth during restoration',
  'img-1568':
    'Camaro Z28 body in primer inside the spray booth during restoration',
  'img-1567':
    'Camaro Z28 body in primer inside the spray booth during restoration',
  'img-1566':
    'Camaro Z28 body in primer inside the spray booth during restoration',
  'img-1565':
    'Camaro Z28 body in primer inside the spray booth during restoration',
  'img-1165':
    'Camaro Z28 panels in primer, block-sanded and ready for color',
  'img-1173':
    'Camaro Z28 panels in primer, block-sanded and ready for color',
  'img-1172':
    'Camaro Z28 shell in primer during the restoration process',
  'img-1163':
    'Camaro Z28 shell in primer during the restoration process',
  'img-1164':
    'Camaro Z28 shell in primer during the restoration process',
  'img-1162':
    'Sanding and prepping the Camaro Z28 body ahead of paint',
  'img-0320':
    'Blue sedan under the booth lights after a fresh repaint',
  'img-0963':
    'Fender panel mounted on a stand for refinishing',
  'img-0964':
    'Fender panel mounted on a stand for refinishing',
  'img-1030':
    'Mercedes-Benz G-Class in the shop for body work',
  'img-1047':
    'Van panel masked with tape and film before spraying',
  'img-1048':
    'Bumper and body panels prepped on stands in the booth',
  'img-1292':
    'Bumper and body panels prepped on stands in the booth',
  'img-1418':
    'Green Ford F-150 in for body work and a repaint',
  'img-1419':
    'Green Ford F-150 in for body work and a repaint',
  'img-1420':
    'Green Ford F-150 in for body work and a repaint',
  'img-1433':
    'Body filler applied and sanded across the doors of a green Ford F-150',
  'img-1433-1':
    'Body filler applied and sanded across the doors of a green Ford F-150',
  'img-1432':
    'Green Ford F-150 with the bed in primer during repair',
  'img-1442':
    'Vehicle masked in plastic sheeting ahead of paint',
  'img-1438':
    'Ford F-150 roof and side panels masked and prepped for refinishing',
  'img-1434':
    'Ford F-150 roof and side panels masked and prepped for refinishing',
  'img-1479':
    'Ford F-150 masked inside the spray booth',
  'img-1484':
    'Green Ford F-150 back in the shop after its repaint',
  'bceeb212-6993-44ef-9966-eea63b306cc4':
    'Truck panels masked and taped ahead of paint',
  '7e9cf6f1-bf67-4cd1-ae08-1ca97711f35b':
    'Truck panels masked and taped ahead of paint',
  'a6816173-c39d-4a76-8d7c-b76816696070':
    'Sanding body filler smooth on a repaired panel',
  '62e190ee-638b-4cc4-8307-dc54044596d6':
    'Car masked in the booth, ready for a custom paint job',
  'img-2044':
    'Silver Chrysler 200 finished after collision repair',
  'img-2110':
    'Pickup with rear collision damage and the wheel removed',
  'img-2118':
    'Technician masking the roof of a black SUV before painting',
  'img-2264':
    'Black SUV on the frame rack during structural repair',
  'img-2312':
    'Black SUV with body filler applied across the repaired panels',
  '6ad5d647-3611-4873-9fcd-50465ef97b9e':
    'Collision repair in progress on the frame rack',
  'img-2374':
    'Panels hanging in the spray booth ready for refinishing',
  'img-2373':
    'Panels hanging in the spray booth ready for refinishing',
  'img-2382':
    'SUV rear quarter panel masked and taped for paint',
  '490754b5-69ae-4ae0-a545-d0f714170e2d':
    'Black Chevrolet Tahoe in the shop bay for body work',
  'df5fce9f-3232-4d2d-a1cc-c61f507de491':
    'Black Chevrolet Tahoe with body filler on the repaired panels',
  'a6b5217c-219e-4090-9d77-68a82cbe85a5':
    'Black Chevrolet Tahoe finished after collision repair and refinishing',
  'img-2387':
    'Black Chevrolet Tahoe finished after collision repair and refinishing',
  'img-2386':
    'Black Chevrolet Tahoe finished after collision repair and refinishing',
  'a0673548-59dd-42ca-9122-30a9bb45a3dc':
    'Body and paint work underway in the shop',
  'img-2414':
    'Body and paint work underway in the shop',
  'img-2434':
    'Body and paint work underway in the shop',
  'img-2964':
    'Blue sedan with front-end collision damage on the frame rack',
  'img-2797':
    'Blue sedan with front-end collision damage on the frame rack',
  'img-2798':
    'Blue sedan with front-end collision damage on the frame rack',
  'img-2968':
    'Blue sedan after front-end collision repair and color-matched paint',
  '2530172260126415111':
    'Black Chevrolet Tahoe masked and prepped for paint',
  '3914887227531153922':
    'Black Chevrolet Tahoe outside the shop after refinishing',
  '8454996906743694765':
    'Black Chevrolet Tahoe outside the shop after refinishing',
  '833465387477952285':
    'Rear wheel arch and bumper masked off, with the panel pulled during collision repair',
  '5453990239390041725':
    'Repair and refinishing work in progress at the shop',
  '2014366607164268207':
    'Repair and refinishing work in progress at the shop',
  '1102936990649038933':
    'Repair and refinishing work in progress at the shop',
  '2195008587047542519':
    'Black SUV wrapped and masked in the booth, ready for its panels to be sprayed',
  '1390147046224996442':
    'Walkaround of a black SUV back in the shop after collision repair and refinishing',
  '4039484844690051570':
    'Repair and refinishing work in progress at the shop',
  '718490688518547100':
    'Door and body panels masked for a spot repair',
  '9173955381485114153':
    'Door and body panels masked for a spot repair',
  '7263495715122942951':
    'Black Chevrolet Tahoe masked and taped inside the spray booth',
  '7263495715122942951-jpg-1':
    'Black Chevrolet Tahoe masked and taped inside the spray booth',
  '7370407339484804058':
    'Black Chevrolet Tahoe masked and taped inside the spray booth',
  '7708165599640676557':
    'Black Chevrolet Tahoe masked and taped inside the spray booth',
  '1976410277356390327':
    'Freshly painted black roof panel under the booth lights',
  '955498783347505657':
    'Black SUV masked and prepped for a panel repaint',
  '7306127883356801794':
    'Black SUV masked and prepped for a panel repaint',
  '4598324176699077351':
    'Black Chevrolet Tahoe outside the shop after repair',
  '3511554821892522494':
    'White SUV masked and taped ahead of refinishing',
  '1694422870994021925':
    'Body panel prepped on a stand in the spray booth',
  '3531799507795455560':
    'Black Chevrolet Tahoe in the shop bay after collision repair',
  '4349539558343909612':
    'White pickup with front-end collision damage awaiting repair',
  '2385689756380270605':
    'Black SUV masked for paint inside the booth',
  '941607886375482599':
    'Black SUV in the shop during body work',
  '8404362930630178800':
    'Wheel arch and fender repair underway on an SUV',
};

// Pair every manifest entry with its alt text. Components take these, never a raw MediaItem.
export type DescribedImage = ImageMedia & { alt: string };
export type DescribedVideo = VideoMedia & { alt: string };
export type DescribedMedia = DescribedImage | DescribedVideo;

// Index by id so lookups stay O(1) rather than scanning the manifest each time.
const BY_ID: ReadonlyMap<MediaId, DescribedMedia> = new Map(
  MEDIA.map((item) => [item.id, { ...item, alt: MEDIA_ALT[item.id] ?? FALLBACK_ALT }]),
);

// List every asset, oldest first.
export const DESCRIBED_MEDIA: readonly DescribedMedia[] = [...BY_ID.values()];

/** Resolve one asset by id, throwing if the manifest has no such entry. */
export function getMedia(id: MediaId): DescribedMedia {
  const item = BY_ID.get(id);
  if (!item) throw new Error(`Media id "${id}" is missing from the manifest.`);
  return item;
}

/**
 * Resolve curated assets, returning a tuple as long as the id list.
 * The tuple is what makes destructuring safe: an array type would hand back
 * DescribedMedia for a slot that does not exist.
 */
export function pickMedia<const Ids extends readonly MediaId[]>(
  ...ids: Ids
): { [Index in keyof Ids]: DescribedMedia } {
  return ids.map(getMedia) as { [Index in keyof Ids]: DescribedMedia };
}

/** Resolve curated clips. VideoId rejects a photo id at compile time, so no runtime check is needed. */
export function pickVideos<const Ids extends readonly VideoId[]>(
  ...ids: Ids
): { [Index in keyof Ids]: DescribedVideo } {
  return ids.map(getMedia) as { [Index in keyof Ids]: DescribedVideo };
}

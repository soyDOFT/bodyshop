/**
 * Transcodes the raw shop photos/videos into web-ready assets and writes the
 * `src/data/media.ts` manifest that the site renders from.
 *
 * Source dir defaults to ~/Downloads/cars; override with MEDIA_SOURCE_DIR.
 * Requires ffmpeg on PATH. Re-runnable: existing outputs are overwritten.
 *
 *   node scripts/build-media.mjs
 */
import { execFile } from 'node:child_process';
import { mkdir, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';

import heicConvert from 'heic-convert';
import sharp from 'sharp';

const execFileAsync = promisify(execFile);

const SOURCE_DIR = process.env.MEDIA_SOURCE_DIR ?? path.join(homedir(), 'Downloads', 'cars');
const PROJECT_ROOT = path.resolve(import.meta.dirname, '..');
const PHOTO_OUT_DIR = path.join(PROJECT_ROOT, 'public', 'media', 'photos');
const VIDEO_OUT_DIR = path.join(PROJECT_ROOT, 'public', 'media', 'videos');
const MANIFEST_PATH = path.join(PROJECT_ROOT, 'src', 'data', 'media.ts');

const PHOTO_MAX_EDGE = 1920;
const PHOTO_QUALITY = 80;
const VIDEO_MAX_EDGE = 1280;
const BLUR_EDGE = 12;

const HEIC_EXTS = new Set(['.heic', '.heif']);
const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const VIDEO_EXTS = new Set(['.mp4', '.mov', '.m4v']);

/** iPhone/Drive exports carry names like `IMG_1433(1).heic` and `123.JPG.jpeg`. */
function toSlug(fileName) {
  return path
    .basename(fileName)
    .replace(/\.[^.]+$/, '')
    .replace(/\.(jpg|jpeg|png|heic)$/i, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function toBlurDataUrl(image) {
  const buffer = await image
    .clone()
    .resize(BLUR_EDGE, BLUR_EDGE, { fit: 'inside' })
    .webp({ quality: 40 })
    .toBuffer();
  return `data:image/webp;base64,${buffer.toString('base64')}`;
}

/**
 * Extensions lie: much of this export is JPEG data sitting in `.heic` files
 * (and `.JPG.jpeg` double extensions), so decode based on the magic bytes.
 * Only genuine HEIF containers need the (slow, wasm) heic-convert path.
 */
function isHeifContainer(buffer) {
  if (buffer.length < 12) return false;
  if (buffer.toString('ascii', 4, 8) !== 'ftyp') return false;
  const brand = buffer.toString('ascii', 8, 12);
  return ['heic', 'heix', 'hevc', 'heim', 'heis', 'mif1', 'msf1'].includes(brand);
}

async function decodeToSharp(filePath) {
  const buffer = await readFile(filePath);
  if (isHeifContainer(buffer)) {
    const jpeg = await heicConvert({ buffer, format: 'JPEG', quality: 0.94 });
    return sharp(Buffer.from(jpeg));
  }
  return sharp(buffer);
}

async function buildPhoto(filePath, slug) {
  // `.rotate()` with no argument bakes in the EXIF orientation phones record.
  const source = (await decodeToSharp(filePath))
    .rotate()
    .resize(PHOTO_MAX_EDGE, PHOTO_MAX_EDGE, { fit: 'inside', withoutEnlargement: true });

  const { data, info } = await source
    .webp({ quality: PHOTO_QUALITY })
    .toBuffer({ resolveWithObject: true });

  const outPath = path.join(PHOTO_OUT_DIR, `${slug}.webp`);
  await writeFile(outPath, data);

  return {
    kind: 'image',
    src: `/media/photos/${slug}.webp`,
    width: info.width,
    height: info.height,
    blurDataUrl: await toBlurDataUrl(sharp(data)),
    bytes: data.length,
  };
}

async function probeVideo(filePath) {
  const { stdout } = await execFileAsync('ffprobe', [
    '-v', 'error',
    '-select_streams', 'v:0',
    '-show_entries', 'stream=width,height:stream_side_data=rotation:format=duration',
    '-of', 'json',
    filePath,
  ]);
  const probe = JSON.parse(stdout);
  const stream = probe.streams?.[0] ?? {};
  const rotation = Math.abs(Number(stream.side_data_list?.[0]?.rotation ?? 0)) % 180;
  // A 90/270° display matrix means the stored frame is transposed vs. what plays.
  const upright = rotation === 90;
  return {
    width: upright ? stream.height : stream.width,
    height: upright ? stream.width : stream.height,
    duration: Number(probe.format?.duration ?? 0),
  };
}

async function fileExists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function buildVideo(filePath, slug) {
  const { duration } = await probeVideo(filePath);
  const outPath = path.join(VIDEO_OUT_DIR, `${slug}.mp4`);

  // Transcoding is the slow step; reuse a previous run's output when present.
  if (!(await fileExists(outPath))) {
    // `scale` keeps the long edge at VIDEO_MAX_EDGE; `-2` keeps the short edge even
    // (H.264 requires even dimensions). ffmpeg auto-applies the rotation matrix.
    await execFileAsync('ffmpeg', [
      '-y', '-loglevel', 'error',
      '-i', filePath,
      '-vf', `scale='if(gt(iw,ih),min(${VIDEO_MAX_EDGE},iw),-2)':'if(gt(iw,ih),-2,min(${VIDEO_MAX_EDGE},ih))'`,
      '-c:v', 'libx264', '-preset', 'slow', '-crf', '27', '-pix_fmt', 'yuv420p',
      '-c:a', 'aac', '-b:a', '96k', '-ac', '2',
      '-movflags', '+faststart',
      outPath,
    ]);
  }

  // Poster from ~1s in (or the first frame for very short clips) so it isn't a black fade-in.
  const posterSeek = duration > 1.5 ? '1' : '0';
  const rawPoster = path.join(VIDEO_OUT_DIR, `${slug}.poster.png`);
  await execFileAsync('ffmpeg', [
    '-y', '-loglevel', 'error',
    '-ss', posterSeek, '-i', outPath,
    '-frames:v', '1',
    rawPoster,
  ]);

  const posterImage = sharp(rawPoster);
  const { data, info } = await posterImage
    .webp({ quality: PHOTO_QUALITY })
    .toBuffer({ resolveWithObject: true });
  await writeFile(path.join(VIDEO_OUT_DIR, `${slug}.webp`), data);
  await rm(rawPoster, { force: true });

  const { size } = await stat(outPath);

  return {
    kind: 'video',
    src: `/media/videos/${slug}.mp4`,
    poster: `/media/videos/${slug}.webp`,
    width: info.width,
    height: info.height,
    duration: Math.round(duration),
    blurDataUrl: await toBlurDataUrl(sharp(data)),
    bytes: size,
  };
}

function renderManifest(items) {
  const entries = items
    .map((item) => {
      const lines = [
        `    id: '${item.id}',`,
        `    kind: '${item.kind}',`,
        `    src: '${item.src}',`,
      ];
      if (item.kind === 'video') lines.push(`    poster: '${item.poster}',`);
      lines.push(`    width: ${item.width},`, `    height: ${item.height},`);
      if (item.kind === 'video') lines.push(`    duration: ${item.duration},`);
      lines.push(
        `    orientation: '${item.orientation}',`,
        `    blurDataUrl:\n      '${item.blurDataUrl}',`,
      );
      return `  {\n${lines.join('\n')}\n  },`;
    })
    .join('\n');

  const idUnion = (kind) =>
    items
      .filter((item) => item.kind === kind)
      .map((item) => `  | '${item.id}'`)
      .join('\n');

  return `// AUTO-GENERATED by scripts/build-media.mjs. Do not edit by hand.
// Re-run \`node scripts/build-media.mjs\` after adding source photos or videos.
// Alt text lives in src/data/mediaCaptions.ts so it survives regeneration.

// Name every asset, so referencing a missing id fails to compile.
// Splitting photos from clips lets a video-only slot reject a photo id at compile time.
export type ImageId =
${idUnion('image')};

export type VideoId =
${idUnion('video')};

export type MediaId = ImageId | VideoId;

export type MediaOrientation = 'landscape' | 'portrait' | 'square';

type MediaBase = {
  src: string;
  width: number;
  height: number;
  orientation: MediaOrientation;
  blurDataUrl: string;
};

export type ImageMedia = MediaBase & {
  kind: 'image';
  id: ImageId;
};

export type VideoMedia = MediaBase & {
  kind: 'video';
  id: VideoId;
  /** Stand in for the clip until it plays, and serve as its grid thumbnail. */
  poster: string;
  /** Run for this many whole seconds. */
  duration: number;
};

export type MediaItem = ImageMedia | VideoMedia;

export const MEDIA: readonly MediaItem[] = [
${entries}
];
`;
}

async function main() {
  await mkdir(PHOTO_OUT_DIR, { recursive: true });
  await mkdir(VIDEO_OUT_DIR, { recursive: true });

  const fileNames = (await readdir(SOURCE_DIR)).sort();
  const items = [];
  const seenSlugs = new Set();

  for (const fileName of fileNames) {
    const filePath = path.join(SOURCE_DIR, fileName);
    const ext = path.extname(fileName).toLowerCase();
    const isPhoto = HEIC_EXTS.has(ext) || IMAGE_EXTS.has(ext);
    const isVideo = VIDEO_EXTS.has(ext);
    if (!isPhoto && !isVideo) continue;

    let slug = toSlug(fileName);
    while (seenSlugs.has(slug)) slug = `${slug}-2`;
    seenSlugs.add(slug);

    try {
      const built = isVideo
        ? await buildVideo(filePath, slug)
        : await buildPhoto(filePath, slug);

      const { mtime } = await stat(filePath);
      const ratio = built.width / built.height;
      items.push({
        ...built,
        id: slug,
        capturedAt: mtime.getTime(),
        orientation: ratio > 1.05 ? 'landscape' : ratio < 0.95 ? 'portrait' : 'square',
      });
      const kb = Math.round(built.bytes / 1024);
      console.log(`${built.kind === 'video' ? '🎬' : '🖼 '} ${slug} ${built.width}x${built.height} ${kb}KB`);
    } catch (error) {
      console.error(`✗ ${fileName}: ${error.message}`);
    }
  }

  // Oldest first so the galleries read as a rough chronology of shop work.
  items.sort((a, b) => a.capturedAt - b.capturedAt);
  await writeFile(MANIFEST_PATH, renderManifest(items), 'utf8');

  const totalMb = items.reduce((sum, item) => sum + item.bytes, 0) / 1024 / 1024;
  const videoCount = items.filter((item) => item.kind === 'video').length;
  console.log(
    `\nWrote ${items.length} items (${items.length - videoCount} photos, ${videoCount} videos), ` +
      `${totalMb.toFixed(1)} MB total → src/data/media.ts`,
  );
}

await main();

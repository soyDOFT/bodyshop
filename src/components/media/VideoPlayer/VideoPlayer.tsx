'use client';
import styles from './VideoPlayer.module.css';
import { useEffect, useRef } from 'react';

// helpers
import clsx from 'clsx';

// data
import type { DescribedVideo } from 'src/data/mediaCaptions';

type VideoPlayerProps = {
  item: DescribedVideo;
  /** Play on mount, muted as browsers require, unless the visitor prefers reduced motion. */
  autoPlay?: boolean;
  rounded?: boolean;
  className?: string;
};

/** Play a clip, holding the source off the wire until the visitor presses play. */
export function VideoPlayer({ item, autoPlay = false, rounded, className }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Start playback here rather than through the autoPlay attribute so the reduced motion check runs on the client without desyncing SSR.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !autoPlay) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Swallow a rejected play, since the poster and controls still let the visitor start it.
    video.play().catch(() => {});

    return () => video.pause();
  }, [autoPlay]);

  return (
    <video
      ref={videoRef}
      className={clsx(styles.player, rounded && styles.rounded, className)}
      src={item.src}
      poster={item.poster}
      controls
      muted={autoPlay}
      playsInline
      preload="none"
      aria-label={item.alt}
      width={item.width}
      height={item.height}
    />
  );
}

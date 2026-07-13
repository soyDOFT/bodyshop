'use client';
import { useCallback, useMemo, useState } from 'react';

/** Track which gallery item is open and step through the set, wrapping at both ends. */
export function useLightbox(count: number) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Step by an offset rather than duplicating the wrap maths for prev and next.
  const step = useCallback(
    (offset: number) => {
      setOpenIndex((current) =>
        current === null ? null : (current + offset + count) % count,
      );
    },
    [count],
  );

  // Memoise so consumers can pass these straight to a memoised Lightbox.
  return useMemo(
    () => ({
      openIndex,
      open: (index: number) => setOpenIndex(index),
      close: () => setOpenIndex(null),
      prev: () => step(-1),
      next: () => step(1),
    }),
    [openIndex, step],
  );
}

'use client';

import { useEffect, useRef } from 'react';

export function Player({ previewUrl }: { previewUrl: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(previewUrl);
    } else {
      audioRef.current.src = previewUrl;
    }

    audioRef.current.play();

    return () => {
      audioRef.current?.pause();
    };
  }, [previewUrl]);

  return (
    <button
      onClick={() =>
        audioRef.current?.paused
          ? audioRef.current.play()
          : audioRef.current?.pause()
      }
    >
      ▶️ Play / ⏸ Pause
    </button>
  );
}

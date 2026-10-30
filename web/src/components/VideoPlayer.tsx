"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title: string;
  demoNote?: string;
  audioOnly?: boolean;
}

export function VideoPlayer({
  src,
  poster,
  title,
  demoNote,
  audioOnly,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    setError(null);

    const isHls = src.includes(".m3u8");
    let hls: Hls | null = null;

    const fallbackMp4 =
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

    if (isHls) {
      if (Hls.isSupported()) {
        hls = new Hls({ enableWorker: true });
        hls.loadSource(src);
        hls.attachMedia(video);
        hls.on(Hls.Events.ERROR, (_, data) => {
          if (data.fatal) {
            // Demo environments may block third-party HLS — fall back to MP4.
            setError(null);
            if (hls) {
              hls.destroy();
              hls = null;
            }
            video.src = fallbackMp4;
            void video.play().catch(() => undefined);
          }
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
      } else {
        video.src = fallbackMp4;
      }
    } else {
      video.src = src;
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, [src]);

  return (
    <div className="player-shell">
      <video
        ref={videoRef}
        className={audioOnly ? "player audio-only" : "player"}
        controls
        playsInline
        poster={poster}
        aria-label={title}
      />
      {audioOnly ? (
        <div className="radio-visual" aria-hidden>
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      ) : null}
      {error ? <p className="player-error">{error}</p> : null}
      {demoNote ? <p className="player-note">{demoNote}</p> : null}
    </div>
  );
}

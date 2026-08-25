"use client";

import MuxPlayer from "@mux/mux-player-react";

export function MuxVideo({ playbackId, title, poster, autoPlay = false, muted = false, loop = false, className = "" }: {
  playbackId: string;
  title: string;
  poster?: string | null;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  className?: string;
}) {
  return (
    <MuxPlayer
      playbackId={playbackId}
      metadataVideoTitle={title}
      accentColor="#00a3e0"
      primaryColor="#ffffff"
      secondaryColor="#003b70"
      poster={poster ?? undefined}
      autoPlay={autoPlay ? "muted" : false}
      muted={muted}
      loop={loop}
      playsInline
      preload="metadata"
      className={`h-full w-full ${className}`}
      style={{ "--media-object-fit": "contain" }}
    />
  );
}

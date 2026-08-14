"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

interface VideoPlayerProps {
  src: string;
  poster: string;
  label: string;
  placeholderLabel?: string;
}

export function VideoPlayer({
  src,
  poster,
  label,
  placeholderLabel,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasError, setHasError] = useState(false);

  async function playVideo() {
    if (!videoRef.current) return;

    try {
      await videoRef.current.play();
      setHasStarted(true);
    } catch {
      setHasError(true);
    }
  }

  return (
    <div className="group relative aspect-video overflow-hidden bg-[#0b0e14]">
      {!hasStarted || hasError ? (
        <Image
          src={poster}
          fill
          sizes="(max-width: 1600px) 100vw, 1600px"
          alt="Capa provisória do showreel"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.015]"
        />
      ) : null}
      <video
        ref={videoRef}
        className={`absolute inset-0 size-full object-cover ${
          hasStarted && !hasError ? "opacity-100" : "opacity-0"
        }`}
        controls={hasStarted}
        playsInline
        preload="none"
        poster={poster}
        onError={() => setHasError(true)}
        onEnded={() => setHasStarted(false)}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-0 bg-black/20" />
      {!hasStarted ? (
        <button
          type="button"
          onClick={playVideo}
          aria-label={label}
          className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/30 backdrop-blur transition-transform hover:scale-110 hover:bg-electric"
        >
          <Play fill="currentColor" size={20} aria-hidden="true" />
        </button>
      ) : null}
      {hasError ? (
        <p className="absolute inset-x-5 bottom-12 text-center text-xs text-amber-200">
          Adicione o arquivo de vídeo configurado para reproduzir o showreel.
        </p>
      ) : null}
      {placeholderLabel ? (
        <span className="absolute bottom-5 left-5 text-[10px] tracking-[0.2em] text-white/50">
          {placeholderLabel}
        </span>
      ) : null}
    </div>
  );
}

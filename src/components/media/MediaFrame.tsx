"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { clsx } from "clsx";

export type AspectRatio = "16:9" | "9:16" | "1:1" | "4:5" | "21:9";

export interface MediaFrameProps {
  aspectRatio?: AspectRatio;
  mediaUrl?: string | null;
  posterUrl?: string | null;
  hoverVideoUrl?: string | null;
  alt?: string;
  timecode?: string;
  showCropMarks?: boolean;
  priority?: boolean;
  className?: string;
  cursorLabel?: string;
  onClick?: () => void;
}

export const MediaFrame: React.FC<MediaFrameProps> = ({
  aspectRatio = "16:9",
  mediaUrl,
  posterUrl,
  hoverVideoUrl,
  alt = "Production media frame",
  timecode = "00:00:12:04",
  showCropMarks = true,
  priority = false,
  className,
  cursorLabel = "VIEW",
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const ratioClass = {
    "16:9": "aspect-[16/9]",
    "9:16": "aspect-[9/16]",
    "1:1": "aspect-[1/1]",
    "4:5": "aspect-[4/5]",
    "21:9": "aspect-[21/9]",
  }[aspectRatio];

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (hoverVideoUrl && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (hoverVideoUrl && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const isVideo = mediaUrl?.endsWith(".mp4") || mediaUrl?.endsWith(".webm") || hoverVideoUrl;
  const hasMedia = Boolean(mediaUrl || posterUrl || hoverVideoUrl);

  return (
    <div
      data-cursor={cursorLabel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={clsx(
        "relative w-full overflow-hidden bg-[var(--bg-sunken)] border border-[var(--line)] transition-all duration-300 group",
        ratioClass,
        onClick && "cursor-pointer",
        className
      )}
    >
      {/* Media Rendering */}
      {hasMedia ? (
        <>
          {posterUrl && (
            <Image
              src={posterUrl}
              alt={alt}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 1200px"
              className={clsx(
                "object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.02]",
                isVideoLoaded && hoverVideoUrl && isHovered && "opacity-0"
              )}
            />
          )}

          {hoverVideoUrl && (
            <video
              ref={videoRef}
              src={hoverVideoUrl}
              muted
              loop
              playsInline
              preload="none"
              onLoadedData={() => setIsVideoLoaded(true)}
              className={clsx(
                "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
                isHovered ? "opacity-100" : "opacity-0"
              )}
            />
          )}

          {mediaUrl && !hoverVideoUrl && !posterUrl && isVideo && (
            <video
              src={mediaUrl}
              muted
              loop
              autoPlay
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </>
      ) : (
        /* Structural Placeholder (Section 5.2 / Section 12) */
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none bg-[radial-gradient(circle_at_center,rgba(236,234,230,0.03)_0%,transparent_70%)]">
          <div className="space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--accent)]">
              MEDIA PENDING — {aspectRatio}
            </p>
            <p className="font-mono text-[9px] uppercase tracking-[0.08em] text-[var(--text-faint)]">
              TC {timecode}
            </p>
          </div>
        </div>
      )}

      {/* Subtle bottom scrim to guarantee high text contrast */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[rgba(11,11,12,0.85)] to-transparent pointer-events-none opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

      {/* Corner Crop Marks (┌ ┐ └ ┘) */}
      {showCropMarks && (
        <div className="absolute inset-2.5 pointer-events-none transition-opacity duration-300 opacity-60 group-hover:opacity-100">
          <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--text-faint)] group-hover:border-[var(--accent)]" />
          <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[var(--text-faint)] group-hover:border-[var(--accent)]" />
          <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[var(--text-faint)] group-hover:border-[var(--accent)]" />
          <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--text-faint)] group-hover:border-[var(--accent)]" />
        </div>
      )}

      {/* Timecode Header Stamp */}
      <div className="absolute top-3 left-3 px-2 py-0.5 bg-[rgba(8,8,9,0.85)] backdrop-blur-sm border border-[var(--line)] pointer-events-none flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--signal)] animate-pulse" />
        <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--text)]">
          {timecode}
        </span>
      </div>
    </div>
  );
};

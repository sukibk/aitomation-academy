"use client";

import { useRef, useState } from "react";
import { Volume2 } from "lucide-react";
import posthog from "posthog-js";

// Same behavior as the landing-page VSL: autoplays muted, orange
// "Click To Unmute" overlay restarts it with sound.
export function AcademyVsl() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showUnmute, setShowUnmute] = useState(true);
  const [videoReady, setVideoReady] = useState(false);

  const handleUnmute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.currentTime = 0;
    video.play();
    setShowUnmute(false);
    posthog.capture("video_unmuted", { placement: "academy_hero" });
  };

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
      <video
        ref={videoRef}
        className="aspect-video w-full bg-black object-cover"
        controls
        controlsList="nodownload nofullscreen"
        disablePictureInPicture
        playsInline
        autoPlay
        muted
        preload="auto"
        onCanPlay={() => setVideoReady(true)}
        onContextMenu={(e) => e.preventDefault()}
      >
        <source src="/videos/intro-web.mp4" type="video/mp4" />
      </video>
      {showUnmute && videoReady && (
        <button
          onClick={handleUnmute}
          className="absolute inset-0 z-10 flex cursor-pointer flex-col items-center justify-center bg-black/20"
        >
          <div className="flex h-[80%] w-[85%] flex-col items-center justify-center gap-3 rounded-2xl bg-orange-500/60 shadow-2xl">
            <Volume2 className="h-10 w-10 text-white sm:h-12 sm:w-12" />
            <span className="text-center text-lg font-bold leading-tight text-white sm:text-2xl">
              Your Video Is Playing
            </span>
            <span className="text-sm font-semibold text-white/90 sm:text-base">
              Click To Unmute
            </span>
          </div>
        </button>
      )}
    </div>
  );
}

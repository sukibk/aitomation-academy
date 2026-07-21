"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Volume2, X } from "lucide-react";
import posthog from "posthog-js";
import { VAULT } from "@/lib/pricing";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const [showUnmute, setShowUnmute] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const [isPip, setIsPip] = useState(false);
  const [pipDismissed, setPipDismissed] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);

  const handleUnmute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.currentTime = 0;
    video.play();
    setShowUnmute(false);
    posthog.capture("video_unmuted");
  };

  const handleCanPlay = () => setVideoReady(true);
  const handleEnded = () => { setVideoEnded(true); setIsPip(false); posthog.capture("video_progress", { percent: 100 }); };
  const dismissPip = () => { setPipDismissed(true); setIsPip(false); };

  const videoProgressRef = useRef(new Set<number>());
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const pct = Math.round((video.currentTime / video.duration) * 100);
    [25, 50, 75].forEach((mark) => {
      if (pct >= mark && !videoProgressRef.current.has(mark)) {
        videoProgressRef.current.add(mark);
        posthog.capture("video_progress", { percent: mark });
      }
    });
  };

  // rAF-throttled scroll check
  const rafRef = useRef(0);
  const checkScroll = useCallback(() => {
    if (videoEnded || pipDismissed) return;
    const el = containerRef.current;
    if (!el) return;
    setIsPip(el.getBoundingClientRect().bottom < -50);
  }, [videoEnded, pipDismissed]);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(checkScroll);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [checkScroll]);

  // Move the video wrapper DOM node into/out of a fixed container
  // This avoids re-mounting the video element (which would restart it)
  useEffect(() => {
    const wrapper = videoWrapperRef.current;
    const container = containerRef.current;
    if (!wrapper || !container) return;

    if (isPip) {
      // Lock container height so page doesn't jump
      container.style.height = container.offsetHeight + "px";
      // Move to fixed PIP
      wrapper.style.position = "fixed";
      wrapper.style.bottom = "24px";
      wrapper.style.right = "24px";
      wrapper.style.width = window.innerWidth < 640 ? "200px" : "340px";
      wrapper.style.zIndex = "9999";
      wrapper.style.borderRadius = "12px";
      wrapper.style.boxShadow = "0 25px 50px -12px rgba(0,0,0,0.25)";
    } else {
      // Reset everything
      container.style.height = "";
      wrapper.style.position = "";
      wrapper.style.bottom = "";
      wrapper.style.right = "";
      wrapper.style.width = "";
      wrapper.style.zIndex = "";
      wrapper.style.borderRadius = "";
      wrapper.style.boxShadow = "";
    }
  }, [isPip]);

  return (
    <section data-section="hero" className="relative">
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="mx-auto max-w-4xl text-center">

          {/* Headline */}
          <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display tracking-tight text-slate-900">
            Claude can do half your workday.{" "}
            <span className="text-orange-600">We show you exactly how.</span>
          </h1>

          {/* Video container — keeps space when PIP */}
          <div ref={containerRef} className="mx-auto mb-4 max-w-2xl">
            <div
              ref={videoWrapperRef}
              className="relative rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl"
            >
              {/* Close PIP */}
              {isPip && (
                <button
                  onClick={dismissPip}
                  className="absolute -top-2 -left-2 z-[10000] bg-slate-900 text-white rounded-full p-1 shadow-lg cursor-pointer hover:bg-slate-700 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}

              <div className="relative w-full rounded-lg overflow-hidden" style={{ aspectRatio: "16/9" }}>
                {!videoReady && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900 rounded-lg">
                    <Image
                      src="/images/creatives/aitomation_logo.png"
                      alt="AItomation Academy"
                      width={200}
                      height={50}
                      className="opacity-40"
                      priority
                    />
                  </div>
                )}

                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  controls
                  controlsList="nodownload nofullscreen"
                  disablePictureInPicture
                  playsInline
                  autoPlay
                  muted
                  preload="auto"
                  onCanPlay={handleCanPlay}
                  onEnded={handleEnded}
                  onTimeUpdate={handleTimeUpdate}
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <source src="/videos/intro-web.mp4" type="video/mp4" />
                </video>

                {/* Unmute overlay */}
                {showUnmute && videoReady && !isPip && (
                  <button
                    onClick={handleUnmute}
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center cursor-pointer rounded-lg bg-black/20"
                  >
                    <div className="bg-orange-500/60 rounded-2xl flex flex-col items-center justify-center gap-3 shadow-2xl w-[85%] h-[80%]">
                      <Volume2 className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
                      <span className="text-white font-bold text-lg sm:text-2xl text-center leading-tight">
                        Your Video Is Playing
                      </span>
                      <span className="text-white/90 font-semibold text-sm sm:text-base">
                        Click To Unmute
                      </span>
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Subheadline */}
          <p className="mx-auto mb-5 max-w-2xl text-base text-slate-600 md:text-lg leading-relaxed">
            Most people piece Claude together from YouTube and get stuck in two weeks. No order,
            no feedback, no results. The Academy gives you the exact prompts, skills, courses, and
            weekly calls that 1,200+ non-technical professionals use to get finished work out of Claude.
          </p>

          {/* CTA — two paths */}
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/academy"
              data-cta="hero_academy"
              className="group inline-flex items-center justify-center rounded-xl bg-orange-500 px-8 py-3.5 text-base font-semibold text-white cursor-pointer hover:bg-orange-600 transition-colors"
            >
              Explore the Academy
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            {!VAULT.salesPaused && (
              <Link
                href="/vault"
                data-cta="hero_vault"
                className="inline-flex items-center justify-center rounded-xl border-2 border-slate-300 px-8 py-3.5 text-base font-semibold text-slate-800 hover:border-orange-400 hover:text-orange-600 transition-colors"
              >
                {VAULT.itemCount} prompts &amp; skills for{" "}
                <s className="mx-1 text-slate-400">${VAULT.anchorPrice}</s> ${VAULT.launchPrice}
              </Link>
            )}
          </div>

          {/* Trust signal */}
          <p className="mt-3 text-sm text-slate-500">
            1,200+ members · courses, 550+ Claude prompts &amp; skills, weekly live calls
          </p>

        </div>
      </div>
    </section>
  );
}

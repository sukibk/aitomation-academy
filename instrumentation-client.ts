import posthog from "posthog-js";

if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    defaults: "2026-01-30",
    capture_exceptions: true,
    // Collect $heatmap events (clicks, dead/rage clicks, mouse movement, scroll)
    // so PostHog's Heatmap overlay/Toolbar has data. Not enabled by the
    // 2026-01-30 defaults preset; opt-in. Not retroactive — data accrues from deploy.
    enable_heatmaps: true,
  });
}

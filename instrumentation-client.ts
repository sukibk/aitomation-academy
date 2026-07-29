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

  // Owner-device tagging: visit any page once with ?internal=1 and every event
  // from this browser is permanently stamped internal:true (persisted in
  // localStorage via a super property). All analytics queries filter it out,
  // so owner QA never contaminates metrics again — while events still flow,
  // which keeps end-to-end testing (pixel, funnels) fully visible.
  // Undo with ?internal=0. Better than IP/geo filters: follows the device,
  // not the network.
  try {
    const flag = new URLSearchParams(window.location.search).get("internal");
    if (flag === "1") {
      posthog.register({ internal: true });
      console.info("[analytics] this device is now tagged internal — excluded from metrics");
    } else if (flag === "0") {
      posthog.unregister("internal");
      console.info("[analytics] internal tag removed — this device counts again");
    }
  } catch {}
}

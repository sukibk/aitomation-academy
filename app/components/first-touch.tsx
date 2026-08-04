"use client";

import { useEffect } from "react";
import { recordFirstTouch } from "@/lib/attribution";

// Mounted once in the root layout: records where this visitor first landed.
export function FirstTouch() {
  useEffect(() => {
    recordFirstTouch();
  }, []);
  return null;
}

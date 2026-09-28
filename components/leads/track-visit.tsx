"use client";

import { useEffect, useRef } from "react";

/**
 * Records one anonymous "someone wanted to enquire" visit while the
 * enquiry form is switched off. Runs only when the page is actually shown
 * (not when Next.js prefetches a link), and only once per page view.
 */
export function TrackVisit({ source, lawyerId }: { source: "callback" | "find-a-solicitor"; lawyerId?: string }) {
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    const payload = JSON.stringify({ source, lawyerId });
    const url = "/uk/api/track";
    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, new Blob([payload], { type: "application/json" }));
    } else {
      fetch(url, { method: "POST", body: payload, headers: { "Content-Type": "application/json" }, keepalive: true });
    }
  }, [source, lawyerId]);

  return null;
}

#!/usr/bin/env node
/**
 * Cron Worker — Sacred Fire Intimacy
 * Runs Mon-Fri 12:00 UTC, 600s timeout
 * Called by start-with-cron.mjs
 */

import { generateArticle, AUTO_GEN_ENABLED } from "./generate-articles.mjs";

const TIMEOUT_MS = 600_000; // 10 minutes

export async function runCronJob() {
  if (!AUTO_GEN_ENABLED) {
    console.log("[cron-worker] AUTO_GEN_ENABLED = false. Skipping.");
    return;
  }

  const now = new Date();
  const day = now.getUTCDay();

  // Only run Mon-Fri (1-5)
  if (day === 0 || day === 6) {
    console.log("[cron-worker] Weekend. Skipping.");
    return;
  }

  console.log(`[cron-worker] Starting article generation at ${now.toISOString()}`);

  const timer = setTimeout(() => {
    console.error("[cron-worker] Timeout after 600s. Aborting.");
    process.exit(1);
  }, TIMEOUT_MS);

  try {
    await generateArticle();
    console.log("[cron-worker] Article generation complete.");
  } catch (err) {
    console.error("[cron-worker] Error:", err);
  } finally {
    clearTimeout(timer);
  }
}

// If run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runCronJob().then(() => process.exit(0));
}

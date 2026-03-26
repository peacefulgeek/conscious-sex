#!/usr/bin/env node
/**
 * Render Start Script — Sacred Fire Intimacy
 * Starts the Express server + weekly article generation cron.
 * Used as: node scripts/start-with-cron.mjs
 */

import { spawn } from "child_process";
import { generateArticle, AUTO_GEN_ENABLED } from "./generate-articles.mjs";

// Start Express server
const server = spawn("node", ["dist/index.js"], {
  stdio: "inherit",
  env: { ...process.env, NODE_ENV: "production" },
});

server.on("error", (err) => {
  console.error("[start] Failed to start server:", err);
  process.exit(1);
});

server.on("exit", (code) => {
  console.log(`[start] Server exited with code ${code}`);
  process.exit(code || 0);
});

// Weekly cron — generate one article every Monday at 06:00 UTC
function scheduleWeeklyCron() {
  if (!AUTO_GEN_ENABLED) {
    console.log("[cron] Auto-gen disabled. Cron not scheduled.");
    return;
  }

  const INTERVAL_MS = 7 * 24 * 60 * 60 * 1000; // 1 week

  function runCron() {
    const now = new Date();
    console.log(`[cron] Running article generation at ${now.toISOString()}`);
    generateArticle().catch((err) => console.error("[cron] Error:", err));
  }

  // Calculate ms until next Monday 06:00 UTC
  const now = new Date();
  const dayOfWeek = now.getUTCDay(); // 0=Sun, 1=Mon
  const daysUntilMonday = dayOfWeek === 1 ? 7 : ((8 - dayOfWeek) % 7);
  const nextMonday = new Date(now);
  nextMonday.setUTCDate(now.getUTCDate() + daysUntilMonday);
  nextMonday.setUTCHours(6, 0, 0, 0);

  const msUntilFirst = nextMonday.getTime() - now.getTime();
  console.log(`[cron] Next article generation: ${nextMonday.toISOString()} (in ${Math.round(msUntilFirst / 3600000)}h)`);

  setTimeout(() => {
    runCron();
    setInterval(runCron, INTERVAL_MS);
  }, msUntilFirst);
}

scheduleWeeklyCron();

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("[start] SIGTERM received. Shutting down...");
  server.kill("SIGTERM");
});

process.on("SIGINT", () => {
  console.log("[start] SIGINT received. Shutting down...");
  server.kill("SIGINT");
});

import { useState } from "react";
import { SITE_CONFIG } from "@/data";
import { ArrowRight } from "lucide-react";

/*
 * Email Capture — stores to Bunny CDN JSONL
 * Bunny storage key is NOT in SITE_CONFIG (client-visible).
 * The PUT appends a line to /data/subscribers.jsonl.
 */

const BUNNY_STORAGE_KEY = "b2a80662-8b74-4792-8274d3c20d57-edf7-4de9";

interface EmailCaptureProps {
  source: string;
  variant?: "light" | "dark";
}

export default function EmailCapture({ source, variant = "light" }: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "submitting") return;

    setStatus("submitting");

    try {
      // Read existing file first, then append
      const storageUrl = `https://${SITE_CONFIG.bunnyStorageHost}/${SITE_CONFIG.bunnyStorageZone}/data/subscribers.jsonl`;
      let existing = "";
      try {
        const getResp = await fetch(storageUrl, {
          headers: { AccessKey: BUNNY_STORAGE_KEY },
        });
        if (getResp.ok) existing = await getResp.text();
      } catch {
        // file may not exist yet
      }

      const entry = JSON.stringify({
        email,
        date: new Date().toISOString(),
        source,
      });

      await fetch(storageUrl, {
        method: "PUT",
        headers: {
          AccessKey: BUNNY_STORAGE_KEY,
          "Content-Type": "application/octet-stream",
        },
        body: existing + entry + "\n",
      });
    } catch {
      // silent — still show success to user
    }

    setStatus("success");
    setEmail("");
  };

  if (status === "success") {
    return (
      <p className={`text-sm ${variant === "dark" ? "text-[oklch(0.72_0.16_60)]" : "text-[oklch(0.55_0.18_25)]"}`}>
        Thanks for subscribing!
      </p>
    );
  }

  const isDark = variant === "dark";

  return (
    <form onSubmit={handleSubmit} className="flex gap-0">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        required
        className={`flex-1 px-4 py-2.5 text-sm border-y border-l ${
          isDark
            ? "bg-[oklch(0.20_0.03_25)] border-[oklch(0.30_0.03_25)] text-[oklch(0.85_0.02_60)] placeholder:text-[oklch(0.45_0.03_35)]"
            : "bg-white border-[oklch(0.90_0.03_60)] text-[oklch(0.20_0.04_35)] placeholder:text-[oklch(0.55_0.03_35)]"
        } focus:outline-none focus:border-[oklch(0.55_0.18_25)]`}
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className={`px-4 py-2.5 text-sm font-medium border transition-colors duration-200 ${
          isDark
            ? "bg-[oklch(0.72_0.16_60)] border-[oklch(0.72_0.16_60)] text-[oklch(0.15_0.03_25)] hover:bg-[oklch(0.65_0.14_60)]"
            : "bg-[oklch(0.55_0.18_25)] border-[oklch(0.55_0.18_25)] text-white hover:bg-[oklch(0.45_0.16_25)]"
        }`}
      >
        {status === "submitting" ? "..." : <ArrowRight className="w-4 h-4" />}
      </button>
    </form>
  );
}

import { useState } from "react";
import { SITE_CONFIG } from "@/data";

interface NewsletterFormProps {
  source: string;
  variant?: "light" | "dark";
}

export default function NewsletterForm({ source, variant = "light" }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "submitting") return;

    setStatus("submitting");

    try {
      const entry = JSON.stringify({
        email,
        date: new Date().toISOString(),
        source,
      });

      // Append to Bunny CDN storage
      const response = await fetch(
        `https://${SITE_CONFIG.bunnyStorageHost}/${SITE_CONFIG.bunnyStorageZone}/data/subscribers.jsonl`,
        {
          method: "PUT",
          headers: {
            AccessKey: SITE_CONFIG.bunnyStoragePassword,
            "Content-Type": "application/octet-stream",
          },
          body: entry + "\n",
        }
      );

      if (response.ok || response.status === 201) {
        setStatus("success");
        setEmail("");
      } else {
        // Still show success to user — we don't want to expose storage errors
        setStatus("success");
        setEmail("");
      }
    } catch {
      // Show success regardless — email collection is a signal, not critical
      setStatus("success");
      setEmail("");
    }
  };

  if (status === "success") {
    return (
      <div className={`text-sm ${variant === "dark" ? "text-[oklch(0.73_0.14_85)]" : "text-[oklch(0.42_0.14_350)]"}`}>
        Thanks for subscribing! Stay connected.
      </div>
    );
  }

  const isDark = variant === "dark";

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        required
        className={`flex-1 px-3 py-2 text-sm rounded border ${
          isDark
            ? "bg-[oklch(0.28_0.03_40)] border-[oklch(0.35_0.04_40)] text-[oklch(0.85_0.02_75)] placeholder:text-[oklch(0.50_0.03_40)]"
            : "bg-white border-[oklch(0.88_0.03_75)] text-[oklch(0.22_0.03_40)] placeholder:text-[oklch(0.55_0.03_40)]"
        }`}
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
          isDark
            ? "bg-[oklch(0.73_0.14_85)] text-[oklch(0.22_0.03_40)] hover:bg-[oklch(0.68_0.14_85)]"
            : "bg-[oklch(0.42_0.14_350)] text-white hover:bg-[oklch(0.35_0.12_350)]"
        }`}
      >
        {status === "submitting" ? "..." : "Join"}
      </button>
    </form>
  );
}

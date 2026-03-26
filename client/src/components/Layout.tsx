/*
 * Layout: Sacred Fire Intimacy
 * Render Template: Minimal nav — site name left, "Articles" + "About" right
 * Minimal footer — privacy, terms, email one-liner
 * NO hamburger menu on mobile
 */
import { useState, useEffect, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { SITE_CONFIG } from "@/data";
import EmailCapture from "./EmailCapture";

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[oklch(0.97_0.015_80/0.95)] backdrop-blur-md shadow-[0_1px_20px_oklch(0.55_0.18_25/0.06)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-4xl mx-auto px-6 md:px-8 flex items-center justify-between py-5">
        {/* Site name — text only, no icon */}
        <Link href="/" className="group">
          <span
            className="text-lg tracking-tight text-[oklch(0.20_0.04_35)]"
            style={{ fontFamily: "'Bodoni Moda', serif", fontWeight: 700 }}
          >
            Sacred Fire <span className="text-[oklch(0.55_0.18_25)]">Intimacy</span>
          </span>
        </Link>

        {/* Right nav — Articles + About only, always visible */}
        <div className="flex items-center gap-6">
          <Link
            href="/articles"
            className={`text-sm font-medium transition-colors duration-200 ${
              location.startsWith("/articles") || location.startsWith("/category")
                ? "text-[oklch(0.55_0.18_25)]"
                : "text-[oklch(0.30_0.04_35)] hover:text-[oklch(0.55_0.18_25)]"
            }`}
          >
            Articles
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium transition-colors duration-200 ${
              location === "/about"
                ? "text-[oklch(0.55_0.18_25)]"
                : "text-[oklch(0.30_0.04_35)] hover:text-[oklch(0.55_0.18_25)]"
            }`}
          >
            About
          </Link>
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[oklch(0.88_0.03_60)]">
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Left — email capture one-liner */}
          <div className="max-w-sm">
            <EmailCapture source="footer" variant="light" />
          </div>

          {/* Right — minimal links */}
          <div className="flex items-center gap-6 text-sm text-[oklch(0.50_0.04_35)]">
            <Link href="/privacy" className="hover:text-[oklch(0.55_0.18_25)] transition-colors duration-200">Privacy</Link>
            <Link href="/terms" className="hover:text-[oklch(0.55_0.18_25)] transition-colors duration-200">Terms</Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[oklch(0.92_0.03_60)]">
          <p className="text-xs text-[oklch(0.55_0.04_35)] leading-relaxed italic">
            {SITE_CONFIG.disclaimer}
          </p>
          <p className="text-xs text-[oklch(0.60_0.03_35)] mt-3">
            &copy; {new Date().getFullYear()} Sacred Fire Intimacy
          </p>
        </div>
      </div>
    </footer>
  );
}

function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setTimeout(() => setShow(true), 2000);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-50 bg-[oklch(0.99_0.005_80)] border border-[oklch(0.90_0.03_60)] shadow-[0_8px_40px_oklch(0.20_0.04_35/0.15)] p-5 rounded-sm">
      <p className="text-sm text-[oklch(0.30_0.04_35)] leading-relaxed mb-4">
        We use cookies to understand how you engage with our content.{" "}
        <Link href="/privacy" className="text-[oklch(0.55_0.18_25)] underline underline-offset-2">Privacy Policy</Link>.
      </p>
      <button
        onClick={() => {
          localStorage.setItem("cookie-consent", "true");
          setShow(false);
        }}
        className="px-5 py-2 bg-[oklch(0.55_0.18_25)] text-white text-sm font-medium hover:bg-[oklch(0.45_0.16_25)] transition-colors duration-200"
      >
        Accept
      </button>
    </div>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[oklch(0.98_0.008_80)]">
      <Header />
      <main className="flex-1 pt-[72px]">{children}</main>
      <Footer />
      <CookieConsent />
    </div>
  );
}

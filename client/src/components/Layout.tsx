/*
 * Layout: Sacred Fire Intimacy
 * Nav: site name left, Articles + Tools + Quizzes + About right
 * Footer: Amazon Associate disclosure, privacy, terms
 */
import { useState, useEffect, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { SITE_CONFIG } from "@/data";
import EmailCapture from "./EmailCapture";

const NAV_LINKS = [
  { href: "/articles", label: "Articles", match: (l: string) => l.startsWith("/articles") || l.startsWith("/category") || l.startsWith("/article/") },
  { href: "/tools", label: "Tools", match: (l: string) => l === "/tools" },
  { href: "/quizzes", label: "Quizzes", match: (l: string) => l.startsWith("/quiz") },
  { href: "/assessments", label: "Assessments", match: (l: string) => l.startsWith("/assess") },
  { href: "/about", label: "About", match: (l: string) => l === "/about" },
];

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
      <nav className="max-w-5xl mx-auto px-4 md:px-8 flex items-center justify-between py-4">
        <Link href="/" className="group shrink-0">
          <span
            className="text-lg tracking-tight text-[oklch(0.20_0.04_35)]"
            style={{ fontFamily: "'Bodoni Moda', serif", fontWeight: 700 }}
          >
            Sacred Fire <span className="text-[oklch(0.55_0.18_25)]">Intimacy</span>
          </span>
        </Link>

        <div className="flex items-center gap-3 md:gap-5 flex-wrap justify-end">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs md:text-sm font-medium transition-colors duration-200 ${
                link.match(location)
                  ? "text-[oklch(0.55_0.18_25)]"
                  : "text-[oklch(0.30_0.04_35)] hover:text-[oklch(0.55_0.18_25)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
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
          <div className="max-w-sm">
            <EmailCapture source="footer" variant="light" />
          </div>

          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-[oklch(0.50_0.04_35)]">
            <Link href="/articles" className="hover:text-[oklch(0.55_0.18_25)] transition-colors duration-200">Articles</Link>
            <Link href="/tools" className="hover:text-[oklch(0.55_0.18_25)] transition-colors duration-200">Tools</Link>
            <Link href="/quizzes" className="hover:text-[oklch(0.55_0.18_25)] transition-colors duration-200">Quizzes</Link>
            <Link href="/assessments" className="hover:text-[oklch(0.55_0.18_25)] transition-colors duration-200">Assessments</Link>
            <Link href="/about" className="hover:text-[oklch(0.55_0.18_25)] transition-colors duration-200">About</Link>
            <Link href="/privacy" className="hover:text-[oklch(0.55_0.18_25)] transition-colors duration-200">Privacy</Link>
            <Link href="/terms" className="hover:text-[oklch(0.55_0.18_25)] transition-colors duration-200">Terms</Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[oklch(0.92_0.03_60)]">
          <p className="text-xs text-[oklch(0.55_0.04_35)] leading-relaxed italic">
            {SITE_CONFIG.disclaimer}
          </p>
          <p className="text-xs text-[oklch(0.60_0.03_35)] mt-2">
            As an Amazon Associate I earn from qualifying purchases.
          </p>
          <p className="text-xs text-[oklch(0.60_0.03_35)] mt-2">
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

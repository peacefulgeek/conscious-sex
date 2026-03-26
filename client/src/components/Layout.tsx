/*
 * Layout: Sacred Fire Intimacy — Warm, Alive, Sensual
 * Ember (#8B3A3A), Flame (#C8884A), Honey (#D4A855), Blush, Petal
 * Bodoni Moda headlines, Lexend body
 */
import { useState, useEffect, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, Flame } from "lucide-react";
import { SITE_CONFIG, CATEGORIES } from "@/data";
import EmailCapture from "./EmailCapture";

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[oklch(0.97_0.015_80/0.95)] backdrop-blur-md shadow-[0_1px_20px_oklch(0.55_0.18_25/0.06)]"
          : "bg-transparent"
      }`}
    >
      <nav className="container flex items-center justify-between py-5">
        <Link href="/" className="flex items-center gap-3 group">
          <Flame className="w-7 h-7 text-[oklch(0.55_0.18_25)] group-hover:text-[oklch(0.72_0.16_60)] transition-colors duration-300" />
          <span
            className="text-xl tracking-tight text-[oklch(0.20_0.04_35)]"
            style={{ fontFamily: "'Bodoni Moda', serif", fontWeight: 700 }}
          >
            Sacred Fire <span className="text-[oklch(0.55_0.18_25)]">Intimacy</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          <Link href="/start-here" className="px-4 py-2 text-sm font-medium text-[oklch(0.30_0.04_35)] hover:text-[oklch(0.55_0.18_25)] transition-colors duration-200">
            Start Here
          </Link>
          <Link href="/articles" className="px-4 py-2 text-sm font-medium text-[oklch(0.30_0.04_35)] hover:text-[oklch(0.55_0.18_25)] transition-colors duration-200">
            Articles
          </Link>
          <div className="relative group">
            <button className="px-4 py-2 text-sm font-medium text-[oklch(0.30_0.04_35)] hover:text-[oklch(0.55_0.18_25)] transition-colors duration-200 flex items-center gap-1">
              Explore <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180 duration-200" />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div className="bg-[oklch(0.99_0.005_80)] rounded-sm shadow-[0_8px_40px_oklch(0.55_0.18_25/0.12)] py-3 min-w-[220px] border border-[oklch(0.90_0.03_60)]">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="block px-5 py-2.5 text-sm text-[oklch(0.30_0.04_35)] hover:bg-[oklch(0.92_0.04_15/0.5)] hover:text-[oklch(0.55_0.18_25)] transition-all duration-200"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link href="/quizzes" className="px-4 py-2 text-sm font-medium text-[oklch(0.30_0.04_35)] hover:text-[oklch(0.55_0.18_25)] transition-colors duration-200">
            Quizzes
          </Link>
          <Link href="/readiness" className="px-4 py-2 text-sm font-medium text-[oklch(0.30_0.04_35)] hover:text-[oklch(0.55_0.18_25)] transition-colors duration-200">
            Readiness
          </Link>
          <Link href="/about" className="px-4 py-2 text-sm font-medium text-[oklch(0.30_0.04_35)] hover:text-[oklch(0.55_0.18_25)] transition-colors duration-200">
            About
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 text-[oklch(0.30_0.04_35)]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[oklch(0.99_0.005_80)] border-t border-[oklch(0.90_0.03_60)]">
          <div className="container py-6 flex flex-col gap-1">
            <Link href="/start-here" className="py-3 text-sm font-medium text-[oklch(0.30_0.04_35)] border-b border-[oklch(0.94_0.02_60)]">Start Here</Link>
            <Link href="/articles" className="py-3 text-sm font-medium text-[oklch(0.30_0.04_35)] border-b border-[oklch(0.94_0.02_60)]">Articles</Link>
            {CATEGORIES.map((cat) => (
              <Link key={cat.slug} href={`/category/${cat.slug}`} className="py-2.5 pl-4 text-sm text-[oklch(0.40_0.04_35)] border-b border-[oklch(0.94_0.02_60)]">
                {cat.name}
              </Link>
            ))}
            <Link href="/quizzes" className="py-3 text-sm font-medium text-[oklch(0.30_0.04_35)] border-b border-[oklch(0.94_0.02_60)]">Quizzes</Link>
            <Link href="/readiness" className="py-3 text-sm font-medium text-[oklch(0.30_0.04_35)] border-b border-[oklch(0.94_0.02_60)]">Readiness Check</Link>
            <Link href="/about" className="py-3 text-sm font-medium text-[oklch(0.30_0.04_35)]">About</Link>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-[oklch(0.15_0.03_25)] text-[oklch(0.75_0.03_60)]">
      <div className="ember-line" />
      <div className="container py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <Flame className="w-6 h-6 text-[oklch(0.72_0.16_60)]" />
              <span
                className="text-xl text-[oklch(0.92_0.04_60)]"
                style={{ fontFamily: "'Bodoni Moda', serif", fontWeight: 700 }}
              >
                Sacred Fire Intimacy
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-8 text-[oklch(0.60_0.03_60)] max-w-sm">
              {SITE_CONFIG.subtitle}. {SITE_CONFIG.tagline}
            </p>
            <EmailCapture source="footer" variant="dark" />
          </div>

          {/* Explore */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[oklch(0.72_0.16_60)] mb-5">Explore</h4>
            <div className="flex flex-col gap-3">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="text-sm text-[oklch(0.60_0.03_60)] hover:text-[oklch(0.72_0.16_60)] transition-colors duration-200"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[oklch(0.72_0.16_60)] mb-5">Navigate</h4>
            <div className="flex flex-col gap-3">
              <Link href="/start-here" className="text-sm text-[oklch(0.60_0.03_60)] hover:text-[oklch(0.72_0.16_60)] transition-colors duration-200">Start Here</Link>
              <Link href="/about" className="text-sm text-[oklch(0.60_0.03_60)] hover:text-[oklch(0.72_0.16_60)] transition-colors duration-200">About</Link>
              <Link href="/quizzes" className="text-sm text-[oklch(0.60_0.03_60)] hover:text-[oklch(0.72_0.16_60)] transition-colors duration-200">Quizzes</Link>
              <Link href="/readiness" className="text-sm text-[oklch(0.60_0.03_60)] hover:text-[oklch(0.72_0.16_60)] transition-colors duration-200">Readiness</Link>
            </div>
          </div>

          {/* Legal */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[oklch(0.72_0.16_60)] mb-5">Legal</h4>
            <div className="flex flex-col gap-3">
              <Link href="/privacy" className="text-sm text-[oklch(0.60_0.03_60)] hover:text-[oklch(0.72_0.16_60)] transition-colors duration-200">Privacy</Link>
              <Link href="/terms" className="text-sm text-[oklch(0.60_0.03_60)] hover:text-[oklch(0.72_0.16_60)] transition-colors duration-200">Terms</Link>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-16 pt-8 border-t border-[oklch(0.25_0.03_25)]">
          <p className="text-xs text-[oklch(0.40_0.03_35)] leading-relaxed italic max-w-3xl">
            {SITE_CONFIG.disclaimer}
          </p>
          <p className="text-xs text-[oklch(0.35_0.02_35)] mt-4">
            &copy; {new Date().getFullYear()} Sacred Fire Intimacy. All rights reserved.
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
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-50 bg-[oklch(0.99_0.005_80)] border border-[oklch(0.90_0.03_60)] shadow-[0_8px_40px_oklch(0.20_0.04_35/0.15)] p-5 rounded-sm animate-in slide-in-from-bottom-4 duration-500">
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-[72px]">{children}</main>
      <Footer />
      <CookieConsent />
    </div>
  );
}

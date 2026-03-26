/*
 * Layout: Sacred Fire Intimacy — Temple Architecture design
 * Deep rose (#8B2252), sandalwood (#D2B48C), flame gold (#D4A017)
 * Bodoni Moda headlines, Lexend body
 */
import { useState, useEffect, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { SITE_CONFIG, CATEGORIES } from "@/data";
import NewsletterForm from "./NewsletterForm";

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="container flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full bg-[oklch(0.42_0.14_350)] flex items-center justify-center">
            <span className="text-white text-sm font-bold" style={{ fontFamily: "'Bodoni Moda', serif" }}>S</span>
          </div>
          <div>
            <span
              className="text-lg font-bold tracking-tight text-[oklch(0.42_0.14_350)]"
              style={{ fontFamily: "'Bodoni Moda', serif" }}
            >
              Sacred Fire Intimacy
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          <Link href="/articles" className="text-sm font-medium text-[oklch(0.35_0.05_40)] hover:text-[oklch(0.42_0.14_350)] transition-colors">
            Articles
          </Link>
          <div className="relative group">
            <button className="text-sm font-medium text-[oklch(0.35_0.05_40)] hover:text-[oklch(0.42_0.14_350)] transition-colors flex items-center gap-1">
              Categories <ChevronDown className="w-3 h-3" />
            </button>
            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="bg-white rounded-md shadow-lg border border-[oklch(0.88_0.03_75)] py-2 min-w-[200px]">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="block px-4 py-2 text-sm text-[oklch(0.35_0.05_40)] hover:bg-[oklch(0.93_0.02_75)] hover:text-[oklch(0.42_0.14_350)] transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link href="/quizzes" className="text-sm font-medium text-[oklch(0.35_0.05_40)] hover:text-[oklch(0.42_0.14_350)] transition-colors">
            Quizzes
          </Link>
          <Link href="/readiness" className="text-sm font-medium text-[oklch(0.35_0.05_40)] hover:text-[oklch(0.42_0.14_350)] transition-colors">
            Readiness Check
          </Link>
          <Link href="/start-here" className="text-sm font-medium text-[oklch(0.35_0.05_40)] hover:text-[oklch(0.42_0.14_350)] transition-colors">
            Start Here
          </Link>
          <Link href="/about" className="text-sm font-medium text-[oklch(0.35_0.05_40)] hover:text-[oklch(0.42_0.14_350)] transition-colors">
            About
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 text-[oklch(0.35_0.05_40)]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-[oklch(0.88_0.03_75)] shadow-lg">
          <div className="container py-4 flex flex-col gap-3">
            <Link href="/articles" className="py-2 text-sm font-medium text-[oklch(0.35_0.05_40)]">Articles</Link>
            {CATEGORIES.map((cat) => (
              <Link key={cat.slug} href={`/category/${cat.slug}`} className="py-2 pl-4 text-sm text-[oklch(0.45_0.04_40)]">
                {cat.name}
              </Link>
            ))}
            <Link href="/quizzes" className="py-2 text-sm font-medium text-[oklch(0.35_0.05_40)]">Quizzes</Link>
            <Link href="/readiness" className="py-2 text-sm font-medium text-[oklch(0.35_0.05_40)]">Readiness Check</Link>
            <Link href="/start-here" className="py-2 text-sm font-medium text-[oklch(0.35_0.05_40)]">Start Here</Link>
            <Link href="/about" className="py-2 text-sm font-medium text-[oklch(0.35_0.05_40)]">About</Link>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-[oklch(0.22_0.03_40)] text-[oklch(0.78_0.03_75)] mt-20">
      <div className="gold-divider" />
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3
              className="text-xl font-bold text-[oklch(0.73_0.14_85)] mb-4"
              style={{ fontFamily: "'Bodoni Moda', serif" }}
            >
              Sacred Fire Intimacy
            </h3>
            <p className="text-sm leading-relaxed mb-6 text-[oklch(0.65_0.03_75)]">
              {SITE_CONFIG.subtitle}. {SITE_CONFIG.tagline}
            </p>
            <NewsletterForm source="footer" variant="dark" />
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[oklch(0.73_0.14_85)] mb-4">Explore</h4>
            <div className="flex flex-col gap-2">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="text-sm text-[oklch(0.65_0.03_75)] hover:text-[oklch(0.73_0.14_85)] transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[oklch(0.73_0.14_85)] mb-4">Site</h4>
            <div className="flex flex-col gap-2">
              <Link href="/start-here" className="text-sm text-[oklch(0.65_0.03_75)] hover:text-[oklch(0.73_0.14_85)] transition-colors">Start Here</Link>
              <Link href="/about" className="text-sm text-[oklch(0.65_0.03_75)] hover:text-[oklch(0.73_0.14_85)] transition-colors">About</Link>
              <Link href="/quizzes" className="text-sm text-[oklch(0.65_0.03_75)] hover:text-[oklch(0.73_0.14_85)] transition-colors">Quizzes</Link>
              <Link href="/readiness" className="text-sm text-[oklch(0.65_0.03_75)] hover:text-[oklch(0.73_0.14_85)] transition-colors">Readiness Check</Link>
              <Link href="/privacy" className="text-sm text-[oklch(0.65_0.03_75)] hover:text-[oklch(0.73_0.14_85)] transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-sm text-[oklch(0.65_0.03_75)] hover:text-[oklch(0.73_0.14_85)] transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 pt-8 border-t border-[oklch(0.35_0.04_40)]">
          <p className="text-xs text-[oklch(0.50_0.03_40)] leading-relaxed italic">
            {SITE_CONFIG.disclaimer}
          </p>
          <p className="text-xs text-[oklch(0.40_0.02_40)] mt-4">
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
    if (!consent) setShow(true);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[oklch(0.88_0.03_75)] shadow-lg p-4">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[oklch(0.35_0.05_40)]">
          We use cookies to improve your experience. By continuing, you agree to our{" "}
          <Link href="/privacy" className="text-[oklch(0.42_0.14_350)] underline">Privacy Policy</Link>.
        </p>
        <button
          onClick={() => {
            localStorage.setItem("cookie-consent", "true");
            setShow(false);
          }}
          className="px-6 py-2 bg-[oklch(0.42_0.14_350)] text-white text-sm font-medium rounded hover:bg-[oklch(0.35_0.12_350)] transition-colors whitespace-nowrap"
        >
          Accept
        </button>
      </div>
    </div>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
      <CookieConsent />
    </div>
  );
}

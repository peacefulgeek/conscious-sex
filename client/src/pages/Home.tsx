/*
 * Home — Sacred Fire Intimacy
 * Unique editorial layout: asymmetric typography, staggered rhythm,
 * oversized pull quote, category river, breathing whitespace.
 * Joyful, sensual, spiritually alive — NOT corporate.
 */
import { Link } from "wouter";
import { ArrowRight, Flame } from "lucide-react";
import { getRecentArticles, CATEGORIES, SITE_CONFIG, type ArticleMeta, getArticlesByCategory } from "@/data";
import EmailCapture from "@/components/EmailCapture";
import { motion } from "framer-motion";

/* ── Oversized Opening Quote ── */
function HeroQuote({ article }: { article: ArticleMeta }) {
  const quote = article.metaDescription.split(".")[0] + ".";
  return (
    <section className="relative min-h-[80vh] flex items-end pb-16 md:pb-24 overflow-hidden">
      {/* Warm gradient wash — no image, just color and feeling */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 80%, oklch(0.92 0.06 45 / 0.5), transparent),
            radial-gradient(ellipse 50% 50% at 80% 20%, oklch(0.88 0.08 25 / 0.3), transparent),
            linear-gradient(175deg, oklch(0.98 0.01 60) 0%, oklch(0.95 0.02 40) 100%)
          `,
        }}
      />

      {/* Decorative oversized glyph */}
      <div
        className="absolute top-8 right-8 md:top-16 md:right-16 text-[12rem] md:text-[20rem] leading-none font-bold pointer-events-none select-none"
        style={{
          fontFamily: "'Bodoni Moda', serif",
          color: "oklch(0.55 0.18 25 / 0.06)",
        }}
      >
        &ldquo;
      </div>

      <div className="relative max-w-5xl mx-auto px-6 md:px-8 w-full">
        {/* Small flame icon + site identity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3 mb-8 md:mb-12"
        >
          <Flame className="w-4 h-4 text-[oklch(0.65_0.18_40)]" />
          <span className="text-xs font-semibold uppercase tracking-[0.4em] text-[oklch(0.50_0.06_35)]">
            {SITE_CONFIG.title}
          </span>
        </motion.div>

        {/* The quote — massive, left-aligned, Bodoni */}
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-[2.2rem] sm:text-[3rem] md:text-[4rem] lg:text-[4.8rem] leading-[1.05] font-bold text-[oklch(0.15_0.04_25)] tracking-[-0.02em] mb-8 md:mb-12 max-w-4xl"
          style={{ fontFamily: "'Bodoni Moda', serif" }}
        >
          {quote}
        </motion.blockquote>

        {/* Attribution */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Link
            href={`/articles/${article.slug}`}
            className="inline-flex items-center gap-3 group"
          >
            <span className="w-12 h-[1px] bg-[oklch(0.65_0.18_40)] group-hover:w-20 transition-all duration-500" />
            <span className="text-sm text-[oklch(0.45_0.06_35)] group-hover:text-[oklch(0.55_0.18_25)] transition-colors duration-300">
              {article.title}
            </span>
            <ArrowRight className="w-3 h-3 text-[oklch(0.55_0.18_25)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Latest Articles — Staggered Rhythm ── */
function LatestArticles({ articles }: { articles: ArticleMeta[] }) {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <div className="flex items-center gap-4 mb-16">
          <div className="w-8 h-[2px] bg-[oklch(0.65_0.18_40)]" />
          <h2 className="text-xs font-semibold uppercase tracking-[0.35em] text-[oklch(0.50_0.06_35)]">
            Latest Writing
          </h2>
        </div>

        {/* First article — oversized */}
        {articles[0] && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
          >
            <Link
              href={`/articles/${articles[0].slug}`}
              className="group block mb-16 md:mb-20"
            >
              <div className="md:pl-16 lg:pl-24">
                <span className="text-xs font-medium uppercase tracking-[0.3em] text-[oklch(0.55_0.18_25)] mb-4 block">
                  {articles[0].categoryName}
                </span>
                <h3
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-[oklch(0.15_0.04_25)] group-hover:text-[oklch(0.40_0.14_25)] transition-colors duration-500 leading-[1.1] mb-5 max-w-3xl"
                  style={{ fontFamily: "'Bodoni Moda', serif" }}
                >
                  {articles[0].title}
                </h3>
                <p className="text-[oklch(0.40_0.04_35)] leading-[1.8] text-base max-w-2xl mb-4 line-clamp-3">
                  {articles[0].metaDescription}
                </p>
                <span className="text-xs text-[oklch(0.55_0.06_35)]">
                  {articles[0].readingTime} min read &middot; {new Date(articles[0].dateISO).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Remaining articles — alternating indent */}
        <div className="space-y-0">
          {articles.slice(1).map((article, i) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Link
                href={`/articles/${article.slug}`}
                className="group block py-8 border-t border-[oklch(0.90_0.02_60)]"
              >
                <div className={`${i % 2 === 0 ? 'md:pl-16 lg:pl-24' : 'md:pl-0'} flex flex-col md:flex-row md:items-baseline md:gap-8`}>
                  <h3
                    className="text-xl md:text-2xl font-bold text-[oklch(0.18_0.04_25)] group-hover:text-[oklch(0.45_0.14_25)] transition-colors duration-400 leading-tight flex-1"
                    style={{ fontFamily: "'Bodoni Moda', serif" }}
                  >
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-4 mt-2 md:mt-0 flex-shrink-0">
                    <span className="text-xs text-[oklch(0.55_0.18_25)] font-medium">{article.categoryName}</span>
                    <span className="text-xs text-[oklch(0.55_0.06_35)]">{article.readingTime} min</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View all link */}
        <div className="mt-12 md:pl-16 lg:pl-24">
          <Link
            href="/articles"
            className="inline-flex items-center gap-3 text-sm font-medium text-[oklch(0.55_0.18_25)] hover:text-[oklch(0.35_0.14_15)] transition-colors duration-300 group"
          >
            <span>All articles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Category River — Horizontal scroll on mobile, stacked on desktop ── */
function CategoryRiver() {
  return (
    <section className="py-16 md:py-24 relative">
      {/* Subtle warm background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, oklch(0.97 0.015 50) 0%, oklch(0.99 0.005 60) 100%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6 md:px-8">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-8 h-[2px] bg-[oklch(0.65_0.18_40)]" />
          <h2 className="text-xs font-semibold uppercase tracking-[0.35em] text-[oklch(0.50_0.06_35)]">
            Explore
          </h2>
        </div>

        {/* Desktop: asymmetric grid */}
        <div className="hidden md:grid md:grid-cols-5 gap-0">
          {CATEGORIES.map((cat, i) => {
            const count = getArticlesByCategory(cat.slug).length;
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="group relative py-12 px-6 border-l border-[oklch(0.88_0.03_60)] first:border-l-0 hover:bg-[oklch(0.94_0.03_45/0.5)] transition-colors duration-500"
              >
                <span
                  className="block text-lg font-bold text-[oklch(0.18_0.04_25)] group-hover:text-[oklch(0.45_0.14_25)] transition-colors duration-400 leading-tight mb-3"
                  style={{ fontFamily: "'Bodoni Moda', serif" }}
                >
                  {cat.name}
                </span>
                <span className="block text-xs text-[oklch(0.55_0.06_35)]">
                  {count} articles
                </span>
                <ArrowRight className="w-3 h-3 text-[oklch(0.55_0.18_25)] mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            );
          })}
        </div>

        {/* Mobile: stacked with generous spacing */}
        <div className="md:hidden space-y-0">
          {CATEGORIES.map((cat) => {
            const count = getArticlesByCategory(cat.slug).length;
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="group flex items-center justify-between py-5 border-b border-[oklch(0.90_0.02_60)]"
              >
                <span
                  className="text-lg font-bold text-[oklch(0.18_0.04_25)] group-hover:text-[oklch(0.45_0.14_25)] transition-colors duration-300"
                  style={{ fontFamily: "'Bodoni Moda', serif" }}
                >
                  {cat.name}
                </span>
                <span className="text-xs text-[oklch(0.55_0.06_35)]">{count}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Email Capture — Warm, inviting ── */
function EmailSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <div className="md:pl-16 lg:pl-24 max-w-lg">
          <div className="w-8 h-[2px] bg-[oklch(0.65_0.18_40)] mb-8" />
          <h2
            className="text-2xl md:text-3xl font-bold text-[oklch(0.15_0.04_25)] mb-4 leading-tight"
            style={{ fontFamily: "'Bodoni Moda', serif" }}
          >
            Stay close to the fire
          </h2>
          <p className="text-[oklch(0.40_0.04_35)] leading-relaxed mb-8 text-base">
            Join a community doing the real work of conscious intimacy. No spam. Just signal.
          </p>
          <EmailCapture source="homepage" variant="light" />
        </div>
      </div>
    </section>
  );
}

/* ── Disclaimer ── */
function Disclaimer() {
  return (
    <section className="pb-12">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <div className="md:pl-16 lg:pl-24">
          <p className="text-xs text-[oklch(0.60_0.03_35)] leading-relaxed italic max-w-xl">
            This site provides educational content about conscious intimacy and sacred sexuality. It is not therapy.
            For sexual trauma, consult a licensed somatic or sex therapist.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const recent = getRecentArticles(8);
  const pullQuoteArticle = recent[0];

  return (
    <div>
      {pullQuoteArticle && <HeroQuote article={pullQuoteArticle} />}
      {recent.length > 0 && <LatestArticles articles={recent} />}
      <CategoryRiver />
      <EmailSection />
      <Disclaimer />
    </div>
  );
}

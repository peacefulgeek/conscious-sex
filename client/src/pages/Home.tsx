/*
 * Home: Sacred Fire Intimacy — Joyful, Sensual, Spiritually Alive
 * Full-bleed hero with generated art, asymmetric layouts, warm tones
 */
import { Link } from "wouter";
import { ArrowRight, Clock, Flame } from "lucide-react";
import { getRecentArticles, getArticlesByCategory, CATEGORIES, SITE_CONFIG, type ArticleMeta } from "@/data";
import EmailCapture from "@/components/EmailCapture";

function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-end overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://conscious-sexuality.b-cdn.net/site/hero-main.webp"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.12_0.04_25)] via-[oklch(0.12_0.04_25/0.4)] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.12_0.04_25/0.6)] to-transparent" />
      </div>

      <div className="relative container pb-20 md:pb-28 pt-40">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <Flame className="w-5 h-5 text-[oklch(0.72_0.16_60)]" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[oklch(0.72_0.16_60)]">
              {SITE_CONFIG.subtitle}
            </span>
          </div>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] mb-8"
            style={{ fontFamily: "'Bodoni Moda', serif" }}
          >
            Your body<br />
            is a temple.<br />
            <span className="text-[oklch(0.72_0.16_60)] italic">Act like it.</span>
          </h1>
          <p className="text-lg md:text-xl text-[oklch(0.80_0.03_60)] max-w-lg mb-10 leading-relaxed font-light">
            Conscious sexuality through ancient wisdom, somatic embodiment, and the courage to be fully alive in your body — together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/start-here"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[oklch(0.55_0.18_25)] text-white font-medium hover:bg-[oklch(0.45_0.16_25)] transition-all duration-300 text-sm tracking-wide uppercase"
            >
              Begin Your Journey <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/articles"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-[oklch(0.72_0.16_60/0.5)] text-[oklch(0.72_0.16_60)] font-medium hover:bg-[oklch(0.72_0.16_60/0.1)] transition-all duration-300 text-sm tracking-wide uppercase"
            >
              Explore Articles
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedArticle({ article }: { article: ArticleMeta }) {
  return (
    <Link href={`/articles/${article.slug}`} className="group block">
      <div className="grid md:grid-cols-5 gap-0 overflow-hidden bg-[oklch(0.99_0.005_80)]">
        <div className="md:col-span-3 overflow-hidden">
          <img
            src={article.heroImage}
            alt={article.title}
            width={1200}
            height={675}
            className="w-full h-full min-h-[300px] object-cover group-hover:scale-[1.03] transition-transform duration-700"
          />
        </div>
        <div className="md:col-span-2 p-8 md:p-12 flex flex-col justify-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[oklch(0.55_0.18_25)] mb-4">
            Featured
          </span>
          <h2
            className="text-2xl md:text-3xl font-bold text-[oklch(0.20_0.04_35)] group-hover:text-[oklch(0.55_0.18_25)] transition-colors duration-300 leading-tight mb-4"
            style={{ fontFamily: "'Bodoni Moda', serif" }}
          >
            {article.title}
          </h2>
          <p className="text-[oklch(0.40_0.04_35)] leading-relaxed mb-6 text-sm">
            {article.metaDescription}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-[oklch(0.50_0.04_35)] flex items-center gap-1">
              <Clock className="w-3 h-3" /> {article.readingTime} min
            </span>
            <span className="text-xs text-[oklch(0.50_0.04_35)]">{article.categoryName}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function ArticleCard({ article, size = "normal" }: { article: ArticleMeta; size?: "normal" | "large" }) {
  return (
    <Link href={`/articles/${article.slug}`} className="group block warm-card">
      <div className="overflow-hidden mb-4">
        <img
          src={article.heroImage}
          alt={article.title}
          width={600}
          height={338}
          loading="lazy"
          className={`w-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ${
            size === "large" ? "aspect-[4/3]" : "aspect-[16/9]"
          }`}
        />
      </div>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[oklch(0.55_0.18_25)]">
          {article.categoryName}
        </span>
        <span className="w-1 h-1 rounded-full bg-[oklch(0.72_0.16_60)]" />
        <span className="text-[10px] text-[oklch(0.50_0.04_35)] flex items-center gap-1">
          <Clock className="w-2.5 h-2.5" /> {article.readingTime} min
        </span>
      </div>
      <h3
        className={`font-bold text-[oklch(0.20_0.04_35)] group-hover:text-[oklch(0.55_0.18_25)] transition-colors duration-300 leading-snug ${
          size === "large" ? "text-xl md:text-2xl" : "text-lg"
        }`}
        style={{ fontFamily: "'Bodoni Moda', serif" }}
      >
        {article.title}
      </h3>
      {size === "large" && (
        <p className="mt-2 text-sm text-[oklch(0.40_0.04_35)] leading-relaxed line-clamp-2">
          {article.metaDescription}
        </p>
      )}
    </Link>
  );
}

function CategoryRiver({ category, articles }: { category: typeof CATEGORIES[0]; articles: ArticleMeta[] }) {
  if (articles.length === 0) return null;
  const lead = articles[0];
  const rest = articles.slice(1, 4);

  return (
    <section className="py-16">
      <div className="container">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="w-8 h-[2px] bg-[oklch(0.72_0.16_60)]" />
            <h2
              className="text-2xl md:text-3xl font-bold text-[oklch(0.20_0.04_35)]"
              style={{ fontFamily: "'Bodoni Moda', serif" }}
            >
              {category.name}
            </h2>
          </div>
          <Link
            href={`/category/${category.slug}`}
            className="text-xs font-semibold uppercase tracking-[0.15em] text-[oklch(0.55_0.18_25)] hover:text-[oklch(0.35_0.12_15)] flex items-center gap-2 transition-colors duration-200"
          >
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-6">
            <ArticleCard article={lead} size="large" />
          </div>
          <div className="md:col-span-6 flex flex-col gap-6">
            {rest.map((art) => (
              <Link key={art.slug} href={`/articles/${art.slug}`} className="group flex gap-5 items-start warm-card">
                <img
                  src={art.heroImage}
                  alt={art.title}
                  width={160}
                  height={100}
                  loading="lazy"
                  className="w-32 h-20 object-cover flex-shrink-0 group-hover:scale-[1.03] transition-transform duration-500"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[oklch(0.55_0.18_25)] mb-1 block">
                    {art.categoryName}
                  </span>
                  <h4
                    className="text-sm font-bold text-[oklch(0.20_0.04_35)] group-hover:text-[oklch(0.55_0.18_25)] transition-colors duration-300 leading-snug line-clamp-2"
                    style={{ fontFamily: "'Bodoni Moda', serif" }}
                  >
                    {art.title}
                  </h4>
                  <span className="text-[10px] text-[oklch(0.50_0.04_35)] mt-1 block">{art.readingTime} min read</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function EmailCaptureSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://conscious-sexuality.b-cdn.net/site/hero-connection.webp"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[oklch(0.12_0.04_25/0.85)]" />
      </div>
      <div className="relative container text-center max-w-xl mx-auto">
        <Flame className="w-8 h-8 text-[oklch(0.72_0.16_60)] mx-auto mb-6" />
        <h2
          className="text-3xl md:text-4xl font-bold text-white mb-4"
          style={{ fontFamily: "'Bodoni Moda', serif" }}
        >
          Stay in the Fire
        </h2>
        <p className="text-[oklch(0.75_0.03_60)] mb-8 leading-relaxed">
          Join a community of people doing the real work of conscious intimacy. No spam. Just signal.
        </p>
        <div className="max-w-sm mx-auto">
          <EmailCapture source="homepage-cta" variant="dark" />
        </div>
      </div>
    </section>
  );
}

function QuizTeaser() {
  return (
    <section className="py-20 bg-[oklch(0.92_0.04_15)]">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[oklch(0.55_0.18_25)] mb-4 block">Interactive</span>
            <h2
              className="text-3xl md:text-4xl font-bold text-[oklch(0.20_0.04_35)] mb-6 leading-tight"
              style={{ fontFamily: "'Bodoni Moda', serif" }}
            >
              What does your<br />intimacy reveal<br />about you?
            </h2>
            <p className="text-[oklch(0.40_0.04_35)] leading-relaxed mb-8 max-w-md">
              Nine quizzes designed to illuminate your patterns, desires, and edges. Not personality tests — mirrors.
            </p>
            <Link
              href="/quizzes"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[oklch(0.55_0.18_25)] text-white font-medium hover:bg-[oklch(0.45_0.16_25)] transition-all duration-300 text-sm tracking-wide uppercase"
            >
              Take a Quiz <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="relative">
            <img
              src="https://conscious-sexuality.b-cdn.net/site/hero-energy.webp"
              alt="Sacred energy"
              className="w-full aspect-[4/5] object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[oklch(0.92_0.04_15)] to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const recent = getRecentArticles(20);
  const heroArticle = recent[0];
  const latestThree = recent.slice(1, 4);

  return (
    <div>
      <HeroSection />

      {/* Featured Article */}
      {heroArticle && (
        <section className="container py-16">
          <FeaturedArticle article={heroArticle} />
        </section>
      )}

      {/* Latest Articles */}
      {latestThree.length > 0 && (
        <section className="container pb-16">
          <div className="ember-line mb-12" />
          <div className="flex items-center gap-4 mb-10">
            <div className="w-8 h-[2px] bg-[oklch(0.72_0.16_60)]" />
            <h2
              className="text-2xl font-bold text-[oklch(0.20_0.04_35)]"
              style={{ fontFamily: "'Bodoni Moda', serif" }}
            >
              Latest
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestThree.map((art) => (
              <ArticleCard key={art.slug} article={art} />
            ))}
          </div>
        </section>
      )}

      {/* Email Capture */}
      <EmailCaptureSection />

      {/* Category Rivers */}
      {CATEGORIES.map((cat, i) => (
        <div key={cat.slug}>
          <CategoryRiver category={cat} articles={getArticlesByCategory(cat.slug)} />
          {i < CATEGORIES.length - 1 && (
            <div className="container"><div className="ember-line" /></div>
          )}
        </div>
      ))}

      {/* Quiz Teaser */}
      <QuizTeaser />
    </div>
  );
}

/*
 * Home: Sacred Fire Intimacy — Magazine-style homepage
 * Hero article, category sections, CTA, newsletter
 */
import { Link } from "wouter";
import { ArrowRight, Clock } from "lucide-react";
import { getRecentArticles, getArticlesByCategory, CATEGORIES, SITE_CONFIG, type ArticleMeta } from "@/data";
import NewsletterForm from "@/components/NewsletterForm";

function ArticleCard({ article, featured = false }: { article: ArticleMeta; featured?: boolean }) {
  return (
    <Link href={`/articles/${article.slug}`} className="group block">
      <article className={featured ? "grid md:grid-cols-2 gap-6 items-center" : ""}>
        <div className={`overflow-hidden rounded ${featured ? "aspect-[16/10]" : "aspect-[16/9] mb-4"}`}>
          <img
            src={article.heroImage}
            alt={article.title}
            width={1200}
            height={675}
            loading={featured ? undefined : "lazy"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className={featured ? "py-4" : ""}>
          <div className="flex items-center gap-3 mb-2">
            <Link
              href={`/category/${article.categorySlug}`}
              className="text-xs font-semibold uppercase tracking-wider text-[oklch(0.42_0.14_350)] hover:text-[oklch(0.73_0.14_85)] transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              {article.categoryName}
            </Link>
            <span className="text-xs text-[oklch(0.55_0.03_40)]">·</span>
            <span className="text-xs text-[oklch(0.55_0.03_40)] flex items-center gap-1">
              <Clock className="w-3 h-3" /> {article.readingTime} min
            </span>
          </div>
          <h2
            className={`font-bold text-[oklch(0.22_0.03_40)] group-hover:text-[oklch(0.42_0.14_350)] transition-colors ${
              featured ? "text-3xl md:text-4xl leading-tight" : "text-xl leading-snug"
            }`}
            style={{ fontFamily: "'Bodoni Moda', serif" }}
          >
            {article.title}
          </h2>
          <p className={`mt-2 text-[oklch(0.45_0.04_40)] leading-relaxed ${featured ? "text-base" : "text-sm line-clamp-2"}`}>
            {article.metaDescription}
          </p>
          {featured && (
            <div className="mt-4 flex items-center gap-2 text-sm font-medium text-[oklch(0.42_0.14_350)]">
              Read Article <ArrowRight className="w-4 h-4" />
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}

function CategorySection({ category, articles }: { category: typeof CATEGORIES[0]; articles: ArticleMeta[] }) {
  if (articles.length === 0) return null;
  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2
          className="text-2xl font-bold text-[oklch(0.22_0.03_40)]"
          style={{ fontFamily: "'Bodoni Moda', serif" }}
        >
          {category.name}
        </h2>
        <Link
          href={`/category/${category.slug}`}
          className="text-sm font-medium text-[oklch(0.42_0.14_350)] hover:text-[oklch(0.73_0.14_85)] flex items-center gap-1 transition-colors"
        >
          View All <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.slice(0, 3).map((art) => (
          <ArticleCard key={art.slug} article={art} />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const recent = getRecentArticles(20);
  const heroArticle = recent[0];
  const secondaryArticles = recent.slice(1, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-[oklch(0.22_0.03_40)] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.22_0.03_40)/80] to-[oklch(0.22_0.03_40)]" />
        <div className="container relative py-20 md:py-32">
          <div className="max-w-3xl">
            <p className="text-[oklch(0.73_0.14_85)] text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              {SITE_CONFIG.subtitle}
            </p>
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-[oklch(0.97_0.01_85)] leading-[1.1] mb-6"
              style={{ fontFamily: "'Bodoni Moda', serif" }}
            >
              Your body is a temple.<br />
              <span className="text-[oklch(0.73_0.14_85)]">Act like it — together.</span>
            </h1>
            <p className="text-lg text-[oklch(0.70_0.03_75)] max-w-xl mb-8 leading-relaxed">
              Sacred Fire Intimacy explores conscious sexuality through Advaita Vedanta, classical Tantra, and somatic embodiment. Presence transforms physical intimacy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/start-here"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[oklch(0.42_0.14_350)] text-white font-medium rounded hover:bg-[oklch(0.35_0.12_350)] transition-colors"
              >
                Start Here <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/articles"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[oklch(0.73_0.14_85)] text-[oklch(0.73_0.14_85)] font-medium rounded hover:bg-[oklch(0.73_0.14_85)/10] transition-colors"
              >
                Browse Articles
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {heroArticle && (
        <section className="container py-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-[2px] bg-[oklch(0.73_0.14_85)]" />
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[oklch(0.55_0.03_40)]">Featured</span>
          </div>
          <ArticleCard article={heroArticle} featured />
        </section>
      )}

      {/* Secondary articles */}
      {secondaryArticles.length > 0 && (
        <section className="container pb-16">
          <div className="gold-divider mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {secondaryArticles.map((art) => (
              <ArticleCard key={art.slug} article={art} />
            ))}
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="bg-[oklch(0.93_0.02_75)] py-16">
        <div className="container text-center max-w-xl mx-auto">
          <h2
            className="text-3xl font-bold text-[oklch(0.22_0.03_40)] mb-4"
            style={{ fontFamily: "'Bodoni Moda', serif" }}
          >
            Stay Connected
          </h2>
          <p className="text-[oklch(0.45_0.04_40)] mb-6">
            Join our community of conscious lovers exploring sacred intimacy.
          </p>
          <NewsletterForm source="homepage" />
        </div>
      </section>

      {/* Category Sections */}
      <div className="container py-16">
        {CATEGORIES.map((cat) => (
          <CategorySection
            key={cat.slug}
            category={cat}
            articles={getArticlesByCategory(cat.slug)}
          />
        ))}
      </div>

      {/* Quiz CTA */}
      <section className="bg-[oklch(0.22_0.03_40)] py-16">
        <div className="container text-center">
          <h2
            className="text-3xl font-bold text-[oklch(0.97_0.01_85)] mb-4"
            style={{ fontFamily: "'Bodoni Moda', serif" }}
          >
            Discover Your Intimate Self
          </h2>
          <p className="text-[oklch(0.70_0.03_75)] mb-8 max-w-lg mx-auto">
            Take one of our 9 quizzes to explore your intimacy style, sexual presence, desire language, and more.
          </p>
          <Link
            href="/quizzes"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[oklch(0.73_0.14_85)] text-[oklch(0.22_0.03_40)] font-medium rounded hover:bg-[oklch(0.68_0.14_85)] transition-colors"
          >
            Explore Quizzes <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

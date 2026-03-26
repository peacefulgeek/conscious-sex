import { Link } from "wouter";
import { ArrowRight, Clock, Flame } from "lucide-react";
import { filterPublished, CATEGORIES, type ArticleMeta } from "@/data";

export default function StartHere() {
  const published = filterPublished();
  const pillarArticles = CATEGORIES.map((cat) => {
    const catArticles = published.filter((a) => a.categorySlug === cat.slug);
    return { category: cat, articles: catArticles.slice(0, 3) };
  });

  return (
    <div>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://conscious-sexuality.b-cdn.net/site/hero-embodiment.webp" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.12_0.04_25/0.85)] to-[oklch(0.12_0.04_25/0.5)]" />
        </div>
        <div className="container relative max-w-2xl">
          <Flame className="w-6 h-6 text-[oklch(0.72_0.16_60)] mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "'Bodoni Moda', serif" }}>Start Here</h1>
          <p className="text-lg text-[oklch(0.80_0.03_60)] leading-relaxed">
            New to Sacred Fire Intimacy? This page curates the essential reads across each dimension of conscious sexuality. Think of it as your guided entry into the work.
          </p>
        </div>
      </section>
      <div className="ember-line" />
      {pillarArticles.map(({ category, articles }, i) => (
        <section key={category.slug} className={`py-16 ${i % 2 === 1 ? "bg-[oklch(0.94_0.02_60)]" : ""}`}>
          <div className="container">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-[2px] bg-[oklch(0.72_0.16_60)]" />
              <h2 className="text-2xl md:text-3xl font-bold text-[oklch(0.20_0.04_35)]" style={{ fontFamily: "'Bodoni Moda', serif" }}>{category.name}</h2>
            </div>
            <p className="text-[oklch(0.40_0.04_35)] max-w-xl mb-10">{category.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {articles.map((art: ArticleMeta) => (
                <Link key={art.slug} href={`/articles/${art.slug}`} className="group block warm-card">
                  <div className="overflow-hidden mb-4">
                    <img src={art.heroImage} alt={art.title} width={400} height={225} loading="lazy" className="w-full aspect-[16/9] object-cover group-hover:scale-[1.04] transition-transform duration-700" />
                  </div>
                  <h3 className="text-lg font-bold text-[oklch(0.20_0.04_35)] group-hover:text-[oklch(0.55_0.18_25)] transition-colors duration-300 leading-snug" style={{ fontFamily: "'Bodoni Moda', serif" }}>{art.title}</h3>
                  <span className="text-[10px] text-[oklch(0.50_0.04_35)] flex items-center gap-1 mt-2"><Clock className="w-2.5 h-2.5" /> {art.readingTime} min</span>
                </Link>
              ))}
            </div>
            <Link href={`/category/${category.slug}`} className="inline-flex items-center gap-2 mt-8 text-xs font-semibold uppercase tracking-[0.15em] text-[oklch(0.55_0.18_25)] hover:text-[oklch(0.35_0.12_15)] transition-colors duration-200">
              All {category.name} Articles <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </section>
      ))}
      <section className="py-16 bg-[oklch(0.15_0.03_25)] text-center">
        <div className="container max-w-lg">
          <Flame className="w-8 h-8 text-[oklch(0.72_0.16_60)] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "'Bodoni Moda', serif" }}>Ready to go deeper?</h2>
          <p className="text-[oklch(0.65_0.03_60)] mb-8">Take one of our quizzes to discover where your edge is — or explore the full article archive.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quizzes" className="px-8 py-3 bg-[oklch(0.55_0.18_25)] text-white text-sm font-medium uppercase tracking-wide hover:bg-[oklch(0.45_0.16_25)] transition-colors">Take a Quiz</Link>
            <Link href="/articles" className="px-8 py-3 border border-[oklch(0.72_0.16_60/0.5)] text-[oklch(0.72_0.16_60)] text-sm font-medium uppercase tracking-wide hover:bg-[oklch(0.72_0.16_60/0.1)] transition-colors">All Articles</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

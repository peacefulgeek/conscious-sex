import { useMemo } from "react";
import { Link, useParams } from "wouter";
import { Clock, ArrowRight } from "lucide-react";
import { getArticlesByCategory, CATEGORIES, type ArticleMeta } from "@/data";

function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <Link href={`/articles/${article.slug}`} className="group block warm-card">
      <div className="overflow-hidden mb-4">
        <img src={article.heroImage} alt={article.title} width={600} height={338} loading="lazy"
          className="w-full aspect-[16/9] object-cover group-hover:scale-[1.04] transition-transform duration-700" />
      </div>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[oklch(0.55_0.18_25)]">{article.categoryName}</span>
        <span className="w-1 h-1 rounded-full bg-[oklch(0.72_0.16_60)]" />
        <span className="text-[10px] text-[oklch(0.50_0.04_35)] flex items-center gap-1"><Clock className="w-2.5 h-2.5" /> {article.readingTime} min</span>
      </div>
      <h3 className="text-lg font-bold text-[oklch(0.20_0.04_35)] group-hover:text-[oklch(0.55_0.18_25)] transition-colors duration-300 leading-snug" style={{ fontFamily: "'Bodoni Moda', serif" }}>
        {article.title}
      </h3>
      <p className="mt-2 text-sm text-[oklch(0.40_0.04_35)] leading-relaxed line-clamp-2">{article.metaDescription}</p>
    </Link>
  );
}

export default function CategoryPage() {
  const params = useParams<{ slug: string }>();
  const category = CATEGORIES.find(c => c.slug === params.slug);
  const articles = useMemo(() => getArticlesByCategory(params.slug || ""), [params.slug]);

  if (!category) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Bodoni Moda', serif" }}>Category Not Found</h1>
        <Link href="/articles" className="text-[oklch(0.55_0.18_25)] underline">Browse all articles</Link>
      </div>
    );
  }

  return (
    <div>
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 flame-glow" />
        <div className="container relative">
          <nav className="flex items-center gap-2 text-xs text-[oklch(0.50_0.04_35)] mb-6">
            <Link href="/" className="hover:text-[oklch(0.55_0.18_25)]">Home</Link>
            <span className="text-[oklch(0.72_0.16_60)]">/</span>
            <span className="text-[oklch(0.30_0.04_35)]">{category.name}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-[oklch(0.20_0.04_35)] mb-4" style={{ fontFamily: "'Bodoni Moda', serif" }}>
            {category.name}
          </h1>
          <p className="text-[oklch(0.40_0.04_35)] max-w-lg">{category.description} — {articles.length} articles</p>
        </div>
      </section>
      <div className="ember-line" />
      <section className="container py-12">
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {articles.map(a => <ArticleCard key={a.slug} article={a} />)}
          </div>
        ) : (
          <p className="text-center py-20 text-[oklch(0.50_0.04_35)]">Articles coming soon.</p>
        )}
      </section>
      <section className="container py-12 border-t border-[oklch(0.90_0.03_60)]">
        <h2 className="text-xl font-bold text-[oklch(0.20_0.04_35)] mb-6" style={{ fontFamily: "'Bodoni Moda', serif" }}>Explore Other Themes</h2>
        <div className="flex flex-wrap gap-3">
          {CATEGORIES.filter(c => c.slug !== category.slug).map(cat => (
            <Link key={cat.slug} href={`/category/${cat.slug}`}
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] border border-[oklch(0.90_0.03_60)] text-[oklch(0.40_0.04_35)] hover:border-[oklch(0.55_0.18_25)] hover:text-[oklch(0.55_0.18_25)] transition-all duration-200 flex items-center gap-2">
              {cat.name} <ArrowRight className="w-3 h-3" />
            </Link>
          ))}
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "CollectionPage",
        name: category.name, description: category.description,
        url: `https://consciousex.love/category/${category.slug}`,
      }) }} />
    </div>
  );
}

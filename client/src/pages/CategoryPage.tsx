import { useMemo } from "react";
import { Link, useParams } from "wouter";
import { Clock, ArrowRight } from "lucide-react";
import { getArticlesByCategory, CATEGORIES, type ArticleMeta } from "@/data";

function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <Link href={`/articles/${article.slug}`} className="group block">
      <article>
        <div className="overflow-hidden rounded aspect-[16/9] mb-4">
          <img src={article.heroImage} alt={article.title} width={600} height={338} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs text-[oklch(0.55_0.03_40)] flex items-center gap-1"><Clock className="w-3 h-3" /> {article.readingTime} min</span>
          <span className="text-xs text-[oklch(0.55_0.03_40)]">{article.dateHuman}</span>
        </div>
        <h2 className="text-lg font-bold text-[oklch(0.22_0.03_40)] group-hover:text-[oklch(0.42_0.14_350)] transition-colors leading-snug" style={{ fontFamily: "'Bodoni Moda', serif" }}>{article.title}</h2>
        <p className="mt-2 text-sm text-[oklch(0.45_0.04_40)] line-clamp-2">{article.metaDescription}</p>
      </article>
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
        <Link href="/articles" className="text-[oklch(0.42_0.14_350)] underline">Browse all articles</Link>
      </div>
    );
  }

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.name,
    description: category.description,
    url: `https://consciousex.love/category/${category.slug}`,
  };

  return (
    <div className="container py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <div className="mb-12">
        <nav className="flex items-center gap-2 text-xs text-[oklch(0.55_0.03_40)] mb-4">
          <Link href="/" className="hover:text-[oklch(0.42_0.14_350)]">Home</Link>
          <span>/</span>
          <span className="text-[oklch(0.35_0.05_40)]">{category.name}</span>
        </nav>
        <h1 className="text-4xl md:text-5xl font-bold text-[oklch(0.22_0.03_40)] mb-3" style={{ fontFamily: "'Bodoni Moda', serif" }}>{category.name}</h1>
        <p className="text-lg text-[oklch(0.45_0.04_40)] max-w-2xl">{category.description}</p>
      </div>
      <div className="gold-divider mb-8" />
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map(a => <ArticleCard key={a.slug} article={a} />)}
        </div>
      ) : (
        <p className="text-center py-20 text-[oklch(0.55_0.03_40)]">Articles coming soon.</p>
      )}
      {/* Other categories */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-[oklch(0.22_0.03_40)] mb-6" style={{ fontFamily: "'Bodoni Moda', serif" }}>Explore Other Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.filter(c => c.slug !== category.slug).map(c => (
            <Link key={c.slug} href={`/category/${c.slug}`} className="group p-4 rounded border border-[oklch(0.88_0.03_75)] hover:border-[oklch(0.42_0.14_350)] transition-colors">
              <h3 className="font-bold text-[oklch(0.22_0.03_40)] group-hover:text-[oklch(0.42_0.14_350)] transition-colors" style={{ fontFamily: "'Bodoni Moda', serif" }}>{c.name}</h3>
              <p className="text-xs text-[oklch(0.55_0.03_40)] mt-1 line-clamp-2">{c.description}</p>
              <span className="text-xs text-[oklch(0.42_0.14_350)] mt-2 flex items-center gap-1">Explore <ArrowRight className="w-3 h-3" /></span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

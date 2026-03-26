/*
 * Articles: Browse all — warm, alive design
 */
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { Search, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { filterPublished, CATEGORIES, type ArticleMeta } from "@/data";

const PER_PAGE = 12;

function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <Link href={`/articles/${article.slug}`} className="group block warm-card">
      <div className="overflow-hidden mb-4">
        <img
          src={article.heroImage}
          alt={article.title}
          width={600}
          height={338}
          loading="lazy"
          className="w-full aspect-[16/9] object-cover group-hover:scale-[1.04] transition-transform duration-700"
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
        className="text-lg font-bold text-[oklch(0.20_0.04_35)] group-hover:text-[oklch(0.55_0.18_25)] transition-colors duration-300 leading-snug"
        style={{ fontFamily: "'Bodoni Moda', serif" }}
      >
        {article.title}
      </h3>
      <p className="mt-2 text-sm text-[oklch(0.40_0.04_35)] leading-relaxed line-clamp-2">
        {article.metaDescription}
      </p>
    </Link>
  );
}

export default function Articles() {
  const allArticles = useMemo(() => filterPublished(), []);
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = allArticles;
    if (activeCat) list = list.filter((a) => a.categorySlug === activeCat);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.metaDescription.toLowerCase().includes(q) ||
          (a.metaKeywords && a.metaKeywords.toLowerCase().includes(q))
      );
    }
    return list.sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime());
  }, [allArticles, query, activeCat]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div>
      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 flame-glow" />
        <div className="container relative">
          <h1
            className="text-4xl md:text-5xl font-bold text-[oklch(0.20_0.04_35)] mb-4"
            style={{ fontFamily: "'Bodoni Moda', serif" }}
          >
            All Articles
          </h1>
          <p className="text-[oklch(0.40_0.04_35)] max-w-lg mb-8">
            {filtered.length} articles on conscious sexuality, sacred intimacy, and embodied presence.
          </p>

          {/* Search */}
          <div className="relative max-w-md mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[oklch(0.50_0.04_35)]" />
            <input
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              placeholder="Search articles..."
              className="w-full pl-11 pr-4 py-3 text-sm bg-white border border-[oklch(0.90_0.03_60)] focus:border-[oklch(0.55_0.18_25)] focus:outline-none transition-colors"
            />
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => { setActiveCat(""); setPage(1); }}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-200 ${
                !activeCat
                  ? "bg-[oklch(0.55_0.18_25)] text-white"
                  : "bg-transparent text-[oklch(0.40_0.04_35)] border border-[oklch(0.90_0.03_60)] hover:border-[oklch(0.55_0.18_25)]"
              }`}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => { setActiveCat(cat.slug); setPage(1); }}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-200 ${
                  activeCat === cat.slug
                    ? "bg-[oklch(0.55_0.18_25)] text-white"
                    : "bg-transparent text-[oklch(0.40_0.04_35)] border border-[oklch(0.90_0.03_60)] hover:border-[oklch(0.55_0.18_25)]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="ember-line" />

      {/* Grid */}
      <section className="container py-12">
        {paged.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[oklch(0.50_0.04_35)]">No articles found. Try a different search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {paged.map((art) => (
              <ArticleCard key={art.slug} article={art} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-16">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="p-2 border border-[oklch(0.90_0.03_60)] hover:border-[oklch(0.55_0.18_25)] disabled:opacity-30 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
              .map((p, idx, arr) => (
                <span key={p}>
                  {idx > 0 && arr[idx - 1] !== p - 1 && <span className="text-[oklch(0.50_0.04_35)] px-1">...</span>}
                  <button
                    onClick={() => setPage(p)}
                    className={`w-9 h-9 text-sm font-medium transition-all duration-200 ${
                      p === page
                        ? "bg-[oklch(0.55_0.18_25)] text-white"
                        : "text-[oklch(0.40_0.04_35)] hover:text-[oklch(0.55_0.18_25)]"
                    }`}
                  >
                    {p}
                  </button>
                </span>
              ))}
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="p-2 border border-[oklch(0.90_0.03_60)] hover:border-[oklch(0.55_0.18_25)] disabled:opacity-30 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

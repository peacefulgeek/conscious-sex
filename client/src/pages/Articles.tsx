/*
 * Articles: Magazine layout with category filter, search, pagination
 */
import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Search, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { filterPublished, CATEGORIES, type ArticleMeta } from "@/data";

const ARTICLES_PER_PAGE = 12;

function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <Link href={`/articles/${article.slug}`} className="group block">
      <article>
        <div className="overflow-hidden rounded aspect-[16/9] mb-4">
          <img
            src={article.heroImage}
            alt={article.title}
            width={600}
            height={338}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[oklch(0.42_0.14_350)]">
            {article.categoryName}
          </span>
          <span className="text-xs text-[oklch(0.55_0.03_40)]">·</span>
          <span className="text-xs text-[oklch(0.55_0.03_40)] flex items-center gap-1">
            <Clock className="w-3 h-3" /> {article.readingTime} min
          </span>
        </div>
        <h2
          className="text-lg font-bold text-[oklch(0.22_0.03_40)] group-hover:text-[oklch(0.42_0.14_350)] transition-colors leading-snug"
          style={{ fontFamily: "'Bodoni Moda', serif" }}
        >
          {article.title}
        </h2>
        <p className="mt-2 text-sm text-[oklch(0.45_0.04_40)] line-clamp-2">
          {article.metaDescription}
        </p>
      </article>
    </Link>
  );
}

export default function Articles() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const published = useMemo(() => filterPublished(), []);
  const articleCount = published.length;

  const filtered = useMemo(() => {
    let arts = published;
    if (activeCategory) {
      arts = arts.filter((a) => a.categorySlug === activeCategory);
    }
    if (search) {
      const q = search.toLowerCase();
      arts = arts.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.metaDescription.toLowerCase().includes(q) ||
          a.metaKeywords.toLowerCase().includes(q)
      );
    }
    return arts.sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime());
  }, [published, activeCategory, search]);

  const totalPages = Math.ceil(filtered.length / ARTICLES_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ARTICLES_PER_PAGE, page * ARTICLES_PER_PAGE);

  return (
    <div className="container py-12">
      {/* Header */}
      <div className="mb-12">
        <h1
          className="text-4xl md:text-5xl font-bold text-[oklch(0.22_0.03_40)] mb-2"
          style={{ fontFamily: "'Bodoni Moda', serif" }}
        >
          Articles
        </h1>
        <p className="text-[oklch(0.45_0.04_40)]">
          {articleCount} articles on conscious sexuality, sacred intimacy, and embodied practice.
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[oklch(0.55_0.03_40)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search articles..."
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-[oklch(0.88_0.03_75)] rounded bg-white text-[oklch(0.22_0.03_40)] placeholder:text-[oklch(0.55_0.03_40)]"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => { setActiveCategory(null); setPage(1); }}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
              !activeCategory
                ? "bg-[oklch(0.42_0.14_350)] text-white"
                : "bg-[oklch(0.93_0.02_75)] text-[oklch(0.45_0.04_40)] hover:bg-[oklch(0.88_0.03_75)]"
            }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => { setActiveCategory(cat.slug); setPage(1); }}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                activeCategory === cat.slug
                  ? "bg-[oklch(0.42_0.14_350)] text-white"
                  : "bg-[oklch(0.93_0.02_75)] text-[oklch(0.45_0.04_40)] hover:bg-[oklch(0.88_0.03_75)]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {paginated.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {paginated.map((art) => (
              <ArticleCard key={art.slug} article={art} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="p-2 rounded border border-[oklch(0.88_0.03_75)] disabled:opacity-30 hover:bg-[oklch(0.93_0.02_75)] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 7) {
                  pageNum = i + 1;
                } else if (page <= 4) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 3) {
                  pageNum = totalPages - 6 + i;
                } else {
                  pageNum = page - 3 + i;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-9 h-9 text-sm rounded transition-colors ${
                      page === pageNum
                        ? "bg-[oklch(0.42_0.14_350)] text-white"
                        : "border border-[oklch(0.88_0.03_75)] hover:bg-[oklch(0.93_0.02_75)]"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="p-2 rounded border border-[oklch(0.88_0.03_75)] disabled:opacity-30 hover:bg-[oklch(0.93_0.02_75)] transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20">
          <p className="text-[oklch(0.55_0.03_40)]">No articles found matching your search.</p>
        </div>
      )}
    </div>
  );
}

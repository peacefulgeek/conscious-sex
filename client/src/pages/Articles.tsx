/*
 * Articles listing — Render Template
 * Simple list. Title + date + reading time + category tag.
 * One per row. No cards. No images. Paginated at 20.
 */
import { useState, useEffect, useMemo } from "react";
import { Link, useSearch } from "wouter";
import { filterPublished, CATEGORIES } from "@/data";

const PER_PAGE = 20;

export default function Articles() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const catFilter = params.get("category") || "";
  const pageParam = parseInt(params.get("page") || "1", 10);

  const allArticles = useMemo(() => filterPublished(), []);

  const filtered = useMemo(() => {
    if (!catFilter) return allArticles;
    return allArticles.filter((a) => a.categorySlug === catFilter);
  }, [allArticles, catFilter]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const page = Math.max(1, Math.min(pageParam, totalPages));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  useEffect(() => {
    document.title = "Articles | Sacred Fire Intimacy";
    window.scrollTo(0, 0);
  }, [page, catFilter]);

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-8 py-16">
      <h1
        className="text-3xl md:text-4xl font-bold text-[oklch(0.18_0.04_25)] mb-4"
        style={{ fontFamily: "'Bodoni Moda', serif" }}
      >
        Articles
      </h1>
      <p className="text-[oklch(0.40_0.04_35)] mb-10">
        {filtered.length} {filtered.length === 1 ? "article" : "articles"}{catFilter ? ` in ${CATEGORIES.find(c => c.slug === catFilter)?.name || catFilter}` : ""}
      </p>

      {/* Category filter — simple text links */}
      <div className="flex flex-wrap items-center gap-4 mb-10 text-sm">
        <Link
          href="/articles"
          className={`font-medium transition-colors duration-200 ${
            !catFilter ? "text-[oklch(0.55_0.18_25)]" : "text-[oklch(0.50_0.04_35)] hover:text-[oklch(0.55_0.18_25)]"
          }`}
        >
          All
        </Link>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/articles?category=${cat.slug}`}
            className={`font-medium transition-colors duration-200 ${
              catFilter === cat.slug ? "text-[oklch(0.55_0.18_25)]" : "text-[oklch(0.50_0.04_35)] hover:text-[oklch(0.55_0.18_25)]"
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Article list — one per row */}
      <div className="space-y-0">
        {paginated.map((article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="group block py-5 border-b border-[oklch(0.90_0.03_60)] hover:border-[oklch(0.55_0.18_25)] transition-colors duration-300"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h2
                className="text-lg font-bold text-[oklch(0.20_0.04_25)] group-hover:text-[oklch(0.55_0.18_25)] transition-colors duration-300 leading-snug"
                style={{ fontFamily: "'Bodoni Moda', serif" }}
              >
                {article.title}
              </h2>
              <div className="flex items-center gap-4 flex-shrink-0 text-xs text-[oklch(0.50_0.04_35)]">
                <span className="font-medium text-[oklch(0.55_0.18_25)]">{article.categoryName}</span>
                <span>{article.readingTime} min</span>
                <span>{new Date(article.dateISO).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-12">
          {page > 1 && (
            <Link
              href={`/articles?${catFilter ? `category=${catFilter}&` : ""}page=${page - 1}`}
              className="px-4 py-2 text-sm font-medium text-[oklch(0.55_0.18_25)] hover:text-[oklch(0.35_0.12_15)] transition-colors"
            >
              Previous
            </Link>
          )}
          <span className="text-sm text-[oklch(0.50_0.04_35)]">
            Page {page} of {totalPages}
          </span>
          {page < totalPages && (
            <Link
              href={`/articles?${catFilter ? `category=${catFilter}&` : ""}page=${page + 1}`}
              className="px-4 py-2 text-sm font-medium text-[oklch(0.55_0.18_25)] hover:text-[oklch(0.35_0.12_15)] transition-colors"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

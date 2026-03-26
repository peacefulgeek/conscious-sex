/*
 * 404 — Render Template
 * Single column. Teaching quote. 6 article links as text.
 * No author references.
 */
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { getRecentArticles } from "@/data";

export default function NotFound() {
  const articles = getRecentArticles(6);

  return (
    <div className="max-w-[720px] mx-auto px-6 md:px-8 py-20">
      <p className="text-6xl font-bold text-[oklch(0.55_0.18_25)] mb-6" style={{ fontFamily: "'Bodoni Moda', serif" }}>404</p>
      <h1
        className="text-2xl md:text-3xl font-bold text-[oklch(0.18_0.04_25)] mb-4 leading-tight"
        style={{ fontFamily: "'Bodoni Moda', serif" }}
      >
        This page doesn't exist — but you do.
      </h1>

      {/* Teaching quote */}
      <blockquote className="my-10 pl-6 border-l-2 border-[oklch(0.72_0.16_60)]">
        <p className="text-lg text-[oklch(0.35_0.04_35)] italic leading-relaxed" style={{ fontFamily: "'Bodoni Moda', serif" }}>
          "The body remembers what the mind forgets. Presence is the only aphrodisiac that never wears off."
        </p>
      </blockquote>

      <p className="text-[oklch(0.40_0.04_35)] mb-10">
        The page you're looking for has moved or never existed. Here's something worth finding instead.
      </p>

      {/* 6 article links as text */}
      {articles.length > 0 && (
        <div className="space-y-0 mb-12">
          {articles.map((a) => (
            <Link
              key={a.slug}
              href={`/articles/${a.slug}`}
              className="group flex items-center justify-between py-4 border-b border-[oklch(0.90_0.03_60)] hover:border-[oklch(0.55_0.18_25)] transition-colors duration-300"
            >
              <span
                className="text-base font-medium text-[oklch(0.25_0.04_25)] group-hover:text-[oklch(0.55_0.18_25)] transition-colors duration-300"
                style={{ fontFamily: "'Bodoni Moda', serif" }}
              >
                {a.title}
              </span>
              <ArrowRight className="w-4 h-4 text-[oklch(0.55_0.18_25)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0 ml-4" />
            </Link>
          ))}
        </div>
      )}

      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-[oklch(0.55_0.18_25)] hover:text-[oklch(0.35_0.12_15)] transition-colors"
      >
        Return Home <ArrowRight className="w-3 h-3" />
      </Link>
    </div>
  );
}

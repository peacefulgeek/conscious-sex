import { Link } from "wouter";
import { Search, ArrowRight, Flame } from "lucide-react";
import { useState } from "react";
import { getRecentArticles, searchArticles } from "@/data";

const INSIGHTS = [
  "The body remembers what the mind forgets.",
  "Presence is the only aphrodisiac that never wears off.",
  "Vulnerability is not weakness — it is the birthplace of intimacy.",
  "You cannot bypass shame. You can only breathe through it.",
  "The space between two people is sacred ground.",
  "Sexual energy and creative energy are the same force.",
  "Healing doesn't happen on a timeline. It happens in the body.",
  "The opposite of numbness isn't pain — it's aliveness.",
  "Your nervous system is always listening.",
  "Desire that includes presence becomes devotion.",
];

export default function NotFound() {
  const [query, setQuery] = useState("");
  const recent = getRecentArticles(3);
  const results = query ? searchArticles(query).slice(0, 5) : [];

  return (
    <div className="container py-20 max-w-2xl mx-auto text-center">
      <Flame className="w-8 h-8 text-[oklch(0.72_0.16_60)] mx-auto mb-4" />
      <p className="text-6xl font-bold text-[oklch(0.55_0.18_25)] mb-4" style={{ fontFamily: "'Bodoni Moda', serif" }}>404</p>
      <h1 className="text-2xl font-bold text-[oklch(0.20_0.04_35)] mb-4" style={{ fontFamily: "'Bodoni Moda', serif" }}>
        This page doesn't exist — but you do.
      </h1>
      <p className="text-[oklch(0.40_0.04_35)] mb-8">The page you're looking for has moved or never existed. Here's something worth finding instead.</p>

      <div className="relative max-w-md mx-auto mb-10">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[oklch(0.50_0.04_35)]" />
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search articles..."
          className="w-full pl-11 pr-4 py-3 text-sm bg-white border border-[oklch(0.90_0.03_60)] focus:border-[oklch(0.55_0.18_25)] focus:outline-none" />
        {results.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[oklch(0.90_0.03_60)] shadow-lg z-10">
            {results.map(a => (
              <Link key={a.slug} href={`/articles/${a.slug}`} className="block px-4 py-2.5 text-sm text-left hover:bg-[oklch(0.94_0.02_60)] text-[oklch(0.30_0.04_35)]">{a.title}</Link>
            ))}
          </div>
        )}
      </div>

      <div className="mb-12 text-left">
        <h2 className="text-lg font-bold text-[oklch(0.20_0.04_35)] mb-5" style={{ fontFamily: "'Bodoni Moda', serif" }}>10 Things Worth Knowing</h2>
        <div className="space-y-3">
          {INSIGHTS.map((insight, i) => (
            <p key={i} className="text-sm text-[oklch(0.40_0.04_35)] pl-5 border-l-2 border-[oklch(0.72_0.16_60)]">{insight}</p>
          ))}
        </div>
      </div>

      {recent.length > 0 && (
        <div className="text-left mb-10">
          <h2 className="text-lg font-bold text-[oklch(0.20_0.04_35)] mb-5" style={{ fontFamily: "'Bodoni Moda', serif" }}>Recent Articles</h2>
          <div className="space-y-4">
            {recent.map(a => (
              <Link key={a.slug} href={`/articles/${a.slug}`} className="group flex gap-4 py-3 border-b border-[oklch(0.90_0.03_60)] hover:border-[oklch(0.55_0.18_25)] transition-colors">
                <img src={a.heroImage} alt={a.title} width={80} height={45} loading="lazy" className="w-20 h-12 object-cover flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-[oklch(0.30_0.04_35)] group-hover:text-[oklch(0.55_0.18_25)] transition-colors">{a.title}</h3>
                  <span className="text-[10px] text-[oklch(0.50_0.04_35)]">{a.categoryName}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[oklch(0.55_0.18_25)] hover:text-[oklch(0.35_0.12_15)] transition-colors">
        Return Home <ArrowRight className="w-3 h-3" />
      </Link>
    </div>
  );
}

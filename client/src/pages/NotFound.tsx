import { Link } from "wouter";
import { Search, ArrowRight } from "lucide-react";
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
      <p className="text-6xl font-bold text-[oklch(0.42_0.14_350)] mb-4" style={{ fontFamily: "'Bodoni Moda', serif" }}>404</p>
      <h1 className="text-2xl font-bold text-[oklch(0.22_0.03_40)] mb-4" style={{ fontFamily: "'Bodoni Moda', serif" }}>
        This page doesn't exist — but you do.
      </h1>
      <p className="text-[oklch(0.45_0.04_40)] mb-8">The page you're looking for has moved or never existed. Here's something worth finding instead.</p>

      {/* Search */}
      <div className="relative max-w-md mx-auto mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[oklch(0.55_0.03_40)]" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles..."
          className="w-full pl-10 pr-4 py-2.5 text-sm border border-[oklch(0.88_0.03_75)] rounded bg-white"
        />
        {results.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[oklch(0.88_0.03_75)] rounded shadow-lg z-10">
            {results.map(a => (
              <Link key={a.slug} href={`/articles/${a.slug}`} className="block px-4 py-2 text-sm text-left hover:bg-[oklch(0.93_0.02_75)] text-[oklch(0.35_0.05_40)]">
                {a.title}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Insights */}
      <div className="mb-12 text-left">
        <h2 className="text-lg font-bold text-[oklch(0.22_0.03_40)] mb-4" style={{ fontFamily: "'Bodoni Moda', serif" }}>10 Things Worth Knowing</h2>
        <div className="space-y-2">
          {INSIGHTS.map((insight, i) => (
            <p key={i} className="text-sm text-[oklch(0.45_0.04_40)] pl-4 border-l-2 border-[oklch(0.73_0.14_85)]">{insight}</p>
          ))}
        </div>
      </div>

      {/* Article cards */}
      {recent.length > 0 && (
        <div className="text-left mb-8">
          <h2 className="text-lg font-bold text-[oklch(0.22_0.03_40)] mb-4" style={{ fontFamily: "'Bodoni Moda', serif" }}>Recent Articles</h2>
          <div className="space-y-3">
            {recent.map(a => (
              <Link key={a.slug} href={`/articles/${a.slug}`} className="group flex gap-3 p-3 rounded border border-[oklch(0.88_0.03_75)] hover:border-[oklch(0.42_0.14_350)] transition-colors">
                <img src={a.heroImage} alt={a.title} width={80} height={45} loading="lazy" className="w-20 h-12 object-cover rounded flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-[oklch(0.35_0.05_40)] group-hover:text-[oklch(0.42_0.14_350)] transition-colors">{a.title}</h3>
                  <span className="text-xs text-[oklch(0.55_0.03_40)]">{a.categoryName}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-[oklch(0.42_0.14_350)] hover:text-[oklch(0.73_0.14_85)] transition-colors">
        Return Home <ArrowRight className="w-3 h-3" />
      </Link>
    </div>
  );
}

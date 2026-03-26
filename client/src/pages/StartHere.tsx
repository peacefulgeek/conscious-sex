import { Link } from "wouter";
import { ArrowRight, Clock } from "lucide-react";
import { filterPublished, CATEGORIES, SITE_CONFIG, type ArticleMeta } from "@/data";

export default function StartHere() {
  const published = filterPublished();
  // Pick one pillar article per category (first published in each)
  const pillars: ArticleMeta[] = CATEGORIES.map(cat => {
    return published.find(a => a.categorySlug === cat.slug);
  }).filter(Boolean) as ArticleMeta[];
  // Add one more if we have extra
  const extra = published.find(a => !pillars.find(p => p.slug === a.slug));
  if (extra) pillars.push(extra);

  return (
    <div className="container py-12">
      <div className="max-w-3xl mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[oklch(0.22_0.03_40)] mb-6" style={{ fontFamily: "'Bodoni Moda', serif" }}>
          Start Here
        </h1>
        <p className="text-lg text-[oklch(0.45_0.04_40)] leading-relaxed mb-4">
          Welcome to Sacred Fire Intimacy. If you're new here, this is your map.
        </p>
        <p className="text-lg text-[oklch(0.45_0.04_40)] leading-relaxed mb-4">
          This site explores conscious sexuality through the lens of Advaita Vedanta, classical Tantra, and somatic embodiment. We don't do tips and tricks. We don't do "5 ways to spice up your love life." We do the real work — the kind that changes how you inhabit your body, how you meet another person in theirs, and what happens in the space between.
        </p>
        <p className="text-lg text-[oklch(0.45_0.04_40)] leading-relaxed">
          The articles below are foundational. Read them in order, or follow your body's intelligence to the one that calls you first.
        </p>
      </div>

      <div className="gold-divider mb-12" />

      {/* Pillar articles */}
      <div className="space-y-8">
        {pillars.map((article, i) => (
          <Link key={article.slug} href={`/articles/${article.slug}`} className="group block">
            <article className="grid md:grid-cols-[200px_1fr] gap-6 items-start p-6 rounded border border-[oklch(0.88_0.03_75)] hover:border-[oklch(0.42_0.14_350)] transition-colors">
              <img src={article.heroImage} alt={article.title} width={200} height={113} loading="lazy" className="w-full aspect-[16/9] object-cover rounded" />
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[oklch(0.42_0.14_350)]">{article.categoryName}</span>
                  <span className="text-xs text-[oklch(0.55_0.03_40)] flex items-center gap-1"><Clock className="w-3 h-3" /> {article.readingTime} min</span>
                </div>
                <h2 className="text-xl font-bold text-[oklch(0.22_0.03_40)] group-hover:text-[oklch(0.42_0.14_350)] transition-colors leading-snug" style={{ fontFamily: "'Bodoni Moda', serif" }}>
                  {i + 1}. {article.title}
                </h2>
                <p className="mt-2 text-sm text-[oklch(0.45_0.04_40)] line-clamp-2">{article.metaDescription}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[oklch(0.42_0.14_350)]">Read Article <ArrowRight className="w-3 h-3" /></span>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* Categories overview */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-[oklch(0.22_0.03_40)] mb-6" style={{ fontFamily: "'Bodoni Moda', serif" }}>Explore by Theme</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map(cat => (
            <Link key={cat.slug} href={`/category/${cat.slug}`} className="group p-5 rounded bg-[oklch(0.95_0.01_85)] hover:bg-[oklch(0.93_0.02_75)] transition-colors">
              <h3 className="font-bold text-[oklch(0.22_0.03_40)] group-hover:text-[oklch(0.42_0.14_350)] transition-colors mb-2" style={{ fontFamily: "'Bodoni Moda', serif" }}>{cat.name}</h3>
              <p className="text-sm text-[oklch(0.55_0.03_40)]">{cat.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

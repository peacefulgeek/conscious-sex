/*
 * ArticlePage: Warm, immersive article reading experience
 * Full-bleed hero, elegant typography, sidebar, FAQ, share
 */
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "wouter";
import { Clock, Copy, Check, ChevronDown, ChevronUp, ArrowRight, Flame } from "lucide-react";
import { getArticleMetaBySlug, getRelatedArticles, getArticlesByCategory, filterPublished, loadArticleContent, SITE_CONFIG, type ArticleMeta } from "@/data";
import EmailCapture from "@/components/EmailCapture";

function JsonLd({ article, faqHtml }: { article: ArticleMeta; faqHtml: string }) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    image: article.heroImage,
    datePublished: article.dateISO,
    dateModified: article.dateISO,
    author: { "@type": "Person", name: "Krishna" },
    publisher: {
      "@type": "Organization",
      name: "Sacred Fire Intimacy",
      logo: { "@type": "ImageObject", url: "https://conscious-sexuality.b-cdn.net/logo.webp" },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://consciousex.love/articles/${article.slug}`,
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".article-body h2", ".article-body p:first-of-type"],
    },
    keywords: article.metaKeywords,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://consciousex.love/" },
      { "@type": "ListItem", position: 2, name: article.categoryName, item: `https://consciousex.love/category/${article.categorySlug}` },
      { "@type": "ListItem", position: 3, name: article.title },
    ],
  };

  const schemas: object[] = [articleSchema, breadcrumb];

  if (article.faqCount > 0 && faqHtml) {
    const faqRegex = new RegExp('<h3[^>]*>(.*?)</h3>\\s*<p>(.*?)</p>', 'gi');
    const faqs: { questionName: string; acceptedAnswer: string }[] = [];
    let match;
    while ((match = faqRegex.exec(faqHtml)) !== null) {
      faqs.push({ questionName: match[1].replace(/<[^>]+>/g, ''), acceptedAnswer: match[2].replace(/<[^>]+>/g, '') });
    }
    if (faqs.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.questionName,
          acceptedAnswer: { "@type": "Answer", text: f.acceptedAnswer },
        })),
      });
    }
  }

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
    </>
  );
}

function TableOfContents({ html }: { html: string }) {
  const [open, setOpen] = useState(true);
  const headings = useMemo(() => {
    const regex = /<h2[^>]*id="([^"]*)"[^>]*>(.*?)<\/h2>/gi;
    const items: { id: string; text: string }[] = [];
    let match;
    while ((match = regex.exec(html)) !== null) {
      items.push({ id: match[1], text: match[2].replace(/<[^>]+>/g, '') });
    }
    if (items.length === 0) {
      const h2Regex = /<h2[^>]*>(.*?)<\/h2>/gi;
      while ((match = h2Regex.exec(html)) !== null) {
        const text = match[1].replace(/<[^>]+>/g, '');
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        items.push({ id, text });
      }
    }
    return items;
  }, [html]);

  if (headings.length === 0) return null;

  return (
    <nav className="mb-10 border-l-2 border-[oklch(0.72_0.16_60)] pl-6 py-2">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-xs font-semibold uppercase tracking-[0.2em] text-[oklch(0.40_0.04_35)] mb-3"
      >
        In This Article
        {open ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
      </button>
      {open && (
        <ol className="space-y-2">
          {headings.map((h, i) => (
            <li key={i}>
              <a
                href={`#${h.id}`}
                className="text-sm text-[oklch(0.40_0.04_35)] hover:text-[oklch(0.55_0.18_25)] transition-colors duration-200 leading-snug block"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  );
}

function ShareButtons({ article }: { article: ArticleMeta }) {
  const [copied, setCopied] = useState(false);
  const url = `https://consciousex.love/articles/${article.slug}`;

  return (
    <div className="flex items-center gap-3 py-8 border-t border-b border-[oklch(0.90_0.03_60)]">
      <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[oklch(0.50_0.04_35)]">Share</span>
      <button
        onClick={() => {
          navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-[oklch(0.90_0.03_60)] hover:border-[oklch(0.55_0.18_25)] hover:text-[oklch(0.55_0.18_25)] transition-all duration-200"
        aria-label="Copy link"
      >
        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
        {copied ? "Copied" : "Link"}
      </button>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(article.title)}`}
        target="_blank"
        rel="nofollow noopener"
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-[oklch(0.90_0.03_60)] hover:border-[oklch(0.55_0.18_25)] hover:text-[oklch(0.55_0.18_25)] transition-all duration-200"
      >
        𝕏
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="nofollow noopener"
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-[oklch(0.90_0.03_60)] hover:border-[oklch(0.55_0.18_25)] hover:text-[oklch(0.55_0.18_25)] transition-all duration-200"
      >
        Facebook
      </a>
    </div>
  );
}

function Sidebar({ article }: { article: ArticleMeta }) {
  const sameCat = getArticlesByCategory(article.categorySlug).filter((a) => a.slug !== article.slug).slice(0, 4);
  const popular = filterPublished()
    .filter((a) => a.slug !== article.slug && !sameCat.find((s) => s.slug === a.slug))
    .slice(0, 5);

  return (
    <aside className="space-y-10">
      {/* Krishna Bio */}
      <div className="border-l-2 border-[oklch(0.72_0.16_60)] pl-6 sticky top-24">
        <div className="mb-4">
          <Flame className="w-6 h-6 text-[oklch(0.55_0.18_25)] mb-3" />
          <h3 className="font-bold text-[oklch(0.20_0.04_35)] text-lg" style={{ fontFamily: "'Bodoni Moda', serif" }}>
            Krishna
          </h3>
          <p className="text-xs text-[oklch(0.50_0.04_35)] mt-0.5">Mystic &amp; Spiritual Advisor</p>
        </div>
        <p className="text-sm text-[oklch(0.40_0.04_35)] leading-relaxed mb-5">
          {SITE_CONFIG.authorBio}
        </p>
        <a
          href="https://shrikrishna.com"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[oklch(0.55_0.18_25)] hover:text-[oklch(0.35_0.12_15)] transition-colors duration-200"
        >
          Visit Krishna <ArrowRight className="w-3 h-3" />
        </a>
      </div>

      {/* Same Category */}
      {sameCat.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[oklch(0.50_0.04_35)] mb-5">
            More in {article.categoryName}
          </h4>
          <div className="space-y-5">
            {sameCat.map((a) => (
              <Link key={a.slug} href={`/articles/${a.slug}`} className="group flex gap-4">
                <img src={a.heroImage} alt={a.title} width={80} height={50} loading="lazy" className="w-20 h-14 object-cover flex-shrink-0" />
                <h5 className="text-sm font-medium text-[oklch(0.30_0.04_35)] group-hover:text-[oklch(0.55_0.18_25)] transition-colors duration-200 leading-snug line-clamp-2" style={{ fontFamily: "'Bodoni Moda', serif" }}>
                  {a.title}
                </h5>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Popular */}
      {popular.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[oklch(0.50_0.04_35)] mb-5">
            Popular
          </h4>
          <div className="space-y-5">
            {popular.map((a) => (
              <Link key={a.slug} href={`/articles/${a.slug}`} className="group flex gap-4">
                <img src={a.heroImage} alt={a.title} width={80} height={50} loading="lazy" className="w-20 h-14 object-cover flex-shrink-0" />
                <h5 className="text-sm font-medium text-[oklch(0.30_0.04_35)] group-hover:text-[oklch(0.55_0.18_25)] transition-colors duration-200 leading-snug line-clamp-2" style={{ fontFamily: "'Bodoni Moda', serif" }}>
                  {a.title}
                </h5>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Email Capture */}
      <div className="border-l-2 border-[oklch(0.72_0.16_60)] pl-6">
        <h4 className="text-sm font-bold text-[oklch(0.20_0.04_35)] mb-2" style={{ fontFamily: "'Bodoni Moda', serif" }}>
          Stay in the Fire
        </h4>
        <p className="text-xs text-[oklch(0.50_0.04_35)] mb-4">Join the community. No spam.</p>
        <EmailCapture source={`article-${article.slug}`} />
      </div>
    </aside>
  );
}

function addIdsToH2s(html: string): string {
  return html.replace(/<h2([^>]*)>(.*?)<\/h2>/gi, (match, attrs, content) => {
    if (attrs.includes('id=')) return match;
    const text = content.replace(/<[^>]+>/g, '');
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return `<h2${attrs} id="${id}">${content}</h2>`;
  });
}

export default function ArticlePage() {
  const params = useParams<{ slug: string }>();
  const article = getArticleMetaBySlug(params.slug || "");
  const related = article ? getRelatedArticles(article, 6) : [];
  const [contentHtml, setContentHtml] = useState("");
  const [faqHtml, setFaqHtml] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (article) {
      setLoading(true);
      loadArticleContent(article.slug).then((data) => {
        if (data) {
          setContentHtml(data.contentHtml);
          setFaqHtml(data.faqHtml);
        }
        setLoading(false);
      });
    }
  }, [params.slug, article?.slug]);

  useEffect(() => {
    if (article) {
      document.title = `${article.title} | Sacred Fire Intimacy`;
      const setMeta = (property: string, content: string) => {
        let el = document.querySelector(`meta[property="${property}"]`) || document.querySelector(`meta[name="${property}"]`);
        if (!el) {
          el = document.createElement("meta");
          el.setAttribute(property.startsWith("og:") || property.startsWith("article:") ? "property" : "name", property);
          document.head.appendChild(el);
        }
        el.setAttribute("content", content);
      };
      setMeta("description", article.metaDescription);
      setMeta("keywords", article.metaKeywords);
      setMeta("og:title", article.title);
      setMeta("og:description", article.ogDescription || article.metaDescription);
      setMeta("og:image", article.ogImage);
      setMeta("og:url", `https://consciousex.love/articles/${article.slug}`);
      setMeta("og:type", "article");
      setMeta("twitter:card", "summary_large_image");
      setMeta("twitter:title", article.title);
      setMeta("twitter:description", article.ogDescription || article.metaDescription);
      setMeta("twitter:image", article.ogImage);
      setMeta("article:published_time", article.dateISO);
      setMeta("article:section", article.categoryName);
    }
  }, [article]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.slug]);

  if (!article) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Bodoni Moda', serif" }}>Article Not Found</h1>
        <Link href="/articles" className="text-[oklch(0.55_0.18_25)] underline">Browse all articles</Link>
      </div>
    );
  }

  const processedHtml = addIdsToH2s(contentHtml);

  return (
    <>
      <JsonLd article={article} faqHtml={faqHtml} />

      {/* Hero Image — full bleed */}
      <div className="relative w-full h-[45vh] md:h-[55vh] overflow-hidden">
        <img
          src={article.heroImage}
          alt={article.title}
          width={1200}
          height={675}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.97_0.015_80)] via-transparent to-transparent" />
      </div>

      <div className="container -mt-16 relative z-10 pb-12">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Main content */}
          <div className="lg:w-[68%]">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-[oklch(0.50_0.04_35)] mb-5">
              <Link href="/" className="hover:text-[oklch(0.55_0.18_25)] transition-colors">Home</Link>
              <span className="text-[oklch(0.72_0.16_60)]">/</span>
              <Link href={`/category/${article.categorySlug}`} className="hover:text-[oklch(0.55_0.18_25)] transition-colors">
                {article.categoryName}
              </Link>
            </nav>

            {/* Title */}
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[oklch(0.20_0.04_35)] leading-[1.1] mb-6"
              style={{ fontFamily: "'Bodoni Moda', serif" }}
            >
              {article.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-5 mb-8 text-xs text-[oklch(0.50_0.04_35)]">
              <Link
                href={`/category/${article.categorySlug}`}
                className="font-semibold uppercase tracking-[0.2em] text-[oklch(0.55_0.18_25)] hover:text-[oklch(0.35_0.12_15)] transition-colors"
              >
                {article.categoryName}
              </Link>
              <span>{article.dateHuman}</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {article.readingTime} min
              </span>
            </div>

            <div className="ember-line mb-10" />

            {loading ? (
              <div className="py-20 text-center">
                <Flame className="w-8 h-8 text-[oklch(0.55_0.18_25)] mx-auto animate-pulse" />
                <p className="mt-4 text-sm text-[oklch(0.50_0.04_35)]">Loading...</p>
              </div>
            ) : (
              <>
                <TableOfContents html={processedHtml} />
                <div
                  className="article-body"
                  dangerouslySetInnerHTML={{ __html: processedHtml }}
                />

                {faqHtml && article.faqCount > 0 && (
                  <div className="mt-16 pt-10 border-t border-[oklch(0.90_0.03_60)]">
                    <h2
                      className="text-2xl font-bold text-[oklch(0.35_0.12_15)] mb-8"
                      style={{ fontFamily: "'Bodoni Moda', serif" }}
                    >
                      Frequently Asked Questions
                    </h2>
                    <div
                      className="article-body"
                      dangerouslySetInnerHTML={{ __html: faqHtml }}
                    />
                  </div>
                )}
              </>
            )}

            <div className="mt-10">
              <ShareButtons article={article} />
            </div>

            {/* Disclaimer */}
            <div className="mt-8 py-4 px-6 border-l-2 border-[oklch(0.72_0.16_60)] text-xs text-[oklch(0.50_0.04_35)] italic leading-relaxed">
              {SITE_CONFIG.disclaimer}
            </div>

            {/* Keep Reading */}
            {related.length > 0 && (
              <section className="mt-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-8 h-[2px] bg-[oklch(0.72_0.16_60)]" />
                  <h2
                    className="text-2xl font-bold text-[oklch(0.20_0.04_35)]"
                    style={{ fontFamily: "'Bodoni Moda', serif" }}
                  >
                    Keep Reading
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {related.map((a) => (
                    <Link key={a.slug} href={`/articles/${a.slug}`} className="group block warm-card">
                      <img src={a.heroImage} alt={a.title} width={400} height={225} loading="lazy" className="w-full aspect-[16/9] object-cover mb-3 group-hover:scale-[1.03] transition-transform duration-500" />
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[oklch(0.55_0.18_25)]">{a.categoryName}</span>
                      <h3 className="text-sm font-bold text-[oklch(0.20_0.04_35)] group-hover:text-[oklch(0.55_0.18_25)] transition-colors duration-300 mt-1 leading-snug" style={{ fontFamily: "'Bodoni Moda', serif" }}>
                        {a.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-[32%]">
            <Sidebar article={article} />
          </div>
        </div>
      </div>
    </>
  );
}

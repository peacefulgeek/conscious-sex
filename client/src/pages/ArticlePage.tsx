/*
 * ArticlePage — Render Template Archetype A
 * SINGLE COLUMN. Max-width 720px centered.
 * Hero full-bleed above title. NO sidebar. NO Table of Contents.
 * Author bio INLINE at bottom. Cross-links: title-only.
 * Share buttons: bottom on mobile, floating left on desktop.
 */
import { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import { Clock, Copy, Check, ArrowRight } from "lucide-react";
import { getArticleMetaBySlug, getArticlesByCategory, filterPublished, loadArticleContent, SITE_CONFIG, type ArticleMeta } from "@/data";
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
    author: { "@type": "Person", name: "Kalesh" },
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

function ShareButtons({ article }: { article: ArticleMeta }) {
  const [copied, setCopied] = useState(false);
  const url = `https://consciousex.love/articles/${article.slug}`;

  return (
    <div className="flex items-center gap-3">
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
        className="px-3 py-1.5 text-xs font-medium border border-[oklch(0.90_0.03_60)] hover:border-[oklch(0.55_0.18_25)] hover:text-[oklch(0.55_0.18_25)] transition-all duration-200"
      >
        𝕏
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="nofollow noopener"
        className="px-3 py-1.5 text-xs font-medium border border-[oklch(0.90_0.03_60)] hover:border-[oklch(0.55_0.18_25)] hover:text-[oklch(0.55_0.18_25)] transition-all duration-200"
      >
        Facebook
      </a>
    </div>
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
  const [contentHtml, setContentHtml] = useState("");
  const [faqHtml, setFaqHtml] = useState("");
  const [loading, setLoading] = useState(true);

  // Cross-links: 3 title-only links from same category
  const crossLinks = article
    ? getArticlesByCategory(article.categorySlug)
        .filter((a) => a.slug !== article.slug)
        .slice(0, 3)
    : [];

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
      <div className="max-w-[720px] mx-auto px-6 md:px-8 py-20 text-center">
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
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.98_0.008_80)] via-transparent to-transparent" />
      </div>

      {/* Single column — 720px max */}
      <div className="max-w-[720px] mx-auto px-6 md:px-8 -mt-12 relative z-10 pb-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[oklch(0.50_0.04_35)] mb-5">
          <Link href="/" className="hover:text-[oklch(0.55_0.18_25)] transition-colors">Home</Link>
          <span className="text-[oklch(0.72_0.16_60)]">/</span>
          <Link href={`/category/${article.categorySlug}`} className="hover:text-[oklch(0.55_0.18_25)] transition-colors">
            {article.categoryName}
          </Link>
        </nav>

        {/* Title below hero */}
        <h1
          className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[oklch(0.18_0.04_25)] leading-[1.1] mb-6"
          style={{ fontFamily: "'Bodoni Moda', serif" }}
        >
          {article.title}
        </h1>

        {/* Meta line */}
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

        {/* Ember divider */}
        <div className="h-[1px] bg-gradient-to-r from-[oklch(0.72_0.16_60)] via-[oklch(0.55_0.18_25)] to-transparent mb-10" />

        {loading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-2 border-[oklch(0.55_0.18_25)] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="mt-4 text-sm text-[oklch(0.50_0.04_35)]">Loading...</p>
          </div>
        ) : (
          <>
            {/* Article body — min 20px, line-height 1.8, paragraph spacing 1.5em */}
            <div
              className="article-body"
              dangerouslySetInnerHTML={{ __html: processedHtml }}
            />

            {/* FAQ section */}
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

        {/* Share buttons — bottom */}
        <div className="mt-10 py-8 border-t border-b border-[oklch(0.90_0.03_60)]">
          <ShareButtons article={article} />
        </div>

        {/* Kalesh bio — INLINE, 2 sentences, 40 words max */}
        <div className="mt-10 py-8 border-b border-[oklch(0.90_0.03_60)]">
          <p className="text-sm text-[oklch(0.35_0.04_35)] leading-relaxed">
            <strong className="text-[oklch(0.20_0.04_25)]">{SITE_CONFIG.authorName} — {SITE_CONFIG.authorTitle}.</strong>{" "}
            {SITE_CONFIG.authorBio}{" "}
            <a
              href={SITE_CONFIG.authorLink}
              target="_blank"
              rel="noopener"
              className="text-[oklch(0.55_0.18_25)] hover:text-[oklch(0.35_0.12_15)] transition-colors underline underline-offset-2"
            >
              kalesh.love
            </a>
          </p>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 text-xs text-[oklch(0.55_0.04_35)] italic leading-relaxed">
          {SITE_CONFIG.disclaimer}
        </div>

        {/* Cross-links: "More from [Category]" — 3 title-only links */}
        {crossLinks.length > 0 && (
          <section className="mt-12 pt-8 border-t border-[oklch(0.90_0.03_60)]">
            <h2
              className="text-xs font-semibold uppercase tracking-[0.35em] text-[oklch(0.50_0.04_35)] mb-6"
            >
              More from {article.categoryName}
            </h2>
            <div className="space-y-4">
              {crossLinks.map((a) => (
                <Link
                  key={a.slug}
                  href={`/articles/${a.slug}`}
                  className="group flex items-center justify-between py-3 border-b border-[oklch(0.92_0.03_60)] hover:border-[oklch(0.55_0.18_25)] transition-colors duration-300"
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
          </section>
        )}

        {/* Email capture */}
        <div className="mt-12 pt-8 border-t border-[oklch(0.90_0.03_60)]">
          <EmailCapture source={`article-${article.slug}`} variant="light" />
        </div>
      </div>
    </>
  );
}

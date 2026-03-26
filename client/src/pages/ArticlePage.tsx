/*
 * ArticlePage: Two-column layout (70/30)
 * Hero, TOC, body, FAQ, share, Keep Reading, sidebar with Krishna bio
 */
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "wouter";
import { Clock, Copy, Check, ChevronDown, ChevronUp } from "lucide-react";
import { getArticleMetaBySlug, getRelatedArticles, getArticlesByCategory, filterPublished, loadArticleContent, SITE_CONFIG, CATEGORIES, type ArticleMeta } from "@/data";
import NewsletterForm from "@/components/NewsletterForm";

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
    <nav className="mb-8 bg-[oklch(0.95_0.01_85)] rounded p-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-sm font-semibold text-[oklch(0.35_0.05_40)] uppercase tracking-wider"
      >
        Table of Contents
        {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {open && (
        <ol className="mt-3 space-y-1.5">
          {headings.map((h, i) => (
            <li key={i}>
              <a
                href={`#${h.id}`}
                className="text-sm text-[oklch(0.45_0.04_40)] hover:text-[oklch(0.42_0.14_350)] transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {i + 1}. {h.text}
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
    <div className="flex items-center gap-3 py-6 border-t border-b border-[oklch(0.88_0.03_75)]">
      <span className="text-sm font-medium text-[oklch(0.55_0.03_40)]">Share:</span>
      <button
        onClick={() => {
          navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded border border-[oklch(0.88_0.03_75)] hover:bg-[oklch(0.93_0.02_75)] transition-colors"
        aria-label="Copy link"
      >
        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
        {copied ? "Copied" : "Copy Link"}
      </button>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(article.title)}`}
        target="_blank"
        rel="nofollow noopener"
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded border border-[oklch(0.88_0.03_75)] hover:bg-[oklch(0.93_0.02_75)] transition-colors"
        aria-label="Share on Twitter/X"
      >
        𝕏 Share
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="nofollow noopener"
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded border border-[oklch(0.88_0.03_75)] hover:bg-[oklch(0.93_0.02_75)] transition-colors"
        aria-label="Share on Facebook"
      >
        f Share
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
    <aside className="space-y-8">
      {/* Krishna Bio */}
      <div className="bg-[oklch(0.95_0.01_85)] rounded p-5 sticky top-24">
        <div className="text-center mb-4">
          <div className="w-16 h-16 rounded-full bg-[oklch(0.42_0.14_350)] mx-auto mb-3 flex items-center justify-center">
            <span className="text-white text-2xl font-bold" style={{ fontFamily: "'Bodoni Moda', serif" }}>K</span>
          </div>
          <h3 className="font-bold text-[oklch(0.22_0.03_40)]" style={{ fontFamily: "'Bodoni Moda', serif" }}>
            Krishna
          </h3>
          <p className="text-xs text-[oklch(0.55_0.03_40)]">Mystic &amp; Spiritual Advisor</p>
        </div>
        <p className="text-sm text-[oklch(0.45_0.04_40)] leading-relaxed mb-4">
          {SITE_CONFIG.authorBio}
        </p>
        <a
          href="https://shrikrishna.com"
          className="block w-full text-center px-4 py-2 bg-[oklch(0.42_0.14_350)] text-white text-sm font-medium rounded hover:bg-[oklch(0.35_0.12_350)] transition-colors"
        >
          Visit Krishna's Website
        </a>
      </div>

      {/* Same Category */}
      {sameCat.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-[oklch(0.55_0.03_40)] mb-4">
            More in {article.categoryName}
          </h4>
          <div className="space-y-4">
            {sameCat.map((a) => (
              <Link key={a.slug} href={`/articles/${a.slug}`} className="group flex gap-3">
                <img src={a.heroImage} alt={a.title} width={80} height={45} loading="lazy" className="w-20 h-12 object-cover rounded flex-shrink-0" />
                <h5 className="text-sm font-medium text-[oklch(0.35_0.05_40)] group-hover:text-[oklch(0.42_0.14_350)] transition-colors leading-snug line-clamp-2" style={{ fontFamily: "'Bodoni Moda', serif" }}>
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
          <h4 className="text-sm font-semibold uppercase tracking-wider text-[oklch(0.55_0.03_40)] mb-4">
            Popular Articles
          </h4>
          <div className="space-y-4">
            {popular.map((a) => (
              <Link key={a.slug} href={`/articles/${a.slug}`} className="group flex gap-3">
                <img src={a.heroImage} alt={a.title} width={80} height={45} loading="lazy" className="w-20 h-12 object-cover rounded flex-shrink-0" />
                <h5 className="text-sm font-medium text-[oklch(0.35_0.05_40)] group-hover:text-[oklch(0.42_0.14_350)] transition-colors leading-snug line-clamp-2" style={{ fontFamily: "'Bodoni Moda', serif" }}>
                  {a.title}
                </h5>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Newsletter */}
      <div className="bg-[oklch(0.95_0.01_85)] rounded p-5">
        <h4 className="text-sm font-semibold text-[oklch(0.22_0.03_40)] mb-2" style={{ fontFamily: "'Bodoni Moda', serif" }}>
          Stay Connected
        </h4>
        <p className="text-xs text-[oklch(0.55_0.03_40)] mb-3">Join our community of conscious lovers.</p>
        <NewsletterForm source={`article-${article.slug}`} />
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
    window.scrollTo(0, 0);
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

  // Update document head for OG tags
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

  if (!article) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Bodoni Moda', serif" }}>Article Not Found</h1>
        <Link href="/articles" className="text-[oklch(0.42_0.14_350)] underline">Browse all articles</Link>
      </div>
    );
  }

  const processedHtml = addIdsToH2s(contentHtml);

  return (
    <>
      <JsonLd article={article} faqHtml={faqHtml} />

      {/* Hero */}
      <div className="w-full">
        <img
          src={article.heroImage}
          alt={article.title}
          width={1200}
          height={675}
          className="w-full h-[40vh] md:h-[50vh] object-cover"
        />
      </div>

      <div className="container py-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main content (70%) */}
          <div className="lg:w-[70%]">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-[oklch(0.55_0.03_40)] mb-4">
              <Link href="/" className="hover:text-[oklch(0.42_0.14_350)]">Home</Link>
              <span>/</span>
              <Link href={`/category/${article.categorySlug}`} className="hover:text-[oklch(0.42_0.14_350)]">
                {article.categoryName}
              </Link>
              <span>/</span>
              <span className="text-[oklch(0.35_0.05_40)] truncate">{article.title}</span>
            </nav>

            {/* Title */}
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[oklch(0.22_0.03_40)] leading-tight mb-4"
              style={{ fontFamily: "'Bodoni Moda', serif" }}
            >
              {article.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Link
                href={`/category/${article.categorySlug}`}
                className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-[oklch(0.42_0.14_350)] text-white rounded"
              >
                {article.categoryName}
              </Link>
              <span className="text-sm text-[oklch(0.55_0.03_40)]">{article.dateHuman}</span>
              <span className="text-sm text-[oklch(0.55_0.03_40)] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {article.readingTime} min read
              </span>
            </div>

            <div className="gold-divider mb-8" />

            {loading ? (
              <div className="py-20 text-center">
                <div className="inline-block w-8 h-8 border-2 border-[oklch(0.42_0.14_350)] border-t-transparent rounded-full animate-spin" />
                <p className="mt-4 text-sm text-[oklch(0.55_0.03_40)]">Loading article...</p>
              </div>
            ) : (
              <>
                {/* Table of Contents */}
                <TableOfContents html={processedHtml} />

                {/* Article Body */}
                <div
                  className="article-body"
                  dangerouslySetInnerHTML={{ __html: processedHtml }}
                />

                {/* FAQ Section */}
                {faqHtml && article.faqCount > 0 && (
                  <div className="mt-12 pt-8 border-t border-[oklch(0.88_0.03_75)]">
                    <h2
                      className="text-2xl font-bold text-[oklch(0.42_0.14_350)] mb-6"
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

            {/* Share */}
            <div className="mt-8">
              <ShareButtons article={article} />
            </div>

            {/* Disclaimer */}
            <div className="mt-6 p-4 bg-[oklch(0.95_0.01_85)] rounded text-xs text-[oklch(0.55_0.03_40)] italic">
              {SITE_CONFIG.disclaimer}
            </div>

            {/* Keep Reading */}
            {related.length > 0 && (
              <section className="mt-12">
                <h2
                  className="text-2xl font-bold text-[oklch(0.22_0.03_40)] mb-6"
                  style={{ fontFamily: "'Bodoni Moda', serif" }}
                >
                  Keep Reading
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {related.map((a) => (
                    <Link key={a.slug} href={`/articles/${a.slug}`} className="group block">
                      <img src={a.heroImage} alt={a.title} width={400} height={225} loading="lazy" className="w-full aspect-[16/9] object-cover rounded mb-3 group-hover:scale-[1.02] transition-transform" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-[oklch(0.42_0.14_350)]">{a.categoryName}</span>
                      <h3 className="text-sm font-bold text-[oklch(0.22_0.03_40)] group-hover:text-[oklch(0.42_0.14_350)] transition-colors mt-1 leading-snug" style={{ fontFamily: "'Bodoni Moda', serif" }}>
                        {a.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar (30%) */}
          <div className="lg:w-[30%]">
            <Sidebar article={article} />
          </div>
        </div>
      </div>
    </>
  );
}

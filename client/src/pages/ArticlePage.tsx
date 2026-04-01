/*
 * ArticlePage — Single column 720px with Kalesh bio sidebar on desktop
 * Hero full-bleed above title. Health disclaimer card at bottom.
 * Affiliate disclosure box if article has Amazon links.
 */
import { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import { Clock, Copy, Check, ArrowRight } from "lucide-react";
import { getArticleMetaBySlug, getArticlesByCategory, loadArticleContent, SITE_CONFIG, type ArticleMeta } from "@/data";
import EmailCapture from "@/components/EmailCapture";

const KALESH_IMAGE = "https://conscious-sexuality.b-cdn.net/images/kalesh-author.webp";

function JsonLd({ article, faqHtml }: { article: ArticleMeta; faqHtml: string }) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    image: article.heroImage,
    datePublished: article.dateISO,
    dateModified: article.dateISO,
    author: { "@type": "Person", name: "Kalesh", url: "https://kalesh.love" },
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

function KaleshBioSidebar() {
  return (
    <div className="bg-[oklch(0.96_0.012_60)] border border-[oklch(0.90_0.03_60)] p-5">
      <img
        src={KALESH_IMAGE}
        alt="Kalesh"
        width={120}
        height={120}
        className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-2 border-[oklch(0.72_0.16_60)]"
      />
      <h3
        className="text-center text-base font-bold text-[oklch(0.20_0.04_25)] mb-2"
        style={{ fontFamily: "'Bodoni Moda', serif" }}
      >
        Kalesh
      </h3>
      <p className="text-xs text-[oklch(0.40_0.04_35)] leading-relaxed text-center mb-4">
        Kalesh is a mystic and spiritual advisor who brings ancient wisdom and depth to life's biggest decisions.
      </p>
      <div className="flex flex-col gap-2">
        <a
          href="https://kalesh.love"
          target="_blank"
          rel="noopener"
          className="block text-center text-xs font-semibold px-4 py-2.5 bg-[oklch(0.55_0.18_25)] text-white hover:bg-[oklch(0.45_0.16_25)] transition-colors duration-200"
        >
          Visit Kalesh's Website
        </a>
        <a
          href="https://kalesh.love"
          target="_blank"
          rel="noopener"
          className="block text-center text-xs font-semibold px-4 py-2.5 border border-[oklch(0.55_0.18_25)] text-[oklch(0.55_0.18_25)] hover:bg-[oklch(0.55_0.18_25)] hover:text-white transition-colors duration-200"
        >
          Book a Session
        </a>
      </div>
    </div>
  );
}

function HealthDisclaimer() {
  return (
    <div className="bg-[oklch(0.97_0.008_80)] border border-[oklch(0.90_0.03_60)] p-6 mt-10">
      <h4 className="text-sm font-bold text-[oklch(0.30_0.04_35)] mb-2">Important Notice</h4>
      <p className="text-xs text-[oklch(0.45_0.04_35)] leading-relaxed">
        The content on this site is for educational and informational purposes only and is not intended as medical advice, diagnosis, or treatment.
        Always consult your physician, licensed therapist, or qualified healthcare provider before making changes to your health or wellness practices.
        Nothing published here should be used as a substitute for professional medical or psychological guidance.
        If you are experiencing a medical or mental health emergency, please contact your local emergency services immediately.
      </p>
    </div>
  );
}

function AffiliateDisclosure() {
  return (
    <div className="bg-[oklch(0.96_0.01_80)] border border-[oklch(0.88_0.03_60)] px-5 py-3 mb-8 text-xs text-[oklch(0.45_0.04_35)] leading-relaxed">
      This article contains affiliate links. We may earn a small commission if you make a purchase — at no extra cost to you.
    </div>
  );
}

export default function ArticlePage() {
  const params = useParams<{ slug: string }>();
  const article = getArticleMetaBySlug(params.slug || "");
  const [contentHtml, setContentHtml] = useState("");
  const [faqHtml, setFaqHtml] = useState("");
  const [loading, setLoading] = useState(true);
  const [hasAffiliateLinks, setHasAffiliateLinks] = useState(false);

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
          setHasAffiliateLinks(data.contentHtml.includes("amazon.com/dp/"));
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

      {/* Content area with optional sidebar */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 -mt-12 relative z-10 pb-16">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main column — 720px */}
          <div className="flex-1 max-w-[720px]">
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
              className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[oklch(0.18_0.04_25)] leading-[1.1] mb-6"
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

            <div className="h-[1px] bg-gradient-to-r from-[oklch(0.72_0.16_60)] via-[oklch(0.55_0.18_25)] to-transparent mb-10" />

            {/* Affiliate disclosure if applicable */}
            {hasAffiliateLinks && <AffiliateDisclosure />}

            {loading ? (
              <div className="py-20 text-center">
                <div className="w-8 h-8 border-2 border-[oklch(0.55_0.18_25)] border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="mt-4 text-sm text-[oklch(0.50_0.04_35)]">Loading...</p>
              </div>
            ) : (
              <>
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

            {/* Health Disclaimer Card */}
            <HealthDisclaimer />

            {/* Share buttons */}
            <div className="mt-10 py-8 border-t border-b border-[oklch(0.90_0.03_60)]">
              <ShareButtons article={article} />
            </div>

            {/* Kalesh bio — inline at bottom (mobile) */}
            <div className="mt-10 py-8 border-b border-[oklch(0.90_0.03_60)] lg:hidden">
              <div className="flex items-start gap-4">
                <img
                  src={KALESH_IMAGE}
                  alt="Kalesh"
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[oklch(0.72_0.16_60)] flex-shrink-0"
                />
                <div>
                  <p className="text-sm font-bold text-[oklch(0.20_0.04_25)]">Kalesh</p>
                  <p className="text-xs text-[oklch(0.45_0.04_35)] leading-relaxed mt-1">
                    Kalesh is a mystic and spiritual advisor who brings ancient wisdom and depth to life's biggest decisions.
                  </p>
                  <a
                    href="https://kalesh.love"
                    target="_blank"
                    rel="noopener"
                    className="inline-block mt-2 text-xs font-semibold text-[oklch(0.55_0.18_25)] hover:text-[oklch(0.35_0.12_15)] transition-colors"
                  >
                    Visit Kalesh's Website →
                  </a>
                </div>
              </div>
            </div>

            {/* Tools link */}
            <div className="mt-8 p-5 bg-[oklch(0.96_0.012_60)] border border-[oklch(0.90_0.03_60)]">
              <p className="text-sm text-[oklch(0.35_0.04_35)]">
                Looking for resources to deepen your practice?{" "}
                <Link href="/tools" className="text-[oklch(0.55_0.18_25)] font-semibold hover:text-[oklch(0.35_0.12_15)] transition-colors underline underline-offset-2">
                  See our recommended tools →
                </Link>
              </p>
            </div>

            {/* Cross-links */}
            {crossLinks.length > 0 && (
              <section className="mt-12 pt-8 border-t border-[oklch(0.90_0.03_60)]">
                <h2 className="text-xs font-semibold uppercase tracking-[0.35em] text-[oklch(0.50_0.04_35)] mb-6">
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

          {/* Sidebar — Kalesh bio (desktop only) */}
          <aside className="hidden lg:block w-[260px] flex-shrink-0 pt-8">
            <div className="sticky top-24">
              <KaleshBioSidebar />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

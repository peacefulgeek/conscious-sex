/*
 * Tools We Recommend — Sacred Fire Intimacy
 * 28 real products across 6 categories
 * All Amazon links use tag=spankyspinola-20
 * ItemList schema, affiliate disclosure at top
 */
import { useEffect } from "react";
import { Link } from "wouter";

const TAG = "spankyspinola-20";
const amz = (asin: string) => `https://www.amazon.com/dp/${asin}?tag=${TAG}`;

interface Product {
  name: string;
  url: string;
  description: string;
  isAmazon: boolean;
  articleLink?: { text: string; href: string };
}

interface Category {
  title: string;
  products: Product[];
}

const CATEGORIES: Category[] = [
  {
    title: "Essential Books on Conscious Sexuality",
    products: [
      {
        name: "Mating in Captivity by Esther Perel",
        url: amz("0060753641"),
        description: "The book that changed how we think about desire in long-term relationships. Perel argues that security and eroticism pull in opposite directions — and shows you how to hold both.",
        isAmazon: true,
        articleLink: { text: "our guide to navigating desire in committed relationships", href: "/articles/navigating-desire-in-long-term-relationships" },
      },
      {
        name: "The Seven Principles for Making Marriage Work by John Gottman",
        url: amz("0553447718"),
        description: "Gottman's research-backed framework for what actually makes relationships last. Not theory — decades of lab data distilled into practices you can start tonight.",
        isAmazon: true,
      },
      {
        name: "The Erotic Mind by Jack Morin",
        url: amz("0060984287"),
        description: "A fearless exploration of what actually drives arousal. Morin maps the four cornerstones of eroticism with clinical precision and zero judgment.",
        isAmazon: true,
      },
      {
        name: "Tantra: The Art of Conscious Loving by Charles Muir",
        url: amz("0916515869"),
        description: "The most accessible entry point into tantric practice for Western couples. Practical, grounded, and refreshingly free of mystical jargon.",
        isAmazon: true,
      },
      {
        name: "The Body Keeps the Score by Bessel van der Kolk",
        url: amz("0143127748"),
        description: "If you carry trauma in your body — and most of us do — this book explains why your nervous system responds the way it does during intimacy, and what to do about it.",
        isAmazon: true,
        articleLink: { text: "our article on somatic awareness during intimacy", href: "/articles/somatic-awareness-during-intimacy" },
      },
      {
        name: "Come As You Are by Emily Nagoski",
        url: amz("1476762090"),
        description: "The science of female sexuality explained with warmth and clarity. Nagoski's dual control model will change how you understand arousal, desire, and pleasure.",
        isAmazon: true,
      },
      {
        name: "Urban Tantra by Barbara Carrellas",
        url: amz("1587613492"),
        description: "Tantra for people who live in the real world. Inclusive, queer-friendly, and deeply practical. One of the few books that treats sacred sexuality as something everyone can access.",
        isAmazon: true,
      },
    ],
  },
  {
    title: "Journals & Workbooks",
    products: [
      {
        name: "The Couples Therapy Workbook by Kathleen Mates-Youngman",
        url: amz("1641520698"),
        description: "Structured exercises for couples who want to do the work together. Each chapter builds on the last — honest, direct, and surprisingly tender.",
        isAmazon: true,
      },
      {
        name: "The Conscious Sexual Self Workbook by Bobbi Keppel",
        url: amz("150081086X"),
        description: "A guided exploration of your sexual identity, desires, and boundaries. The exercises here go deeper than most therapy sessions.",
        isAmazon: true,
      },
      {
        name: "The Five-Minute Journal",
        url: amz("0991846206"),
        description: "Not specifically about sexuality, but the daily gratitude practice it builds changes how you show up in your body and your relationships. We recommend it as a morning ritual.",
        isAmazon: true,
      },
    ],
  },
  {
    title: "Breathwork & Meditation Tools",
    products: [
      {
        name: "Retrospec Sedona Zafu Meditation Cushion",
        url: amz("B07VKPBPV4"),
        description: "A proper buckwheat-filled zafu makes seated breathwork sustainable. This one holds its shape and sits at the right height for most bodies.",
        isAmazon: true,
        articleLink: { text: "our breathwork guide for deeper connection", href: "/articles/breath-as-the-bridge-between-bodies" },
      },
      {
        name: "Breathing Buddha Guided Meditation Tool",
        url: amz("B0BPJY5JZ6"),
        description: "A simple light-up figure that guides your breathing rhythm visually. Surprisingly effective for couples who want to sync their breath before intimacy.",
        isAmazon: true,
      },
      {
        name: "Tibetan Singing Bowl Set",
        url: amz("B07MXMLL3V"),
        description: "Sound vibration is one of the fastest ways to shift your nervous system state. Use this before partner practices to drop from head to body in minutes.",
        isAmazon: true,
      },
      {
        name: "Wim Hof Method App",
        url: "https://www.wimhofmethod.com/",
        description: "Structured breathwork programs that build your capacity to stay present in intense sensation. The cold exposure component trains the same nervous system resilience that serves you in intimacy.",
        isAmazon: false,
      },
    ],
  },
  {
    title: "Sensual Atmosphere & Body Care",
    products: [
      {
        name: "Massage Oil Candle by LOVE PLAY",
        url: amz("B083911JGV"),
        description: "Melts into warm massage oil with a clean, sensual scent. Made in the Netherlands with high-quality ingredients. The transition from candlelight to touch is seamless.",
        isAmazon: true,
      },
      {
        name: "Plant Therapy Sensual Essential Oil Blend",
        url: amz("B005VSXUQM"),
        description: "A carefully balanced blend of ylang ylang, patchouli, and sweet orange. Diffuse it during partner practices — the scent anchors the experience in your body's memory.",
        isAmazon: true,
      },
      {
        name: "Organic Coconut Oil for Body",
        url: amz("B00DS842HS"),
        description: "The simplest, most versatile body oil. Unrefined, cold-pressed, and free of everything you do not want on your skin. A staple for conscious touch practice.",
        isAmazon: true,
      },
      {
        name: "Himalayan Salt Lamp",
        url: amz("B06XD2MYJD"),
        description: "The warm amber glow creates an atmosphere that fluorescent lights never will. Place one in your practice space and notice how the light changes the energy of the room.",
        isAmazon: true,
      },
      {
        name: "Silk Eye Mask for Sensory Practice",
        url: amz("B07KC5DWCC"),
        description: "Removing sight amplifies every other sense. A quality silk mask is comfortable enough for extended wear during sensory exploration exercises.",
        isAmazon: true,
      },
    ],
  },
  {
    title: "Connection & Communication Games",
    products: [
      {
        name: "BestSelf Intimacy Deck",
        url: amz("B07W1PVNFC"),
        description: "170 conversation cards that go where small talk cannot. The questions are designed to build vulnerability and erotic tension simultaneously. Best used with wine and nowhere to be.",
        isAmazon: true,
      },
      {
        name: "SEXPECTATIONS Card Deck",
        url: amz("B07RLK6D2V"),
        description: "52 cards that make it easier to talk about what you actually want. Less clinical than a workbook, more structured than winging it. Good for couples who struggle to initiate these conversations.",
        isAmazon: true,
      },
      {
        name: "Esther Perel's Where Should We Begin Game",
        url: amz("B08YRWMKMT"),
        description: "From the therapist who wrote Mating in Captivity — a card game that brings her couples therapy approach into your living room. The prompts are disarmingly good.",
        isAmazon: true,
      },
    ],
  },
  {
    title: "Apps & Digital Resources",
    products: [
      {
        name: "Insight Timer (Free Meditation App)",
        url: "https://insighttimer.com/",
        description: "The largest free library of guided meditations, including hundreds focused on body awareness, breathwork, and conscious sexuality. Start here if you are new to meditation.",
        isAmazon: false,
      },
      {
        name: "Coral — Intimacy & Sexual Wellness App",
        url: "https://www.getcoral.app/",
        description: "Evidence-based exercises and guided practices for couples and individuals. The content is written by sex therapists and researchers, not influencers.",
        isAmazon: false,
      },
      {
        name: "Headspace — Mindfulness & Sleep",
        url: "https://www.headspace.com/",
        description: "The body scan meditations in Headspace are excellent preparation for somatic intimacy practices. Consistency matters more than duration — even 5 minutes daily rewires your attention.",
        isAmazon: false,
      },
    ],
  },
];

const TOTAL_PRODUCTS = CATEGORIES.reduce((sum, c) => sum + c.products.length, 0);
const AMAZON_COUNT = CATEGORIES.reduce((sum, c) => sum + c.products.filter(p => p.isAmazon).length, 0);

function ItemListSchema() {
  const items = CATEGORIES.flatMap((cat, ci) =>
    cat.products.map((p, pi) => ({
      "@type": "ListItem",
      position: ci * 10 + pi + 1,
      name: p.name,
      url: p.url,
    }))
  );

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Tools We Recommend for Conscious Sexuality",
    description: "Curated list of the best books, tools, apps, and resources for conscious sexuality and sacred intimacy.",
    numberOfItems: TOTAL_PRODUCTS,
    itemListElement: items,
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export default function ToolsPage() {
  useEffect(() => {
    document.title = "Best Conscious Sexuality Tools & Resources We Recommend | Sacred Fire Intimacy";
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta("description", "Curated list of the best books, tools, apps, and resources for conscious sexuality. Personally vetted recommendations from Kalesh.");
  }, []);

  return (
    <>
      <ItemListSchema />

      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          {/* Affiliate disclosure — top of page */}
          <div className="bg-[oklch(0.96_0.01_80)] border border-[oklch(0.88_0.03_60)] px-5 py-3 mb-10 text-xs text-[oklch(0.45_0.04_35)] leading-relaxed">
            This page contains affiliate links. We may earn a small commission if you make a purchase — at no extra cost to you.
          </div>

          <h1
            className="text-3xl md:text-4xl font-bold text-[oklch(0.18_0.04_25)] mb-6"
            style={{ fontFamily: "'Bodoni Moda', serif" }}
          >
            Sacred Intimacy Essentials
          </h1>

          <p className="text-base text-[oklch(0.35_0.04_35)] leading-relaxed mb-4">
            These are the tools, books, and resources we actually trust. Every recommendation here has been chosen because it serves the work this site is about — deepening your relationship with your body, your partner, and the sacred dimension of sexuality.
          </p>
          <p className="text-base text-[oklch(0.35_0.04_35)] leading-relaxed mb-12">
            Nothing here is filler. If it is on this page, it is because we have seen it change how people show up in their intimate lives.
          </p>

          <div className="h-[1px] bg-gradient-to-r from-[oklch(0.72_0.16_60)] via-[oklch(0.55_0.18_25)] to-transparent mb-12" />

          {CATEGORIES.map((category, ci) => (
            <section key={ci} className="mb-16">
              <h2
                className="text-2xl font-bold text-[oklch(0.25_0.04_25)] mb-8"
                style={{ fontFamily: "'Bodoni Moda', serif" }}
              >
                {category.title}
              </h2>

              <div className="space-y-6">
                {category.products.map((product, pi) => (
                  <div
                    key={pi}
                    className="bg-[oklch(0.97_0.008_80)] border border-[oklch(0.92_0.03_60)] p-5 hover:border-[oklch(0.72_0.16_60)] transition-colors duration-300"
                  >
                    <h3 className="text-base font-bold text-[oklch(0.20_0.04_25)] mb-2">
                      <a
                        href={product.url}
                        target="_blank"
                        rel={product.isAmazon ? "noopener" : "noopener nofollow"}
                        className="hover:text-[oklch(0.55_0.18_25)] transition-colors duration-200 underline underline-offset-2"
                      >
                        {product.name}
                      </a>
                      {product.isAmazon && (
                        <span className="text-xs text-[oklch(0.55_0.04_35)] font-normal ml-2">(paid link)</span>
                      )}
                    </h3>
                    <p className="text-sm text-[oklch(0.38_0.04_35)] leading-relaxed">
                      {product.description}
                      {product.articleLink && (
                        <>
                          {" "}See also:{" "}
                          <Link
                            href={product.articleLink.href}
                            className="text-[oklch(0.55_0.18_25)] hover:text-[oklch(0.35_0.12_15)] transition-colors underline underline-offset-2"
                          >
                            {product.articleLink.text}
                          </Link>
                          .
                        </>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Summary */}
          <div className="mt-8 pt-8 border-t border-[oklch(0.90_0.03_60)]">
            <p className="text-sm text-[oklch(0.50_0.04_35)] italic">
              {TOTAL_PRODUCTS} products across {CATEGORIES.length} categories. {AMAZON_COUNT} Amazon affiliate links, {TOTAL_PRODUCTS - AMAZON_COUNT} direct links.
              As an Amazon Associate I earn from qualifying purchases.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

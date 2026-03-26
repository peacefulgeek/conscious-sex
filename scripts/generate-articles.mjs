#!/usr/bin/env node
/**
 * Article Auto-Generator — Sacred Fire Intimacy
 * Uses Anthropic API (Claude 4.6 Sonnet) + FAL.ai for images
 * ALL secrets from process.env. NEVER hardcode API keys.
 *
 * Env vars: ANTHROPIC_API_KEY, FAL_KEY, GH_PAT
 * Bunny CDN credentials are in code (per spec).
 */

const BUNNY_STORAGE_ZONE = "conscious-sexuality";
const BUNNY_STORAGE_HOST = "ny.storage.bunnycdn.com";
const BUNNY_STORAGE_PASSWORD = "b2a80662-8b74-4792-8274d3c20d57-edf7-4de9";
const BUNNY_CDN_BASE = "https://conscious-sexuality.b-cdn.net";

const AUTO_GEN_ENABLED = false;

const CATEGORIES = [
  { slug: "the-body-temple", name: "The Body Temple" },
  { slug: "the-connection", name: "The Connection" },
  { slug: "the-healing", name: "The Healing" },
  { slug: "the-energy", name: "The Energy" },
  { slug: "the-practice", name: "The Practice" },
];

async function generateArticle() {
  if (!AUTO_GEN_ENABLED) {
    console.log("[auto-gen] AUTO_GEN_ENABLED = false. Skipping.");
    return;
  }

  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
  const FAL_KEY = process.env.FAL_KEY;

  if (!ANTHROPIC_API_KEY || !FAL_KEY) {
    console.error("[auto-gen] Missing ANTHROPIC_API_KEY or FAL_KEY");
    return;
  }

  const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];

  console.log(`[auto-gen] Generating article for category: ${category.name}`);

  try {
    // 1. Generate article via Anthropic
    const resp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 8000,
        messages: [{
          role: "user",
          content: `Generate a 2,500-2,800 word article for the "${category.name}" category of Sacred Fire Intimacy, a conscious sexuality site. Write in the voice of Kalesh — consciousness teacher, direct, embodied. Include: varied opener (NOT starting with "You"), 1+ first-person lived experience marker, 1+ named researcher citation (Gottman, Esther Perel, Sue Johnson, Porges, etc.), 2-4 FAQ questions, NO "this is where" transitions, a conclusion with teeth (challenge/provocation), 3-5 internal links to other articles, and 3-5 phrases from this library: "the body keeps the score whether you read the book or not", "this is not a metaphor", "I've sat with enough people to know", "the nervous system doesn't negotiate", "you can't think your way into feeling". Return JSON: { "title": "...", "slug": "...", "metaDescription": "...", "metaKeywords": "...", "readingTime": N, "contentHtml": "...", "faqHtml": "...", "heroImagePrompt": "..." }`
        }],
      }),
    });

    if (!resp.ok) {
      console.error(`[auto-gen] Anthropic API error: ${resp.status}`);
      return;
    }

    const data = await resp.json();
    const text = data.content[0].text;
    const article = JSON.parse(text);

    // 2. Generate hero image via FAL.ai
    const imgResp = await fetch("https://fal.run/fal-ai/flux/schnell", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Key ${FAL_KEY}`,
      },
      body: JSON.stringify({
        prompt: article.heroImagePrompt,
        image_size: { width: 1200, height: 675 },
        num_images: 1,
      }),
    });

    if (imgResp.ok) {
      const imgData = await imgResp.json();
      const imageUrl = imgData.images?.[0]?.url;
      if (imageUrl) {
        // Download and upload to Bunny CDN
        const imgBuf = await (await fetch(imageUrl)).arrayBuffer();
        await fetch(
          `https://${BUNNY_STORAGE_HOST}/${BUNNY_STORAGE_ZONE}/images/${article.slug}-hero.webp`,
          {
            method: "PUT",
            headers: {
              AccessKey: BUNNY_STORAGE_PASSWORD,
              "Content-Type": "image/webp",
            },
            body: Buffer.from(imgBuf),
          }
        );
        article.heroImage = `${BUNNY_CDN_BASE}/images/${article.slug}-hero.webp`;
      }
    }

    // 3. Add to articles index
    const indexUrl = `https://${BUNNY_STORAGE_HOST}/${BUNNY_STORAGE_ZONE}/articles-index.json`;
    let existingIndex = [];
    try {
      const getResp = await fetch(indexUrl, { headers: { AccessKey: BUNNY_STORAGE_PASSWORD } });
      if (getResp.ok) existingIndex = JSON.parse(await getResp.text());
    } catch { /* new file */ }

    const newId = existingIndex.length + 1;
    const meta = {
      id: newId,
      title: article.title,
      slug: article.slug,
      categorySlug: category.slug,
      categoryName: category.name,
      dateISO: new Date().toISOString().split("T")[0],
      dateHuman: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      isLive: true,
      metaDescription: article.metaDescription,
      metaKeywords: article.metaKeywords,
      readingTime: article.readingTime || 11,
      heroImage: article.heroImage || `${BUNNY_CDN_BASE}/images/default-hero.webp`,
      ogImage: article.heroImage || `${BUNNY_CDN_BASE}/images/default-hero.webp`,
      ogDescription: article.metaDescription,
      faqCount: (article.faqHtml?.match(/<h3/g) || []).length,
    };

    existingIndex.push(meta);

    // Upload updated index
    await fetch(indexUrl, {
      method: "PUT",
      headers: { AccessKey: BUNNY_STORAGE_PASSWORD, "Content-Type": "application/json" },
      body: JSON.stringify(existingIndex),
    });

    // Upload article content
    await fetch(
      `https://${BUNNY_STORAGE_HOST}/${BUNNY_STORAGE_ZONE}/articles/${article.slug}.json`,
      {
        method: "PUT",
        headers: { AccessKey: BUNNY_STORAGE_PASSWORD, "Content-Type": "application/json" },
        body: JSON.stringify({ contentHtml: article.contentHtml, faqHtml: article.faqHtml }),
      }
    );

    console.log(`[auto-gen] Published: ${article.title}`);
  } catch (err) {
    console.error("[auto-gen] Error:", err);
  }
}

export { generateArticle, AUTO_GEN_ENABLED };

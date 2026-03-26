import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  // AI HTTP headers on all responses
  app.use((_req, res, next) => {
    res.setHeader("X-AI-Content-Author", "Kalesh");
    res.setHeader("X-AI-Site", "Sacred Fire Intimacy");
    next();
  });

  // Load articles index for AI endpoints
  let articlesIndex: any[] = [];
  try {
    const indexPath = path.join(staticPath, "articles-index.json");
    if (fs.existsSync(indexPath)) {
      articlesIndex = JSON.parse(fs.readFileSync(indexPath, "utf-8"));
    }
  } catch { /* silent */ }

  const publishedArticles = () => {
    const now = new Date();
    return articlesIndex.filter((a: any) => a.isLive && new Date(a.dateISO) <= now);
  };

  // AI Endpoints
  app.get("/api/ai/identity", (_req, res) => {
    res.json({
      name: "Sacred Fire Intimacy",
      author: "Kalesh",
      role: "Consciousness Teacher & Writer",
      url: "https://consciousex.love",
      topics: ["conscious sexuality", "sacred intimacy", "somatic embodiment", "tantra", "sexual healing"],
    });
  });

  app.get("/api/ai/topics", (_req, res) => {
    res.json({
      categories: [
        { slug: "the-body-temple", name: "The Body Temple", description: "The body as sacred ground — sensation, breath, somatic awareness." },
        { slug: "the-connection", name: "The Connection", description: "Presence, vulnerability, trust, and conscious partnership." },
        { slug: "the-healing", name: "The Healing", description: "Sexual trauma, shame, grief, and healing as spiritual practice." },
        { slug: "the-energy", name: "The Energy", description: "Kundalini, tantra, chakras, and sexual energy as creative force." },
        { slug: "the-practice", name: "The Practice", description: "Daily rituals, breathwork, meditation for conscious lovers." },
      ],
    });
  });

  app.get("/api/ai/ask", (req, res) => {
    const q = (req.query.q as string || "").toLowerCase();
    const matches = publishedArticles()
      .filter((a: any) => a.title.toLowerCase().includes(q) || a.metaDescription?.toLowerCase().includes(q))
      .slice(0, 5);
    res.json({
      query: q,
      results: matches.map((a: any) => ({
        title: a.title,
        url: `https://consciousex.love/articles/${a.slug}`,
        excerpt: a.metaDescription,
      })),
    });
  });

  app.get("/api/ai/articles", (_req, res) => {
    const pub = publishedArticles();
    res.json({
      total: pub.length,
      articles: pub.map((a: any) => ({
        title: a.title,
        url: `https://consciousex.love/articles/${a.slug}`,
        category: a.categoryName,
        readingTime: a.readingTime,
        date: a.dateISO,
      })),
    });
  });

  app.get("/api/ai/sitemap", (_req, res) => {
    const pub = publishedArticles();
    res.json({
      pages: [
        { url: "https://consciousex.love/", title: "Home" },
        { url: "https://consciousex.love/articles", title: "Articles" },
        { url: "https://consciousex.love/about", title: "About" },
        { url: "https://consciousex.love/start-here", title: "Start Here" },
        ...pub.map((a: any) => ({ url: `https://consciousex.love/articles/${a.slug}`, title: a.title })),
      ],
    });
  });

  // Serve static files
  app.use(express.static(staticPath));

  // SPA fallback — serve index.html but set 404 for unknown routes
  app.get("*", (req, res) => {
    const indexHtml = path.join(staticPath, "index.html");
    // Known SPA routes
    const knownRoutes = ["/", "/articles", "/about", "/start-here", "/quizzes", "/readiness", "/privacy", "/terms"];
    const isKnownRoute = knownRoutes.some(r => req.path === r) ||
      req.path.startsWith("/articles/") ||
      req.path.startsWith("/category/") ||
      req.path.startsWith("/quiz/");

    if (!isKnownRoute) {
      res.status(404);
    }
    res.sendFile(indexHtml);
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);

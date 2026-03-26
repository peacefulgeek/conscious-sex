# Auto-Gen Cron Pipeline — Sacred Fire Intimacy

## Overview
This document describes the automated article generation pipeline for Sacred Fire Intimacy.
The pipeline is designed to run weekly, generating new articles that conform to the Gold Standard.

## Pipeline Steps

### 1. Article Generation
- Generate articles using the Gold Standard voice bible
- All 9 fixes must be applied (see TASK-1-REDO-ARTICLE-QUALITY.md)
- Articles must be 2,500-2,800 words
- Each article must have unique opener, lived experience, named references, FAQ, conclusion

### 2. Image Generation
- Generate hero image (1200x675) via FAL.ai
- Generate OG image (1200x630) via FAL.ai
- Convert to WebP
- Upload to Bunny CDN: conscious-sexuality.b-cdn.net/heroes/ and /og/

### 3. Data Integration
- Add article to articles.json
- Set isLive: false (gated for future release)
- Update sitemap.xml, feed.xml, llms.txt

### 4. Deployment
- Run pnpm build
- Push to GitHub
- Deploy to Railway

## Bunny CDN Credentials
- Storage Zone: conscious-sexuality
- Hostname: ny.storage.bunnycdn.com
- CDN URL: https://conscious-sexuality.b-cdn.net

## Schedule
- Weekly on Monday at 6:00 AM UTC
- 5 articles per batch
- Categories rotate: body-temple → connection → healing → energy → practice

## Quality Checklist (per article)
- [ ] Opener: NOT "In a world where..." — uses scene, question, or provocation
- [ ] Lived experience: 1+ first-person anecdote with sensory detail
- [ ] Named reference: 1+ real author/researcher with specific work cited
- [ ] FAQ: 3-5 questions distributed across article body
- [ ] Conclusion: Specific practice or challenge, not generic summary
- [ ] No "this is where" phrases
- [ ] No generic phrases from kill list
- [ ] No repeated H2 headers
- [ ] 3+ voice phrases from 150-phrase library

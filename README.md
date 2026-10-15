# Lighthouse Compliance 360 website

Static site (plain HTML/CSS/JS, no build step) hosted free on GitHub Pages at https://www.lighthousecompliance360.com.

## Structure

```
index.html                     Home: hero, "How can we help", services, method
people-effectiveness.html      Service area I
compliance-governance.html     Service area II
due-diligence.html             Service area III
internal-investigations.html   Cross-cutting service
how-we-work.html               Engagement process
about.html                     Company story (founder profiles: TODO)
resources.html                 Article categories (articles: TODO)
contact.html                   Book a call + email
404.html                       Not-found page (GitHub Pages serves it automatically)
assets/css/style.css           All styles; brand colors are variables at the top
assets/js/main.js              Mobile menu + footer year
assets/img/                    Logo and favicon (SVG)
sitemap.xml, robots.txt        Search engines
CNAME                          Custom domain for GitHub Pages
.nojekyll                      Tells GitHub Pages to serve files as-is
DEPLOY.md                      GitHub repo, Pages, GoDaddy DNS and HTTPS setup
```

The header and footer are repeated in every page; when you change one, change them all.
When adding a page, also add it to `sitemap.xml` and the footer links.

## Still to fill in

Search for `TODO`: booking link and email (contact.html, index.html JSON-LD), founder profiles (about.html), articles (resources.html).

## Preview locally

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

## Deploy

Push to `main`; GitHub Pages publishes automatically. First-time setup: see [DEPLOY.md](DEPLOY.md).

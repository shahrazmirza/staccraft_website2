import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// Link previews (Teams, Slack, LinkedIn, iMessage…) and search engines read a page's HTML
// without running JavaScript, so each page's title, description and preview image are written
// into the HTML at build time: dist/index.html for Home and a copy per page for the rest.
// Preview images need a full address: set SITE_URL (e.g. https://staccraft.com) where you build;
// on Vercel the production domain is used automatically.
// Bump when public/og-image.png changes, so Teams, LinkedIn etc. fetch the new image instead of a saved copy.
const OG_IMAGE_VERSION = 2;

function pageMeta() {
  const content = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'content.json'), 'utf8'));
  const { brand = {}, pages = [] } = content;
  const env = process.env;
  const site = (env.SITE_URL || (env.VERCEL_PROJECT_PRODUCTION_URL ? 'https://' + env.VERCEL_PROJECT_PRODUCTION_URL : '')).replace(/\/+$/, '');
  const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const plain = (s) => String(s ?? '').replace(/[[\]{}]/g, '');
  const tags = (p) => {
    const home = p.id === 'home';
    const title = home ? `${brand.name} · ${brand.tagline || ''}` : `${p.title} · ${brand.name}`;
    const desc = plain(p.description || (p.article && p.article.excerpt) || brand.tagline || '');
    const url = site + (home ? '/' : '/' + p.id);
    const img = site + '/og-image.png?v=' + OG_IMAGE_VERSION;
    return [
      `<title>${esc(title)}</title>`,
      `<meta name="description" content="${esc(desc)}" />`,
      `<meta property="og:type" content="${p.article ? 'article' : 'website'}" />`,
      `<meta property="og:site_name" content="${esc(brand.name)}" />`,
      `<meta property="og:locale" content="en_AU" />`,
      `<meta property="og:title" content="${esc(home ? brand.name : p.title + " · " + brand.name)}" />`,
      `<meta property="og:description" content="${esc(desc)}" />`,
      site && `<meta property="og:url" content="${esc(url)}" />`,
      site && `<link rel="canonical" href="${esc(url)}" />`,
      `<meta property="og:image" content="${esc(img)}" />`,
      `<meta property="og:image:width" content="1200" />`,
      `<meta property="og:image:height" content="630" />`,
      `<meta property="og:image:alt" content="${esc(brand.name + ': ' + (brand.tagline || ''))}" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:image" content="${esc(img)}" />`,
    ].filter(Boolean).join('\n    ');
  };
  const MARK = '<!-- page-meta -->';
  let outDir;
  return {
    name: 'page-meta',
    configResolved(c) { outDir = path.resolve(c.root, c.build.outDir); },
    transformIndexHtml(html) { return html.replace(MARK, tags(pages.find((p) => p.id === 'home') || { id: 'home' })); },
    closeBundle() {
      const file = path.join(outDir, 'index.html');
      if (!fs.existsSync(file)) return; // dev server
      const home = fs.readFileSync(file, 'utf8');
      const homeTags = tags(pages.find((p) => p.id === 'home') || { id: 'home' });
      pages.filter((p) => p.id !== 'home').forEach((p) => {
        const html = home.replace(homeTags, tags(p));
        // <id>.html is served at /<id> by Vercel (cleanUrls in vercel.json); <id>/index.html by Azure Static Web Apps.
        fs.writeFileSync(path.join(outDir, p.id + '.html'), html);
        fs.mkdirSync(path.join(outDir, p.id), { recursive: true });
        fs.writeFileSync(path.join(outDir, p.id, 'index.html'), html);
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), pageMeta()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  server: { port: 5173 },
});

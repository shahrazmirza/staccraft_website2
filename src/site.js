// Site content comes from content.json at the repo root (edited in the original
// prototype's "Manage site" editor). This module is the only place that reads it.
import content from '../content.json';
import { toPath } from './legacy/visuals';

export { content, toPath };
export const brand = content.brand || {};
export const pages = content.pages || [];

export const getPage = (id) => pages.find((p) => p.id === id);

// '/'-relative URL for an image path stored in content.json, e.g. 'live/tw-clubs.jpg'.
export const asset = (p) => (!p ? '' : /^https?:/i.test(p) ? p : '/' + String(p).replace(/^\/+/, ''));

export const isExternal = (href) => /^(https?:|mailto:|tel:)/i.test(String(href || ''));

// Top-level menu: pages without a navGroup are links; pages sharing a navGroup become a dropdown.
export function navModel() {
  const out = [];
  const groups = {};
  pages.filter((p) => p.showInNav).forEach((p) => {
    const g = (p.navGroup || '').trim();
    if (!g) { out.push({ page: p }); return; }
    if (!groups[g]) { groups[g] = { group: g, pages: [] }; out.push(groups[g]); }
    groups[g].pages.push(p);
  });
  return out;
}

export const articlePageList = () =>
  pages
    .filter((p) => p.article && (p.sections || []).some((s) => s.type === 'article'))
    .sort((a, b) => String(b.article.date || '').localeCompare(String(a.article.date || '')));

// The blog index: the first non-article page (other than home) with a posts section.
export const insightsIndex = () =>
  pages.find((p) => !p.article && p.id !== 'home' && (p.sections || []).some((s) => s.type === 'posts'));

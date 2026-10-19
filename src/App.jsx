import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Page from './pages/Page';
import { brand, getPage, toPath } from './site';
import { md } from './legacy/visuals';

/* ---------- Search engines and social previews ---------- */
function setMeta(attr, name, value) {
  let m = document.querySelector(`meta[${attr}="${name}"]`);
  if (!value) { if (m) m.remove(); return; }
  if (!m) { m = document.createElement('meta'); m.setAttribute(attr, name); document.head.appendChild(m); }
  m.setAttribute('content', value);
}
function structuredData(p) {
  const org = { '@type': 'Organization', name: brand.name, description: brand.tagline || '', email: brand.email || undefined };
  const g = [org];
  if (p.id === 'home') g.push({ '@type': 'WebSite', name: brand.name, description: brand.tagline || '' });
  const art = (p.sections || []).find((s) => s.type === 'article');
  if (p.article && art) {
    g.push({ '@type': 'Article', headline: p.title, description: p.article.excerpt || p.description || '', datePublished: p.article.date || undefined,
      articleSection: p.article.category || undefined, wordCount: md(art.body).words,
      author: { '@type': 'Organization', name: p.article.author || brand.name }, publisher: { '@type': 'Organization', name: brand.name } });
  }
  const faqs = [];
  (p.sections || []).filter((s) => s.type === 'faq').forEach((s) => (s.items || []).forEach((it) => {
    if (it.q && it.a && !/\[/.test(it.q + it.a)) faqs.push({ '@type': 'Question', name: it.q, acceptedAnswer: { '@type': 'Answer', text: it.a } });
  }));
  if (faqs.length) g.push({ '@type': 'FAQPage', mainEntity: faqs });
  return { '@context': 'https://schema.org', '@graph': g };
}
function useHead(p) {
  useEffect(() => {
    const desc = p.description || (p.article && p.article.excerpt) || brand.tagline || '';
    document.title = p.id === 'home' ? `${brand.name} · ${brand.tagline || ''}` : `${p.title} · ${brand.name}`;
    setMeta('name', 'description', desc);
    setMeta('property', 'og:title', p.id === 'home' ? brand.name : p.title);
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:type', p.article ? 'article' : 'website');
    setMeta('property', 'og:site_name', brand.name);
    setMeta('property', 'og:locale', 'en_AU');
    let ld = document.getElementById('ld-json');
    if (!ld) { ld = document.createElement('script'); ld.type = 'application/ld+json'; ld.id = 'ld-json'; document.head.appendChild(ld); }
    ld.textContent = JSON.stringify(structuredData(p)).replace(/</g, '\\u003c');
    if (window.gtag) window.gtag('event', 'page_view', { page_title: document.title, page_location: window.location.href });
  }, [p]);
}

/* ---------- Cookie consent and Google Analytics (brand.gaId + brand.analyticsLive) ---------- */
const CONSENT_KEY = 'site-analytics-consent-v1';
const gaId = () => { const id = String(brand.gaId || '').trim(); return /^G-[A-Z0-9]{4,}$/i.test(id) ? id.toUpperCase() : ''; };
const readConsent = () => { try { const v = localStorage.getItem(CONSENT_KEY); return v === 'granted' || v === 'denied' ? v : null; } catch (e) { return null; } };
let gaLoaded = false;
function maybeLoadGA() {
  const id = gaId();
  if (gaLoaded || !id || !brand.analyticsLive || readConsent() !== 'granted') return;
  gaLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  window.gtag('js', new Date());
  window.gtag('config', id, { send_page_view: true });
  const sc = document.createElement('script'); sc.async = true; sc.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
  document.head.appendChild(sc);
}
function Consent({ open, onClose }) {
  if (!open) return null;
  const choose = (v) => { try { localStorage.setItem(CONSENT_KEY, v); } catch (e) { /* private mode */ } onClose(); maybeLoadGA(); };
  return (
    <div role="region" aria-label="Cookie choices" className="fixed bottom-4 left-4 right-4 sm:left-auto sm:max-w-md z-[70] rounded-2xl bg-white border border-black/10 shadow-lg p-5">
      <strong className="font-serif text-lg">Can we use analytics cookies?</strong>
      <p className="text-sm text-neutral-700 mt-2 leading-relaxed">We use Google Analytics to see how people find and use this site, so we can improve it. It only runs if you allow it. You can change your mind at any time from the link in the footer.</p>
      <div className="flex gap-2 mt-4">
        <button type="button" onClick={() => choose('granted')} className="bg-[#231F20] text-white px-4 py-2 rounded-full text-sm">Allow analytics</button>
        <button type="button" onClick={() => choose('denied')} className="border border-black/15 px-4 py-2 rounded-full text-sm">Decline</button>
      </div>
    </div>
  );
}

/* ---------- Routing ---------- */
function PageRoute({ id }) {
  const params = useParams();
  const page = getPage(id || params.id);
  if (!page) return <Navigate to="/" replace />;
  if (page.id === 'home' && !id) return <Navigate to="/" replace />;
  return <PageView page={page} />;
}
function PageView({ page }) {
  useHead(page);
  return <Page page={page} />;
}

// Scroll to the top on a new page, or to #anchor; send old '#page' links to their new paths;
// let links inside content HTML (articles, mock-ups) navigate without a full reload.
function RouterEffects() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const h = hash.slice(1);
    if (pathname === '/' && h && getPage(h.split('.')[0]) && h.split('.')[0] !== 'home') { navigate(toPath(h), { replace: true }); return; }
    if (pathname === '/' && h.startsWith('home.')) { navigate(toPath(h), { replace: true }); return; }
    if (!h) { window.scrollTo(0, 0); return; }
    let tries = 0;
    const go = () => {
      const el = document.getElementById(decodeURIComponent(h));
      if (el) el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
      else if (tries++ < 10) setTimeout(go, 50);
    };
    requestAnimationFrame(go);
  }, [pathname, hash, navigate]);

  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest('a[href^="/"]');
      if (!a || a.target || a.hasAttribute('download') || a.closest('[data-router-link]')) return;
      e.preventDefault();
      navigate(a.getAttribute('href'));
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [navigate]);
  return null;
}

export default function App() {
  const [consentOpen, setConsentOpen] = useState(() => !!gaId() && !readConsent());
  useEffect(() => { maybeLoadGA(); }, []);
  return (
    <div className="App grain relative">
      <BrowserRouter>
        <RouterEffects />
        <Navbar />
        <main id="main-content" className="relative z-[2]">
          <Routes>
            <Route path="/" element={<PageRoute id="home" />} />
            <Route path="/:id" element={<PageRoute />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer onCookieSettings={gaId() ? () => setConsentOpen(true) : null} />
        <Consent open={consentOpen} onClose={() => setConsentOpen(false)} />
      </BrowserRouter>
    </div>
  );
}



import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { md, mdInline, readMinutes, fmtDate, coverArt, icon, CAT_THEME, STORY } from '../legacy/visuals';
import { brand, articlePageList, insightsIndex } from '../site';
import { Tx, Section, SecHead, ArrowLink, PrimaryBtn, Eyebrow } from '../components/ui';
import { useEnquiry } from '../lib/useEnquiry';

const pad = (n) => String(n).padStart(2, '0');
const articleOf = (p) => (p.sections || []).find((s) => s.type === 'article') || {};
const minsOf = (p) => readMinutes(md(articleOf(p).body).words);
const initials = (n) => { n = String(n || ''); const c = n.match(/[A-Z]/g); return (c && c.length > 1 ? c.slice(0, 2).join('') : n.slice(0, 2)).toUpperCase(); };
const catIcon = (c) => (CAT_THEME[c] || {}).icon || 'chart';

// The reading path: one guide per stage of an order's journey.
const storyPages = () => {
  const all = articlePageList();
  return STORY.map(([c, stage]) => { const p = all.find((x) => x.article.category === c); return p ? { p, stage } : null; }).filter(Boolean);
};

function Cover({ cat, className = '', children }) {
  return (
    <span className={`mk relative block overflow-hidden bg-[#F1EFE6] ${className}`} aria-hidden="true">
      <span className="block [&_svg]:w-full [&_svg]:h-full h-full" dangerouslySetInnerHTML={{ __html: coverArt(cat) }} />
      {children}
    </span>
  );
}

function PostCard({ p, feat }) {
  const a = p.article;
  return (
    <Link to={'/' + p.id} className={`group bg-white border border-black/10 hover:border-[#231F20] rounded-2xl overflow-hidden transition-colors flex flex-col ${feat ? 'md:col-span-2 lg:col-span-3 lg:flex-row' : ''}`}>
      <Cover cat={a.category} className={feat ? 'aspect-[5/3] lg:aspect-auto lg:w-1/2' : 'aspect-[5/3]'}>
        {feat && <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-widest bg-[#B4D234] text-[#231F20]">Featured story</span>}
        <span className="absolute bottom-4 right-4 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-widest bg-white/90 text-[#231F20]">{minsOf(p)} min read</span>
      </Cover>
      <span className={`flex flex-col flex-1 p-6 md:p-7 ${feat ? 'lg:p-12 lg:justify-center' : ''}`}>
        <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-3">// {a.category || 'Insights'}</span>
        <Tx text={p.title} className={`block font-serif leading-tight mb-3 ${feat ? 'text-3xl md:text-5xl' : 'text-2xl'}`} />
        {a.excerpt && <Tx text={a.excerpt} className="block text-sm text-neutral-600 leading-relaxed" />}
        <span className="mt-auto pt-6 flex items-center justify-between text-sm">
          <span className="text-neutral-500">{a.author || brand.name} · {fmtDate(a.date)}</span>
          <span className="inline-flex items-center gap-1.5">{feat ? 'Read the story' : 'Read'} <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" /></span>
        </span>
      </span>
    </Link>
  );
}

function StoryPath() {
  const st = storyPages();
  if (st.length < 2) return null;
  return (
    <div className="mb-16 rounded-3xl bg-[#231F20] text-white p-6 sm:p-10 md:p-14">
      <Eyebrow text="Start here" dark />
      <h2 className="font-serif text-4xl md:text-5xl leading-[1.05] tracking-tight max-w-3xl">Follow one order, <span className="serif-italic-accent">start</span> to finish</h2>
      <p className="text-white/60 text-lg leading-relaxed max-w-2xl mt-5">Six guides, in the order an order travels: sold through a club store, sized and ranged, bought from the supplier, posted to the ERP, then found and trusted by the next customer.</p>
      <ol className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {st.map((x, i) => (
          <li key={x.p.id}>
            <Link to={'/' + x.p.id} className="group h-full flex flex-col bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] rounded-2xl p-5 transition-colors">
              <span className="flex items-center justify-between mb-5">
                <span className="font-mono text-xs text-[#B4D234]">{pad(i + 1)}</span>
                <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center [&_svg]:w-4 [&_svg]:h-4 text-white/70" dangerouslySetInnerHTML={{ __html: icon(catIcon(x.p.article.category)) }} />
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 mb-2">{x.stage}</span>
              <Tx text={x.p.title} className="block font-serif text-lg leading-snug" />
              <span className="mt-auto pt-4 text-xs text-white/40">{minsOf(x.p)} min read</span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Subscribe({ s }) {
  const { st, submit, reset } = useEnquiry('subscribe', 'resources');
  return (
    <div className="mt-16 rounded-3xl bg-[#F1EFE6] p-6 sm:p-10 md:p-14 grid lg:grid-cols-12 gap-8 items-center">
      <div className="lg:col-span-6">
        <Tx as="h3" text={s.subscribeHeading || 'Get new articles by email'} className="block font-serif text-3xl md:text-4xl leading-tight" />
        <Tx as="p" text={s.subscribeText || 'One short email when we publish something useful. No spam.'} className="block text-neutral-700 mt-3 leading-relaxed" />
      </div>
      <div className="lg:col-span-6" aria-live="polite">
        {st.status === 'sent' ? (
          <p className="font-serif text-2xl">You’re on the list.</p>
        ) : st.status === 'mail' ? (
          <div className="space-y-3">
            <p className="font-medium">Almost done: press Send in your email app.</p>
            <div className="flex flex-wrap gap-3">
              <a href={st.href} target="_blank" rel="noopener" className="inline-flex items-center gap-2 bg-[#231F20] text-white px-5 py-2.5 rounded-full text-sm">Open email app</a>
              <button type="button" onClick={() => reset(false)} className="inline-flex items-center gap-2 border border-black/15 px-5 py-2.5 rounded-full text-sm">Start again</button>
            </div>
          </div>
        ) : (
          <form noValidate onSubmit={(e) => { e.preventDefault(); submit(e.currentTarget); }}>
            {st.status === 'error' && <p role="alert" className="text-sm text-red-700 mb-3">That didn’t go through. Please try again.</p>}
            <div className="flex flex-col sm:flex-row gap-3">
              <label className="flex-1">
                <span className="sr-only">Email address</span>
                <input name="email" type="email" required autoComplete="email" placeholder="Your work email" defaultValue={st.values.email || ''}
                  aria-invalid={st.errors.email ? 'true' : undefined} className="w-full bg-white border border-black/10 focus:border-[#231F20] outline-none rounded-full px-5 py-3.5" />
              </label>
              <div className="hidden" aria-hidden="true"><input name="website" tabIndex={-1} autoComplete="off" /></div>
              <button type="submit" disabled={st.status === 'sending'} className="shrink-0 bg-[#231F20] hover:bg-[#B4D234] hover:text-[#231F20] text-white px-6 py-3.5 rounded-full text-sm transition-colors">
                {st.status === 'sending' ? 'Subscribing…' : 'Subscribe'}
              </button>
            </div>
            {st.errors.email && <p className="text-sm text-red-700 mt-2">{st.errors.email}</p>}
            <p className="text-xs text-neutral-500 mt-3">By subscribing you agree to receive emails from {brand.name}. Unsubscribe at any time.</p>
          </form>
        )}
      </div>
    </div>
  );
}

export function Posts({ s }) {
  const all = articlePageList();
  const cats = ['All'].concat(all.map((p) => p.article.category).filter((c, i, a) => c && a.indexOf(c) === i));
  const [cat, setCat] = useState('All');
  let list = all.filter((p) => cat === 'All' || p.article.category === cat);
  if (s.limit) list = list.slice(0, +s.limit);
  const feat = s.featured && cat === 'All' && list.length > 1 ? list[0] : null;
  const rest = list.filter((p) => p !== feat);
  return (
    <Section tone={toneOfPosts(s)}>
      <SecHead s={s} />
      {s.filters && cats.length > 2 && (
        <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter by topic">
          {cats.map((c) => (
            <button key={c} type="button" aria-pressed={c === cat} onClick={() => setCat(c)}
              className={`px-3.5 py-1.5 rounded-full text-sm border transition-colors ${c === cat ? 'bg-[#231F20] text-white border-[#231F20]' : 'bg-white/60 border-black/15 hover:border-black/40'}`}>
              {c} <span className="font-mono text-xs opacity-60">{c === 'All' ? all.length : all.filter((p) => p.article.category === c).length}</span>
            </button>
          ))}
        </div>
      )}
      {feat && <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16"><PostCard p={feat} feat /></div>}
      {s.path && cat === 'All' && <StoryPath />}
      {rest.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">{rest.map((p) => <PostCard key={p.id} p={p} />)}</div>
      ) : !feat && <p className="text-neutral-600">No articles in this topic yet.</p>}
      {s.link && s.linkLabel && <ArrowLink href={s.link} className="mt-10">{s.linkLabel}</ArrowLink>}
      {s.subscribe && <Subscribe s={s} />}
    </Section>
  );
}
const toneOfPosts = (s) => (s.tint ? 'sand' : 'paper');

export function Article({ s, page }) {
  const a = page.article;
  const r = useMemo(() => md(s.body), [s.body]);
  const { hash } = useLocation();
  const [active, setActive] = useState(null);
  const [progress, setProgress] = useState(0);

  // Reading progress and the current table-of-contents entry.
  useEffect(() => {
    const onScroll = () => {
      const pr = document.querySelector('.prose-sc');
      if (pr) { const b = pr.getBoundingClientRect(); setProgress(Math.min(1, Math.max(0, (innerHeight * 0.35 - b.top) / Math.max(1, b.height - innerHeight * 0.5)))); }
      let cur = null; r.toc.forEach((t) => { const el = document.getElementById(t.id); if (el && el.getBoundingClientRect().top < 170) cur = t.id; });
      setActive(cur);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [r, hash]);

  const ins = insightsIndex();
  const story = a ? storyPages() : [];
  const ci = story.findIndex((x) => x.p === page);
  const nx = ci >= 0 ? story[ci + 1] || (story.length > 1 ? story[0] : null) : null;
  const related = a ? articlePageList().filter((x) => x !== page && (!nx || x !== nx.p)).sort((x, y) => (y.article.category === a.category) - (x.article.category === a.category)).slice(0, 3) : [];
  const url = typeof window !== 'undefined' ? window.location.origin + '/' + page.id : '';
  const share = encodeURIComponent(url), stt = encodeURIComponent(s.heading || page.title);

  return (
    <div className="pt-32 md:pt-36">
      {a && <div className="fixed top-0 left-0 right-0 h-0.5 z-[60] pointer-events-none" aria-hidden="true"><i className="block h-full bg-[#B4D234] origin-left" style={{ transform: `scaleX(${progress})` }} /></div>}
      <section className="px-6 md:px-10 pb-16 md:pb-24">
        <div className="max-w-[1400px] mx-auto">
          {a ? (
            <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
              <header className="lg:col-span-7">
                <nav className="text-sm text-neutral-500 mb-6" aria-label="Breadcrumb">
                  {ins && <><Link to={'/' + ins.id} className="link-hover hover:text-[#231F20]">{ins.navLabel || ins.title}</Link> › </>}{a.category}
                </nav>
                <div className="inline-flex items-center gap-2 border border-black/10 bg-white/60 rounded-full px-3.5 py-1.5 mb-6 text-[10px] sm:text-xs tracking-widest uppercase text-neutral-700">
                  <span className="w-2 h-2 rounded-full bg-[#B4D234]" />{ci >= 0 ? `Chapter ${ci + 1} of ${story.length} · ${story[ci].stage}` : a.category || 'Insights'}
                </div>
                <Tx as="h1" text={s.heading || page.title} className="block font-serif text-4xl md:text-6xl leading-[1.02] tracking-[-0.02em] font-medium" />
                <Tx as="p" text={s.standfirst} className="block text-neutral-700 text-xl leading-relaxed mt-6" />
                <div className="mt-8 flex items-center gap-3 text-sm">
                  <span className="w-10 h-10 rounded-full bg-[#231F20] text-[#B4D234] font-mono text-xs flex items-center justify-center">{initials(brand.name)}</span>
                  <span><b className="block font-medium">{a.author || brand.name}</b><span className="text-neutral-500">{[fmtDate(a.date), readMinutes(r.words) + ' min read'].filter(Boolean).join(' · ')}</span></span>
                </div>
              </header>
              <Cover cat={a.category} className="lg:col-span-5 rounded-3xl aspect-[5/3]" />
            </div>
          ) : (
            <header className="max-w-[820px] mb-12">
              <Tx as="h1" text={s.heading || page.title} className="block font-serif text-5xl md:text-7xl leading-[0.95] tracking-[-0.03em] font-medium" />
              <Tx as="p" text={s.standfirst} className="block text-neutral-700 text-lg leading-relaxed mt-8" />
              {s.updated && <div className="mt-6 text-[11px] font-mono uppercase tracking-widest text-neutral-500">Last updated {fmtDate(s.updated)}</div>}
            </header>
          )}

          <div className="grid lg:grid-cols-12 gap-10">
            {r.toc.length > 1 ? (
              <nav className="hidden lg:block lg:col-span-3 self-start sticky top-28 text-sm" aria-label="On this page">
                <div className="text-xs tracking-[0.25em] uppercase text-neutral-500 mb-4">On this page</div>
                <ul className="space-y-2.5 border-l border-black/10">
                  {r.toc.map((t) => (
                    <li key={t.id}>
                      <a href={'#' + t.id} onClick={(e) => { e.preventDefault(); document.getElementById(t.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                        className={`block -ml-px pl-4 border-l transition-colors ${active === t.id ? 'border-[#231F20] text-[#231F20]' : 'border-transparent text-neutral-500 hover:text-[#231F20]'}`}
                        dangerouslySetInnerHTML={{ __html: mdInline(t.text) }} />
                    </li>
                  ))}
                </ul>
              </nav>
            ) : <div className="hidden lg:block lg:col-span-3" />}
            <div className="lg:col-span-8 xl:col-span-7">
              {(s.takeaways || []).length > 0 && (
                <div className="rounded-2xl bg-[#231F20] text-white p-6 md:p-8 mb-10">
                  <div className="text-xs tracking-[0.3em] uppercase text-neutral-500 mb-4">/ Key takeaways</div>
                  <ul className="space-y-3">{s.takeaways.map((x, i) => <li key={i} className="flex gap-3 text-white/85"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#B4D234] shrink-0" /><Tx text={x} /></li>)}</ul>
                </div>
              )}
              <div className="prose-sc" dangerouslySetInnerHTML={{ __html: r.html }} />
              {a && (
                <div className="mt-12 pt-6 border-t border-black/10 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                  <span className="text-xs tracking-[0.25em] uppercase text-neutral-500">Share</span>
                  <a className="link-hover" href={'https://www.linkedin.com/sharing/share-offsite/?url=' + share} target="_blank" rel="noopener">LinkedIn</a>
                  <a className="link-hover" href={'https://x.com/intent/post?url=' + share + '&text=' + stt} target="_blank" rel="noopener">X</a>
                  <a className="link-hover" href={'https://www.facebook.com/sharer/sharer.php?u=' + share} target="_blank" rel="noopener">Facebook</a>
                  <a className="link-hover" href={'mailto:?subject=' + stt + '&body=' + share}>Email</a>
                  <CopyLink url={url} />
                </div>
              )}
              {nx && (
                <Link to={'/' + nx.p.id} className="group mt-12 grid sm:grid-cols-5 rounded-3xl overflow-hidden border border-black/10 bg-white hover:border-[#231F20] transition-colors">
                  <span className="sm:col-span-3 p-6 md:p-8 flex flex-col">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">{ci === story.length - 1 ? 'Back to the start · Chapter 1' : `Next in the story · Chapter ${ci + 2}`} · {nx.stage}</span>
                    <Tx text={nx.p.title} className="block font-serif text-2xl md:text-3xl leading-tight mt-3" />
                    {nx.p.article.excerpt && <Tx text={nx.p.article.excerpt} className="block text-sm text-neutral-600 mt-3 leading-relaxed" />}
                    <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm">Keep reading <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" /></span>
                  </span>
                  <Cover cat={nx.p.article.category} className="sm:col-span-2 min-h-[160px]" />
                </Link>
              )}
              {s.ctaHeading && (
                <div className="mt-12 rounded-3xl bg-[#F1EFE6] p-6 md:p-10">
                  <Tx as="h2" text={s.ctaHeading} className="block font-serif text-3xl md:text-4xl leading-tight" />
                  <Tx as="p" text={s.ctaText} className="block text-neutral-700 mt-3 mb-6 leading-relaxed" />
                  <PrimaryBtn href="#contact">{s.ctaLabel || 'Talk to our team'}</PrimaryBtn>
                </div>
              )}
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-20 md:mt-28">
              <Eyebrow text="Keep reading" />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">{related.map((x) => <PostCard key={x.id} p={x} />)}</div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function CopyLink({ url }) {
  const [t, setT] = useState('Copy link');
  return (
    <button type="button" className="link-hover" onClick={() => {
      const done = (ok) => { setT(ok ? 'Link copied' : 'Copy failed'); setTimeout(() => setT('Copy link'), 2000); };
      try { navigator.clipboard.writeText(url).then(() => done(true), () => done(false)); } catch (e) { done(false); }
    }}>{t}</button>
  );
}


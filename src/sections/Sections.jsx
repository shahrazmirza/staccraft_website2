import React, { useState } from 'react';
import { Check, Plus, Play, ArrowUpRight } from 'lucide-react';
import { icon, ICON, baSvg, syncSvg, tenantsSvg, flowSvg, FLOWS, CALC_FIELDS } from '../legacy/visuals';
import { brand, asset } from '../site';
import {
  Tx, Heading, Section, SecHead, Eyebrow, Note, Ticks, Buttons, ArrowLink, SmartLink, PrimaryBtn, toneOf,
} from '../components/ui';
import Visual, { BrowserFrame } from '../components/Visual';
import { setPrefill } from '../prefill';

const pad = (n) => String(n).padStart(2, '0');
const erpIn = () => (brand.erpName || '').trim() || 'your ERP';

// Grid columns for n cards, so no card sits alone on a row.
const cols = (n) => (n % 3 === 0 ? 'md:grid-cols-2 lg:grid-cols-3' : n % 4 === 0 ? 'md:grid-cols-2 xl:grid-cols-4' : n === 5 ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5' : 'md:grid-cols-2');

// Line icon from the original site's set, inside an icon circle.
const IconCircle = ({ name, className = 'border border-black/20 group-hover:border-[#B4D234] group-hover:bg-[#B4D234] text-neutral-800 group-hover:text-[#231F20]' }) =>
  ICON[name] ? (
    <span className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors shrink-0 [&_svg]:w-5 [&_svg]:h-5 ${className}`}
      dangerouslySetInnerHTML={{ __html: icon(name) }} />
  ) : null;

/* ---------- Benefits: short numbered points ---------- */
export function Benefits({ s }) {
  const items = s.items || [];
  return (
    <Section tone={toneOf(s)}>
      {s.heading && <Heading text={s.heading} className="font-serif text-3xl md:text-5xl leading-[1.05] tracking-tight mb-10 md:mb-12 max-w-3xl" />}
      <div className={`grid gap-4 ${cols(items.length)}`}>
        {items.map((it, i) => (
          <div key={i} className="bg-white/60 border border-black/10 rounded-2xl p-7 md:p-8">
            <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-6">// {pad(i + 1)}</div>
            <Tx as="h3" text={it.title} className="block font-serif text-2xl mb-3" />
            <Tx as="p" text={it.text} className="block text-sm text-neutral-700 leading-relaxed" />
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Cards: icon cards, optionally linked (hover inverts to ink) ---------- */
export function Cards({ s }) {
  const items = s.items || [];
  return (
    <Section tone={toneOf(s)}>
      <SecHead s={s} />
      <div className={`grid gap-4 ${cols(items.length)}`}>
        {items.map((it, i) => {
          const body = (
            <>
              <div className="flex items-center justify-between gap-4 mb-6 md:mb-8">
                {ICON[it.icon] ? <IconCircle name={it.icon} /> : <span />}
                <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 group-hover:text-white/40 transition-colors text-right">{it.tag || pad(i + 1)}</span>
              </div>
              <Tx as="h3" text={it.title} className="block font-serif text-2xl md:text-[28px] leading-tight mb-3 text-[#231F20] group-hover:text-white transition-colors" />
              <Tx as="p" text={it.text} className="block text-sm text-neutral-600 group-hover:text-white/70 transition-colors leading-relaxed" />
            </>
          );
          const cls = 'group relative bg-white/50 border border-black/10 rounded-2xl p-6 md:p-7 transition-all duration-300 flex flex-col';
          return it.link ? (
            <SmartLink key={i} href={it.link} className={`${cls} hover:bg-[#231F20] hover:border-[#231F20]`}>
              {body}
              <div className="mt-auto pt-5 md:pt-6"><div className="pt-5 border-t border-black/10 group-hover:border-white/10 flex items-center justify-between text-sm text-neutral-800 group-hover:text-white transition-colors">
                <span>{it.linkLabel || 'Learn more'}</span><ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
              </div></div>
            </SmartLink>
          ) : (
            <div key={i} className={cls}>{body}</div>
          );
        })}
      </div>
    </Section>
  );
}

/* ---------- Flow: numbered steps (style "chain" adds a connecting rail) ---------- */
export function Flow({ s }) {
  const st = s.steps || [];
  const chain = s.style === 'chain';
  return (
    <Section tone={chain ? 'sand' : toneOf(s)}>
      <SecHead s={s} />
      <ol className={`grid gap-4 ${cols(st.length)} ${st.length === 6 ? 'xl:grid-cols-6' : ''}`}>
        {st.map((x, i) => (
          <li key={i} className="relative bg-white border border-black/10 rounded-2xl p-6 md:p-7">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-10 rounded-full bg-[#231F20] text-[#B4D234] font-mono text-xs flex items-center justify-center shrink-0">{pad(i + 1)}</span>
              {chain && i < st.length - 1 && <span className="flex-1 h-px bg-black/15" aria-hidden="true" />}
            </div>
            <Tx as="h3" text={x.title} className="block font-serif text-xl md:text-2xl mb-2.5" />
            <Tx as="p" text={x.text} className="block text-sm text-neutral-600 leading-relaxed" />
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* ---------- Split: copy beside a visual ---------- */
export function Split({ s }) {
  const hasVisual = s.visual && s.visual !== 'none' && (s.visual !== 'image' || s.image);
  const copy = (
    <div>
      <Eyebrow text={s.eyebrow} />
      <Heading text={s.heading} className="font-serif text-4xl md:text-5xl leading-[1.05] tracking-tight mb-5" />
      <Tx as="p" text={s.text} className="block text-neutral-700 text-lg leading-relaxed mb-6" />
      <Ticks items={s.bullets} />
      {s.link && s.linkLabel && <ArrowLink href={s.link} className="mt-7">{s.linkLabel}</ArrowLink>}
    </div>
  );
  const grid = hasVisual ? (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
      <div className={`min-w-0 lg:col-span-5 ${s.reverse ? 'lg:order-2' : ''}`}>{copy}</div>
      <div className={`min-w-0 lg:col-span-7 ${s.reverse ? 'lg:order-1' : ''}`}><Visual s={s} /></div>
    </div>
  ) : <div className="max-w-3xl">{copy}</div>;
  return (
    <Section anchor={s.anchor} className={s.panel ? 'py-8 md:py-12' : ''}>
      {s.panel ? <div className="rounded-3xl bg-[#F1EFE6] border border-black/5 p-6 sm:p-10 md:p-14">{grid}</div> : grid}
    </Section>
  );
}

/* ---------- Tabs: list of parts on the left, detail panel on the right ---------- */
export function Tabs({ s }) {
  const t = s.tabs || [];
  const [a, setA] = useState(0);
  const cur = t[a] || {};
  return (
    <Section anchor={s.anchor} tone={toneOf(s)}>
      <SecHead s={s} />
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-1 self-start lg:sticky lg:top-28" role="tablist">
          {t.map((x, i) => (
            <button key={i} type="button" role="tab" aria-selected={i === a} onClick={() => setA(i)}
              className={`w-full text-left flex items-center gap-4 px-4 py-4 rounded-xl border transition-all ${i === a ? 'bg-[#231F20] text-white border-[#231F20]' : 'bg-white/50 border-black/10 hover:border-black/40'}`}>
              <span className={`text-[10px] font-mono tracking-widest ${i === a ? 'text-[#B4D234]' : 'opacity-60'}`}>{pad(i + 1)}</span>
              <span className="flex-1 font-serif text-xl">{x.title}</span>
              {i === a && <ArrowUpRight className="w-4 h-4" />}
            </button>
          ))}
        </div>
        <div key={a} role="tabpanel" className="lg:col-span-8 fade-up bg-[#F1EFE6] rounded-3xl p-6 sm:p-8 md:p-12 border border-black/5">
          <span className="font-mono text-xs text-neutral-500">PART // {pad(a + 1)}</span>
          <Tx as="h3" text={cur.title} className="block font-serif text-4xl md:text-5xl leading-[1] tracking-tight mt-6 mb-5" />
          <Tx as="p" text={cur.text} className="block text-neutral-700 text-lg leading-relaxed max-w-2xl mb-8" />
          {(cur.bullets || []).length > 0 && (
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
              {cur.bullets.map((b, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-[#231F20] flex items-center justify-center shrink-0"><Check className="w-3 h-3 text-[#B4D234]" /></span>
                  <Tx text={b} className="text-neutral-800" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}

/* ---------- Stats ---------- */
export function Stats({ s }) {
  const items = s.items || [];
  const c = items.length % 4 === 0 ? 'lg:grid-cols-4' : 'lg:grid-cols-3';
  return (
    <Section>
      <Eyebrow text={s.eyebrow} />
      {s.heading && <Heading text={s.heading} className="font-serif text-3xl md:text-5xl leading-[1.05] tracking-tight mb-10 md:mb-14 max-w-3xl" />}
      <div className={`grid grid-cols-1 sm:grid-cols-2 ${c} gap-x-6 gap-y-10`}>
        {items.map((it, i) => {
          const ph = /\[/.test(it.value || '');
          return (
            <div key={i} className="border-t border-black/20 pt-6">
              <Tx text={it.value} className={`block font-serif leading-none tracking-tight [overflow-wrap:anywhere] ${ph ? 'text-2xl md:text-3xl' : 'text-5xl md:text-7xl'}`} />
              <Tx as="p" text={it.label} className="block mt-4 md:mt-6 text-sm text-neutral-700 max-w-[300px] leading-relaxed" />
            </div>
          );
        })}
      </div>
      <Note text={s.note} />
    </Section>
  );
}

/* ---------- Integrations: ink band, divided grid ---------- */
export function Integrations({ s }) {
  const items = s.items || [];
  return (
    <Section tone="ink">
      <SecHead s={s} dark />
      <div className={`grid gap-px bg-white/10 ${items.length % 4 === 0 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
        {items.map((it, i) => (
          <div key={i} className="bg-[#231F20] py-6 md:p-8 hover:bg-[#1c1c1c] transition-colors">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-4">
              <Tx text={it.name} className="font-serif text-2xl md:text-3xl" />
              {it.short && <span className="font-mono text-xs text-white/40">{it.short}</span>}
            </div>
            <Tx as="p" text={it.text} className="block text-white/60 text-sm leading-relaxed" />
          </div>
        ))}
      </div>
      {s.link && s.linkLabel && <ArrowLink href={s.link} className="mt-10 text-white">{s.linkLabel}</ArrowLink>}
    </Section>
  );
}

/* ---------- FAQ ---------- */
export function Faq({ s }) {
  return (
    <Section tone={toneOf(s)}>
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <Eyebrow text="Questions" />
          <Heading text={s.heading} className="font-serif text-4xl md:text-5xl leading-[1.05] tracking-tight" />
        </div>
        <div className="lg:col-span-8 divide-y divide-black/10 border-y border-black/10">
          {(s.items || []).map((it, i) => (
            <details key={i} className="group py-6">
              <summary className="flex items-start justify-between gap-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <Tx text={it.q} className="font-serif text-xl md:text-2xl" />
                <span className="mt-1 w-8 h-8 rounded-full border border-black/15 flex items-center justify-center shrink-0 transition-transform group-open:rotate-45"><Plus className="w-4 h-4" /></span>
              </summary>
              <Tx as="p" text={it.a} className="block mt-4 text-neutral-700 leading-relaxed max-w-3xl" />
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- Statement: one big sentence; {braces} mark the accent ---------- */
export function Statement({ s }) {
  return (
    <Section tone={toneOf(s)} className="md:py-28">
      <Eyebrow text={s.eyebrow} />
      <Heading as="p" text={s.text} className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.04] tracking-tight max-w-5xl" />
      <Tx as="p" text={s.sub} className="block text-neutral-700 text-lg leading-relaxed max-w-2xl mt-8" />
      {s.link && s.linkLabel && <ArrowLink href={s.link} className="mt-8">{s.linkLabel}</ArrowLink>}
    </Section>
  );
}

/* ---------- RichText ---------- */
export function RichText({ s }) {
  const paras = String(s.body || '').split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  return (
    <Section tone={toneOf(s)}>
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5">
          <Eyebrow text={s.eyebrow} />
          <Heading text={s.heading} className="font-serif text-4xl md:text-5xl leading-[1.05] tracking-tight" />
        </div>
        <div className="lg:col-span-6 lg:col-start-7 space-y-5 text-lg text-neutral-700 leading-relaxed">
          {paras.map((p, i) => <Tx as="p" key={i} text={p} className="block" />)}
        </div>
      </div>
    </Section>
  );
}

/* ---------- CTA panel ---------- */
export function Cta({ s }) {
  return (
    <section className="px-6 md:px-10 py-16 md:py-20">
      <div className="max-w-[1400px] mx-auto rounded-3xl bg-[#F1EFE6] p-8 md:p-16 grid lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-8">
          <Eyebrow text="Next step" />
          <Heading auto text={s.heading} className="font-serif text-4xl md:text-5xl leading-[1.05] tracking-tight" />
          <Tx as="p" text={s.text} className="block text-neutral-700 text-lg leading-relaxed mt-5 max-w-2xl" />
        </div>
        <Buttons s={s} className="lg:col-span-4 lg:justify-end" />
      </div>
    </section>
  );
}

/* ---------- Video ---------- */
export function Video({ s }) {
  return (
    <Section tone={toneOf(s)}>
      <SecHead s={s} />
      {s.video ? (
        <video controls preload="none" src={asset(s.video)} poster={s.poster ? asset(s.poster) : undefined} className="w-full rounded-3xl bg-black" />
      ) : (
        <div className="aspect-[16/9] md:aspect-[21/9] rounded-3xl border border-dashed border-black/20 bg-[#F1EFE6] flex flex-col items-center justify-center gap-5">
          <span className="w-16 h-16 rounded-full bg-[#231F20] flex items-center justify-center"><Play className="w-6 h-6 text-[#B4D234] fill-[#B4D234]" /></span>
          <Tx text={s.placeholder || '[Platform tour video]'} className="font-mono text-sm text-neutral-500" />
        </div>
      )}
    </Section>
  );
}

/* ---------- Diagrams (SVG from the original site) ---------- */
// Wide SVG diagram on large screens; below 1024px `mobile` shows a stacked version instead,
// so nothing scrolls sideways on a phone or tablet.
function Diagram({ html, caption, mobile }) {
  return (
    <figure>
      <div className={`${mobile ? 'hidden lg:block' : ''} rounded-3xl border border-black/10 bg-white p-4 md:p-8`}>
        <div className="mk" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
      {mobile && <div className="lg:hidden">{mobile}</div>}
      {caption && <Tx as="figcaption" text={caption} className="block mt-5 text-sm text-neutral-600 max-w-3xl leading-relaxed" />}
    </figure>
  );
}

const Chip = ({ children, dark }) => (
  <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm ${dark ? 'bg-white/10 text-white' : 'bg-white border border-black/10'}`}>{children}</span>
);

// Phone version of the before/after diagram (same wording as the SVG).
const BA_TODAY = [['Web store', 'copied'], ['Spreadsheet', 'emailed'], ['Email', 'chased'], ['Phone', 'called'], ['Supplier', 'typed in again'], ['ERP', '']];
function BeforeAfterMobile() {
  return (
    <div className="grid gap-4">
      <div className="rounded-3xl bg-white border border-black/10 p-6">
        <div className="font-serif text-2xl">Today</div>
        <p className="text-sm text-neutral-600 mt-1 mb-5">Six tools, and the order is typed in again at every hand-off</p>
        <ol className="space-y-1.5">
          {BA_TODAY.map(([n, how]) => (
            <li key={n}>
              <span className="inline-flex px-3 py-1.5 rounded-lg text-sm border border-black/15 bg-[#F1EFE6]">{n}</span>
              {how && <span className="block pl-4 py-1 text-xs font-mono text-neutral-500">↓ {how}</span>}
            </li>
          ))}
        </ol>
        <p className="mt-5 text-xs font-mono uppercase tracking-widest text-neutral-500">3 re-keys · 3 chases · 0 shared view</p>
      </div>
      <div className="rounded-3xl bg-[#231F20] text-white p-6">
        <div className="font-serif text-2xl">With {brand.name}</div>
        <p className="text-sm text-white/60 mt-1 mb-5">One platform. Every system connected. Nothing typed twice.</p>
        <div className="inline-flex px-4 py-2 rounded-full bg-[#B4D234] text-[#231F20] font-medium mb-4">{brand.name}</div>
        <div className="flex flex-wrap gap-2">{['Web store', 'Dealers', 'Suppliers', erpIn().replace(/^your/, 'Your'), 'Warehouse'].map((n) => <Chip key={n} dark>↔ {n}</Chip>)}</div>
        <p className="mt-5 text-xs font-mono uppercase tracking-widest text-[#B4D234]">0 re-keys · every update visible to everyone</p>
      </div>
    </div>
  );
}

// Phone version of the "one platform, many businesses" diagram.
function TenantsMobile({ s }) {
  return (
    <div className="grid gap-3">
      <div className="grid sm:grid-cols-2 gap-3">
        {(s.businesses || []).map((t, i) => (
          <div key={i} className={`rounded-2xl p-5 ${t.next ? 'border-2 border-dashed border-black/25' : 'bg-white border border-black/10'}`}>
            <Tx text={t.kind} className="block text-[10px] font-mono uppercase tracking-widest text-neutral-500" />
            <Tx text={t.name} className="block font-serif text-xl mt-1 mb-2" />
            <ul className="text-sm text-neutral-600 space-y-0.5">{(t.lines || []).map((l, k) => <li key={k}><Tx text={l} /></li>)}</ul>
            {(t.sports || []).length > 0 && <div className="flex flex-wrap gap-1.5 mt-3">{t.sports.map((x) => <span key={x} className="px-2.5 py-0.5 rounded-full text-xs bg-[#F1EFE6]">{x === 'Australian rules' ? 'Aussie rules' : x}</span>)}</div>}
          </div>
        ))}
      </div>
      <div className="rounded-2xl bg-[#231F20] text-white p-5">
        <div className="font-serif text-2xl">{brand.name} platform</div>
        <p className="text-sm text-white/60 mt-1 mb-4">Shared by every business · each with its own database, branding and rules</p>
        <div className="flex flex-wrap gap-2">{(s.services || []).map((v) => <Chip key={v} dark><Tx text={v} /></Chip>)}</div>
      </div>
    </div>
  );
}

// Phone version of the ERP sync map: the two systems; the row list below the figure carries the detail.
function SyncMobile({ s }) {
  const Box = ({ title, sub, items, dark }) => (
    <div className={`rounded-2xl p-5 ${dark ? 'bg-[#231F20] text-white' : 'bg-white border border-black/10'}`}>
      <div className="font-serif text-2xl">{title}</div>
      {sub && <Tx as="p" text={sub} className={`block text-sm mt-1 mb-3 ${dark ? 'text-white/60' : 'text-neutral-600'}`} />}
      <div className="flex flex-wrap gap-2">{(items || []).map((x) => <Chip key={x} dark={dark}><Tx text={x} /></Chip>)}</div>
    </div>
  );
  return (
    <div className="grid gap-2">
      <Box title={brand.name} sub={s.usSub || 'Stores, portals & admin'} items={s.usItems} dark />
      <div className="text-center font-mono text-sm text-neutral-500" aria-hidden="true">⇅ {(s.rows || []).length} data flows</div>
      <Box title={s.system || 'Your ERP'} sub={s.systemSub} items={s.systemItems} />
    </div>
  );
}

export const BeforeAfter = ({ s }) => (
  <Section anchor={s.anchor} tone={toneOf(s)}><SecHead s={s} /><Diagram html={baSvg()} caption={s.caption} mobile={<BeforeAfterMobile />} /></Section>
);

export const Tenants = ({ s }) => (
  <Section anchor={s.anchor} tone={toneOf(s)}><SecHead s={s} /><Diagram html={tenantsSvg(s)} caption={s.caption} mobile={<TenantsMobile s={s} />} /></Section>
);

export function Syncmap({ s }) {
  const rows = s.rows || [];
  const arrow = (d) => (d === 'from' ? '←' : d === 'both' ? '↔' : '→');
  const dirLabel = (d) => (d === 'from' ? 'into StacCraft' : d === 'both' ? 'both ways' : 'out of StacCraft');
  return (
    <Section anchor={s.anchor} tone={toneOf(s)}>
      <SecHead s={s} />
      <Diagram html={syncSvg(s)} caption={s.caption} mobile={<SyncMobile s={s} />} />
      {rows.some((r) => r.text) && (
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
          {rows.map((r, i) => (
            <div key={i} className="border-t border-black/15 pt-5">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-[#231F20] bg-[#B4D234] rounded-full w-7 h-7 flex items-center justify-center text-sm" aria-label={dirLabel(r.dir)}>{arrow(r.dir)}</span>
                <Tx text={r.label} className="font-serif text-xl" />
              </div>
              <Tx as="p" text={r.text} className="block text-sm text-neutral-600 leading-relaxed" />
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}

/* ---------- Follow one order: B2B / B2C flow diagram ---------- */
export function E2EFlow({ s }) {
  const mode = s.flows || 'b2b';
  const [pick, setPick] = useState(s.defaultFlow || 'b2b');
  const cur = mode === 'both' ? pick : mode;
  const steps = cur === 'b2c' ? s.stepsB2C || [] : s.steps || [];
  const cap = cur === 'b2c' ? s.captionB2C || s.caption : s.caption;
  const F = FLOWS[cur] || FLOWS.b2b;
  return (
    <Section anchor={s.anchor} tone={toneOf(s)}>
      <SecHead s={s} />
      {mode === 'both' && (
        <div className="inline-flex gap-1 bg-white border border-black/10 rounded-full p-1 mb-6" role="tablist" aria-label="Choose a flow">
          {[['b2b', 'B2B: trade orders'], ['b2c', 'B2C: shoppers']].map(([k, l]) => (
            <button key={k} type="button" role="tab" aria-selected={cur === k} onClick={() => setPick(k)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${cur === k ? 'bg-[#231F20] text-white' : 'text-neutral-700 hover:text-black'}`}>{l}</button>
          ))}
        </div>
      )}
      <Diagram html={flowSvg(F)} mobile={<span />} />
      <div className="hidden lg:flex mt-4 flex-wrap gap-x-6 gap-y-2 text-xs text-neutral-600">
        <span className="inline-flex items-center gap-2"><i className="w-6 h-0.5 bg-[#6f8a12]" />Notification or hand-off</span>
        <span className="inline-flex items-center gap-2"><i className="w-6 border-t-2 border-dashed border-[#B4D234]" />{F.gold}</span>
        <span className="inline-flex items-center gap-2"><i className="w-6 border-t-2 border-dashed border-neutral-400" />Posted to {erpIn()}</span>
      </div>
      <Tx as="p" text={cap} className="block mt-5 text-sm text-neutral-600 max-w-3xl leading-relaxed" />
      {steps.length > 0 && (
        <ol className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
          {steps.map((x, i) => (
            <li key={i} className="flex gap-4 border-t border-black/15 pt-5">
              <span className="font-mono text-xs text-neutral-500 pt-1 shrink-0">{pad(i + 1)}</span>
              <span><Tx text={x.title} className="block font-serif text-xl mb-1" /><Tx text={x.text} className="block text-sm text-neutral-600 leading-relaxed" /></span>
            </li>
          ))}
        </ol>
      )}
    </Section>
  );
}

/* ---------- Stages: every step, with what happens when it goes wrong ---------- */
export function Stages({ s }) {
  const ex = (b) => {
    const p = String(b).split(' → ');
    return p.length > 1 ? <><Tx text={p[0]} className="font-medium text-[#231F20]" /> → <Tx text={p.slice(1).join(' → ')} /></> : <Tx text={b} />;
  };
  return (
    <Section anchor={s.anchor} tone={toneOf(s)}>
      <SecHead s={s} />
      <ol className="divide-y divide-black/10 border-y border-black/10">
        {(s.items || []).map((x, i) => (
          <li key={i} className="grid lg:grid-cols-12 gap-6 py-10">
            <div className="lg:col-span-1 font-mono text-sm text-neutral-500">{pad(i + 1)}</div>
            <div className="lg:col-span-11">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 mb-3">
                <Tx as="h3" text={x.title} className="font-serif text-2xl md:text-3xl" />
                {x.who && <Tx text={x.who} className="px-3 py-1 rounded-full text-xs bg-white border border-black/10" />}
                {x.module && <Tx text={x.module} className="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-widest bg-[#231F20] text-white" />}
              </div>
              <Tx as="p" text={x.text} className="block text-neutral-700 leading-relaxed max-w-3xl mb-6" />
              <div className="grid md:grid-cols-2 gap-6">
                {(x.steps || []).length > 0 && (
                  <div><div className="text-xs tracking-[0.25em] uppercase text-neutral-500 mb-3">What happens</div><Ticks items={x.steps} /></div>
                )}
                {(x.exceptions || []).length > 0 && (
                  <div className="rounded-2xl bg-[#F1EFE6] border border-black/5 p-5 md:p-6">
                    <div className="text-xs tracking-[0.25em] uppercase text-neutral-500 mb-3">When it doesn’t go to plan</div>
                    <ul className="space-y-2.5 text-sm text-neutral-700 leading-relaxed">
                      {x.exceptions.map((b, k) => <li key={k} className="flex gap-3"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#231F20] shrink-0" /><span>{ex(b)}</span></li>)}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
      <Note text={s.note} />
    </Section>
  );
}

/* ---------- Compare table ---------- */
export function Compare({ s }) {
  const c = s.columns || [];
  return (
    <Section anchor={s.anchor} tone={toneOf(s)}>
      <SecHead s={s} />
      {/* Phones and tablets: one card per row */}
      <div className="lg:hidden grid sm:grid-cols-2 gap-3">
        {(s.rows || []).map((r, k) => (
          <div key={k} className="rounded-2xl bg-white border border-black/10 overflow-hidden">
            <Tx text={r.feature} className="block px-5 pt-5 pb-3 font-serif text-xl" />
            {c.map((h, i) => (
              <div key={i} className={`px-5 py-3 text-sm leading-relaxed ${i === 0 ? 'bg-[#B4D234]/10 text-neutral-900' : 'text-neutral-500 border-t border-black/5'}`}>
                <span className="block text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-1">{h}</span>
                <span className="flex gap-2">{i === 0 && <Check className="w-4 h-4 mt-0.5 shrink-0" />}<Tx text={(r.values || [])[i]} /></span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="hidden lg:block rounded-3xl border border-black/10 bg-white overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr>
              <th className="p-5 md:p-6 w-[28%]" />
              {c.map((h, i) => (
                <th key={i} scope="col" className={`p-5 md:p-6 font-serif text-xl font-normal ${i === 0 ? 'bg-[#231F20] text-white' : 'text-neutral-600'}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(s.rows || []).map((r, k) => (
              <tr key={k} className="border-t border-black/10">
                <Tx as="td" text={r.feature} className="p-5 md:p-6 font-medium text-[#231F20] align-top" />
                {c.map((_, i) => (
                  <td key={i} className={`p-5 md:p-6 align-top leading-relaxed ${i === 0 ? 'bg-[#B4D234]/10 text-neutral-900' : 'text-neutral-500'}`}>
                    <span className="flex gap-2.5">{i === 0 && <Check className="w-4 h-4 mt-0.5 shrink-0" />}<Tx text={(r.values || [])[i]} /></span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Note text={s.note} />
    </Section>
  );
}

/* ---------- Stack: a typical stack of subscriptions vs one platform ---------- */
export function Stack({ s }) {
  const it = (s.items || []).filter((x) => x && (x.need || x.typical));
  return (
    <Section anchor={s.anchor} tone={toneOf(s)}>
      <SecHead s={s} />
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="rounded-3xl bg-white border border-black/10 p-6 md:p-10">
          <Tx as="h3" text={s.themLabel || 'A typical setup'} className="block font-serif text-3xl" />
          <Tx as="p" text={s.themSub} className="block text-sm text-neutral-500 mt-2 mb-6" />
          <ul className="divide-y divide-black/10 border-y border-black/10">
            {it.map((x, i) => (
              <li key={i} className="flex items-center justify-between gap-4 py-3 text-sm">
                <Tx text={x.typical || x.need} className="text-neutral-700" />
                {x.kind && <Tx text={x.kind} className="shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest bg-[#F1EFE6] text-neutral-600" />}
              </li>
            ))}
          </ul>
          <Tx as="p" text={s.themFoot} className="block mt-6 text-sm font-medium text-neutral-800" />
        </div>
        <div className="rounded-3xl bg-[#231F20] text-white p-6 md:p-10">
          <Tx as="h3" text={s.usLabel || 'StacCraft'} className="block font-serif text-3xl" />
          <Tx as="p" text={s.usSub} className="block text-sm text-white/50 mt-2 mb-6" />
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {it.map((x, i) => (
              <li key={i} className="flex items-center justify-between gap-4 py-3 text-sm">
                <Tx text={x.need || x.typical} className="text-white/80" />
                <span className="shrink-0 inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[#B4D234]"><Check className="w-3.5 h-3.5" />Included</span>
              </li>
            ))}
          </ul>
          <Tx as="p" text={s.usFoot} className="block mt-6 text-sm text-white/70 leading-relaxed" />
        </div>
      </div>
      <Note text={s.note} />
    </Section>
  );
}

/* ---------- Module picker ---------- */
export function Modules({ s }) {
  const items = (s.items || []).filter((x) => x && x.id);
  const [sel, setSel] = useState(() => new Set(items.filter((x) => x.core || x.on).map((x) => x.id)));
  const byId = Object.fromEntries(items.map((x) => [x.id, x]));
  const groups = [];
  items.forEach((x) => { const g = x.group || ''; let G = groups.find((y) => y.g === g); if (!G) { G = { g, items: [] }; groups.push(G); } G.items.push(x); });
  const chosen = items.filter((x) => sel.has(x.id));
  const num = (p) => (/\d/.test(p || '') && !/\[/.test(p || '') ? parseFloat(String(p).replace(/[^0-9.]/g, '')) : NaN);
  const total = chosen.reduce((a, x) => a + num(x.price), 0);
  const toggle = (it) => {
    if (it.core) return;
    const next = new Set(sel);
    const req = (x) => (x && x.requires) || [];
    if (next.has(it.id)) {
      // Switching a module off also switches off anything that needs it.
      const drop = new Set([it.id]); let grew = true;
      while (grew) { grew = false; items.forEach((x) => { if (!drop.has(x.id) && next.has(x.id) && req(x).some((r) => drop.has(r))) { drop.add(x.id); grew = true; } }); }
      drop.forEach((d) => next.delete(d));
    } else {
      const add = (x) => { if (!x || next.has(x.id)) return; next.add(x.id); req(x).forEach((r) => add(byId[r])); };
      add(it);
    }
    setSel(next);
  };
  return (
    <Section anchor={s.anchor} tone={toneOf(s)}>
      <SecHead s={s} />
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {groups.map((G) => (
            <div key={G.g}>
              {G.g && <div className="text-xs tracking-[0.25em] uppercase text-neutral-500 mb-3">{G.g}</div>}
              <div className="grid sm:grid-cols-2 gap-3">
                {G.items.map((x) => {
                  const on = sel.has(x.id);
                  return (
                    <button key={x.id} type="button" onClick={() => toggle(x)} aria-pressed={on} aria-disabled={x.core || undefined}
                      className={`text-left rounded-2xl border p-5 transition-colors flex gap-4 ${on ? 'bg-white border-[#231F20]' : 'bg-white/40 border-black/10 hover:border-black/40'} ${x.core ? 'cursor-default' : ''}`}>
                      <span className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${on ? 'bg-[#231F20] border-[#231F20]' : 'border-black/25'}`}>{on && <Check className="w-3 h-3 text-[#B4D234]" />}</span>
                      <span className="flex-1">
                        <Tx text={x.name} className="block font-serif text-xl leading-tight" />
                        <Tx text={x.text} className="block text-sm text-neutral-600 leading-relaxed mt-1.5" />
                        {x.core ? <span className="block mt-2 text-[10px] font-mono uppercase tracking-widest text-neutral-500">Always included</span>
                          : (x.requires || []).length > 0 && <span className="block mt-2 text-[10px] font-mono uppercase tracking-widest text-neutral-500">Needs {x.requires.map((r) => (byId[r] || {}).name || r).join(', ')}</span>}
                        {s.showPrices && <Tx text={x.price || '[Price]'} className="block mt-2 font-mono text-xs" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <aside className="lg:col-span-4 self-start lg:sticky lg:top-28 rounded-3xl bg-[#231F20] text-white p-6 md:p-8" aria-live="polite">
          <div className="text-xs tracking-[0.3em] uppercase text-neutral-500 mb-3">/ {s.summaryLabel || 'Your platform'}</div>
          <div className="font-serif text-4xl mb-5">{chosen.length} of {items.length} parts</div>
          <ul className="space-y-2 text-sm text-white/80 mb-6">
            {chosen.map((x) => (
              <li key={x.id} className="flex items-start justify-between gap-3">
                <span className="flex gap-2"><Check className="w-4 h-4 text-[#B4D234] mt-0.5 shrink-0" /><Tx text={x.name} /></span>
                {s.showPrices && <Tx text={x.price || '[Price]'} className="font-mono text-xs" />}
              </li>
            ))}
          </ul>
          {s.showPrices && (
            <div className="flex justify-between border-t border-white/10 pt-4 mb-4">
              <span>Total</span>
              <b>{chosen.length && !isNaN(total) ? '$' + total.toLocaleString('en-AU') + (s.unit ? ' ' + s.unit : '') : <Tx text={s.totalPlaceholder || '[Quoted per business]'} />}</b>
            </div>
          )}
          <Tx as="p" text={s.summaryNote} className="block text-sm text-white/60 leading-relaxed mb-6" />
          <div className="flex flex-col items-start gap-4">
            <PrimaryBtn dark href={s.primaryLink || '#contact'}
              onClick={() => setPrefill("I'm interested in: " + chosen.map((x) => String(x.name).replace(/[[\]]/g, '')).join(', ') + '.')}>
              {s.primaryLabel || 'Talk to us about this set'}
            </PrimaryBtn>
            {s.secondaryLabel && <ArrowLink href={s.secondaryLink} className="text-white">{s.secondaryLabel}</ArrowLink>}
          </div>
        </aside>
      </div>
    </Section>
  );
}

/* ---------- Cost calculator ---------- */
export function Calc({ s }) {
  const [v, setV] = useState(() => Object.fromEntries(CALC_FIELDS.map((f) => [f.k, f.d])));
  const n = (k) => Math.max(0, +v[k] || 0);
  const hrs = (n('pos') * n('poMin') + n('inv') * n('invMin') + n('ord') * n('ordMin')) / 60;
  const cost = hrs * n('rate');
  const fmt = (x) => Math.round(x).toLocaleString('en-AU');
  return (
    <Section anchor={s.anchor || 'calc'} tone={toneOf(s)}>
      <SecHead s={s} />
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 rounded-3xl bg-white border border-black/10 p-6 md:p-10 grid sm:grid-cols-2 gap-x-8 gap-y-6">
          {CALC_FIELDS.map((f) => (
            <label key={f.k} className="block">
              <span className="text-xs tracking-[0.2em] uppercase text-neutral-600">{f.l}</span>
              {f.h && <span className="block text-xs text-neutral-400 mt-1">{f.h}</span>}
              <input type="number" min="0" step="1" inputMode="numeric" value={v[f.k]} onChange={(e) => setV({ ...v, [f.k]: e.target.value })}
                className="mt-2 w-full bg-transparent border-b border-black/20 focus:border-[#B4D234] outline-none py-2 font-mono text-lg" />
            </label>
          ))}
        </div>
        <div className="lg:col-span-5 rounded-3xl bg-[#231F20] text-white p-6 md:p-10 flex flex-col" aria-live="polite">
          <div className="text-xs tracking-[0.3em] uppercase text-neutral-500 mb-3">/ Manual work today</div>
          <div className="font-serif text-6xl md:text-7xl leading-none">{fmt(hrs)} <span className="text-3xl">hrs</span></div>
          <p className="text-white/60 text-sm mt-3">a month, on steps the platform handles for you</p>
          <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/10">
            <div><div className="text-[10px] font-mono uppercase tracking-widest text-white/40">Per month</div><div className="font-serif text-3xl mt-1">${fmt(cost)}</div></div>
            <div><div className="text-[10px] font-mono uppercase tracking-widest text-white/40">Per year</div><div className="font-serif text-3xl mt-1 text-[#B4D234]">${fmt(cost * 12)}</div></div>
          </div>
          <p className="text-white/60 text-sm leading-relaxed mt-8 mb-6">Your numbers, your estimate. We’ll go through them with you and show which steps disappear.</p>
          <div className="mt-auto"><PrimaryBtn dark href="#contact">Talk it through with us</PrimaryBtn></div>
        </div>
      </div>
      <Note text={s.note} />
    </Section>
  );
}

/* ---------- Sports ---------- */
export function Sports({ s }) {
  const it = s.items || [];
  return (
    <Section tone={toneOf(s)}>
      <SecHead s={s} />
      <div className={`grid gap-4 ${it.length > 2 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
        {it.map((x, i) => (
          <SmartLink key={i} href={x.link || '#home'} className="group bg-white border border-black/10 hover:border-[#231F20] rounded-2xl p-8 transition-colors flex items-start justify-between gap-6">
            <div>
              <IconCircle name={x.icon || 'jersey'} />
              <Tx as="h3" text={x.name} className="block font-serif text-3xl mt-6 mb-2" />
              <Tx as="p" text={x.text} className="block text-sm text-neutral-600 max-w-md leading-relaxed" />
              {x.stat && <Tx text={x.stat} className="block mt-5 text-[10px] font-mono uppercase tracking-widest text-neutral-500" />}
            </div>
            <ArrowUpRight className="w-6 h-6 shrink-0 transition-transform group-hover:rotate-45" />
          </SmartLink>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Showcase: live stores, alternating ---------- */
export function Showcase({ s }) {
  const host = (u) => { try { return new URL(u).host; } catch (e) { return u || ''; } };
  return (
    <Section tone={toneOf(s)}>
      <SecHead s={s} />
      <div className="space-y-20 lg:space-y-28">
        {(s.items || []).map((it, i) => (
          <div key={i} className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className={`lg:col-span-7 ${i % 2 ? 'lg:order-2' : ''}`}>
              <BrowserFrame label={host(it.url)} src={it.image} alt={it.imageAlt || 'Screenshot of ' + it.name} />
            </div>
            <div className={`lg:col-span-5 ${i % 2 ? 'lg:order-1' : ''}`}>
              <div className="flex flex-wrap items-center gap-2 mb-5">
                {it.kind && <span className="px-3 py-1 rounded-full text-xs bg-white border border-black/10">{it.kind}</span>}
                {it.live && <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-widest bg-[#B4D234] text-[#231F20]">Live</span>}
              </div>
              <Tx as="h3" text={it.name} className="block font-serif text-4xl md:text-5xl leading-[1.05] tracking-tight mb-4" />
              <Tx as="p" text={it.text} className="block text-neutral-800 leading-relaxed mb-6" />
              <Ticks items={it.points} />
              {it.url && <ArrowLink href={it.url} className="mt-6">{it.linkLabel || 'Visit the live site'}</ArrowLink>}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Shots: grid of screenshots ---------- */
export function Shots({ s }) {
  const n = (s.items || []).length;
  return (
    <Section tone={toneOf(s)}>
      <SecHead s={s} />
      <div className={`grid gap-6 lg:gap-8 ${n % 3 === 0 && n >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
        {(s.items || []).map((it, i) => (
          <figure key={i}>
            <BrowserFrame label={it.site} src={it.image} alt={it.imageAlt || it.title} />
            <figcaption className="mt-4">
              <Tx text={it.title} className="block font-serif text-xl" />
              <Tx text={it.caption} className="block text-sm text-neutral-600 mt-1 leading-relaxed" />
            </figcaption>
          </figure>
        ))}
      </div>
      <Note text={s.note} />
    </Section>
  );
}

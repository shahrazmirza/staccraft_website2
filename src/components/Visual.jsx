import React, { useState } from 'react';
import { visual, icon } from '../legacy/visuals';
import { asset, brand } from '../site';
import { Tx } from './ui';

// Browser-window frame used for real screenshots (DESIGN_GUIDELINES.md §6).
export function BrowserFrame({ label, src, alt, className = '' }) {
  return (
    <figure className={`rounded-2xl overflow-hidden border border-black/10 bg-white shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)] ${className}`}>
      <div className="flex items-center gap-2 px-4 py-3 border-b border-black/5 bg-[#F1EFE6]">
        <span className="w-2.5 h-2.5 rounded-full bg-black/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-black/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-black/15" />
        {label && <span className="ml-4 text-[11px] font-mono uppercase tracking-widest text-neutral-500 truncate">{label}</span>}
      </div>
      {src
        ? <img src={asset(src)} alt={alt || ''} className="block w-full h-auto" loading="lazy" />
        : <div className="aspect-[16/10] flex items-center justify-center font-mono text-sm text-neutral-400">[ Screenshot ]</div>}
    </figure>
  );
}

// A section's visual: an uploaded image, or one of the example-screen mock-ups.
export default function Visual({ s }) {
  if (!s || !s.visual || s.visual === 'none') return null;
  if (s.visual === 'image') {
    if (!s.image) return null;
    return s.imageSite
      ? <BrowserFrame label={s.imageSite} src={s.image} alt={s.imageAlt} />
      : <img src={asset(s.image)} alt={s.imageAlt || ''} className="w-full h-auto rounded-2xl" />;
  }
  const html = visual(s);
  if (!html) return null;
  if (s.visual === 'ecosystem') {
    return (
      <>
        <div className="mk hidden lg:block" dangerouslySetInnerHTML={{ __html: html }} />
        <EcosystemMobile />
      </>
    );
  }
  return <div className="mk" dangerouslySetInnerHTML={{ __html: html }} />;
}

// Phone and tablet version of the platform map: the same modules, as a grid around the platform.
const ECO = [
  ['store', 'Web store & eCommerce'], ['chart', 'Reporting & insights'], ['dam', 'Digital assets (DAM)'], ['brush', 'Design & kit builder'],
  ['po', 'Purchasing & production'], ['jersey', 'Teamwear & club stores'], ['locker', 'Locker Room'], ['b2b', 'Wholesale (B2B)'],
  ['monitor', 'Dealer portal'], ['factory', 'Supplier portal'], ['warehouse', 'Warehousing (3PL or WMS)'], ['calc', 'Accounting & ERP'],
  ['truck', 'Distribution & delivery'], ['api', 'API & integrations'],
];
function EcosystemMobile() {
  return (
    <div className="lg:hidden rounded-3xl bg-white border border-black/10 p-5">
      <div className="flex justify-center mb-5">
        <span className="inline-flex items-center px-5 py-2.5 rounded-full bg-[#231F20]">
          <img src={asset(brand.logoLight) || '/tpl/logo-light.png'} alt={brand.name} className="h-6 w-auto" />
        </span>
      </div>
      <ul className="grid grid-cols-1 min-[360px]:grid-cols-2 sm:grid-cols-3 gap-2">
        {ECO.map(([ic, label]) => (
          <li key={label} className="flex items-center gap-2 rounded-xl bg-[#F1EFE6] px-2.5 py-2.5 text-[13px] leading-tight [hyphens:auto]">
            <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center shrink-0 [&_svg]:w-4 [&_svg]:h-4" dangerouslySetInnerHTML={{ __html: icon(ic) }} />
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Hero "console": dark title bar with view tabs and status, a number ribbon, then the chosen view.
export function Console({ s }) {
  const tabs = (s.consoleTabs || []).filter((t) => t && t.visual && t.visual !== 'none');
  const [a, setA] = useState(0);
  const rib = (s.ribbon || []).filter((r) => r && (r.label || r.value));
  const view = tabs.length ? { ...s, visual: tabs[Math.min(a, tabs.length - 1)].visual } : s;
  return (
    <div className="rounded-3xl overflow-hidden border border-black/10 bg-white shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)]">
      <div className="bg-[#231F20] text-white px-5 md:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <span className="flex gap-1.5" aria-hidden="true">
            <i className="w-2.5 h-2.5 rounded-full bg-white/20" /><i className="w-2.5 h-2.5 rounded-full bg-white/20" /><i className="w-2.5 h-2.5 rounded-full bg-[#B4D234]" />
          </span>
          {s.consoleTitle && <Tx text={s.consoleTitle} className="text-[11px] font-mono uppercase tracking-widest text-white/70" />}
        </div>
        {tabs.length > 1 && (
          <div className="flex gap-1 bg-white/10 rounded-full p-1" role="tablist" aria-label="Choose a view">
            {tabs.map((t, i) => (
              <button key={i} type="button" role="tab" aria-selected={i === a} onClick={() => setA(i)}
                className={`px-3.5 py-1 rounded-full text-xs transition-colors ${i === a ? 'bg-[#B4D234] text-[#231F20]' : 'text-white/70 hover:text-white'}`}>
                {t.label || 'View'}
              </button>
            ))}
          </div>
        )}
        {s.consoleStatus && (
          <span className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#B4D234]">
            <i className="w-1.5 h-1.5 rounded-full bg-[#B4D234]" /><Tx text={s.consoleStatus} />
          </span>
        )}
      </div>
      {rib.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-black/10">
          {rib.map((r, i) => (
            <div key={i} className={`p-5 md:p-6 border-black/10 ${i % 2 ? 'border-l' : ''} ${i >= 2 ? 'border-t lg:border-t-0' : ''} ${i > 0 ? 'lg:border-l' : ''}`}>
              <Tx text={r.label} className="block text-[10px] font-mono uppercase tracking-widest text-neutral-500" />
              <Tx text={r.value} className="block font-serif text-3xl sm:text-4xl md:text-5xl leading-none tracking-tight mt-3 [overflow-wrap:anywhere]" />
              {r.note && <Tx text={r.note} className="block text-xs text-neutral-500 mt-2" />}
            </div>
          ))}
        </div>
      )}
      <div className="p-4 md:p-8 bg-[#F1EFE6]/60"><div className="max-w-[1080px] mx-auto"><Visual s={view} /></div></div>
    </div>
  );
}

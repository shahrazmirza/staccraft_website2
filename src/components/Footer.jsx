import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import { brand, navModel, asset, getPage, toPath } from '../site';
import { Tx, Arrow } from './ui';

export default function Footer({ onCookieSettings }) {
  const nav = navModel();
  const cols = nav.filter((i) => i.group).map((g) => ({ h: g.group, pages: g.pages }));
  const solo = nav.filter((i) => i.page).map((i) => i.page);
  if (solo.length) cols.push({ h: 'Explore', pages: solo });
  const privacy = getPage('privacy');

  return (
    <footer className="bg-[#231F20] text-white border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block mb-8"><img src={asset(brand.logoLight) || '/tpl/logo-light.png'} alt={brand.name} className="h-9 w-auto" /></Link>
            <Tx as="p" text={brand.footerBlurb} className="block text-white/70 max-w-md leading-relaxed" />
            <div className="mt-8 flex flex-wrap gap-3">
              {brand.headerCtaLabel && (
                <Link to={toPath(brand.headerCtaLink || '#contact')} className="group shrink-0 whitespace-nowrap inline-flex items-center gap-2 bg-[#B4D234] hover:bg-white text-[#231F20] px-6 py-3.5 rounded-full text-sm transition-colors">
                  {brand.headerCtaLabel} <Arrow />
                </Link>
              )}
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 text-sm">
            {cols.map((c) => (
              <div key={c.h}>
                <div className="text-white/40 text-xs tracking-widest uppercase mb-4">{c.h}</div>
                <ul className="space-y-2.5">
                  {c.pages.map((p) => <li key={p.id}><Link to={'/' + p.id} className="link-hover">{p.navLabel || p.title}</Link></li>)}
                </ul>
              </div>
            ))}
            <div>
              <div className="text-white/40 text-xs tracking-widest uppercase mb-4">Contact</div>
              <ul className="space-y-2.5 text-white/70">
                {brand.email && <li className="flex items-start gap-2 [overflow-wrap:anywhere]"><Mail className="w-4 h-4 mt-0.5 shrink-0" /><a href={'mailto:' + brand.email} className="link-hover">{brand.email}</a></li>}
                {brand.phone && <li className="flex items-start gap-2"><Phone className="w-4 h-4 mt-0.5 shrink-0" /><Tx text={brand.phone} /></li>}
                {brand.address && <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0" /><Tx text={brand.address} /></li>}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-8 gap-4 text-xs text-white/50">
          <Tx text={brand.copyright || `© ${new Date().getFullYear()} ${brand.name}`} />
          <div className="flex items-center gap-6">
            {privacy && <Link to="/privacy" className="link-hover">{privacy.navLabel || privacy.title}</Link>}
            {onCookieSettings && <button type="button" onClick={onCookieSettings} className="link-hover">Cookie settings</button>}
          </div>
        </div>
      </div>
    </footer>
  );
}

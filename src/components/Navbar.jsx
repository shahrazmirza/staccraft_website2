import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { brand, navModel, asset, toPath } from '../site';
import { Arrow } from './ui';

const pill = (active) => `px-3.5 2xl:px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${active ? 'bg-[#231F20] text-white' : 'text-neutral-700 hover:text-black'}`;

function Group({ item, pathname, open, setOpen }) {
  const ref = useRef(null);
  const active = item.pages.some((p) => '/' + p.id === pathname);
  const isOpen = open === item.group;
  useEffect(() => {
    if (!isOpen) return;
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(null); };
    const esc = (e) => { if (e.key === 'Escape') { setOpen(null); ref.current?.querySelector('button')?.focus(); } };
    document.addEventListener('mousedown', close);
    document.addEventListener('focusin', close);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('focusin', close); document.removeEventListener('keydown', esc); };
  }, [isOpen, setOpen]);
  return (
    <div ref={ref} className="relative">
      <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : item.group)} className={`${pill(active)} inline-flex items-center gap-1`}>
        {item.group}<ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute left-0 top-full mt-3 w-64 rounded-2xl bg-white border border-black/10 shadow-lg p-2 fade-up [animation-duration:.25s]">
          {item.pages.map((p) => (
            <NavLink key={p.id} to={'/' + p.id} className={({ isActive }) => `block px-3.5 py-2.5 rounded-xl text-sm transition-colors ${isActive ? 'bg-[#231F20] text-white' : 'text-neutral-800 hover:bg-black/5'}`}>
              {p.navLabel || p.title}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [group, setGroup] = useState(null);
  const { pathname } = useLocation();
  const nav = navModel();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll(); // page may load already scrolled (reload, back button)
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); setGroup(null); }, [pathname]);

  const cta = brand.headerCtaLabel && (
    <Link to={toPath(brand.headerCtaLink || '#contact')} className="group inline-flex items-center gap-1.5 bg-[#231F20] hover:bg-[#B4D234] hover:text-[#231F20] text-white text-sm px-4 py-2.5 rounded-full transition-colors whitespace-nowrap">
      {brand.headerCtaLabel}<Arrow />
    </Link>
  );

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || open ? 'py-3 bg-[#FBFAF5]/90 backdrop-blur-lg border-b border-black/5' : 'py-5 bg-transparent'}`}>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 bg-white px-3 py-2 rounded">Skip to content</a>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center shrink-0" aria-label={brand.name + ' home'}>
          <img src={asset(brand.logo) || '/tpl/logo.png'} alt={brand.name} className="h-8 md:h-9 w-auto" />
        </Link>

        <nav className="hidden xl:flex items-center gap-0.5 bg-white/60 border border-black/5 rounded-full px-1.5 py-1.5 backdrop-blur-md" aria-label="Main">
          {nav.map((it) => it.page
            ? <NavLink key={it.page.id} to={'/' + it.page.id} className={({ isActive }) => pill(isActive)}>{it.page.navLabel || it.page.title}</NavLink>
            : <Group key={it.group} item={it} pathname={pathname} open={group} setOpen={setGroup} />)}
        </nav>

        <div className="hidden xl:flex items-center">{cta}</div>

        <button className="xl:hidden p-2 -mr-2" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="xl:hidden mt-3 mx-4 sm:mx-6 rounded-2xl bg-white/95 backdrop-blur border border-black/5 p-4 shadow-lg max-h-[calc(100vh-6rem)] overflow-y-auto">
          {nav.map((it) => it.page ? (
            <NavLink key={it.page.id} to={'/' + it.page.id} className={({ isActive }) => `block px-3 py-2.5 rounded-lg text-base ${isActive ? 'bg-[#231F20] text-white' : 'text-neutral-800 hover:bg-black/5'}`}>
              {it.page.navLabel || it.page.title}
            </NavLink>
          ) : (
            <div key={it.group} className="py-2">
              <div className="px-3 pb-1 text-[10px] font-mono uppercase tracking-widest text-neutral-500">{it.group}</div>
              {it.pages.map((p) => (
                <NavLink key={p.id} to={'/' + p.id} className={({ isActive }) => `block px-3 py-2 rounded-lg text-base ${isActive ? 'bg-[#231F20] text-white' : 'text-neutral-800 hover:bg-black/5'}`}>
                  {p.navLabel || p.title}
                </NavLink>
              ))}
            </div>
          ))}
          {brand.headerCtaLabel && (
            <Link to={toPath(brand.headerCtaLink || '#contact')} className="mt-3 flex items-center justify-center gap-2 bg-[#B4D234] text-[#231F20] px-4 py-3 rounded-full text-sm">{brand.headerCtaLabel}</Link>
          )}
        </div>
      )}
    </header>
  );
}

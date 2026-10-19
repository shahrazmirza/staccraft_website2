import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Plus, ArrowUpRight } from 'lucide-react';
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

  // While the mobile menu is open: lock the page behind it, close on Escape, and close if the window grows to desktop width.
  const headerRef = useRef(null);
  const [headerH, setHeaderH] = useState(64);
  useEffect(() => {
    if (!open) return;
    setHeaderH(headerRef.current?.offsetHeight || 64);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    const mq = window.matchMedia('(min-width: 1280px)');
    const onMq = () => { if (mq.matches) setOpen(false); };
    document.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => { document.body.style.overflow = prev; document.removeEventListener('keydown', onKey); mq.removeEventListener('change', onMq); };
  }, [open]);

  const cta = brand.headerCtaLabel && (
    <Link to={toPath(brand.headerCtaLink || '#contact')} className="group inline-flex items-center gap-1.5 bg-[#231F20] hover:bg-[#B4D234] hover:text-[#231F20] text-white text-sm px-4 py-2.5 rounded-full transition-colors whitespace-nowrap">
      {brand.headerCtaLabel}<Arrow />
    </Link>
  );

  return (
    <header ref={headerRef} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${open ? 'py-3 bg-[#FBFAF5] border-b border-black/10' : scrolled ? 'py-3 bg-[#FBFAF5]/90 backdrop-blur-lg border-b border-black/5' : 'py-5 bg-transparent'}`}>
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

        <button className="xl:hidden -mr-2 w-11 h-11 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors" onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && <MobileMenu nav={nav} pathname={pathname} top={headerH} />}
    </header>
  );
}

// Full-screen menu below 1280px: menu groups open and close, the current page's group starts open,
// and the call to action stays pinned at the bottom.
function MobileMenu({ nav, pathname, top }) {
  const current = nav.find((it) => it.group && it.pages.some((p) => '/' + p.id === pathname));
  const [openGroup, setOpenGroup] = useState(current ? current.group : null);
  const row = 'flex items-center justify-between w-full py-4 border-b border-black/10 font-serif text-[26px] leading-tight';
  return (
    <div id="mobile-menu" className="xl:hidden fixed inset-x-0 bottom-0 bg-[#FBFAF5] flex flex-col" style={{ top }}>
      <nav className="flex-1 overflow-y-auto overscroll-contain px-6 md:px-10 pt-2 pb-6" aria-label="Main">
        {nav.map((it) => {
          if (it.page) {
            const active = '/' + it.page.id === pathname;
            return (
              <Link key={it.page.id} to={'/' + it.page.id} aria-current={active ? 'page' : undefined} className={row}>
                <span className="flex items-center gap-3">{active && <span className="w-2 h-2 rounded-full bg-[#B4D234]" />}{it.page.navLabel || it.page.title}</span>
                <ArrowUpRight className="w-5 h-5 text-neutral-400" />
              </Link>
            );
          }
          const isOpen = openGroup === it.group;
          const id = 'mm-' + it.group.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          return (
            <div key={it.group}>
              <button type="button" className={row} aria-expanded={isOpen} aria-controls={id} onClick={() => setOpenGroup(isOpen ? null : it.group)}>
                <span className="flex items-center gap-3">
                  {current === it && <span className="w-2 h-2 rounded-full bg-[#B4D234]" />}{it.group}
                  <span className="font-mono text-[11px] text-neutral-400 tracking-widest">{String(it.pages.length).padStart(2, '0')}</span>
                </span>
                <span className={`w-8 h-8 rounded-full border border-black/15 flex items-center justify-center transition-transform ${isOpen ? 'rotate-45 bg-[#231F20] border-[#231F20] text-white' : ''}`}>
                  <Plus className="w-4 h-4" />
                </span>
              </button>
              {isOpen && (
                <ul id={id} className="grid sm:grid-cols-2 gap-1 py-3 border-b border-black/10">
                  {it.pages.map((p) => {
                    const active = '/' + p.id === pathname;
                    return (
                      <li key={p.id}>
                        <Link to={'/' + p.id} aria-current={active ? 'page' : undefined}
                          className={`flex items-center gap-3 rounded-xl px-3 py-3 text-base transition-colors ${active ? 'bg-[#231F20] text-white' : 'text-neutral-800 hover:bg-black/5'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${active ? 'bg-[#B4D234]' : 'bg-black/20'}`} />
                          {p.navLabel || p.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </nav>
      <div className="border-t border-black/10 bg-[#FBFAF5] px-6 md:px-10 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div className="max-w-md mx-auto space-y-3">
        {brand.headerCtaLabel && (
          <Link to={toPath(brand.headerCtaLink || '#contact')} className="group flex items-center justify-center gap-2 bg-[#231F20] text-white px-6 py-4 rounded-full text-base">
            {brand.headerCtaLabel} <Arrow />
          </Link>
        )}
        {brand.email && <a href={'mailto:' + brand.email} className="block text-center text-sm text-neutral-600">{brand.email}</a>}
        </div>
      </div>
    </div>
  );
}

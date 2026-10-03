import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const links = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/cases', label: 'Case Studies' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll(); // page may load already scrolled (reload, back button)
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3 bg-[#FBFAF5]/90 backdrop-blur-lg border-b border-black/5' : 'py-5 bg-transparent'}`}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <img src="/assets/logo.png" alt="StacCraft" className="h-8 md:h-9 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-1 bg-white/60 border border-black/5 rounded-full px-2 py-1.5 backdrop-blur-md">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to==='/'} className={({isActive}) => `px-4 py-1.5 rounded-full text-sm transition-colors ${isActive ? 'bg-[#231F20] text-[#FFFFFF]' : 'text-neutral-700 hover:text-black'}`}>{l.label}</NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href="#" className="text-sm text-neutral-700 link-hover">Sign in</a>
          <Link to="/contact" className="group inline-flex items-center gap-1.5 bg-[#231F20] hover:bg-[#B4D234] hover:text-[#231F20] text-[#FFFFFF] text-sm px-4 py-2.5 rounded-full transition-colors">
            Book a walkthrough
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
          </Link>
        </div>

        <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden mt-3 mx-6 rounded-xl bg-white/95 backdrop-blur border border-black/5 p-4 shadow-lg">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to==='/'} className={({isActive}) => `block px-3 py-2.5 rounded-lg text-base ${isActive ? 'bg-[#231F20] text-[#FFFFFF]' : 'text-neutral-800 hover:bg-black/5'}`}>{l.label}</NavLink>
          ))}
          <Link to="/contact" className="mt-3 flex items-center justify-center gap-2 bg-[#B4D234] text-[#231F20] px-4 py-3 rounded-full text-sm">Book a walkthrough <ArrowUpRight className="w-4 h-4" /></Link>
        </div>
      )}
    </header>
  );
}

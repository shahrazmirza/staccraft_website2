import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#231F20] text-[#FFFFFF] mt-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20">
        <div className="grid lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          <div className="lg:col-span-6">
            <div className="text-xs tracking-[0.25em] uppercase text-neutral-500 mb-6">/ Ready when you are</div>
            <h2 className="font-serif text-5xl md:text-7xl leading-[0.95] tracking-tight mb-8">
              Craft your <span className="serif-italic-accent">stack.</span>
            </h2>
            <p className="text-white/70 max-w-lg text-lg leading-relaxed">
              Tell us how your Australian business runs. We’ll show you the StacCraft platform shaped around it — including the AI assistance that fits your operation.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="group inline-flex items-center gap-2 bg-[#B4D234] hover:bg-[#FFFFFF] hover:text-[#231F20] text-white px-6 py-3.5 rounded-full transition-colors">
                Book a walkthrough <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45"/>
              </Link>
              <a href="mailto:info@staccraft.com.au" className="inline-flex items-center gap-2 border border-white/20 hover:border-white/60 px-6 py-3.5 rounded-full transition-colors">
                info@staccraft.com.au <Mail className="w-4 h-4"/>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
            <div>
              <div className="text-white/40 text-xs tracking-widest uppercase mb-4">Platform</div>
              <ul className="space-y-2.5">
                <li><Link to="/products" className="link-hover">Teamwear</Link></li>
                <li><Link to="/products" className="link-hover">B2C Web Store</Link></li>
                <li><Link to="/products" className="link-hover">B2B Portal</Link></li>
                <li><Link to="/products" className="link-hover">Procurement</Link></li>
                <li><Link to="/products" className="link-hover">Analytics</Link></li>
                <li><Link to="/products" className="link-hover">AI Assistance</Link></li>
              </ul>
            </div>
            <div>
              <div className="text-white/40 text-xs tracking-widest uppercase mb-4">Company</div>
              <ul className="space-y-2.5">
                <li><Link to="/about" className="link-hover">About</Link></li>
                <li><Link to="/cases" className="link-hover">Case studies</Link></li>
                <li><Link to="/contact" className="link-hover">Contact</Link></li>
                <li><a href="#" className="link-hover">Careers</a></li>
              </ul>
            </div>
            <div>
              <div className="text-white/40 text-xs tracking-widest uppercase mb-4">Studio</div>
              <ul className="space-y-2.5 text-white/70">
                <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0"/> Sydney · Melbourne, AU</li>
                <li><a href="mailto:info@staccraft.com.au" className="link-hover">info@staccraft.com.au</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-8 gap-4 text-xs text-white/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FFFFFF] rounded flex items-center justify-center">
              <span className="font-serif text-[#231F20] font-semibold">S</span>
            </div>
            <span>© {new Date().getFullYear()} StacCraft. Bespoke commerce technology, built in Australia.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="link-hover">Privacy</a>
            <a href="#" className="link-hover">Terms</a>
            <a href="#" className="link-hover">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

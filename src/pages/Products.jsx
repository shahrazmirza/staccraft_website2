import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import { products } from '../mock/mock';

export default function Products() {
  const [active, setActive] = useState(products[0].id);
  const current = products.find(p => p.id === active);
  const Icon = current.icon;

  return (
    <div className="pt-32">
      {/* HEADER */}
      <section className="px-6 md:px-10 pb-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-xs tracking-[0.3em] uppercase text-neutral-500 mb-6">/ Products</div>
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <h1 className="lg:col-span-8 font-serif text-5xl md:text-7xl lg:text-[104px] leading-[0.95] tracking-[-0.03em] font-medium">
              A suite that <span className="serif-italic-accent">bends</span> to your operation.
            </h1>
            <p className="lg:col-span-4 text-neutral-700 text-lg leading-relaxed">
              Six modules that share one order engine, one customer record and one admin. Start with what you need. Extend without re-platforming.
            </p>
          </div>
        </div>
      </section>

      {/* Product tabs (desktop) */}
      <section className="px-6 md:px-10 pb-20">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-4 space-y-1 lg:sticky lg:top-28 self-start">
            {products.map(p => {
              const IIcon = p.icon;
              const isActive = active === p.id;
              return (
                <button key={p.id} onClick={() => setActive(p.id)} className={`w-full text-left flex items-center gap-4 px-4 py-4 rounded-xl border transition-all ${isActive ? 'bg-[#231F20] text-[#FFFFFF] border-[#231F20]' : 'bg-white/50 border-black/10 hover:border-black/40'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isActive ? 'bg-[#B4D234]' : 'bg-black/5'}`}>
                    <IIcon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-neutral-800'}`}/>
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-mono tracking-widest opacity-60">{p.tag}</div>
                    <div className="font-serif text-xl">{p.title}</div>
                  </div>
                  {isActive && <ArrowUpRight className="w-4 h-4"/>}
                </button>
              );
            })}
          </aside>

          <div className="lg:col-span-8">
            <div key={current.id} className="fade-up bg-[#F1EFE6] rounded-3xl p-8 md:p-12 border border-black/5">
              <div className="flex items-center justify-between mb-8">
                <div className="w-16 h-16 rounded-full bg-[#231F20] flex items-center justify-center">
                  <Icon className="w-7 h-7 text-[#B4D234]"/>
                </div>
                <span className="font-mono text-xs text-neutral-500">MODULE // {current.tag}</span>
              </div>
              <h2 className="font-serif text-5xl md:text-6xl leading-[1] tracking-tight mb-6">{current.title}</h2>
              <p className="text-neutral-700 text-lg leading-relaxed max-w-2xl mb-10">{current.lead}</p>

              <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 mb-10">
                {current.bullets.map((b, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-[#231F20] flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-[#B4D234]"/>
                    </div>
                    <span className="text-neutral-800">{b}</span>
                  </div>
                ))}
              </div>

              <div className="mb-10">
                <div className="text-xs tracking-[0.25em] uppercase text-neutral-500 mb-4">Included capabilities</div>
                <div className="flex flex-wrap gap-2">
                  {current.features.map((f, i) => (
                    <span key={i} className="px-3.5 py-1.5 rounded-full text-sm bg-white border border-black/10 text-neutral-800">{f}</span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link to={`/products/${current.id}`} className="group inline-flex items-center gap-2 bg-[#231F20] hover:bg-[#B4D234] hover:text-[#231F20] text-white px-6 py-3.5 rounded-full text-sm transition-colors">
                  Open {current.title.toLowerCase()} page <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45"/>
                </Link>
                <Link to="/contact" className="inline-flex items-center gap-2 border border-black/15 hover:border-black/60 px-6 py-3.5 rounded-full text-sm transition-colors">
                  Book a walkthrough
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Suite band */}
      <section className="px-6 md:px-10 py-24 bg-[#231F20] text-[#FFFFFF]">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="text-xs tracking-[0.3em] uppercase text-neutral-500 mb-4">/ One suite</div>
            <h3 className="font-serif text-4xl md:text-5xl leading-tight">
              Six modules. <span className="serif-italic-accent">One</span> order engine.
            </h3>
          </div>
          <p className="text-white/70 text-lg leading-relaxed">
            No stitched-together tools, no re-entered data. Whether you start with Teamwear or Procurement, you’re on the same admin, catalogue and customer record from day one.
          </p>
        </div>
      </section>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles, Play, Star, Circle } from 'lucide-react';
import { clients, products, integrations, stats, testimonial, heroImages } from '../mock/mock';

const rotators = ['Tailored.', 'Integrated.', 'Yours.', 'Australian.'];

export default function Home() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % rotators.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="pt-40 pb-16 md:pb-24 px-6 md:px-10 relative overflow-hidden">
        <div className="absolute inset-0 dotted-bg opacity-70 -z-10" />
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8 fade-up">
              <div className="inline-flex items-center gap-2 border border-black/10 bg-white/60 backdrop-blur-sm rounded-full px-3.5 py-1.5 mb-8">
                <Circle className="w-2 h-2 fill-[#B4D234] text-[#B4D234]" />
                <span className="text-[10px] sm:text-xs tracking-[0.12em] sm:tracking-widest uppercase text-neutral-700 whitespace-nowrap">Bespoke technology, built in Australia</span>
              </div>
              <h1 className="font-serif text-[48px] leading-[0.95] sm:text-[72px] md:text-[104px] tracking-[-0.03em] font-medium">
                Commerce that <span className="serif-italic-accent">fits</span>
                <br />
                <span className="inline-flex items-baseline gap-3">
                  is <span key={idx} className="serif-italic-accent slide-in relative">
                    {rotators[idx]}
                    <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 200 10" preserveAspectRatio="none">
                      <path d="M0 6 Q 50 0 100 5 T 200 6" stroke="#B4D234" strokeWidth="2" fill="none" opacity="0.4"/>
                    </svg>
                  </span>
                </span>
              </h1>
            </div>
            <div className="lg:col-span-4 space-y-6 fade-up">
              <p className="text-neutral-700 text-lg leading-relaxed max-w-md">
                StacCraft builds an integrated commerce suite — storefront, teamwear marketplace, B2B, procurement and practical AI — configured to fit how Australian businesses actually run.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/products" className="group inline-flex items-center gap-2 bg-[#231F20] hover:bg-[#B4D234] hover:text-[#231F20] text-[#FFFFFF] px-6 py-3.5 rounded-full text-sm transition-colors">
                  Explore the platform <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45"/>
                </Link>
                <Link to="/contact" className="inline-flex items-center gap-2 border border-black/15 hover:border-black/60 px-6 py-3.5 rounded-full text-sm transition-colors">
                  <Play className="w-3.5 h-3.5 fill-current"/> Book a walkthrough
                </Link>
              </div>
            </div>
          </div>

          {/* Hero image collage */}
          {/* Images are absolutely positioned so their natural size never drives the
              layout — the main tile sets the height and the side column matches it. */}
          <div className="grid grid-cols-12 gap-4 mt-16 md:mt-20">
            <Link to="/cases" className="col-span-12 md:col-span-8 relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/9] group">
              <img src={heroImages.main} alt="Kit racks ready for distribution" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"/>
              <div className="absolute bottom-5 left-5 right-5 md:bottom-8 md:left-8 md:right-8 flex items-end justify-between gap-4 text-white">
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-white/70">// Featured build</div>
                  <div className="font-serif text-2xl sm:text-3xl md:text-4xl leading-tight mt-1">Kookaburra Sport — four connected systems</div>
                </div>
                <span className="hidden sm:flex shrink-0 w-11 h-11 rounded-full bg-white/15 backdrop-blur border border-white/30 items-center justify-center transition-colors group-hover:bg-[#B4D234] group-hover:border-[#B4D234] group-hover:text-[#231F20]">
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:rotate-45"/>
                </span>
              </div>
            </Link>
            <div className="col-span-12 md:col-span-4 grid grid-cols-2 md:grid-cols-1 md:grid-rows-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden aspect-square md:aspect-auto">
                <img src={heroImages.side} alt="Personalised team jersey" className="absolute inset-0 w-full h-full object-cover object-center" />
              </div>
              <div className="relative rounded-2xl overflow-hidden bg-[#231F20] text-[#FFFFFF] p-5 md:p-7 flex flex-col justify-between aspect-square md:aspect-auto">
                <Sparkles className="w-6 h-6 text-[#B4D234]"/>
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-white/50 mb-2">// AI native</div>
                  <div className="font-serif text-lg sm:text-2xl leading-tight">Assistants shaped around <em className="font-serif italic text-[#B4D234]">your</em> catalogue.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="py-12 border-y border-black/10 overflow-hidden bg-[#F1EFE6]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 mb-8 flex items-center justify-between">
          <div className="text-xs tracking-[0.3em] uppercase text-neutral-500">/ Trusted by teams across Australia</div>
          <div className="hidden md:flex items-center gap-1 text-neutral-500 text-sm">
            {[...Array(5)].map((_,i)=><Star key={i} className="w-3.5 h-3.5 fill-[#B4D234] text-[#B4D234]"/>)}
            <span className="ml-2">Operators’ favourite</span>
          </div>
        </div>
        <div className="flex marquee whitespace-nowrap">
          {[...clients, ...clients].map((c, i) => (
            <div key={i} className="flex items-center gap-14 px-8">
              <span className="font-serif text-3xl md:text-5xl text-neutral-800">{c}</span>
              <span className="w-2 h-2 rounded-full bg-[#B4D234]"/>
            </div>
          ))}
        </div>
      </section>

      {/* OFFERINGS */}
      <section id="products" className="py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 mb-16">
            <div className="lg:col-span-4">
              <div className="text-xs tracking-[0.3em] uppercase text-neutral-500 mb-4">/ What we offer</div>
            </div>
            <div className="lg:col-span-8">
              <h2 className="font-serif text-4xl md:text-6xl leading-[1] tracking-tight">
                One suite, <span className="serif-italic-accent">shaped</span> to your business.
              </h2>
              <p className="text-neutral-600 mt-6 text-lg max-w-2xl">
                A proven product suite that shares one order engine, one customer record and one admin — including practical AI assistance — then gets configured and extended to fit your operation.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((p, i) => {
              const Icon = p.icon;
              return (
                <Link to={`/products/${p.id}`} key={p.id} className="group relative bg-white/50 hover:bg-[#231F20] border border-black/10 hover:border-[#231F20] rounded-2xl p-6 md:p-7 transition-all duration-300 overflow-hidden">
                  <div className="flex items-center justify-between mb-6 md:mb-8">
                    <div className="w-11 h-11 rounded-full border border-black/20 group-hover:border-[#B4D234] group-hover:bg-[#B4D234] flex items-center justify-center transition-colors">
                      <Icon className="w-5 h-5 text-neutral-800 group-hover:text-[#231F20] transition-colors"/>
                    </div>
                    <span className="font-mono text-xs text-neutral-400 group-hover:text-white/40 transition-colors">{p.tag}</span>
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl mb-3 text-[#231F20] group-hover:text-[#FFFFFF] transition-colors">{p.title}</h3>
                  <p className="text-sm text-neutral-600 group-hover:text-white/70 transition-colors leading-relaxed">{p.lead}</p>
                  <div className="mt-5 pt-5 md:mt-6 md:pt-6 border-t border-black/10 group-hover:border-white/10 flex items-center justify-between text-sm text-neutral-800 group-hover:text-[#FFFFFF] transition-colors">
                    <span>Explore</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45"/>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section className="py-16 md:py-24 px-6 md:px-10 bg-[#231F20] text-[#FFFFFF]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 mb-14">
            <div className="lg:col-span-5">
              <div className="text-xs tracking-[0.3em] uppercase text-neutral-500 mb-4">/ Integrations</div>
              <h2 className="font-serif text-4xl md:text-6xl leading-[1] tracking-tight">
                Plugs into the tools <span className="serif-italic-accent">you already run.</span>
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 self-end">
              <p className="text-white/60 text-lg max-w-md">Commerce shouldn’t be an island. StacCraft connects directly to the systems your team already relies on — finance, DAM, ops and beyond.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
            {integrations.map((i) => (
              <div key={i.name} className="bg-[#231F20] py-6 md:p-8 hover:bg-[#1c1c1c] transition-colors">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-4 md:mb-6">
                  <div className="font-serif text-3xl">{i.name}</div>
                  <div className="font-mono text-xs text-white/40">{i.role}</div>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">{i.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 md:py-24 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 md:gap-6">
            {stats.map((s, i) => (
              <div key={i} className="border-t border-black/20 pt-6">
                <div className="font-serif text-5xl md:text-7xl leading-none tracking-tight">{s.value}</div>
                <div className="mt-4 md:mt-6 text-sm text-neutral-700 max-w-[220px]">{s.label}</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mt-2">// {s.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-16 md:py-24 px-6 md:px-10 bg-[#F1EFE6]">
        <div className="max-w-[1100px] mx-auto text-center">
          <div className="text-xs tracking-[0.3em] uppercase text-neutral-500 mb-6">/ Testimonial</div>
          <blockquote className="font-serif text-2xl sm:text-3xl md:text-5xl leading-[1.15] tracking-tight text-neutral-900">
            “{testimonial.quote.replace(/“|”/g,'')}”
          </blockquote>
          <div className="mt-8 text-sm text-neutral-600">— {testimonial.author}, {testimonial.role}</div>
        </div>
      </section>
    </div>
  );
}

import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowUpRight, ArrowLeft, Check } from 'lucide-react';
import { products, productDetails, integrations } from '../mock/mock';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const detail = productDetails[id];

  if (!product || !detail) return <Navigate to="/products" replace />;
  const Icon = product.icon;
  const related = (detail.related || []).map(r => products.find(p => p.id === r)).filter(Boolean);

  return (
    <div className="pt-32">
      {/* HERO */}
      <section className="px-6 md:px-10 pb-16">
        <div className="max-w-[1400px] mx-auto">
          <Link to="/products" className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-[#231F20] mb-8 link-hover">
            <ArrowLeft className="w-4 h-4" /> All products
          </Link>
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#231F20] flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#B4D234]" />
                </div>
                <span className="font-mono text-xs tracking-widest text-neutral-500">MODULE // {product.tag}</span>
              </div>
              <div className="text-xs tracking-[0.3em] uppercase text-neutral-500 mb-4">/ {product.title}</div>
              <h1 className="font-serif text-5xl md:text-7xl leading-[0.98] tracking-[-0.02em] font-medium">
                {detail.tagline.split(' ').map((w, i, arr) => (
                  <span key={i}>{i === arr.length - 1 ? <span className="serif-italic-accent">{w}</span> : w + ' '}</span>
                ))}
              </h1>
              <p className="text-neutral-700 text-lg leading-relaxed mt-8 max-w-2xl">{detail.hero}</p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link to="/contact" className="group inline-flex items-center gap-2 bg-[#231F20] hover:bg-[#B4D234] hover:text-[#231F20] text-white px-6 py-3.5 rounded-full text-sm transition-colors">
                  Book a walkthrough <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
                </Link>
                <Link to="/cases" className="inline-flex items-center gap-2 border border-black/15 hover:border-black/60 px-6 py-3.5 rounded-full text-sm transition-colors">
                  See it in action
                </Link>
              </div>
            </div>
            <aside className="lg:col-span-4 bg-[#F1EFE6] border border-black/10 rounded-2xl p-6">
              <div className="text-xs tracking-[0.25em] uppercase text-neutral-500 mb-4">Included capabilities</div>
              <div className="flex flex-wrap gap-2">
                {product.features.map((f, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-full text-sm bg-white border border-black/10">{f}</span>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-black/10">
                <div className="text-xs tracking-[0.25em] uppercase text-neutral-500 mb-3">At a glance</div>
                <ul className="space-y-2 text-sm">
                  {product.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 shrink-0 text-[#231F20]" /><span>{b}</span></li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* SCREENSHOTS — capped near their native 1024px width so they stay sharp */}
      <section className="px-6 md:px-10 py-12">
        <div className={`mx-auto grid gap-6 lg:gap-8 items-start ${detail.screenshots.length > 1 ? 'max-w-[1400px] md:grid-cols-2' : 'max-w-[1080px]'}`}>
          {detail.screenshots.map((s, i) => (
            <figure key={i} className="rounded-2xl overflow-hidden border border-black/10 bg-white shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)]">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-black/5 bg-[#F1EFE6]">
                <span className="w-2.5 h-2.5 rounded-full bg-black/15"/>
                <span className="w-2.5 h-2.5 rounded-full bg-black/15"/>
                <span className="w-2.5 h-2.5 rounded-full bg-black/15"/>
                <span className="ml-4 text-[11px] font-mono uppercase tracking-widest text-neutral-500 truncate">{product.title}</span>
              </div>
              <img src={s.src} alt={s.caption} className="w-full h-auto block" loading="lazy" />
              <figcaption className="px-5 py-4 text-sm text-neutral-600 border-t border-black/5">{s.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* WORKFLOWS */}
      <section className="px-6 md:px-10 py-24 bg-[#231F20] text-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 mb-14">
            <div className="lg:col-span-5">
              <div className="text-xs tracking-[0.3em] uppercase text-neutral-400 mb-4">/ Workflows</div>
              <h2 className="font-serif text-4xl md:text-6xl leading-[1] tracking-tight">
                How <span className="serif-italic-accent">{product.title}</span> runs.
              </h2>
            </div>
            <p className="lg:col-span-6 lg:col-start-7 self-end text-white/60 text-lg max-w-xl">Four core flows shaped around how your team actually operates — wired to the same order engine as the rest of the suite.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {detail.workflows.map((w, i) => (
              <div key={i} className="relative bg-white/[0.03] border border-white/10 rounded-2xl p-7 hover:bg-white/[0.06] transition-colors">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs text-[#B4D234]">0{i + 1}</span>
                  <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B4D234]" />
                  </span>
                </div>
                <div className="font-serif text-2xl mb-3">{w.title}</div>
                <p className="text-sm text-white/60 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITY GROUPS */}
      <section className="px-6 md:px-10 py-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 mb-12">
            <div className="lg:col-span-5">
              <div className="text-xs tracking-[0.3em] uppercase text-neutral-500 mb-4">/ Capabilities</div>
              <h2 className="font-serif text-4xl md:text-5xl leading-[1.05] tracking-tight">Everything grouped by <span className="serif-italic-accent">how</span> your team uses it.</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {detail.groups.map((g, i) => (
              <div key={i} className="bg-white border border-black/10 rounded-2xl p-7">
                <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-4">// GROUP {String(i + 1).padStart(2, '0')}</div>
                <div className="font-serif text-2xl mb-5">{g.title}</div>
                <ul className="space-y-2.5">
                  {g.items.map((it, k) => (
                    <li key={k} className="flex items-start gap-3 text-neutral-800 text-sm">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#B4D234] shrink-0"/>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTEGRATIONS band */}
      <section className="px-6 md:px-10 pb-24">
        <div className="max-w-[1400px] mx-auto rounded-3xl bg-[#F1EFE6] p-10 md:p-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="text-xs tracking-[0.3em] uppercase text-neutral-500 mb-3">/ Plays well with</div>
              <h3 className="font-serif text-3xl md:text-4xl leading-tight">Wired into the tools you already run.</h3>
            </div>
            <Link to="/contact" className="inline-flex items-center gap-2 text-sm link-hover">Ask about your stack <ArrowUpRight className="w-4 h-4"/></Link>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {integrations.slice(0, 3).map(i => (
              <div key={i.name} className="bg-white border border-black/10 rounded-2xl p-6">
                <div className="flex items-baseline justify-between mb-3">
                  <div className="font-serif text-2xl">{i.name}</div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">{i.role}</div>
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed">{i.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="px-6 md:px-10 pb-24">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-xs tracking-[0.3em] uppercase text-neutral-500 mb-4">/ Continue exploring</div>
            <div className="grid md:grid-cols-2 gap-4">
              {related.map(r => {
                const RIcon = r.icon;
                return (
                  <Link key={r.id} to={`/products/${r.id}`} className="group bg-white border border-black/10 hover:border-[#231F20] rounded-2xl p-8 transition-colors flex items-center justify-between gap-6">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full border border-black/15 flex items-center justify-center">
                          <RIcon className="w-4 h-4"/>
                        </div>
                        <span className="font-mono text-xs text-neutral-500">{r.tag}</span>
                      </div>
                      <div className="font-serif text-3xl mb-2">{r.title}</div>
                      <p className="text-sm text-neutral-600 max-w-md">{r.lead}</p>
                    </div>
                    <ArrowUpRight className="w-6 h-6 shrink-0 transition-transform group-hover:rotate-45"/>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-6 md:px-10 pb-20">
        <div className="max-w-[1400px] mx-auto rounded-3xl bg-[#231F20] text-white p-10 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <h3 className="font-serif text-3xl md:text-5xl leading-tight max-w-2xl">See <span className="serif-italic-accent">{product.title}</span> shaped to your operation.</h3>
          <Link to="/contact" className="group inline-flex items-center gap-2 bg-[#B4D234] text-[#231F20] hover:bg-white px-6 py-3.5 rounded-full text-sm transition-colors">
            Book a walkthrough <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45"/>
          </Link>
        </div>
      </section>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { caseStudy, caseModules } from '../mock/mock';

export default function CaseStudies() {
  return (
    <div className="pt-32">
      <section className="px-6 md:px-10 pb-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-xs tracking-[0.3em] uppercase text-neutral-500 mb-6">/ Case studies</div>
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <h1 className="lg:col-span-8 font-serif text-5xl md:text-7xl lg:text-[96px] leading-[0.95] tracking-[-0.03em] font-medium">
              Proven success. <span className="serif-italic-accent">Real impact.</span>
            </h1>
            <p className="lg:col-span-4 text-neutral-700 text-lg">
              A flagship stack for Australia’s most recognisable sports brands — built as four connected systems on one order engine.
            </p>
          </div>
        </div>
      </section>

      {/* Flagship */}
      <section className="px-6 md:px-10 mb-16 md:mb-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 lg:items-center">
            <div className="lg:col-span-7 relative rounded-3xl overflow-hidden aspect-[4/5] sm:aspect-[4/3] group">
              <img src={caseStudy.image} alt="Kookaburra Sport" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"/>
              <div className="absolute top-5 left-5 md:top-6 md:left-6 flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-widest bg-[#B4D234] text-[#231F20]">Flagship</span>
                <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-widest bg-white/90 text-[#231F20]">Bespoke stack</span>
              </div>
              <div className="absolute bottom-5 left-5 right-5 md:bottom-6 md:left-6 md:right-6 text-white">
                <div className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight">{caseStudy.title}</div>
                <div className="text-white/80 text-sm mt-1">{caseStudy.subtitle}</div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="flex flex-wrap gap-2">
                {caseStudy.chips.map((c, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-full text-xs bg-[#F1EFE6] border border-black/10">{c}</span>
                ))}
              </div>
              <div>
                <div className="text-xs tracking-[0.25em] uppercase text-neutral-500 mb-2">Challenge</div>
                <p className="text-neutral-800 leading-relaxed">{caseStudy.challenge}</p>
              </div>
              <div>
                <div className="text-xs tracking-[0.25em] uppercase text-neutral-500 mb-2">Solution</div>
                <p className="text-neutral-800 leading-relaxed">{caseStudy.solution}</p>
              </div>
              <div className="p-5 bg-[#231F20] text-[#FFFFFF] rounded-xl">
                <div className="text-xs tracking-[0.25em] uppercase text-neutral-500 mb-2">Outcome</div>
                <p className="leading-relaxed">{caseStudy.outcome}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="px-6 md:px-10 mb-16 md:mb-24">
        <div className="max-w-[1400px] mx-auto space-y-20 lg:space-y-28">
          {caseModules.map((m, i) => (
            <div key={i} className={`grid lg:grid-cols-12 gap-8 lg:gap-12 items-center ${i % 2 ? 'lg:[direction:rtl]' : ''}`}>
              <figure className="lg:col-span-7 rounded-2xl overflow-hidden border border-black/10 bg-white shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)] [direction:ltr]">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-black/5 bg-[#F1EFE6]">
                  <span className="w-2.5 h-2.5 rounded-full bg-black/15"/>
                  <span className="w-2.5 h-2.5 rounded-full bg-black/15"/>
                  <span className="w-2.5 h-2.5 rounded-full bg-black/15"/>
                  <span className="ml-4 text-[11px] font-mono uppercase tracking-widest text-neutral-500 truncate">Kookaburra · {m.tag}</span>
                </div>
                <img src={m.image} alt={`${m.title} — Kookaburra`} className="block w-full h-auto" loading="lazy"/>
              </figure>
              <div className="lg:col-span-5 [direction:ltr]">
                <h3 className="font-serif text-4xl md:text-5xl leading-[1.05] tracking-tight mb-3">{m.title}</h3>
                <div className="text-sm text-neutral-500 mb-5">{m.sub}</div>
                <p className="text-neutral-800 leading-relaxed mb-6">{m.text}</p>
                <ul className="space-y-2 mb-6">
                  {m.bullets.map((b, k) => (
                    <li key={k} className="flex items-start gap-3 text-neutral-800">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#B4D234] shrink-0"/>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {m.chips.map((c, k) => (
                    <span key={k} className="px-3 py-1 rounded-full text-xs bg-white border border-black/10">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-10 py-16">
        <div className="max-w-[1400px] mx-auto rounded-3xl bg-[#F1EFE6] p-8 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="text-xs tracking-[0.3em] uppercase text-neutral-500 mb-3">/ Have a similar story?</div>
            <h3 className="font-serif text-4xl md:text-5xl leading-tight">Let’s craft yours.</h3>
          </div>
          <Link to="/contact" className="group shrink-0 whitespace-nowrap inline-flex items-center gap-2 bg-[#231F20] hover:bg-[#B4D234] hover:text-[#231F20] text-[#FFFFFF] px-6 py-3.5 rounded-full text-sm transition-colors">
            Book a walkthrough <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45"/>
          </Link>
        </div>
      </section>
    </div>
  );
}

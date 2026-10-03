import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Flag, Heart, Wrench } from 'lucide-react';
import { principles, process } from '../mock/mock';

export default function About() {
  return (
    <div className="pt-32">
      <section className="px-6 md:px-10 pb-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-xs tracking-[0.3em] uppercase text-neutral-500 mb-6">/ About</div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-[104px] leading-[0.95] tracking-[-0.03em] font-medium max-w-5xl">
            Bespoke, <span className="serif-italic-accent">not</span> one-size-fits-all.
          </h1>
          <p className="text-neutral-700 text-lg leading-relaxed max-w-2xl mt-8">
            StacCraft is an Australian company, built and operated here. Our advantage isn’t that we sell software like the big players. It’s that we build tailored solutions for SMEs, including practical AI assistance, solving their specific operational pain points instead of offering a one-size-fits-all product.
          </p>
        </div>
      </section>

      {/* Values ribbon */}
      <section className="px-6 md:px-10 mb-24">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-3 gap-4">
          {[{ icon: Flag, tag: 'Made here', t: 'Built in Australia', d: 'Local teams, local hours, local accountability — you speak with the same people who build your platform.' },
            { icon: Heart, tag: 'Craft over checklist', t: 'Shaped to fit', d: 'We don’t hand over a template. We map your operation and design the platform against how you actually run.' },
            { icon: Wrench, tag: 'Battle-tested', t: 'Proven, then extended', d: 'You start on a mature suite already running for national brands — and extend without re-platforming.' }
          ].map((v, i) => (
            <div key={i} className="bg-white/60 border border-black/10 rounded-2xl p-8">
              <v.icon className="w-6 h-6 text-neutral-500 mb-6"/>
              <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-2">// {v.tag}</div>
              <div className="font-serif text-2xl mb-3">{v.t}</div>
              <p className="text-sm text-neutral-700 leading-relaxed">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Principles */}
      <section className="px-6 md:px-10 mb-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 mb-12">
            <div className="lg:col-span-5">
              <div className="text-xs tracking-[0.3em] uppercase text-neutral-500 mb-4">/ How we work</div>
              <h2 className="font-serif text-4xl md:text-5xl leading-[1.05] tracking-tight">Five principles that shape every build.</h2>
            </div>
          </div>
          <div className="divide-y divide-black/10 border-t border-black/10">
            {principles.map((p, i) => (
              <div key={i} className="group grid md:grid-cols-12 gap-6 py-8 cursor-default hover:bg-white/40 -mx-4 px-4 rounded-lg transition-colors">
                <div className="md:col-span-1 font-mono text-sm text-neutral-500">{p.tag}</div>
                <div className="md:col-span-4 font-serif text-2xl md:text-3xl">{p.title}</div>
                <div className="md:col-span-7 text-neutral-700 leading-relaxed">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="px-6 md:px-10 py-24 bg-[#231F20] text-[#FFFFFF]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 mb-14">
            <div className="lg:col-span-5">
              <div className="text-xs tracking-[0.3em] uppercase text-neutral-500 mb-4">/ Our process</div>
              <h2 className="font-serif text-4xl md:text-6xl leading-[1] tracking-tight">
                From first conversation to <span className="serif-italic-accent">live platform.</span>
              </h2>
            </div>
            <p className="lg:col-span-6 lg:col-start-7 self-end text-white/60 text-lg">A clear, four-stage process — so you always know what’s happening and why.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {process.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="relative bg-white/[0.03] border border-white/10 rounded-2xl p-7 hover:bg-white/[0.06] transition-colors">
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-11 h-11 rounded-full bg-[#B4D234] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#231F20]"/>
                    </div>
                    <span className="font-mono text-xs text-white/40">{s.tag}</span>
                  </div>
                  <div className="font-serif text-3xl mb-3">{s.title}</div>
                  <p className="text-sm text-white/60 leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 py-20">
        <div className="max-w-[1400px] mx-auto rounded-3xl bg-[#F1EFE6] p-10 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <h3 className="font-serif text-4xl md:text-5xl leading-tight">Talk to the team that <span className="serif-italic-accent">builds</span> it.</h3>
          <Link to="/contact" className="group inline-flex items-center gap-2 bg-[#231F20] hover:bg-[#B4D234] hover:text-[#231F20] text-[#FFFFFF] px-6 py-3.5 rounded-full text-sm transition-colors">
            Book a walkthrough <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45"/>
          </Link>
        </div>
      </section>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Circle } from 'lucide-react';
import { Tx, Heading, Buttons, Eyebrow } from '../components/ui';
import { toPath } from '../site';
import Visual, { Console } from '../components/Visual';

function Rotator({ words }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (words.length < 2 || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setI((x) => (x + 1) % words.length), 2800);
    return () => clearInterval(t);
  }, [words.length]);
  return (
    <span key={i} className="serif-italic-accent slide-in relative">
      {words[i]}
      <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 200 10" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 6 Q 50 0 100 5 T 200 6" stroke="#B4D234" strokeWidth="2" fill="none" opacity="0.4" />
      </svg>
    </span>
  );
}

function Badge({ text, tag }) {
  if (!text) return null;
  return (
    <div className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 border border-black/10 bg-white/60 backdrop-blur-sm rounded-2xl sm:rounded-full px-3.5 py-1.5 mb-8 max-w-full">
      <span className="inline-flex items-baseline gap-2">
        <Circle className="w-2 h-2 fill-[#B4D234] text-[#B4D234] shrink-0 self-center" />
        <Tx text={text} className="text-[10px] sm:text-xs tracking-[0.12em] sm:tracking-widest uppercase text-neutral-700" />
      </span>
      {tag && <Tx text={tag} className="text-[10px] sm:text-xs tracking-widest uppercase font-medium text-[#231F20] border-l border-black/10 pl-2" />}
    </div>
  );
}

export default function Hero({ s }) {
  const words = (s.words || []).filter(Boolean);
  const hasConsole = (s.consoleTabs || []).length || (s.ribbon || []).length;
  const hasVisual = s.visual && s.visual !== 'none' && (s.visual !== 'image' || s.image);

  // Centred layout (home, integrations): headline across the page, visual or console below.
  if (s.layout === 'center') {
    const facts = (s.pills || []).filter(Boolean);
    return (
      <section className="pt-36 md:pt-40 pb-16 md:pb-24 px-6 md:px-10 relative overflow-hidden">
        <div className="absolute inset-0 dotted-bg opacity-70 -z-10" />
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8 fade-up">
              <Badge text={s.badge || s.eyebrow} tag={s.badgeTag} />
              {s.kicker || words.length ? (
                <h1 className="font-serif text-[42px] leading-[0.95] sm:text-[72px] md:text-[96px] tracking-[-0.03em] font-medium">
                  <Tx text={s.kicker} /> {words.length > 0 && <Rotator words={words} />}
                </h1>
              ) : (
                <Heading as="h1" auto text={s.heading} className="font-serif text-[42px] leading-[0.95] sm:text-[72px] md:text-[96px] tracking-[-0.03em] font-medium" />
              )}
            </div>
            <div className="lg:col-span-4 space-y-6 fade-up">
              <Tx as="p" text={s.subheading} className="text-neutral-700 text-lg leading-relaxed max-w-md block" />
              <Buttons s={s} />
              {facts.length > 0 && (
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2 pt-6 border-t border-black/10">
                  {facts.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-neutral-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B4D234] shrink-0" /><Tx text={f} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          {(hasConsole || hasVisual) && (
            <div className="mt-14 md:mt-20 fade-up">{hasConsole ? <Console s={s} /> : <Visual s={s} />}</div>
          )}
        </div>
      </section>
    );
  }

  const links = (s.links || []).filter((l) => l && l.label);
  return (
    <section className="pt-36 md:pt-40 pb-16 md:pb-24 px-6 md:px-10 relative overflow-hidden">
      <div className="absolute inset-0 dotted-bg opacity-50 -z-10" />
      <div className="max-w-[1400px] mx-auto">
        {hasVisual ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            <div className="min-w-0 lg:col-span-6 fade-up">
              <Eyebrow text={s.eyebrow} className="mb-6" />
              <Heading as="h1" auto text={s.heading} className="font-serif text-5xl md:text-6xl xl:text-7xl leading-[0.98] tracking-[-0.03em] font-medium" />
              <Tx as="p" text={s.subheading} className="block text-neutral-700 text-lg leading-relaxed mt-8 max-w-xl" />
              <Buttons s={s} className="mt-8" />
              <QuickLinks links={links} />
            </div>
            <div className="min-w-0 lg:col-span-6 fade-up"><Visual s={s} /></div>
          </div>
        ) : (
          <>
            <Eyebrow text={s.eyebrow} className="mb-6" />
            <div className="grid lg:grid-cols-12 gap-8 items-end fade-up">
              <Heading as="h1" auto text={s.heading} className="lg:col-span-8 font-serif text-5xl md:text-7xl lg:text-[88px] leading-[0.95] tracking-[-0.03em] font-medium" />
              <div className="lg:col-span-4 space-y-6">
                <Tx as="p" text={s.subheading} className="block text-neutral-700 text-lg leading-relaxed" />
                <Buttons s={s} />
              </div>
            </div>
            <QuickLinks links={links} />
          </>
        )}
      </div>
    </section>
  );
}

function QuickLinks({ links }) {
  if (!links.length) return null;
  return (
    <nav className="mt-8 flex flex-wrap gap-2" aria-label="Industries">
      {links.map((l, i) => (
        <Link key={i} to={toPath(l.link)} className="px-3.5 py-1.5 rounded-full text-sm bg-white border border-black/10 hover:border-black/40 transition-colors">{l.label} →</Link>
      ))}
    </nav>
  );
}

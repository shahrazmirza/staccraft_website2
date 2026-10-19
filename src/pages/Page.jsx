import React from 'react';
import Hero from '../sections/Hero';
import Contact from '../sections/Contact';
import { Posts, Article } from '../sections/Blog';
import {
  Benefits, Cards, Flow, Split, Tabs, Stats, Integrations, Faq, Statement, RichText, Cta, Video,
  BeforeAfter, Tenants, Syncmap, E2EFlow, Stages, Compare, Stack, Modules, Calc, Sports, Showcase, Shots,
} from '../sections/Sections';

// content.json section type -> component
const SECTIONS = {
  hero: Hero, contact: Contact, posts: Posts, article: Article,
  benefits: Benefits, cards: Cards, flow: Flow, split: Split, tabs: Tabs, stats: Stats,
  integrations: Integrations, faq: Faq, statement: Statement, richtext: RichText, cta: Cta, video: Video,
  beforeafter: BeforeAfter, tenants: Tenants, syncmap: Syncmap, e2eflow: E2EFlow, stages: Stages,
  compare: Compare, stack: Stack, modules: Modules, calc: Calc, sports: Sports, showcase: Showcase, shots: Shots,
};

export default function Page({ page }) {
  const sections = page.sections || [];
  if (!sections.length) {
    return <div className="pt-40 pb-24 px-6 md:px-10 max-w-[1400px] mx-auto text-neutral-600">This page has no sections yet.</div>;
  }
  return sections.map((s, i) => {
    const C = SECTIONS[s.type];
    return C ? <C key={page.id + ':' + i} s={s} page={page} /> : null;
  });
}

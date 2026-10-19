import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { tx } from '../legacy/visuals';
import { toPath, isExternal } from '../site';

// Content text: escaped, with [placeholders] highlighted (see README → "Changing the content").
export function Tx({ text, as: Tag = 'span', className }) {
  if (text == null || text === '') return null;
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: tx(text) }} />;
}

// Headline with the signature accent word (DESIGN_GUIDELINES.md §3). Words wrapped in
// {braces} in content.json are accented; with `auto`, the last word is accented instead.
export function accentHtml(text, auto) {
  let h = tx(text || '');
  if (/\{[^}]+\}/.test(h)) return h.replace(/\{([^}]+)\}/g, '<span class="serif-italic-accent">$1</span>');
  if (auto) return h.replace(/(\S+)\s*$/, '<span class="serif-italic-accent">$1</span>');
  return h;
}

export function Heading({ text, as: Tag = 'h2', auto = false, className }) {
  if (!text) return null;
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: accentHtml(text, auto) }} />;
}

export function SmartLink({ href, className, children, ...rest }) {
  if (isExternal(href)) {
    const mail = /^(mailto|tel):/i.test(href);
    return <a href={href} className={className} {...(mail ? {} : { target: '_blank', rel: 'noopener' })} {...rest}>{children}</a>;
  }
  return <Link to={toPath(href)} className={className} {...rest}>{children}</Link>;
}

const BTN_PRIMARY = 'group shrink-0 whitespace-nowrap inline-flex items-center gap-2 bg-[#231F20] hover:bg-[#B4D234] hover:text-[#231F20] text-white px-6 py-3.5 rounded-full text-sm transition-colors';
const BTN_PRIMARY_DARK = 'group shrink-0 whitespace-nowrap inline-flex items-center gap-2 bg-[#B4D234] hover:bg-white text-[#231F20] px-6 py-3.5 rounded-full text-sm transition-colors';
const BTN_SECONDARY = 'inline-flex items-center gap-2 border border-black/15 hover:border-black/60 px-6 py-3.5 rounded-full text-sm transition-colors';
const BTN_SECONDARY_DARK = 'inline-flex items-center gap-2 border border-white/20 hover:border-white/60 px-6 py-3.5 rounded-full text-sm transition-colors';

export const Arrow = () => <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />;

export function PrimaryBtn({ href, children, dark, onClick }) {
  return <SmartLink href={href} onClick={onClick} className={dark ? BTN_PRIMARY_DARK : BTN_PRIMARY}>{children} <Arrow /></SmartLink>;
}
export function SecondaryBtn({ href, children, dark }) {
  return <SmartLink href={href} className={dark ? BTN_SECONDARY_DARK : BTN_SECONDARY}>{children}</SmartLink>;
}
export function ArrowLink({ href, children, className = '' }) {
  if (!href || !children) return null;
  return (
    <SmartLink href={href} className={`group inline-flex items-center gap-2 text-sm link-hover ${className}`}>
      {children} <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
    </SmartLink>
  );
}

// Main and secondary buttons from a section's primaryLabel/primaryLink/secondaryLabel/secondaryLink.
export function Buttons({ s, dark, className = '' }) {
  if (!s.primaryLabel && !s.secondaryLabel) return null;
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {s.primaryLabel && <PrimaryBtn href={s.primaryLink || '#contact'} dark={dark}>{s.primaryLabel}</PrimaryBtn>}
      {s.secondaryLabel && <SecondaryBtn href={s.secondaryLink} dark={dark}>{s.secondaryLabel}</SecondaryBtn>}
    </div>
  );
}

export function Eyebrow({ text, dark, className = 'mb-4' }) {
  if (!text) return null;
  return (
    <div className={`text-xs tracking-[0.3em] uppercase ${dark ? 'text-neutral-400' : 'text-neutral-500'} ${className}`}>
      / <span dangerouslySetInnerHTML={{ __html: tx(text) }} />
    </div>
  );
}

// Full-width section band. `tone`: 'paper' (default), 'sand' or 'ink'.
export function Section({ tone = 'paper', anchor, className = '', inner = 'max-w-[1400px]', children }) {
  const bg = tone === 'sand' ? 'bg-[#F1EFE6]' : tone === 'ink' ? 'bg-[#231F20] text-white' : '';
  return (
    <section id={anchor || undefined} className={`px-6 md:px-10 py-14 md:py-20 scroll-mt-24 ${bg} ${className}`}>
      <div className={`${inner} mx-auto`}>{children}</div>
    </section>
  );
}

export const toneOf = (s) => (s.tint ? 'sand' : 'paper');

// Eyebrow + heading on the left, intro on the right (DESIGN_GUIDELINES.md §4).
export function SecHead({ s, dark, className = 'mb-12 md:mb-14' }) {
  if (!s.eyebrow && !s.heading && !s.intro) return null;
  return (
    <div className={`grid lg:grid-cols-12 gap-6 lg:gap-8 ${className}`}>
      <div className={s.intro ? 'lg:col-span-6' : 'lg:col-span-9'}>
        <Eyebrow text={s.eyebrow} dark={dark} />
        <Heading text={s.heading} className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-tight" />
      </div>
      {s.intro && (
        <Tx as="p" text={s.intro} className={`lg:col-span-5 lg:col-start-8 self-end text-lg leading-relaxed ${dark ? 'text-white/60' : 'text-neutral-600'}`} />
      )}
    </div>
  );
}

export const Note = ({ text, dark }) =>
  text ? <Tx as="p" text={text} className={`mt-8 text-xs leading-relaxed max-w-3xl ${dark ? 'text-white/40' : 'text-neutral-500'}`} /> : null;

export function Ticks({ items, dark }) {
  if (!items || !items.length) return null;
  return (
    <ul className="space-y-2.5">
      {items.map((b, i) => (
        <li key={i} className={`flex items-start gap-3 ${dark ? 'text-white/80' : 'text-neutral-800'}`}>
          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#B4D234] shrink-0" />
          <Tx text={b} />
        </li>
      ))}
    </ul>
  );
}

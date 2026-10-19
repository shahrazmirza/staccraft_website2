import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, MapPin, Phone, Check } from 'lucide-react';
import { brand, getPage } from '../site';
import { Tx, Heading, Eyebrow, Arrow } from '../components/ui';
import { useEnquiry, formRecipient } from '../lib/useEnquiry';
import { takePrefill } from '../prefill';

const FIELD = 'mt-2 w-full bg-transparent border-b border-black/20 focus:border-[#B4D234] outline-none py-2';
const LABEL = 'text-xs tracking-[0.25em] uppercase text-neutral-600';
const BTN_GHOST = 'inline-flex items-center gap-2 border border-black/15 hover:border-black/60 px-5 py-2.5 rounded-full text-sm transition-colors';

function Field({ id, name, label, type = 'text', ac, required, optional, st }) {
  const err = st.errors[name];
  return (
    <label className="block" htmlFor={id}>
      <span className={LABEL}>{label}{required && <span className="text-red-600">*</span>}{optional && <span className="normal-case tracking-normal text-neutral-400"> (optional)</span>}</span>
      <input id={id} name={name} type={type} autoComplete={ac} required={required} defaultValue={st.values[name] || ''}
        aria-invalid={err ? 'true' : undefined} aria-describedby={err ? id + '-err' : undefined} className={FIELD} />
      {err && <span id={id + '-err'} className="block mt-1.5 text-sm text-red-700">{err}</span>}
    </label>
  );
}

function Info({ icon, tag, children, href }) {
  const Wrap = href ? 'a' : 'div';
  return (
    <Wrap href={href} className="flex items-center gap-4 rounded-2xl bg-white/60 border border-black/10 p-5 hover:border-black/30 transition-colors">
      <div className="w-11 h-11 rounded-full bg-[#231F20] flex items-center justify-center text-[#B4D234] shrink-0">{icon}</div>
      <div className="min-w-0">
        <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">{tag}</div>
        <div className="font-serif text-lg [overflow-wrap:anywhere]">{children}</div>
      </div>
    </Wrap>
  );
}

export default function Contact({ s }) {
  const { st, submit, reset } = useEnquiry('enquiry', 'contact');
  const [industry, setIndustry] = useState(st.values.industry || '');
  const [message] = useState(() => takePrefill());
  const noteRef = useRef(null);
  const to = formRecipient();
  const hasPrivacy = !!getPage('privacy');

  useEffect(() => { if (['invalid', 'mail', 'sent', 'error'].includes(st.status)) noteRef.current?.focus(); }, [st.status]);

  let body;
  if (st.status === 'sent') {
    body = (
      <div className="bg-[#231F20] text-white rounded-3xl p-6 sm:p-10 md:p-14" aria-live="polite">
        <div className="w-14 h-14 rounded-full bg-[#B4D234] flex items-center justify-center mb-8"><Check className="w-6 h-6 text-[#231F20]" /></div>
        <h2 ref={noteRef} tabIndex={-1} className="font-serif text-4xl md:text-5xl leading-tight mb-4 outline-none">Message received.</h2>
        <Tx as="p" text={s.thanks || "Thanks, we'll be in touch."} className="block text-white/70 leading-relaxed max-w-lg" />
        <button type="button" onClick={() => reset(false)} className="mt-8 inline-flex items-center gap-2 border border-white/20 hover:border-white/60 px-5 py-2.5 rounded-full text-sm transition-colors">
          Send another enquiry <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    );
  } else if (st.status === 'mail') {
    body = (
      <div className="bg-white/60 border border-black/10 rounded-3xl p-8 md:p-10" aria-live="polite">
        <h2 ref={noteRef} tabIndex={-1} className="font-serif text-3xl md:text-4xl leading-tight mb-4 outline-none">Almost done: press Send in your email app.</h2>
        <p className="text-neutral-700 leading-relaxed max-w-xl">Your email app should have opened with your enquiry addressed to {to}. If it didn’t, open it with the button below, or copy your message and email it to us.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={st.href} target="_blank" rel="noopener" className="group inline-flex items-center gap-2 bg-[#231F20] hover:bg-[#B4D234] hover:text-[#231F20] text-white px-6 py-3 rounded-full text-sm transition-colors">Open email app <Arrow /></a>
          <CopyBtn text={'To: ' + to + '\n\n' + (st.body || '')} />
          <button type="button" onClick={() => reset(true)} className={BTN_GHOST}>Edit enquiry</button>
        </div>
      </div>
    );
  } else {
    const errs = Object.keys(st.errors).length > 0;
    body = (
      <form noValidate onSubmit={(e) => { e.preventDefault(); submit(e.currentTarget); }} aria-busy={st.status === 'sending' || undefined}
        className="bg-white/60 border border-black/10 rounded-3xl p-6 sm:p-8 md:p-10 space-y-6">
        {st.status === 'error' && (
          <div ref={noteRef} tabIndex={-1} role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm outline-none">
            <strong className="block">Your enquiry couldn’t be sent just now.</strong>
            Please try again, or <a className="underline" href={st.href} target="_blank" rel="noopener">send it from your email app</a> to {to}.
          </div>
        )}
        {errs && <div ref={noteRef} tabIndex={-1} role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium outline-none">Please check the highlighted fields.</div>}
        <div className="grid md:grid-cols-2 gap-6">
          <Field id="cf-name" name="name" label="Your name" ac="name" required st={st} />
          <Field id="cf-company" name="company" label="Company" ac="organization" optional st={st} />
          <Field id="cf-email" name="email" label="Work email" type="email" ac="email" required st={st} />
          <Field id="cf-phone" name="phone" label="Phone" type="tel" ac="tel" optional st={st} />
        </div>
        {(s.industries || []).length > 0 && (
          <fieldset>
            <legend className={`${LABEL} mb-3`}>Industry <span className="normal-case tracking-normal text-neutral-400">(optional)</span></legend>
            <input type="hidden" name="industry" value={industry} />
            <div className="flex flex-wrap gap-2">
              {s.industries.map((o) => (
                <button type="button" key={o} aria-pressed={industry === o} onClick={() => setIndustry(industry === o ? '' : o)}
                  className={`px-3.5 py-1.5 rounded-full text-sm border transition-colors ${industry === o ? 'bg-[#231F20] text-white border-[#231F20]' : 'border-black/15 hover:border-black/40'}`}>{o}</button>
              ))}
            </div>
          </fieldset>
        )}
        <label className="block" htmlFor="cf-msg">
          <span className={LABEL}>What would you like to improve? <span className="normal-case tracking-normal text-neutral-400">(optional)</span></span>
          <textarea id="cf-msg" name="message" rows={5} maxLength={5000} defaultValue={st.values.message ?? message}
            placeholder="For example: club orders are re-keyed into purchase orders by hand."
            aria-invalid={st.errors.message ? 'true' : undefined} className={`${FIELD} resize-none placeholder:text-neutral-400`} />
          {st.errors.message && <span className="block mt-1.5 text-sm text-red-700">{st.errors.message}</span>}
        </label>
        <div className="hidden" aria-hidden="true"><label htmlFor="cf-website">Website</label><input id="cf-website" name="website" tabIndex={-1} autoComplete="off" /></div>
        <label className="flex items-start gap-3 text-sm text-neutral-700">
          <input type="checkbox" name="marketing" value="yes" defaultChecked={!!st.values.marketing} className="mt-1 accent-[#231F20]" />
          <span>Send me occasional StacCraft news and insights. You can unsubscribe at any time.</span>
        </label>
        <button type="submit" disabled={st.status === 'sending'}
          className="group inline-flex items-center gap-2 bg-[#231F20] hover:bg-[#B4D234] hover:text-[#231F20] text-white px-7 py-3.5 rounded-full text-sm transition-colors disabled:opacity-60">
          {st.status === 'sending' ? 'Sending…' : <>Send enquiry <Arrow /></>}
        </button>
        <p className="text-xs text-neutral-500 leading-relaxed">
          <Tx text={s.privacyNote || 'We use these details only to reply to your enquiry.'} />
          {hasPrivacy && <> See our <Link to="/privacy" className="underline underline-offset-2 hover:text-[#231F20]">Privacy policy</Link>.</>}
        </p>
      </form>
    );
  }

  return (
    <div className="pt-36 md:pt-40">
      <section className="px-6 md:px-10 pb-16">
        <div className="max-w-[1400px] mx-auto">
          <Eyebrow text={s.eyebrow} className="mb-6" />
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <Heading as="h1" auto text={s.heading} className="lg:col-span-8 font-serif text-5xl md:text-7xl lg:text-[96px] leading-[0.95] tracking-[-0.03em] font-medium" />
            <Tx as="p" text={s.text} className="lg:col-span-4 block text-neutral-700 text-lg leading-relaxed" />
          </div>
        </div>
      </section>
      <section className="px-6 md:px-10 pb-16 md:pb-24">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">{body}</div>
          <aside className="lg:col-span-5 space-y-4">
            {brand.email && <Info icon={<Mail className="w-5 h-5" />} tag="Email" href={'mailto:' + brand.email}>{brand.email}</Info>}
            {brand.phone && <Info icon={<Phone className="w-5 h-5" />} tag="Phone"><Tx text={brand.phone} /></Info>}
            {brand.address && <Info icon={<MapPin className="w-5 h-5" />} tag="Office"><Tx text={brand.address} /></Info>}
          </aside>
        </div>
      </section>
    </div>
  );
}

function CopyBtn({ text }) {
  const [msg, setMsg] = useState('');
  const copy = () => {
    const done = (ok) => setMsg(ok ? 'Copied' : 'Couldn’t copy');
    try { navigator.clipboard.writeText(text).then(() => done(true), () => done(false)); } catch (e) { done(false); }
  };
  return <button type="button" onClick={copy} className={BTN_GHOST}>{msg || 'Copy message'}</button>;
}

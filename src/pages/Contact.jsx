import React, { useState } from 'react';
import { ArrowUpRight, Mail, MapPin, Clock, Check } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const interestOpts = ['Teamwear', 'B2C Web Store', 'B2B Portal', 'Procurement', 'Analytics', 'AI Assistance', 'Not sure yet'];

export default function Contact() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name:'', company:'', email:'', phone:'', interest:'Teamwear', message:'' });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    // mock submit; persist locally
    const entries = JSON.parse(localStorage.getItem('staccraft_leads') || '[]');
    entries.push({ ...form, at: new Date().toISOString() });
    localStorage.setItem('staccraft_leads', JSON.stringify(entries));
    setSent(true);
    toast({ title: 'Thanks — we’ve got it.', description: 'A StacCraft strategist will be in touch within one business day.' });
  };

  return (
    <div className="pt-32">
      <section className="px-6 md:px-10 pb-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-xs tracking-[0.3em] uppercase text-neutral-500 mb-6">/ Contact</div>
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <h1 className="lg:col-span-8 font-serif text-5xl md:text-7xl lg:text-[96px] leading-[0.95] tracking-[-0.03em] font-medium">
              Craft your <span className="serif-italic-accent">stack.</span>
            </h1>
            <p className="lg:col-span-4 text-neutral-700 text-lg">
              Tell us how your business runs. We’ll show you the StacCraft platform shaped around it — including the AI assistance that fits your operation.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 pb-24">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-10">
          {/* Form */}
          <div className="lg:col-span-8">
            {sent ? (
              <div className="bg-[#231F20] text-[#FFFFFF] rounded-3xl p-10 md:p-14">
                <div className="w-14 h-14 rounded-full bg-[#B4D234] flex items-center justify-center mb-8">
                  <Check className="w-6 h-6 text-[#231F20]"/>
                </div>
                <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-4">Message received.</h2>
                <p className="text-white/70 leading-relaxed max-w-lg">Thanks {form.name.split(' ')[0] || 'there'} — a StacCraft strategist will reach out within one business day with an agenda and a proposed time for your walkthrough.</p>
                <button onClick={() => { setSent(false); setForm({ name:'', company:'', email:'', phone:'', interest:'Teamwear', message:'' }); }} className="mt-8 inline-flex items-center gap-2 border border-white/20 hover:border-white/60 px-5 py-2.5 rounded-full text-sm transition-colors">
                  Send another <ArrowUpRight className="w-4 h-4"/>
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="bg-white/60 border border-black/10 rounded-3xl p-8 md:p-10 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Field label="Full name" value={form.name} onChange={v => setForm(f=>({...f,name:v}))} required />
                  <Field label="Company" value={form.company} onChange={v => setForm(f=>({...f,company:v}))} required />
                  <Field label="Work email" type="email" value={form.email} onChange={v => setForm(f=>({...f,email:v}))} required />
                  <Field label="Phone (optional)" value={form.phone} onChange={v => setForm(f=>({...f,phone:v}))} />
                </div>
                <div>
                  <div className="text-xs tracking-[0.25em] uppercase text-neutral-600 mb-3">Interested in</div>
                  <div className="flex flex-wrap gap-2">
                    {interestOpts.map(o => (
                      <button type="button" key={o} onClick={() => setForm(f => ({...f, interest: o}))} className={`px-3.5 py-1.5 rounded-full text-sm border transition-colors ${form.interest === o ? 'bg-[#231F20] text-[#FFFFFF] border-[#231F20]' : 'border-black/15 hover:border-black/40'}`}>{o}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs tracking-[0.25em] uppercase text-neutral-600">Tell us about your operation</label>
                  <textarea value={form.message} onChange={e => setForm(f=>({...f, message:e.target.value}))} rows={5} placeholder="Channels you sell through, systems you run, what’s not working today…" className="mt-2 w-full bg-transparent border-b border-black/20 focus:border-[#B4D234] outline-none py-2 resize-none placeholder:text-neutral-400"/>
                </div>
                <button type="submit" className="group inline-flex items-center gap-2 bg-[#231F20] hover:bg-[#B4D234] hover:text-[#231F20] text-[#FFFFFF] px-7 py-3.5 rounded-full text-sm transition-colors">
                  Book my walkthrough <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45"/>
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <aside className="lg:col-span-4 space-y-4">
            <InfoCard icon={<Mail className="w-5 h-5"/>} tag="Email" title="info@staccraft.com.au" href="mailto:info@staccraft.com.au"/>
            <InfoCard icon={<MapPin className="w-5 h-5"/>} tag="Studio" title="Melbourne, Australia"/>
            <InfoCard icon={<Clock className="w-5 h-5"/>} tag="Hours" title="Mon–Fri · 9:00–17:00 AEST"/>
            <div className="rounded-2xl bg-[#231F20] text-[#FFFFFF] p-6">
              <div className="text-xs tracking-[0.3em] uppercase text-neutral-500 mb-3">/ Expect</div>
              <ul className="space-y-2.5 text-sm text-white/80">
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[#B4D234] mt-0.5 shrink-0"/> A 45-minute walkthrough shaped to your operation</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[#B4D234] mt-0.5 shrink-0"/> Zero canned demos — real workflows from the admin portal</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[#B4D234] mt-0.5 shrink-0"/> Clear next steps within one business day</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

function Field({ label, value, onChange, type='text', required=false }) {
  return (
    <label className="block">
      <span className="text-xs tracking-[0.25em] uppercase text-neutral-600">{label}{required && <span className="text-red-500">*</span>}</span>
      <input type={type} required={required} value={value} onChange={e=>onChange(e.target.value)} className="mt-2 w-full bg-transparent border-b border-black/20 focus:border-[#B4D234] outline-none py-2"/>
    </label>
  );
}

function InfoCard({ icon, tag, title, href }) {
  const Wrap = href ? 'a' : 'div';
  return (
    <Wrap href={href} className="flex items-center gap-4 rounded-2xl bg-white/60 border border-black/10 p-5 hover:border-black/30 transition-colors">
      <div className="w-11 h-11 rounded-full bg-[#231F20] flex items-center justify-center text-[#B4D234]">{icon}</div>
      <div>
        <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">{tag}</div>
        <div className="font-serif text-lg">{title}</div>
      </div>
    </Wrap>
  );
}

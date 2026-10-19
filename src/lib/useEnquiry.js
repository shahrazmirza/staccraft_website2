import { useState } from 'react';
import { brand } from '../site';
import { EMAIL_RE, validateEnquiry, enquiryBody, buildMailto, buildPayload } from './enquiry';

export const formRecipient = () => {
  const to = String(brand.formTo || brand.email || '').trim();
  return EMAIL_RE.test(to) ? to : 'info@staccraft.com.au';
};

function openMail(href) {
  const a = document.createElement('a');
  a.href = href; a.target = '_blank'; a.rel = 'noopener'; a.style.display = 'none';
  document.body.appendChild(a);
  try { a.click(); } catch (e) { /* the "Open email app" button is the fallback */ }
  a.remove();
}

// Sends to brand.formEndpoint (e.g. Web3Forms) when set; otherwise opens the visitor's email app.
// status: idle | invalid | sending | sent | mail | error
export function useEnquiry(kind, page) {
  const [st, setSt] = useState({ status: 'idle', errors: {}, values: {} });

  async function submit(form) {
    if (st.status === 'sending') return;
    const fd = new FormData(form);
    const raw = {};
    fd.forEach((v, k) => { raw[k] = v; });
    raw.kind = kind;
    raw.marketing = kind === 'subscribe' ? true : fd.get('marketing') === 'yes';
    const v = validateEnquiry(raw);
    if (!v.ok) { setSt({ status: 'invalid', errors: v.errors, values: raw }); return; }
    if (v.spam) { setSt({ status: 'sent', errors: {}, values: {} }); return; }
    const to = formRecipient();
    const href = buildMailto(to, v.data);
    const body = enquiryBody(v.data);
    const endpoint = String(brand.formEndpoint || '').trim();
    if (/^https:\/\//i.test(endpoint)) {
      setSt({ status: 'sending', errors: {}, values: raw, href, body });
      try {
        const r = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(buildPayload(v.data, { accessKey: brand.formAccessKey, to, page })),
        });
        let ok = r.ok;
        try { const j = await r.json(); if (j && j.success === false) ok = false; } catch (e) { /* non-JSON reply */ }
        if (!ok) throw new Error('HTTP ' + r.status);
        setSt({ status: 'sent', errors: {}, values: {} });
        if (window.gtag) window.gtag('event', kind === 'subscribe' ? 'sign_up' : 'generate_lead', { method: 'website_form' });
      } catch (err) {
        setSt({ status: 'error', errors: {}, values: raw, href, body });
      }
      return;
    }
    setSt({ status: 'mail', errors: {}, values: raw, href, body });
    openMail(href);
  }

  const reset = (keep) => setSt({ status: 'idle', errors: {}, values: keep ? st.values : {} });
  return { st, submit, reset };
}

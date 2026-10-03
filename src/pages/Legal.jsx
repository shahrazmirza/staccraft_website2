import React from 'react';
import { Link } from 'react-router-dom';

// DRAFT legal pages. Anything wrapped in <Ph> is a detail only StacCraft can supply
// (providers, retention period). It renders as a highlighted
// [ placeholder ] so gaps are obvious on the page. Have both pages reviewed before launch.

const LAST_UPDATED = 'October 2026';
const EMAIL = 'info@staccraft.com.au';

function Ph({ children }) {
  return <span className="font-mono text-[0.85em] bg-[#B4D234]/25 text-[#231F20] px-1.5 py-0.5 rounded">[ {children} ]</span>;
}

function LegalLayout({ eyebrow, title, intro, children }) {
  return (
    <div className="pt-32">
      <section className="px-6 md:px-10 pb-16 md:pb-24">
        <div className="max-w-[820px] mx-auto">
          <div className="text-xs tracking-[0.3em] uppercase text-neutral-500 mb-6">/ {eyebrow}</div>
          <h1 className="font-serif text-5xl md:text-7xl leading-[0.95] tracking-[-0.03em] font-medium">{title}</h1>
          <p className="text-neutral-700 text-lg leading-relaxed mt-8">{intro}</p>
          <div className="mt-6 text-[11px] font-mono uppercase tracking-widest text-neutral-500">Last updated: {LAST_UPDATED}</div>
          <div className="mt-12 space-y-10">{children}</div>
        </div>
      </section>
    </div>
  );
}

function Section({ n, title, children }) {
  return (
    <section className="border-t border-black/10 pt-8">
      <div className="text-[11px] font-mono text-neutral-400 mb-2">{String(n).padStart(2, '0')}</div>
      <h2 className="font-serif text-2xl md:text-3xl mb-4">{title}</h2>
      <div className="space-y-4 text-neutral-700 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_a]:underline [&_a]:underline-offset-2">{children}</div>
    </section>
  );
}

const Email = () => <a href={`mailto:${EMAIL}`}>{EMAIL}</a>;

export function Privacy() {
  return (
    <LegalLayout
      eyebrow="Privacy"
      title="Privacy policy."
      intro="This policy explains what personal information StacCraft collects through this website, why we collect it, and how we look after it."
    >
      <Section n={1} title="Who we are">
        <p>This website is operated by StacCraft Pty Ltd (ABN 74 690 577 845), based in Melbourne, Australia (“StacCraft”, “we”, “us”).</p>
        <p>We handle personal information in line with the Australian Privacy Principles where they apply to us.</p>
      </Section>

      <Section n={2} title="What we collect">
        <p>When you contact us through the form on our <Link to="/contact">Contact page</Link> or by email, we collect the details you give us:</p>
        <ul>
          <li>your name and company</li>
          <li>your work email address and, if you choose to provide it, your phone number</li>
          <li>the products you’re interested in and anything you tell us about your operation</li>
        </ul>
        <p>Like most websites, our hosting provider may automatically record technical information such as your IP address, browser type and the pages you visit, for security and performance. We do not use advertising or tracking cookies. <Ph>Update this if analytics or other cookies are added</Ph></p>
      </Section>

      <Section n={3} title="Why we collect it">
        <ul>
          <li>to respond to your enquiry and arrange a walkthrough</li>
          <li>to provide, and communicate with you about, services you engage us for</li>
          <li>to keep business records and meet our legal obligations</li>
        </ul>
        <p>We don’t sell your personal information. We’ll only send you marketing if you’ve agreed to it, and you can opt out at any time.</p>
      </Section>

      <Section n={4} title="Who we share it with">
        <p>We only share personal information with service providers who help us run our business, under obligations to keep it confidential, such as:</p>
        <ul>
          <li>website hosting: <Ph>hosting provider</Ph></li>
          <li>email: <Ph>email provider</Ph></li>
          <li><Ph>any CRM or form-handling service used for enquiries</Ph></li>
        </ul>
        <p>Some of these providers may store data outside Australia, including in <Ph>countries, e.g. the United States</Ph>. We may also disclose information where required or authorised by law.</p>
      </Section>

      <Section n={5} title="How we store and protect it">
        <p>We take reasonable steps to protect personal information from misuse, loss and unauthorised access, including access controls and reputable providers. We keep enquiry records for <Ph>retention period</Ph>, then delete or de-identify them unless we need them for an ongoing relationship or legal reason.</p>
      </Section>

      <Section n={6} title="Accessing or correcting your information">
        <p>You can ask to see or correct the personal information we hold about you by emailing <Email />. We’ll respond within a reasonable time, usually 30 days.</p>
      </Section>

      <Section n={7} title="Questions and complaints">
        <p>If you have a question or complaint about how we’ve handled your personal information, email <Email />. We’ll look into it and respond within 30 days. If you’re not satisfied with our response, you can contact the Office of the Australian Information Commissioner at <a href="https://www.oaic.gov.au" target="_blank" rel="noreferrer">oaic.gov.au</a>.</p>
      </Section>

      <Section n={8} title="Changes to this policy">
        <p>We may update this policy from time to time. The latest version will always be on this page, with the date it was last updated.</p>
      </Section>
    </LegalLayout>
  );
}

export function Terms() {
  return (
    <LegalLayout
      eyebrow="Terms"
      title="Terms of use."
      intro="These terms apply to your use of the StacCraft website. By using the site, you agree to them."
    >
      <Section n={1} title="About this website">
        <p>This website is operated by StacCraft Pty Ltd (ABN 74 690 577 845). It provides general information about our products and services.</p>
      </Section>

      <Section n={2} title="Information only">
        <p>Content on this site is general information, not an offer or a commitment to supply. Every StacCraft solution is shaped to the client, so the features, integrations and timeframes in any engagement are those agreed in writing with you. We may change the site’s content at any time.</p>
      </Section>

      <Section n={3} title="Intellectual property">
        <p>The content, design, logo and branding on this site belong to StacCraft or its licensors. You may view and share pages for your own reference, but you may not copy, modify or republish them for commercial purposes without our written permission.</p>
        <p>Other names, logos and trademarks shown on this site, including client and integration partner names, belong to their respective owners and are used for identification only.</p>
      </Section>

      <Section n={4} title="Using the site">
        <p>You agree not to misuse the site, including by attempting to gain unauthorised access, interfering with its operation, or submitting false or harmful information through our forms.</p>
      </Section>

      <Section n={5} title="Links to other websites">
        <p>The site may link to third-party websites. We’re not responsible for their content or practices.</p>
      </Section>

      <Section n={6} title="Liability">
        <p>We take care to keep the site accurate and available, but we don’t guarantee that it will be error-free or uninterrupted. To the extent permitted by law, we’re not liable for any loss arising from your use of the site. Nothing in these terms excludes rights you may have under the Australian Consumer Law.</p>
      </Section>

      <Section n={7} title="Privacy">
        <p>How we handle personal information is explained in our <Link to="/privacy">Privacy policy</Link>.</p>
      </Section>

      <Section n={8} title="Governing law">
        <p>These terms are governed by the laws of Victoria, Australia, and you submit to the courts of that state.</p>
      </Section>

      <Section n={9} title="Contact">
        <p>Questions about these terms? Email <Email />.</p>
      </Section>
    </LegalLayout>
  );
}

# StacCraft design guidelines

This document records the visual design of this website. All words, pages and
menus come from `content.json`; this design decides how they look. **When the
content changes, change `content.json` only. Don't change the design rules below.**

Stack: React 19 + Vite + Tailwind CSS v3. Fonts load from Google Fonts in
`src/index.css`; images live in `public/live/` and `public/tpl/`.

---

## 1. Where content lives

| What | Where |
| --- | --- |
| Every page, its sections and their words | `pages` in `content.json` |
| Menu (top-level links and the Platform / Industries dropdowns) | `showInNav`, `navGroup`, `navLabel` on each page in `content.json` |
| Logo, header button, footer text, email, form and analytics settings | `brand` in `content.json` |
| Browser tab title and search description | each page's `title` and `description` |
| Images | `public/live/`, `public/tpl/`, referenced from `content.json` as `live/…` or `tpl/…` |

Each section has a `type`. `src/pages/Page.jsx` maps it to a component in
`src/sections/`:

| Type | Component | Look |
| --- | --- | --- |
| `hero` | `Hero.jsx` | Page headline. `layout: "center"` (Home, Integrations) puts the console or diagram full width below; otherwise the visual sits to the right |
| `split` | `Split` | Copy beside an example screen; `panel: true` puts it in a sand panel |
| `cards`, `benefits`, `flow`, `sports` | `Cards`, `Benefits`, `Flow`, `Sports` | Card grids (section 6) |
| `tabs`, `modules`, `calc`, `e2eflow` | `Tabs`, `Modules`, `Calc`, `E2EFlow` | Interactive: tab list, module picker, cost calculator, order-flow diagram |
| `stats`, `stages`, `compare`, `stack`, `faq` | same names | Numbers, process with exceptions, comparison table, cost stack, questions |
| `integrations` | `Integrations` | Ink band, divided grid |
| `statement`, `richtext`, `cta`, `video` | same names | Big sentence, long text, closing CTA panel, video |
| `beforeafter`, `tenants`, `syncmap` | same names | Diagrams |
| `showcase`, `shots` | same names | Real screenshots in browser frames |
| `posts`, `article` | `Blog.jsx` | Insights index and articles (also the Privacy policy) |
| `contact` | `Contact.jsx` | Contact page and form |

**Rule:** a new page or section is added in `content.json` using one of these
types. A new `type` needs a new component built from the parts in section 6.

The example-screen mock-ups and diagrams (`src/legacy/visuals.js`) keep their
own markup and are restyled in this palette by `src/styles/visuals.css`. If a
mock-up looks off-palette, fix it with an override at the end of that file.

---

## 2. Colour

The palette is small and is used as hard-coded hex values throughout the code.
Use only these colours.

| Role | Hex | Tailwind usage | Used for |
| --- | --- | --- | --- |
| **Ink** | `#231F20` | `bg-[#231F20]` `text-[#231F20]` | Primary text, primary buttons, dark sections, active nav pill |
| **Lime (brand accent)** | `#B4D234` | `bg-[#B4D234]` `text-[#B4D234]` | Highlight under accent words, icons on dark, hover state of primary buttons, bullet dots, focus underline, text selection |
| **Paper (page background)** | `#FBFAF5` | set on `body` | Page background, scrolled navbar background |
| **Sand (alt section)** | `#F1EFE6` | `bg-[#F1EFE6]` | Alternate light sections, CTA panels, info asides, browser-frame bars |
| **White** | `#FFFFFF` | `bg-white` `text-white` | Cards on paper, text on ink |

Neutrals use Tailwind's `neutral` scale and black/white alpha values:

- Body copy on light: `text-neutral-700` (secondary: `text-neutral-600`)
- Eyebrows / meta labels on light: `text-neutral-500`, faint: `text-neutral-400`
- Body copy on ink: `text-white/70` or `text-white/60`; labels `text-white/40`–`/50`
- Borders on light: `border-black/10` (stronger: `/15`, hover `/40`–`/60`)
- Borders on ink: `border-white/10` (buttons `/20`, hover `/60`)
- Translucent cards on paper: `bg-white/50` or `bg-white/60`

**Don't** add new brand colours. The shadcn HSL variables in `src/index.css`
(`--accent` terracotta, etc.) are leftovers used only by the toast component.
Don't use them in page design.

---

## 3. Typography

Three families (loaded in `src/index.css`):

| Family | Class | Used for |
| --- | --- | --- |
| **Fraunces** (serif) | `font-serif` | All headings, card titles, big numbers, quotes |
| **Inter** (sans) | default | Body copy, buttons, nav, form fields |
| **JetBrains Mono** | `font-mono` | Tags, numbering, meta labels, placeholders |

### Type scale

| Element | Classes |
| --- | --- |
| Home hero H1 | `font-serif text-[48px] sm:text-[72px] md:text-[104px] leading-[0.95] tracking-[-0.03em] font-medium` |
| Page H1 (Products, About, Cases, Contact) | `font-serif text-5xl md:text-7xl lg:text-[96px]`–`lg:text-[104px] leading-[0.95] tracking-[-0.03em] font-medium` |
| Section H2 | `font-serif text-4xl md:text-6xl leading-[1] tracking-tight` (smaller sections: `md:text-5xl leading-[1.05]`) |
| CTA panel H3 | `font-serif text-3xl md:text-5xl leading-tight` |
| Card title | `font-serif text-2xl md:text-3xl` |
| Lead paragraph | `text-lg leading-relaxed text-neutral-700` (max width `max-w-md`–`max-w-2xl`) |
| Body / card copy | `text-sm leading-relaxed text-neutral-600` |
| Big stat number | `font-serif text-5xl md:text-7xl leading-none tracking-tight` |

### Signature text patterns

These give the site its voice. Keep them in new content.

1. **Accent word.** Page H1s and most section H2s have exactly **one** key word (or short phrase)
   wrapped in `<span className="serif-italic-accent">`. It renders as an italic
   serif with a skewed lime highlighter bar behind it.
   - `Commerce that <accent>fits</accent>`
   - `One suite, <accent>shaped</accent> to your business.`
   - `Craft your <accent>stack.</accent>`

   Pick the word that carries the meaning. Never highlight a whole sentence.
   In `content.json`, wrap the word in `{braces}` to accent it. Page titles
   (hero and contact headings) and CTA headings accent their last word automatically.
2. **Eyebrow label.** Sits above every section heading. Starts with `/ `.
   `text-xs tracking-[0.3em] uppercase text-neutral-500 mb-4`, for example
   `/ What we offer`, `/ Integrations`, `/ Our process`.
3. **Code-comment meta label.** Small labels inside cards start with `// `.
   `text-[10px] font-mono uppercase tracking-widest`, for example
   `// Featured build`, `// AI native`, `// GROUP 01`.
4. **Two-digit numbering.** Items in a series are tagged `01`, `02`, `03`… in
   `font-mono text-xs`. Product modules show `MODULE // 03`.
5. **Placeholders.** Missing content is shown honestly as
   `[ Description of what's missing ]` in `font-mono text-neutral-400`, never
   made-up figures or quotes.

### Tone of copy

Australian English (`colour`, `organisation`, `recognisable`). Short,
confident sentences. Use real curly quotes and apostrophes (`’ “ ”`) and em
dashes (`—`) with spaces around them.

---

## 4. Layout

- **Container:** `max-w-[1400px] mx-auto`. Narrow reading pages (legal):
  `max-w-[820px]`. Centred quote: `max-w-[1100px]`.
- **Side padding:** `px-6 md:px-10` on every section.
- **Top of page:** inner pages start with `pt-32`; Home hero uses `pt-40`
  (clears the fixed navbar).
- **Section spacing:** `py-16 md:py-24` (larger feature sections
  `py-20 md:py-28`). Sections that sit on the page background can use
  `pb-16 md:pb-24` / `mb-16 md:mb-24` instead.
- **Grid:** a 12-column grid (`grid lg:grid-cols-12 gap-8`).
  - Section header: eyebrow + heading in `lg:col-span-5` (or 4/8), supporting
    paragraph in `lg:col-span-6 lg:col-start-7 self-end`.
  - Page hero: H1 `lg:col-span-8`, intro paragraph `lg:col-span-4`, `items-end`.
  - Card grids: `grid md:grid-cols-2 lg:grid-cols-3 gap-4` (4-up:
    `md:grid-cols-2 xl:grid-cols-4`).
- **Section rhythm:** most sections sit on the paper background. Break up long
  pages with full-width sand (`#F1EFE6`) or ink (`#231F20`) bands, for example
  the Home marquee, integrations and testimonial, and About's process band.
  Pages usually end with a rounded CTA panel (section 6); the footer always
  repeats the main call to action.
- **Breakpoints:** Tailwind defaults. Nav collapses to the menu button below
  `lg` (1024px). Check every change at 375px, 768px, 1024px and 1440px.

---

## 5. Shape, depth and texture

- **Corner radius:** pills `rounded-full` (buttons, chips, nav, icon circles);
  cards `rounded-2xl`; large panels and CTA bands `rounded-3xl`; small inner
  boxes `rounded-xl`.
- **Shadows:** almost none. Only screenshots use
  `shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)]`; the mobile menu uses
  `shadow-lg`. Depth otherwise comes from borders and colour bands.
- **Texture:** a 4% film-grain overlay covers the whole site (`.grain` on the
  app root). The Home hero adds a dotted grid (`.dotted-bg`).
- **Image overlays:** photos with text on them get
  `bg-gradient-to-t from-black/70 via-black/10 to-transparent`.

---

## 6. Components

Copy these class strings exactly when building new sections.

### Buttons

| Variant | Classes |
| --- | --- |
| **Primary (on light)** | `group inline-flex items-center gap-2 bg-[#231F20] hover:bg-[#B4D234] hover:text-[#231F20] text-white px-6 py-3.5 rounded-full text-sm transition-colors` |
| **Primary (on ink)** | `group inline-flex items-center gap-2 bg-[#B4D234] hover:bg-white text-[#231F20] px-6 py-3.5 rounded-full text-sm transition-colors` |
| **Secondary / outline** | `inline-flex items-center gap-2 border border-black/15 hover:border-black/60 px-6 py-3.5 rounded-full text-sm transition-colors` (on ink: `border-white/20 hover:border-white/60`) |
| **Text link** | `inline-flex items-center gap-2 text-sm link-hover` (animated underline) |

Primary buttons end with `<ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45"/>`.
Add `shrink-0 whitespace-nowrap` when the button sits beside a heading. The
main call to action across the site is **"Book a walkthrough"**, which links to `/contact`.

### Cards

- **Product card (hover inverts to ink):**
  `group bg-white/50 hover:bg-[#231F20] border border-black/10 hover:border-[#231F20] rounded-2xl p-6 md:p-7 transition-all duration-300`.
  It has an icon circle at top left, a mono `01` tag at top right, a serif
  title, short copy, and a bottom row with a top border holding "Explore" and an arrow.
- **Light card:** `bg-white border border-black/10 rounded-2xl p-7` (or
  `bg-white/60 … p-8` on paper).
- **Card on ink:** `bg-white/[0.03] border border-white/10 rounded-2xl p-7 hover:bg-white/[0.06] transition-colors`.
- **Divided grid on ink** (integrations): wrapper `grid md:grid-cols-3 gap-px bg-white/10`, cells `bg-[#231F20]`.

### Icon circles

`w-11 h-11 rounded-full flex items-center justify-center` holding a
`lucide-react` icon at `w-5 h-5`. Use one of these styles:
- outline on light: `border border-black/20`, on hover `bg-[#B4D234]`
- ink circle with a lime icon: `bg-[#231F20]` + `text-[#B4D234]`
- lime circle with an ink icon (on dark sections): `bg-[#B4D234]` + `text-[#231F20]`

Icons come only from `lucide-react`.

### Chips / tags

- Neutral chip: `px-3 py-1.5 rounded-full text-sm bg-white border border-black/10`
  (on sand use `bg-[#F1EFE6]`; small: `px-3 py-1 text-xs`)
- Status badge on an image: `px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-widest bg-[#B4D234] text-[#231F20]`
- Pill label with a dot (hero): `border border-black/10 bg-white/60 backdrop-blur-sm rounded-full px-3.5 py-1.5` + a lime `Circle` icon + uppercase `text-xs tracking-widest` text

### Lists

- Bullets: a `w-1.5 h-1.5 rounded-full bg-[#B4D234]` dot followed by text
- Checks: a `w-5 h-5 rounded-full bg-[#231F20]` circle containing a lime `Check` icon,
  or a plain `Check` icon `w-4 h-4` (lime on ink)

### Screenshot frame

Product and case screenshots always sit in a fake browser window:
`figure.rounded-2xl overflow-hidden border border-black/10 bg-white shadow-[…]`
with a top bar on `bg-[#F1EFE6]` holding three `w-2.5 h-2.5 rounded-full bg-black/15`
dots and a mono uppercase label. Keep screenshots near their native width
(~1024px) so they stay sharp.

### CTA panel (end of a page)

`max-w-[1400px] mx-auto rounded-3xl bg-[#F1EFE6] p-8 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6`
holds an optional eyebrow, a serif H3 with an accent word, and a primary button. The ink version
uses `bg-[#231F20] text-white` and a lime primary button.

### Forms

Fields have no box, just a bottom border: `w-full bg-transparent border-b border-black/20 focus:border-[#B4D234] outline-none py-2`.
Labels: `text-xs tracking-[0.25em] uppercase text-neutral-600`. Choice
options are pill toggle buttons (active = ink fill).

### Navbar and footer

Shared on every page; don't fork them per page. The navbar is fixed. It's
transparent at the top and becomes `bg-[#FBFAF5]/90 backdrop-blur-lg` with a
hairline border after 20px of scroll. The active link is an ink pill; pages
sharing a `navGroup` open as a dropdown. The full menu shows from 1280px (`xl`);
below that it collapses to the menu button. The footer is ink, with the light
logo, the brand blurb, the header button and one link column per menu group.

---

## 7. Motion

Keep it subtle and consistent:

- Page and panel entrance: `.fade-up` (0.8s rise and fade).
- Rotating hero word: `.slide-in`, cycling every 2.4s.
- Client logo strip: `.marquee` (40s linear loop; the list is rendered twice).
- Hover: colour transitions (`transition-colors`), arrow icons rotate 45°,
  images scale to `105%` over `duration-700`, links underline via `.link-hover`.
- No bouncing, parallax or scroll-jacking.

---

## 8. Imagery

- Photos: real, documentary-style photos of kit, apparel and operations, used full-bleed in
  `rounded-2xl`/`rounded-3xl` frames with `object-cover`.
- Product UI: real screenshots in the browser frame (section 6).
- Logos: `brand.logo` (`tpl/logo.png`) on light, `brand.logoLight` (`tpl/logo-light.png`) on ink.
- Store every image locally in `public/live/` or `public/tpl/` and reference it
  from `content.json` as `live/<file>` or `tpl/<file>`. Don't hotlink images from other sites.
- Every `<img>` needs meaningful `alt` text; images below the fold use `loading="lazy"`.

---

## 9. Checklist for content changes

1. Change the words in `content.json` (or publish from the prototype editor and
   copy its `content.json` in). Don't add markup, CSS, colours or fonts.
2. Give each section an `eyebrow` and, where it helps, accent one heading word with `{braces}`.
3. Put new images in `public/live/` or `public/tpl/` and reference them as `live/…` or `tpl/…`.
4. If the content needs a section type that doesn't exist yet, build it from the
   components in section 6 and follow the layout rules in section 4.
5. Leave anything not yet confirmed as a visible `[placeholder]` rather than
   inventing it.
6. Run `npm run build`, then check each changed page at mobile and desktop widths.

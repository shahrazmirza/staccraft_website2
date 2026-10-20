# StacCraft Official Website

The StacCraft marketing website: the content from the Atelier prototype, presented in the StacCraft website design (charcoal, sand and lime, Fraunces and Inter). Built with React, Vite and Tailwind CSS, and hosted on Azure Static Web Apps.

Live prototype and content editor: https://claude.ai/artifact/YJgSxn1DRUKS7oSreoXX8G

## What's in the repo

- `content.json` holds all the words: every page, section, menu entry and brand setting. The site is built from it, so changing the content never needs a code change.
- `src/` is the site itself. `src/pages/Page.jsx` maps each section `type` in `content.json` to a component in `src/sections/`.
- `src/legacy/visuals.js` holds the example-screen mock-ups and diagrams from the original prototype. `src/styles/visuals.css` restyles them in this design.
- `public/live/` holds screenshots of the live Kookaburra stores, used on the Customers page. `public/tpl/` holds the logos and other images.
- `DESIGN_GUIDELINES.md` describes the design: colours, type, layout and components.
- `azure-static-web-apps-calm-tree-023fbb900.yml` is the Azure Pipelines deployment. Pushing to `main` builds the site and deploys `dist/`.

## Run it locally

Needs Node.js 20 or later.

```sh
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve the production build
```

Pages have their own addresses, for example `/platform` or `/case-studies`, with `/` for Home. A section's anchor is added with `#`, for example `/pricing#calc`. Old links such as `/#platform` are redirected to the new addresses.

## Changing the content

Content is edited in the live prototype, using **Manage site**, then **Publish**. To bring those changes into this repo, download the published `content.json` from the prototype and commit it to the root of this repo, replacing the old one. The next deployment rebuilds the site with the new words; the design doesn't change.

- Images referenced in `content.json` (for example `live/tw-clubs.jpg`) must exist under `public/`. Images uploaded in the prototype's editor live in the prototype, so download them and add them to `public/live/` or `public/tpl/`, then point `content.json` at that path.
- Text in `[square brackets]` shows on the site as a highlighted placeholder. It marks content that still needs to be written or confirmed.
- Wrap a word in `{curly braces}` in a heading to give it the lime highlight, for example `"heading": "One suite, {shaped} to your business."`. Page titles highlight their last word automatically.
- Links are written as `#page-id` or `#page-id.anchor`, as in the prototype. The site turns them into `/page-id` and `/page-id#anchor`.

## Brand settings worth knowing (`content.json` → `brand`)

| Setting | What it does |
|---|---|
| `logo`, `logoLight` | Logo on light backgrounds (header) and on charcoal (footer). |
| `headerCtaLabel`, `headerCtaLink` | The "Book a walkthrough" button in the header, mobile menu and footer. |
| `formTo` | Address the contact form sends to (`info@staccraft.com.au`). |
| `formEndpoint`, `formAccessKey` | Optional form service such as Web3Forms. When blank, the form opens the visitor's email app instead. |
| `gaId`, `analyticsLive` | Google Analytics 4 ID. Analytics only load after the visitor consents, and only when `analyticsLive` is `true`. Turn it on once the site is on its own domain. |
| `erpName` | ERP name shown in example screens and diagrams. Blank shows "Your ERP". |

`look` and `accent` are used by the prototype only. This site always uses the design in `DESIGN_GUIDELINES.md`.

## Link previews and search

Teams, Slack, LinkedIn and search engines read a page's HTML without running JavaScript, so the build writes each page's title, `description` (from `content.json`) and preview image into its own HTML file (`vite.config.js`, `pageMeta`). The preview image is `public/og-image.png` (1200×630).

Preview images need the site's full address. On Vercel it's filled in automatically. Elsewhere, set the `SITE_URL` environment variable for the build, for example `SITE_URL=https://staccraft.com`.

Teams and LinkedIn cache previews for a while. To check a change straight away, share the link with something added to the end, such as `?v=2`.

## Before going live

- Replace the remaining `[placeholders]`. The prototype editor's Pages tab shows a count for each page.
- Get Kookaburra Sport's sign-off on the Customers page and its quote.
- Set `formEndpoint` if enquiries should arrive without the visitor's email app.
- Add the GA4 ID and set `analyticsLive` to `true`.
- Set `SITE_URL` in the Azure build once the domain is known, so link previews show the image.

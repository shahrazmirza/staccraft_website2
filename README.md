# StacCraft Official Website

The StacCraft marketing website, built as a static site in the Atelier design (slate and bronze).

Live prototype and content editor: https://claude.ai/artifact/YJgSxn1DRUKS7oSreoXX8G

## What's in the repo

- `index.html` is the whole site: layout, styles, the example-screen mockups, diagrams and the page renderer. It has no build step and no dependencies apart from Google Fonts.
- `content.json` holds all the words: every page, section, menu entry and brand setting. The page reads it when it loads.
- `live/` holds screenshots of the live Kookaburra stores, used on the Customers page.
- `tpl/` holds the logos and other template images.

## Run it locally

The page loads `content.json` with `fetch`, so it must be served over HTTP. Opening `index.html` straight from disk won't work.

```sh
python -m http.server 8080
# then open http://localhost:8080
```

Pages are addressed by hash, for example `#home`, `#platform` or `#case-studies`.

## Changing the content

Content is edited in the live prototype, using **Manage site**, then **Publish**. To bring those changes into this repo, download the published `content.json` from the prototype and commit it to the root of this repo.

The **Manage site** editor only appears inside the prototype, because publishing relies on the prototype's hosting. On any other host the site is read-only, so edit `content.json` directly or make the change in the prototype and copy it across.

Text in `[square brackets]` inside `content.json` shows on the site as a highlighted placeholder. It marks content that still needs to be written or confirmed.

## Brand settings worth knowing (`content.json` → `brand`)

| Setting | What it does |
|---|---|
| `look` | Picks the design. Keep it as `atelier`. |
| `formTo` | Address the contact form sends to (`info@staccraft.com.au`). |
| `formEndpoint`, `formAccessKey` | Optional form service such as Web3Forms. When blank, the form opens the visitor's email app instead. |
| `gaId`, `analyticsLive` | Google Analytics 4 ID. Analytics only load after the visitor consents, and only when `analyticsLive` is `true`. Turn it on once the site is on its own domain. |
| `erpName` | ERP name shown in example screens and diagrams. Blank shows "Your ERP". |

## Before going live

- Replace the remaining `[placeholders]`. The editor's Pages tab shows a count for each page.
- Get Kookaburra Sport's sign-off on the Customers page and its quote.
- Set `formEndpoint` if enquiries should arrive without the visitor's email app.
- Add the GA4 ID and set `analyticsLive` to `true`.

# StacCraft website

React + Vite + Tailwind CSS v3. All images live locally in `public/assets/`.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

Pages: `/`, `/products`, `/products/:id`, `/cases`, `/about`, `/contact`.
Page copy and product data are in `src/mock/mock.js`.

The contact form only shows a confirmation toast; it doesn't send anything yet.

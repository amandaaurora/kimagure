# caprichos

Landing page for [caprichos.dev](https://caprichos.dev) — a static Next.js site deployed to Cloudflare Pages.

## Local development

```bash
pnpm install
```

**Next dev only** (no Pages Function — the "say hello" button will 404 on `/api/contact`):

```bash
pnpm dev
```

**Full preview with Pages Function** (requires wrangler and `.dev.vars`):

1. Copy `.dev.vars.example` to `.dev.vars` and set your real `CONTACT_EMAIL`.
2. Run:

```bash
pnpm preview
```

This builds the static export and runs `wrangler pages dev out`, which serves both the static files and the Pages Function. The contact button will work end-to-end.

## Deploy

### Cloudflare Pages dashboard (recommended)

1. Connect this repo in the Cloudflare Pages dashboard.
2. Set build command: `pnpm build`
3. Set output directory: `out`
4. Add a `CONTACT_EMAIL` environment variable in **Settings → Environment variables** (set to your real address — never commit it).
5. Functions in `functions/` deploy automatically.

### Via wrangler CLI

```bash
wrangler login
pnpm deploy
```

Set `CONTACT_EMAIL` in the dashboard or via `wrangler pages secret put CONTACT_EMAIL`.

## Project structure

```
app/               Next.js App Router
  layout.tsx       HTML shell, fonts, metadata
  page.tsx         Card (server component)
  globals.css      Reset + CSS custom properties
  page.module.css  All card styles
  components/
    TypingGloss.tsx  Typing animation (client)
    ContactButton.tsx  Email reveal button (client)
functions/
  api/contact.ts   Cloudflare Pages Function — returns email from env
public/
  caprichos-bg.webp  Card background
```

## Contact email

The contact address is read from the `CONTACT_EMAIL` environment variable at request time. It is never embedded in the built HTML, JavaScript bundle, or DOM. To update the address, change the env var in the Cloudflare dashboard — no redeploy needed for the function, though you may want to redeploy for a clean cache.

# Pavan Datta P, Advocate: website

A one-page site built with Next.js 16 (App Router), TypeScript, Tailwind CSS 4 and Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Where things live

- **Advocate's details**: `src/config/site.ts`. This covers name, qualifications, phone, email, address, WhatsApp and office hours. Any empty field is hidden across the site.
- **Practice areas**: `src/data/practice-areas.ts`
- **Images**: `public/images`. Replace a file with one of the same name (`.jpg`, `.png` or `.webp`) and it is picked up automatically.
- **Contact form API**: `src/app/api/contact/route.ts`. Email delivery still needs to be connected; see the TODO in that file.

## Deploy on Vercel

1. In Vercel, choose **Add New → Project** and import this GitHub repository.
2. Keep the detected defaults: Framework **Next.js**, build command `next build`, no output directory override.
3. Deploy.

Optional environment variable:

| Name | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | The public address, e.g. `https://www.example.in`, used for the canonical URL, sitemap and Open Graph. Without it, the site uses Vercel's production domain. |

## Checks

```bash
npm run lint
npm run build
```

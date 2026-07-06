# LeadMighty Landing

The public marketing site for **LeadMighty** — a standalone Next.js (App Router) app.

- `/` — the "Blueprint" brand landing (platform, product lines, contact)
- `/leadmightyhr` — the LeadMightyHR product page

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4. No auth or database — a static
marketing site. The contact form posts to `POST /api/lead`.

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Contact form

`app/api/lead/route.ts` validates submissions and, if `LEAD_WEBHOOK_URL` is set, forwards
them there (Slack / Zapier / an email service); otherwise it logs them server-side. Set it
in `.env.local`:

```
LEAD_WEBHOOK_URL=https://...
```

## Theme

The design system is scoped under `.lm-root` in `app/landing.css` — "The Blueprint": a light
drafting-paper surface with navy ink and electric-blue technical linework.

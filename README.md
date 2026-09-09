# Alya & Rizal

Premium static Malay wedding invitation built with Next.js App Router, React, TypeScript, and CSS.

## Features

- Mobile-first editorial wedding invitation in polished Malaysian Malay
- Central editable wedding configuration in `src/data/wedding.ts`
- Client-side countdown, light/dark theme toggle, Web Share/copy fallback
- Accessible gallery lightbox with keyboard navigation and focus return
- Configurable RSVP, WhatsApp wishes, venue link, gift details, dress code, FAQ, and contacts
- Static export, print stylesheet, metadata, sitemap, robots, and reduced-motion support

## Tech stack

Next.js 16, React 19, TypeScript, CSS, ESLint, and Prettier. No backend, database, API route, analytics, or paid service is required.

## Installation and development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in a browser.

## Production build

```bash
npm run build
```

This uses `output: "export"` and generates the static site in `/out`. To preview it locally, use a static server such as `npx serve out`.

## Lint and formatting

```bash
npm run lint
npm run format
npm run format:check
```

## Customize the invitation

Edit `src/data/wedding.ts` for couple names, dates, venue, address, Google Maps, schedule, story, gallery image URLs, RSVP destinations, WhatsApp links, dress code, gift information, FAQ, contacts, and hashtag. Replace the clearly marked example values before publishing. Colors and layout tokens live at the top of `src/app/globals.css`; page metadata is in `src/app/layout.tsx`.

## Deploy to Vercel

### GitHub integration

1. Push this project to GitHub.
2. In Vercel, choose **Add New > Project** and import the repository.
3. Keep the detected Next.js framework and deploy. No environment variables are required.
4. Add a custom domain from the project settings if desired.

### Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
vercel --prod
```

The invitation intentionally omits audio, public comments, fake form submission, analytics, and backend persistence: the site remains fast, private, and fully static. RSVP, greetings, and maps use links configured in the data file.This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

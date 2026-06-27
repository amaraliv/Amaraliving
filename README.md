# Amara Living

Premium marketing website for **Amara Living** — granite, designer tiles, and bespoke furniture for luxury residential and commercial interiors.

## Tech Stack

| Layer | Tools |
| --- | --- |
| Framework | React 18 |
| Build | Vite 6 |
| Styling | Tailwind CSS 3 |
| Animation | Framer Motion 11, GSAP 3, Lenis |
| Fonts | Playfair Display, Inter (Google Fonts) |

## Folder Structure

```
src/
├── components/
│   ├── common/          # Shared utilities (dividers, image hint)
│   ├── layout/          # Navbar, footer
│   ├── sections/        # Page sections (hero, gallery, calculator, etc.)
│   └── ui/              # Reusable UI primitives (loader, stars, badges)
├── pages/               # Route-level page compositions
├── assets/              # Static assets (images, icons, fonts)
├── data/                # Content constants and copy
├── hooks/               # Custom React hooks and providers
├── utils/               # Formatting and helpers
├── constants/           # Navigation, animation tokens
├── styles/              # Global CSS and Tailwind layers
├── App.jsx
└── main.jsx
```

## Installation

**Requirements:** Node.js 18+

```bash
cd "Amara Living"
npm install
```

## Development

```bash
npm run dev
```

Open the URL shown in the terminal (default: `http://localhost:5173`).

## Production Build

```bash
npm run build
npm run preview
```

Output is written to `dist/`.

## Deployment

Works with any static host (Vercel, Netlify, Cloudflare Pages).

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Output directory | `dist` |
| Install command | `npm install` |

### Vercel (CLI)

```bash
npm install -g vercel
npm run build
vercel --prod
```

### Disable Vercel Toolbar (popup on deploy)

The **Vercel Toolbar** is injected by Vercel — not by this repo. It usually appears only when you are logged into Vercel as a team member.

1. Open [vercel.com/dashboard](https://vercel.com/dashboard) → select **Amara Living**
2. Go to **Settings** → **General**
3. Find **Vercel Toolbar**
4. Set **Preview** and **Production** to **Off**
5. Redeploy (or push a new commit)

This repo also sets `VERCEL_PREVIEW_FEEDBACK_ENABLED=0` in `vercel.json` to discourage the toolbar on preview URLs.

**Quick hide (your browser only):** press `Ctrl + .` (Windows) or `⌘ + .` (Mac), or choose **Disable for Session** in the toolbar menu.

Regular visitors to your live site do not see this toolbar unless Production toolbar is explicitly enabled in the dashboard.

## Features

- Full-screen hero with rotating imagery
- Scroll-spy navigation with mobile menu
- Lenis smooth scrolling + GSAP ScrollTrigger
- Lazy-loaded below-the-fold sections
- Surface gallery, materials accordion, investment calculator
- Horizontal testimonial carousel
- Accessible skip link, focus states, semantic landmarks

## Content

Section copy and image URLs live in `src/data/content.js`. Replace Unsplash URLs with client assets in `src/assets/images/` for production.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |

## License

Private — Amara Living.

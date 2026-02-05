# Studio Website - Claude Code Project Guide

## Quick Reference

- **Owner**: Yagiz Eraslan (yagizeraslan@gmail.com)
- **Live URL**: https://studio.yagizeraslan.com
- **Repo**: yagizeraslan/Studio-Website
- **Stack**: React 19 + Vite 6 + Tailwind CSS 3 + Lucide Icons
- **Architecture**: Multi-component SPA with smooth-scroll navigation (no router)
- **Deployment**: GitHub Pages via GitHub Actions (auto on `main` push)
- **Design**: Dark cinematic theme — near-black backgrounds, gold (#c9a96e) accents, Playfair Display headings

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server (Vite) |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
Studio-Website/
├── .github/workflows/deploy.yml   # CI/CD: GitHub Pages deployment
├── public/
│   ├── CNAME                      # Custom domain: studio.yagizeraslan.com
│   └── favicon.svg                # YE monogram favicon
├── src/
│   ├── main.jsx                   # React entry point
│   ├── App.jsx                    # Root component - assembles all sections
│   ├── index.css                  # Tailwind directives + custom styles
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx         # Fixed navbar, scroll-aware, mobile menu
│   │   │   └── Footer.jsx         # Brand, nav links, social, copyright
│   │   ├── sections/
│   │   │   ├── Hero.jsx           # Full-screen cinematic hero
│   │   │   ├── Portfolio.jsx      # Filterable gallery + lightbox
│   │   │   ├── Services.jsx       # Service cards with pricing
│   │   │   ├── About.jsx          # Bio, stats, equipment
│   │   │   └── Contact.jsx        # Form (mailto) + social links
│   │   └── ui/
│   │       ├── GalleryGrid.jsx    # Responsive image grid
│   │       ├── Lightbox.jsx       # Full-screen viewer + keyboard nav
│   │       ├── FilterBar.jsx      # Category filter pills
│   │       ├── ServiceCard.jsx    # Individual service/pricing card
│   │       └── ScrollReveal.jsx   # Intersection Observer fade-in wrapper
│   ├── data/
│   │   ├── siteConfig.js          # Name, email, social links, bio, equipment
│   │   ├── portfolioItems.js      # Gallery items with gradient placeholders
│   │   └── services.js            # Service tiers and pricing
│   └── hooks/
│       └── useScrollSpy.js        # Active section detection for navbar
├── index.html                     # Google Fonts (Playfair Display + Inter)
├── vite.config.js                 # base: '/' (custom domain)
├── tailwind.config.js             # Studio theme: colors, fonts, animations
├── postcss.config.js              # Tailwind + Autoprefixer
├── eslint.config.js               # ESLint v9 flat config
└── package.json
```

## Critical Rules

1. **base path is `/`** - Unlike Portfolio-Website, this project uses a custom domain so base is `/`.
2. **CNAME file** - `public/CNAME` must contain `studio.yagizeraslan.com`.
3. **No routing library** - Navigation is smooth-scroll based via section IDs.
4. **No backend/API** - All data lives in `src/data/` files.
5. **Tailwind only** - Use utility classes. Theme extended in `tailwind.config.js`.
6. **Dark cinematic theme** - `#0a0a0a` background, `#c9a96e` gold accent, cream headings.
7. **Fonts** - Playfair Display for headings, Inter for body. Loaded via Google Fonts in `index.html`.
8. **Gallery uses CSS gradient placeholders** - Replace with real images later.

## Design System

| Role | Color | Tailwind Class |
|------|-------|----------------|
| Background | `#0a0a0a` | `bg-studio-bg` |
| Surface | `#111111` | `bg-studio-surface` |
| Border | `#2a2a2a` | `border-studio-border` |
| Body text | `#8a8a8a` | `text-studio-body` |
| Headings | `#f5f0e8` | `text-studio-heading` |
| Accent (gold) | `#c9a96e` | `text-studio-accent` |

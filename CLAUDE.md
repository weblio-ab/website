# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Weblio agency website built with Vue.js 3, Vite, and Bootstrap 5. Supports Swedish (default) and English via Vue i18n.

## Commands

```bash
pnpm install        # Install dependencies
pnpm dev            # Dev server at localhost:5173
pnpm build          # Production build to /dist/
pnpm preview        # Preview production build
```

No test runner or linter is configured.

## Architecture

**Stack:** Vue 3 (Composition API) + Pinia + Vue Router + Bootstrap 5 + Vue i18n + Vite

### Key Directories

- `src/sections/` — Page sections (Navbar, Footer, home/* sections like Hero, Services, Portfolio, Pricing, Contact)
- `src/views/` — Route-level pages (Home, Guides, Privacy, Terms, Cookies) — lazy-loaded
- `src/components/` — Reusable components (ContactForm, PricingPackage, WindowMockup, obfuscation components)
- `src/stores/` — Pinia stores: `app.js` (global state, locale, menu), `contact.js` (form + reCAPTCHA), `viewport.js` (responsive breakpoints), `guides.js` (guide data)
- `src/composables/` — Composition functions: `useIntersectionObserver`, `useRecaptcha`, `useSEO`, `useSyntaxHighlighter`, `useEmailConfig`
- `src/locales/` — Translation files (`sv.json`, `en.json`)
- `src/config/seo.js` — SEO configuration
- `plugins/vue-sitemap.js` — Custom Vite plugin generating sitemap.xml and robots.txt at build time

### Conventions

- Always use `<script setup>` syntax with Composition API
- Component names: PascalCase
- Pinia stores use Composition API (`defineStore` with setup function), use `storeToRefs()` for reactive destructuring
- All user-facing text must go in both `sv.json` and `en.json` with structured keys: `section.component.text`
- CSS: Bootstrap 5 classes first, then scoped custom CSS following BEM naming
- Mobile-first responsive design; breakpoints: 576px, 768px, 992px, 1200px
- Scroll animations use `useIntersectionObserver` composable
- Animations should use `transform` and `opacity` and respect `prefers-reduced-motion`

### Deployment

- GitHub Actions deploys via FTP: `master` → production, `development` → staging
- Environment variables prefixed with `VITE_` for client-side access (form service URL, customer ID, form identifier)
- Vite config splits chunks: `vendor` (vue/router/pinia/i18n), `bootstrap`, `utils`

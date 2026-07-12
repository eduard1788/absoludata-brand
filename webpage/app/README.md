# Absoludata Website — Phase 1: Front-End MVP

## Summary

This is the front-end MVP of the Absoludata corporate website, built as **Phase 1** of the project roadmap. The goal of this phase is to produce a fully navigable, statically rendered website that runs locally with no backend dependencies. All content is hardcoded, all pages are functional, and the design system is fully applied.

The website is built with **Next.js 15**, **React 19**, **TypeScript**, and **Tailwind CSS v3**. It uses the **App Router** introduced in Next.js 13, which is the current standard for building Next.js applications. Google Fonts (Poppins and Inter) are loaded via the `next/font` API, which optimizes font delivery at build time.

This phase covers four core pages (Home, About, Services, Contact), a set of reusable UI components, and a complete implementation of the Absoludata brand design system defined in Phase 0.

---

## Technology Stack

| Technology | Version | Purpose |
|---|---|---|
| Next.js | ^15 | React framework with App Router, SSR, and routing |
| React | ^19 | UI component library |
| TypeScript | ^5 | Static type checking |
| Tailwind CSS | ^3.4 | Utility-first CSS framework |
| PostCSS | ^8 | CSS transformation pipeline (required by Tailwind) |
| Autoprefixer | ^10 | Adds vendor prefixes to CSS automatically |
| ESLint | ^8 | Code linting and quality enforcement |
| next/font | built-in | Zero-layout-shift Google Fonts loading |

### Why Next.js with App Router?

The App Router (introduced in Next.js 13) uses **React Server Components** by default. This means pages are rendered on the server and sent as HTML — which is faster to load and better for SEO. Components only become client-side (`'use client'`) when they need browser-specific APIs like `useState` for interactivity. In this project, only the `Navbar` is a client component because it manages mobile menu open/close state.

### Why Tailwind CSS?

Tailwind generates only the CSS classes actually used in the code (via its JIT compiler), resulting in very small CSS bundles. It also makes it straightforward to implement a custom design system: brand colors, typography, and spacing are defined once in `tailwind.config.ts` and applied consistently across every component using utility classes.

---

## Brand Design System

All brand values are defined in `tailwind.config.ts` and applied globally through utility classes.

### Color Palette

| Name | Token | Hex | Usage |
|---|---|---|---|
| Dark Navy | `brand-navy` | `#0F172A` | Primary background |
| Navy Light | `brand-navy-light` | `#1E293B` | Card backgrounds, alternating sections |
| Malachite | `brand-green` | `#06C362` | Primary CTA, accents, hover states |
| Sky Blue | `brand-blue` | `#38BDF8` | Secondary accents, "Why Absoludata" section |

### Typography

| Font | Token | Usage |
|---|---|---|
| Poppins | `font-heading` | All headings (h1–h3), logo, labels |
| Inter | `font-sans` | Body text, descriptions, UI copy |

Both fonts are loaded via `next/font/google` in `app/layout.tsx`. They are injected as CSS variables (`--font-poppins`, `--font-inter`) onto the `<html>` element, then referenced in `tailwind.config.ts` as font family values. This approach eliminates layout shift and avoids external network requests at render time.

---

## Project Structure

```
webpage/app/
│
├── app/                          # Next.js App Router directory
│   ├── layout.tsx                # Root layout: wraps every page with Navbar + Footer
│   ├── globals.css               # Tailwind base/components/utilities + global resets
│   ├── page.tsx                  # Home page (/)
│   ├── about/
│   │   └── page.tsx              # About page (/about)
│   ├── services/
│   │   └── page.tsx              # Services page (/services)
│   └── contact/
│       └── page.tsx              # Contact page (/contact)
│
├── components/                   # Reusable UI components
│   ├── Navbar.tsx                # Fixed navigation bar (client component)
│   ├── Footer.tsx                # Site footer with navigation links
│   ├── Hero.tsx                  # Full-screen hero section
│   ├── ServicesSection.tsx       # Grid of 5 service cards
│   ├── WhyAbsoludata.tsx         # 4 value proposition cards
│   ├── FeaturedSolutions.tsx     # Architecture diagram cards
│   ├── IndustriesSection.tsx     # 5 industry cards
│   └── CTASection.tsx            # Call-to-action section
│
├── package.json                  # Project dependencies and npm scripts
├── tsconfig.json                 # TypeScript compiler configuration
├── tailwind.config.ts            # Tailwind: brand colors, fonts, content paths
├── postcss.config.mjs            # PostCSS: enables Tailwind and Autoprefixer
├── next.config.ts                # Next.js configuration
└── .eslintrc.json                # ESLint rules (extends next/core-web-vitals)
```

---

## App Router: How Routing Works

In Next.js App Router, **the file system is the router**. Every folder inside `app/` that contains a `page.tsx` file becomes a URL route:

```
app/page.tsx          →  http://localhost:3000/
app/about/page.tsx    →  http://localhost:3000/about
app/services/page.tsx →  http://localhost:3000/services
app/contact/page.tsx  →  http://localhost:3000/contact
```

The `app/layout.tsx` file is the **root layout**. It wraps every page automatically — this is where the `<html>` and `<body>` tags live, and where the `Navbar` and `Footer` are mounted. Any page rendered under this layout will inherit those wrappers.

---

## Components

### `Navbar.tsx` — `'use client'`

Fixed navigation bar rendered at the top of every page via `layout.tsx`. Because it uses `useState` to manage the mobile menu toggle, it is declared as a client component with the `'use client'` directive at the top.

**Features:**
- Fixed positioning with `backdrop-blur` and semi-transparent background
- Desktop: horizontal nav links + "Get a Consultation" CTA button
- Mobile: hamburger icon toggles a dropdown menu
- Logo uses `font-heading` with the brand-green color applied to "data"

**Navigation links:** Home · About · Services · Contact

---

### `Footer.tsx` — Server Component

Site footer rendered at the bottom of every page via `layout.tsx`. No client-side interactivity needed, so it runs as a server component.

**Features:**
- Brand logo and one-line company description
- Two link columns: Company and Services
- Services links use URL hash anchors (`/services#data-engineering`) to scroll directly to a service section
- Copyright line using `new Date().getFullYear()` for the current year

---

### `Hero.tsx` — Server Component

Full-viewport-height hero section displayed at the top of the Home page.

**Features:**
- Background: dark navy base with a subtle CSS grid pattern overlay (4% opacity) and a large green radial glow
- Animated pill badge ("Cloud · Data Engineering · AI") with a pulsing green dot
- H1 headline with the word "Competitive Advantage" in brand-green
- Two CTAs: "Schedule Consultation" (filled green) and "Explore Services" (outlined)

---

### `ServicesSection.tsx` — Server Component

Displays the five core Absoludata service offerings as a responsive card grid.

**Services:** Data Engineering · Analytics · Applications · Artificial Intelligence · Telecommunications

**Card anatomy:**
- Icon in a rounded square with `brand-green/10` background
- Service title (Poppins, semibold)
- Short description (Inter, gray-400)
- "Learn more →" link pointing to the corresponding anchor on the Services page
- Hover state: border transitions to `brand-green/40`

Each icon is an inline SVG using heroicon-style paths — no external icon library dependency.

---

### `WhyAbsoludata.tsx` — Server Component

Four value proposition cards arranged in a 2×2 grid, rendered on a `brand-navy-light` background to visually separate it from adjacent sections.

**Value cards:**
1. Specialized Expertise
2. Faster Delivery
3. Cloud-Native Solutions
4. AI-Driven Automation

**Card anatomy:**
- Icon in a `brand-blue/10` square (uses accent blue to differentiate from green-accented sections)
- Title and description side by side using flexbox layout
- Hover state: border transitions to `brand-blue/30`

---

### `FeaturedSolutions.tsx` — Server Component

Showcases four reference architecture diagrams rendered as stacked layer visualizations. Each solution displays its processing layers as a vertical stack connected by chevron-down arrows.

**Solutions:**
1. Data Platform Architecture
2. AI Automation Workflow
3. Telecom Analytics Platform
4. Self-Service Analytics Platform

Each layer label uses `font-mono` to evoke technical precision. This section uses `brand-blue` as its accent color to differentiate from the services sections.

---

### `IndustriesSection.tsx` — Server Component

Five industry cards on a `brand-navy-light` background showing the sectors Absoludata specializes in.

**Industries:** Telecommunications · Financial Services · Retail · Marketing · Logistics

Each card has an icon, title, and a one-sentence description of the analytics and data use cases relevant to that industry.

---

### `CTASection.tsx` — Server Component

Full-width call-to-action section placed at the bottom of the Home page, above the Footer.

**Features:**
- Subtle green tint background (`brand-green/5`) with a top-edge gradient line
- Headline: "Let's Build Smarter Solutions Together"
- Two buttons: "Schedule a Free Consultation" (primary) and "View All Services" (outlined)

---

## Pages

### Home Page — `app/page.tsx`

The home page assembles all section components in sequence, following the wireframe defined in Phase 0:

```
Hero
  ↓
Services Section
  ↓
Why Absoludata
  ↓
Featured Solutions
  ↓
Industries Section
  ↓
CTA Section
```

Each section alternates between `bg-brand-navy` and `bg-brand-navy-light` to create visual rhythm and clear section boundaries.

---

### About Page — `app/about/page.tsx`

Four sections:

1. **Page Hero** — Page title, tagline, and positioning statement
2. **Mission & Vision** — Two-column layout with mission and vision statements
3. **What We Do** — 2×3 grid of capability cards (Data Engineering, Cloud, Analytics, AI, Telecom, Applications)
4. **CTA** — Invitation to schedule a consultation

---

### Services Page — `app/services/page.tsx`

Detailed breakdown of all five services. Each service is its own full-width section with an `id` attribute matching its slug (e.g., `id="data-engineering"`), enabling direct deep-linking from the Navbar and service cards.

**Each service section includes:**
- Tagline and service name
- Full description paragraph
- Capabilities list (bullet points with brand-green dots)
- Technology tags (monospace, rounded badges)
- "Discuss This Service" link to the Contact page
- Alternating `bg-brand-navy` / `bg-brand-navy-light` backgrounds

---

### Contact Page — `app/contact/page.tsx`

Two-column layout:

**Left column:**
- Page headline ("Let's Talk")
- Three contact intent descriptions: Free Consultation, Project Inquiry, General Questions

**Right column:**
- Contact form with fields: First Name, Last Name, Work Email, Company, Message
- Submit button
- Note about response time

The form is static (Phase 1 has no backend). Form submission will be wired to an AWS Lambda endpoint in Phase 3.

---

## Running the Project

### Prerequisites

- Node.js LTS (install via `nvm install --lts`)

### Commands

```bash
# Navigate to the project
cd /Users/home/my_stuff/repositories/absoludata_brand/webpage/app

# Install dependencies (first time only)
npm install

# Start the development server
npm run dev
```

Open `http://localhost:3000` in your browser.

| Command | Description |
|---|---|
| `npm run dev` | Start local development server with hot reload |
| `npm run build` | Compile production build |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Run ESLint across all files |

---

## What Comes Next

This MVP is Phase 1 of the roadmap. Subsequent phases will build on top of this foundation:

| Phase | Goal |
|---|---|
| Phase 2 | Final copywriting, real graphics, animations, and professional styling |
| Phase 3 | AWS backend: contact form API via API Gateway → Lambda → DynamoDB → SES |
| Phase 4 | Blog engine with categories, search, and SEO optimization |
| Phase 5 | AI assistant and lead qualification agent via Amazon Bedrock or OpenAI |
| Phase 6 | Authenticated customer portal with dashboards and analytics delivery |
| Phase 7 | CRM integration, newsletter platform, and marketing automation |

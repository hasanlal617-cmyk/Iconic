# Iconic — Premium Mineral Water

A modern, responsive marketing website for **Iconic**, a premium mineral water brand. Built with Next.js App Router, Tailwind CSS, Framer Motion, and Lucide React icons.

## Features

- **Hero** — High-impact headline, 3D-style bottle placeholder, wave animation, CTAs
- **About** — Purity, filtration, sustainability, and mineral benefits
- **Products** — Interactive showcase for 500ml, 1L, Glass Edition, and Bulk Orders
- **Why Iconic** — Eco-friendly, recyclable, pH balance, untouched sourcing
- **Contact Form** — Bulk/distribution inquiry form with inquiry type selector
- **Footer** — Links, social icons, newsletter signup

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
iconic/
├── app/
│   ├── globals.css      # Tailwind + custom utility classes
│   ├── layout.tsx       # Root layout with Plus Jakarta Sans
│   └── page.tsx         # Main page composing all sections
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── WaveAnimation.tsx
│   ├── BottlePlaceholder.tsx
│   ├── About.tsx
│   ├── Products.tsx
│   ├── Features.tsx
│   ├── ContactForm.tsx
│   └── Footer.tsx
└── lib/
    └── data.ts          # Shared content data
```

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [Tailwind CSS 3](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide React](https://lucide.dev/)

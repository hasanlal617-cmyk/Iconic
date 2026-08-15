/** Centralized image paths and metadata for the Iconic website */

export const images = {
  hero: {
    bottle: "/images/hero-bottle.png",
    background: "/images/mountain-sourcing.png",
  },
  about: {
    source: "/images/alpine-source.png",
    filtration: "/images/alpine-source.png",
  },
  products: {
    "500ml": "/images/classic-500ml.png",
    "1l": "/images/everyday-1l.png",
    glass: "/images/glass-edition.png",
    bulk: "/images/bulk-distribution.png",
  },
  features: {
    eco: "/images/eco-friendly.png",
    recyclable: "/images/eco-friendly.png",
    ph: "/images/alpine-source.png",
    sourcing: "/images/mountain-sourcing.png",
  },
  contact: {
    distribution: "/images/bulk-distribution.png",
  },
} as const;

export type ProductImageKey = keyof typeof images.products;
export type FeatureImageKey = keyof typeof images.features;

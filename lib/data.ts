export interface Product {
  id: string;
  name: string;
  size: string;
  description: string;
  ph: string;
  minerals: string[];
  image: string;
  highlight?: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: "leaf" | "recycle" | "droplets" | "mountain";
  image: string;
}

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#products", label: "Products" },
  { href: "#why-iconic", label: "Why Iconic" },
  { href: "#contact", label: "Contact" },
];

export const products: Product[] = [
  {
    id: "500ml",
    name: "Classic 500ml",
    size: "500ml",
    description:
      "Perfect for on-the-go hydration with a sleek, portable design crafted for active lifestyles.",
    ph: "7.2",
    minerals: ["Calcium", "Magnesium", "Potassium"],
    image: "/images/classic-500ml.png",
    highlight: "Best Seller",
  },
  {
    id: "1l",
    name: "Everyday 1L",
    size: "1 Liter",
    description:
      "Ideal for daily hydration at home, office, or gym — our most versatile format.",
    ph: "7.3",
    minerals: ["Calcium", "Magnesium", "Silica", "Bicarbonate"],
    image: "/images/everyday-1l.png",
  },
  {
    id: "glass",
    name: "Glass Edition",
    size: "750ml",
    description:
      "Premium glass bottle for fine dining, hospitality, and special occasions.",
    ph: "7.4",
    minerals: ["Calcium", "Magnesium", "Potassium", "Silica"],
    image: "/images/glass-edition.png",
    highlight: "Premium",
  },
  {
    id: "bulk",
    name: "Bulk Orders",
    size: "5L & 19L",
    description:
      "Corporate, events, and hospitality solutions with custom branding available.",
    ph: "7.2",
    minerals: ["Full mineral profile"],
    image: "/images/bulk-distribution.png",
  },
];

export const features: Feature[] = [
  {
    id: "eco",
    title: "Eco-Friendly",
    description:
      "Carbon-neutral production and responsibly sourced materials at every step.",
    icon: "leaf",
    image: "/images/eco-friendly.png",
  },
  {
    id: "recyclable",
    title: "100% Recyclable",
    description:
      "All packaging is fully recyclable, supporting a circular economy.",
    icon: "recycle",
    image: "/images/eco-friendly.png",
  },
  {
    id: "ph",
    title: "Perfect pH Balance",
    description:
      "Naturally balanced at 7.2–7.4 for optimal taste and body absorption.",
    icon: "droplets",
    image: "/images/alpine-source.png",
  },
  {
    id: "sourcing",
    title: "Untouched Sourcing",
    description:
      "Drawn from protected alpine springs, filtered through ancient mineral rock.",
    icon: "mountain",
    image: "/images/mountain-sourcing.png",
  },
];

export const aboutHighlights = [
  {
    title: "Purity First",
    description:
      "Multi-stage filtration removes impurities while preserving essential minerals.",
  },
  {
    title: "Sustainable Packaging",
    description:
      "Lightweight, recyclable bottles designed to minimize environmental impact.",
  },
  {
    title: "Mineral Benefits",
    description:
      "Naturally occurring calcium, magnesium, and potassium support daily wellness.",
  },
  {
    title: "Certified Quality",
    description:
      "Rigorous testing meets international standards for safety and taste.",
  },
];

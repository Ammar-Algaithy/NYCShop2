// src/data/products.ts
export type Color = "red" | "green" | "yellow";

export type Product = {
  name: string;
  brand: string;   // ✅ added
  price: number;
  tag: string;
  color: Color;
  image: string;
};

export const products: Product[] = [
  {
    name: "Elf — Strawberry Ice",
    brand: "Elf",
    price: 19.99,
    tag: "Disposable",
    color: "red",
    image: "https://th.bing.com/th/id/OIP.6GrYBX_iBdGEzwpcCdRI-QHaHa",
  },
  {
    name: "Geek Bar",
    brand: "Geek Bar",
    price: 29.99,
    tag: "Hardware",
    color: "yellow",
    image: "https://th.bing.com/th/id/OIP.vYcQ3NkuFM7f8tQHN5765AHaHa",
  },
  {
    name: "Al Fakher — Mint",
    brand: "Al Fakher",
    price: 9.99,
    tag: "Hookah",
    color: "green",
    image: "https://th.bing.com/th/id/OIP.k_pZGQ_ttOs-UrCdX4f7uAHaHa",
  },
  {
    name: "Rocky Patel — Vintage 1990",
    brand: "Rocky Patel",
    price: 12.5,
    tag: "Cigar",
    color: "yellow",
    image: "https://th.bing.com/th/id/OIP.1MeNmAITgqYx5-4yPBjMuAHaF-",
  },
  {
    name: "Lost Mary — Blueberry",
    brand: "Lost Mary",
    price: 18.5,
    tag: "Disposable",
    color: "red",
    image: "https://th.bing.com/th/id/OIP.b-aZPmFOlgJczY0o6vu3MAHaHa",
  },
];

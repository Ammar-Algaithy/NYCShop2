// src/pages/Home.tsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

type Color = "red" | "green" | "yellow";

export default function Home() {
  // PAGE DATA
  const hero = {
    title: [
      { text: "Smoke", color: "text-rose-500" }, // red family accent
      { text: "•",     color: "text-white" },
      { text: "Shop",  color: "text-yellow-300" },
      { text: "•",     color: "text-white" },
      { text: "NYC",   color: "text-blue-400" },
    ],
    subtitle:
      "Disposables, e-juice, cigars, hookah, and glass with seasonal releases.",
    image:
      "https://static.vecteezy.com/system/resources/previews/002/187/437/original/smoke-shop-neon-signs-style-text-free-vector.jpg",
    cta: {
      primary: { label: "Browse Products", to: "/products" }, // ✅ use Link's `to`
      secondary: { label: "Latest Deals", to: "/deals" },
    },
  };

  const brands = ["Elf", "HQD", "Fume", "Hyde", "Lost Mary", "GeekVape", "SMOK"];

  const categories: { name: string; color: Color }[] = [
    { name: "Disposables", color: "red" },
    { name: "E-Juice",     color: "yellow" },
    { name: "Hookah",      color: "green" },
    { name: "Cigars",      color: "yellow" },
    { name: "Glass",       color: "red" },
    { name: "Accessories", color: "green" },
  ];

  const dot = (c: Color) =>
    c === "red" ? "bg-red-500" : c === "green" ? "bg-green-500" : "bg-yellow-400";

  return (
    <>
      {/* HERO */}
      <section className="pt-8 md:pt-14 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(680px_240px_at_50%_-10%,rgba(239,68,68,0.35),transparent)]" />
        <div className="container relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
          <div>
            <h1 className="font-extrabold tracking-tight text-4xl sm:text-5xl md:text-6xl leading-tight">
              {hero.title.map((part, i) => (
                <span key={i} className={`${part.color} mr-2`}>
                  {part.text}
                </span>
              ))}
            </h1>

            <p className="mt-3 md:mt-4 text-base sm:text-lg md:text-xl text-white/80">
              {hero.subtitle}
            </p>

            <div className="mt-5 md:mt-6 flex gap-3">
              {/* ✅ Use <Link to="..."> so HashRouter builds #/routes automatically */}
              <Link
                className="btn btn-primary bg-rose-500 px-5 py-3 text-sm sm:text-base"
                to={hero.cta.primary.to}
              >
                {hero.cta.primary.label}
              </Link>
              <Link
                className="btn btn-ghost px-5 py-3 text-sm sm:text-base"
                to={hero.cta.secondary.to}
              >
                {hero.cta.secondary.label}
              </Link>
            </div>

            <div className="mt-5 md:mt-6 inline-flex items-center gap-2 text-xs text-white/70 border border-white/15 bg-white/5 rounded-full px-3 py-1">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              Must be 21+ to purchase
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden border border-white/10 shadow"
          >
            <img
              src={hero.image}
              alt="NY Smoke 2"
              loading="lazy"
              className="w-full h-56 sm:h-64 md:h-[420px] object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* BRANDS STRIP */}
      <section className="py-6 md:py-8 border-y border-white/10 bg-white/5">
        <div className="container flex flex-wrap items-center gap-4 sm:gap-6">
          <span className="text-xs sm:text-sm text-white/70">Featured Brands:</span>
          {brands.map((b) => (
            <span key={b} className="text-white/80 text-sm sm:text-base">
              {b}
            </span>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="pt-12 pb-16 md:py-16" id="categories">
        <div className="container">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Browse Categories</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-6">
            {categories.map((c) => (
              <Link
                to="/products"
                key={c.name}
                className="card hover:bg-white/10 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold">{c.name}</div>
                  <span className={`w-3 h-3 rounded-full ${dot(c.color)}`} />
                </div>
                <p className="text-sm text-white/70 mt-2">
                  Explore {c.name.toLowerCase()} in stock.
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

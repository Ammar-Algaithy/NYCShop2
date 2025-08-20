// src/pages/Products.tsx
import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { products, type Color } from "../data/products";

const dot = (c: Color) =>
  c === "red" ? "bg-red-500" : c === "green" ? "bg-green-500" : "bg-yellow-400";

const normalize = (s: string) => s.trim().toLowerCase();

export default function Products() {
  const [params] = useSearchParams();
  const brandParam = params.get("brand");

  const list = useMemo(() => {
    if (!brandParam) return products;
    const b = normalize(brandParam);
    return products.filter((p) => normalize(p.brand) === b);
  }, [brandParam]);

  return (
    <section className="pt-6 pb-16 md:py-12">
      <div className="container px-3 md:px-4">
        {/* Header */}
        <div className="flex items-end justify-between gap-3">
          <h1 className="h1 text-3xl md:text-5xl">Products</h1>
          <span className="text-xs md:text-sm text-white/60">{list.length} items</span>
        </div>
        <p className="mt-2 text-base md:text-lg text-white/80">
          Curated picks. Stock changes weekly—visit us in store.
        </p>

        {/* Active brand filter */}
        {brandParam && (
          <div className="mt-4 flex items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm">
              <span className="w-2 h-2 rounded-full bg-white/60" />
              Brand: <strong className="text-white">{brandParam}</strong>
            </span>
            <Link to="/products" className="btn btn-ghost px-3 py-1.5 text-sm">
              Clear
            </Link>
          </div>
        )}

        {/* No results */}
        {list.length === 0 ? (
          <div className="mt-10 card text-white/80">
            No products found for <strong className="text-white">{brandParam}</strong>.
            <div className="mt-3">
              <Link to="/products" className="btn btn-ghost">See all products</Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8">
            {list.map((p) => (
              <article
                key={p.name}
                className="card overflow-hidden group md:hover:bg-white/10 transition"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-44 sm:h-48 md:h-52 object-cover transition-transform duration-300 md:group-hover:scale-105"
                    loading="lazy"
                  />
                  <span
                    className={`absolute top-2 right-2 sm:top-3 sm:right-3 w-2.5 h-2.5 rounded-full ${dot(
                      p.color
                    )} ring-2 ring-black/60`}
                    title={p.tag}
                  />
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold leading-snug truncate">{p.name}</h3>
                  </div>
                  <div className="text-sm text-white/70 mt-1">{p.tag} • {p.brand}</div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="font-bold text-lg">${p.price.toFixed(2)}</div>
                    <button className="btn btn-ghost px-4 py-2">Details</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Footer note */}
        <div className="mt-8 md:mt-10 text-sm text-white/60">
          Looking for something specific? Call us at (347) 555-7610.
        </div>
      </div>
    </section>
  );
}

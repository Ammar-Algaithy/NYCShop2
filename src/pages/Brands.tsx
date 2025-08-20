// src/pages/Brands.tsx
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type Tag = "disposables" | "hardware" | "hookah" | "cigars";

type Brand = {
  name: string;
  tags: Tag[];
  accent: "red" | "yellow" | "green";
  logo?: string;
};

const BRANDS: Brand[] = [
  { name: "Elf",         tags: ["disposables"], accent: "red" },
  { name: "HQD",         tags: ["disposables"], accent: "red" },
  { name: "Fume",        tags: ["disposables"], accent: "red" },
  { name: "Hyde",        tags: ["disposables"], accent: "red" },
  { name: "Lost Mary",   tags: ["disposables"], accent: "red" },
  { name: "Geek Bar",    tags: ["hardware"],    accent: "yellow" },
  { name: "GeekVape",    tags: ["hardware"],    accent: "yellow" },
  { name: "SMOK",        tags: ["hardware"],    accent: "yellow" },
  { name: "Al Fakher",   tags: ["hookah"],      accent: "green" },
  { name: "Starbuzz",    tags: ["hookah"],      accent: "green" },
  { name: "Rocky Patel", tags: ["cigars"],      accent: "yellow" },
  { name: "Oliva",       tags: ["cigars"],      accent: "yellow" },
];

const chipColor = (t: Tag) =>
  t === "disposables" ? "bg-red-500 text-black"
  : t === "hardware"  ? "bg-yellow-400 text-black"
  : t === "hookah"    ? "bg-green-500 text-black"
  :                     "bg-yellow-400 text-black";

const accentDot = (a: Brand["accent"]) =>
  a === "red" ? "bg-red-500" : a === "green" ? "bg-green-500" : "bg-yellow-400";

export default function Brands() {
  const [q, setQ] = useState("");
  const [active, setActive] = useState<"all" | Tag>("all");
  const navigate = useNavigate();

  const tags: { label: string; value: "all" | Tag }[] = [
    { label: "All", value: "all" },
    { label: "Disposables", value: "disposables" },
    { label: "Hardware", value: "hardware" },
    { label: "Hookah", value: "hookah" },
    { label: "Cigars", value: "cigars" },
  ];

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return BRANDS.filter((b) => {
      const tagOk = active === "all" || b.tags.includes(active);
      const textOk = !term || b.name.toLowerCase().includes(term);
      return tagOk && textOk;
    });
  }, [q, active]);

  const gotoBrand = (name: string) =>
    navigate(`/products?brand=${encodeURIComponent(name)}`);

  return (
    <section className="pt-6 pb-16 md:py-12">
      <div className="container px-3 md:px-4">
        {/* Header */}
        <div className="flex items-end justify-between gap-3">
          <h1 className="h1 text-3xl md:text-5xl">Brands</h1>
          <span className="text-xs md:text-sm text-white/60">
            {filtered.length} of {BRANDS.length}
          </span>
        </div>
        <p className="mt-2 text-base md:text-lg text-white/80">
          We rotate inventory from favorite labels and new drops.
        </p>

        {/* Controls */}
        <div className="mt-4 md:mt-6 flex flex-col gap-3">
          <label className="relative">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search brands…"
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 pr-10 placeholder:text-white/40 outline-none focus:ring-2 focus:ring-white/20"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 text-sm">⌘K</span>
          </label>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {tags.map((t) => {
              const on = active === t.value;
              return (
                <button
                  key={t.value}
                  onClick={() => setActive(t.value)}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-sm border transition
                    ${on ? "bg-white/10 border-white/20 text-white" : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"}`}
                  aria-pressed={on}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8">
          {filtered.map((b) => (
            <article
              key={b.name}
              className="card overflow-hidden group md:hover:bg-white/10 transition cursor-pointer"
              onClick={() => gotoBrand(b.name)}
              role="button"
              tabIndex={0}
            >
              {/* Logo / placeholder */}
              <div className="relative h-28 sm:h-32 md:h-36 w-full overflow-hidden">
                <div className="w-full h-full grid place-items-center bg-black/40">
                  <div className="text-white/80 font-semibold tracking-wide">
                    {b.name}
                  </div>
                </div>
                <span
                  className={`absolute top-3 right-3 w-2.5 h-2.5 rounded-full ${accentDot(
                    b.accent
                  )} ring-2 ring-black/60`}
                />
              </div>

              <div className="p-4">
                <h3 className="font-semibold leading-snug">{b.name}</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {b.tags.map((t) => (
                    <span key={t} className={`px-2 py-0.5 rounded text-xs ${chipColor(t)}`}>
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <Link
                    to={`/products?brand=${encodeURIComponent(b.name)}`}
                    className="btn btn-ghost px-4 py-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View products
                  </Link>
                  <div className="text-xs text-white/60">In-store only</div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 md:mt-10 text-sm text-white/60">
          Don’t see your favorite label? Ask us — we can usually get it by next week.
        </div>
      </div>
    </section>
  );
}

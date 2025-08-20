// src/pages/Deals.tsx
import { useEffect, useMemo, useState } from "react";

type Color = "red" | "green" | "yellow";

type Deal = {
  title: string;
  badge: "Limited" | "Popular" | "Event" | "Flash";
  color: Color;
  image: string;     // ✅ NEW: deal thumbnail
  endsAt?: string;   // ISO date string (optional). If omitted, treated as ongoing.
  code?: string;     // Optional promo code
  note?: string;     // Optional extra text
  href?: string;     // Optional click-through link
};

const chip = (c: Color) =>
  c === "red" ? "bg-red-500 text-black" : c === "green" ? "bg-green-500 text-black" : "bg-yellow-400 text-black";

// --- Demo data with images (replace with your own any time) ---
const ALL_DEALS: Deal[] = [
  {
    title: "Weekend BOGO on Disposables",
    badge: "Limited",
    color: "red",
    image: "https://vape702usa.com/cdn/shop/files/New_Arrivals_f53b0350-949f-4a3f-afbc-20886ee29b7c_1350x667.png?v=1720600557", // vape
    endsAt: addHoursISO(48),
    code: "BOGO-WKND",
    note: "Buy 1 get 1 on select disposables.",
  },
  {
    title: "Hookah Flavor Bundle 10% Off",
    badge: "Popular",
    color: "green",
    image: "https://cdn.shopify.com/s/files/1/0639/9207/0375/articles/top-5-best-al-fakher-shisha-flavorss_2048x2048.png?v=1671145715", // hookah
    endsAt: addHoursISO(72),
    note: "Any 3 flavors mix & match.",
  },
  {
    title: "Cigar Night — Fridays 7–9 PM",
    badge: "Event",
    color: "yellow",
    image: "https://th.bing.com/th/id/R.3a58db9fbbc603a691117ae3069058f9?rik=BnCjl4%2fP5Vs0Fg&riu=http%3a%2f%2fimages.wisegeek.com%2fcigar.jpg&ehk=CwjaD0dlcsDF5IsiaZnOSZjMGyfScLU3VuLWeh%2bRyK0%3d&risl=&pid=ImgRaw&r=0", // cigars
    note: "Ask in-store for featured sticks.",
  },
  // Past example
  {
    title: "Flash Drop: 15% off Glass",
    badge: "Flash",
    color: "red",
    image: "https://tse4.mm.bing.net/th/id/OIP.iFUhvhCY035Rj5y2WnqmJAHaLH?w=756&h=1134&rs=1&pid=ImgDetMain&o=7&rm=3", // glass
    endsAt: addHoursISO(-6),
    code: "GLASS15",
  },
];

// Utility: add hours to now → ISO
function addHoursISO(hours: number) {
  return new Date(Date.now() + hours * 3600_000).toISOString();
}

function useNow(tickMs = 1000) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), tickMs);
    return () => clearInterval(id);
  }, [tickMs]);
  return now;
}

function formatCountdown(ms: number) {
  if (ms <= 0) return "Ended";
  const s = Math.floor(ms / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return d > 0 ? `${d}d ${h}h` : h > 0 ? `${h}h ${m}m` : `${m}m ${sec}s`;
}

export default function Deals() {
  const now = useNow(1000);

  // UI state
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | Color>("all");
  const [showPast, setShowPast] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const { activeDeals, pastDeals } = useMemo(() => {
    const q = query.trim().toLowerCase();
    const byText = (d: Deal) =>
      !q || d.title.toLowerCase().includes(q) || d.note?.toLowerCase().includes(q);
    const byColor = (d: Deal) => filter === "all" || d.color === filter;

    const active: Deal[] = [];
    const past: Deal[] = [];
    for (const d of ALL_DEALS) {
      const isActive = !d.endsAt || new Date(d.endsAt).getTime() > now;
      if (byText(d) && byColor(d)) (isActive ? active : past).push(d);
    }
    active.sort((a, b) => (timeLeftMs(a, now) ?? Infinity) - (timeLeftMs(b, now) ?? Infinity));
    past.sort((a, b) => (endTimeMs(b) ?? 0) - (endTimeMs(a) ?? 0));
    return { activeDeals: active, pastDeals: past };
  }, [now, query, filter]);

  function timeLeftMs(d: Deal, nowMs: number) {
    if (!d.endsAt) return undefined;
    return new Date(d.endsAt).getTime() - nowMs;
  }
  function endTimeMs(d: Deal) {
    return d.endsAt ? new Date(d.endsAt).getTime() : undefined;
  }

  async function copyCode(code?: string) {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 1200);
    } catch {
      // no-op
    }
  }

  return (
    <section className="pt-6 pb-16 md:py-12">
      <div className="container px-3 md:px-4">
        {/* Header */}
        <div className="flex items-end justify-between gap-3">
          <h1 className="h1 text-3xl md:text-5xl">Deals</h1>
          <span className="text-xs md:text-sm text-white/60">{activeDeals.length} active</span>
        </div>
        <p className="mt-2 text-base md:text-lg text-white/80">
          Weekly promos and events. Follow our socials for flash drops.
        </p>

        {/* Controls */}
        <div className="mt-4 md:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search */}
          <label className="sm:col-span-2 relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search deals…"
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 pr-10 placeholder:text-white/40 outline-none focus:ring-2 focus:ring-white/20"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 text-sm">⌘F</span>
          </label>

          {/* Color filter */}
          <div className="flex items-center gap-2 justify-start sm:justify-end overflow-x-auto no-scrollbar">
            {[
              { key: "all", label: "All" },
              { key: "red", label: "Disposables" },
              { key: "yellow", label: "Cigars/Hardware" },
              { key: "green", label: "Hookah" },
            ].map((f) => {
              const on = filter === (f.key as any);
              return (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key as any)}
                  className={`rounded-full px-3 py-1.5 text-sm border transition whitespace-nowrap
                    ${on ? "bg-white/10 border-white/20 text-white" : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"}`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active deals */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8">
          {activeDeals.map((d) => {
            const left = timeLeftMs(d, now);
            const showCountdown = typeof left === "number";
            const CardTag = d.href ? "a" : "div";
            const tagProps = d.href ? ({ href: d.href, target: "_blank", rel: "noopener noreferrer" } as const) : ({} as const);

            return (
              <article key={d.title} className="card overflow-hidden md:hover:bg-white/10 transition">
                {/* Image header */}
                <div className="relative">
                  <img
                    src={d.image}
                    alt={d.title}
                    className="w-full h-44 sm:h-48 md:h-52 object-cover"
                    loading="lazy"
                  />
                  {/* gradient for text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  {/* badge */}
                  <span className={`absolute top-3 right-3 px-2 py-0.5 rounded ${chip(d.color)}`}>
                    {d.badge}
                  </span>
                  {/* title over image on larger screens */}
                  <h3 className="hidden sm:block absolute left-4 bottom-3 text-lg font-semibold drop-shadow">
                    {d.title}
                  </h3>
                </div>

                {/* Body */}
                <div className="p-4">
                  {/* title for mobile (shown when not overlayed) */}
                  <h3 className="sm:hidden text-lg font-semibold">{d.title}</h3>

                  {d.note && <p className="text-sm text-white/80 mt-2">{d.note}</p>}

                  <div className="mt-3 flex items-center gap-3">
                    {showCountdown ? (
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs">
                        <span className="w-2 h-2 rounded-full bg-white/60" />
                        Ends in <strong className="ml-1 text-white">{formatCountdown(left!)}</strong>
                      </span>
                    ) : (
                      <span className="text-xs text-white/60">Ongoing</span>
                    )}

                    {d.code && (
                      <button
                        className="ml-auto btn btn-ghost px-3 py-1.5 text-sm"
                        onClick={() => copyCode(d.code)}
                        title="Copy code"
                      >
                        {copiedCode === d.code ? "Copied!" : d.code}
                      </button>
                    )}
                  </div>

                  {/* optional "View" link/button */}
                  <div className="mt-3">
                    <CardTag
                      {...tagProps}
                      className={`inline-block btn btn-ghost px-4 py-2 ${d.href ? "cursor-pointer" : "cursor-default"}`}
                    >
                      {d.href ? "View details" : "In-store only"}
                    </CardTag>
                  </div>

                  <p className="text-xs text-white/60 mt-4">Valid while supplies last.</p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Past deals */}
        <div className="mt-8 md:mt-10">
          <button
            className="btn btn-ghost px-4 py-2"
            onClick={() => setShowPast((v) => !v)}
            aria-expanded={showPast}
          >
            {showPast ? "Hide past deals" : `Show past deals (${pastDeals.length})`}
          </button>

          <div
            className={`transition-[max-height,opacity] overflow-hidden ${
              showPast ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="grid md:grid-cols-2 gap-4 md:gap-6 mt-4">
              {pastDeals.map((d) => (
                <article key={d.title} className="card overflow-hidden opacity-70">
                  <div className="relative">
                    <img
                      src={d.image}
                      alt={d.title}
                      className="w-full h-40 object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <span className={`absolute top-3 right-3 px-2 py-0.5 rounded ${chip(d.color)}`}>
                      {d.badge}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{d.title}</h3>
                    <p className="text-sm text-white/70 mt-2">Ended</p>
                    {d.code && <p className="text-xs text-white/50 mt-1">Code: {d.code}</p>}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Legal footer */}
        <div className="mt-8 text-xs text-yellow-400/90">
          * Must be 21+. Please consume responsibly.
        </div>
      </div>
    </section>
  );
}

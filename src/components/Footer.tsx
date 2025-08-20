export default function Footer(){
  return (
    <footer className="border-t border-white/10 bg-black/60">
      <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/70">
        <div>© {new Date().getFullYear()} NY Smoke 2 — All rights reserved.</div>
        <div className="flex gap-3">
          <span className="badge"><span className="w-2 h-2 rounded-full bg-red-500" />Vape</span>
          <span className="badge"><span className="w-2 h-2 rounded-full bg-green-500" />Hookah</span>
          <span className="badge"><span className="w-2 h-2 rounded-full bg-yellow-400" />Cigars</span>
        </div>
      </div>
    </footer>
  );
}

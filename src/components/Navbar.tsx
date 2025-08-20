// src/components/Navbar.tsx
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

const linkCls = ({ isActive }: { isActive: boolean }) =>
  `block px-4 py-3 rounded-md text-base md:text-sm transition
   ${isActive ? "bg-white/10 text-white" : "text-white/80 hover:text-white"}`;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Close the mobile menu when a link is clicked
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
      {/* accent bar */}
      <div className="h-0.5 bg-gradient-to-r from-red-500 via-yellow-400 to-green-500" />

      <nav className="container h-14 md:h-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="font-semibold tracking-wide text-lg md:text-base"
          onClick={close}
        >
          <span className="text-rose-500">NY</span> <span className="">SMOKE 2</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1 md:gap-2">
          <NavLink to="/" className={linkCls} end>
            Home
          </NavLink>
          <NavLink to="/products" className={linkCls}>
            Products
          </NavLink>
          <NavLink to="/brands" className={linkCls}>
            Brands
          </NavLink>
          <NavLink to="/deals" className={linkCls}>
            Deals
          </NavLink>
          <NavLink to="/about" className={linkCls}>
            About
          </NavLink>
          <NavLink to="/contact" className={linkCls}>
            Contact
          </NavLink>
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-white/15 bg-white/5 text-white/90 active:scale-[0.98] transition"
        >
          {/* simple hamburger / close icon */}
          <div className="relative w-5 h-5">
            <span
              className={`absolute left-0 right-0 h-0.5 bg-white transition-transform ${
                open ? "top-2.5 rotate-45" : "top-1"
              }`}
            />
            <span
              className={`absolute left-0 right-0 h-0.5 bg-white transition-opacity top-2.5 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 right-0 h-0.5 bg-white transition-transform ${
                open ? "top-2.5 -rotate-45" : "top-4"
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile slide-down panel */}
      <div
        className={`md:hidden mb-4 border-t border-white/10 bg-black/80 backdrop-blur transition-[max-height,opacity] overflow-hidden ${
          open ? "max-h-[340px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container py-2">
          <nav className="flex flex-col">
            <NavLink to="/" className={linkCls} end onClick={close}>
              Home
            </NavLink>
            <NavLink to="/products" className={linkCls} onClick={close}>
              Products
            </NavLink>
            <NavLink to="/brands" className={linkCls} onClick={close}>
              Brands
            </NavLink>
            <NavLink to="/deals" className={linkCls} onClick={close}>
              Deals
            </NavLink>
            <NavLink to="/about" className={linkCls} onClick={close}>
              About
            </NavLink>
            <NavLink to="/contact" className={linkCls} onClick={close}>
              Contact
            </NavLink>

            {/* Quick actions (optional, mobile only) */}
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/products"
                onClick={close}
                className="text-center px-4 py-2 rounded-md bg-red-500 text-black font-semibold"
              >
                Shop
              </Link>
              <Link
                to="/deals"
                onClick={close}
                className="text-center px-4 py-2 rounded-md border border-white/15 bg-white/5 text-white font-semibold"
              >
                Deals
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

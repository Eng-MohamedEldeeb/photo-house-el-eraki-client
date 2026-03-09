import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav
      className="sticky top-0 z-50 bg-dark/95 backdrop-blur
      border-b border-dark3"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex flex-col leading-none">
            <span
              className="font-display text-xl text-gold
              tracking-widest"
            >
              PHOTO HOUSE
            </span>
            <span
              className="font-ui text-xs text-text3
              tracking-wider"
            >
              Photo House El Eraki
            </span>
          </Link>
          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {[
              ["/", "Home"],
              ["/store", "Store"],
            ].map(([to, label]) => (
              <NavLink
                key={to}
                to={to as string}
                className={({ isActive }) =>
                  `font-ui text-sm tracking-wider transition-colors ${isActive ? "text-gold" : "text-text2 hover:text-gold"}`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
          {/* Mobile menu button */}
          <button
            className="md:hidden text-text2 hover:text-gold p-2"
            onClick={() => setOpen(!open)}
          >
            <span className="block w-6 h-0.5 bg-current mb-1.5" />
            <span className="block w-6 h-0.5 bg-current mb-1.5" />
            <span className="block w-4 h-0.5 bg-current" />
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-dark2 border-t border-dark3 px-4 py-4 flex flex-col gap-4">
          <Link
            to="/"
            className="font-ui text-sm text-text2
            hover:text-gold"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/store"
            className="font-ui text-sm text-text2
            hover:text-gold"
            onClick={() => setOpen(false)}
          >
            Store
          </Link>
        </div>
      )}
    </nav>
  );
}

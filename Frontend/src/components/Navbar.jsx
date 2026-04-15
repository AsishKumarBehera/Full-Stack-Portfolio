import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";


const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
];

function Navbar({ darkMode, setDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  return (
    <nav
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div
          className={`flex items-center justify-between rounded-full px-4 transition-all duration-500 min-h-[56px] ${scrolled ? "bg-white/90 dark:bg-slate-950/90 backdrop-blur-2xl shadow-[0_24px_80px_rgba(15,23,42,0.12)] dark:shadow-[0_24px_80px_rgba(15,23,42,0.38)] border border-slate-200/70 dark:border-slate-700/70" : "bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50"}`}
        >

          {/* ── Logo ── */}
          <Link to="/" className="group flex items-center gap-2.5 pl-1">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-black tracking-tight text-white transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110 bg-gradient-to-br from-slate-900 via-slate-700 to-slate-500">
              <span className="text-lime-400 tracking-tight">AK</span>
            </div>
            
          </Link>

          {/* ── Desktop nav links ── */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative inline-flex items-center px-4 py-2 rounded-full text-sm transition-all duration-200 ${isActive ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10 dark:bg-slate-100 dark:text-slate-900" : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* ── Right side ── */}
          <div className="flex items-center gap-2 pr-1">
            {/* Dark mode toggle — desktop */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="hidden md:flex w-9 h-9 rounded-full items-center justify-center text-[15px] transition-all duration-300 hover:scale-110 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-yellow-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            {/* Dark mode toggle — mobile */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="md:hidden flex w-8 h-8 rounded-full items-center justify-center text-sm transition-all duration-200 hover:scale-110 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-yellow-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            {/* Hamburger — mobile */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex w-8 h-8 rounded-full items-center justify-center transition-all duration-200 hover:scale-110 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              {isOpen ? <FaTimes size={13} /> : <FaBars size={13} />}
            </button>
          </div>

        </div>
      </div>

      {/* ── Mobile menu — slides down ── */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden
          ${isOpen ? "max-h-[400px] opacity-100 mt-2" : "max-h-0 opacity-0"}`}
      >
        <div
          className="mx-4 rounded-2xl overflow-hidden bg-white/95 dark:bg-slate-950/95 border border-slate-200/60 dark:border-slate-700/60 backdrop-blur-2xl shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:shadow-[0_20px_60px_rgba(15,23,42,0.5)]"
        >
          <div className="p-2 flex flex-col gap-0.5">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all duration-200 ${isActive ? "bg-slate-900 text-white font-medium dark:bg-slate-100 dark:text-slate-900" : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-normal"}`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

    </nav>
  );
}

export default Navbar;
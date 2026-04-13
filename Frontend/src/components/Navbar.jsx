import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/contact", label: "Contact" },
];

function Navbar({ darkMode, setDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Add shadow + blur intensity on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => setIsOpen(false), [location]);

  return (
    <nav className={`fixed w-full top-0 left-0 z-50
      transition-all duration-500
      ${scrolled
        ? "bg-white/80 dark:bg-[#0a0a0f]/90 backdrop-blur-xl shadow-[0_4px_32px_rgba(124,77,255,0.08)] border-b border-purple-100/60 dark:border-purple-900/30"
        : "bg-transparent border-b border-transparent"
      }`}>

      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/"
          className="relative group flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-extrabold
            transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
            style={{ background: "linear-gradient(135deg,#7c4dff,#4d79ff)" }}>
            A
          </div>
          <span className="text-xl font-extrabold tracking-tight"
            style={{
              background: "linear-gradient(135deg,#7c4dff,#4d79ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
            K
          </span>
          {/* Glow on hover */}
          <div className="absolute -inset-2 rounded-xl opacity-0 group-hover:opacity-100
            transition-opacity duration-300 -z-10
            bg-purple-50 dark:bg-purple-900/20" />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1
          bg-white/60 dark:bg-white/5
          border border-purple-100 dark:border-purple-900/40
          backdrop-blur-md rounded-2xl px-2 py-1.5">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link key={link.to} to={link.to}
                className={`relative px-4 py-2 rounded-xl text-sm font-medium
                  transition-all duration-200
                  ${isActive
                    ? "text-white"
                    : "text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-300"
                  }`}>
                {/* Active pill */}
                {isActive && (
                  <span className="absolute inset-0 rounded-xl -z-10"
                    style={{ background: "linear-gradient(135deg,#7c4dff,#4d79ff)" }} />
                )}
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right side — dark mode + CTA */}
        <div className="hidden md:flex items-center gap-3">

          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-10 h-10 rounded-xl flex items-center justify-center
              text-base transition-all duration-300 hover:scale-110 hover:rotate-12
              bg-purple-50 dark:bg-purple-950/40
              border border-purple-100 dark:border-purple-900/50
              text-gray-500 dark:text-yellow-300
              hover:border-purple-300 dark:hover:border-purple-600">
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        {/* Mobile — dark toggle + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-sm
              bg-purple-50 dark:bg-purple-950/30
              border border-purple-100 dark:border-purple-900/50
              hover:scale-110 transition-all duration-200
              text-gray-500 dark:text-yellow-300">
            {darkMode ? "☀️" : "🌙"}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-9 h-9 rounded-xl flex items-center justify-center
              transition-all duration-200 hover:scale-110
              bg-purple-50 dark:bg-purple-950/30
              border border-purple-100 dark:border-purple-900/50
              text-gray-600 dark:text-gray-300
              hover:text-purple-600 dark:hover:text-purple-400
              hover:border-purple-300 dark:hover:border-purple-600">
            {isOpen ? <FaTimes size={15} /> : <FaBars size={15} />}
          </button>
        </div>
      </div>

      {/* Mobile menu — slides down */}
      <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden
        ${isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}>

        <div className="mx-4 mb-4 rounded-2xl overflow-hidden
          bg-white/90 dark:bg-[#0f0e19]/95
          border border-purple-100 dark:border-purple-900/50
          backdrop-blur-xl shadow-[0_16px_48px_rgba(124,77,255,0.12)]">

          {/* Nav links */}
          <div className="p-3 flex flex-col gap-1">
            {navLinks.map((link, i) => {
              const isActive = location.pathname === link.to;
              return (
                <Link key={link.to} to={link.to}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl
                    text-sm font-medium transition-all duration-200
                    ${isActive
                      ? "text-white"
                      : "text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400"
                    }`}
                  style={isActive ? { background: "linear-gradient(135deg,#7c4dff,#4d79ff)" } : {}}>
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="text-white/70 text-xs">●</span>
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
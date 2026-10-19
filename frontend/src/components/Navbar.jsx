import { useState, useEffect } from "react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Initialize based on HTML dataset
  const [isDark, setIsDark] = useState(
    document.documentElement.getAttribute("data-theme") === "dark"
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (isDark) {
      html.setAttribute("data-theme", "light");
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      html.setAttribute("data-theme", "dark");
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <nav 
      className="fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent"
      style={{ 
        backgroundColor: scrolled ? "var(--bg-primary)" : "transparent",
        borderColor: scrolled ? "var(--border-color)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        padding: scrolled ? "0.75rem 0" : "1.25rem 0"
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
        
        <ul className={`md:flex gap-8 items-center ${open ? "absolute top-full left-0 w-full bg-[var(--bg-surface)] border-b border-[var(--border-color)] p-6 flex flex-col items-start gap-6 shadow-xl" : "hidden md:flex"}`}>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)} className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent-color)] transition-colors relative group">
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--accent-color)] transition-all group-hover:w-full"></span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 ml-auto">
          
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme} 
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="p-2 rounded-full bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)] transition-all cursor-pointer shadow-sm"
          >
            {isDark ? (
              // Moon Icon (Shows in Dark Mode)
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
            ) : (
              // Sun Icon (Shows in Light Mode)
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            )}
          </button>

          <a href="#contact" className="hidden md:block px-5 py-2 bg-[var(--accent-color)] text-[var(--accent-text)] rounded-lg text-sm font-semibold hover:bg-[var(--accent-hover)] transition-all shadow-sm">
            Hire Me
          </a>

          <button className="md:hidden text-2xl text-[var(--text-primary)]" onClick={() => setOpen(!open)}>
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>
    </nav>
  );
}
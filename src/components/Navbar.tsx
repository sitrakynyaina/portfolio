import { useState, useEffect } from "react";
import { Terminal, Menu, X, Github, Linkedin, Mail } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur-md border-b border-slate-800/60 py-4 shadow-lg shadow-slate-950/20"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Left Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 font-mono text-lg font-bold tracking-wider text-white hover:opacity-90 transition-opacity"
        >
          <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <Terminal className="w-4 h-4" />
          </div>
          <span className="text-slate-200">str_N<span className="text-teal-400">_Aina</span></span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-400 hover:text-white hover:shadow-glow duration-200 transition-all"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="w-[1px] h-4 bg-slate-800" />

          {/* Icon Contacts */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" id="nav-github-icon" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <Linkedin className="w-4 h-4" id="nav-linkedin-icon" />
            </a>
            <a
              href="mailto:landrysitrak@gmail.com"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" id="nav-mail-icon" />
            </a>
            <a
              href="#contact"
              className="px-4 py-1.5 text-xs font-mono font-medium rounded-md border border-teal-500/30 bg-teal-500/10 text-teal-400 hover:bg-teal-500/20 transition-all shadow-[0_0_15px_rgba(20,184,166,0.1)] hover:shadow-[0_0_15px_rgba(20,184,166,0.25)]"
            >
              Consult API
            </a>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[73px] left-0 w-full h-[calc(100vh-73px)] bg-slate-950/95 backdrop-blur-xl border-t border-slate-900 px-6 py-8 flex flex-col justify-between z-40 animate-fadeIn">
          <div className="flex flex-col gap-6 text-lg font-mono">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-400 hover:text-teal-400 py-2 border-b border-slate-900"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-6 py-4 border-t border-slate-900">
            <div className="flex items-center gap-6 justify-center text-slate-400">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="mailto:landrysitrak@gmail.com" className="hover:text-white">
                <Mail className="w-6 h-6" />
              </a>
            </div>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 text-center text-sm font-mono font-medium rounded-lg border border-teal-500/30 bg-teal-500/10 text-teal-400 hover:bg-teal-500/20"
            >
              Consult Architect
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

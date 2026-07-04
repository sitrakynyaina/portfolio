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
    { name: "Home", href: "#hero", active: true }, // Added active state simulation
    { name: "About", href: "#about" },
    { name: "Services", href: "#skills" },
    { name: "Portfolio", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0b132b]/80 backdrop-blur-md border-b border-white/10 py-4 shadow-lg"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Left Logo - Apex Style */}
        <a
          href="#"
          className="flex items-center gap-2 font-sans text-xl font-bold tracking-tight text-white hover:opacity-90 transition-opacity"
        >
          <div className="w-8 h-8 rounded bg-white flex items-center justify-center text-[#0b132b]">
            <Terminal className="w-5 h-5" />
          </div>
          <span>
            str_<span className="font-light">N_Aina</span>
          </span>
        </a>

        {/* Center Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group flex flex-col items-center">
              <a
                href={link.href}
                className={`text-white transition-all ${
                  link.active ? "opacity-100" : "opacity-70 hover:opacity-100"
                }`}
              >
                {link.name}
              </a>
              {/* Active underline indicator */}
              <div
                className={`absolute -bottom-2 h-0.5 bg-white transition-all duration-300 ${
                  link.active ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Right Actions & Get Started Button */}
        <div className="hidden md:flex items-center gap-5">
          <div className="flex items-center gap-4 border-r border-white/20 pr-5">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-white/70 hover:text-white transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-white/70 hover:text-white transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
          <a
            href="#contact"
            className="px-6 py-2.5 text-sm font-sans font-bold rounded-full bg-white text-[#0b132b] hover:bg-gray-100 transition-all shadow-[0_4px_14px_rgba(255,255,255,0.2)]"
          >
            Contact Me
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex items-center justify-center p-2 rounded-lg text-white/70 hover:text-white transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[73px] left-0 w-full h-screen bg-[#0b132b]/95 backdrop-blur-xl border-t border-white/10 px-6 py-8 flex flex-col justify-start gap-8 z-40">
          <div className="flex flex-col gap-6 text-lg font-sans font-medium">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/80 hover:text-white py-2 border-b border-white/10"
              >
                {link.name}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-3.5 text-center text-sm font-bold rounded-full bg-white text-[#0b132b] hover:bg-gray-100"
          >
            Contact Me
          </a>
        </div>
      )}
    </nav>
  );
}
import { Terminal, ArrowUp, Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="bg-[#06070a] border-t border-slate-900/60 py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10 w-full">
        {/* Left Side Brand */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 font-mono text-xs">
              <Terminal className="w-3.5 h-3.5" />
            </div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-slate-400">
              Landry Sitrakiniaina
            </span>
          </div>
        </div>

        {/* Quick links and contact summary */}
        <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-[11px] text-slate-500">
          <a href="#about" className="hover:text-teal-400 transition-colors">ABOUT</a>
          <a href="#skills" className="hover:text-teal-400 transition-colors">SKILLS</a>
          <a href="#projects" className="hover:text-teal-400 transition-colors">PROJECTS</a>
          <a href="#contact" className="hover:text-teal-400 transition-colors">CONTACT</a>
        </div>

        {/* Right Action Trigger Buttons */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 text-slate-600">
            <a href="https://github.com/sitrakynyaina" target="_blank" rel="noreferrer" className="hover:text-teal-400 transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/in/landry-sitrakiniaina-baa86b335/" target="_blank" rel="noreferrer" className="hover:text-teal-400 transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="mailto:landrysitrak@gmail.com" className="hover:text-teal-400 transition-colors">
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <div className="w-[1px] h-4 bg-slate-800" />

          {/* Scroll back to top */}
          <button
            onClick={handleScrollToTop}
            title="Return to top level"
            className="p-2 rounded bg-slate-900 hover:bg-slate-850 hover:text-white border border-slate-800 text-slate-500 transition-all cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

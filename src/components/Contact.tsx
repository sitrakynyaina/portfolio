import React from "react";
import { Mail, Github, Linkedin, Facebook, MapPin, ExternalLink } from "lucide-react";

export default function Contact() {
  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      url: "https://www.linkedin.com/in/landry-sitrakiniaina-baa86b335/",
      color: "hover:text-blue-400",
      label: "Professional Network"
    },
    {
      name: "GitHub",
      icon: <Github className="w-5 h-5" />,
      url: "https://github.com/sitrakynyaina",
      color: "hover:text-white",
      label: "Source Code"
    },
    {
      name: "Facebook",
      icon: <Facebook className="w-5 h-5" />,
      url: "https://web.facebook.com/profile.php?id=100013418474824",
      color: "hover:text-blue-600",
      label: "Social Presence"
    }
  ];

  return (
    <section id="contact" className="py-24 bg-[#090a0f] relative overflow-hidden flex items-center justify-center min-h-[600px]">
      {/* Glow d'arrière-plan */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 w-full text-center">
        <div className="flex flex-col items-center gap-4 mb-12">
          <span className="text-xs font-mono text-teal-400 uppercase tracking-widest">Available for Transmission</span>
          <h2 className="text-4xl md:text-5xl font-sans font-bold text-white tracking-tight">
            Get In Touch
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Carte Email Principale */}
          <a 
            href="mailto:landrysitrak@gmail.com"
            className="group relative p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-teal-500/50 transition-all duration-500 flex flex-col items-center gap-4 overflow-hidden"
          >
            <div className="absolute inset-0 bg-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-14 h-14 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform duration-500">
              <Mail className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Direct Line</span>
              <span className="text-lg font-mono text-slate-200 group-hover:text-teal-400 transition-colors">landrysitrak@gmail.com</span>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-600 absolute bottom-4 right-4 group-hover:text-teal-500 transition-colors" />
          </a>

          {/* Grid des réseaux sociaux */}
          <div className="grid grid-cols-1 gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center gap-4 p-4 rounded-xl bg-slate-900/20 border border-slate-800/50 ${social.color} hover:bg-slate-900/40 transition-all duration-300`}
              >
                <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-inherit group-hover:border-current transition-all">
                  {social.icon}
                </div>
                <div className="text-left">
                  <div className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">{social.label}</div>
                  <div className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">{social.name}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Localisation Discrète */}
        <div className="mt-16 flex items-center justify-center gap-2 text-slate-500 font-mono text-xs uppercase tracking-widest">
          <MapPin className="w-3 h-3 text-teal-500" />
          101 Antananarivo, Madagascar
        </div>
      </div>
    </section>
  );
}
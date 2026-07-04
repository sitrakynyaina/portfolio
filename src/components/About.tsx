import { motion } from "motion/react";
import { Award, Briefcase, GraduationCap, Server, Layers, Cpu } from "lucide-react";

export default function About() {
  const specializations = [
    {
      icon: <Layers className="w-5 h-5 text-teal-400" />,
      title: "Full-Stack Development",
      desc: "Building integrated web applications using React for dynamic frontends and Spring Boot for robust, secure backend services.",
    },
    {
      icon: <Server className="w-5 h-5 text-cyan-400" />,
      title: "System Modeling & Design",
      desc: "Applying structured methodologies like Merise and UML to design scalable database schemas and efficient software architectures.",
    },
    {
      icon: <Cpu className="w-5 h-5 text-indigo-400" />,
      title: "Cloud & Security Learning",
      desc: "Actively training for Google Cloud Associate Cloud Engineer (ACE) certification and exploring cybersecurity through CTF challenges.",
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* CORRECTION : Continuité de la grille Cyber-Dots depuis le Hero */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
      
      {/* CORRECTION : Effet de lumière doux sur la droite pour équilibrer le glow du Hero */}
      <div className="absolute -right-1/4 top-1/3 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Metadata Highlights */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono text-teal-400 uppercase tracking-widest">About Me</span>
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-white tracking-tight">
                Passion for Building & Problem Solving
              </h2>
            </div>

            <p className="text-slate-400 leading-relaxed text-sm md:text-base">
              I am an IT student dedicated to mastering the full software development lifecycle. I bridge the gap between academic modeling and practical implementation, with a focus on creating efficient, maintainable, and secure digital solutions.
            </p>

            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 font-mono text-xs">
                <GraduationCap className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-200">IT Student</div>
                  <div className="text-slate-500">Fianarantsoa, Madagascar</div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 font-mono text-xs">
                <Briefcase className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-200">Current Projects</div>
                  <div className="text-slate-500">Mobile Money & Air Reservation Systems</div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 font-mono text-xs">
                <Award className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-200">Certification Path</div>
                  <div className="text-slate-500">Google Cloud Associate Cloud Engineer (ACE)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Core Offerings & Experience */}
          <div className="lg:col-span-7 flex flex-col gap-8 w-full">
            <h3 className="text-sm font-mono text-slate-400 uppercase tracking-widest border-b border-slate-800/80 pb-3">
              Technical Competencies
            </h3>

            <div className="grid grid-cols-1 gap-6">
              {specializations.map((spec, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex flex-col md:flex-row gap-5 p-6 rounded-2xl bg-gradient-to-br from-slate-900/60 to-slate-900/20 border border-slate-800/80 hover:border-slate-700 hover:shadow-[0_0_20px_rgba(20,184,166,0.03)] duration-300 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-950/85 border border-slate-800/60 flex items-center justify-center shrink-0">
                    {spec.icon}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="text-lg font-sans font-semibold text-slate-200">
                      {spec.title}
                    </h4>
                    <p className="text-sm text-slate-400 leading-relaxed font-sans">
                      {spec.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
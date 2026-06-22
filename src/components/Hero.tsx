import { motion } from "motion/react";
import { ArrowRight, Shield, Cpu } from "lucide-react";
import fond from "../assets/images/fond.jpg";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 md:py-36 bg-[#090a0f] flex items-center overflow-hidden"
    >
      {/* Background Cyber-Dots Grid & Radial Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
      
      {/* Dynamic Backglows */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[150px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Copy */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col gap-6 text-left"
        >
          {/* Status badge */}
          <motion.div variants={itemVariants} className="inline-flex">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-xs font-mono text-teal-400">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              Building & Learning | Seeking Junior Opportunities
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-sans font-bold tracking-tight text-white leading-[1.1]"
          >
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-400 to-indigo-400">Sitrakiniaina</span>
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className="text-xl md:text-2xl font-mono text-slate-300 font-semibold"
          >
            Aspiring Full-Stack Developer
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-slate-400 max-w-xl leading-relaxed"
          >
            Focused on building responsive web applications with React and Spring Boot. Passionate about solving complex logic problems, learning distributed system architectures, and writing clean, maintainable code.
          </motion.p>

          {/* Core metrics updated for student profile */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-4 border-y border-slate-800/40 py-5 my-2 max-w-lg text-slate-300 font-mono"
          >
            <div>
              <div className="text-xl font-bold font-sans text-teal-400">5+</div>
              <div className="text-xs text-slate-500 uppercase mt-0.5">Hackathon</div>
            </div>
            <div>
              <div className="text-xl font-bold font-sans text-teal-400">Full-Stack</div>
              <div className="text-xs text-slate-500 uppercase mt-0.5 font-mono">Developer</div>
            </div>
            <div>
              <div className="text-xl font-bold font-sans text-teal-400">10+</div>
              <div className="text-xs text-slate-500 uppercase mt-0.5">Projects</div>
            </div>
          </motion.div>

          {/* Call to Actions */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mt-2">
            <a
              href="#projects"
              className="px-6 py-3.5 rounded-lg bg-teal-500 text-slate-950 font-semibold text-sm hover:bg-teal-400 transition-colors flex items-center gap-2 group shadow-[0_4px_20px_rgba(20,184,166,0.30)] hover:shadow-[0_4px_25px_rgba(20,184,166,0.50)]"
            >
              View Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 duration-200 transition-transform" />
            </a>
            <a
              href="#about"
              className="px-6 py-3.5 rounded-lg border border-slate-700 hover:border-slate-500 hover:bg-slate-900/50 text-slate-300 font-semibold text-sm transition-colors"
            >
              About Me
            </a>
          </motion.div>
        </motion.div>

        {/* Right Graphic/Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="lg:col-span-5 flex justify-center relative select-none"
        >
          <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] rounded-full p-1.5 bg-gradient-to-tr from-teal-500 via-slate-800 to-indigo-500 group">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-teal-500 via-cyan-500 to-indigo-500 opacity-30 blur-md group-hover:opacity-50 transition-all duration-300" />
            
            <div className="w-full h-full rounded-full overflow-hidden bg-slate-950 relative border-4 border-slate-900 flex items-center justify-center">
              <img
                src={fond}
                alt="Sitraky Ny Aina Avatar"
                className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="absolute -top-3 -right-3 w-10 h-10 rounded-xl bg-slate-900 border border-teal-500/30 shadow-[0_0_15px_rgba(20,184,166,0.2)] flex items-center justify-center text-teal-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div className="absolute -bottom-1 -left-3 w-10 h-10 rounded-xl bg-slate-900 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)] flex items-center justify-center text-cyan-400 animate-pulse">
              <Shield className="w-5 h-5" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
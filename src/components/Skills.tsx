import { motion } from "motion/react";
import { Laptop, Database, Globe, Cpu } from "lucide-react";
import { Skill } from "../types";

export default function Skills() {
  const list: Skill[] = [
  // Frontend
  { id: "1", name: "JavaScript / TypeScript", category: "Frontend", level: 9, icon: "Code" },
  { id: "2", name: "React 19 & Next.js", category: "Frontend", level: 9, icon: "Layout" },
  { id: "3", name: "HTML5 & Tailwind CSS", category: "Frontend", level: 9, icon: "Palette" },

  // Backend
  { id: "4", name: "Java & Spring Boot", category: "Backend", level: 9, icon: "Coffee" },
  { id: "5", name: "Node.js", category: "Backend", level: 8, icon: "Cpu" },
  { id: "6", name: "Python", category: "Backend", level: 8, icon: "Terminal" },


  // Systems & Databases
  { id: "8", name: "PostgreSQL", category: "Systems & DB", level: 9, icon: "Database" },
  { id: "9", name: "Oracle Database", category: "Systems & DB", level: 8, icon: "Server" },
  { id: "10", name: "SQL & Relational Design", category: "Systems & DB", level: 9, icon: "GitFork" },

  // // DevOps & Tools
  // { id: "11", name: "Cloud Architecture", category: "Cloud & DevOps", level: 8, icon: "Cloud" },
  // { id: "12", name: "Deployment & CI/CD", category: "Cloud & DevOps", level: 8, icon: "Workflow" },
];

  // Grouping
  const categories = [
    { name: "Frontend", icon: <Globe className="w-5 h-5 text-teal-400" /> },
    { name: "Backend", icon: <Cpu className="w-5 h-5 text-cyan-400" /> },
    { name: "Systems & DB", icon: <Database className="w-5 h-5 text-indigo-400" /> },
    { name: "Cloud & DevOps", icon: <Laptop className="w-5 h-5 text-blue-400" /> },
  ];

  return (
    <section id="skills" className="py-24 bg-[#090a0f] relative overflow-hidden">
      {/* Background neon accent */}
      <div className="absolute left-1/2 bottom-0 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[120px] -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col items-center text-center gap-3 mb-16">
          <span className="text-xs font-mono text-teal-400 uppercase tracking-widest">Capabilities Grid</span>
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-white tracking-tight">
            Advanced Technical Proficiency
          </h2>
          <p className="text-sm font-sans text-slate-400 max-w-lg">
            A precise visualization of my engineering proficiency, showcasing core infrastructure, databases, environments, and languages.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat, idx) => {
            const filteredSkills = list.filter((s) => s.category === cat.name);

            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 md:p-8 rounded-2xl bg-slate-900/40 border border-slate-800/60 flex flex-col gap-6"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                  <div className="w-9 h-9 rounded-lg bg-slate-950 flex items-center justify-center border border-slate-800/80">
                    {cat.icon}
                  </div>
                  <h3 className="text-lg font-mono font-bold text-slate-200 uppercase tracking-wider">
                    {cat.name}
                  </h3>
                </div>

                {/* Skills Level list */}
                <div className="flex flex-col gap-6 font-mono text-xs">
                  {filteredSkills.map((skill) => (
                    <div key={skill.id} className="flex flex-col gap-2">
                      <div className="flex justify-between items-center px-0.5">
                        <span className="text-slate-300 font-medium">{skill.name}</span>
                        <span className="text-teal-400 font-bold">{skill.level * 10}%</span>
                      </div>

                      {/* Custom discrete level bar matching full stack portfolio aesthetics */}
                      <div className="flex gap-[3px] w-full">
                        {Array.from({ length: 10 }).map((_, i) => {
                          const active = i < skill.level;
                          return (
                            <div
                              key={i}
                              className={`h-2 flex-grow rounded-[2px] transition-all duration-300 ${
                                active
                                  ? "bg-gradient-to-r from-teal-500 to-cyan-400 shadow-[0_0_8px_rgba(20,184,166,0.5)]"
                                  : "bg-slate-800/80"
                              }`}
                            />
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

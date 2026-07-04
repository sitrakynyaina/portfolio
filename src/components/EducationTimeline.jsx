import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { 
  GraduationCap, 
  BookOpen, 
  Database, 
  Code, 
  Trophy, 
  Terminal,
  Github,
  ExternalLink,
  Cpu,
  RotateCw
} from "lucide-react";

// Carte 3D redimensionnée (plus compacte)
const TiltCard = ({ children, active, isExploit }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative w-full p-5 md:p-6 rounded-xl border backdrop-blur-md transition-colors duration-300 cursor-default ${
        active 
          ? "bg-blue-900/10 border-blue-500/40 shadow-[0_4px_20px_rgba(37,99,235,0.15)] hover:border-blue-400" 
          : isExploit
            ? "bg-teal-900/5 border-teal-500/20 hover:bg-teal-900/10 hover:border-teal-400/50 hover:shadow-[0_4px_20px_rgba(20,184,166,0.1)]"
            : "bg-white/[0.02] border-white/10 hover:bg-white/[0.05] hover:border-white/30"
      }`}
    >
      <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
};

export default function EducationTimeline() {
 const timelineData = [
  {
    id: "edu-1",
    type: "education",
    year: "2023",
    title: "High School Diploma (Science Track)",
    subtitle: "ESCA Antanimena",
    description: "Graduated with Honors (Merit)",
    icon: GraduationCap,
  },
  {
    id: "edu-2",
    type: "education",
    year: "2023 – 2024",
    title: "Bachelor's Degree – First Year",
    subtitle: "ENI Fianarantsoa",
    description: "Software Engineering & Database Systems",
    icon: BookOpen,
  },
  {
    id: "exp-1",
    type: "exploit",
    year: "2024",
    title: "Python Data Exploration",
    subtitle: "Orange Digital Center",
    description:
      "Completed an intensive program focused on data engineering and statistical data analysis.",
    icon: Terminal,
    stats: [
      { label: "Data Parsed", value: "1.2M+ Rows" },
      { label: "Completion", value: "100%" },
    ],
  },
  {
    id: "edu-3",
    type: "education",
    year: "2024 – 2025",
    title: "Bachelor's Degree – Second Year",
    subtitle: "ENI Fianarantsoa",
    description: "Software Engineering & Database Systems",
    icon: Database,
  },
  {
    id: "exp-2",
    type: "exploit",
    year: "2025",
    title: "1st Place – DevHunt 5.0",
    subtitle: "ENI Fianarantsoa Hackathon",
    description:
      "Designed and developed a full-stack web application addressing real-world business challenges.",
    icon: Trophy,
    githubUrl: "https://github.com/sitraknyaina",
    stats: [
      { label: "Rank", value: "1st Place" },
      { label: "Team", value: "4 Developers" },
    ],
  },
  {
    id: "exp-3",
    type: "exploit",
    year: "2025",
    title: "1st Place – DevFest",
    subtitle: "GDG Antananarivo Hackathon",
    description:
      "Built a scalable cloud-native solution following modern software engineering best practices.",
    icon: Cpu,
    githubUrl: "https://github.com/sitraknyaina",
    liveUrl: "https://google.com",
    stats: [
      { label: "Award", value: "Grand Winner" },
      { label: "Duration", value: "24 Hours" },
    ],
  },
  {
    id: "edu-4",
    type: "education",
    year: "2025 – Present",
    title: "Bachelor's Degree – Third Year",
    subtitle: "ENI Fianarantsoa",
    description: "Software Engineering & Database Systems",
    icon: Code,
    active: true,
  },
  {
    id: "exp-4",
    type: "exploit",
    year: "2026",
    title: "1st Place – Youth Computing Challenge",
    subtitle: "National Programming Competition",
    description:
      "Solved advanced algorithmic and programming challenges under strict time constraints.",
    icon: Trophy,
    githubUrl: "https://github.com/sitraknyaina",
    stats: [
      { label: "Rank", value: "#1 / 22" },
      { label: "Score", value: "98/100" },
    ],
  },
];

  // --- Rotation 3D de l'ensemble autour de l'axe vertical central ---
  const MAX_ANGLE = 25; // degrés max de chaque côté, pour rester lisible
  const rotateYRaw = useMotionValue(0);
  const rotateYSpring = useSpring(rotateYRaw, { stiffness: 150, damping: 20, mass: 0.6 });

  const handlePan = (_event, info) => {
    const next = rotateYRaw.get() + info.delta.x * 0.15;
    const clamped = Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, next));
    rotateYRaw.set(clamped);
  };

  const handlePanEnd = () => {
    // Retour en douceur au centre après relâchement
    rotateYRaw.set(0);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-teal-600/5 rounded-full blur-[150px] translate-y-1/2 pointer-events-none z-0" />
      
      <div className="max-w-5xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* En-tête */}
        <div className="flex flex-col items-center text-center gap-3 mb-12">
          <span className="text-xs font-mono text-teal-400 uppercase tracking-widest">
            Formation timeline
          </span>
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-white tracking-tight">
            Formation and achievements
          </h2>
          {/* <p className="text-sm font-sans text-slate-400 max-w-lg">
            A selective registry of architectures designed for production-level
            loads, complete with quantitative KPIs.
          </p> */}
        </div>

        {/* Indice d'interaction */}
        {/* <div className="flex items-center justify-center gap-2 mb-10 text-slate-500 text-[11px] md:text-xs font-mono select-none">
          <RotateCw className="w-3.5 h-3.5" />
          <span>Glissez horizontalement pour faire pivoter la scène</span>
        </div> */}

        {/* Conteneur avec perspective pour la rotation 3D */}
        <div style={{ perspective: "1800px" }}>
          <motion.div
            onPan={handlePan}
            onPanEnd={handlePanEnd}
            style={{
              rotateY: rotateYSpring,
              transformStyle: "preserve-3d",
              touchAction: "pan-y",
            }}
            className="relative cursor-grab active:cursor-grabbing select-none"
          >
            {/* Ligne verticale : alignée sur le centre de la colonne icône (20px mobile / 50% desktop) */}
            <div className="absolute left-5 md:left-1/2 md:-translate-x-1/2 top-2 bottom-2 w-[2px] bg-gradient-to-b from-blue-500/30 via-teal-500/30 to-blue-500/0 pointer-events-none" />

            <div className="flex flex-col gap-8 md:gap-12">
              {timelineData.map((item, index) => {
                const Icon = item.icon;
                const isExploit = item.type === "exploit";
                const isLeft = index % 2 === 0; // Alternance Droite/Gauche

                const iconCircle = (
                  <div
                    className={`justify-self-center self-center w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 z-10 transition-all duration-300 shadow-md ${
                      item.active 
                        ? "bg-blue-600 border-blue-400 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]" 
                        : isExploit
                          ? "bg-[#090b11] border-teal-500/30 text-teal-400 group-hover:border-teal-400 group-hover:bg-teal-950/50"
                          : "bg-[#090b11] border-slate-700 text-slate-400 group-hover:border-blue-400/50 group-hover:text-blue-400"
                    }`}
                  >
                    <Icon className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                );

                const card = (
                  <TiltCard active={item.active} isExploit={isExploit}>
                    {/* Header de la carte */}
                    <div className={`flex flex-wrap items-center gap-3 mb-3 ${isLeft ? "md:flex-row-reverse" : "md:flex-row"} justify-between md:justify-start`}>
                      <div className={`inline-block px-2.5 py-1 text-[10px] md:text-xs font-bold tracking-wider rounded-full border ${
                        isExploit ? "text-teal-300 bg-teal-500/10 border-teal-500/30" : "text-blue-300 bg-blue-500/10 border-blue-500/30"
                      }`}>
                        {item.year}
                      </div>

                      {isExploit && (item.githubUrl || item.liveUrl) && (
                        <div className="flex gap-2 text-slate-400 z-20 relative">
                          {item.githubUrl && (
                            <a href={item.githubUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                              <Github className="w-4 h-4" />
                            </a>
                          )}
                          {item.liveUrl && (
                            <a href={item.liveUrl} target="_blank" rel="noreferrer" className="hover:text-teal-400 transition-colors">
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="text-left">
                      <h3 className="text-lg md:text-xl font-bold text-white mb-1 group-hover:text-white transition-colors">
                        {item.title}
                      </h3>
                      <h4 className={`text-xs md:text-sm font-medium mb-2 ${isExploit ? "text-teal-400/90 font-mono" : "text-white/80"}`}>
                        {item.subtitle}
                      </h4>
                      <p className="text-xs md:text-sm text-slate-400 font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {item.stats && (
                      <div className={`grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-800/80 font-mono ${isLeft ? "md:text-right" : "md:text-left"} text-left`}>
                        {item.stats.map(stat => (
                          <div key={stat.label}>
                            <div className="text-[9px] text-slate-500 uppercase tracking-wider">{stat.label}</div>
                            <div className="text-xs font-bold text-slate-200 mt-0.5">{stat.value}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {item.active && (
                      <div className={`absolute top-4 ${isLeft ? "md:left-4 right-4" : "right-4"} flex items-center gap-2`}>
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        <span className="text-[10px] md:text-xs font-medium text-blue-400">Actuel</span>
                      </div>
                    )}
                  </TiltCard>
                );

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="relative grid grid-cols-[40px_1fr] md:grid-cols-[1fr_56px_1fr] gap-x-4 md:gap-x-0 items-start md:items-center w-full group"
                  >
                    {/* Icône : colonne dédiée, jamais superposée au texte */}
                    <div className="col-start-1 md:col-start-2">
                      {iconCircle}
                    </div>

                    {/* Colonne gauche (desktop) */}
                    {isLeft ? (
                      <div className="col-start-2 md:col-start-1 md:pr-8 lg:pr-12">
                        {card}
                      </div>
                    ) : (
                      <div className="hidden md:block md:col-start-1" />
                    )}

                    {/* Colonne droite (desktop) */}
                    {!isLeft ? (
                      <div className="col-start-2 md:col-start-3 md:pl-8 lg:pl-12">
                        {card}
                      </div>
                    ) : (
                      <div className="hidden md:block md:col-start-3" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Github, ExternalLink, Network, Cpu } from "lucide-react";

interface TimelineItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  tags: string[];
  category: "Accreditation" | "Engineering" | "Leadership";
  githubUrl?: string;
  liveUrl?: string;
  stats?: { label: string; value: string }[];
}

export default function NeuralTimeline() {
  const timelineData: TimelineItem[] = [
    {
      id: "hack-3",
      title: "1st Place Youth Computing",
      subtitle: "National Coding Challenge",
      description: "Won first place in the intensive hackathon hosted by Youth Computing Fianarantsoa, solving complex algorithmic problems.",
      date: "2026",
      tags: ["Algorithms", "Problem Solving"],
      category: "Engineering",
      githubUrl: "https://github.com/sitraknyaina",
      stats: [
        { label: "Rank", value: "#1 / 22" },
        { label: "Execution Score", value: "98/100" },
      ],
    },
    {
      id: "hack-2",
      title: "1st Place DevFest",
      subtitle: "GDG Antananarivo Hackathon",
      description: "Secured the championship title at DevFest Antananarivo. Designed and built a highly scalable solution following modern cloud practices.",
      date: "2025",
      tags: ["React 19", "Cloud Integration"],
      category: "Engineering",
      githubUrl: "https://github.com/sitraknyaina",
      liveUrl: "https://google.com",
      stats: [
        { label: "Position", value: "Grand Winner" },
        { label: "Time", value: "24 Hours" },
      ],
    },
    {
      id: "hack-1",
      title: "1st Place DevHunt 5.0",
      subtitle: "ENI Fianarantsoa Hackathon",
      description: "Ranked 1st by developing a full-stack web application tailored to real-world deployment constraints during the flagship ENI event.",
      date: "2025",
      tags: ["Full-Stack", "Architecture"],
      category: "Engineering",
      githubUrl: "https://github.com/sitraknyaina",
      stats: [
        { label: "Rank", value: "First Place" },
        { label: "Team Size", value: "4 Devs" },
      ],
    },
    {
      id: "time-1",
      title: "Python Data Exploration",
      subtitle: "Orange Digital Center",
      description: "Intensive program focused on data engineering pipelines, advanced statistical exploration, and data cleansing architectures.",
      date: "2024",
      tags: ["Python", "Data Pipelines"],
      category: "Accreditation",
      stats: [
        { label: "Data Parsed", value: "1.2M+ Rows" },
        { label: "Completion", value: "100%" },
      ],
    }
  ];

  // --- LOGIQUE DE ROTATION 3D (FRAMER MOTION) ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Lissage physique des mouvements pour un effet "Orbit"
  const smoothX = useSpring(x, { damping: 20, stiffness: 60 });
  const smoothY = useSpring(y, { damping: 20, stiffness: 60 });

  // Mapping des coordonnées de la souris vers des angles de rotation (Max +/- 35 degrés)
  const rotateX = useTransform(smoothY, [-800, 800], [35, -35]);
  const rotateY = useTransform(smoothX, [-800, 800], [-35, 35]);

  const handlePointerMove = (e: React.PointerEvent) => {
    // Rotation active uniquement si l'utilisateur maintient le clic (Drag)
    if (e.buttons !== 1) return;
    x.set(x.get() + e.movementX);
    y.set(y.get() + e.movementY);
  };

  const resetRotation = () => {
    x.set(0);
    y.set(0);
  };

  // --- ARCHITECTURE DU RÉSEAU (Positions & Connexions) ---
  // Distribution des 4 cartes sous forme de constellation / graphe
  const layoutPositions = [
    { left: "25%", top: "20%" }, // Noeud 0 : Haut Gauche
    { left: "75%", top: "30%" }, // Noeud 1 : Haut Droit
    { left: "20%", top: "75%" }, // Noeud 2 : Bas Gauche
    { left: "80%", top: "85%" }, // Noeud 3 : Bas Droit
  ];

  const networkNodes = timelineData.map((item, index) => ({
    ...item,
    ...layoutPositions[index],
  }));

  // Paires d'indices pour dessiner les lignes synaptiques entre les noeuds
  const edges = [
    [0, 1], // Haut-gauche vers Haut-droit
    [0, 2], // Haut-gauche vers Bas-gauche
    [1, 3], // Haut-droit vers Bas-droit
    [2, 3], // Bas-gauche vers Bas-droit
    [1, 2], // Connexion croisée au centre
  ];

  return (
    <section className="py-24 bg-[#06070b] relative overflow-hidden min-h-[900px] flex flex-col select-none">
      
      {/* Styles injectés pour l'animation de flux de données (Data Flow) sur le réseau */}
      <style>{`
        @keyframes dataFlow {
          from { stroke-dashoffset: 24; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>

      {/* Halo de fond */}
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-teal-500/5 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      {/* En-tête de la section */}
      <div className="relative z-20 flex flex-col items-center text-center gap-2 mb-10 pointer-events-none">
        {/* <div className="flex items-center gap-2 text-teal-400 font-mono text-sm animate-pulse bg-teal-950/30 px-4 py-1.5 rounded border border-teal-500/20">
          <Network className="w-4 h-4" />
          <span>INTERACTIVE_NEURAL_GRAPH</span>
        </div> */}
        <h2 className="text-3xl md:text-4xl font-sans font-bold text-white tracking-tight mt-2">
          Exploits & Formations
        </h2>
        <p className="text-xs font-mono text-slate-500 max-w-xl mt-2 tracking-widest uppercase">
          {/* [ Click & Drag anywhere to rotate the network in 3D ] */}
        </p>
      </div>

      {/* CONTENEUR 3D INTERACTIF */}
      <div 
        style={{ perspective: "1500px" }}
        className="relative w-full max-w-6xl mx-auto flex-1 cursor-grab active:cursor-grabbing z-10"
        onPointerMove={handlePointerMove}
        onDoubleClick={resetRotation}
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative w-full h-full min-h-[600px] origin-center"
        >
          {/* COUCHE 1 : Les Connexions (SVG en arrière plan 3D) */}
          <div className="absolute inset-0 pointer-events-none" style={{ transform: "translateZ(0px)" }}>
            <svg className="w-full h-full overflow-visible">
              {/* <defs> */}
                {/* <linearGradient id="synapseGradient" x1="0%" y1="0%" x2="100%" y2="100%"> */}
                  {/* <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.8" /> Teal */}
                  {/* <stop offset="100%" stopColor="#6366f1" stopOpacity="0.4" /> Indigo */}
                {/* </linearGradient> */}
              {/* </defs> */}
              
              {edges.map(([i, j], idx) => (
                <line
                  key={idx}
                  x1={networkNodes[i].left}
                  y1={networkNodes[i].top}
                  x2={networkNodes[j].left}
                  y2={networkNodes[j].top}
                  stroke="url(#synapseGradient)"
                  strokeWidth="2"
                  strokeDasharray="8 8"
                  className="animate-[dataFlow_1s_linear_infinite]"
                />
              ))}
            </svg>
          </div>

          {/* COUCHE 2 : Les Noeuds de données (Cartes en lévitation 3D) */}
          {networkNodes.map((node) => (
            <motion.div
              key={node.id}
              initial={{ x: "-50%", y: "-50%", z: 80 }} // Décalage Z pour sortir de l'écran
              whileHover={{ scale: 1.05, z: 120 }}      // Effet de survol qui pousse la carte vers l'utilisateur
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ left: node.left, top: node.top }}
              className="absolute w-[300px] md:w-[340px] group"
            >
              {/* Le design de la carte, adapté pour être plus compact dans un réseau */}
              <div className="relative bg-[#090b11]/80 backdrop-blur-md border border-teal-500/20 p-5 rounded-xl shadow-[0_0_20px_rgba(20,184,166,0.1)] group-hover:border-teal-400/80 group-hover:shadow-[0_0_35px_rgba(20,184,166,0.3)] transition-all duration-300">
                
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-[10px] text-teal-400 font-mono font-bold tracking-wide">
                    {node.category}
                  </span>
                  
                  <div className="flex gap-3 text-slate-500">
                    {node.githubUrl && (
                      <a href={node.githubUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {node.liveUrl && (
                      <a href={node.liveUrl} target="_blank" rel="noreferrer" className="hover:text-teal-400 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3 mb-2">
                  <Cpu className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-white font-bold text-sm leading-tight group-hover:text-teal-300 transition-colors">
                      {node.title}
                    </h3>
                    <p className="text-teal-400/80 text-[11px] font-mono mt-1">{node.subtitle}</p>
                  </div>
                </div>

                <p className="text-slate-400 text-[11px] leading-relaxed mt-3 border-l-2 border-slate-800 pl-3">
                  {node.description}
                </p>

                {node.stats && (
                  <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-800/80 font-mono">
                    {node.stats.map(stat => (
                      <div key={stat.label}>
                        <div className="text-[9px] text-slate-500 uppercase">{stat.label}</div>
                        <div className="text-xs font-bold text-white mt-0.5">{stat.value}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
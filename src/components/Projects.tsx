import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import codeKidsImg from "../assets/images/codeKids.png";
import devfestImg from "../assets/images/devfest.png";
import dinImg from "../assets/images/din.png";
import fayzeImg from "../assets/images/fayze.png";
import izaaryoimg from "../assets/images/Capture d'écran 2026-07-15 124400.png";

import {
  Github,
  ExternalLink,
} from "lucide-react";
import { Project } from "../types";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<
    "All" | "Full-Stack" | "Frontend" | "Cloud & Security"
  >("All");

  const projectList: Project[] = [
    {
      id: "proj-1",
      title: "Code Kids",
      subtitle: "Educational Platform for Kids & Technology",
      description:
        "Developed during DevHunt 5.0 hackathon at ENI under the theme 'Kids and Technology', this project is an interactive platform designed to help pupils familiarize themselves with modern technology through a simple and engaging learning environment built with React, Express, and PostgreSQL.",
      tags: ["React", "TypeScript", "Express", "PostgreSQL", "Tailwind CSS"],
      category: "Full-Stack",
      imageUrl: codeKidsImg,
      githubUrl: "",
      liveUrl: "https://code-kids-lac.vercel.app/",
      stats: [
        { label: "Learning Engagement", value: "High" },
        { label: "Interactive Modules", value: "Multiple" },
      ],
    },
     {
      id: "proj-5",
      title: "Iza Ary O",
      subtitle: "Innovative Social Platform Concept",
      description:
        "Designed during the 24-hour internal hackathon at ENI Fianarantsoa, Iza Ary O is an innovative social platform that reimagines online interactions through engaging and original social experiences. The project is currently in the design and development phase, with the objective of building a modern, human-centered, and interactive platform.",
      tags: [
        "React",
        "Node.js",
        "Express",
        "PostgreSQL",
        "Socket.IO",
        "UI/UX Design"
      ],
      category: "Full-Stack",
      imageUrl: izaaryoimg,
      githubUrl: "",
      liveUrl: "https://vlog-iza-ary-o.vercel.app"
,
      stats: [
        { label: "Hackathon Duration", value: "24h" },
        { label: "Development Status", value: "In Progress" },
      ],
    },
    {
      id: "proj-2",
      title: "Safe AI",
      subtitle: "Safe AI Toolkit Platform",
      description:
        "Developed during DevFest Antananarivo under the theme 'Safe AI for Mankind', this project is a unified AI safety platform that integrates multiple tools such as toxicity detection (Detoxify), hallucination detection, and personal data cleaning. The application helps users interact safely with AI systems by analyzing and filtering generated content.",
      tags: ["React", "TypeScript", "AI Safety", "Detoxify"],
      category: "Full-Stack",
      imageUrl: devfestImg,
      githubUrl: "",
      liveUrl: "",
      stats: [
        { label: "AI Safety Tools", value: "3+" },
        { label: "Content Filtering Accuracy", value: "High" },
      ],
    },
    {
      id: "proj-3",
      title: "Internal Sales Management System",
      subtitle: "Enterprise Service Vente Management System",
      description:
        "Internship project developed at the Imprimerie Nationale Antananarivo for managing the Service Vente. The system acts as a centralized platform to handle sales operations, data tracking, and internal workflow management with efficient storage and processing using PostgreSQL.",
      tags: ["React.js", "Oracle 10g R2", "Spring Boot", "Vitest"],
      category: "Full-Stack",
      imageUrl: dinImg,
      githubUrl: "",
      liveUrl: "",
      stats: [
        { label: "Operational Efficiency", value: "Improved" },
        { label: "Data Processing", value: "Optimized" },
      ],
    },
    {
      id: "proj-4",
      title: "FAYZE – Smart City Companion App",
      subtitle: "Youth Computing Hackathon Project",
      description:
        "Developed during a Youth Computing Hackathon focused on Smart City solutions, FAYZE is a platform designed to help students in Fianarantsoa easily find accommodation, discover the best transport routes, and locate leisure and distraction spots. The goal is to improve urban accessibility and student daily life using technology.",
      tags: ["React", "TypeScript", "Tailwind CSS", "HTML5", "UX Design"],
      category: "Full-Stack",
      imageUrl: fayzeImg,
      githubUrl: "",
      liveUrl: "",
      stats: [
        { label: "Urban Accessibility", value: "Improved" },
        { label: "User Experience Score", value: "High" },
      ],
    },
    
  ];

  const categories = [
    "All",
    "Full-Stack",
    "Frontend",
    "Cloud & Security",
  ] as const;

  const filteredProjects =
    activeCategory === "All"
      ? projectList
      : projectList.filter((p) => p.category === activeCategory);

  return (
    <section
      id="projects"
      className="py-24 relative overflow-hidden"
    >
      {/* Upper ambient decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        {/* Header Title */}
        <div className="flex flex-col items-center text-center gap-3 mb-12">
          <span className="text-xs font-mono text-teal-400 uppercase tracking-widest">
            Production Pipeline
          </span>
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-white tracking-tight">
            Flagship Engineering Deployments
          </h2>
          <p className="text-sm font-sans text-slate-400 max-w-lg">
            A selective registry of architectures designed for production-level
            loads, complete with quantitative KPIs.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex flex-wrap justify-center p-1 rounded-xl bg-slate-950 border border-slate-900/80">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-lg text-xs font-mono font-medium transition-all duration-300 relative ${activeCategory === cat
                    ? "text-white"
                    : "text-slate-500 hover:text-slate-300"
                  }`}
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 rounded-lg bg-slate-900 border border-slate-800"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Filtered Projects Grid - MODIFIED TO 3 COLS ON LARGE SCREENS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group flex flex-col rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-900/10 border border-slate-800/80 hover:border-slate-700 hover:shadow-[0_10px_30px_rgba(9,10,15,0.8)] duration-300 transition-all overflow-hidden h-full"
              >
                {/* Image Screenshot container - MODIFIED ASPECT RATIO FOR COMPACTNESS */}
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-950 border-b border-slate-900">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-95 group-hover:scale-105 duration-500 transition-all"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  {/* Category overlay tags */}
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-slate-950/90 border border-slate-800 font-mono text-[9px] text-teal-400 font-semibold tracking-wider uppercase">
                    {project.category}
                  </span>
                </div>

                {/* Content Details - MODIFIED PADDING AND GAP */}
                <div className="p-5 md:p-6 flex flex-col justify-between flex-grow gap-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-[9px] uppercase font-mono tracking-widest text-slate-500">
                      {project.subtitle}
                    </span>
                    <h3 className="text-lg font-bold font-sans text-slate-200 group-hover:text-white transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs font-sans text-slate-400 leading-relaxed line-clamp-4 group-hover:line-clamp-none transition-all duration-300">
                      {project.description}
                    </p>
                  </div>

                  {/* Skills/Tags listed */}
                  <div className="flex flex-wrap gap-1 font-mono text-[9px]">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-slate-950 border border-slate-900 text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Quantitative Stats Grid - MODIFIED PADDING AND GAP */}
                  {project.stats && (
                    <div className="grid grid-cols-2 gap-3 border-t border-slate-900/80 pt-4 font-mono text-center">
                      {project.stats.map((stat) => (
                        <div
                          key={stat.label}
                          className="text-left bg-slate-950/40 border border-slate-900/60 p-2.5 rounded-lg"
                        >
                          <div className="text-[9px] text-slate-500 uppercase tracking-wider truncate">
                            {stat.label}
                          </div>
                          <div className="text-sm font-bold text-teal-400 mt-0.5">
                            {stat.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Project External Links - MODIFIED PADDING */}
                  <div className="flex items-center gap-4 border-t border-slate-900/80 pt-4">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium text-slate-400 hover:text-white transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      Code
                    </a>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium text-teal-400 hover:text-teal-300 transition-colors ml-auto"
                    >
                      Live Instance
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
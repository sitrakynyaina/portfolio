// App.tsx
import React, { useState, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import TimeLine from "./components/Timeline";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import CareerAssistant from "./components/CareerAssistant";
import Footer from "./components/Footer";
import AvatarRevealScene from "./components/AvatarRevealScene";
import EducationTimeline from "./components/EducationTimeline";

export default function App() {
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIsIntroComplete(true);
  }, []);

  return (
    <>
      <AnimatePresence>
        {!isIntroComplete && (
          
          <motion.div
            key="intro-loader"
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="fixed inset-0 z-50"
          >
            <AvatarRevealScene onComplete={handleIntroComplete} />
            
            <div className="absolute bottom-10 w-full text-center z-[60]">
               <button 
                 onClick={handleIntroComplete}
                 className="text-teal-500/50 hover:text-teal-400 uppercase tracking-widest text-xs font-mono"
               >
                 [ Skip Animation ]
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contenu principal */}
      {isIntroComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-[#090a0f] text-slate-100 font-sans selection:bg-teal-500/30 selection:text-teal-200 min-h-screen relative antialiased scroll-smooth"
        >
          <div className="absolute top-0 right-0 left-0 h-[600px] bg-gradient-to-b from-teal-500/5 via-transparent to-transparent pointer-events-none z-0" />
          <Navbar />
          <Hero />
          <About />
          <Projects />
          <EducationTimeline/>
          {/* <TimeLine /> */}
          <Skills />
          <Contact />
          <Footer />
          <CareerAssistant />
        </motion.div>
      )}
    </>
  );
}
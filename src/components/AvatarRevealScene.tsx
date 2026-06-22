import React, { useEffect } from "react";

export default function AvatarRevealScene({ onComplete }: { onComplete: () => void }) {

  useEffect(() => {
    // Simuler la durée de l'animation (5 secondes)
    const timer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="relative w-full h-screen bg-[#020617] flex items-center justify-center overflow-hidden">
      
      {/* Conteneur principal de l'avatar */}
      <div
        className="relative flex flex-col items-center"
        style={{
          // L'avatar prend son temps pour se révéler (3.5s d'animation fluide)
          animation: "avatarAppear 3.5s cubic-bezier(0.25, 1, 0.5, 1) forwards",
        }}
      >
        {/* Anneaux orbitaux (Orbite 1 - Vitesse moyenne) */}
        <div
          className="absolute inset-[-15px] rounded-full border-[1.5px] border-dashed border-cyan-400/30"
          style={{ animation: "spinSlow 14s linear infinite" }}
        />

        {/* Anneaux orbitaux (Orbite 2 - Vitesse majestueuse) */}
        <div
          className="absolute inset-[-30px] rounded-full border border-dashed border-indigo-500/20"
          style={{ animation: "spinSlow 22s linear infinite reverse" }}
        />

        {/* Halo lumineux de fond */}
        <div className="absolute w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />

        {/* Conteneur Avatar avec Gradient Border */}
        <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-teal-400 via-cyan-400 to-indigo-600 p-[3px] shadow-[0_0_50px_rgba(6,182,212,0.3),0_0_100px_rgba(99,102,241,0.2)]">
          <div className="w-full h-full rounded-full overflow-hidden bg-[#0a0f1e] border-[3px] border-[#0d1225]">
            <img
              src="/src/assets/images/fond.jpg"
              alt="Sitraky Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Particules flottantes */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
            style={{
              left: `${15 + Math.random() * 70}%`,
              top: `${15 + Math.random() * 70}%`,
              animation: `floatParticle ${4 + i * 0.3}s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}

        {/* Textes de présentation */}
        <div
          className="mt-10 text-center"
          style={{ 
            // Apparition progressive décalée, se terminant au climax des 5 secondes
            animation: "riseIn 2s cubic-bezier(0.16, 1, 0.3, 1) 1.5s both" 
          }}
        >
          <h3 className="text-[2.2rem] font-bold text-white tracking-tight m-0">
            Hi, I'm{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400">
              Sitraky Ny Aina
            </span>
          </h3>
          <p className="text-cyan-300/60 font-mono text-[0.85rem] tracking-[0.25em] uppercase mt-3">
            Creative Developer & Tech Explorer
          </p>
        </div>
      </div>

      {/* Animations CSS rééquilibrées pour le timing de 5s */}
      <style>{`
        @keyframes avatarAppear {
          from { opacity: 0; transform: scale(0.75) translateY(25px); filter: blur(4px); }
          to   { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
        }
        @keyframes riseIn {
          from { opacity: 0; transform: translateY(15px); filter: blur(2px); }
          to   { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes spinSlow {
          to { transform: rotate(360deg); }
        }
        @keyframes floatParticle {
          0%, 100% { opacity: 0; transform: translateY(0) scale(0.5); }
          50%      { opacity: 0.8; }
          100%     { opacity: 0; transform: translateY(-40px) scale(0); }
        }
      `}</style>
    </div>
  );
}
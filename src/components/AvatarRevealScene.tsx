import React, { useEffect } from "react";
import fond from "../assets/images/fond.jpg";

export default function AvatarRevealScene({ onComplete }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="relative w-full h-screen bg-[#040b1a] flex items-center justify-center overflow-hidden font-sans">
      
      {/* Conteneur principal */}
      <div
        className="relative flex flex-col items-center"
        style={{
          animation: "avatarAppear 3.5s cubic-bezier(0.25, 1, 0.5, 1) forwards",
        }}
      >
        {/* Anneaux orbitaux - style clean blanc/bleu */}
        <div
          className="absolute inset-[-20px] rounded-full border-[1px] border-solid border-white/20 shadow-[0_0_20px_rgba(59,130,246,0.2)]"
          style={{ animation: "spinSlow 14s linear infinite" }}
        />
        <div
          className="absolute inset-[-40px] rounded-full border-[1px] border-dashed border-blue-400/30"
          style={{ animation: "spinSlow 22s linear infinite reverse" }}
        />

        {/* Halo lumineux de fond */}
        <div className="absolute w-72 h-72 bg-blue-600/20 rounded-full blur-[80px]" />

        {/* Conteneur Avatar */}
        <div className="w-40 h-40 rounded-full bg-white/10 p-[2px] shadow-[0_0_50px_rgba(59,130,246,0.4)] backdrop-blur-sm z-10">
          <div className="w-full h-full rounded-full overflow-hidden bg-[#040b1a] border-[2px] border-white/30">
            <img
              src={fond}
              alt="Sitraky Avatar"
              className="w-full h-full object-cover mix-blend-luminosity"
            />
          </div>
        </div>

       

        {/* Textes de présentation - Typography Bold blanche */}
        <div
          className="mt-12 text-center z-10"
          style={{ 
            animation: "riseIn 2s cubic-bezier(0.16, 1, 0.3, 1) 1.5s both" 
          }}
        >
          <h3 className="text-4xl font-extrabold text-white tracking-tight m-0">
            Sitrakiniaina
          </h3>
          <p className="text-white/60 text-sm tracking-[0.1em] uppercase mt-2 font-medium">
            Full-stack Developer
          </p>
        </div>
      </div>

      <style>{`
        @keyframes avatarAppear {
          from { opacity: 0; transform: scale(0.8) translateY(30px); filter: blur(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
        }
        @keyframes riseIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spinSlow {
          to { transform: rotate(360deg); }
        }
        @keyframes floatParticle {
          0%, 100% { opacity: 0; transform: translateY(0) scale(0.5); }
          50%      { opacity: 0.6; }
          100%     { opacity: 0; transform: translateY(-50px) scale(0); }
        }
      `}</style>
    </div>
  );
}
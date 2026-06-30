"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();

  return (
    <main className="relative w-full min-h-screen overflow-hidden flex flex-col justify-between p-8 text-white font-sans">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 scale-105 transition-transform duration-10000 ease-out"
        style={{ backgroundImage: `url('/onboarding_bg.png')` }}
      />
      <div className="absolute inset-0 bg-black/65 z-10" />

      {/* Glow effects */}
      <div className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[130px] pointer-events-none z-15" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[450px] h-[450px] rounded-full bg-pink-500/10 blur-[120px] pointer-events-none z-15" />

      {/* 1. Branding Header */}
      <div className="w-full flex justify-center mt-6 relative z-20">
        <h1 className="text-4xl font-extrabold tracking-widest text-white select-none">
          <span className="text-purple-400 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">S</span>try
        </h1>
      </div>

      {/* Content wrapper grouped at the bottom for thumb-friendly reach */}
      <div className="w-full max-w-md mx-auto flex flex-col gap-8 relative z-20 mt-auto">
        
        {/* 2. Headline Utama */}
        <div className="flex flex-col gap-3.5 pr-4">
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight text-white drop-shadow-md">
            Enhance Your Online <span className="text-purple-300 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-300 to-amber-300">Learning</span> Experience
          </h2>
          <p className="text-sm text-white/70 leading-relaxed max-w-xs">
            Temukan cara paling konsisten dan menyenangkan untuk menguasai keterampilan baru setiap hari.
          </p>
        </div>

        {/* 3. Bottom Controls (Modern UI) */}
        <div className="w-full bg-white/10 backdrop-blur-md border border-white/10 rounded-full p-2 pl-6 flex items-center justify-between shadow-2xl mb-4">
          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            <span className="w-6 h-2 rounded-full bg-purple-400 transition-all duration-300" />
            <span className="w-2 h-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors cursor-pointer" />
            <span className="w-2 h-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors cursor-pointer" />
          </div>

          {/* Get Start Button */}
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full py-3 px-6 text-sm font-bold text-white shadow-lg transition-all duration-300 ease-in-out active:scale-95 cursor-pointer border border-white/10"
          >
            Get Started
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </main>
  );
}

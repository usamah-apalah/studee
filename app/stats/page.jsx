"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  GraduationCap, 
  FlaskConical, 
  Code, 
  Globe, 
  Award, 
  TrendingUp, 
  Flame,
  ChevronLeft
} from "lucide-react";
import { useStreak } from "../../lib/StreakContext";
import { motion } from "framer-motion";

export default function StatsPage() {
  const router = useRouter();
  const { streakData, totalStreak } = useStreak();

  const subjects = [
    {
      id: "mtk",
      name: "Matematika (MTK)",
      level: "Intermediate",
      progress: 80,
      color: "from-amber-400 to-orange-500",
    },
    {
      id: "science",
      name: "Science (IPA)",
      level: "Advanced",
      progress: 65,
      color: "from-teal-400 to-emerald-500",
    },
    {
      id: "coding",
      name: "Coding & Algoritma",
      level: "Beginner to Pro",
      progress: 92,
      color: "from-purple-400 to-pink-500",
    },
    {
      id: "english",
      name: "Bahasa Inggris",
      level: "Beginner",
      progress: 45,
      color: "from-blue-400 to-indigo-500",
    },
  ];

  // Calculate dynamic stats
  const totalMinutes = streakData
    .filter(day => day.active)
    .reduce((acc, day) => acc + (parseInt(day.min) || 0), 0);
  const activeDaysCount = streakData.filter(day => day.active).length;
  const avgMinutes = activeDaysCount > 0 ? Math.round(totalMinutes / activeDaysCount) : 0;
  const completionPercent = Math.round((activeDaysCount / 7) * 100);

  const renderWeeklyStreakCalendar = () => {
    return (
      <div className="bg-black/25 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 shadow-2xl relative overflow-hidden flex flex-col gap-6 w-full animate-fade-in">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500 to-indigo-500 opacity-10 blur-3xl pointer-events-none" />
        
        {/* Header (Top Bar) */}
        <div className="flex justify-between items-start w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-300">
              <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <h4 className="text-[13px] font-bold text-white tracking-tight leading-tight">Belajar minimal 30 menit hari ini</h4>
              <span className="text-[10px] text-white/40 font-medium mt-0.5">7 hari terakhir</span>
            </div>
          </div>
          
          <button className="text-white/40 hover:text-white/70 transition-colors p-1" onClick={() => alert("Pengaturan Streak")}>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 10a2 2 0 11-2 2 2 2 0 012-2zm6 0a2 2 0 11-2 2 2 2 0 012-2zM6 10a2 2 0 11-2 2 2 2 0 012-2z" />
            </svg>
          </button>
        </div>

        {/* Sub-Header text */}
        <div className="text-[10px] text-white/55 font-medium -mt-2">
          Progres Mingguan: <span className="text-white font-bold">{activeDaysCount} dari 7 hari selesai</span> ({completionPercent}%)
        </div>

        {/* Days Row */}
        <div className="flex justify-between items-center w-full gap-1 mt-1">
          {streakData.map((day, idx) => (
            <div key={idx} className="flex flex-col items-center gap-3 flex-1">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-all ${
                day.isToday 
                  ? "bg-white/10 border border-white/10 text-white" 
                  : "text-white/40"
              }`}>
                {day.name}
              </span>
              
              <div className="relative">
                {day.isToday && (
                  <svg className="absolute inset-0 w-9 h-9 -rotate-90 pointer-events-none z-10">
                    <circle cx="18" cy="18" r="16" className="stroke-white/10 fill-none" strokeWidth="1.5" />
                    <motion.circle 
                      cx="18" 
                      cy="18" 
                      r="16" 
                      className="stroke-white fill-none" 
                      strokeWidth="2.5" 
                      strokeDasharray="100"
                      initial={{ strokeDashoffset: 100 }}
                      animate={{ strokeDashoffset: day.active ? 0 : 50 }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </svg>
                )}

                <motion.div 
                  initial={day.active ? { scale: 0.9, opacity: 0.8 } : false}
                  animate={day.active ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 0.6 }}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                    day.active 
                      ? "bg-white/10 border border-white/5 text-orange-500 shadow-inner" 
                      : "bg-white/5 border border-white/5 text-white/10"
                  }`}
                >
                  <Flame className={`w-4 h-4 ${day.active ? "text-orange-500 fill-orange-500" : "text-white/20"}`} />
                </motion.div>
              </div>

              <span className={`text-[10px] font-semibold ${day.isToday ? "text-white" : "text-white/40"}`}>
                {day.active ? day.min.replace("m", "") : "-"}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom Summary (Unified Pill Capsule) */}
        <div className="bg-white/5 border border-white/10 rounded-full py-3.5 px-6 flex items-center justify-between mt-2 shadow-inner">
          <div className="flex flex-col flex-1 pl-2">
            <span className="text-[15px] font-bold text-white tracking-tight leading-none">{totalMinutes} min</span>
            <span className="text-[9px] text-white/40 uppercase tracking-wider font-semibold mt-1 block">Total Belajar</span>
          </div>
          
          <div className="h-7 border-l border-white/10 mx-2" />
          
          <div className="flex flex-col flex-1 pl-6">
            <span className="text-[15px] font-bold text-white tracking-tight leading-none">{avgMinutes}m / day</span>
            <span className="text-[9px] text-white/40 uppercase tracking-wider font-semibold mt-1 block">Rata-rata Harian</span>
          </div>

          <div className="relative w-10 h-10 flex items-center justify-center bg-white/5 rounded-full border border-white/10 shadow-inner flex-shrink-0">
            <svg className="absolute inset-0 w-10 h-10 -rotate-90 pointer-events-none">
              <circle cx="20" cy="20" r="16" className="stroke-white/5 fill-none" strokeWidth="2" />
              <circle 
                cx="20" 
                cy="20" 
                r="16" 
                className="stroke-orange-500 fill-none" 
                strokeWidth="2.5" 
                strokeDasharray="100" 
                strokeDashoffset={100 - completionPercent} 
              />
            </svg>
            <Flame className="w-4.5 h-4.5 text-orange-500 fill-orange-500 animate-pulse" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen pb-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white font-sans relative overflow-hidden flex flex-col items-center">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-500/20 blur-[130px] pointer-events-none" />

      <div className="max-w-md w-full px-6 pt-6 flex flex-col gap-6 relative z-10">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between w-full">
          <button
            onClick={() => router.push("/")}
            className="w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl flex items-center justify-center text-white transition-all cursor-pointer shadow-md active:scale-95"
            aria-label="Back"
          >
            <ChevronLeft className="w-5 h-5 text-white/90" />
          </button>
          
          <span className="text-sm font-bold tracking-wider text-white/90">My Journey</span>
          
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Streak Calendar (Kartu Utama) */}
        {renderWeeklyStreakCalendar()}
        
        {/* Stats Summary (Row) */}
        <div className="grid grid-cols-2 gap-4 w-full">
          {/* Card 1: Total Belajar */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-5 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[110px] hover:scale-[1.01] transition-all">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-500 opacity-5 blur-xl pointer-events-none" />
            <div className="flex justify-between items-start w-full">
              <span className="text-[10px] text-white/50 font-bold uppercase tracking-wider">Total Belajar</span>
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
            </div>
            <div className="mt-4">
              <span className="text-2xl font-black text-white">{totalMinutes} min</span>
              <span className="text-[10px] text-white/40 block mt-0.5">Minggu ini</span>
            </div>
          </div>
          
          {/* Card 2: Rata-rata Harian */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-5 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[110px] hover:scale-[1.01] transition-all">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-500 opacity-5 blur-xl pointer-events-none" />
            <div className="flex justify-between items-start w-full">
              <span className="text-[10px] text-white/50 font-bold uppercase tracking-wider">Rata-rata Harian</span>
              <div className="relative w-5 h-5 flex items-center justify-center bg-white/5 rounded-full border border-white/10 flex-shrink-0">
                <svg className="absolute inset-0 w-5 h-5 -rotate-90 pointer-events-none">
                  <circle cx="10" cy="10" r="8" className="stroke-white/5 fill-none" strokeWidth="1.5" />
                  <circle cx="10" cy="10" r="8" className="stroke-emerald-400 fill-none" strokeWidth="2" strokeDasharray="50" strokeDashoffset="12" />
                </svg>
                <span className="text-[8px] text-emerald-400 font-bold">%</span>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-2xl font-black text-emerald-400">{avgMinutes}m / day</span>
              <span className="text-[10px] text-white/40 block mt-0.5">Konsistensi: 85%</span>
            </div>
          </div>
        </div>

        {/* Course Progress List */}
        <div className="flex flex-col gap-3.5 w-full">
          <h3 className="text-xs font-bold uppercase tracking-wider text-purple-300">Course Progress</h3>
          
          <div className="grid grid-cols-2 gap-4">
            {subjects.map((subj) => (
              <div 
                key={subj.id}
                onClick={() => router.push(`/lesson/${subj.id}`)}
                className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-5 flex flex-col justify-between aspect-square hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 shadow-xl cursor-pointer"
              >
                {/* Top: Icon */}
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${subj.color} flex items-center justify-center shadow-md flex-shrink-0`}>
                  {subj.id === "mtk" && <GraduationCap className="w-5 h-5 text-white" />}
                  {subj.id === "science" && <FlaskConical className="w-5 h-5 text-white" />}
                  {subj.id === "coding" && <Code className="w-5 h-5 text-white" />}
                  {subj.id === "english" && <Globe className="w-5 h-5 text-white" />}
                </div>
                
                {/* Middle: Course Name & Level */}
                <div className="flex flex-col min-w-0 mt-3 flex-grow justify-center">
                  <h4 className="font-bold text-white text-sm line-clamp-1 leading-tight">{subj.name}</h4>
                  <span className="text-[10px] text-white/40 font-semibold uppercase tracking-wider mt-1">{subj.level}</span>
                </div>
                
                {/* Bottom: Progress Bar & Percentage */}
                <div className="flex flex-col gap-1.5 w-full mt-2">
                  <div className="flex justify-between items-center w-full">
                    <span className="text-[10px] font-semibold text-white/40 uppercase tracking-wider">Progress</span>
                    <span className="text-xs font-bold text-white/95">{subj.progress}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden border border-white/5">
                    <div 
                      className={`h-full bg-gradient-to-r ${subj.color} rounded-full`}
                      style={{ width: `${subj.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  GraduationCap, 
  FlaskConical, 
  Code, 
  Globe, 
  ChevronLeft,
  BookOpen,
  Clock,
  Award
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const defaultSubjects = [
  {
    id: "mtk",
    name: "Matematika (MTK)",
    description: "Aljabar, Kalkulus, & Geometri",
    streak: 30,
    progress: 80,
    category: "Performance",
    color: "from-amber-400 to-orange-500",
    isFavorite: true,
    level: "Intermediate",
    duration: "12 Jam",
    hasCertificate: true,
  },
  {
    id: "science",
    name: "Science (IPA)",
    description: "Fisika Quantum & Biologi Sel",
    streak: 15,
    progress: 65,
    category: "Research",
    color: "from-teal-400 to-emerald-500",
    isFavorite: true,
    level: "Advanced",
    duration: "18 Jam",
    hasCertificate: true,
  },
  {
    id: "coding",
    name: "Coding & Algoritma",
    description: "Next.js, Python, & Struktur Data",
    streak: 45,
    progress: 92,
    category: "Performance",
    color: "from-purple-400 to-pink-500",
    isFavorite: false,
    level: "Beginner to Pro",
    duration: "24 Jam",
    hasCertificate: true,
  },
  {
    id: "english",
    name: "Bahasa Inggris",
    description: "Academic Writing & Speaking",
    streak: 8,
    progress: 45,
    category: "Favorite",
    color: "from-blue-400 to-indigo-500",
    isFavorite: true,
    level: "Beginner",
    duration: "8 Jam",
    hasCertificate: false,
  },
];

export default function LibraryPage() {
  const router = useRouter();
  const [subjects, setSubjects] = useState(defaultSubjects);
  const [visibleCount, setVisibleCount] = useState(2); // Show 2 subjects initially for Load More demonstration

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("stry_subjects");
      if (saved) {
        try {
          setSubjects(JSON.parse(saved));
        } catch (e) {
          console.error("Error loading subjects from localStorage", e);
        }
      }
    }
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 2, subjects.length));
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen pb-32 bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white font-sans relative overflow-hidden"
    >
      {/* Decorative Blur Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-500/20 blur-[130px] pointer-events-none" />

      <div className="max-w-md mx-auto px-6 pt-12 md:pt-16 flex flex-col gap-6 relative z-10">
        {/* Header Navigation */}
        <div className="flex items-center justify-between w-full">
          <button
            onClick={() => router.push("/")}
            className="w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer active:scale-95"
            title="Kembali"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
            <BookOpen className="w-4 h-4 text-purple-400" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/85">Course Library</span>
          </div>
          <div className="w-10 h-10 opacity-0 pointer-events-none" />
        </div>

        {/* Title */}
        <div className="flex flex-col gap-1 mt-2">
          <h2 className="text-2xl font-black text-white tracking-tight">Daftar Pelajaran</h2>
          <p className="text-xs text-white/55 font-medium leading-relaxed">
            Jelajahi seluruh koleksi pelajaran dan silabus unggulan kami untuk menunjang journey belajar Anda.
          </p>
        </div>

        {/* Library Grid */}
        <div className="grid grid-cols-2 gap-4 w-full mt-2">
          <AnimatePresence>
            {subjects.slice(0, visibleCount).map((subj) => (
              <motion.div
                key={subj.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                onClick={() => router.push(`/lesson/${subj.id}`)}
                className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-5 flex flex-col justify-between aspect-square hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 shadow-xl cursor-pointer group relative overflow-hidden"
              >
                {/* Visual Orb Overlay */}
                <div className={`absolute top-0 right-0 w-16 h-16 rounded-full bg-gradient-to-br ${subj.color} opacity-5 blur-xl pointer-events-none group-hover:opacity-10 transition-opacity`} />
                
                {/* Top: Icon */}
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${subj.color} flex items-center justify-center shadow-md flex-shrink-0`}>
                  {subj.id === "mtk" && <GraduationCap className="w-5 h-5 text-white" />}
                  {subj.id === "science" && <FlaskConical className="w-5 h-5 text-white" />}
                  {subj.id === "coding" && <Code className="w-5 h-5 text-white" />}
                  {subj.id === "english" && <Globe className="w-5 h-5 text-white" />}
                </div>

                {/* Middle: Course Name & Category */}
                <div className="flex flex-col min-w-0 mt-3 flex-grow justify-center">
                  <h4 className="font-bold text-white text-xs sm:text-sm line-clamp-2 leading-tight group-hover:text-purple-300 transition-colors">
                    {subj.name}
                  </h4>
                  <span className="text-[9px] text-white/30 font-semibold uppercase tracking-wider mt-1">
                    {subj.level}
                  </span>
                </div>

                {/* Bottom: Specs (Duration & Certificate) */}
                <div className="flex items-center justify-between w-full mt-2 pt-2 border-t border-white/5 text-[9px] text-white/50 font-medium">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-purple-400" />
                    <span>{subj.duration}</span>
                  </div>
                  {subj.hasCertificate && (
                    <div className="flex items-center gap-1" title="Sertifikat Tersedia">
                      <Award className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Cert</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More Button */}
        {visibleCount < subjects.length && (
          <div className="flex justify-center w-full mt-4">
            <button
              onClick={handleLoadMore}
              className="bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl py-3 px-6 text-xs font-bold text-white transition-all active:scale-95 cursor-pointer shadow-md"
            >
              Lihat Lebih Banyak
            </button>
          </div>
        )}
      </div>
    </motion.main>
  );
}

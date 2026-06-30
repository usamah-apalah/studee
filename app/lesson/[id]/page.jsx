"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  ChevronLeft, 
  Share2, 
  Bookmark, 
  BookOpen, 
  Clock, 
  HelpCircle, 
  Code, 
  Globe, 
  FlaskConical,
  GraduationCap
} from "lucide-react";
import LessonItem from "./LessonItem";
import { useStreak } from "../../../lib/StreakContext";

const lessonsData = {
  mtk: {
    id: "mtk",
    name: "Matematika (MTK)",
    level: "Intermediate",
    description: "Kuasai konsep-konsep matematika esensial mulai dari Aljabar Linear, Kalkulus Integral, hingga Teori Probabilitas dengan visualisasi interaktif.",
    color: "from-amber-400 to-orange-500",
    lessonsCount: 16,
    quizzesCount: 8,
    hoursCount: 12,
    iconType: "mtk",
    syllabus: [
      { title: "Pengenalan Aljabar Linear", duration: "45 Menit" },
      { title: "Matriks & Transformasi Ruang", duration: "60 Menit" },
      { title: "Kalkulus: Turunan Pertama", duration: "50 Menit" },
      { title: "Kalkulus: Integral & Luas Daerah", duration: "75 Menit" },
      { title: "Probabilitas Dasar & Distribusi", duration: "90 Menit" },
    ],
  },
  science: {
    id: "science",
    name: "Science (IPA)",
    level: "Advanced",
    description: "Pelajari rahasia alam semesta melalui Fisika Quantum tingkat lanjut, Termodinamika, serta struktur biologi mikro pada sel hidup.",
    color: "from-teal-400 to-emerald-500",
    lessonsCount: 22,
    quizzesCount: 10,
    hoursCount: 18,
    iconType: "science",
    syllabus: [
      { title: "Dasar Fisika Quantum", duration: "60 Menit" },
      { title: "Dualisme Gelombang Partikel", duration: "75 Menit" },
      { title: "Struktur & Fungsi Sel Eukariotik", duration: "55 Menit" },
      { title: "Sintesis Protein & Asam Nukleat", duration: "80 Menit" },
      { title: "Termodinamika Sistem Tertutup", duration: "90 Menit" },
    ],
  },
  coding: {
    id: "coding",
    name: "Coding & Algoritma",
    level: "Beginner to Pro",
    description: "Bangun aplikasi modern menggunakan Next.js dan Python. Pelajari Struktur Data dasar, Algoritma Rekursif, dan optimasi performa backend.",
    color: "from-purple-400 to-pink-500",
    lessonsCount: 28,
    quizzesCount: 14,
    hoursCount: 24,
    iconType: "coding",
    syllabus: [
      { title: "Pengenalan Struktur Data & Array", duration: "30 Menit" },
      { title: "Algoritma Rekursi & Dynamic Programming", duration: "90 Menit" },
      { title: "Pengenalan Routing Dinamis Next.js", duration: "45 Menit" },
      { title: "Manajemen State dengan React Hooks", duration: "60 Menit" },
      { title: "Deployment Aplikasi ke Vercel", duration: "40 Menit" },
    ],
  },
  english: {
    id: "english",
    name: "Bahasa Inggris",
    level: "Beginner",
    description: "Tingkatkan keterampilan komunikasi Anda melalui penulisan akademis (Academic Writing), tata bahasa (Grammar), serta praktik berbicara (Speaking).",
    color: "from-blue-400 to-indigo-500",
    lessonsCount: 12,
    quizzesCount: 6,
    hoursCount: 8,
    iconType: "english",
    syllabus: [
      { title: "Penyusunan Kalimat Akademik", duration: "45 Menit" },
      { title: "Penguasaan 16 Tenses Utama", duration: "90 Menit" },
      { title: "Teknik Presentasi & Public Speaking", duration: "60 Menit" },
      { title: "Percakapan Formal di Tempat Kerja", duration: "50 Menit" },
    ],
  },
};

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const { markAsCompleted } = useStreak();
  const id = params?.id;
  const lesson = lessonsData[id] || lessonsData.coding; // default to coding if invalid id

  const [isFavorited, setIsFavorited] = useState(false);
  const [showAllSyllabus, setShowAllSyllabus] = useState(false);

  // Simple count-up micro-interactions
  const [animatedLessons, setAnimatedLessons] = useState(0);
  const [animatedQuizzes, setAnimatedQuizzes] = useState(0);
  const [animatedHours, setAnimatedHours] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const duration = 1000;
    
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      setAnimatedLessons(Math.floor(progress * lesson.lessonsCount));
      setAnimatedQuizzes(Math.floor(progress * lesson.quizzesCount));
      setAnimatedHours(Math.floor(progress * lesson.hoursCount));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setAnimatedLessons(lesson.lessonsCount);
        setAnimatedQuizzes(lesson.quizzesCount);
        setAnimatedHours(lesson.hoursCount);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [lesson]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: lesson.name,
        text: lesson.description,
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert("Link pembelajaran berhasil disalin ke clipboard!");
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <main className="min-h-screen pb-32 bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white font-sans relative overflow-hidden flex flex-col items-center">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-500/20 blur-[130px] pointer-events-none" />
      <div className="absolute top-[30%] right-[10%] w-[300px] h-[300px] rounded-full bg-pink-500/10 blur-[100px] pointer-events-none" />

      <div className="max-w-md w-full px-6 pt-6 flex flex-col gap-6 relative z-10">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between w-full">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl flex items-center justify-center text-white transition-all cursor-pointer shadow-md active:scale-95"
            aria-label="Back"
          >
            <ChevronLeft className="w-5 h-5 text-white/90" />
          </button>
          
          <span className="text-sm font-bold tracking-wider text-white/90">Detail Pelajaran</span>
          
          <button
            onClick={handleShare}
            className="w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl flex items-center justify-center text-white transition-all cursor-pointer shadow-md active:scale-95"
            aria-label="Share"
          >
            <Share2 className="w-5 h-5 text-white/90" />
          </button>
        </div>

        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mt-4">
          <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${lesson.color} flex items-center justify-center shadow-xl border border-white/20 mb-5 transform hover:rotate-6 transition-all duration-300`}>
            {lesson.iconType === "mtk" && <GraduationCap className="w-10 h-10 text-white" />}
            {lesson.iconType === "science" && <FlaskConical className="w-10 h-10 text-white" />}
            {lesson.iconType === "coding" && <Code className="w-10 h-10 text-white" />}
            {lesson.iconType === "english" && <Globe className="w-10 h-10 text-white" />}
          </div>
          
          <span className="px-3 py-1 bg-white/10 border border-white/15 text-[10px] font-extrabold uppercase tracking-widest rounded-full text-purple-300">
            {lesson.level}
          </span>
          
          <h1 className="text-3xl font-extrabold text-white mt-3 tracking-tight leading-tight">
            {lesson.name}
          </h1>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl py-3 px-4 shadow-lg text-center mt-2">
          <div>
            <span className="text-[10px] text-white/50 block font-semibold uppercase tracking-wider flex items-center justify-center gap-1">
              <BookOpen className="w-3 h-3" /> Lessons
            </span>
            <span className="text-lg font-bold text-white mt-0.5 block">{animatedLessons}</span>
          </div>
          <div className="border-l border-white/10">
            <span className="text-[10px] text-white/50 block font-semibold uppercase tracking-wider flex items-center justify-center gap-1">
              <HelpCircle className="w-3 h-3" /> Quizzes
            </span>
            <span className="text-lg font-bold text-purple-300 mt-0.5 block">{animatedQuizzes}</span>
          </div>
          <div className="border-l border-white/10">
            <span className="text-[10px] text-white/50 block font-semibold uppercase tracking-wider flex items-center justify-center gap-1">
              <Clock className="w-3 h-3" /> Hours
            </span>
            <span className="text-lg font-bold text-amber-400 mt-0.5 block">{animatedHours}h</span>
          </div>
        </div>

        {/* Deskripsi */}
        <div className="flex flex-col gap-2 mt-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-purple-300">TENTANG KELAS</h3>
          <p className="text-xs text-white/70 leading-relaxed">
            {lesson.description}
          </p>
        </div>

        {/* List Lessons / Syllabus */}
        <div className="flex flex-col gap-3 mt-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-purple-300">DAFTAR MATERI</h3>
          
          <div className="grid grid-cols-2 gap-4 w-full">
            {(showAllSyllabus ? lesson.syllabus : lesson.syllabus.slice(0, 4)).map((item, idx) => (
              <LessonItem 
                key={idx}
                title={item.title}
                index={idx + 1}
                duration={item.duration}
              />
            ))}
          </div>

          {lesson.syllabus.length > 4 && (
            <button
              onClick={() => setShowAllSyllabus(!showAllSyllabus)}
              className="mt-2 w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-xs font-bold text-white transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 backdrop-blur-xl"
            >
              {showAllSyllabus ? "Lihat Lebih Sedikit" : "Lihat Selengkapnya"}
            </button>
          )}
        </div>

      </div>

      {/* Sticky Action Button at the Bottom */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 max-w-md w-[calc(100%-2.5rem)] px-6 z-40 flex gap-3">
        <button
          onClick={() => {
            setIsFavorited(!isFavorited);
            alert(isFavorited ? "Dihapus dari Favorit!" : "Berhasil ditambah ke Favorit!");
          }}
          className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-300 ease-in-out cursor-pointer shadow-md active:scale-95 flex-shrink-0 ${
            isFavorited 
              ? "bg-amber-500/20 border-amber-500/40 text-amber-400" 
              : "bg-white/5 border-white/10 text-white/75 hover:bg-white/10 hover:border-white/15"
          }`}
          aria-label="Add to Favorites"
        >
          <Bookmark className={`w-5 h-5 ${isFavorited ? "fill-amber-400" : ""}`} />
        </button>

        <button
          onClick={() => {
            markAsCompleted();
            router.push("/");
          }}
          className={`flex-grow bg-gradient-to-r ${lesson.color} py-4 rounded-2xl text-center font-bold text-sm text-white shadow-2xl hover:scale-[1.02] active:scale-95 transition-all duration-300 ease-in-out cursor-pointer border border-white/10`}
        >
          START LESSONS
        </button>
      </div>
    </main>
  );
}

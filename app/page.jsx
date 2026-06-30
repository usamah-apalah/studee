"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  FlaskConical,
  Code,
  Globe,
  Award,
  Flame,
} from "lucide-react";
import { useStreak } from "../lib/StreakContext";
import { motion, AnimatePresence } from "framer-motion";
import "../lib/i18n";

function AnimatedNumber({ value, duration = 1200 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };
    window.requestAnimationFrame(step);
  }, [value, duration]);

  return <>{count}</>;
}

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
    syllabus: [
      { title: "Pengenalan Aljabar Linear", duration: "45 Menit" },
      { title: "Matriks & Transformasi Ruang", duration: "60 Menit" },
      { title: "Kalkulus: Turunan Pertama", duration: "50 Menit" },
      { title: "Kalkulus: Integral & Luas Daerah", duration: "75 Menit" },
      { title: "Probabilitas Dasar & Distribusi", duration: "90 Menit" },
    ],
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
    syllabus: [
      { title: "Fisika Quantum: Pengenalan Atom", duration: "60 Menit" },
      { title: "Biologi Sel: Pembelahan Mitosis", duration: "55 Menit" },
      { title: "Kimia Organik: Gugus Fungsi", duration: "70 Menit" },
    ],
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
    syllabus: [
      { title: "Dasar Next.js & App Router", duration: "80 Menit" },
      { title: "Dasar Python & Tipe Data", duration: "65 Menit" },
      { title: "Struktur Data Stack & Queue", duration: "90 Menit" },
    ],
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
    syllabus: [
      { title: "Academic Writing: Essay Structure", duration: "45 Menit" },
      { title: "Speaking: Conversational Fluency", duration: "50 Menit" },
    ],
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isChartDropdownOpen, setIsChartDropdownOpen] = useState(false);
  const [selectedChartSubject, setSelectedChartSubject] = useState("all");
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);
  const [showAllSubjects, setShowAllSubjects] = useState(false);
  const [expandedNotificationId, setExpandedNotificationId] = useState(null);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Materi Baru Ditambahkan!",
      message:
        "Admin baru saja mengunggah 'Dasar-Dasar Aljabar Linear'. Yuk mulai belajar!",
      date: "Baru saja",
      isRead: false,
    },
    {
      id: 2,
      title: "Streak Anda Dipertahankan",
      message:
        "Selamat! Hari ini Anda berhasil memperpanjang streak konsistensi belajar Anda.",
      date: "2 jam yang lalu",
      isRead: false,
    },
    {
      id: 3,
      title: "Lencana Emas Didapatkan",
      message:
        "Anda meraih lencana 'Streak Master' setelah belajar 30 hari berturut-turut.",
      date: "1 hari yang lalu",
      isRead: true,
    },
  ]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();
  const { streakData, totalStreak } = useStreak();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setTimeout(() => {
      setIsLoggedIn(loggedIn);
    }, 0);
  }, []);

  const [subjects, setSubjects] = useState(defaultSubjects);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("stry_subjects");
      if (saved) {
        try {
          setSubjects(JSON.parse(saved));
        } catch (e) {
          console.error("Error loading subjects from localStorage", e);
        }
      } else {
        localStorage.setItem("stry_subjects", JSON.stringify(defaultSubjects));
      }
    }
  }, []);

  // Deep live search filtering results matching: title, category, and syllabus sub-titles
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    const results = [];

    subjects.forEach((subj) => {
      const catMatch = subj.category?.toLowerCase().includes(query);
      const nameMatch =
        subj.name?.toLowerCase().includes(query) ||
        subj.title?.toLowerCase().includes(query);

      if (nameMatch || catMatch) {
        results.push({
          type: "subject",
          subjectId: subj.id,
          subjectName: subj.name,
          subjectColor: subj.color,
          title: subj.name,
          category: subj.category,
        });
      }

      const syllabusList = subj.syllabus || [];
      syllabusList.forEach((syl) => {
        if (syl.title?.toLowerCase().includes(query)) {
          results.push({
            type: "syllabus",
            subjectId: subj.id,
            subjectName: subj.name,
            subjectColor: subj.color,
            title: syl.title,
            category: subj.category,
            description: `Materi dari kelas: ${subj.name}`,
          });
        }
      });
    });

    return results;
  }, [searchQuery, subjects]);

  // Dynamically collect unique categories
  const categories = [
    "All",
    ...Array.from(new Set(subjects.map((s) => s.category).filter(Boolean))),
  ];

  // Filter logic
  const filteredSubjects = subjects.filter((subject) => {
    const matchesSearch =
      subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedFilter === "All") return matchesSearch;
    return matchesSearch && subject.category === selectedFilter;
  });

  // Calculate cumulative stats (now uses global totalStreak from useStreak)
  const totalMinutes = streakData
    .filter((day) => day.active)
    .reduce((acc, day) => acc + (parseInt(day.min) || 0), 0);
  const activeDaysCount = streakData.filter((day) => day.active).length;
  const avgMinutes =
    activeDaysCount > 0 ? Math.round(totalMinutes / activeDaysCount) : 0;

  // Data aktivitas belajar untuk grafik (dapat disesuaikan atau dihubungkan ke data asli)
  const chartData = [
    {
      id: "english",
      label: "Inggris",
      activity: 45,
      x: 40,
      color: "#3b82f6",
      activeColor: "text-blue-400",
      tooltipColor: "from-blue-500 to-indigo-500",
      borderTooltip: "border-blue-500/30",
      bgCaret: "bg-blue-500",
    },
    {
      id: "mtk",
      label: "Matematika",
      activity: 80,
      x: 120,
      color: "#fbbf24",
      activeColor: "text-amber-400",
      tooltipColor: "from-amber-500 to-orange-500",
      borderTooltip: "border-orange-500/30",
      bgCaret: "bg-orange-500",
    },
    {
      id: "science",
      label: "Science",
      activity: 60,
      x: 200,
      color: "#14b8a6",
      activeColor: "text-teal-400",
      tooltipColor: "from-teal-500 to-emerald-500",
      borderTooltip: "border-teal-500/30",
      bgCaret: "bg-teal-500",
    },
    {
      id: "coding",
      label: "Coding",
      activity: 95,
      x: 280,
      color: "#a855f7",
      activeColor: "text-purple-400",
      tooltipColor: "from-purple-600 to-indigo-600",
      borderTooltip: "border-purple-500/30",
      bgCaret: "bg-indigo-600",
    },
  ];

  const getChartY = (activityPercent) => {
    return 120 - (activityPercent / 100) * 105;
  };

  const renderActivityChart = (gradientId) => {
    const yInggris = getChartY(chartData[0].activity);
    const yMtk = getChartY(chartData[1].activity);
    const yScience = getChartY(chartData[2].activity);
    const yCoding = getChartY(chartData[3].activity);

    const pathD = `M 10 95 C 20 95, 30 ${yInggris}, 40 ${yInggris} C 70 ${yInggris}, 90 ${yMtk}, 120 ${yMtk} C 150 ${yMtk}, 170 ${yScience}, 200 ${yScience} C 230 ${yScience}, 255 ${yCoding}, 280 ${yCoding} C 300 ${yCoding}, 315 50, 330 50`;
    const fillD = `${pathD} L 330 120 L 10 120 Z`;

    return (
      <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        {/* Decorative glows */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-500 opacity-10 blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-6 gap-2 w-full">
          <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5 whitespace-nowrap">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z"
              />
            </svg>
            Aktivitas Belajar
          </h3>

          {/* Timeframe selector with interactive dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsChartDropdownOpen(!isChartDropdownOpen)}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl py-1 px-2.5 sm:py-1.5 sm:px-3 text-[10px] sm:text-xs text-white cursor-pointer transition-all select-none whitespace-nowrap"
            >
              <span>
                {selectedChartSubject === "all"
                  ? "Semua Mapel"
                  : selectedChartSubject === "mtk"
                    ? "Matematika"
                    : selectedChartSubject === "science"
                      ? "Science"
                      : selectedChartSubject === "coding"
                        ? "Coding"
                        : "Inggris"}
              </span>
              <svg
                className="w-3 h-3 text-white/60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isChartDropdownOpen && (
              <>
                {/* Invisible backdrop to close the dropdown on click outside */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsChartDropdownOpen(false)}
                />
                {/* Dropdown Menu (Glassmorphism) */}
                <div className="absolute right-0 mt-2 w-40 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl py-1.5 shadow-2xl z-20 overflow-hidden text-xs">
                  {[
                    { id: "all", label: "Semua Mapel" },
                    { id: "mtk", label: "Matematika" },
                    { id: "science", label: "Science" },
                    { id: "coding", label: "Coding" },
                    { id: "english", label: "Bahasa Inggris" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedChartSubject(item.id);
                        setIsChartDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-white/15 transition-colors cursor-pointer ${
                        selectedChartSubject === item.id
                          ? "text-purple-300 font-bold bg-white/15"
                          : "text-white/80"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Chart Area */}
        <div className="relative w-full h-[160px] mt-4 select-none">
          {/* Grid Lines & Y Axis Labels (aligned with Y-axis markers) */}
          <div className="absolute left-0 top-0 h-[120px] text-[9px] text-white/30 font-bold w-8 text-right pr-2">
            <span
              className="absolute right-2"
              style={{ top: "15px", transform: "translateY(-50%)" }}
            >
              100%
            </span>
            <span
              className="absolute right-2"
              style={{ top: "36px", transform: "translateY(-50%)" }}
            >
              80%
            </span>
            <span
              className="absolute right-2"
              style={{ top: "57px", transform: "translateY(-50%)" }}
            >
              60%
            </span>
            <span
              className="absolute right-2"
              style={{ top: "78px", transform: "translateY(-50%)" }}
            >
              40%
            </span>
            <span
              className="absolute right-2"
              style={{ top: "99px", transform: "translateY(-50%)" }}
            >
              20%
            </span>
            <span
              className="absolute right-2"
              style={{ top: "120px", transform: "translateY(-50%)" }}
            >
              0%
            </span>
          </div>

          {/* SVG Graph */}
          <div className="pl-8 w-full h-[120px]">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 340 120"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(168, 85, 247, 0.25)" />
                  <stop offset="100%" stopColor="rgba(168, 85, 247, 0)" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line
                x1="0"
                y1="15"
                x2="340"
                y2="15"
                stroke="rgba(255,255,255,0.06)"
                strokeDasharray="3 3"
              />
              <line
                x1="0"
                y1="36"
                x2="340"
                y2="36"
                stroke="rgba(255,255,255,0.06)"
                strokeDasharray="3 3"
              />
              <line
                x1="0"
                y1="57"
                x2="340"
                y2="57"
                stroke="rgba(255,255,255,0.06)"
                strokeDasharray="3 3"
              />
              <line
                x1="0"
                y1="78"
                x2="340"
                y2="78"
                stroke="rgba(255,255,255,0.06)"
                strokeDasharray="3 3"
              />
              <line
                x1="0"
                y1="99"
                x2="340"
                y2="99"
                stroke="rgba(255,255,255,0.06)"
                strokeDasharray="3 3"
              />
              <line
                x1="0"
                y1="120"
                x2="340"
                y2="120"
                stroke="rgba(255,255,255,0.12)"
              />

              {/* Peak vertical dashed lines */}
              {chartData.map((item) => {
                const isSelected =
                  selectedChartSubject === "all"
                    ? item.id === "coding" || item.id === "mtk"
                    : selectedChartSubject === item.id;
                const y = getChartY(item.activity);

                return (
                  isSelected && (
                    <line
                      key={item.id}
                      x1={item.x}
                      y1={y}
                      x2={item.x}
                      y2="120"
                      stroke={`${item.color}40`}
                      strokeDasharray="3 3"
                    />
                  )
                );
              })}

              {/* Gradient Area under curve */}
              <path d={fillD} fill={`url(#${gradientId})`} />

              {/* Main Wavy Line */}
              <path
                d={pathD}
                fill="none"
                stroke="rgba(168, 85, 247, 1)"
                strokeWidth="2.5"
              />

              {/* Glowing Dots based on selected subject */}
              {chartData.map((item) => {
                const isSelected =
                  selectedChartSubject === "all"
                    ? item.id === "coding" || item.id === "mtk"
                    : selectedChartSubject === item.id;
                const y = getChartY(item.activity);

                return isSelected ? (
                  <g key={item.id}>
                    <circle
                      cx={item.x}
                      cy={y}
                      r="4.5"
                      fill="white"
                      stroke={item.color}
                      strokeWidth="2.5"
                    />
                    {(selectedChartSubject === item.id ||
                      (selectedChartSubject === "all" &&
                        item.id === "coding")) && (
                      <circle
                        cx={item.x}
                        cy={y}
                        r="10"
                        fill={`${item.color}40`}
                        stroke="none"
                        className="animate-ping"
                      />
                    )}
                  </g>
                ) : (
                  <circle
                    key={item.id}
                    cx={item.x}
                    cy={y}
                    r="4"
                    fill="white"
                    opacity="0.8"
                  />
                );
              })}
            </svg>
          </div>

          {/* Floating Tooltip Cards */}
          {chartData.map((item) => {
            const isSelected =
              selectedChartSubject === "all"
                ? item.id === "coding" || item.id === "mtk"
                : selectedChartSubject === item.id;
            const y = getChartY(item.activity);
            const xPercent = (item.x / 340) * 100;

            return (
              isSelected && (
                <div
                  key={item.id}
                  className={`absolute bg-gradient-to-r ${item.tooltipColor} border ${item.borderTooltip} rounded-xl py-1 px-2 text-center shadow-xl pointer-events-none select-none transition-all duration-300`}
                  style={{
                    left: `calc(${xPercent}% + 8px)`,
                    transform: "translate(-50%, -36px)",
                    top: `${y}px`,
                  }}
                >
                  <p className="text-[9px] font-bold text-white leading-none">
                    {item.label}
                  </p>
                  <p className="text-[7px] text-white/80 font-semibold tracking-wide mt-0.5 uppercase">
                    Aktivitas: {item.activity}%
                  </p>
                  <div
                    className={`absolute w-2 h-2 ${item.bgCaret} rotate-45 left-1/2 -translate-x-1/2 -bottom-1 border-r border-b ${item.borderTooltip}`}
                  />
                </div>
              )
            );
          })}

          {/* X Axis Labels */}
          <div className="absolute left-8 right-0 bottom-0 text-[9px] text-white/30 font-bold h-4">
            {chartData.map((item) => {
              const isSelected =
                selectedChartSubject === "all"
                  ? item.id === "coding" || item.id === "mtk"
                  : selectedChartSubject === item.id;
              const xPercent = (item.x / 340) * 100;

              return (
                <span
                  key={item.id}
                  className={`absolute transition-all duration-300 ${
                    isSelected
                      ? `${item.activeColor} font-extrabold scale-110`
                      : ""
                  }`}
                  style={{
                    left: `${xPercent}%`,
                    transform: "translateX(-50%)",
                  }}
                >
                  {item.id === "english"
                    ? "ING"
                    : item.id === "mtk"
                      ? "MTK"
                      : item.id === "science"
                        ? "IPA"
                        : "Coding"}
                </span>
              );
            })}
          </div>
        </div>

        {/* Footer Stat Ringkasan */}
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-white/50 font-medium">
          <span>Rata-rata Konsistensi</span>
          <span className="text-emerald-400 font-bold">Sangat Baik (85%)</span>
        </div>
      </div>
    );
  };

  const renderWeeklyStreakCalendar = () => {
    const completionPercent = Math.round((activeDaysCount / 7) * 100);

    return (
      <div className="bg-black/25 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 shadow-2xl relative overflow-hidden flex flex-col gap-6 w-full">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500 to-indigo-500 opacity-10 blur-3xl pointer-events-none" />

        {/* Header (Top Bar) */}
        <div className="flex justify-between items-start w-full">
          <div className="flex items-center gap-3">
            {/* Target Heartbeat-style icon */}
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-300">
              <svg
                className="w-5 h-5 animate-pulse"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <h4 className="text-[13px] font-bold text-white tracking-tight leading-tight">
                Belajar minimal 30 menit hari ini
              </h4>
              <span className="text-[10px] text-white/40 font-medium mt-0.5">
                7 hari terakhir
              </span>
            </div>
          </div>

          {/* Settings Menu Button */}
          <button
            className="text-white/40 hover:text-white/70 transition-colors p-1"
            onClick={() => alert("Pengaturan Streak")}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 10a2 2 0 11-2 2 2 2 0 012-2zm6 0a2 2 0 11-2 2 2 2 0 012-2zM6 10a2 2 0 11-2 2 2 2 0 012-2z" />
            </svg>
          </button>
        </div>

        {/* Sub-Header text */}
        <div className="text-[10px] text-white/55 font-medium -mt-2">
          Progres Mingguan:{" "}
          <span className="text-white font-bold">
            {activeDaysCount} dari 7 hari selesai
          </span>{" "}
          ({completionPercent}%)
        </div>

        {/* Days Row */}
        <div className="flex justify-between items-center w-full gap-1 mt-1">
          {streakData.map((day, idx) => (
            <div key={idx} className="flex flex-col items-center gap-3 flex-1">
              {/* Day Name */}
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-all ${
                  day.isToday
                    ? "bg-white/10 border border-white/10 text-white"
                    : "text-white/40"
                }`}
              >
                {day.name}
              </span>

              {/* Circle Wrapper */}
              <div className="relative">
                {/* Circular Progress Ring for Today (Tue) */}
                {day.isToday && (
                  <svg className="absolute inset-0 w-9 h-9 -rotate-90 pointer-events-none z-10">
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      className="stroke-white/10 fill-none"
                      strokeWidth="1.5"
                    />
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

                {/* Day Circle Container */}
                <motion.div
                  initial={day.active ? { scale: 0.9, opacity: 0.8 } : false}
                  animate={
                    day.active
                      ? { scale: 1, opacity: 1 }
                      : { scale: 1, opacity: 0.6 }
                  }
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                    day.active
                      ? "bg-white/10 border border-white/5 text-orange-500 shadow-inner"
                      : "bg-white/5 border border-white/5 text-white/10"
                  }`}
                >
                  <Flame
                    className={`w-4 h-4 ${day.active ? "text-orange-500 fill-orange-500" : "text-white/20"}`}
                  />
                </motion.div>
              </div>

              {/* Progress Text */}
              <span
                className={`text-[10px] font-semibold ${day.isToday ? "text-white" : "text-white/40"}`}
              >
                {day.active ? day.min.replace("m", "") : "-"}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom Summary (Unified Pill Capsule) */}
        <div className="bg-white/5 border border-white/10 rounded-full py-3.5 px-6 flex items-center justify-between mt-2 shadow-inner">
          {/* Left Block */}
          <div className="flex flex-col flex-1 pl-2">
            <span className="text-[15px] font-bold text-white tracking-tight leading-none">
              {totalMinutes} min
            </span>
            <span className="text-[9px] text-white/40 uppercase tracking-wider font-semibold mt-1 block">
              Total Belajar
            </span>
          </div>

          {/* Vertical Divider */}
          <div className="h-7 border-l border-white/10 mx-2" />

          {/* Middle Block */}
          <div className="flex flex-col flex-1 pl-6">
            <span className="text-[15px] font-bold text-white tracking-tight leading-none">
              {avgMinutes}m / day
            </span>
            <span className="text-[9px] text-white/40 uppercase tracking-wider font-semibold mt-1 block">
              Rata-rata Harian
            </span>
          </div>

          {/* Right Indicator (Flame with circular progress ring) */}
          <div className="relative w-10 h-10 flex items-center justify-center bg-white/5 rounded-full border border-white/10 shadow-inner flex-shrink-0">
            <svg className="absolute inset-0 w-10 h-10 -rotate-90 pointer-events-none">
              <circle
                cx="20"
                cy="20"
                r="16"
                className="stroke-white/5 fill-none"
                strokeWidth="2"
              />
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
    <main className="min-h-screen pb-32 bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white font-sans relative overflow-hidden">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-500/20 blur-[130px] pointer-events-none" />
      <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full bg-pink-500/10 blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 pt-12 md:pt-16 flex flex-col gap-8 relative z-10">
        {/* Header Profil & Notifikasi */}
        <div className="flex items-center justify-between w-full">
          {/* Left: Small Profile Avatar */}
          <div
            onClick={() => {
              if (!isLoggedIn) {
                router.push("/login");
              } else {
                router.push("/profile");
              }
            }}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center border border-white/20 shadow-md flex-shrink-0 cursor-pointer hover:scale-105 active:scale-95 transition-all"
            title="Profil Saya"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>

          {/* Center Branding (Elegant font) */}
          <span className="text-2xl font-light tracking-widest text-white/95 select-none font-sans">
            S<span className="font-semibold text-purple-400">t</span>ry
          </span>

          {/* Right: Search & Notification Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full flex items-center justify-center text-white/90 transition-all cursor-pointer active:scale-95"
              title="Cari"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <button
              onClick={() => setIsNotificationOpen(true)}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full flex items-center justify-center text-white/90 transition-all cursor-pointer active:scale-95 relative"
              title="Notifikasi"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              {notifications.some((n) => !n.isRead) && (
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
              )}
            </button>
          </div>
        </div>

        {activeTab === "stats" ? (
          <div className="flex flex-col gap-6 w-full max-w-md mx-auto mt-2">
            {/* Header */}
            <div className="flex items-center justify-between w-full mb-1">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                My Journey
              </h2>
            </div>

            {/* Streak Calendar (Kartu Utama) */}
            {renderWeeklyStreakCalendar()}

            {/* Stats Summary (Row) */}
            <div className="grid grid-cols-2 gap-4 w-full">
              {/* Card 1: Total Belajar */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-5 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[110px] hover:scale-[1.01] transition-all">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-500 opacity-5 blur-xl pointer-events-none" />
                <div className="flex justify-between items-start w-full">
                  <span className="text-[10px] text-white/50 font-bold uppercase tracking-wider">
                    Total Belajar
                  </span>
                  <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                </div>
                <div className="mt-4">
                  <span className="text-2xl font-black text-white">
                    {totalMinutes} min
                  </span>
                  <span className="text-[10px] text-white/40 block mt-0.5">
                    Minggu ini
                  </span>
                </div>
              </div>

              {/* Card 2: Rata-rata Harian */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-5 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[110px] hover:scale-[1.01] transition-all">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-500 opacity-5 blur-xl pointer-events-none" />
                <div className="flex justify-between items-start w-full">
                  <span className="text-[10px] text-white/50 font-bold uppercase tracking-wider">
                    Rata-rata Harian
                  </span>
                  <div className="relative w-5 h-5 flex items-center justify-center bg-white/5 rounded-full border border-white/10 flex-shrink-0">
                    <svg className="absolute inset-0 w-5 h-5 -rotate-90 pointer-events-none">
                      <circle
                        cx="10"
                        cy="10"
                        r="8"
                        className="stroke-white/5 fill-none"
                        strokeWidth="1.5"
                      />
                      <circle
                        cx="10"
                        cy="10"
                        r="8"
                        className="stroke-emerald-400 fill-none"
                        strokeWidth="2"
                        strokeDasharray="50"
                        strokeDashoffset="12"
                      />
                    </svg>
                    <span className="text-[8px] text-emerald-400 font-bold">
                      %
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-2xl font-black text-emerald-400">
                    {avgMinutes}m / day
                  </span>
                  <span className="text-[10px] text-white/40 block mt-0.5">
                    Konsistensi: 85%
                  </span>
                </div>
              </div>
            </div>

            {/* Course Progress List */}
            <div className="flex flex-col gap-3.5 w-full">
              <h3 className="text-xs font-bold uppercase tracking-wider text-purple-300">
                Course Progress
              </h3>

              <div className="flex flex-col gap-3 w-full">
                {subjects.map((subj) => (
                  <div
                    key={subj.id}
                    onClick={() => router.push(`/lesson/${subj.id}`)}
                    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-4.5 shadow-xl relative overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:bg-white/8 active:scale-[0.99] flex items-center justify-between gap-4 cursor-pointer"
                  >
                    {/* Left: Icon & Info */}
                    <div className="flex items-center gap-3.5 flex-1 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${subj.color} flex items-center justify-center shadow-md flex-shrink-0`}
                      >
                        {subj.id === "mtk" && (
                          <GraduationCap className="w-5 h-5 text-white" />
                        )}
                        {subj.id === "science" && (
                          <FlaskConical className="w-5 h-5 text-white" />
                        )}
                        {subj.id === "coding" && (
                          <Code className="w-5 h-5 text-white" />
                        )}
                        {subj.id === "english" && (
                          <Globe className="w-5 h-5 text-white" />
                        )}
                      </div>

                      <div className="flex flex-col min-w-0 flex-1">
                        <h4 className="font-bold text-white text-sm line-clamp-1 leading-tight">
                          {subj.name}
                        </h4>
                        <span className="text-[10px] text-white/40 font-semibold uppercase tracking-wider mt-1">
                          {subj.level}
                        </span>
                      </div>
                    </div>

                    {/* Right: Progress bar & percentage */}
                    <div className="flex flex-col items-end gap-1.5 w-24">
                      <span className="text-xs font-bold text-white/95">
                        {subj.progress}%
                      </span>
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
        ) : activeTab === "profile" && isLoggedIn ? (
          <div className="flex flex-col gap-6 w-full max-w-md mx-auto mt-2">
            {/* Header Profil Saya & Hamburger Menu */}
            <div className="flex items-center justify-between w-full mb-1">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Profil Saya
              </h2>
              <button
                onClick={() => setIsProfileDrawerOpen(true)}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl flex items-center justify-center text-white transition-all cursor-pointer shadow-md active:scale-95"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
            {/* CARD 1: Profil Pengguna */}
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-xl relative overflow-hidden text-center">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 opacity-10 blur-2xl pointer-events-none" />

              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20 shadow-md">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">
                Pengguna Konsisten
              </h2>
              <p className="text-sm text-purple-200/60 mb-4 font-medium">
                user@example.com
              </p>

              {/* Badges */}
              <div className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 rounded-2xl py-3 px-4 shadow-inner">
                <div className="text-center">
                  <span className="text-xs text-white/40 block font-semibold uppercase tracking-wider">
                    Total Streak
                  </span>
                  <span className="text-xl font-bold text-orange-400 mt-1 block">
                    <AnimatedNumber value={totalStreak} /> Hari 🔥
                  </span>
                </div>
                <div className="h-8 border-l border-white/10"></div>
                <div className="text-center">
                  <span className="text-xs text-white/40 block font-semibold uppercase tracking-wider">
                    Level Belajar
                  </span>
                  <span className="text-xl font-bold text-purple-300 mt-1 block">
                    Level <AnimatedNumber value={12} /> 🏆
                  </span>
                </div>
              </div>
            </div>

            {/* CARD 2: Grafik Aktivitas Belajar */}
            {renderActivityChart("chart-gradient-profile")}

            {/* CARD 3: Tombol Keluar Akun */}
            <div className="mt-2">
              <button
                onClick={() => {
                  localStorage.removeItem("isLoggedIn");
                  setIsLoggedIn(false);
                  setActiveTab("home");
                }}
                className="w-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-200 rounded-3xl py-4 px-6 font-semibold transition-all cursor-pointer shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5 text-red-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Keluar Akun (Log Out)
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Featured Class Card */}
            <div className="w-full bg-white/10 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[170px] hover:scale-[1.01] transition-all z-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500 to-indigo-500 opacity-20 blur-2xl pointer-events-none" />
              <div className="flex flex-col gap-1.5 z-10">
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-purple-200/90 bg-white/10 px-2.5 py-1 rounded-full self-start border border-white/10">
                  25+ Lectures • 45 Enrolled
                </span>
                <h3 className="text-xl font-extrabold text-white mt-1 leading-tight tracking-tight max-w-[200px] sm:max-w-xs">
                  UI/UX Design Live Class
                </h3>
              </div>
              <div className="flex items-center justify-between mt-4 z-10">
                <p className="text-[10px] text-purple-200/70 font-medium">
                  Mulai belajar kelas live hari ini
                </p>
                <button
                  onClick={() => alert("Mengarah ke kelas UI/UX Live!")}
                  className="bg-white text-purple-700 hover:bg-purple-50 rounded-full px-5 py-2 text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  Lanjut Belajar
                </button>
              </div>
            </div>

            {/* Categories Filter (Pills) */}
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-6 px-6 md:mx-0 md:px-0 scrollbar-none">
              {categories.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 ease-in-out backdrop-blur-md whitespace-nowrap cursor-pointer active:scale-95 ${
                    selectedFilter === filter
                      ? "bg-gradient-to-r from-purple-500 to-indigo-500 border border-purple-400/30 text-white shadow-md scale-[1.02]"
                      : "bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Weekly Streak Calendar */}
            {renderWeeklyStreakCalendar()}
            {/* Main Content: Daftar Mata Pelajaran (Grid 2-Kolom dengan Progresif View) */}
            <div className="w-full">
              {filteredSubjects.length > 0 ? (
                <div className="flex flex-col gap-6 w-full">
                  <motion.div layout className="grid grid-cols-2 gap-4 w-full">
                    <AnimatePresence mode="popLayout">
                      {filteredSubjects
                        .slice(0, showAllSubjects ? filteredSubjects.length : 4)
                        .map((subject) => (
                          <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.96, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: 10 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            key={subject.id}
                            onClick={() => router.push(`/lesson/${subject.id}`)}
                            className="w-full bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-4.5 shadow-xl relative overflow-hidden transition-all duration-300 ease-in-out hover:scale-[1.02] hover:bg-white/15 hover:border-white/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] active:scale-[0.98] group flex flex-col justify-between min-h-[180px] cursor-pointer"
                          >
                            {/* Glow */}
                            <div
                              className={`absolute top-0 right-0 w-16 h-16 rounded-full bg-gradient-to-br ${subject.color} opacity-10 blur-xl pointer-events-none group-hover:opacity-20 transition-opacity`}
                            />

                            {/* Top: Icon & Favorite */}
                            <div className="flex justify-between items-start w-full">
                              <div
                                className={`w-9 h-9 rounded-xl bg-gradient-to-br ${subject.color} flex items-center justify-center shadow-md flex-shrink-0`}
                              >
                                {subject.id === "mtk" && (
                                  <GraduationCap className="w-5 h-5 text-white" />
                                )}
                                {subject.id === "science" && (
                                  <FlaskConical className="w-5 h-5 text-white" />
                                )}
                                {subject.id === "coding" && (
                                  <Code className="w-5 h-5 text-white" />
                                )}
                                {subject.id === "english" && (
                                  <Globe className="w-5 h-5 text-white" />
                                )}
                                {![
                                  "mtk",
                                  "science",
                                  "coding",
                                  "english",
                                ].includes(subject.id) && (
                                  <GraduationCap className="w-5 h-5 text-white" />
                                )}
                              </div>
                              {subject.isFavorite && (
                                <span className="text-amber-400 p-0.5 bg-white/5 rounded-lg border border-white/10 shadow-sm">
                                  <svg
                                    className="w-3.5 h-3.5 fill-current"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                </span>
                              )}
                            </div>

                            {/* Middle: Subject Title & Level/Duration */}
                            <div className="mt-3.5 flex flex-col">
                              <h3 className="font-bold text-white group-hover:text-purple-200 transition-colors text-sm line-clamp-1 leading-tight">
                                {subject.name}
                              </h3>

                              {/* Level & Duration */}
                              <div className="flex items-center justify-between text-[9px] text-white/50 mt-1 font-medium">
                                <span>{subject.level}</span>
                                <span>{subject.duration}</span>
                              </div>

                              {/* Certificate Icon */}
                              {subject.hasCertificate && (
                                <div className="flex items-center gap-1 text-[8px] text-purple-300 font-bold mt-1.5">
                                  <Award className="w-3 h-3 text-purple-300 flex-shrink-0" />
                                  <span>Sertifikat</span>
                                </div>
                              )}
                            </div>

                            {/* Bottom: Progress Bar */}
                            <div className="mt-3">
                              <div className="flex justify-between text-[9px] text-white/50 mb-1 font-medium">
                                <span>Progres</span>
                                <span>{subject.progress}%</span>
                              </div>
                              <div className="w-full bg-white/10 rounded-full h-1 border border-white/5 overflow-hidden">
                                <div
                                  className={`bg-gradient-to-r ${subject.color} h-full rounded-full transition-all duration-500`}
                                  style={{ width: `${subject.progress}%` }}
                                />
                              </div>
                            </div>
                          </motion.div>
                        ))}
                    </AnimatePresence>
                  </motion.div>

                  {/* Show More / Show Less Button */}
                  {filteredSubjects.length > 4 && (
                    <div className="flex justify-center mt-2 w-full">
                      <button
                        onClick={() => setShowAllSubjects(!showAllSubjects)}
                        className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-bold text-purple-300 hover:text-white transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 shadow-md"
                      >
                        {showAllSubjects
                          ? "Tampilkan Lebih Sedikit"
                          : "Lihat Selengkapnya"}
                        <svg
                          className={`w-4 h-4 transition-transform duration-300 ${showAllSubjects ? "rotate-180" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-12 text-center shadow-lg w-full">
                  <svg
                    className="w-12 h-12 text-white/30 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-lg font-bold text-white/80">
                    Tidak ada mata pelajaran
                  </h3>
                  <p className="text-sm text-white/50 mt-1">
                    Coba sesuaikan pencarian atau filter Anda.
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>



      {/* Drawer Overlay (Backdrop) */}
      {isProfileDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300"
          onClick={() => setIsProfileDrawerOpen(false)}
        />
      )}

      {/* Profile Menu Drawer (Glassmorphism Slide-out panel) */}
      <div
        className="fixed top-4 right-4 bottom-4 w-[320px] sm:w-[380px] bg-black/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl z-50 flex flex-col items-center gap-6 overflow-y-auto"
        style={{
          transform: isProfileDrawerOpen ? "translateX(0)" : "translateX(120%)",
          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          visibility: isProfileDrawerOpen ? "visible" : "hidden",
        }}
      >
        {/* Close Button 'X' positioned absolute */}
        <button
          onClick={() => setIsProfileDrawerOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-white/90 transition-all duration-300 ease-in-out cursor-pointer z-10 active:scale-95"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Header Drawer: User Profile Info */}
        <div className="flex flex-col items-center text-center mt-6">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center border border-white/20 shadow-md mb-3">
            <svg
              className="w-8 h-8 text-white/90"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white/90 leading-tight">
            Pengguna Konsisten
          </h3>
          <p className="text-sm text-white/70 font-medium">user@example.com</p>
        </div>

        {/* Daftar Menu (Rapi & Responsif) */}
        <div className="w-full flex flex-col gap-3">
          {/* Edit Profil */}
          <button
            onClick={() => alert("Fitur Edit Profil akan segera hadir!")}
            className="w-full h-12 flex items-center gap-3 px-4 rounded-xl bg-white/5 border border-white/5 text-white/90 hover:bg-white/10 hover:border-white/10 transition-all duration-300 ease-in-out text-left cursor-pointer text-xs font-semibold active:scale-[0.98]"
          >
            <svg
              className="w-4 h-4 text-white/90"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Edit Profil
          </button>

          {/* Saling Follow */}
          <button
            onClick={() => alert("Fitur Saling Follow akan segera hadir!")}
            className="w-full h-12 flex items-center gap-3 px-4 rounded-xl bg-white/5 border border-white/5 text-white/90 hover:bg-white/10 hover:border-white/10 transition-all duration-300 ease-in-out text-left cursor-pointer text-xs font-semibold active:scale-[0.98]"
          >
            <svg
              className="w-4 h-4 text-white/90"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            Saling Follow
          </button>

          {/* Statistik Grafik */}
          <button
            onClick={() => {
              setActiveTab("stats");
              setIsProfileDrawerOpen(false);
            }}
            className="w-full h-12 flex items-center justify-between px-4 rounded-xl bg-white/5 border border-white/5 text-white/90 hover:bg-white/10 hover:border-white/10 transition-all duration-300 ease-in-out text-left cursor-pointer text-xs font-semibold active:scale-[0.98]"
          >
            <span className="flex items-center gap-3">
              <svg
                className="w-4 h-4 text-white/90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z"
                />
              </svg>
              Statistik Grafik
            </span>
            <svg
              className="w-4 h-4 text-white/30"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Logout Button */}
          <button
            onClick={() => {
              localStorage.removeItem("isLoggedIn");
              setIsLoggedIn(false);
              setIsProfileDrawerOpen(false);
              setActiveTab("home");
            }}
            className="w-full h-12 flex items-center gap-3 px-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 hover:bg-red-500/20 transition-all duration-300 ease-in-out text-left cursor-pointer text-xs font-semibold active:scale-[0.98]"
          >
            <svg
              className="w-4 h-4 text-red-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Keluar Akun (Logout)
          </button>
        </div>
      </div>

      {/* Notification Drawer (Glassmorphic slide-out) */}
      <AnimatePresence>
        {isNotificationOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsNotificationOpen(false);
                setExpandedNotificationId(null);
              }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 cursor-pointer"
            />
            {/* Drawer Panel (Floating Glassmorphism Card) */}
            <motion.div
              initial={{ x: "110%" }}
              animate={{ x: 0 }}
              exit={{ x: "110%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-4 right-4 bottom-4 w-[320px] sm:w-[380px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl z-50 flex flex-col justify-between overflow-hidden"
            >
              {/* Header */}
              <div className="p-5 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-300">
                    <svg
                      className="w-4.5 h-4.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xs font-extrabold uppercase tracking-widest text-white">
                    Notifikasi
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setIsNotificationOpen(false);
                    setExpandedNotificationId(null);
                  }}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  <svg
                    className="w-4.5 h-4.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Notification List */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 scrollbar-none">
                {notifications.length > 0 ? (
                  notifications.map((item) => {
                    const isExpanded = expandedNotificationId === item.id;
                    return (
                      <div
                        key={item.id}
                        className={`w-full rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col shadow-sm ${
                          item.isRead
                            ? "bg-white/5 border-white/5 text-white/70 hover:bg-white/10"
                            : "bg-purple-900/10 border-purple-500/20 text-white hover:bg-purple-900/20"
                        }`}
                      >
                        {/* Unread Accent Left Line Indicator */}
                        {!item.isRead && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 to-indigo-500" />
                        )}

                        {/* Item Header (Clickable to Toggle Dropdown) */}
                        <div
                          onClick={() => {
                            setExpandedNotificationId(isExpanded ? null : item.id);
                            // Mark as read when expanded
                            if (!item.isRead) {
                              setNotifications((prev) =>
                                prev.map((n) =>
                                  n.id === item.id ? { ...n, isRead: true } : n
                                )
                              );
                            }
                          }}
                          className="p-3.5 flex justify-between items-start w-full gap-2 pl-4 cursor-pointer select-none"
                        >
                          <div className="flex flex-col min-w-0">
                            <span
                              className={`text-[11px] font-bold ${!item.isRead ? "text-purple-200" : "text-white/80"}`}
                            >
                              {item.title}
                            </span>
                            <span className="text-[8px] text-white/30 font-medium mt-0.5">
                              {item.date}
                            </span>
                          </div>
                          <motion.svg
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="w-4 h-4 text-white/30 flex-shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 9l-7 7-7-7"
                            />
                          </motion.svg>
                        </div>

                        {/* Expandable Details Body */}
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 pb-3.5 pt-1 pl-4 flex flex-col gap-3 border-t border-white/5">
                                <p className="text-[10px] leading-relaxed text-white/50 font-normal">
                                  {item.message}
                                </p>
                                
                                {/* Action Buttons */}
                                <div className="flex gap-2 mt-1">
                                  {!item.isRead && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setNotifications((prev) =>
                                          prev.map((n) =>
                                            n.id === item.id ? { ...n, isRead: true } : n
                                          )
                                        );
                                      }}
                                      className="px-3 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 text-[9px] font-bold transition-all cursor-pointer active:scale-95 border border-purple-500/20"
                                    >
                                      Tandai Dibaca
                                    </button>
                                  )}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setNotifications((prev) =>
                                        prev.filter((n) => n.id !== item.id)
                                      );
                                      if (isExpanded) {
                                        setExpandedNotificationId(null);
                                      }
                                    }}
                                    className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 text-[9px] font-bold transition-all cursor-pointer active:scale-95 border border-red-500/20"
                                  >
                                    Hapus
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/25">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                      </svg>
                    </div>
                    <span className="text-[11px] font-bold text-white/40">
                      Tidak ada notifikasi baru
                    </span>
                  </div>
                )}
              </div>

              {/* Sticky Footer Clear All Button */}
              {notifications.length > 0 && (
                <div className="p-4 border-t border-white/5 bg-black/10 backdrop-blur-md w-full">
                  <button
                    onClick={() => {
                      setNotifications([]);
                      setExpandedNotificationId(null);
                    }}
                    className="w-full py-3.5 rounded-2xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 hover:text-purple-200 text-xs font-bold transition-all active:scale-[0.99] cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-purple-950/20"
                  >
                    Clear All Notifications
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Live Search Overlay (Elegant Floating Card Interface) */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
            {/* Extremely transparent blurred backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery("");
              }}
              className="fixed inset-0 bg-purple-950/10 backdrop-blur-xl z-50 cursor-pointer"
            />

            {/* Centered Floating Glassmorphic Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-6 top-1/2 -translate-y-1/2 mx-auto max-w-md w-[90%] bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl z-50 flex flex-col gap-4.5 overflow-hidden backdrop-blur-xl"
            >
              {/* Card Header */}
              <div className="flex justify-between items-center w-full">
                <div className="flex flex-col">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    Pencarian
                  </h3>
                  <span className="text-[8px] text-white/40 font-semibold mt-0.5">
                    Temukan kelas & materi belajar
                  </span>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/55 hover:text-white transition-colors cursor-pointer"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Search Bar Input */}
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Cari kelas, kategori, atau topik materi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-11 pr-5 text-xs text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-purple-400 focus:bg-white/8 transition-all shadow-inner"
                />
                <svg
                  className="w-4.5 h-4.5 text-white/30 absolute left-4 top-1/2 -translate-y-1/2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* Search Results Display Area */}
              <div className="w-full max-h-[300px] overflow-y-auto pr-1 flex flex-col gap-2.5 scrollbar-none">
                {searchQuery.trim() === "" ? (
                  <div className="text-center py-8 text-white/30 text-[10px] font-semibold">
                    Ketik kata kunci untuk memulai pencarian...
                  </div>
                ) : searchResults.length > 0 ? (
                  searchResults.map((result, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery("");
                        router.push(`/lesson/${result.subjectId}`);
                      }}
                      className="w-full p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/20 text-left transition-all cursor-pointer flex items-center justify-between group shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        {/* Subject Icon color indicator */}
                        <div
                          className={`w-8 h-8 rounded-lg bg-gradient-to-br ${result.subjectColor} flex items-center justify-center text-white text-[9px] font-extrabold shadow-md`}
                        >
                          {result.type === "subject" ? "Kls" : "Mtr"}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors leading-tight">
                            {result.title}
                          </span>
                          <span className="text-[9px] text-white/40 font-semibold mt-0.5">
                            {result.type === "subject"
                              ? `Kategori: ${result.category}`
                              : result.description}
                          </span>
                        </div>
                      </div>

                      {/* Arrow indicator */}
                      <svg
                        className="w-4 h-4 text-white/30 group-hover:text-purple-400 group-hover:translate-x-0.5 transition-all"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-10 text-center gap-2.5">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/20">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <span className="text-[10px] font-bold text-white/30">
                      Materi tidak ditemukan
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>


    </main>
  );
}

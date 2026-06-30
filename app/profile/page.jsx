"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ChevronLeft,
  Settings,
  Flame,
  CheckCircle,
  GraduationCap,
  FlaskConical,
  Code,
  Globe,
  Award,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("feed"); // feed, challenge, badge
  const [isAdmin, setIsAdmin] = useState(
    () =>
      typeof window !== "undefined" &&
      localStorage.getItem("userRole") === "admin",
  );

  const feeds = [
    {
      id: 1,
      subject: "Science (IPA)",
      activity: "Selesai menyelesaikan modul Struktur Sel Hewan dan Tumbuhan",
      streak: 5,
      time: "1 jam yang lalu",
      color: "from-teal-400 to-emerald-500",
      icon: <FlaskConical className="w-5 h-5 text-white" />,
    },
    {
      id: 2,
      subject: "Matematika",
      activity: "Menyelesaikan Kuis Aljabar Linear tingkat Menengah",
      streak: 3,
      time: "4 jam yang lalu",
      color: "from-amber-400 to-orange-500",
      icon: <GraduationCap className="w-5 h-5 text-white" />,
    },
    {
      id: 3,
      subject: "Coding",
      activity: "Membuat aplikasi kalkulator interaktif menggunakan React",
      streak: 8,
      time: "Kemarin",
      color: "from-purple-400 to-pink-500",
      icon: <Code className="w-5 h-5 text-white" />,
    },
  ];

  const challenges = [
    {
      id: 1,
      title: "7-Day Code Warrior",
      description:
        "Tulis kode / selesaikan materi coding selama 7 hari berturut-turut.",
      progress: 71, // 5 of 7 days
      daysCompleted: 5,
      totalDays: 7,
      color: "from-purple-400 to-indigo-500",
    },
    {
      id: 2,
      title: "Math Genius Elite",
      description:
        "Selesaikan 3 buah kuis Matematika dengan skor sempurna 100%.",
      progress: 66, // 2 of 3 quizzes
      daysCompleted: 2,
      totalDays: 3,
      color: "from-amber-400 to-orange-500",
    },
  ];

  const badges = [
    {
      id: 1,
      name: "Fast Learner",
      desc: "Selesaikan materi di bawah 15 menit",
      icon: <GraduationCap className="w-6 h-6 text-white" />,
      color: "from-blue-400 to-indigo-500",
    },
    {
      id: 2,
      name: "Streak Master",
      desc: "Pertahankan 5 hari streak belajar",
      icon: <Flame className="w-6 h-6 text-white" />,
      color: "from-orange-400 to-amber-500",
    },
    {
      id: 3,
      name: "Quiz Conqueror",
      desc: "Dapatkan skor 100% pada kuis pertama",
      icon: <Award className="w-6 h-6 text-white" />,
      color: "from-teal-400 to-emerald-500",
    },
    {
      id: 4,
      name: "Global Explorer",
      desc: "Mulai kelas lintas kategori mapel",
      icon: <Globe className="w-6 h-6 text-white" />,
      color: "from-purple-400 to-pink-500",
    },
  ];

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

          <span className="text-sm font-bold tracking-wider text-white/90">
            My Profile
          </span>

          <button
            onClick={() => router.push("/profile/settings")}
            className="w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl flex items-center justify-center text-white transition-all cursor-pointer shadow-md active:scale-95"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5 text-white/80" />
          </button>
        </div>

        {/* Dynamic Social-Style Header */}
        <div className="flex flex-col items-center text-center mt-2">
          {/* Avatar frame */}
          <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center border-2 border-white/25 shadow-2xl mb-4 relative">
            <svg
              className="w-12 h-12 text-white"
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
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-purple-500 border border-purple-950 rounded-full flex items-center justify-center text-white shadow-lg">
              <CheckCircle className="w-4 h-4 text-emerald-300 fill-emerald-950" />
            </div>
          </div>

          {/* Verified Name */}
          <div className="flex items-center gap-1.5 justify-center">
            <h2 className="text-2xl font-extrabold text-white tracking-tight leading-none">
              Pengguna Konsisten
            </h2>
            <CheckCircle className="w-5 h-5 text-purple-400 fill-purple-900/30" />
          </div>
          <span className="text-xs text-purple-200/60 font-medium mt-1.5">
            @penggunakonsisten
          </span>

          {/* Learning Progress Stats */}
          <div className="flex items-center gap-6 mt-5 bg-white/5 border border-white/10 rounded-full px-6 py-2.5 shadow-inner">
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-white">154 Jam</span>
              <span className="text-[10px] text-purple-200/50 font-medium">
                Total Belajar
              </span>
            </div>
            <div className="h-3 border-l border-white/15" />
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-white">85</span>
              <span className="text-[10px] text-purple-200/50 font-medium">
                Quiz Selesai
              </span>
            </div>
          </div>

          {/* Edit Profile Button */}
          <button
            onClick={() => router.push("/profile/edit")}
            className="mt-4.5 w-full py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-xs font-bold text-white shadow-md active:scale-95 transition-all cursor-pointer"
          >
            Edit Profile
          </button>

          {/* Admin Panel Access Button (Only for Admin) */}
          {isAdmin && (
            <button
              onClick={() => router.push("/admin")}
              className="mt-3 w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 border border-emerald-400/30 rounded-2xl text-xs font-bold text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Settings className="w-4 h-4" /> Akses Admin Panel
            </button>
          )}
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-white/5 border border-white/5 rounded-2xl p-1 gap-1 w-full mt-2">
          {["feed", "challenge", "badge"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all duration-300 ease-in-out cursor-pointer active:scale-95 capitalize ${
                activeTab === tab
                  ? "bg-purple-600 text-white shadow-lg border border-purple-400/30"
                  : "text-white/55 hover:text-white/90 hover:bg-white/5"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="mt-2 min-h-[300px]">
          <AnimatePresence mode="wait">
            {/* Tab: Feed */}
            {activeTab === "feed" && (
              <motion.div
                key="feed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-4 w-full"
              >
                {feeds.map((feed) => (
                  <div
                    key={feed.id}
                    className="w-full p-4.5 rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden flex flex-col gap-3 shadow-xl"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-start w-full">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl bg-gradient-to-br ${feed.color} flex items-center justify-center shadow-md`}
                        >
                          {feed.icon}
                        </div>
                        <div className="flex flex-col">
                          <h4 className="text-xs font-bold text-white leading-tight">
                            {feed.subject}
                          </h4>
                          <span className="text-[9px] text-white/40 font-medium mt-0.5">
                            {feed.time}
                          </span>
                        </div>
                      </div>

                      {/* Streak badge */}
                      <span className="text-[10px] text-orange-400 font-bold flex items-center gap-1 bg-orange-500/10 px-2 py-1 rounded-lg border border-orange-500/20">
                        <Flame className="w-3.5 h-3.5 fill-orange-500" />
                        {feed.streak} Hari Streak
                      </span>
                    </div>

                    {/* Body */}
                    <p className="text-xs text-white/80 leading-relaxed font-medium pl-1">
                      {feed.activity}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Tab: Challenge */}
            {activeTab === "challenge" && (
              <motion.div
                key="challenge"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-4 w-full"
              >
                {challenges.map((challenge) => (
                  <div
                    key={challenge.id}
                    className="w-full p-4.5 rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden flex flex-col gap-3 shadow-xl"
                  >
                    <div className="flex justify-between items-start w-full">
                      <h4 className="text-xs font-bold text-white tracking-tight leading-tight">
                        {challenge.title}
                      </h4>
                      <span className="text-[9px] text-purple-300 font-bold bg-purple-500/10 px-2 py-0.5 rounded-lg border border-purple-500/20">
                        {challenge.daysCompleted}/{challenge.totalDays} Selesai
                      </span>
                    </div>

                    <p className="text-[11px] text-white/55 leading-relaxed font-medium -mt-1">
                      {challenge.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="flex flex-col gap-1.5 w-full mt-1">
                      <div className="flex justify-between items-center text-[10px] font-semibold text-white/70">
                        <span>Penyelesaian</span>
                        <span>{challenge.progress}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden border border-white/5">
                        <div
                          className={`h-full bg-gradient-to-r ${challenge.color} rounded-full`}
                          style={{ width: `${challenge.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Tab: Badge */}
            {activeTab === "badge" && (
              <motion.div
                key="badge"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-2 gap-4 w-full"
              >
                {badges.map((badge) => (
                  <div
                    key={badge.id}
                    className="bg-white/5 border border-white/10 rounded-3xl p-4.5 flex flex-col items-center text-center justify-between min-h-[140px] shadow-xl hover:scale-[1.02] transition-transform"
                  >
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${badge.color} flex items-center justify-center shadow-lg`}
                    >
                      {badge.icon}
                    </div>
                    <div className="flex flex-col gap-1 mt-3">
                      <h4 className="text-[11px] font-bold text-white leading-tight">
                        {badge.name}
                      </h4>
                      <span className="text-[9px] text-white/40 font-medium leading-tight">
                        {badge.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}

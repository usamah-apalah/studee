"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  ChevronLeft,
  Plus,
  Trash2,
  Edit3,
  Cpu,
  CheckCircle,
  XCircle,
  Database,
  ExternalLink,
  Code,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    const role =
      localStorage.getItem("userRole") ||
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("userRole="))
        ?.split("=")[1];
    if (role !== "admin") {
      router.push("/");
    }
  }, [router]);

  const [contents, setContents] = useState(() => {
    if (typeof window === "undefined") return [];

    const defaultMock = [
      {
        id: 1,
        title: "Dasar-Dasar Aljabar Linear",
        name: "Dasar-Dasar Aljabar Linear",
        description:
          "Pengenalan sistem persamaan linear, matriks, determinan, dan vektor ruang.",
        category: "Matematika",
        driveLink: "https://drive.google.com/drive/folders/math101",
        quizStatus: "Sudah Ada",
        progress: 80,
        streak: 30,
        color: "from-amber-400 to-orange-500",
        level: "Intermediate",
        duration: "12 Jam",
      },
      {
        id: 2,
        title: "Struktur Sel & Fungsi Organel",
        name: "Struktur Sel & Fungsi Organel",
        description:
          "Membedakan sel hewan dan tumbuhan, serta peran ribosom, mitokondria, dan nukleus.",
        category: "Science",
        driveLink: "https://drive.google.com/drive/folders/bio202",
        quizStatus: "Belum Ada",
        progress: 65,
        streak: 15,
        color: "from-teal-400 to-emerald-500",
        level: "Advanced",
        duration: "18 Jam",
      },
      {
        id: 3,
        title: "Pengembangan Rute Dinamis Next.js",
        name: "Pengembangan Rute Dinamis Next.js",
        description:
          "Bagaimana cara membuat halaman detail dinamis menggunakan router.push dan file folder opsional.",
        category: "Coding",
        driveLink: "https://drive.google.com/drive/folders/dev303",
        quizStatus: "Sudah Ada",
        progress: 92,
        streak: 45,
        color: "from-purple-400 to-pink-500",
        level: "Beginner to Pro",
        duration: "24 Jam",
      },
    ];

    const saved = localStorage.getItem("stry_subjects");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((item) => ({
          ...item,
          title: item.title || item.name,
          driveLink:
            item.driveLink ||
            `https://drive.google.com/drive/folders/${item.id}`,
          quizStatus:
            item.quizStatus || (item.progress > 0 ? "Sudah Ada" : "Belum Ada"),
        }));
      } catch (e) {
        console.error("Error parsing subjects from localStorage", e);
      }
    }

    localStorage.setItem("stry_subjects", JSON.stringify(defaultMock));
    return defaultMock;
  });

  // Form Fields State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Coding");
  const [driveLink, setDriveLink] = useState("");

  // Edit Management
  const [editingId, setEditingId] = useState(null);

  // Loading States
  const [isSaving, setIsSaving] = useState(false);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [activeQuizContent, setActiveQuizContent] = useState(null);
  const [showQuizResultModal, setShowQuizResultModal] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState([]);

  const getColorFromCategory = (cat) => {
    const catLower = cat.toLowerCase();
    if (
      catLower.includes("math") ||
      catLower.includes("mtk") ||
      catLower.includes("hitung")
    ) {
      return "from-amber-400 to-orange-500";
    } else if (
      catLower.includes("science") ||
      catLower.includes("ipa") ||
      catLower.includes("biologi") ||
      catLower.includes("fisika")
    ) {
      return "from-teal-400 to-emerald-500";
    } else if (
      catLower.includes("code") ||
      catLower.includes("program") ||
      catLower.includes("next")
    ) {
      return "from-purple-400 to-pink-500";
    }
    return "from-blue-400 to-indigo-500";
  };

  // Save/Edit action handler
  const handleSaveContent = (e) => {
    e.preventDefault();
    if (!title || !description || !driveLink) {
      alert("Harap isi seluruh kolom formulir!");
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      let updatedContents = [];
      if (editingId !== null) {
        // Edit Mode
        updatedContents = contents.map((item) =>
          item.id === editingId
            ? { ...item, title, name: title, description, category, driveLink }
            : item,
        );
        alert("Konten berhasil diperbarui!");
      } else {
        // Add Mode
        const newItem = {
          id: Date.now(),
          title,
          name: title,
          description,
          category,
          driveLink,
          quizStatus: "Belum Ada",
          progress: 0,
          streak: 0,
          isFavorite: false,
          level: "Beginner",
          duration: "4 Jam",
          hasCertificate: false,
          color: getColorFromCategory(category),
        };
        updatedContents = [...contents, newItem];
        alert("Konten baru berhasil disimpan ke database!");
      }

      setContents(updatedContents);
      localStorage.setItem("stry_subjects", JSON.stringify(updatedContents));
      setEditingId(null);

      // Clear Form
      setTitle("");
      setDescription("");
      setDriveLink("");
      setIsSaving(false);
    }, 800);
  };

  // Trigger Edit Mode
  const handleEditInit = (item) => {
    setEditingId(item.id);
    setTitle(item.title);
    setDescription(item.description);
    setCategory(item.category);
    setDriveLink(item.driveLink);
  };

  // Delete item handler
  const handleDeleteContent = (id) => {
    if (
      confirm("Apakah Anda yakin ingin menghapus konten ini dari database?")
    ) {
      const updated = contents.filter((item) => item.id !== id);
      setContents(updated);
      localStorage.setItem("stry_subjects", JSON.stringify(updated));
    }
  };

  // Trigger Python backend FastAPI simulation for AI quiz generation
  const handleGenerateQuizWithAI = (item) => {
    setActiveQuizContent(item);
    setIsGeneratingQuiz(true);

    // Simulating POST request to http://localhost:8000/api/generate-quiz
    setTimeout(() => {
      // Set status to "Sudah Ada"
      const updated = contents.map((c) =>
        c.id === item.id ? { ...c, quizStatus: "Sudah Ada" } : c,
      );
      setContents(updated);
      localStorage.setItem("stry_subjects", JSON.stringify(updated));

      // Generated Mock Questions representing Python FastAPI Response
      const mockQuestions = [
        {
          question: `Berdasarkan materi '${item.title}', apa aspek utama yang ditekankan dalam penjelasan tersebut?`,
          options: [
            "Pemahaman konsep dasar secara menyeluruh",
            "Menerapkan optimasi tingkat tinggi tanpa riset dasar",
            "Menghindari integrasi alat otomatisasi digital",
            "Mengulang kesalahan konfigurasi berulang kali",
          ],
          correct: "Pemahaman konsep dasar secara menyeluruh",
        },
        {
          question: `Manakah yang menggambarkan ringkasan paling akurat dari deskripsi: '${item.description.substring(0, 45)}...'?`,
          options: [
            "Pembahasan fundamental mengenai materi terkait",
            "Analisis kesalahan alokasi memori pada CPU",
            "Metode pengujian tingkat ketahanan beban server",
            "Panduan komparasi framework eksternal",
          ],
          correct: "Pembahasan fundamental mengenai materi terkait",
        },
      ];

      setGeneratedQuestions(mockQuestions);
      setIsGeneratingQuiz(false);
      setShowQuizResultModal(true);
    }, 2000);
  };

  return (
    <main className="min-h-screen pb-24 bg-gradient-to-br from-indigo-950 via-slate-900 to-black text-white font-sans relative overflow-hidden">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[5%] left-[-15%] w-[700px] h-[700px] rounded-full bg-purple-500/10 blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 pt-10 flex flex-col gap-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between w-full border-b border-white/5 pb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/")}
              className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center text-white transition-all cursor-pointer active:scale-95 shadow-md"
              aria-label="Back"
            >
              <ChevronLeft className="w-5 h-5 text-white/90" />
            </button>
            <div className="flex flex-col">
              <h1 className="text-xl md:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                <Database className="w-6 h-6 text-purple-400" /> Admin Dashboard
              </h1>
              <p className="text-xs text-white/50 font-medium">
                Kelola materi pelajaran & otomatisasi kuis Stry
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 border border-emerald-500/20 px-3 py-1 rounded-full">
            ● Active DB Session
          </span>
        </div>

        {/* Top: Two column layout for form & logs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {/* Left Block: Form Input (2 columns span) */}
          <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative overflow-hidden flex flex-col gap-5">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-500 opacity-5 blur-xl pointer-events-none" />

            <h3 className="text-sm font-bold uppercase tracking-wider text-purple-300">
              {editingId !== null
                ? "Edit Detail Materi"
                : "Input Konten Pembelajaran Baru"}
            </h3>

            <form onSubmit={handleSaveContent} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Judul */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-white/40 font-bold uppercase tracking-wider pl-1">
                    Judul Materi
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Pengenalan Integrasi API"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-purple-400 focus:bg-white/10 transition-all shadow-inner"
                  />
                </div>

                {/* Kategori */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-white/40 font-bold uppercase tracking-wider pl-1">
                    Kategori
                  </label>
                  <input
                    type="text"
                    placeholder="Masukkan kategori baru..."
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-purple-400 focus:bg-white/10 transition-all shadow-inner"
                  />
                </div>
              </div>

              {/* Link Google Drive */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-white/40 font-bold uppercase tracking-wider pl-1">
                  Link Google Drive (Video/Materi)
                </label>
                <input
                  type="url"
                  placeholder="https://drive.google.com/file/d/..."
                  value={driveLink}
                  onChange={(e) => setDriveLink(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-purple-400 focus:bg-white/10 transition-all shadow-inner"
                />
              </div>

              {/* Deskripsi */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-white/40 font-bold uppercase tracking-wider pl-1">
                  Deskripsi Materi
                </label>
                <textarea
                  placeholder="Deskripsikan secara singkat topik, durasi belajar, dan apa yang dipelajari..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-purple-400 focus:bg-white/10 transition-all shadow-inner resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-2 border-t border-white/5 pt-4">
                {editingId !== null && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setTitle("");
                      setDescription("");
                      setDriveLink("");
                    }}
                    className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-white transition-all cursor-pointer active:scale-95"
                  >
                    Batal
                  </button>
                )}

                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-xl text-xs font-bold shadow-md active:scale-95 hover:scale-[1.01] transition-all cursor-pointer flex items-center gap-1.5 border border-white/10 disabled:opacity-50"
                >
                  <Plus className="w-4 h-4" />{" "}
                  {isSaving
                    ? "Menyimpan..."
                    : editingId !== null
                      ? "Perbarui Konten"
                      : "Simpan Konten"}
                </button>
              </div>
            </form>
          </div>

          {/* Right Block: Python Backend API Documentation Info */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative overflow-hidden flex flex-col gap-4">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 opacity-5 blur-xl pointer-events-none" />

            <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
              <Code className="w-4 h-4" /> Backend API Info
            </h3>

            <p className="text-[11px] text-white/60 leading-relaxed font-medium">
              Tombol{" "}
              <span className="text-purple-300 font-bold">
                Generate Quiz with AI
              </span>{" "}
              mengirimkan data materi ke endpoint Python FastAPI berikut:
            </p>

            <div className="bg-black/35 rounded-2xl p-4 border border-white/5 flex flex-col gap-1 font-mono text-[9px] text-purple-200">
              <span className="text-emerald-400 font-bold">
                POST /api/generate-quiz
              </span>
              <span className="text-white/40">Host: http://localhost:8000</span>
              <span className="text-white/40 mt-1">Payload:</span>
              <span className="text-purple-300">{"{"}</span>
              <span className="pl-3">&quot;title&quot;: &quot;...&quot;,</span>
              <span className="pl-3">&quot;description&quot;: &quot;...&quot;,</span>
              <span className="pl-3">&quot;category&quot;: &quot;...&quot;,</span>
              <span className="pl-3">&quot;drive_link&quot;: &quot;...&quot;</span>
              <span className="text-purple-300">{"}"}</span>
              <span className="text-white/40 mt-2">
                Diproses di file <span className="underline">backend/app.py</span>.
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Section: Content List Table */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative overflow-hidden flex flex-col gap-4">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-500 opacity-5 blur-3xl pointer-events-none" />

          <h3 className="text-sm font-bold uppercase tracking-wider text-purple-300">
            Daftar Konten Pembelajaran
          </h3>

          <div className="overflow-x-auto w-full border border-white/5 rounded-2xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-white/50 font-bold tracking-wider">
                  <th className="p-4">Judul Materi</th>
                  <th className="p-4">Kategori</th>
                  <th className="p-4">Drive Link</th>
                  <th className="p-4 text-center">Status Kuis</th>
                  <th className="p-4 text-center">Aksi Kuis</th>
                  <th className="p-4 text-center">Modifikasi</th>
                </tr>
              </thead>
              <tbody>
                {contents.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="p-4 font-bold text-white max-w-xs truncate">
                      {item.title}
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10 font-semibold text-[10px] text-purple-200">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <a
                        href={item.driveLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-purple-300 hover:text-purple-200 flex items-center gap-1 font-medium transition-colors hover:underline"
                      >
                        Folder Drive <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </td>
                    <td className="p-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-bold border ${
                          item.quizStatus === "Sudah Ada"
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                            : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                        }`}
                      >
                        {item.quizStatus === "Sudah Ada" ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <XCircle className="w-3 h-3" />
                        )}
                        {item.quizStatus}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleGenerateQuizWithAI(item)}
                        disabled={isGeneratingQuiz}
                        className="px-3.5 py-1.5 bg-purple-500/10 hover:bg-purple-500/25 border border-purple-500/30 text-purple-300 hover:text-purple-200 rounded-lg font-bold text-[10px] transition-all cursor-pointer flex items-center gap-1.5 mx-auto active:scale-95 disabled:opacity-50"
                      >
                        <Cpu className="w-3.5 h-3.5 animate-pulse" /> AI Quiz
                      </button>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEditInit(item)}
                          className="p-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/70 hover:text-white transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteContent(item.id)}
                          className="p-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                          title="Hapus"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Loading Modal for AI Quiz Generation */}
      <AnimatePresence>
        {isGeneratingQuiz && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center px-6"
          >
            <div className="max-w-sm w-full bg-slate-900 border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center gap-5 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-500 opacity-10 blur-2xl pointer-events-none" />

              {/* Spinner */}
              <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full" />
                <div className="absolute inset-0 border-4 border-t-purple-400 rounded-full animate-spin" />
                <Cpu className="w-6 h-6 text-purple-300 animate-pulse" />
              </div>

              <div className="flex flex-col gap-1.5">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Generating Quiz via AI...
                </h3>
                <p className="text-[10px] text-white/40 leading-relaxed font-semibold">
                  Menghubungkan ke API backend Python FastAPI (
                  <span className="text-purple-300">FastAPI gemini-pro</span>)
                  untuk membaca transkrip Google Drive & membuat kuis otomatis.
                </p>
              </div>

              <div className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 font-mono text-[9px] text-purple-200 truncate">
                POST /api/generate-quiz ...
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal showing Generated Quiz Details */}
      <AnimatePresence>
        {showQuizResultModal && activeQuizContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center px-6"
          >
            <div className="max-w-md w-full bg-slate-900 border border-white/15 rounded-3xl p-6 flex flex-col gap-5 shadow-2xl relative overflow-hidden max-h-[85vh] overflow-y-auto">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500 to-teal-500 opacity-5 blur-2xl pointer-events-none" />

              <div className="flex justify-between items-start w-full border-b border-white/5 pb-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                    AI Generation Success
                  </span>
                  <h3 className="text-sm font-black text-white mt-1 leading-snug truncate max-w-xs">
                    {activeQuizContent.title}
                  </h3>
                </div>
                <button
                  onClick={() => setShowQuizResultModal(false)}
                  className="text-white/40 hover:text-white/70 transition-colors p-1"
                >
                  <svg
                    className="w-5 h-5"
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

              <p className="text-[10px] text-white/50 leading-relaxed font-medium">
                Berikut adalah 2 buah soal kuis pilihan ganda yang berhasil
                disusun secara otomatis oleh Python backend FastAPI menggunakan
                transkrip materi:
              </p>

              <div className="flex flex-col gap-4">
                {generatedQuestions.map((q, idx) => (
                  <div
                    key={idx}
                    className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col gap-3"
                  >
                    <h4 className="text-[11px] font-bold text-white leading-relaxed">
                      {idx + 1}. {q.question}
                    </h4>
                    <div className="grid grid-cols-1 gap-2 pl-1">
                      {q.options.map((opt, oIdx) => (
                        <div
                          key={oIdx}
                          className={`p-2.5 rounded-xl border text-[10px] font-semibold flex items-center justify-between ${
                            opt === q.correct
                              ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-400"
                              : "bg-white/5 border-white/5 text-white/60"
                          }`}
                        >
                          <span>{opt}</span>
                          {opt === q.correct && (
                            <span className="text-[8px] font-bold uppercase bg-emerald-500/20 px-2 py-0.5 rounded">
                              Correct
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowQuizResultModal(false)}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 rounded-xl text-xs font-bold text-white shadow-md active:scale-95 transition-all cursor-pointer border border-white/10"
              >
                Tutup & Simpan Kuis
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  ChevronLeft, 
  BookOpen, 
  Clock, 
  Sparkles, 
  FileText,
  CheckCircle,
  PlayCircle
} from "lucide-react";
import { useStreak } from "../../../../lib/StreakContext";
import VideoPlayer from "../../../../components/VideoPlayer";

const lessonsData = {
  mtk: {
    id: "mtk",
    name: "Matematika (MTK)",
    level: "Intermediate",
    syllabus: [
      { 
        title: "Pengenalan Aljabar Linear", 
        duration: "45 Menit",
        videoUrl: "https://www.youtube.com/watch?v=fNk_zzaMoEs",
        notes: "Aljabar Linear mempelajari sistem persamaan linear, vektor, matriks, dan ruang vektor. Konsep ini adalah pilar utama di balik pemrograman grafis 3D, kecerdasan buatan (AI), dan analisis data modern."
      },
      { 
        title: "Matriks & Transformasi Ruang", 
        duration: "60 Menit",
        videoUrl: "https://www.youtube.com/watch?v=kYB8IZa5AuE",
        notes: "Matriks digunakan untuk mentransformasikan objek grafis (translasi, rotasi, scaling) dalam ruang 2D dan 3D. Di sini Anda akan memahami konsep Eigenvalue dan Eigenvector secara mendalam."
      },
      { 
        title: "Kalkulus: Turunan Pertama", 
        duration: "50 Menit",
        videoUrl: "https://www.youtube.com/watch?v=juKGHh3_DNY",
        notes: "Kalkulus diferensial berfokus pada laju perubahan instan dari suatu fungsi. Konsep turunan pertama sangat krusial dalam algoritma optimasi seperti Gradient Descent pada Machine Learning."
      },
      { 
        title: "Kalkulus: Integral & Luas Daerah", 
        duration: "75 Menit",
        videoUrl: "https://www.youtube.com/watch?v=fNk_zzaMoEs",
        notes: "Integral adalah operasi kebalikan dari turunan yang memungkinkan kita menghitung akumulasi total atau luas daerah di bawah kurva non-linear dengan presisi matematis tinggi."
      },
      { 
        title: "Probabilitas Dasar & Distribusi", 
        duration: "90 Menit",
        videoUrl: "https://www.youtube.com/watch?v=kYB8IZa5AuE",
        notes: "Teori probabilitas mengukur tingkat ketidakpastian suatu peristiwa. Kita akan mengeksplorasi Distribusi Normal, Teorema Bayes, dan bagaimana data statistik membantu pengambilan keputusan."
      },
    ],
  },
  science: {
    id: "science",
    name: "Science (IPA)",
    level: "Advanced",
    syllabus: [
      { 
        title: "Dasar Fisika Quantum", 
        duration: "60 Menit",
        videoUrl: "https://www.youtube.com/watch?v=URUJD5NEXC8",
        notes: "Fisika Quantum mempelajari mekanika partikel pada skala sub-atomik. Konsep probabilitas keadaan menggantikan determinisme fisika klasik, membuka pintu bagi komputasi kuantum masa depan."
      },
      { 
        title: "Dualisme Gelombang Partikel", 
        duration: "75 Menit",
        videoUrl: "https://www.youtube.com/watch?v=URUJD5NEXC8",
        notes: "Percobaan celah ganda membuktikan bahwa partikel seperti elektron bertingkah sebagai gelombang ketika tidak diamati, dan runtuh menjadi materi padat saat proses observasi dilakukan."
      },
      { 
        title: "Struktur & Fungsi Sel Eukariotik", 
        duration: "55 Menit",
        videoUrl: "https://www.youtube.com/watch?v=URUJD5NEXC8",
        notes: "Mempelajari perbedaan mendasar sel hewan dan tumbuhan. Organel seperti Mitokondria bertindak sebagai generator energi (ATP), sementara Nukleus menyimpan blueprint DNA makhluk hidup."
      },
      { 
        title: "Sintesis Protein & Asam Nukleat", 
        duration: "80 Menit",
        videoUrl: "https://www.youtube.com/watch?v=URUJD5NEXC8",
        notes: "Proses transkripsi dan translasi DNA menjadi rantai asam amino (protein) yang menyusun tubuh kita. Pemahaman materi genetik ini krusial untuk bioteknologi dan pengembangan vaksin."
      },
      { 
        title: "Termodinamika Sistem Tertutup", 
        duration: "90 Menit",
        videoUrl: "https://www.youtube.com/watch?v=URUJD5NEXC8",
        notes: "Hukum kekekalan energi dan entropi dalam wadah tertutup. Memahami perpindahan panas, usaha kerja mekanik, serta efisiensi ideal mesin Carnot dalam memproses daya energi."
      },
    ],
  },
  coding: {
    id: "coding",
    name: "Coding & Algoritma",
    level: "Beginner to Pro",
    syllabus: [
      { 
        title: "Pengenalan Struktur Data & Array", 
        duration: "30 Menit",
        videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
        notes: "Array dan List adalah struktur data linear dasar. Di sini Anda akan belajar kompleksitas waktu (Big O) pencarian, penyisipan, dan penghapusan data."
      },
      { 
        title: "Algoritma Rekursi & Dynamic Programming", 
        duration: "90 Menit",
        videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
        notes: "Rekursi memecah masalah besar menjadi sub-masalah kecil. Dynamic Programming mengoptimasi rekursi dengan menyimpan hasil perhitungan (memoization)."
      },
      { 
        title: "Pengenalan Routing Dinamis Next.js", 
        duration: "45 Menit",
        videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
        notes: "Pelajari cara kerja routing folder-based di Next.js App Router, menangkap segmen dinamis [id], dan menyajikan data berbasis parameter URL secara cepat."
      },
      { 
        title: "Manajemen State dengan React Hooks", 
        duration: "60 Menit",
        videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
        notes: "Memahami siklus hidup komponen React melalui useState, useEffect, dan useContext guna membangun antarmuka web interaktif yang reaktif."
      },
      { 
        title: "Deployment Aplikasi ke Vercel", 
        duration: "40 Menit",
        videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
        notes: "Panduan lengkap mendeploy aplikasi Next.js ke Vercel secara otomatis dari repositori GitHub, mengkonfigurasi environment variables, dan memantau analitik."
      },
    ],
  },
  english: {
    id: "english",
    name: "Bahasa Inggris",
    level: "Beginner",
    syllabus: [
      { 
        title: "Penyusunan Kalimat Akademik", 
        duration: "45 Menit",
        videoUrl: "https://www.youtube.com/watch?v=juKGHh3_DNY",
        notes: "Mempelajari struktur kalimat formal (compound & complex sentences) untuk esai ilmiah, menyusun argumen yang logis, dan menghindari bias bahasa."
      },
      { 
        title: "Penguasaan 16 Tenses Utama", 
        duration: "90 Menit",
        videoUrl: "https://www.youtube.com/watch?v=juKGHh3_DNY",
        notes: "Memahami kapan harus menggunakan Simple Past, Present Perfect, atau Future Continuous dalam percakapan sehari-hari maupun dokumen bisnis resmi."
      },
      { 
        title: "Teknik Presentasi & Public Speaking", 
        duration: "60 Menit",
        videoUrl: "https://www.youtube.com/watch?v=juKGHh3_DNY",
        notes: "Tips mengatasi kecemasan berbicara di depan umum, intonasi vokal, bahasa tubuh, serta pemilihan kosakata transisi profesional untuk meyakinkan audiens dalam bahasa Inggris."
      },
      { 
        title: "Percakapan Formal di Tempat Kerja", 
        duration: "50 Menit",
        videoUrl: "https://www.youtube.com/watch?v=juKGHh3_DNY",
        notes: "Mempraktikkan negosiasi bisnis, mengirim email formal, serta tata bahasa sopan (politeness markers) saat berinteraksi dengan kolega kerja maupun klien internasional."
      },
    ],
  },
};

export default function LessonPlayerPage() {
  const params = useParams();
  const router = useRouter();
  const { markAsCompleted } = useStreak();
  const id = params?.id;
  const lessonIdx = parseInt(params?.lessonIdx || "0", 10);
  const [mounted, setMounted] = useState(false);

  const [lesson, setLesson] = useState(() => {
    return lessonsData[id] || lessonsData.coding;
  });

  const [currentMateri, setCurrentMateri] = useState(() => {
    const parentLesson = lessonsData[id] || lessonsData.coding;
    return parentLesson.syllabus[lessonIdx] || parentLesson.syllabus[0];
  });

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      fetch("/api/subjects")
        .then((res) => res.json())
        .then((subjects) => {
          if (subjects && !subjects.error) {
            const found = subjects.find((s) => String(s.id) === String(id));
            if (found) {
              const mappedSyllabus = found.syllabus || [
                { title: "Pengenalan Materi", duration: "10 Menit" }
              ];
              const targetMateri = mappedSyllabus[lessonIdx] || mappedSyllabus[0];

              setLesson({
                id: found.id,
                name: found.title,
                level: found.level || "Beginner",
                syllabus: mappedSyllabus
              });

              setCurrentMateri({
                title: targetMateri.title,
                duration: targetMateri.duration || "15 Menit",
                videoUrl: found.videoUrl || "https://www.youtube.com/watch?v=SqcY0GlETPk",
                notes: found.description || "Silakan pelajari video materi di atas secara mendalam dan catat poin-poin penting untuk kuis."
              });
            }
          }
        })
        .catch((err) => console.error("Error loading dynamic subject details inside LessonPlayer:", err));
    }
  }, [id, lessonIdx]);

  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen pb-32 app-theme-bg font-sans relative overflow-hidden flex flex-col items-center">
      <div className="max-w-md w-full px-6 pt-6 flex flex-col gap-5 relative z-10">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between w-full">
          <button
            onClick={() => router.push(`/lesson/${id}`)}
            className="w-10 h-10 app-theme-card rounded-xl flex items-center justify-center text-[var(--text-color)] transition-all cursor-pointer shadow-md active:scale-95"
            aria-label="Back to Subject"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <span className="text-xs font-bold tracking-widest app-theme-text-muted uppercase">Lesson Player</span>
          
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Lesson Title Section */}
        <div className="flex flex-col gap-1.5 mt-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-black/10 dark:bg-white/10 border border-[var(--border-color)] text-[9px] font-bold uppercase rounded-full app-theme-text-muted">
              Materi {lessonIdx + 1}
            </span>
            <span className="flex items-center gap-1 text-[9px] app-theme-text-muted font-medium">
              <Clock className="w-3 h-3" /> {currentMateri.duration}
            </span>
          </div>
          <h1 className="text-2xl font-black app-theme-text mt-1 leading-tight tracking-tight">
            {currentMateri.title}
          </h1>
          <span className="text-[10px] app-theme-text-muted font-semibold uppercase tracking-wider">
            Kelas: {lesson.name}
          </span>
        </div>

        {/* Video Player Box */}
        {currentMateri.videoUrl && (
          <div className="w-full rounded-[2rem] overflow-hidden shadow-2xl border border-[var(--border-color)] app-theme-card p-1.5">
            <VideoPlayer videoUrl={currentMateri.videoUrl} />
          </div>
        )}

        {/* Study Notes / Catatan Pendukung */}
        <div className="flex flex-col gap-2.5 mt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider app-theme-text-muted flex items-center gap-1.5">
            <FileText className="w-4 h-4" /> Catatan Pendukung Materi
          </h3>
          
          <div className="app-theme-card rounded-[2rem] p-6 shadow-xl relative overflow-hidden">
            <p className="text-[11px] sm:text-xs app-theme-text leading-relaxed font-normal tracking-wide">
              {currentMateri.notes}
            </p>
          </div>
        </div>

      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 max-w-md w-[calc(100%-2.5rem)] px-6 z-40">
        <button
          onClick={() => {
            markAsCompleted();
            router.push(`/lesson/${id}`);
          }}
          className="w-full bg-[var(--text-color)] hover:bg-[var(--text-color)]/90 py-4 rounded-2xl text-center font-bold text-sm text-[var(--bg-color)] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all duration-300 ease-in-out cursor-pointer border border-[var(--border-color)] flex items-center justify-center gap-2"
        >
          <CheckCircle className="w-5 h-5 text-[var(--bg-color)]" />
          SELESAI MENONTON & BACA
        </button>
      </div>
    </main>
  );
}

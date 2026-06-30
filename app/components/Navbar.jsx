"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, [pathname]); // Refresh login status on navigation

  useEffect(() => {
    if (!isAdminModalOpen) {
      setAdminEmail("");
      setAdminPassword("");
    }
  }, [isAdminModalOpen]);

  // Determine active tab based on pathname
  let activeTab = "home";
  if (pathname === "/") {
    activeTab = "home";
  } else if (pathname.startsWith("/lesson") || pathname.startsWith("/library")) {
    activeTab = "learn";
  } else if (pathname.startsWith("/stats")) {
    activeTab = "stats";
  } else if (pathname.startsWith("/profile")) {
    activeTab = "profile";
  } else if (pathname.startsWith("/admin")) {
    activeTab = "admin";
  }

  const tabs = [
    {
      id: "home",
      label: "Home",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      id: "learn",
      label: "Learn",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      id: "stats",
      label: "Stats",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
        </svg>
      ),
    },
    {
      id: "profile",
      label: isLoggedIn ? "Profile" : "Profil",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      id: "admin",
      label: "Admin",
      icon: <ShieldCheck className="w-6 h-6" />,
    },
  ];

  return (
    <>
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 max-w-md w-[calc(100%-2.5rem)] bg-white/10 backdrop-blur-xl border border-white/20 rounded-full py-2.5 px-3 shadow-2xl flex items-center justify-between z-50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              if (tab.id === "admin") {
                setIsAdminModalOpen(true);
                return;
              }
              if (tab.id === "profile") {
                if (!isLoggedIn) {
                  router.push("/login");
                } else {
                  router.push("/profile");
                }
                return;
              }
              if (tab.id === "stats") {
                router.push("/stats");
                return;
              }
              if (tab.id === "home") {
                router.push("/");
                return;
              }
              if (tab.id === "learn") {
                router.push("/library");
                return;
              }
            }}
            className={`flex items-center gap-2 py-2 px-4 rounded-full transition-all duration-300 ease-in-out cursor-pointer active:scale-95 ${
              activeTab === tab.id
                ? "bg-white/20 border border-white/20 text-white shadow-lg"
                : "text-white/60 hover:text-white/90 hover:bg-white/5"
            }`}
          >
            {tab.icon}
            {activeTab === tab.id && (
              <span className="text-xs font-semibold tracking-wider transition-all duration-300">
                {tab.label}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Admin Authentication Modal */}
      <AnimatePresence>
        {isAdminModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAdminModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xl z-50 cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-6 top-1/2 -translate-y-1/2 mx-auto max-w-sm w-[90%] bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl z-50 flex flex-col gap-4 overflow-hidden backdrop-blur-xl"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500 to-indigo-500 opacity-10 blur-3xl pointer-events-none" />

              <div className="flex justify-between items-center w-full z-10">
                <div className="flex flex-col">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="w-4.5 h-4.5 text-purple-400" /> Admin
                    Auth
                  </h3>
                  <span className="text-[10px] text-white/50 font-semibold mt-1">
                    Akses terbatas untuk Administrator
                  </span>
                </div>
                <button
                  onClick={() => setIsAdminModalOpen(false)}
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

              <div className="flex flex-col gap-3 mt-2 z-10">
                <input
                  type="text"
                  placeholder="Email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  autoComplete="off"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-4 text-xs text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500/50 transition-all shadow-inner"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  autoComplete="new-password"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-4 text-xs text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500/50 transition-all shadow-inner"
                />
                <button
                  onClick={() => {
                    if (
                      adminEmail.toLowerCase() === "admin@example.com" &&
                      adminPassword === "admin123"
                    ) {
                      localStorage.setItem("userRole", "admin");
                      document.cookie = "userRole=admin; path=/";
                      localStorage.setItem("isLoggedIn", "true");
                      setIsAdminModalOpen(false);
                      router.push("/admin");
                    } else {
                      alert("Invalid credentials.");
                    }
                  }}
                  className="mt-2 w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 rounded-2xl py-3.5 text-xs font-bold text-white shadow-lg border border-white/10 transition-all active:scale-95 cursor-pointer"
                >
                  Login Admin
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) return;
    
    // Admin check
    if (email.toLowerCase() === "admin@example.com") {
      localStorage.setItem("userRole", "admin");
      document.cookie = "userRole=admin; path=/";
    } else {
      localStorage.setItem("userRole", "user");
      document.cookie = "userRole=user; path=/";
    }

    localStorage.setItem("isLoggedIn", "true");
    router.push("/");
  };

  const handleSocialLogin = () => {
    localStorage.setItem("userRole", "user");
    document.cookie = "userRole=user; path=/";
    localStorage.setItem("isLoggedIn", "true");
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white font-sans flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-500/20 blur-[120px] pointer-events-none" />

      {/* Back to Home Button */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-2 px-4 transition-all text-sm backdrop-blur-md"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Kembali
      </Link>

      <div className="max-w-md w-full bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
        {/* Glow behind card header */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center mb-8 relative z-10">
          <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-indigo-200">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-purple-200/60">
            Masuk untuk melanjutkan konsistensi belajarmu
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 relative z-10">
          <div>
            <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-purple-200/60 mb-2 pl-1">
              Alamat Email
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/10 transition-all text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white/20 hover:bg-white/30 border border-white/20 text-white rounded-2xl py-3.5 px-4 font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-[0.98]"
          >
            Lanjutkan
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6 relative z-10">
          <div className="flex-1 border-t border-white/10"></div>
          <span className="px-3 text-xs text-white/40 font-medium tracking-wider uppercase font-semibold">atau</span>
          <div className="flex-1 border-t border-white/10"></div>
        </div>

        {/* Social Logins */}
        <div className="space-y-3 relative z-10">
          <button
            onClick={handleSocialLogin}
            className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl py-3.5 px-4 font-medium transition-all flex items-center justify-center gap-3 cursor-pointer active:scale-[0.98]"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Lanjutkan dengan Google
          </button>

          <button
            onClick={handleSocialLogin}
            className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl py-3.5 px-4 font-medium transition-all flex items-center justify-center gap-3 cursor-pointer active:scale-[0.98]"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Lanjutkan dengan X
          </button>
        </div>
      </div>
    </main>
  );
}

"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { BhoomiLogo } from "@/components/shared/BhoomiLogo";
import { toast } from "sonner";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: email.trim(),
        password: password.trim(),
      });

      if (res?.error) {
        toast.error(res.error || "Invalid administrator credentials");
      } else {
        toast.success("Welcome back to Prime Nagpur Portal!");
        router.push("/admin");
      }
    } catch (err: any) {
      toast.error("An unexpected error occurred during authentication.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-2xl p-8 sm:p-10 rounded-3xl shadow-2xl border border-slate-800 relative z-10">
        <div className="text-center mb-8 flex flex-col items-center">
          <BhoomiLogo size="lg" theme="dark" className="mb-4" />
          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-mono-custom tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>SECURE ADMINISTRATIVE CONSOLE</span>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-xs font-mono-custom text-slate-400 block mb-2">
              ADMIN EMAIL ADDRESS
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@primenagpurproperties.com"
                className="w-full bg-slate-950 border border-slate-700 text-white pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:border-amber-400 transition-colors"
                autoComplete="email"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono-custom text-slate-400 block mb-2">
              SECURITY PASSWORD
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••••••"
                className="w-full bg-slate-950 border border-slate-700 text-white pl-10 pr-10 py-3 rounded-xl text-sm focus:outline-none focus:border-amber-400 transition-colors"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <MagneticButton type="submit" disabled={loading} variant="primary" size="lg" className="w-full shadow-lg">
            {loading ? "Verifying Credentials..." : "Sign In to Management Portal"}
          </MagneticButton>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-800 text-center">
          <p className="text-[11px] text-slate-500">
            Encrypted Session · IP Whitelist Protected · SSL 256-bit
          </p>
        </div>
      </div>
    </div>
  );
}

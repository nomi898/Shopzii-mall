"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";
import PasswordStrength from "@/components/PasswordStrength";

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = (await res.json().catch(() => null)) as
        | { ok: true; data: unknown }
        | { ok: false; error?: { message?: string } }
        | null;

      if (!res.ok || !data || (data as any).ok === false) {
        const msg =
          (data as any)?.error?.message ||
          (res.status === 409
            ? "User already exists."
            : "Failed to create account. Please try again.");
        setError(msg);
        setLoading(false);
        return;
      }

      // Auto sign in after successful signup
      const result = await signIn("credentials", {
        redirect: false,
        email: email.trim(),
        password,
      });

      if (result?.error) {
        setError("Account created but sign in failed. Please try logging in.");
        setLoading(false);
        return;
      }

      // Show loading animation before redirect
      await wait(500);
      router.push("/");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6 pb-24">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 text-center">
            Sign Up
          </h1>
          <p className="mt-2 text-center text-sm text-gray-500">
            Create your account to continue
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-400"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative mt-2">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-12 outline-none focus:border-purple-400"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              <PasswordStrength password={password} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative mt-2">
                <input
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-12 outline-none focus:border-purple-400"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              {confirm && password !== confirm && (
                <p className="mt-1 text-xs text-red-600">
                  Passwords do not match
                </p>
              )}
            </div>

            {error ? (
              <p className="text-sm text-red-600">{error}</p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-purple-600 text-white font-semibold py-3 shadow-sm disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <LoadingSpinner size={18} />
                  <span>Creating account...</span>
                </>
              ) : (
                "Create Account"
              )}
            </button>

            <Link
              href="/"
              className="block w-full text-center rounded-xl border border-gray-200 text-gray-800 font-semibold py-3 hover:bg-gray-50"
            >
              Back to Sign In
            </Link>
          </form>
        </div>
      </div>
    </main>
  );
}



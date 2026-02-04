"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setAuthUser } from "@/lib/auth";

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }
    if (password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    await wait(700);
    setAuthUser({ status: "user", email: email.trim() });
    router.push("/");
    router.refresh();
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
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-400"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="••••••••"
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-400"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                type="password"
                placeholder="••••••••"
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-400"
                disabled={loading}
              />
            </div>

            {error ? (
              <p className="text-sm text-red-600">{error}</p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-purple-600 text-white font-semibold py-3 shadow-sm disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create Account"}
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



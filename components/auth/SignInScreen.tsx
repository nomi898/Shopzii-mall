"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { signIn, signOut } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";
import { setAuthUser } from "@/lib/auth";
import LoadingSpinner from "@/components/LoadingSpinner";
import GuestNameModal from "@/components/modals/GuestNameModal";

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

const REMEMBER_EMAIL_KEY = "shopzii_remember_email";
const REMEMBER_CHECKED_KEY = "shopzii_remember_checked";

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showGuestModal, setShowGuestModal] = useState(false);

  // Load remembered email on mount
  useEffect(() => {
    const remembered = localStorage.getItem(REMEMBER_CHECKED_KEY) === "true";
    if (remembered) {
      const savedEmail = localStorage.getItem(REMEMBER_EMAIL_KEY);
      if (savedEmail) {
        setEmail(savedEmail);
        setRememberMe(true);
      }
    }
  }, []);

  async function onSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!email.trim()) {
      setLoading(false);
      setError("Please enter your email.");
      return;
    }

    if (!password) {
      setLoading(false);
      setError("Please enter your password.");
      return;
    }

    // Save email if remember me is checked
    if (rememberMe) {
      localStorage.setItem(REMEMBER_EMAIL_KEY, email.trim());
      localStorage.setItem(REMEMBER_CHECKED_KEY, "true");
    } else {
      localStorage.removeItem(REMEMBER_EMAIL_KEY);
      localStorage.removeItem(REMEMBER_CHECKED_KEY);
    }

    const result = await signIn("credentials", {
      redirect: false,
      email: email.trim(),
      password,
    });

    if (result?.error) {
      setLoading(false);
      setError("Invalid email or password.");
      return;
    }

    // Show loading animation before redirect
    await wait(500);
    router.push("/");
    router.refresh();
  }

  function onContinueAsGuest() {
    setShowGuestModal(true);
  }

  async function handleGuestSubmit(firstName: string, lastName: string) {
    // Sign out any existing NextAuth session first
    await signOut({ redirect: false });
    
    // Small delay for UX
    await wait(500);
    
    // Set guest mode with name
    setAuthUser({ status: "guest", firstName, lastName });
    
    router.push("/");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6 pb-24">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 text-center">
            Sign In
          </h1>
          <p className="mt-2 text-center text-sm text-gray-500">
            Sign in to continue to Shopzii Mall
          </p>

          <form onSubmit={onSignIn} className="mt-6 space-y-4">
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
                  autoComplete={rememberMe ? "current-password" : "off"}
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
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={loading}
                className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-700 cursor-pointer"
              >
                Remember me
              </label>
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
                  <span>Signing in...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>

            <Link
              href="/auth/signup"
              className="block w-full text-center rounded-xl border border-gray-200 text-gray-800 font-semibold py-3 hover:bg-gray-50"
            >
              Sign Up
            </Link>

            <button
              type="button"
              onClick={onContinueAsGuest}
              disabled={loading}
              className="w-full rounded-xl bg-gray-900 text-white font-semibold py-3 shadow-sm disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <LoadingSpinner size={18} />
                  <span>Loading...</span>
                </>
              ) : (
                "Continue as Guest"
              )}
            </button>
          </form>
        </div>
      </div>

      <GuestNameModal
        open={showGuestModal}
        onClose={() => setShowGuestModal(false)}
        onSubmit={handleGuestSubmit}
      />
    </main>
  );
}



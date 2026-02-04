"use client";

import { useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (firstName: string, lastName: string) => Promise<void>;
};

export default function GuestNameModal({ open, onClose, onSubmit }: Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!firstName.trim()) {
      setError("Please enter your first name.");
      return;
    }

    if (!lastName.trim()) {
      setError("Please enter your last name.");
      return;
    }

    setLoading(true);
    try {
      await onSubmit(firstName.trim(), lastName.trim());
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl p-6">
        <h2 className="text-xl font-bold text-gray-900 text-center">
          Continue as Guest
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          Please enter your name to continue
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              placeholder="John"
              autoComplete="given-name"
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-400"
              disabled={loading}
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              placeholder="Doe"
              autoComplete="family-name"
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-400"
              disabled={loading}
            />
          </div>

          {error ? (
            <p className="text-sm text-red-600">{error}</p>
          ) : null}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 rounded-xl border border-gray-200 text-gray-800 font-semibold py-3 hover:bg-gray-50 disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-xl bg-purple-600 text-white font-semibold py-3 shadow-sm disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <LoadingSpinner size={18} />
                  <span>Continuing...</span>
                </>
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

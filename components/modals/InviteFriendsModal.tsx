"use client";

import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  inviteCode: string;
};

export default function InviteFriendsModal({
  open,
  onClose,
  inviteCode,
}: Props) {
  const [copied, setCopied] = useState(false);

  if (!open) return null;

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(inviteCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Invite Friends</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-6 text-center text-sm text-gray-700">
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white text-2xl">
              <span>🎁</span>
            </div>
          </div>

          <div>
            <p className="text-base font-semibold text-gray-900">
              Share Your Invite Code
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Invite friends and earn rewards together
            </p>
          </div>

          <div className="rounded-2xl bg-gray-50 px-6 py-4 space-y-3">
            <p className="text-xs text-gray-500">Your Invite Code</p>
            <div className="flex items-center justify-between gap-3">
              <span className="text-3xl font-bold tracking-widest">
                {inviteCode}
              </span>
              <button
                type="button"
                onClick={onCopy}
                className="rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-4 py-2"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          <div>
            <p className="font-medium text-gray-900">Share with your friends</p>
            <p className="mt-1 text-xs text-gray-500">
              They can use this code to join and you both get rewards!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-3"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}



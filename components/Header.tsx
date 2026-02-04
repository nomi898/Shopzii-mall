"use client";

import { useAuthUser } from "@/hooks/useAuthUser";

export default function Header() {
  const { user } = useAuthUser();

  const displayName =
    user?.status === "guest"
      ? user.firstName && user.lastName
        ? `${user.firstName} ${user.lastName}`
        : "Guest"
      : user?.status === "user"
        ? user.email.split("@")[0]
        : "Guest";

  return (
    <div className="bg-blue-600 text-white pt-6 pb-20 px-6 rounded-b-3xl">
      <h1 className="text-xl font-semibold">Hi Welcome ✨</h1>
      <p className="text-sm opacity-90 mt-1">{displayName}</p>
    </div>
  );
}
  
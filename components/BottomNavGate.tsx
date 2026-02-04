"use client";

import { usePathname } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import { useAuthUser } from "@/hooks/useAuthUser";

export default function BottomNavGate() {
  const pathname = usePathname();
  const { user, hydrated } = useAuthUser();

  // Hide bottom navigation on auth screens
  if (pathname.startsWith("/auth")) return null;

  // Also hide when we're on the root sign-in gate (logged out),
  // because it uses the same route ("/") as home after login.
  if (pathname === "/" && hydrated && !user) return null;

  return <BottomNav />;
}



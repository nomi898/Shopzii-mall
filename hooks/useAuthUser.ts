"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { AuthUser, getAuthUser } from "@/lib/auth";

export function useAuthUser() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const sync = () => {
      if (status === "loading") return;

      const stored = getAuthUser();
      
      // Priority: Guest mode > NextAuth session > null
      if (stored?.status === "guest") {
        setUser(stored);
        setHydrated(true);
      } else if (status === "authenticated" && session?.user?.email) {
        setUser({ status: "user", email: String(session.user.email) });
        setHydrated(true);
      } else {
        setUser(null);
        setHydrated(true);
      }
    };

    sync();

    // Listen for guest auth changes
    window.addEventListener("storage", sync);
    window.addEventListener("shopzii-auth-changed", sync);

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("shopzii-auth-changed", sync);
    };
  }, [status, session]);

  return { user, hydrated };
}



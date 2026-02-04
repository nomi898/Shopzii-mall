"use client";

import { useEffect, useState } from "react";
import { AuthUser, getAuthUser } from "@/lib/auth";

export function useAuthUser() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const sync = () => setUser(getAuthUser());
    sync();
    setHydrated(true);

    window.addEventListener("storage", sync);
    window.addEventListener("shopzii-auth-changed", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("shopzii-auth-changed", sync);
    };
  }, []);

  return { user, hydrated };
}



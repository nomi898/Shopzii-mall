"use client";

import HomeScreen from "@/components/HomeScreen";
import SignInScreen from "@/components/auth/SignInScreen";
import { useAuthUser } from "@/hooks/useAuthUser";

export default function Home() {
  const { user, hydrated } = useAuthUser();

  if (!hydrated) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center pb-24">
        <div className="text-sm text-gray-500">Loading...</div>
      </main>
    );
  }

  if (!user) return <SignInScreen />;

  return <HomeScreen />;
}


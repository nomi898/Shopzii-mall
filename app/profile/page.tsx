"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ChevronRight,
  Gift,
  Info,
  Landmark,
  LogOut,
  PiggyBank,
  Wallet,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { clearAuthUser } from "@/lib/auth";
import { useAuthUser } from "@/hooks/useAuthUser";
import AboutUsModal from "@/components/modals/AboutUsModal";
import InviteFriendsModal from "@/components/modals/InviteFriendsModal";

const stats = [
  {
    title: "Today Profit",
    value: "$0.00",
    icon: PiggyBank,
    bg: "from-blue-50 to-blue-100",
  },
  {
    title: "Total Balance",
    value: "$0.00",
    icon: Wallet,
    bg: "from-green-50 to-green-100",
    valueClass: "text-red-500",
  },
  {
    title: "Orders",
    value: "(0 / 0)",
    icon: Landmark,
    bg: "from-pink-50 to-pink-100",
  },
];

const menuItems = [
  { label: "Deposit", icon: Wallet, href: "/deposit" as const },
  { label: "Withdraw", icon: PiggyBank, href: "/withdraw" as const },
  { label: "Withdrawal Account", icon: Landmark, href: "/withdraw" as const },
  { label: "About Us", icon: Info, href: null },
];

export default function ProfilePage() {
  const router = useRouter();
  const { user: authUser } = useAuthUser();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);

  const inviteCode = "267242"; // TODO: replace with backend-provided code

  const userName =
    authUser?.status === "guest"
      ? authUser.firstName && authUser.lastName
        ? `${authUser.firstName} ${authUser.lastName}`
        : "Guest"
      : authUser?.status === "user"
        ? authUser.email.split("@")[0]
        : "Guest";

  const user = {
    name: userName,
    code: "",
    creditReputation: "100%",
    badgeBalance: 0,
  };

  async function onLogout() {
    // Clear guest auth if exists
    clearAuthUser();
    // Sign out from NextAuth session
    await signOut({ redirect: false });
    router.push("/");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white pt-8 pb-20 px-6 shadow-md">
        <div className="max-w-4xl mx-auto flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full border-2 border-white/70 flex items-center justify-center">
              <span className="text-xl font-bold">G</span>
            </div>

            <div>
              <p className="text-2xl font-bold leading-tight">{user.name}</p>
              <div className="mt-1 text-sm text-white/90 space-y-0.5">
                <p>
                  <span className="opacity-90">Code:</span>{" "}
                  <span className="font-medium">{user.code || " "}</span>
                </p>
                <p>
                  <span className="opacity-90">Credit Reputation:</span>{" "}
                  <span className="font-semibold">{user.creditReputation}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <span className="inline-flex rounded-md bg-red-500 px-3 py-1 text-sm font-bold shadow">
              ${user.badgeBalance.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 -mt-12">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Stats */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className={`rounded-xl bg-gradient-to-br ${s.bg} p-4 shadow-md`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{s.title}</p>
                      <p
                        className={`mt-2 text-2xl font-bold text-gray-900 ${
                          s.valueClass ?? ""
                        }`}
                      >
                        {s.value}
                      </p>
                    </div>
                    <div className="h-10 w-10 rounded-xl bg-white/70 flex items-center justify-center shadow-sm">
                      <Icon className="text-blue-600" size={20} />
                    </div>
                  </div>
                </div>
              );
            })}
          </section>

          {/* Invite Friends */}
          <section className="rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 p-6 text-white shadow-md flex items-center justify-between">
            <div>
              <p className="text-lg font-bold">Invite Friends</p>
              <p className="text-sm text-white/90 mt-1">
                Invite friends to get rewards
              </p>
              <button
                type="button"
                onClick={() => setInviteOpen(true)}
                className="mt-4 inline-flex items-center justify-center rounded-md bg-white/90 px-5 py-2 text-sm font-semibold text-purple-700 shadow-sm"
              >
                Invite Now
              </button>
            </div>
            <div className="h-12 w-12 rounded-xl bg-white/15 flex items-center justify-center">
              <Gift className="text-white" size={26} />
            </div>
          </section>

          {/* Menu */}
          <section className="rounded-xl bg-white shadow-md overflow-hidden">
            {menuItems.map((item, idx) => {
              const Icon = item.icon;
              const isAbout = item.label === "About Us";

              const content = (
                <>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-gray-100 flex items-center justify-center">
                      <Icon className="text-blue-600" size={18} />
                    </div>
                    <span className="font-medium text-gray-900">
                      {item.label}
                    </span>
                  </div>
                  <ChevronRight className="text-gray-400" size={18} />
                </>
              );

              return (
                <div key={item.label}>
                  {isAbout ? (
                    <button
                      type="button"
                      onClick={() => setAboutOpen(true)}
                      className={`w-full flex items-center justify-between px-5 py-4 text-left ${
                        idx !== 0 ? "border-t" : ""
                      }`}
                    >
                      {content}
                    </button>
                  ) : (
                    <Link
                      href={item.href || "#"}
                      className={`flex items-center justify-between px-5 py-4 ${
                        idx !== 0 ? "border-t" : ""
                      }`}
                    >
                      {content}
                    </Link>
                  )}
                </div>
              );
            })}
          </section>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="w-full rounded-xl bg-pink-100 text-red-600 font-semibold py-4 shadow-sm flex items-center justify-center gap-2"
          >
            <LogOut size={18} />
            Log Out
          </button>
        </div>
      </div>

      <AboutUsModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
      <InviteFriendsModal
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        inviteCode={inviteCode}
      />
    </main>
  );
}



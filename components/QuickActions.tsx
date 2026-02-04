"use client";

import { useRouter } from "next/navigation";
import { ArrowUp, DollarSign, User, Gift } from "lucide-react";
import { useState } from "react";
import AboutUsModal from "@/components/modals/AboutUsModal";
import InviteFriendsModal from "@/components/modals/InviteFriendsModal";

const actions = [
  { title: "Deposit", icon: ArrowUp, bgColor: "bg-blue-500", href: "/deposit" },
  {
    title: "Withdraw",
    icon: DollarSign,
    bgColor: "bg-yellow-400",
    href: "/withdraw",
  },
  { title: "About Us", icon: User, bgColor: "bg-blue-500", href: null },
  { title: "Invite Friends", icon: Gift, bgColor: "bg-pink-500", href: null },
];

export default function QuickActions() {
  const router = useRouter();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);

  const inviteCode = "267242"; // TODO: replace with backend-provided code

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((a) => {
          const Icon = a.icon;
          const onClick = () => {
            if (a.title === "About Us") {
              setAboutOpen(true);
              return;
            }
            if (a.title === "Invite Friends") {
              setInviteOpen(true);
              return;
            }
            if (a.href) router.push(a.href);
          };

          return (
            <button
              type="button"
              key={a.title}
              onClick={onClick}
              className="
              bg-white
              rounded-2xl
              p-5
              flex flex-col items-center justify-center
              shadow-md
              hover:shadow-lg
              transition
              focus:outline-none
            "
            >
              {/* Icon */}
              <div
                className={`${a.bgColor} rounded-xl p-3 mb-2 ${
                  a.title === "Deposit" || a.title === "Invite Friends"
                    ? "rounded-lg"
                    : "rounded-full"
                }`}
              >
                <Icon className="text-white" size={24} />
              </div>

              {/* Text */}
              <p className="text-sm font-medium text-gray-700">{a.title}</p>
            </button>
          );
        })}
      </div>

      <AboutUsModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
      <InviteFriendsModal
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        inviteCode={inviteCode}
      />
    </>
  );
}
  
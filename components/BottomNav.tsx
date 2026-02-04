"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Clock,
  ClipboardList,
  Layers,
  User,
} from "lucide-react";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "History", href: "/history", icon: Clock },
  { label: "Start / Orders", href: "/orders", icon: ClipboardList },
  { label: "Services", href: "/services", icon: Layers },
  { label: "My Profile", href: "/profile", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 shadow-[0_-6px_20px_rgba(0,0,0,0.3)]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-5 py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex flex-col items-center justify-center gap-1"
              >
                {/* Icon */}
                <Icon
                  size={22}
                  className={
                    isActive ? "text-purple-500" : "text-gray-400"
                  }
                />

                {/* Label */}
                <span
                  className={`text-xs ${
                    isActive
                      ? "text-purple-500 font-medium"
                      : "text-gray-400"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

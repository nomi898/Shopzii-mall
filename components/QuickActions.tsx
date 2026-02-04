import { ArrowUp, DollarSign, User, Gift } from "lucide-react";

const actions = [
  { title: "Deposit", icon: ArrowUp, bgColor: "bg-blue-500" },
  { title: "Withdraw", icon: DollarSign, bgColor: "bg-yellow-400" },
  { title: "About Us", icon: User, bgColor: "bg-blue-500" },
  { title: "Invite Friends", icon: Gift, bgColor: "bg-pink-500" },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map((a) => {
        const Icon = a.icon;
        return (
          <div
            key={a.title}
            className="
              bg-white
              rounded-2xl
              p-5
              flex flex-col items-center justify-center
              shadow-md
              hover:shadow-lg
              transition
            "
          >
            {/* Icon */}
            <div className={`${a.bgColor} rounded-xl p-3 mb-2 ${a.title === "Deposit" || a.title === "Invite Friends" ? "rounded-lg" : "rounded-full"}`}>
              <Icon className="text-white" size={24} />
            </div>

            {/* Text */}
            <p className="text-sm font-medium text-gray-700">
              {a.title}
            </p>
          </div>
        );
      })}
    </div>
  );
}
  
import { ClipboardList, Lock } from "lucide-react";

const vipPlans = [
  {
    vip: "VIP 1",
    name: "Amazon",
    profit: "4%",
    min: 30.00,
    description: "Basic VIP level with 4% profit rate",
    color: "from-yellow-400 to-orange-500",
    logoColor: "text-black",
  },
  {
    vip: "VIP 2",
    name: "Alibaba",
    profit: "8%",
    min: 499.00,
    description: "Medium VIP level with 8% profit rate",
    color: "from-orange-500 to-red-500",
    logoColor: "text-orange-500",
  },
  {
    vip: "VIP 3",
    name: "AliExpress",
    profit: "12%",
    min: 900.00,
    description: "Premium VIP level with 12% profit rate",
    color: "from-pink-500 to-rose-500",
    logoColor: "text-red-500",
  },
];

const currentBalance = 0.00;
const currentVipLevel = 0;

export default function OrdersPage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      {/* Blue Header Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white pt-6 pb-20 px-6 rounded-b-3xl">
        <h1 className="text-2xl font-bold mb-2">VIP Services</h1>
        <p className="text-sm opacity-90">Upgrade your VIP level to earn more profits</p>
      </div>

      <div className="px-6 -mt-12 space-y-6">
        {/* Current Status Section */}
        <div className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Current Balance</p>
            <p className="text-xl font-bold text-gray-900">${currentBalance.toFixed(2)}</p>
          </div>
          <div className="bg-purple-600 rounded-lg px-4 py-3 text-center">
            <p className="text-white font-bold text-lg">VIP {currentVipLevel}</p>
            <p className="text-white/90 text-xs">Your VIP Level</p>
          </div>
        </div>

        {/* Available VIP Plans Section */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Available VIP Plans</h2>
          
          <div className="grid md:grid-cols-3 gap-4">
            {vipPlans.map((plan) => {
              const needed = Math.max(0, plan.min - currentBalance);
              const isLocked = currentBalance < plan.min;
              
              return (
                <div key={plan.vip} className="bg-white rounded-xl shadow-md overflow-hidden">
                  {/* Gradient Header */}
                  <div className={`bg-gradient-to-r ${plan.color} p-3 text-white relative`}>
                    <div className="flex justify-between text-sm font-medium">
                      <span className="bg-white/20 px-2 py-1 rounded">{plan.vip}</span>
                      <span className="bg-white/20 px-2 py-1 rounded">Profit {plan.profit}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4">
                    {/* Logo/Name */}
                    <div className="text-center mb-4">
                      <p className={`text-2xl font-bold ${plan.logoColor} mb-1`}>{plan.name}</p>
                      <p className="text-sm text-gray-600">{plan.description}</p>
                    </div>

                    {/* Balance Info */}
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Minimum Balance:</span>
                        <span className="font-semibold text-gray-900">${plan.min.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Your Balance:</span>
                        <span className="font-semibold text-red-500">${currentBalance.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Locked Button */}
                    <button
                      disabled={isLocked}
                      className={`w-full rounded-lg py-3 px-4 flex items-center justify-center gap-2 ${
                        isLocked
                          ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                          : "bg-purple-600 text-white"
                      }`}
                    >
                      <Lock size={18} />
                      <span className="font-medium">
                        {isLocked ? `Need $${needed.toFixed(2)} more to unlock` : "Unlocked"}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* How VIP Levels Work Section */}
        <section className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">How VIP Levels Work</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <span>VIP 1: Available when you have $30 or more in your balance</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <span>VIP 2: Available when you have $499 or more in your balance</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <span>VIP 3: Available when you have $900 or more in your balance</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <span>Higher VIP levels give you better profit percentages</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <span>When you unlock a higher VIP level, lower levels become locked</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <span>Your VIP level automatically upgrades when you reach the required balance</span>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}


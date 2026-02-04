const plans = [
  {
    vip: "VIP 1",
    name: "Amazon",
    profit: "4%",
    min: "$30.00",
    color: "from-yellow-400 to-orange-500",
    logoColor: "text-black",
  },
  {
    vip: "VIP 2",
    name: "Alibaba",
    profit: "8%",
    min: "$499.00",
    color: "from-orange-500 to-red-500",
    logoColor: "text-orange-500",
  },
  {
    vip: "VIP 3",
    name: "AliExpress",
    profit: "12%",
    min: "$900.00",
    color: "from-pink-500 to-rose-500",
    logoColor: "text-red-500",
  },
];

export default function VipPlans() {
  return (
    <section>
      <div className="flex justify-between mb-3">
        <h3 className="font-semibold text-lg">VIP Plans</h3>
        <span className="text-green-600 text-sm font-medium">Earn Profits</span>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {plans.map((p) => (
          <div key={p.vip} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className={`bg-gradient-to-r ${p.color} p-3 text-white`}>
              <div className="flex justify-between text-sm font-medium">
                <span className="bg-white/20 px-2 py-1 rounded">{p.vip}</span>
                <span className="bg-white/20 px-2 py-1 rounded">Profit {p.profit}</span>
              </div>
            </div>

            <div className="p-4 text-center">
              <p className={`text-2xl font-bold ${p.logoColor} mb-2`}>{p.name}</p>
              <p className="mt-3 text-sm text-gray-500">Minimum Balance</p>
              <p className="font-semibold text-gray-900">{p.min}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
  
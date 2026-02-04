const stats = [
  { value: "$2.5M+", label: "Total Paid", gradient: "from-pink-500 to-pink-600" },
  { value: "15K+", label: "Active Users", gradient: "from-purple-500 to-purple-600" },
  { value: "98%", label: "Success Rate", gradient: "from-yellow-400 to-yellow-500" },
  { value: "24/7", label: "Support", gradient: "from-green-500 to-green-600" },
];

export default function Stats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`rounded-2xl bg-gradient-to-br ${stat.gradient} p-6 shadow-md text-center text-white`}
        >
          <p className="text-3xl font-bold">{stat.value}</p>
          <p className="mt-2 text-sm opacity-90">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
  
  
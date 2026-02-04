import { CheckCircle2, DollarSign } from "lucide-react";

type Props = {
  total: number;
  todayProfit: number;
};

export default function HistoryStats({ total, todayProfit }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Total Completed Orders Card */}
      <div className="rounded-xl bg-white p-4 shadow flex items-center gap-4">
        <div className="bg-blue-500 rounded-full p-3">
          <CheckCircle2 className="text-white" size={24} />
        </div>
        <div>
          <h2 className="text-3xl font-bold">{total}</h2>
          <p className="text-sm text-gray-500">Total Completed Orders</p>
        </div>
      </div>

      {/* Today Profit Card */}
      <div className="rounded-xl bg-white p-4 shadow flex items-center gap-4">
        <div className="bg-green-500 rounded-full p-3">
          <DollarSign className="text-white" size={24} />
        </div>
        <div>
          <h2 className="text-3xl font-bold">${todayProfit.toFixed(2)}</h2>
          <p className="text-sm text-gray-500">Today Profit</p>
        </div>
      </div>
    </div>
  );
}
  
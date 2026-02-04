import { completedOrdersData } from "@/data/completedOrders";
import HistoryStats from "@/components/history/HistoryStats";
import EmptyHistory from "@/components/history/EmptyHistory";
import CompletedOrdersList from "@/components/history/CompletedOrdersList";
import { Clock } from "lucide-react";

export default function HistoryPage() {
  const { total, todayProfit, orders } = completedOrdersData;

  return (
    <main className="min-h-screen bg-gray-50 pb-24 px-6 pt-6">
      <div className="space-y-6">
        {/* Purple Header Banner */}
        <div className="rounded-xl bg-purple-600 p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-purple-500 rounded-full p-3">
              <Clock className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Completed Orders</h1>
              <p className="text-sm text-white/90">Your completed orders history</p>
            </div>
          </div>
          <div className="bg-purple-500 rounded-lg px-4 py-2">
            <span className="text-white text-sm font-medium">Total: {total} Orders</span>
          </div>
        </div>

        <HistoryStats total={total} todayProfit={todayProfit} />

        {orders.length === 0 ? (
          <EmptyHistory />
        ) : (
          <CompletedOrdersList orders={orders} />
        )}
      </div>
    </main>
  );
}

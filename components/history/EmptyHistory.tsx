import Link from "next/link";
import { FileText } from "lucide-react";

export default function EmptyHistory() {
  return (
    <div className="rounded-xl bg-white p-10 shadow flex flex-col items-center justify-center min-h-[400px]">
      <div className="bg-green-500 rounded-full p-4 mb-4">
        <FileText className="text-white" size={32} />
      </div>
      <p className="text-lg font-bold text-black mb-2">No completed orders</p>
      <p className="text-sm text-gray-500 mb-6">
        Your completed orders will appear here
      </p>

      <Link
        href="/orders"
        className="rounded-lg bg-purple-600 px-6 py-3 text-white font-medium"
      >
        Go to Orders
      </Link>
    </div>
  );
}

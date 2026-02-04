import { AlertCircle, Info, ShieldAlert } from "lucide-react";

export default function WithdrawPage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white pt-8 pb-16 px-6 shadow-md">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold">Withdraw Funds</h1>
          <p className="mt-1 text-sm text-white/90">User</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 -mt-10">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Order Status */}
          <section className="bg-white rounded-2xl shadow-md p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Order Status
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Completed Orders: 0 / 25
                </p>
              </div>
              <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                Not Eligible
              </span>
            </div>

            <div className="mt-2 h-1.5 rounded-full bg-gray-100 overflow-hidden">
              <div className="h-full w-0 bg-green-500" />
            </div>
            <p className="text-xs text-right text-gray-500">0 / 25</p>

            <div className="mt-3 flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">
              <AlertCircle size={14} />
              <span>You must complete 25 orders to withdraw</span>
            </div>
          </section>

          {/* Withdrawal Amount */}
          <section className="bg-white rounded-2xl shadow-md p-6 space-y-3">
            <p className="text-sm font-semibold text-gray-800">
              Withdrawal Amount (USDT)
            </p>
            <div className="rounded-xl border border-gray-200 overflow-hidden">
              <input
                type="number"
                min={0}
                defaultValue={0}
                className="w-full px-4 py-4 text-lg outline-none"
              />
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Minimum withdrawal: $10</span>
              <span>No maximum limit</span>
            </div>
          </section>

          {/* Wallet Address */}
          <section className="bg-white rounded-2xl shadow-md p-6 space-y-4">
            <p className="text-sm font-semibold text-gray-800">
              Your TRC20 Wallet Address
            </p>
            <input
              type="text"
              placeholder="Enter your TRC20 wallet address"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none"
            />
            <button className="w-full rounded-xl bg-blue-400 hover:bg-blue-500 text-white font-semibold py-3 shadow-sm">
              Save Wallet Address
            </button>
          </section>

          {/* Network */}
          <section className="bg-white rounded-2xl shadow-md p-6 space-y-3">
            <p className="text-sm font-semibold text-gray-800">Network</p>
            <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-blue-500 flex items-center justify-center">
                  <span className="text-xs font-semibold text-white">TRC</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    TRC20 Network
                  </p>
                  <p className="text-xs text-gray-600">
                    Only TRC20 USDT supported
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                Selected
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Info size={14} />
              <span>All withdrawals are processed through TRC20 network only</span>
            </div>
          </section>

          {/* Withdrawal Password */}
          <section className="bg-white rounded-2xl shadow-md p-6 space-y-3">
            <p className="text-sm font-semibold text-gray-800">
              Withdrawal Password
            </p>
            <input
              type="password"
              placeholder="Enter your withdrawal password"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none"
            />
          </section>

          {/* Submit Button */}
          <button className="w-full rounded-2xl bg-green-500 hover:bg-green-600 text-white font-semibold py-4 shadow-md">
            Submit Withdrawal Request
          </button>

          {/* Important Information */}
          <section className="rounded-2xl bg-yellow-50 border border-yellow-200 p-5 space-y-3 text-xs text-yellow-900">
            <div className="flex items-center gap-2 font-semibold">
              <ShieldAlert size={16} />
              <span>Important Information</span>
            </div>
            <ul className="space-y-1 list-disc list-inside">
              <li>Withdrawal processing time: 1-24 hours</li>
              <li>Minimum withdrawal amount: $10 USDT</li>
              <li>Network fees will be deducted from the withdrawal amount</li>
              <li>Only TRC20 network supported for withdrawals</li>
              <li>You must save your wallet address before withdrawing</li>
              <li>Complete 25 orders before withdrawing</li>
              <li>Wallet address cannot be changed once saved</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}



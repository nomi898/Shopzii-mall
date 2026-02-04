export default function DepositPage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white pt-8 pb-16 px-6 shadow-md">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold">Enter Deposit Amount</h1>
          <p className="mt-1 text-sm text-white/90">User</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 -mt-10">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Card */}
          <section className="bg-white rounded-2xl shadow-md p-6">
            <p className="text-sm font-semibold text-gray-800 mb-3">
              Enter Amount (USDT)
            </p>
            <div className="rounded-xl border border-gray-200 overflow-hidden">
              <input
                type="number"
                min={0}
                defaultValue={0}
                className="w-full px-4 py-4 text-lg outline-none"
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
              <span>Minimum deposit: $20</span>
              <span>No maximum limit</span>
            </div>
          </section>

          {/* Next button */}
          <button className="w-full rounded-2xl bg-blue-400 hover:bg-blue-500 text-white font-semibold py-4 shadow-md">
            Next Step
          </button>
        </div>
      </div>
    </main>
  );
}



export default function ServicesPage() {
  const faqs = [
    {
      q: "How quickly will I get a response?",
      a: "Our support team typically responds within 5-10 minutes during business hours.",
    },
    {
      q: "What issues can you help with?",
      a: "We can assist with account issues, transactions, technical problems, and general inquiries.",
    },
    {
      q: "Is the support available in multiple languages?",
      a: "Yes, we provide support in English, Spanish, and several other languages.",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      {/* Blue Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white pt-10 pb-16 px-6 shadow-md">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Online Customer Services
          </h1>
          <p className="mt-2 text-sm opacity-90">24/7 Support Available</p>
        </div>
      </div>

      <div className="px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="text-center text-sm text-gray-600">
            Get instant support from our customer service team. We&apos;re here to
            help you 24/7.
          </p>

          {/* Telegram Card */}
          <section className="bg-white rounded-xl shadow-md p-6 max-w-3xl mx-auto">
            <h2 className="text-center font-semibold text-gray-900">
              Contact Us on Telegram
            </h2>

            <a
              href="https://t.me/"
              target="_blank"
              rel="noreferrer"
              className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3 text-white font-semibold shadow-sm"
            >
              {/* Small "telegram-like" glyph */}
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-sm">
                ↗
              </span>
              Join Our Telegram Support
            </a>

            <p className="mt-3 text-center text-xs text-gray-500">
              Click above to connect with our support team instantly
            </p>
          </section>

          {/* Highlights */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-5 flex items-start gap-4">
              <div className="h-10 w-10 rounded-xl bg-green-100 flex items-center justify-center">
                <span className="text-green-600 font-bold">⏱</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Fast Response</p>
                <p className="text-sm text-gray-500">
                  Typically replies within 5 minutes
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-5 flex items-start gap-4">
              <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-bold">👥</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">24/7 Support</p>
                <p className="text-sm text-gray-500">
                  Available round the clock
                </p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-white rounded-xl shadow-md p-6 max-w-3xl mx-auto">
            <h2 className="text-lg font-bold text-gray-900">
              Frequently Asked Questions
            </h2>

            <div className="mt-4 divide-y">
              {faqs.map((item) => (
                <div key={item.q} className="py-4">
                  <p className="font-semibold text-gray-900">{item.q}</p>
                  <p className="mt-2 text-sm text-gray-600">{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}



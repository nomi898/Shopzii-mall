"use client";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function AboutUsModal({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">About Us</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-6 space-y-6 text-sm text-gray-700 max-h-[70vh] overflow-y-auto">
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl">
              <span>👤</span>
            </div>
          </div>

          <p className="text-center text-base font-semibold text-gray-900">
            Welcome to Our Platform
          </p>

          <section className="space-y-2">
            <p className="font-semibold text-gray-900">Terms and Conditions</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>
                By using our platform, you agree to comply with all applicable
                laws and regulations.
              </li>
              <li>
                Users must be at least 18 years old to create an account and use
                our services.
              </li>
              <li>
                All transactions are final and non-refundable unless otherwise
                specified.
              </li>
              <li>
                We reserve the right to modify or terminate services at any
                time.
              </li>
              <li>
                Users are responsible for maintaining the confidentiality of
                their account information.
              </li>
            </ol>
          </section>

          <section className="space-y-2">
            <p className="font-semibold text-gray-900">Privacy Policy</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>
                We collect only necessary information to provide our services.
              </li>
              <li>
                Your data is protected with industry-standard security measures.
              </li>
              <li>
                We do not share your personal information with third parties
                without your consent.
              </li>
              <li>
                You can request deletion of your data at any time by contacting
                support.
              </li>
            </ul>
          </section>

          <section className="space-y-1">
            <p className="font-semibold text-gray-900">Contact Information</p>
            <p>Email: support@example.com</p>
            <p>Business Hours: Mon–Fri, 9AM–6PM EST</p>
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}



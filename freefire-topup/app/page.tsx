"use client";

import { useState } from "react";

interface DiamondPackage {
  id: number;
  diamonds: number;
  bonus: number;
  price: number;
  popular?: boolean;
}

const packages: DiamondPackage[] = [
  { id: 1, diamonds: 100, bonus: 0, price: 80 },
  { id: 2, diamonds: 310, bonus: 31, price: 250, popular: true },
  { id: 3, diamonds: 520, bonus: 52, price: 400 },
  { id: 4, diamonds: 1060, bonus: 106, price: 800 },
  { id: 5, diamonds: 2180, bonus: 218, price: 1600 },
  { id: 6, diamonds: 5600, bonus: 560, price: 4000 },
];

const paymentMethods = [
  { id: "upi", name: "UPI", description: "Google Pay, PhonePe, Paytm" },
  { id: "card", name: "Credit/Debit Card", description: "Visa, Mastercard, Rupay" },
  { id: "wallet", name: "Wallets", description: "Paytm, Mobikwik, Freecharge" },
  { id: "netbanking", name: "Net Banking", description: "All major banks" },
];

export default function Home() {
  const [userId, setUserId] = useState("");
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  const handleContinue = () => {
    if (step === 1 && userId.length >= 6) {
      setStep(2);
    } else if (step === 2 && selectedPackage !== null) {
      setStep(3);
    } else if (step === 3 && selectedPayment !== null) {
      setStep(4);
    }
  };

  const selectedPkg = packages.find((pkg) => pkg.id === selectedPackage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-950 to-slate-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm border-b border-orange-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">FF</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Free Fire</h1>
                <p className="text-orange-400 text-sm">Top-up Centre</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-2 bg-orange-500/10 px-4 py-2 rounded-lg border border-orange-500/30">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-white text-sm">Instant Delivery</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        {step === 1 && (
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Get Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Diamonds</span> Now!
            </h2>
            <p className="text-gray-300 text-lg">Fast, secure, and instant delivery to your account</p>
          </div>
        )}

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    s === step
                      ? "bg-gradient-to-r from-orange-500 to-red-600 text-white scale-110"
                      : s < step
                      ? "bg-green-500 text-white"
                      : "bg-gray-700 text-gray-400"
                  }`}
                >
                  {s < step ? "✓" : s}
                </div>
                {s < 4 && (
                  <div
                    className={`w-12 sm:w-20 h-1 ${
                      s < step ? "bg-green-500" : "bg-gray-700"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-8 sm:space-x-16">
            <span className={`text-xs sm:text-sm ${step >= 1 ? "text-orange-400" : "text-gray-500"}`}>User ID</span>
            <span className={`text-xs sm:text-sm ${step >= 2 ? "text-orange-400" : "text-gray-500"}`}>Package</span>
            <span className={`text-xs sm:text-sm ${step >= 3 ? "text-orange-400" : "text-gray-500"}`}>Payment</span>
            <span className={`text-xs sm:text-sm ${step >= 4 ? "text-orange-400" : "text-gray-500"}`}>Confirm</span>
          </div>
        </div>

        {/* Step 1: User ID */}
        {step === 1 && (
          <div className="max-w-2xl mx-auto bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/20 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">Enter Your Free Fire ID</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">User ID</label>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter your Free Fire User ID"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                  maxLength={12}
                />
                <p className="text-gray-400 text-sm mt-2">Find your ID in-game profile</p>
              </div>
              <button
                onClick={handleContinue}
                disabled={userId.length < 6}
                className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-red-700 disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed transition-all transform hover:scale-105 disabled:scale-100"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Select Package */}
        {step === 2 && (
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">Choose Your Diamond Package</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg.id)}
                  className={`relative bg-black/40 backdrop-blur-sm rounded-2xl p-6 border-2 cursor-pointer transition-all transform hover:scale-105 ${
                    selectedPackage === pkg.id
                      ? "border-orange-500 shadow-lg shadow-orange-500/50"
                      : "border-gray-700 hover:border-orange-500/50"
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                      POPULAR
                    </div>
                  )}
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                      <span className="text-3xl">💎</span>
                    </div>
                    <h4 className="text-3xl font-bold text-white mb-2">{pkg.diamonds}</h4>
                    {pkg.bonus > 0 && (
                      <p className="text-green-400 text-sm mb-3">+{pkg.bonus} Bonus</p>
                    )}
                    <div className="text-2xl font-bold text-orange-400 mb-4">₹{pkg.price}</div>
                    <div className="text-gray-400 text-sm">
                      Total: {pkg.diamonds + pkg.bonus} Diamonds
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-center space-x-4">
              <button
                onClick={() => setStep(1)}
                className="px-8 py-3 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-all"
              >
                Back
              </button>
              <button
                onClick={handleContinue}
                disabled={selectedPackage === null}
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-red-700 disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed transition-all transform hover:scale-105 disabled:scale-100"
              >
                Continue to Payment
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Payment Method */}
        {step === 3 && (
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">Select Payment Method</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => setSelectedPayment(method.id)}
                  className={`bg-black/40 backdrop-blur-sm rounded-2xl p-6 border-2 cursor-pointer transition-all transform hover:scale-105 ${
                    selectedPayment === method.id
                      ? "border-orange-500 shadow-lg shadow-orange-500/50"
                      : "border-gray-700 hover:border-orange-500/50"
                  }`}
                >
                  <h4 className="text-xl font-bold text-white mb-2">{method.name}</h4>
                  <p className="text-gray-400 text-sm">{method.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-center space-x-4">
              <button
                onClick={() => setStep(2)}
                className="px-8 py-3 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-all"
              >
                Back
              </button>
              <button
                onClick={handleContinue}
                disabled={selectedPayment === null}
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-red-700 disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed transition-all transform hover:scale-105 disabled:scale-100"
              >
                Continue to Checkout
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Order Summary */}
        {step === 4 && selectedPkg && (
          <div className="max-w-2xl mx-auto bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/20 shadow-2xl">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">Order Summary</h3>
            <div className="space-y-6">
              <div className="bg-gray-900/50 rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">User ID:</span>
                  <span className="text-white font-bold">{userId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Package:</span>
                  <span className="text-white font-bold">
                    {selectedPkg.diamonds} + {selectedPkg.bonus} Diamonds
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Payment Method:</span>
                  <span className="text-white font-bold capitalize">
                    {paymentMethods.find((m) => m.id === selectedPayment)?.name}
                  </span>
                </div>
                <div className="border-t border-gray-700 pt-4 flex justify-between items-center">
                  <span className="text-xl text-gray-300">Total Amount:</span>
                  <span className="text-3xl font-bold text-orange-400">₹{selectedPkg.price}</span>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <p className="text-green-400 text-sm text-center">
                  ✓ Diamonds will be delivered instantly to your account
                </p>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 py-4 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-all"
                >
                  Back
                </button>
                <button
                  onClick={() => alert("Payment processing... This is a demo!")}
                  className="flex-1 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-red-700 transition-all transform hover:scale-105"
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-black/30 backdrop-blur-sm border-t border-orange-500/20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h4 className="text-white font-bold mb-3">About Us</h4>
              <p className="text-gray-400 text-sm">
                Official Free Fire diamond top-up centre. Fast, secure, and reliable service.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-3">Support</h4>
              <p className="text-gray-400 text-sm">24/7 Customer Support</p>
              <p className="text-gray-400 text-sm">Email: support@fftopup.com</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-3">Secure Payment</h4>
              <p className="text-gray-400 text-sm">
                All transactions are encrypted and secure. We accept all major payment methods.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            © 2025 Free Fire Top-up Centre. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

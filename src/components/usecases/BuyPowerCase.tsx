
import DashboardCard from "@/components/ui/DashboardCard";
import { Button } from "@/components/ui/button";

const BuyPowerCase = () => {
  return (
    <div className="space-y-6">
      <DashboardCard title="BuyPower - Utility Payment Platform">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-discrepay-700 mb-2">Who is BuyPower?</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>A utility payment company based in Nigeria</li>
              <li>Allows customers to buy electricity tokens online via mobile money, bank transfers, or card payments</li>
              <li>Aggregates payments from customers and pays electricity companies on behalf of users</li>
            </ul>
            <p className="mt-3 text-sm">
              <span className="font-medium">BuyPower is like a merchant + aggregator + payout operator</span> — they collect customer payments, 
              move money to utility companies, and need to track every payment, every settlement, every payout, and stay compliant.
            </p>
          </div>

          <div className="border-t border-b py-6">
            <h3 className="text-lg font-medium text-discrepay-700 mb-4">How Discrepay Helps BuyPower</h3>
            
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-md">
                <h4 className="font-medium text-discrepay-800 flex items-center">
                  <span className="bg-discrepay-600 text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">1</span>
                  BuyPower Connects to Discrepay
                </h4>
                <ul className="mt-2 list-disc pl-8 space-y-1 text-sm">
                  <li>BuyPower gives Discrepay access to:</li>
                  <ul className="list-circle pl-5 space-y-1">
                    <li>Payment processor APIs they use (e.g., Paystack, Flutterwave, Interswitch, Remita)</li>
                    <li>Bank APIs where they receive customer payments</li>
                    <li>Utility payout bank accounts where they send collected funds</li>
                  </ul>
                </ul>
                <p className="mt-2 text-sm font-medium text-discrepay-700">
                  ✓ Discrepay starts ingesting all payment and settlement events live.
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-md">
                <h4 className="font-medium text-discrepay-800 flex items-center">
                  <span className="bg-discrepay-600 text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">2</span>
                  Payment and Settlement Monitoring
                </h4>
                <div className="mt-2 text-sm">
                  <p>A customer buys ₦10,000 of electricity via Paystack.</p>
                  <p>Paystack processes it successfully.</p>
                  <p>BuyPower receives ₦9,700 (after fees) into their merchant bank account.</p>
                </div>
                <p className="mt-2 text-sm font-medium text-discrepay-700">
                  ✓ Discrepay tracks: Payment initiated → Payment processed → Settlement received.
                </p>
                <p className="text-sm font-medium text-discrepay-700">
                  ✓ Checks that the amount received matches what was expected (after known fees).
                </p>
                <p className="text-sm font-medium text-discrepay-700">
                  ✓ If settlement is delayed or wrong, Discrepay flags it immediately.
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-md">
                <h4 className="font-medium text-discrepay-800 flex items-center">
                  <span className="bg-discrepay-600 text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">3</span>
                  Payout Management to Utility Companies
                </h4>
                <div className="mt-2 text-sm">
                  <p>At the end of the day, BuyPower needs to pay ₦9.5M to Electricity Company A, ₦4.3M to Company B, etc.</p>
                  <p>Instead of manually doing bulk payouts, BuyPower uses Discrepay's Payment Initiation API to send the payouts.</p>
                </div>
                <p className="mt-2 text-sm font-medium text-discrepay-700">
                  ✓ Discrepay initiates the payouts via bank APIs (ACH transfers), tracks their success/failure,
                  and monitors if settlements land properly at the utility companies' accounts.
                </p>
                <p className="mt-2 text-sm font-medium text-discrepay-700">
                  ✓ No human uploading of CSVs anymore. 🚀
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-md">
                <h4 className="font-medium text-discrepay-800 flex items-center">
                  <span className="bg-discrepay-600 text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">4</span>
                  Compliance and Risk Monitoring
                </h4>
                <div className="mt-2 text-sm">
                  <p>Nigerian regulators (like CBN, EFCC) require strict monitoring of funds flow.</p>
                  <p>If someone tries to pay ₦5M in electricity in a weird pattern, or a vendor payout is unusually large...</p>
                </div>
                <p className="mt-2 text-sm font-medium text-discrepay-700">
                  ✓ Discrepay automatically flags high-risk transactions, scores payouts,
                  and prepares compliance reports (AML, suspicious transaction activity).
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-discrepay-700 mb-3">Why BuyPower Pays for Discrepay</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-3 rounded-md">
                <p className="font-medium">✓ Saves hours of finance team manual work</p>
                <p className="text-sm text-gray-600 mt-1">
                  Automates settlement tracking and reconciliation which would otherwise require multiple staff members
                </p>
              </div>
              <div className="bg-green-50 p-3 rounded-md">
                <p className="font-medium">✓ Reduces risk of lost or delayed settlements</p>
                <p className="text-sm text-gray-600 mt-1">
                  Automated monitoring ensures every naira is accounted for in real time
                </p>
              </div>
              <div className="bg-green-50 p-3 rounded-md">
                <p className="font-medium">✓ Improves trust with electricity companies and regulators</p>
                <p className="text-sm text-gray-600 mt-1">
                  Provides transparent audit trails and compliance documentation
                </p>
              </div>
              <div className="bg-green-50 p-3 rounded-md">
                <p className="font-medium">✓ Helps them scale without hiring huge operations teams</p>
                <p className="text-sm text-gray-600 mt-1">
                  Technology replaces the need for large financial operations staff as transaction volumes grow
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center pt-4">
            <Button size="lg" className="px-8">
              Request Demo
            </Button>
          </div>
        </div>
      </DashboardCard>
      
      <DashboardCard title="Funds Flow Visualization">
        <div className="py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="relative">
                {/* Customer */}
                <div className="absolute top-0 left-0">
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-blue-100 border-2 border-blue-300 flex items-center justify-center">
                      <svg className="w-10 h-10 text-discrepay-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <p className="mt-2 font-medium text-sm">Customer</p>
                  </div>
                </div>
                
                {/* Arrow Down */}
                <div className="absolute top-24 left-10 transform">
                  <svg className="w-6 h-20 text-discrepay-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
                
                {/* BuyPower */}
                <div className="absolute top-48 left-0">
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 rounded-lg bg-discrepay-100 border-2 border-discrepay-300 flex items-center justify-center p-2">
                      <div className="text-center">
                        <p className="font-bold text-discrepay-800">BuyPower</p>
                        <p className="text-xs text-discrepay-600 mt-1">Utility Payment Platform</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Paystack/Flutterwave */}
                <div className="absolute top-24 left-48 transform">
                  <div className="flex flex-col items-center w-48">
                    <div className="w-40 h-20 rounded-md bg-gray-100 border border-gray-300 flex items-center justify-center p-2">
                      <div className="text-center">
                        <p className="font-medium text-sm">Paystack/Flutterwave/Bank</p>
                        <p className="text-xs text-gray-600 mt-1">Payment Processors</p>
                      </div>
                    </div>
                    <svg className="w-8 h-10 text-discrepay-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                {/* Discrepay 1 */}
                <div className="absolute top-0 right-0">
                  <div className="flex flex-col items-center">
                    <div className="w-48 h-28 rounded-md bg-discrepay-600 text-white flex items-center justify-center p-3">
                      <div className="text-center">
                        <p className="font-bold">Discrepay</p>
                        <p className="text-xs mt-1">Tracks customer payment</p>
                        <p className="text-xs mt-1 font-medium">↓</p>
                        <p className="text-xs">Monitors for fraud + compliance</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Arrow Right */}
                <div className="absolute top-56 left-36">
                  <svg className="w-32 h-6 text-discrepay-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
                
                {/* Utility Company */}
                <div className="absolute top-48 right-0">
                  <div className="flex flex-col items-center">
                    <div className="w-36 h-32 rounded-lg bg-amber-100 border-2 border-amber-300 flex items-center justify-center p-2">
                      <div className="text-center">
                        <p className="font-bold text-amber-800">Utility Company</p>
                        <p className="text-xs text-amber-700 mt-1">Electricity Provider</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Discrepay 2 */}
                <div className="absolute bottom-0 left-48 transform">
                  <div className="flex flex-col items-center">
                    <div className="w-48 h-28 rounded-md bg-discrepay-600 text-white flex items-center justify-center p-3">
                      <div className="text-center">
                        <p className="font-bold">Discrepay</p>
                        <p className="text-xs mt-1">Initiates payouts</p>
                        <p className="text-xs mt-1 font-medium">+</p>
                        <p className="text-xs">Monitors utility settlement</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
};

export default BuyPowerCase;

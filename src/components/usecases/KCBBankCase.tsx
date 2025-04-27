
import { ArrowDown, Check, ShieldCheck, ClipboardCheck, TrendingUp } from "lucide-react";
import DashboardCard from "@/components/ui/DashboardCard";

const KCBBankCase = () => {
  return (
    <div className="mt-8 space-y-8">
      <div className="bg-white rounded-xl shadow-sm p-6 border">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 shrink-0 bg-gray-100 rounded-full flex items-center justify-center">
            <img 
              src="https://upload.wikimedia.org/wikipedia/en/thumb/1/19/KCB_Logo.svg/1200px-KCB_Logo.svg.png" 
              alt="KCB Bank Logo" 
              className="w-12 h-12 object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://via.placeholder.com/150?text=KCB";
              }}
            />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">KCB Bank Kenya</h2>
            <p className="text-gray-600 mt-1">
              Leading East African bank processing 5,000+ payments daily through multiple payment channels
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <DashboardCard title="Challenge">
            <div className="prose prose-sm max-w-none">
              <p>
                KCB Bank Kenya processes 5,000 payments daily for merchants, vendors, and customers through:
              </p>
              <ul className="space-y-2 mt-4">
                <li className="flex items-start">
                  <div className="mt-1 mr-2 w-5 h-5 bg-discrepay-100 rounded-full flex items-center justify-center text-discrepay-600">
                    <CreditCard className="w-3 h-3" />
                  </div>
                  <span>Card payments via Paystack</span>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-2 w-5 h-5 bg-discrepay-100 rounded-full flex items-center justify-center text-discrepay-600">
                    <Database className="w-3 h-3" />
                  </div>
                  <span>Bank-to-bank transfers via their Core Banking System (CBS)</span>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-2 w-5 h-5 bg-discrepay-100 rounded-full flex items-center justify-center text-discrepay-600">
                    <Wallet className="w-3 h-3" />
                  </div>
                  <span>Mobile money payouts via M-Pesa API</span>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-2 w-5 h-5 bg-discrepay-100 rounded-full flex items-center justify-center text-discrepay-600">
                    <Banknote className="w-3 h-3" />
                  </div>
                  <span>Incoming SWIFT transfers from abroad</span>
                </li>
              </ul>
              
              <h4 className="font-semibold mt-6 mb-3 text-red-700">The Problem:</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="mt-1 mr-2 w-5 h-5 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                    <ArrowDown className="w-3 h-3" />
                  </div>
                  <span>Settlements are frequently delayed without visibility</span>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-2 w-5 h-5 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                    <ArrowDown className="w-3 h-3" />
                  </div>
                  <span>Funds don't match the payments initiated</span>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-2 w-5 h-5 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                    <ArrowDown className="w-3 h-3" />
                  </div>
                  <span>Finance teams manually download statements from multiple systems for reconciliation</span>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-2 w-5 h-5 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                    <ArrowDown className="w-3 h-3" />
                  </div>
                  <span>Compliance (AML monitoring) is painful and reactive</span>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-2 w-5 h-5 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                    <ArrowDown className="w-3 h-3" />
                  </div>
                  <span>Audit preparation takes months of manual effort</span>
                </li>
              </ul>
            </div>
          </DashboardCard>
          
          <DashboardCard title="How Discrepay Helps">
            <div className="space-y-6">
              <div className="border-l-4 border-discrepay-500 pl-4 py-1">
                <h4 className="font-semibold text-discrepay-800">Step 1: Connection</h4>
                <p className="text-gray-600 mt-1">
                  KCB connects payment processors and bank systems to Discrepay APIs
                  (Paystack, M-Pesa, internal CBS, SWIFT gateway).
                </p>
                <div className="mt-2 flex items-center text-green-700 font-medium">
                  <Check className="w-4 h-4 mr-1" /> 
                  <span>Discrepay sees every payment KCB initiates — live</span>
                </div>
              </div>
              
              <div className="border-l-4 border-discrepay-500 pl-4 py-1">
                <h4 className="font-semibold text-discrepay-800">Step 2: Monitoring Funds Flow</h4>
                <p className="text-gray-600 mt-1">
                  When KCB initiates a vendor payout through M-Pesa, Discrepay tracks the full 
                  payment lifecycle from instruction to settlement.
                </p>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center text-green-700 font-medium">
                    <Check className="w-4 h-4 mr-1" /> 
                    <span>Discrepay matches instruction → execution → settlement</span>
                  </div>
                  <div className="flex items-center text-green-700 font-medium">
                    <Check className="w-4 h-4 mr-1" /> 
                    <span>Money discrepancies flagged instantly</span>
                  </div>
                </div>
              </div>
              
              <div className="border-l-4 border-discrepay-500 pl-4 py-1">
                <h4 className="font-semibold text-discrepay-800">Step 3: Compliance and Fraud Detection</h4>
                <p className="text-gray-600 mt-1">
                  Discrepay identifies unusual payment patterns and potential compliance issues
                  in real-time, before they become problems.
                </p>
                <div className="mt-2 flex items-center text-green-700 font-medium">
                  <Check className="w-4 h-4 mr-1" /> 
                  <span>Compliance team gets real-time alerts, not 3 months later</span>
                </div>
              </div>
              
              <div className="border-l-4 border-discrepay-500 pl-4 py-1">
                <h4 className="font-semibold text-discrepay-800">Step 4: Reporting and Dashboards</h4>
                <p className="text-gray-600 mt-1">
                  KCB's finance, compliance, and treasury teams access comprehensive dashboards
                  with real-time insights and audit-ready reports.
                </p>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center text-green-700 font-medium">
                    <Check className="w-4 h-4 mr-1" /> 
                    <span>Audit-ready reports without manual effort</span>
                  </div>
                  <div className="flex items-center text-green-700 font-medium">
                    <Check className="w-4 h-4 mr-1" /> 
                    <span>Automatic daily reports to inbox or systems</span>
                  </div>
                </div>
              </div>
            </div>
          </DashboardCard>
        </div>
        
        <div className="space-y-6">
          <DashboardCard title="Results">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mr-3 mt-1">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium">Automated Reconciliation</h4>
                  <p className="text-sm text-gray-600">
                    Manual Excel reconciliation replaced with automated fund flow matching across systems
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-3 mt-1">
                  <ClipboardCheck className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium">Real-Time Settlement Tracking</h4>
                  <p className="text-sm text-gray-600">
                    Missing settlements flagged instantly instead of days later
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-3 mt-1">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium">Proactive Fraud Detection</h4>
                  <p className="text-sm text-gray-600">
                    Fraud risks detected real-time, before damage is done
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-3 mt-1">
                  <FileText className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium">Simplified Compliance</h4>
                  <p className="text-sm text-gray-600">
                    Compliance reporting reduced from months to clicks
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-3 mt-1">
                  <Database className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium">Unified System View</h4>
                  <p className="text-sm text-gray-600">
                    Connected view across M-Pesa, SWIFT, CBS, and Paystack
                  </p>
                </div>
              </div>
            </div>
          </DashboardCard>
          
          <DashboardCard title="Quote">
            <div className="italic text-gray-600 border-l-4 pl-4 py-2 border-gray-200">
              "Discrepay gives us complete visibility into our payment operations. What used to take our 
              finance team days now happens automatically, and we catch settlement issues before they 
              impact our customers."
              <div className="mt-2 text-discrepay-800 font-medium not-italic">
                - Head of Treasury Operations, KCB Bank
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
};

export default KCBBankCase;

// Add missing imports
import { CreditCard, Database, Wallet, Banknote } from "lucide-react";

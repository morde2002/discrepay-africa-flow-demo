
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import DashboardCard from "@/components/ui/DashboardCard";
import { ArrowRight, Check, Shield, FileText as FileTextIcon } from "lucide-react";

const KCBBankCase = () => {
  return (
    <div className="space-y-6">
      <Card className="border-discrepay-100 bg-gradient-to-r from-gray-50 to-white">
        <CardContent className="p-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">KCB Bank Kenya + Discrepay</h2>
            <p className="text-muted-foreground">
              How a major East African bank streamlined payment operations and compliance
            </p>
          </div>

          <div className="bg-white rounded-md border p-4 mb-6">
            <h3 className="font-medium mb-2">Challenge:</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Processing 5,000+ daily payments across multiple platforms (Paystack, M-Pesa, SWIFT)</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Manual reconciliation by finance teams through disconnected systems</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Delayed detection of settlement issues and compliance violations</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Time-consuming audit preparation and compliance reporting</span>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50 p-4 rounded-md border border-green-100">
              <h3 className="font-medium text-green-800 flex items-center mb-2">
                <Check className="h-4 w-4 mr-1" />
                Connection
              </h3>
              <p className="text-sm">Connected payment processors and bank systems to Discrepay APIs (Paystack, M-Pesa, CBS, SWIFT)</p>
            </div>
            <div className="bg-green-50 p-4 rounded-md border border-green-100">
              <h3 className="font-medium text-green-800 flex items-center mb-2">
                <Check className="h-4 w-4 mr-1" />
                Monitoring
              </h3>
              <p className="text-sm">Automated tracking of payment instruction → execution → settlement across all channels</p>
            </div>
            <div className="bg-green-50 p-4 rounded-md border border-green-100">
              <h3 className="font-medium text-green-800 flex items-center mb-2">
                <Check className="h-4 w-4 mr-1" />
                Compliance
              </h3>
              <p className="text-sm">Real-time fraud detection and compliance monitoring with automated alerts</p>
            </div>
          </div>

          <h3 className="font-medium mb-3">Before vs After Discrepay:</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="pb-2 text-left font-medium">Before Discrepay</th>
                  <th className="pb-2 text-left font-medium">After Discrepay</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 pr-4">Manual reconciliation using Excel</td>
                  <td className="py-3 text-green-700">Automated fund flow matching live across systems</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 pr-4">Missing settlements caught days later</td>
                  <td className="py-3 text-green-700">Missing settlements flagged instantly</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 pr-4">Fraud found after damage is done</td>
                  <td className="py-3 text-green-700">Fraud risks detected real-time, proactively</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 pr-4">Compliance reporting took months</td>
                  <td className="py-3 text-green-700">Compliance monitoring and reports ready in clicks</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4">Multiple disconnected systems</td>
                  <td className="py-3 text-green-700">Unified dashboard with complete visibility</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard title="KCB Bank Daily Workflow with Discrepay">
          <div className="space-y-4 p-2">
            <div className="flex">
              <div className="bg-discrepay-100 rounded-full w-8 h-8 flex items-center justify-center text-discrepay-600 font-medium shrink-0">
                1
              </div>
              <div className="ml-3">
                <h4 className="font-medium">Login and Dashboard Overview</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  KCB finance team logs in and views real-time payment status across all channels
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="bg-discrepay-100 rounded-full w-8 h-8 flex items-center justify-center text-discrepay-600 font-medium shrink-0">
                2
              </div>
              <div className="ml-3">
                <h4 className="font-medium">Review Settlement Alerts</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Check for any delayed or failed settlements from previous day
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="bg-discrepay-100 rounded-full w-8 h-8 flex items-center justify-center text-discrepay-600 font-medium shrink-0">
                3
              </div>
              <div className="ml-3">
                <h4 className="font-medium">Initiate Daily Vendor Payouts</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Upload bulk payment file for 200+ vendor payments across M-Pesa and bank transfers
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="bg-discrepay-100 rounded-full w-8 h-8 flex items-center justify-center text-discrepay-600 font-medium shrink-0">
                4
              </div>
              <div className="ml-3">
                <h4 className="font-medium">Monitor Payment Processing</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Track real-time status of all initiated payments across processors
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="bg-discrepay-100 rounded-full w-8 h-8 flex items-center justify-center text-discrepay-600 font-medium shrink-0">
                5
              </div>
              <div className="ml-3">
                <h4 className="font-medium">Generate End-of-Day Reports</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Download reconciliation reports for accounting and export compliance data
                </p>
              </div>
            </div>
          </div>
        </DashboardCard>
        
        <DashboardCard title="Key Benefits for KCB Bank">
          <div className="space-y-3 p-2">
            <div className="flex items-start">
              <div className="mt-1 text-green-500 mr-2">
                <Check className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium">80% Reduction in Manual Reconciliation</h4>
                <p className="text-sm text-muted-foreground">
                  Finance team time freed up for strategic activities instead of Excel reconciliation
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mt-1 text-green-500 mr-2">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium">95% Faster Fraud Detection</h4>
                <p className="text-sm text-muted-foreground">
                  Potential issues identified within minutes instead of days or weeks
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mt-1 text-green-500 mr-2">
                <ArrowRight className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium">99.2% Settlement Match Rate</h4>
                <p className="text-sm text-muted-foreground">
                  Near-perfect visibility and matching of payments to settlements
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mt-1 text-green-500 mr-2">
                <FileTextIcon className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium">Audit-Ready in Minutes</h4>
                <p className="text-sm text-muted-foreground">
                  Compliance reports generated on-demand for Central Bank and auditors
                </p>
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default KCBBankCase;


import DashboardCard from "@/components/ui/DashboardCard";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const complianceData = [
  { name: "Compliant", value: 92 },
  { name: "Warning", value: 6 },
  { name: "Flagged", value: 2 },
];

const COLORS = ["#10B981", "#FBBF24", "#EF4444"];

const ComplianceDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <DashboardCard title="AML/KYC Status">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="md:col-span-2">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={complianceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={3}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {complianceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="md:col-span-3 space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Compliance Requirements</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>KYC Verification</span>
                    <span>98%</span>
                  </div>
                  <Progress value={98} className="h-1" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>AML Screening</span>
                    <span>100%</span>
                  </div>
                  <Progress value={100} className="h-1" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Fraud Detection</span>
                    <span>94%</span>
                  </div>
                  <Progress value={94} className="h-1" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Regulatory Reporting</span>
                    <span>100%</span>
                  </div>
                  <Progress value={100} className="h-1" />
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium mb-2">Nigerian Regulatory Compliance</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-green-50 p-2 rounded-md flex flex-col">
                  <span className="text-xs text-gray-600">CBN AML/CFT</span>
                  <span className="font-medium">Compliant</span>
                </div>
                <div className="bg-green-50 p-2 rounded-md flex flex-col">
                  <span className="text-xs text-gray-600">EFCC Act</span>
                  <span className="font-medium">Compliant</span>
                </div>
                <div className="bg-green-50 p-2 rounded-md flex flex-col">
                  <span className="text-xs text-gray-600">NDPR</span>
                  <span className="font-medium">Compliant</span>
                </div>
                <div className="bg-amber-50 p-2 rounded-md flex flex-col">
                  <span className="text-xs text-gray-600">NITDA Regs</span>
                  <span className="font-medium">Review Required</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardCard>

      <DashboardCard title="Transaction Risk Analysis">
        <div className="space-y-5">
          <div>
            <h4 className="text-sm font-medium mb-2">Risk Score Distribution</h4>
            <div className="bg-gray-100 h-4 w-full rounded-full overflow-hidden">
              <div className="flex h-full">
                <div className="bg-green-500 h-full" style={{ width: "70%" }}></div>
                <div className="bg-amber-500 h-full" style={{ width: "20%" }}></div>
                <div className="bg-red-500 h-full" style={{ width: "10%" }}></div>
              </div>
            </div>
            <div className="flex justify-between text-xs mt-1 text-gray-600">
              <span>Low Risk (70%)</span>
              <span>Medium Risk (20%)</span>
              <span>High Risk (10%)</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Notable Risks</h4>
            <div className="space-y-2">
              <div className="bg-red-50 p-3 rounded-md">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 mr-2"></div>
                  <div>
                    <h5 className="font-medium text-sm">Unusual Transaction Pattern</h5>
                    <p className="text-xs text-gray-600 mt-1">
                      Customer ID #45928 made multiple large electricity purchases (₦5M+) within 24 hours
                    </p>
                    <div className="flex mt-2">
                      <button className="text-discrepay-600 hover:underline text-xs mr-3">
                        Review Transaction
                      </button>
                      <button className="text-discrepay-600 hover:underline text-xs">
                        Flag as Suspicious
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-amber-50 p-3 rounded-md">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-1.5 mr-2"></div>
                  <div>
                    <h5 className="font-medium text-sm">Large Utility Payout</h5>
                    <p className="text-xs text-gray-600 mt-1">
                      Utility payment to Port Harcourt Electric is 250% higher than 3-month average
                    </p>
                    <div className="flex mt-2">
                      <button className="text-discrepay-600 hover:underline text-xs mr-3">
                        Verify Payment
                      </button>
                      <button className="text-discrepay-600 hover:underline text-xs">
                        Mark as Reviewed
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h4 className="text-sm font-medium mb-2">Scheduled Reports</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="border rounded-md p-2 flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span>CBN Monthly Report</span>
              </div>
              <div className="border rounded-md p-2 flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span>NFIU Quarterly Report</span>
              </div>
            </div>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
};

export default ComplianceDashboard;

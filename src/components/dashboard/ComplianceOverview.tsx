
import DashboardCard from "../ui/DashboardCard";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const complianceData = [
  { name: "Compliant", value: 85 },
  { name: "Warning", value: 10 },
  { name: "Flagged", value: 5 },
];

const COLORS = ["#10B981", "#FBBF24", "#EF4444"];

const ComplianceOverview = () => {
  return (
    <DashboardCard title="Compliance & Risk Overview" className="mt-6">
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
                  <span>92%</span>
                </div>
                <Progress value={92} className="h-1" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>AML Screening</span>
                  <span>97%</span>
                </div>
                <Progress value={97} className="h-1" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Fraud Detection</span>
                  <span>86%</span>
                </div>
                <Progress value={86} className="h-1" />
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
            <h4 className="text-sm font-medium mb-2">Recent Alerts</h4>
            <div className="space-y-2">
              <div className="bg-red-50 p-2 rounded text-xs">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  <span className="font-medium">High Risk Transaction</span>
                </div>
                <p className="text-gray-600 ml-4 mt-1">Transaction ID: TX123453 failed AML check</p>
              </div>
              <div className="bg-yellow-50 p-2 rounded text-xs">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="font-medium">Unusual Activity</span>
                </div>
                <p className="text-gray-600 ml-4 mt-1">Multiple large transfers detected from Account #AF392</p>
              </div>
              <div className="bg-green-50 p-2 rounded text-xs">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="font-medium">Report Complete</span>
                </div>
                <p className="text-gray-600 ml-4 mt-1">Monthly compliance report submitted successfully</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
};

export default ComplianceOverview;

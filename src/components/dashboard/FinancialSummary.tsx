import { ChartBar, ArrowRight } from "lucide-react";
import DashboardCard from "../ui/DashboardCard";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import FailureCauses from "./FailureCauses";
import SettlementMetrics from "./SettlementMetrics";

const data = [
  { name: "Jan", value: 1200000 },
  { name: "Feb", value: 1900000 },
  { name: "Mar", value: 3000000 },
  { name: "Apr", value: 2780000 },
  { name: "May", value: 1890000 },
  { name: "Jun", value: 2390000 },
  { name: "Jul", value: 3490000 },
];

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

const sparklineData = [
  { day: "Mon", value: 320 },
  { day: "Tue", value: 350 },
  { day: "Wed", value: 290 },
  { day: "Thu", value: 400 },
  { day: "Fri", value: 380 },
  { day: "Sat", value: 320 },
  { day: "Sun", value: 345 },
];

const MiniSparkline = () => (
  <div className="h-8 w-16">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={sparklineData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <Area type="monotone" dataKey="value" stroke="#0c8de4" fill="#e0eefe" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

const StatCard = ({ title, value, change, icon }: StatCardProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
          <div className="flex items-center gap-2">
            <div className={`text-xs mt-2 ${change >= 0 ? 'text-green-600' : 'text-red-600'} flex items-center`}>
              {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% from previous period
            </div>
            <MiniSparkline />
          </div>
        </div>
        <div className="p-2 bg-blue-50 text-discrepay-600 rounded-md">
          {icon}
        </div>
      </div>
      {(title === "Pending Settlements" || title === "Failed Transactions") && (
        <Button 
          variant="link" 
          className="mt-2 p-0 h-auto text-sm text-discrepay-600"
          onClick={() => navigate('/settlements')}
        >
          Investigate <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      )}
    </div>
  );
};

const FinancialSummary = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Transactions"
          value="$7.4M"
          change={12.8}
          icon={<ChartBar className="h-5 w-5" />}
        />
        <StatCard
          title="Pending Settlements"
          value="$345.2K"
          change={-2.3}
          icon={<Wallet className="h-5 w-5" />}
        />
        <StatCard
          title="Failed Transactions"
          value="$12.7K"
          change={-18.4}
          icon={<CreditCard className="h-5 w-5" />}
        />
        <StatCard
          title="Compliance Score"
          value="97%"
          change={3.2}
          icon={<ShieldCheck className="h-5 w-5" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DashboardCard 
            title="Financial Overview" 
            action={
              <select className="text-xs border rounded-md px-2 py-1">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            }
          >
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `$${value / 1000}k`}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`$${(value/1000).toFixed(1)}k`, 'Amount']}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#0c8de4"
                    fill="#e0eefe"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </DashboardCard>
        </div>

        <DashboardCard title="Settlement Status">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Bank Transfers</span>
                <span className="font-medium">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Mobile Money</span>
                <span className="font-medium">78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Card Payments</span>
                <span className="font-medium">96%</span>
              </div>
              <Progress value={96} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Cross-Border</span>
                <span className="font-medium">64%</span>
              </div>
              <Progress value={64} className="h-2" />
            </div>
            <div className="pt-4 border-t mt-4">
              <h4 className="font-medium mb-1">Settlement Summary</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-green-50 p-2 rounded">
                  <p className="text-green-700">Successfully Settled</p>
                  <p className="font-semibold mt-1">$6.8M (92%)</p>
                </div>
                <div className="bg-amber-50 p-2 rounded">
                  <p className="text-amber-700">Pending Settlement</p>
                  <p className="font-semibold mt-1">$345.2K (4.7%)</p>
                </div>
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

import { Wallet, CreditCard, ShieldCheck } from "lucide-react";

export default FinancialSummary;

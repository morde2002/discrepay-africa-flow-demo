
import DashboardCard from "@/components/ui/DashboardCard";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const settlementData = [
  { day: "Mon", paystack: 1200000, flutterwave: 980000, bank: 1350000 },
  { day: "Tue", paystack: 1300000, flutterwave: 1100000, bank: 980000 },
  { day: "Wed", paystack: 1500000, flutterwave: 1250000, bank: 1120000 },
  { day: "Thu", paystack: 1100000, flutterwave: 900000, bank: 1500000 },
  { day: "Fri", paystack: 1800000, flutterwave: 1300000, bank: 1250000 },
  { day: "Sat", paystack: 900000, flutterwave: 750000, bank: 820000 },
  { day: "Sun", paystack: 750000, flutterwave: 650000, bank: 780000 },
];

const SettlementMonitoring = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Total Settlements Today</p>
              <p className="text-2xl font-semibold mt-1">₦8.4M</p>
              <div className="text-xs mt-2 text-green-600 flex items-center">
                ↑ 12.8% from yesterday
              </div>
            </div>
            <div className="p-2 bg-blue-50 text-discrepay-600 rounded-md">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Settlement Rate</p>
              <p className="text-2xl font-semibold mt-1">97.3%</p>
              <div className="text-xs mt-2 text-green-600 flex items-center">
                ↑ 1.5% from average
              </div>
            </div>
            <div className="p-2 bg-blue-50 text-discrepay-600 rounded-md">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Missing Settlements</p>
              <p className="text-2xl font-semibold mt-1">₦245.7K</p>
              <div className="text-xs mt-2 text-red-600 flex items-center">
                ↑ 2.3% from yesterday
              </div>
            </div>
            <div className="p-2 bg-red-50 text-red-600 rounded-md">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Average Settlement Time</p>
              <p className="text-2xl font-semibold mt-1">4.2h</p>
              <div className="text-xs mt-2 text-amber-600 flex items-center">
                ↓ 12.5% improvement
              </div>
            </div>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-md">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DashboardCard
            title="Settlement Flow"
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
                  data={settlementData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `₦${value / 1000}k`}
                  />
                  <Tooltip
                    formatter={(value: number) => [`₦${(value/1000).toFixed(1)}k`, 'Amount']}
                  />
                  <Area
                    type="monotone"
                    dataKey="paystack"
                    stackId="1"
                    stroke="#0c8de4"
                    fill="#e0eefe"
                  />
                  <Area
                    type="monotone"
                    dataKey="flutterwave"
                    stackId="1"
                    stroke="#10B981"
                    fill="#D1FAE5"
                  />
                  <Area
                    type="monotone"
                    dataKey="bank"
                    stackId="1"
                    stroke="#8B5CF6"
                    fill="#EDE9FE"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center space-x-6 mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-discrepay-500 mr-2"></div>
                <span className="text-sm">Paystack</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm">Flutterwave</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                <span className="text-sm">Direct Bank</span>
              </div>
            </div>
          </DashboardCard>
        </div>

        <DashboardCard title="Settlement Status">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Paystack</span>
                <span className="font-medium">98%</span>
              </div>
              <Progress value={98} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Flutterwave</span>
                <span className="font-medium">96%</span>
              </div>
              <Progress value={96} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Interswitch</span>
                <span className="font-medium">94%</span>
              </div>
              <Progress value={94} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Direct Bank</span>
                <span className="font-medium">88%</span>
              </div>
              <Progress value={88} className="h-2" />
            </div>
            <div className="pt-4 border-t mt-4">
              <h4 className="font-medium mb-3">Latest Settlements</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Badge variant="outline" className="bg-green-100 text-green-800 mr-2">
                      Complete
                    </Badge>
                    <span>Paystack #PS948321</span>
                  </div>
                  <span>₦459,000</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Badge variant="outline" className="bg-amber-100 text-amber-800 mr-2">
                      Pending
                    </Badge>
                    <span>Flutterwave #FL123456</span>
                  </div>
                  <span>₦128,500</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Badge variant="outline" className="bg-red-100 text-red-800 mr-2">
                      Failed
                    </Badge>
                    <span>Direct Bank #BN785532</span>
                  </div>
                  <span>₦75,250</span>
                </div>
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default SettlementMonitoring;

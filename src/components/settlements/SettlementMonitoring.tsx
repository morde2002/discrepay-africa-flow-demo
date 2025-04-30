import React from "react";
import DashboardCard from "@/components/ui/DashboardCard";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend, LineChart, Line, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const settlementData = [
  { day: "Mon", paystack: 1200000, flutterwave: 980000, bank: 1350000 },
  { day: "Tue", paystack: 1300000, flutterwave: 1100000, bank: 980000 },
  { day: "Wed", paystack: 1500000, flutterwave: 1250000, bank: 1120000 },
  { day: "Thu", paystack: 1100000, flutterwave: 900000, bank: 1500000 },
  { day: "Fri", paystack: 1800000, flutterwave: 1300000, bank: 1250000 },
  { day: "Sat", paystack: 900000, flutterwave: 750000, bank: 820000 },
  { day: "Sun", paystack: 750000, flutterwave: 650000, bank: 780000 },
];

const totalByChannel = [
  { name: 'Paystack', value: settlementData.reduce((sum, d) => sum + d.paystack, 0) },
  { name: 'Flutterwave', value: settlementData.reduce((sum, d) => sum + d.flutterwave, 0) },
  { name: 'Bank', value: settlementData.reduce((sum, d) => sum + d.bank, 0) },
];
const COLORS = ['#0c8de4', '#10B981', '#8B5CF6'];
const dailyTotals = settlementData.map(d => ({ day: d.day, total: d.paystack + d.flutterwave + d.bank }));

// New data for line and radar
const hourlyData = Array.from({ length: 24 }, (_, i) => ({ hour: `${i}:00`, amount: Math.floor(Math.random() * 2000000) + 500000 }));
const channelScores = [
  { metric: 'Speed', Paystack: 85, Flutterwave: 75, Bank: 65 },
  { metric: 'Reliability', Paystack: 90, Flutterwave: 80, Bank: 70 },
  { metric: 'Support', Paystack: 80, Flutterwave: 85, Bank: 60 },
  { metric: 'Cost', Paystack: 70, Flutterwave: 65, Bank: 80 },
  { metric: 'Innovation', Paystack: 75, Flutterwave: 70, Bank: 85 },
];

const chartAnimation = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const SettlementMonitoring = () => (
  <div className="space-y-8">
    {/* Summary Cards color-coded */}
    <motion.div initial="hidden" animate="visible" variants={chartAnimation} transition={{ staggerChildren: 0.1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: 'Total Settlements Today', value: '₦8.4M', change: '↑ 12.8%', colorBg: 'bg-blue-100', colorText: 'text-blue-700' },
        { label: 'Settlement Rate', value: '97.3%', change: '↑ 1.5%', colorBg: 'bg-green-100', colorText: 'text-green-700' },
        { label: 'Missing Settlements', value: '₦245.7K', change: '↑ 2.3%', colorBg: 'bg-red-100', colorText: 'text-red-700' },
        { label: 'Avg Settlement Time', value: '4.2h', change: '↓ 12.5%', colorBg: 'bg-yellow-100', colorText: 'text-yellow-700' },
      ].map((c, idx) => (
        <div key={idx} className={`${c.colorBg} p-4 rounded-lg shadow-lg`}>          
          <p className="text-sm text-gray-600">{c.label}</p>
          <p className="text-2xl font-bold mt-1">{c.value}</p>
          <p className={`${c.colorText} text-xs mt-2`}>{c.change} from prev.</p>
        </div>
      ))}
    </motion.div>
     

    {/* Main Charts Section */}
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* Area Chart */}
      <DashboardCard title="Settlement Flow" action={<select className="text-xs border rounded px-2 py-1"><option>7d</option><option>30d</option><option>90d</option></select>}>
        <div className="h-64">
          <ResponsiveContainer>
            <AreaChart data={settlementData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis tickFormatter={v => `₦${v/1000}k`} />
              <Tooltip formatter={v => `₦${(v/1000).toFixed(1)}k`} />
              <Area type="monotone" dataKey="paystack" stroke={COLORS[0]} fill={`${COLORS[0]}33`} />
              <Area type="monotone" dataKey="flutterwave" stroke={COLORS[1]} fill={`${COLORS[1]}33`} />
              <Area type="monotone" dataKey="bank" stroke={COLORS[2]} fill={`${COLORS[2]}33`} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </DashboardCard>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="">
      <DashboardCard title="Settlement Status">
        <div className="space-y-4">
          {[
            { label: 'Paystack', value: 98 },
            { label: 'Flutterwave', value: 96 },
            { label: 'Interswitch', value: 94 },
            { label: 'Direct Bank', value: 88 },
          ].map((item, idx) => (
            <div key={idx}>
              <div className="flex justify-between text-sm mb-1">
                <span>{item.label}</span><span className="font-medium">{item.value}%</span>
              </div>
              <Progress value={item.value} className="h-2" />
            </div>
          ))}
          <div className="pt-4 border-t mt-4">
            <h4 className="font-medium mb-3">Latest Settlements</h4>
            <div className="space-y-2">
              {[
                { status: 'Complete', id: 'PS948321', amount: '₦459,000', color: 'green' },
                { status: 'Pending', id: 'FL123456', amount: '₦128,500', color: 'amber' },
                { status: 'Failed', id: 'BN785532', amount: '₦75,250', color: 'red' },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Badge variant="outline" className={`bg-${s.color}-100 text-${s.color}-800 mr-2`}>{s.status}</Badge>
                    <span>{`${s.status === 'Complete' ? 'Paystack' : s.status === 'Pending' ? 'Flutterwave' : 'Direct Bank'} #${s.id}`}</span>
                  </div>
                  <span>{s.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DashboardCard>
    </motion.div>

      {/* Bar Chart */}
      <DashboardCard title="Daily Totals">
        <div className="h-64">
          <ResponsiveContainer>
            <BarChart data={dailyTotals} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis tickFormatter={v => `₦${v/1000}k`} />
              <Tooltip formatter={v => `₦${(v/1000).toFixed(1)}k`} />
              <Bar dataKey="total" fill="#ff7f50" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </DashboardCard>

      {/* Pie Chart */}
      <DashboardCard title="Channel Share">
        <div className="h-64 flex justify-center items-center">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={totalByChannel} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {totalByChannel.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Legend verticalAlign="bottom" />
              <Tooltip formatter={v => `₦${(v/1000000).toFixed(2)}M`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </DashboardCard>
    </div>

    {/* New Graphs: LineChart and RadarChart */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Hourly Line Chart */}
      <DashboardCard title="Hourly Settlements">
        <div className="h-64">
          <ResponsiveContainer>
            <LineChart data={hourlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="4 4" />
              <XAxis dataKey="hour" />
              <YAxis tickFormatter={v => `₦${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={v => `₦${(v/1000).toFixed(1)}k`} />
              <Line type="monotone" dataKey="amount" stroke="#ffbb28" dot={{ r: 3 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </DashboardCard>

      {/* Radar Chart */}
      <DashboardCard title="Channel Performance Radar">
        <div className="h-64 flex justify-center items-center">
          <ResponsiveContainer>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={channelScores}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis angle={30} domain={[0,100]} />
              <Radar name="Paystack" dataKey="Paystack" stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.3} />
              <Radar name="Flutterwave" dataKey="Flutterwave" stroke={COLORS[1]} fill={COLORS[1]} fillOpacity={0.3} />
              <Radar name="Bank" dataKey="Bank" stroke={COLORS[2]} fill={COLORS[2]} fillOpacity={0.3} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </DashboardCard>
    </div>

    {/* Settlement Status */}
   
  </div>
);

export default SettlementMonitoring;
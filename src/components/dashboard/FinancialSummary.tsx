import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  ChartBar, Wallet, CreditCard, ShieldCheck,
  PieChart as PieIcon, Banknote, ArrowRight
} from 'lucide-react';
import DashboardCard from '../ui/DashboardCard';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

// ==================== Constants & Data ====================
const CHART_COLORS = ['#0c8de4', '#34d399', '#f59e0b', '#ef4444'];

const STATS_CONFIG = [
  { title: 'Total Transactions', value: '$7.4M', change: 12.8, bgClass: 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white', icon: <ChartBar className="h-5 w-5 text-white" />, link: null },
  { title: 'Pending Settlements', value: '$345.2K', change: -2.3, bgClass: 'bg-gradient-to-r from-[#EC4899] to-[#DB2777] text-white', icon: <Wallet className="h-5 w-5 text-white" />, link: null },
  { title: 'Failed Transactions', value: '$12.7K', change: -18.4, bgClass: 'bg-gradient-to-r from-[#EF4444] to-[#F472B6] text-white', icon: <CreditCard className="h-5 w-5 text-white" />, link: null },
  { title: 'Compliance Score', value: '97%', change: 3.2, bgClass: 'bg-gradient-to-r from-[#F97316] to-[#EF4444] text-white', icon: <ShieldCheck className="h-5 w-5 text-white" />, link: null }
];

const CHART_DATA = {
  monthlyVolume: [
    { name: 'Jan', value: 1200000 }, { name: 'Feb', value: 1900000 },
    { name: 'Mar', value: 3000000 }, { name: 'Apr', value: 2780000 },
    { name: 'May', value: 1890000 }, { name: 'Jun', value: 2390000 },
    { name: 'Jul', value: 3490000 }
  ],
  sparkline: [
    { day: 'Mon', value: 320 }, { day: 'Tue', value: 350 },
    { day: 'Wed', value: 290 }, { day: 'Thu', value: 400 },
    { day: 'Fri', value: 380 }, { day: 'Sat', value: 320 },
    { day: 'Sun', value: 345 }
  ],
  sources: [
    { name: 'Bank Transfer', value: 46 }, { name: 'Mobile Money', value: 25 },
    { name: 'Card Payment', value: 20 }, { name: 'Cross-Border', value: 9 }
  ],
  settlements: [
    { month: 'Jan', pending: 20000, completed: 180000 },
    { month: 'Feb', pending: 15000, completed: 210000 },
    { month: 'Mar', pending: 12000, completed: 240000 },
    { month: 'Apr', pending: 18000, completed: 200000 },
    { month: 'May', pending: 17000, completed: 230000 },
    { month: 'Jun', pending: 14000, completed: 250000 },
    { month: 'Jul', pending: 11000, completed: 270000 }
  ],
  flow: [
    { month: 'Jan', inflow: 45000, outflow: 38000 },
    { month: 'Feb', inflow: 52000, outflow: 42000 },
    { month: 'Mar', inflow: 48000, outflow: 45000 },
    { month: 'Apr', inflow: 62000, outflow: 51000 },
    { month: 'May', inflow: 58000, outflow: 48000 },
    { month: 'Jun', inflow: 72000, outflow: 56000 },
    { month: 'Jul', inflow: 66000, outflow: 61000 },
    { month: 'Aug', inflow: 75000, outflow: 66000 },
    { month: 'Sep', inflow: 82000, outflow: 71000 },
    { month: 'Oct', inflow: 90000, outflow: 73000 },
    { month: 'Nov', inflow: 86000, outflow: 78000 },
    { month: 'Dec', inflow: 95000, outflow: 84000 }
  ]
};

// ==================== Reusable Components ====================
const AnimatedContainer = ({ children, delay = 0 }) => (
  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay }}>
    {children}
  </motion.div>
);

const MiniSparkline = () => (
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart data={CHART_DATA.sparkline}>
      <Area type="monotone" dataKey="value" stroke={CHART_COLORS[0]} fill={CHART_COLORS[0]} fillOpacity={0.2} />
    </AreaChart>
  </ResponsiveContainer>
);

const StatCard = ({ title, value, change, icon, link, bgClass }, idx) => {
  const navigate = useNavigate();
  const trendColor = change >= 0 ? 'text-green-200' : 'text-red-200';
  const TrendArrow = change >= 0 ? '↑' : '↓';

  return (
    <AnimatedContainer delay={idx * 0.1}>
      <div className={`${bgClass} rounded-2xl shadow-lg p-4 flex flex-col justify-between h-full`}>
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium text-white/90">{title}</h3>
              <p className="text-2xl font-semibold mt-1 text-white">{value}</p>
            </div>
            <div className="p-2 bg-white bg-opacity-20 rounded-lg">{icon}</div>
          </div>
          <div className="flex items-center justify-between mt-4">
            {change != null && (
              <span className={`text-sm font-medium ${trendColor}`}>{TrendArrow} {Math.abs(change)}% from previous period</span>
            )}
            <div className="w-20 h-10"><MiniSparkline /></div>
          </div>
        </div>
        {link && (
          <Button variant="ghost" className="mt-4 text-sm w-full flex justify-between items-center text-white/90 hover:text-white" onClick={() => navigate(link)} aria-label={`View ${title} details`}>
            <span>View Details</span><ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
    </AnimatedContainer>
  );
};

// ==================== Main Component ====================
const FinancialSummary = () => (
  <div className="grid gap-6">
    {/* Stats */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {STATS_CONFIG.map((stat, idx) => (
        <StatCard key={stat.title} {...stat} idx={idx} />
      ))}
    </div>

    {/* Charts Section */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Monthly Volume */}
      <AnimatedContainer delay={0.2}>
        <DashboardCard title="Monthly Transaction Volume">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={CHART_DATA.monthlyVolume}>
              <defs>
                <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CHART_COLORS[1]} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={CHART_COLORS[1]} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" /><YAxis /><CartesianGrid strokeDasharray="3 3" /><Tooltip />
              <Area type="monotone" dataKey="value" stroke={CHART_COLORS[1]} fill="url(#volumeGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </DashboardCard>
      </AnimatedContainer>

      {/* Sources Breakdown */}
      <AnimatedContainer delay={0.4}>
        <DashboardCard title="Transaction Sources Breakdown">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={CHART_DATA.sources} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {CHART_DATA.sources.map((entry, idx) => <Cell key={idx} fill={CHART_COLORS[idx % CHART_COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </DashboardCard>
      </AnimatedContainer>

      {/* Settlement Status */}
      <AnimatedContainer delay={0.6}>
        <DashboardCard title="Settlement Status">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={CHART_DATA.settlements} barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="completed" stackId="a" fill={CHART_COLORS[0]} />
              <Bar dataKey="pending" stackId="a" fill={CHART_COLORS[2]} />
            </BarChart>
          </ResponsiveContainer>
        </DashboardCard>
      </AnimatedContainer>

      {/* Settlement Progress Overview */}
      <AnimatedContainer delay={0.8}>
        <DashboardCard title="Settlement Progress Overview">
          <div className="space-y-4">
            {[
              { label: 'Bank Transfers', value: 92 },
              { label: 'Mobile Money', value: 78 },
              { label: 'Card Payments', value: 96 },
              { label: 'Cross-Border', value: 64 }
            ].map(({ label, value }) => (
              <motion.div key={label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.9 }}>
                <div className="flex justify-between text-sm mb-1"><span>{label}</span><span className="font-medium">{value}%</span></div>
                <Progress value={value} className="h-2 bg-gray-100" />
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 1 }} className="pt-4 mt-4 border-t">
              <h4 className="font-medium mb-1">Settlement Summary</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-green-50 p-2 rounded"><p className="text-green-700">Successfully Settled</p><p className="font-semibold mt-1">$6.8M (92%)</p></div>
                <div className="bg-amber-50 p-2 rounded"><p className="text-amber-700">Pending Settlement</p><p className="font-semibold mt-1">$345.2K (4.7%)</p></div>
              </div>
            </motion.div>
          </div>
        </DashboardCard>
      </AnimatedContainer>

      {/* Daily Transaction Trends */}
      <AnimatedContainer delay={1.0}>
        <DashboardCard title="Daily Transaction Trends">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={CHART_DATA.sparkline}><XAxis dataKey="day" /><YAxis /><CartesianGrid strokeDasharray="3 3" /><Tooltip />
              <Line type="monotone" dataKey="value" stroke={CHART_COLORS[3]} strokeWidth={2} dot />
            </LineChart>
          </ResponsiveContainer>
        </DashboardCard>
      </AnimatedContainer>

      {/* Transaction Flow Chart */}
      <AnimatedContainer delay={1.2}>
        <DashboardCard title="Transaction Flow">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={CHART_DATA.flow} margin={{ top: 5, right: 30, left: 20, bottom: 5 }} barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="inflow" name="Inflow" fill={CHART_COLORS[1]} />
              <Bar dataKey="outflow" name="Outflow" fill={CHART_COLORS[3]} />
            </BarChart>
          </ResponsiveContainer>
        </DashboardCard>
      </AnimatedContainer>
    </div>
  </div>
);

export default FinancialSummary;

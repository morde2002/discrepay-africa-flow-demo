import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, Line, BarChart, Bar, PieChart, Pie, Cell,
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
  {
    title: 'Total Transactions', value: '$7.4M', change: 12.8,
    icon: <ChartBar className="h-5 w-5 text-blue-500" />, link: null
  },
  {
    title: 'Pending Settlements', value: '$345.2K', change: -2.3,
    icon: <Wallet className="h-5 w-5 text-teal-500" />, link: '/settlements'
  },
  {
    title: 'Failed Transactions', value: '$12.7K', change: -18.4,
    icon: <CreditCard className="h-5 w-5 text-red-500" />, link: '/failures'
  },
  {
    title: 'Compliance Score', value: '97%', change: 3.2,
    icon: <ShieldCheck className="h-5 w-5 text-green-500" />, link: null
  }
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
  ]
};

// ==================== Reusable Components ====================
const AnimatedContainer = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
  >
    {children}
  </motion.div>
);

const MiniSparkline = () => (
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart data={CHART_DATA.sparkline}>
      <Area
        type="monotone"
        dataKey="value"
        stroke={CHART_COLORS[0]}
        fill={CHART_COLORS[0]}
        fillOpacity={0.2}
      />
    </AreaChart>
  </ResponsiveContainer>
);

const StatCard = ({ title, value, change, icon, link }) => {
  const navigate = useNavigate();
  const trendColor = change >= 0 ? 'text-green-600' : 'text-red-600';
  const TrendArrow = change >= 0 ? '↑' : '↓';

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium text-gray-600">{title}</h3>
            <p className="text-2xl font-semibold mt-1 text-gray-900">{value}</p>
          </div>
          <div className="p-2 bg-opacity-10 bg-current rounded-lg">{icon}</div>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <span className={`text-sm font-medium ${trendColor}`}>
            {TrendArrow} {Math.abs(change)}% from previous period
          </span>
          <div className="w-20 h-10">
            <MiniSparkline />
          </div>
        </div>
      </div>

      {link && (
        <Button
          variant="ghost"
          className="mt-4 text-sm w-full flex justify-between items-center text-blue-600 hover:text-blue-700"
          onClick={() => navigate(link)}
          aria-label={`View ${title} details`}
        >
          <span>View Details</span>
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      )}
    </div>
  );
};

// ==================== Chart Components ====================
const FinancialOverviewChart = () => (
  <DashboardCard
    title="Financial Overview"
    action={
      <select className="text-xs border rounded-md px-2 py-1 bg-transparent">
        <option>Last 7 days</option>
        <option>Last 30 days</option>
        <option>Last 90 days</option>
      </select>
    }
  >
    <div className="h-72 md:h-80">
      <ResponsiveContainer>
        <AreaChart data={CHART_DATA.monthlyVolume}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tickLine={false} />
          <YAxis tickFormatter={v => `$${v / 1000}k`} tickLine={false} />
          <Tooltip formatter={v => [`$${(v / 1000).toFixed(1)}k`, 'Volume']} />
          <Area
            type="monotone"
            dataKey="value"
            stroke={CHART_COLORS[0]}
            fillOpacity={0.3}
            fill={CHART_COLORS[0]}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#2563eb"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </DashboardCard>
);

const SourcePieChart = () => (
  <DashboardCard title="Transaction Sources" icon={<PieIcon className="h-5 w-5 text-purple-500" />}>
    <div className="h-72 flex items-center justify-center">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={CHART_DATA.sources}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={40}
            paddingAngle={3}
          >
            {CHART_DATA.sources.map((_, idx) => (
              <Cell key={`cell-${idx}`} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </DashboardCard>
);

const SettlementTrendsChart = () => (
  <DashboardCard title="Settlement Trends" icon={<Banknote className="h-5 w-5 text-green-500" />}>
    <div className="h-72">
      <ResponsiveContainer>
        <BarChart data={CHART_DATA.settlements}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={v => `$${v / 1000}k`} />
          <Tooltip formatter={v => `$${v.toLocaleString()}`} />
          <Bar dataKey="completed" stackId="a" fill={CHART_COLORS[1]} name="Completed" />
          <Bar dataKey="pending" stackId="a" fill={CHART_COLORS[2]} name="Pending" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </DashboardCard>
);

// ==================== Main Component ====================
const FinancialSummary = () => (
  <div className="space-y-6 px-4 md:px-0">
    {/* Stats Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {STATS_CONFIG.map((item, index) => (
        <AnimatedContainer key={item.title} delay={index * 0.1}>
          <StatCard {...item} />
        </AnimatedContainer>
      ))}
    </div>

    {/* Charts Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <AnimatedContainer delay={0.2} className="lg:col-span-2">
        <FinancialOverviewChart />
      </AnimatedContainer>

      <AnimatedContainer delay={0.3}>
        <SourcePieChart />
      </AnimatedContainer>

      <AnimatedContainer delay={0.4}>
        <SettlementTrendsChart />
      </AnimatedContainer>
    </div>

    {/* Settlement Status */}
    <AnimatedContainer delay={0.5}>
      <DashboardCard title="Settlement Status">
        <div className="space-y-4">
          {[
            { label: 'Bank Transfers', value: 92 },
            { label: 'Mobile Money', value: 78 },
            { label: 'Card Payments', value: 96 },
            { label: 'Cross-Border', value: 64 }
          ].map(({ label, value }) => (
            <div key={label}>
              <div className="flex justify-between text-sm mb-1">
                <span>{label}</span>
                <span className="font-medium">{value}%</span>
              </div>
              <Progress value={value} className="h-2 bg-gray-100" />
            </div>
          ))}

          <div className="pt-4 mt-4 border-t">
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
    </AnimatedContainer>
  </div>
);

export default FinancialSummary;
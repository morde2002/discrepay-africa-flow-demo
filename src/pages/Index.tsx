
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import DashboardCard from '@/components/ui/DashboardCard';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { FileText, TrendingUp, AlertTriangle, CheckCircle, User, DollarSign, Download } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line
} from 'recharts';

// Dashboard data
const policyTypeData = [
  { name: 'Auto', value: 38 },
  { name: 'Health', value: 27 },
  { name: 'Property', value: 18 },
  { name: 'Life', value: 12 },
  { name: 'Business', value: 5 },
];

const claimsData = [
  { month: 'Jan', autoSubmitted: 45, autoApproved: 38, healthSubmitted: 65, healthApproved: 52 },
  { month: 'Feb', autoSubmitted: 52, autoApproved: 41, healthSubmitted: 68, healthApproved: 57 },
  { month: 'Mar', autoSubmitted: 48, autoApproved: 39, healthSubmitted: 72, healthApproved: 61 },
  { month: 'Apr', autoSubmitted: 61, autoApproved: 47, healthSubmitted: 74, healthApproved: 64 },
  { month: 'May', autoSubmitted: 55, autoApproved: 44, healthSubmitted: 79, healthApproved: 68 },
  { month: 'Jun', autoSubmitted: 67, autoApproved: 52, healthSubmitted: 82, healthApproved: 72 },
];

const premiumData = [
  { month: 'Jan', premium: 1200000 },
  { month: 'Feb', premium: 1350000 },
  { month: 'Mar', premium: 1500000 },
  { month: 'Apr', premium: 1420000 },
  { month: 'May', premium: 1650000 },
  { month: 'Jun', premium: 1780000 },
];

const reconciliationData = [
  { name: 'Matched', value: 87 },
  { name: 'In Progress', value: 8 },
  { name: 'Discrepancies', value: 5 },
];

const COLORS = ['#06acf1', '#21a3a4', '#f97316', '#8b5cf6', '#d946ef'];
const STATUS_COLORS = {
  matched: '#10b981',
  inProgress: '#f59e0b',
  discrepancy: '#ef4444'
};

const Index = () => {
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Insurance Dashboard</h1>
        <p className="text-gray-600">Welcome back to your insurance management platform</p>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Policies</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,548</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 inline-flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +2.5%
              </span>{' '}
              from previous month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Claims</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500 inline-flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +14.8%
              </span>{' '}
              from previous month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Customer Base</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,724</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 inline-flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +4.3%
              </span>{' '}
              from previous quarter
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Premium Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1.78M</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 inline-flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +7.8%
              </span>{' '}
              from previous month
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Premium Trend */}
        <div className="lg:col-span-2">
          <DashboardCard 
            title="Premium Revenue Trend"
            action={
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            }
          >
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={premiumData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis 
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} 
                  />
                  <RechartsTooltip 
                    formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Premium']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="premium" 
                    stroke="#06acf1" 
                    strokeWidth={3}
                    dot={{ stroke: '#06acf1', strokeWidth: 2, r: 4, fill: 'white' }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </DashboardCard>
        </div>
        
        {/* Policy Distribution */}
        <DashboardCard title="Policy Distribution">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={policyTypeData}
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
                  {policyTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>
      </div>
      
      {/* Policy and Claims Section */}
      <div className="mt-6">
        <Tabs defaultValue="claims">
          <TabsList>
            <TabsTrigger value="claims">Claims Analysis</TabsTrigger>
            <TabsTrigger value="reconciliation">Reconciliation Status</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>
          <TabsContent value="claims" className="mt-6">
            <DashboardCard title="Monthly Claims Processing">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={claimsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" orientation="left" stroke="#06acf1" />
                    <YAxis yAxisId="right" orientation="right" stroke="#21a3a4" />
                    <RechartsTooltip />
                    <Bar yAxisId="left" dataKey="autoSubmitted" name="Auto - Submitted" fill="#06acf1" />
                    <Bar yAxisId="left" dataKey="autoApproved" name="Auto - Approved" fill="#90caf9" />
                    <Bar yAxisId="right" dataKey="healthSubmitted" name="Health - Submitted" fill="#21a3a4" />
                    <Bar yAxisId="right" dataKey="healthApproved" name="Health - Approved" fill="#80cbc4" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </DashboardCard>
          </TabsContent>
          
          <TabsContent value="reconciliation" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DashboardCard title="Reconciliation Summary">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={reconciliationData}
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
                        <Cell key="cell-0" fill={STATUS_COLORS.matched} />
                        <Cell key="cell-1" fill={STATUS_COLORS.inProgress} />
                        <Cell key="cell-2" fill={STATUS_COLORS.discrepancy} />
                      </Pie>
                      <RechartsTooltip formatter={(value) => `${value}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </DashboardCard>
              
              <div className="md:col-span-2">
                <DashboardCard title="Reconciliation Status by Department">
                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Auto Insurance</span>
                        <span className="font-medium">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Health Insurance</span>
                        <span className="font-medium">87%</span>
                      </div>
                      <Progress value={87} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Property Insurance</span>
                        <span className="font-medium">76%</span>
                      </div>
                      <Progress value={76} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Life Insurance</span>
                        <span className="font-medium">94%</span>
                      </div>
                      <Progress value={94} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Business Insurance</span>
                        <span className="font-medium">81%</span>
                      </div>
                      <Progress value={81} className="h-2" />
                    </div>
                  </div>
                </DashboardCard>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="compliance" className="mt-6">
            <DashboardCard title="Regulatory Compliance Status">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
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
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Latest Compliance Updates</h4>
                  <div className="space-y-3">
                    <div className="bg-green-50 p-3 rounded-md">
                      <div className="flex items-center text-green-800">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        <span className="font-medium">Quarterly NAICOM Report</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1 ml-6">Submitted on April 15, 2025</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-md">
                      <div className="flex items-center text-green-800">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        <span className="font-medium">Annual Compliance Audit</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1 ml-6">Completed on March 30, 2025</p>
                    </div>
                    <div className="bg-amber-50 p-3 rounded-md">
                      <div className="flex items-center text-amber-800">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        <span className="font-medium">Data Protection Review</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1 ml-6">Due on May 25, 2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </DashboardCard>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Index;

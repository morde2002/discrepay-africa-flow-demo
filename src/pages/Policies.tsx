
import AppLayout from '@/components/layout/AppLayout';
import DashboardCard from '@/components/ui/DashboardCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  PlusCircle,
  Bell,
  FileText
} from 'lucide-react';

// Sample data
const policies = [
  {
    id: 'POL-78945',
    customerName: 'Lagos General Hospital',
    type: 'health',
    premium: 3500000.00,
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    status: 'active',
    renewalStatus: null
  },
  {
    id: 'POL-65478',
    customerName: 'John Adekunle',
    type: 'auto',
    premium: 250000.50,
    startDate: '2024-07-15',
    endDate: '2025-07-14',
    status: 'active',
    renewalStatus: 'upcoming'
  },
  {
    id: 'POL-92347',
    customerName: 'Chiamaka Nwosu',
    type: 'property',
    premium: 875000.00,
    startDate: '2024-11-01',
    endDate: '2025-10-31',
    status: 'active',
    renewalStatus: null
  },
  {
    id: 'POL-84527',
    customerName: 'Ibrahim Hassan',
    type: 'health',
    premium: 425000.25,
    startDate: '2024-05-01',
    endDate: '2025-04-30',
    status: 'expired',
    renewalStatus: 'overdue'
  },
  {
    id: 'POL-71526',
    customerName: 'Abuja Medical Center',
    type: 'health',
    premium: 2750000.00,
    startDate: '2025-03-01',
    endDate: '2026-02-28',
    status: 'active',
    renewalStatus: null
  },
  {
    id: 'POL-63945',
    customerName: 'Adebayo Motors',
    type: 'auto',
    premium: 350000.00,
    startDate: '2024-09-15',
    endDate: '2025-09-14',
    status: 'active',
    renewalStatus: null
  }
];

// Status badge configuration
const statusConfig: Record<string, { color: string }> = {
  active: { color: 'bg-green-100 text-green-800 border-green-200' },
  expired: { color: 'bg-red-100 text-red-800 border-red-200' },
  suspended: { color: 'bg-amber-100 text-amber-800 border-amber-200' },
  pending: { color: 'bg-blue-100 text-blue-800 border-blue-200' }
};

// Type badge configuration
const typeConfig: Record<string, { color: string }> = {
  health: { color: 'bg-purple-100 text-purple-800 border-purple-200' },
  auto: { color: 'bg-blue-100 text-blue-800 border-blue-200' },
  property: { color: 'bg-teal-100 text-teal-800 border-teal-200' },
  life: { color: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
  business: { color: 'bg-orange-100 text-orange-800 border-orange-200' }
};

// Renewal status configuration
const renewalConfig: Record<string, { color: string, icon: React.ReactNode }> = {
  upcoming: { 
    color: 'bg-amber-100 text-amber-800 border-amber-200',
    icon: <Bell className="h-3 w-3 mr-1" />
  },
  overdue: { 
    color: 'bg-red-100 text-red-800 border-red-200',
    icon: <Bell className="h-3 w-3 mr-1" />
  }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

const Policies = () => {
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Policy Management</h1>
        <p className="text-gray-600">Create, manage and renew insurance policies</p>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <DashboardCard title="Total Policies">
          <div className="text-center">
            <span className="text-3xl font-bold">12,548</span>
            <div className="text-sm text-gray-600 mt-1">
              <span className="text-green-600">↑ 2.5%</span> from last month
            </div>
          </div>
        </DashboardCard>
        
        <DashboardCard title="Active Policies">
          <div className="text-center">
            <span className="text-3xl font-bold">11,983</span>
            <div className="text-sm text-gray-600 mt-1">
              95.5% of all policies
            </div>
          </div>
        </DashboardCard>
        
        <DashboardCard title="Upcoming Renewals">
          <div className="text-center">
            <span className="text-3xl font-bold">847</span>
            <div className="text-sm text-gray-600 mt-1">
              Due in next 30 days
            </div>
          </div>
        </DashboardCard>
        
        <DashboardCard title="Premium Revenue">
          <div className="text-center">
            <span className="text-3xl font-bold">₦450.2M</span>
            <div className="text-sm text-gray-600 mt-1">
              <span className="text-green-600">↑ 7.8%</span> from last quarter
            </div>
          </div>
        </DashboardCard>
      </div>
      
      {/* Policies List */}
      <DashboardCard title="Policy List" className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search policies by ID, customer name, or type" 
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              New Policy
            </Button>
          </div>
        </div>
        
        {/* Policies Table */}
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Policy ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Premium</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {policies.map((policy) => (
                <TableRow key={policy.id}>
                  <TableCell className="font-medium">{policy.id}</TableCell>
                  <TableCell>{policy.customerName}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${typeConfig[policy.type].color} w-fit`}>
                      {policy.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatCurrency(policy.premium)}</TableCell>
                  <TableCell>{new Date(policy.startDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(policy.endDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <Badge variant="outline" className={`${statusConfig[policy.status].color} w-fit`}>
                        {policy.status}
                      </Badge>
                      
                      {policy.renewalStatus && (
                        <Badge variant="outline" className={`${renewalConfig[policy.renewalStatus].color} w-fit flex items-center`}>
                          {renewalConfig[policy.renewalStatus].icon}
                          <span className="capitalize">
                            {policy.renewalStatus === 'upcoming' ? 'Renewal soon' : 'Renewal overdue'}
                          </span>
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <FileText className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button variant="outline" size="sm">Renew</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex justify-center mt-6">
          <Button variant="outline">Load More Policies</Button>
        </div>
      </DashboardCard>
    </AppLayout>
  );
};

export default Policies;

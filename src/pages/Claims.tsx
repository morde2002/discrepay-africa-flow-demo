
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
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  Filter, 
  PlusCircle,
  BarChart3,
  BarChart
} from 'lucide-react';

// Sample data
const claims = [
  {
    id: 'CLM-10043',
    policyNumber: 'POL-78945',
    customerName: 'Lagos General Hospital',
    type: 'health',
    amount: 120000.00,
    submissionDate: '2025-04-05',
    status: 'approved',
    action: 'Payment Processing'
  },
  {
    id: 'CLM-10044',
    policyNumber: 'POL-65478',
    customerName: 'John Adekunle',
    type: 'auto',
    amount: 75000.50,
    submissionDate: '2025-04-06',
    status: 'pending',
    action: 'Document Review'
  },
  {
    id: 'CLM-10045',
    policyNumber: 'POL-92347',
    customerName: 'Chiamaka Nwosu',
    type: 'property',
    amount: 230000.00,
    submissionDate: '2025-04-06',
    status: 'under_review',
    action: 'Assessor Assigned'
  },
  {
    id: 'CLM-10046',
    policyNumber: 'POL-84527',
    customerName: 'Ibrahim Hassan',
    type: 'health',
    amount: 45780.25,
    submissionDate: '2025-04-07',
    status: 'rejected',
    action: 'Feedback Provided'
  },
  {
    id: 'CLM-10047',
    policyNumber: 'POL-71526',
    customerName: 'Abuja Medical Center',
    type: 'health',
    amount: 186000.00,
    submissionDate: '2025-04-08',
    status: 'approved',
    action: 'Payment Processed'
  },
  {
    id: 'CLM-10048',
    policyNumber: 'POL-63945',
    customerName: 'Adebayo Motors',
    type: 'auto',
    amount: 125000.00,
    submissionDate: '2025-04-10',
    status: 'pending',
    action: 'Awaiting Documents'
  }
];

// Status badge configuration
const statusConfig: Record<string, { color: string }> = {
  approved: { color: 'bg-green-100 text-green-800 border-green-200' },
  pending: { color: 'bg-amber-100 text-amber-800 border-amber-200' },
  under_review: { color: 'bg-blue-100 text-blue-800 border-blue-200' },
  rejected: { color: 'bg-red-100 text-red-800 border-red-200' }
};

// Type badge configuration
const typeConfig: Record<string, { color: string }> = {
  health: { color: 'bg-purple-100 text-purple-800 border-purple-200' },
  auto: { color: 'bg-blue-100 text-blue-800 border-blue-200' },
  property: { color: 'bg-teal-100 text-teal-800 border-teal-200' },
  life: { color: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
  business: { color: 'bg-orange-100 text-orange-800 border-orange-200' }
};

const Claims = () => {
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Claims Management</h1>
        <p className="text-gray-600">Process and track insurance claims</p>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <DashboardCard title="Total Claims">
          <div className="text-center">
            <span className="text-3xl font-bold">1,284</span>
            <div className="text-sm text-gray-600 mt-1">
              <span className="text-green-600">↑ 12%</span> from last month
            </div>
          </div>
        </DashboardCard>
        
        <DashboardCard title="Open Claims">
          <div className="text-center">
            <span className="text-3xl font-bold">347</span>
            <div className="text-sm text-gray-600 mt-1">
              27% of all claims
            </div>
          </div>
        </DashboardCard>
        
        <DashboardCard title="Average Processing">
          <div className="text-center">
            <span className="text-3xl font-bold">4.2</span>
            <div className="text-sm text-gray-600 mt-1">
              days to resolution
            </div>
          </div>
        </DashboardCard>
        
        <DashboardCard title="Approval Rate">
          <div className="text-center">
            <span className="text-3xl font-bold">82%</span>
            <div className="text-sm text-gray-600 mt-1">
              <span className="text-green-600">↑ 3%</span> from last quarter
            </div>
          </div>
        </DashboardCard>
      </div>
      
      {/* Claims by Type */}
      <DashboardCard title="Claims by Type" className="mb-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 md:border-r border-gray-200 pr-6">
            <h4 className="text-sm font-medium mb-4 flex items-center">
              <BarChart className="h-4 w-4 mr-2" />
              Claims Distribution
            </h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Health Insurance</span>
                  <span className="font-medium">42%</span>
                </div>
                <Progress value={42} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Auto Insurance</span>
                  <span className="font-medium">28%</span>
                </div>
                <Progress value={28} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Property Insurance</span>
                  <span className="font-medium">18%</span>
                </div>
                <Progress value={18} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Life Insurance</span>
                  <span className="font-medium">8%</span>
                </div>
                <Progress value={8} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Business Insurance</span>
                  <span className="font-medium">4%</span>
                </div>
                <Progress value={4} className="h-2" />
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <h4 className="text-sm font-medium mb-4 flex items-center">
              <BarChart3 className="h-4 w-4 mr-2" />
              Claims Status Breakdown
            </h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Approved</span>
                  <span className="font-medium">56%</span>
                </div>
                <Progress value={56} className="h-2 bg-gray-100 text-green-600" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Pending</span>
                  <span className="font-medium">22%</span>
                </div>
                <Progress value={22} className="h-2 bg-gray-100 text-amber-500" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Under Review</span>
                  <span className="font-medium">14%</span>
                </div>
                <Progress value={14} className="h-2 bg-gray-100 text-blue-500" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Rejected</span>
                  <span className="font-medium">8%</span>
                </div>
                <Progress value={8} className="h-2 bg-gray-100 text-red-500" />
              </div>
            </div>
          </div>
        </div>
      </DashboardCard>
      
      {/* Claims List */}
      <DashboardCard title="Recent Claims" className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search claims by ID, customer, or policy" 
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
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              New Claim
            </Button>
          </div>
        </div>
        
        {/* Claims Table */}
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Claim ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Policy</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Submission Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {claims.map((claim) => (
                <TableRow key={claim.id}>
                  <TableCell className="font-medium">{claim.id}</TableCell>
                  <TableCell>{claim.customerName}</TableCell>
                  <TableCell>{claim.policyNumber}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${typeConfig[claim.type].color} w-fit`}>
                      {claim.type}
                    </Badge>
                  </TableCell>
                  <TableCell>₦{claim.amount.toLocaleString()}</TableCell>
                  <TableCell>{new Date(claim.submissionDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${statusConfig[claim.status].color} w-fit capitalize`}>
                      {claim.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">{claim.action}</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex justify-center mt-6">
          <Button variant="outline">Load More Claims</Button>
        </div>
      </DashboardCard>
    </AppLayout>
  );
};

export default Claims;

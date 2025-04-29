
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
  Download,
  Upload, 
  Search, 
  ChevronDown, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle,
  ArrowDownUp,
  Filter
} from 'lucide-react';

// Sample data
const reconciliationItems = [
  {
    id: 'REC-1001',
    policyNumber: 'POL-78945',
    clientName: 'Lagos General Hospital',
    invoiceNumber: 'INV-2025-0478',
    invoiceDate: '2025-04-01',
    invoiceAmount: 245780.50,
    paymentAmount: 245780.50,
    status: 'matched',
    createdAt: '2025-04-05'
  },
  {
    id: 'REC-1002',
    policyNumber: 'POL-65432',
    clientName: 'Abuja Medical Center',
    invoiceNumber: 'INV-2025-0512',
    invoiceDate: '2025-04-02',
    invoiceAmount: 178450.00,
    paymentAmount: 178450.00,
    status: 'matched',
    createdAt: '2025-04-06'
  },
  {
    id: 'REC-1003',
    policyNumber: 'POL-92371',
    clientName: 'Port Harcourt Clinic',
    invoiceNumber: 'INV-2025-0541',
    invoiceDate: '2025-04-03',
    invoiceAmount: 320150.75,
    paymentAmount: 320000.75,
    status: 'discrepancy',
    createdAt: '2025-04-07'
  },
  {
    id: 'REC-1004',
    policyNumber: 'POL-84726',
    clientName: 'Kano Health Services',
    invoiceNumber: 'INV-2025-0563',
    invoiceDate: '2025-04-04',
    invoiceAmount: 125300.00,
    paymentAmount: null,
    status: 'pending',
    createdAt: '2025-04-08'
  },
  {
    id: 'REC-1005',
    policyNumber: 'POL-75319',
    clientName: 'Enugu Medical Group',
    invoiceNumber: 'INV-2025-0592',
    invoiceDate: '2025-04-05',
    invoiceAmount: 215780.25,
    paymentAmount: 215780.25,
    status: 'matched',
    createdAt: '2025-04-09'
  },
  {
    id: 'REC-1006',
    policyNumber: 'POL-63841',
    clientName: 'Ibadan Health Alliance',
    invoiceNumber: 'INV-2025-0603',
    invoiceDate: '2025-04-06',
    invoiceAmount: 187650.50,
    paymentAmount: 187600.50,
    status: 'discrepancy',
    createdAt: '2025-04-10'
  }
];

// Status badge configuration
const statusConfig: Record<string, { color: string, icon: React.ReactNode }> = {
  matched: { 
    color: 'bg-green-100 text-green-800 border-green-200', 
    icon: <CheckCircle2 className="h-3 w-3 mr-1" /> 
  },
  discrepancy: { 
    color: 'bg-red-100 text-red-800 border-red-200', 
    icon: <XCircle className="h-3 w-3 mr-1" /> 
  },
  pending: { 
    color: 'bg-amber-100 text-amber-800 border-amber-200', 
    icon: <AlertTriangle className="h-3 w-3 mr-1" /> 
  }
};

const Reconciliation = () => {
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Invoice Reconciliation</h1>
        <p className="text-gray-600">Match invoices with payments and identify discrepancies</p>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <DashboardCard title="Reconciliation Summary">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <span className="text-3xl font-bold text-green-600">87%</span>
              <p className="text-sm text-gray-600">Matched</p>
            </div>
            <div className="text-center">
              <span className="text-3xl font-bold text-amber-600">8%</span>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
            <div className="text-center">
              <span className="text-3xl font-bold text-red-600">5%</span>
              <p className="text-sm text-gray-600">Discrepancies</p>
            </div>
          </div>
        </DashboardCard>
        
        <DashboardCard title="Amount Reconciled">
          <div className="flex items-end gap-4">
            <div>
              <span className="text-3xl font-bold">₦24.5M</span>
              <p className="text-sm text-gray-600">Total Amount</p>
            </div>
            <div>
              <span className="text-2xl font-semibold text-green-600">₦21.3M</span>
              <p className="text-sm text-gray-600">Matched (87%)</p>
            </div>
          </div>
        </DashboardCard>
        
        <DashboardCard title="Average Resolution Time">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-3xl font-bold">1.8</span>
              <p className="text-sm text-gray-600">Days to resolve</p>
            </div>
            <span className="text-sm text-green-600 font-medium">
              ↓ 0.3 days from last month
            </span>
          </div>
        </DashboardCard>
      </div>
      
      {/* Filters and Actions */}
      <DashboardCard title="Invoice Reconciliation List" className="mb-6">
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search by client, invoice, or policy number" 
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
                  <SelectItem value="matched">Matched</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="discrepancy">Discrepancies</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="newest">
                <SelectTrigger className="w-[180px]">
                  <ArrowDownUp className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="amount_high">Amount (High to Low)</SelectItem>
                  <SelectItem value="amount_low">Amount (Low to High)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Import Invoices
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Import Payments
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
        
        {/* Reconciliation Table */}
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reconciliation ID</TableHead>
                <TableHead>Client Name</TableHead>
                <TableHead>Policy Number</TableHead>
                <TableHead>Invoice</TableHead>
                <TableHead className="text-right">Invoice Amount</TableHead>
                <TableHead className="text-right">Payment Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reconciliationItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.clientName}</TableCell>
                  <TableCell>{item.policyNumber}</TableCell>
                  <TableCell>{item.invoiceNumber}</TableCell>
                  <TableCell className="text-right">₦{item.invoiceAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                  <TableCell className="text-right">
                    {item.paymentAmount 
                      ? `₦${item.paymentAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` 
                      : '—'
                    }
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${statusConfig[item.status].color} flex w-fit items-center`}>
                      {statusConfig[item.status].icon}
                      <span className="capitalize">{item.status}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DashboardCard>
      
      {/* Reconciliation Tips */}
      <DashboardCard title="Reconciliation Tips">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 rounded-full p-2 mt-1">
              <CheckCircle2 className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium">Regular Reconciliation</h4>
              <p className="text-sm text-gray-600">Perform invoice reconciliation at least once a week to catch discrepancies early</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 rounded-full p-2 mt-1">
              <CheckCircle2 className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium">Document Everything</h4>
              <p className="text-sm text-gray-600">Keep records of all reconciliation activities and resolution steps for audit purposes</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 rounded-full p-2 mt-1">
              <CheckCircle2 className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium">Establish Clear Processes</h4>
              <p className="text-sm text-gray-600">Create standardized procedures for handling different types of discrepancies</p>
            </div>
          </div>
        </div>
      </DashboardCard>
    </AppLayout>
  );
};

export default Reconciliation;

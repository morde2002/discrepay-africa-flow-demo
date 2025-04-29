
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
  Eye,
  FileText,
  Mail,
  Phone
} from 'lucide-react';

// Sample data
const customers = [
  {
    id: 'CUST-10043',
    name: 'Lagos General Hospital',
    type: 'corporate',
    email: 'contact@lagosgeneralhospital.org',
    phone: '+234 801 234 5678',
    policies: 5,
    claims: 12,
    status: 'active'
  },
  {
    id: 'CUST-10044',
    name: 'John Adekunle',
    type: 'individual',
    email: 'john.adekunle@email.com',
    phone: '+234 802 345 6789',
    policies: 3,
    claims: 1,
    status: 'active'
  },
  {
    id: 'CUST-10045',
    name: 'Chiamaka Nwosu',
    type: 'individual',
    email: 'chiamaka.nwosu@email.com',
    phone: '+234 803 456 7890',
    policies: 2,
    claims: 0,
    status: 'active'
  },
  {
    id: 'CUST-10046',
    name: 'Ibrahim Hassan',
    type: 'individual',
    email: 'ibrahim.hassan@email.com',
    phone: '+234 804 567 8901',
    policies: 1,
    claims: 1,
    status: 'inactive'
  },
  {
    id: 'CUST-10047',
    name: 'Abuja Medical Center',
    type: 'corporate',
    email: 'info@abujamedical.com',
    phone: '+234 805 678 9012',
    policies: 4,
    claims: 8,
    status: 'active'
  },
  {
    id: 'CUST-10048',
    name: 'Adebayo Motors',
    type: 'corporate',
    email: 'contact@adebayomotors.com',
    phone: '+234 806 789 0123',
    policies: 2,
    claims: 3,
    status: 'active'
  }
];

// Status badge configuration
const statusConfig: Record<string, { color: string }> = {
  active: { color: 'bg-green-100 text-green-800 border-green-200' },
  inactive: { color: 'bg-gray-100 text-gray-800 border-gray-200' }
};

// Type badge configuration
const typeConfig: Record<string, { color: string }> = {
  individual: { color: 'bg-blue-100 text-blue-800 border-blue-200' },
  corporate: { color: 'bg-purple-100 text-purple-800 border-purple-200' }
};

const Customers = () => {
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Customer Management</h1>
        <p className="text-gray-600">Manage insurance policy holders and their information</p>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <DashboardCard title="Total Customers">
          <div className="text-center">
            <span className="text-3xl font-bold">5,724</span>
            <div className="text-sm text-gray-600 mt-1">
              <span className="text-green-600">↑ 4.3%</span> from previous quarter
            </div>
          </div>
        </DashboardCard>
        
        <DashboardCard title="Customer Type">
          <div className="flex justify-around">
            <div className="text-center">
              <span className="text-3xl font-bold">4,128</span>
              <div className="text-sm text-gray-600 mt-1">
                Individual (72%)
              </div>
            </div>
            <div className="text-center">
              <span className="text-3xl font-bold">1,596</span>
              <div className="text-sm text-gray-600 mt-1">
                Corporate (28%)
              </div>
            </div>
          </div>
        </DashboardCard>
        
        <DashboardCard title="Retention Rate">
          <div className="text-center">
            <span className="text-3xl font-bold">92.8%</span>
            <div className="text-sm text-gray-600 mt-1">
              <span className="text-green-600">↑ 1.5%</span> year-on-year
            </div>
          </div>
        </DashboardCard>
      </div>
      
      {/* Customer List */}
      <DashboardCard title="Customer Directory" className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search customers by name, ID, or email" 
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="individual">Individual</SelectItem>
                <SelectItem value="corporate">Corporate</SelectItem>
              </SelectContent>
            </Select>
            
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </div>
        </div>
        
        {/* Customers Table */}
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Policies</TableHead>
                <TableHead>Claims</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.id}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${typeConfig[customer.type].color} w-fit`}>
                      {customer.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center text-xs">
                        <Mail className="h-3 w-3 mr-1" />
                        <span className="text-gray-600">{customer.email}</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <Phone className="h-3 w-3 mr-1" />
                        <span className="text-gray-600">{customer.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{customer.policies}</TableCell>
                  <TableCell>{customer.claims}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${statusConfig[customer.status].color} w-fit`}>
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <FileText className="h-4 w-4" />
                        <span className="sr-only">Policies</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex justify-center mt-6">
          <Button variant="outline">Load More Customers</Button>
        </div>
      </DashboardCard>
    </AppLayout>
  );
};

export default Customers;

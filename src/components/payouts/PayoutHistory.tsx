
import { useState } from "react";
import DashboardCard from "@/components/ui/DashboardCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Download, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Sample payout data
const payouts = [
  {
    id: "PO-2025042701",
    date: "2025-04-27T10:15:22",
    amount: 9500000,
    processorFee: 237500,
    netAmount: 9262500,
    status: "completed",
    type: "utility",
    recipient: "Ikeja Electric",
    reference: "IKEDC-APR25",
  },
  {
    id: "PO-2025042702",
    date: "2025-04-27T10:15:22",
    amount: 4300000,
    processorFee: 107500,
    netAmount: 4192500,
    status: "completed",
    type: "utility",
    recipient: "Eko Electric",
    reference: "EKEDC-APR25",
  },
  {
    id: "PO-2025042603",
    date: "2025-04-26T16:45:18",
    amount: 2850000,
    processorFee: 71250,
    netAmount: 2778750,
    status: "processing",
    type: "utility",
    recipient: "Ibadan DISCO",
    reference: "IBEDC-APR25",
  },
  {
    id: "PO-2025042504",
    date: "2025-04-25T14:30:47",
    amount: 3200000,
    processorFee: 80000,
    netAmount: 3120000,
    status: "failed",
    type: "utility",
    recipient: "Abuja Electric",
    reference: "AEDC-APR25",
  },
  {
    id: "PO-2025042405",
    date: "2025-04-24T11:20:05",
    amount: 2150000,
    processorFee: 53750,
    netAmount: 2096250,
    status: "completed",
    type: "utility",
    recipient: "Port Harcourt Electric",
    reference: "PHEDC-APR25",
  }
];

const PayoutHistory = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPayouts = payouts.filter(payout => {
    if (filter !== "all" && payout.status !== filter) return false;
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        payout.id.toLowerCase().includes(searchLower) ||
        payout.reference.toLowerCase().includes(searchLower) ||
        payout.recipient.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    });
  };

  const statusColors: Record<string, string> = {
    completed: "bg-green-100 text-green-800",
    processing: "bg-blue-100 text-blue-800",
    failed: "bg-red-100 text-red-800",
    pending: "bg-yellow-100 text-yellow-800",
  };

  const typeLabels: Record<string, string> = {
    utility: "Utility",
    vendor: "Vendor",
    partner: "Partner",
    salary: "Salary",
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { 
      style: 'currency', 
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0 
    }).format(amount);
  };

  return (
    <DashboardCard 
      title="Recent Payouts"
      action={
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-1" />
          Export
        </Button>
      }
      className="mt-6"
    >
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search payouts..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-48">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payouts</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payout ID</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Processor Fee</TableHead>
                <TableHead>Net Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayouts.map((payout) => (
                <TableRow key={payout.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{payout.id}</TableCell>
                  <TableCell>{formatDate(payout.date)}</TableCell>
                  <TableCell>{formatCurrency(payout.amount)}</TableCell>
                  <TableCell className="text-muted-foreground">{formatCurrency(payout.processorFee)}</TableCell>
                  <TableCell className="font-medium">{formatCurrency(payout.netAmount)}</TableCell>
                  <TableCell>{typeLabels[payout.type]}</TableCell>
                  <TableCell>{payout.recipient}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusColors[payout.status]}>
                      {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                        View
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                        <FileText className="h-3 w-3 mr-1" />
                        Report
                      </Button>
                      {payout.status === "failed" && (
                        <Button variant="ghost" size="sm" className="h-8 px-2 text-xs text-red-600 hover:text-red-700 hover:bg-red-50">
                          Retry
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredPayouts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="text-center p-4 text-muted-foreground">
                    No payouts found matching your filters
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardCard>
  );
};

export default PayoutHistory;

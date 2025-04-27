
import { useState } from "react";
import DashboardCard from "@/components/ui/DashboardCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample payout data
const payouts = [
  {
    id: "PO-2025042701",
    date: "2025-04-27T10:15:22",
    amount: 9500000,
    status: "completed",
    type: "utility",
    recipient: "Ikeja Electric",
    reference: "IKEDC-APR25",
  },
  {
    id: "PO-2025042702",
    date: "2025-04-27T10:15:22",
    amount: 4300000,
    status: "completed",
    type: "utility",
    recipient: "Eko Electric",
    reference: "EKEDC-APR25",
  },
  {
    id: "PO-2025042603",
    date: "2025-04-26T16:45:18",
    amount: 2850000,
    status: "processing",
    type: "utility",
    recipient: "Ibadan DISCO",
    reference: "IBEDC-APR25",
  },
  {
    id: "PO-2025042504",
    date: "2025-04-25T14:30:47",
    amount: 3200000,
    status: "failed",
    type: "utility",
    recipient: "Abuja Electric",
    reference: "AEDC-APR25",
  },
  {
    id: "PO-2025042405",
    date: "2025-04-24T11:20:05",
    amount: 2150000,
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

  return (
    <DashboardCard 
      title="Recent Payouts"
      action={
        <Button variant="outline" size="sm">Download Report</Button>
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
          <table className="w-full">
            <thead>
              <tr className="text-xs text-muted-foreground border-b">
                <th className="text-left font-medium p-2">Payout ID</th>
                <th className="text-left font-medium p-2">Date & Time</th>
                <th className="text-left font-medium p-2">Amount</th>
                <th className="text-left font-medium p-2">Type</th>
                <th className="text-left font-medium p-2">Recipient</th>
                <th className="text-left font-medium p-2">Status</th>
                <th className="text-left font-medium p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayouts.map((payout) => (
                <tr key={payout.id} className="border-b hover:bg-muted/50 text-sm">
                  <td className="p-2 font-medium">{payout.id}</td>
                  <td className="p-2">{formatDate(payout.date)}</td>
                  <td className="p-2 font-medium">₦{(payout.amount / 1000).toFixed(1)}K</td>
                  <td className="p-2">{typeLabels[payout.type]}</td>
                  <td className="p-2">{payout.recipient}</td>
                  <td className="p-2">
                    <Badge variant="outline" className={statusColors[payout.status]}>
                      {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="p-2">
                    <button className="text-discrepay-600 hover:text-discrepay-800 text-xs underline mr-2">
                      View
                    </button>
                    <button className="text-discrepay-600 hover:text-discrepay-800 text-xs underline">
                      Receipt
                    </button>
                  </td>
                </tr>
              ))}
              {filteredPayouts.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center p-4 text-muted-foreground">
                    No payouts found matching your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardCard>
  );
};

export default PayoutHistory;

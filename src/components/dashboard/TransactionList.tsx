
import { useState } from "react";
import DashboardCard from "../ui/DashboardCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample transaction data
const transactions = [
  {
    id: "TX123456",
    date: "2025-04-27T08:43:12",
    amount: 12500.00,
    status: "completed",
    type: "bank_transfer",
    recipient: "MTN Mobile Money",
    reference: "INVPMT-2025-042",
  },
  {
    id: "TX123455",
    date: "2025-04-27T07:22:58",
    amount: 8750.50,
    status: "processing",
    type: "mobile_money",
    recipient: "Airtel Money",
    reference: "SALARY-APR-2025",
  },
  {
    id: "TX123454",
    date: "2025-04-26T16:18:35",
    amount: 32000.00,
    status: "completed",
    type: "card_payment",
    recipient: "Visa Card ****4218",
    reference: "SUPPLIER-PAY-009",
  },
  {
    id: "TX123453",
    date: "2025-04-26T11:05:22",
    amount: 5000.00,
    status: "failed",
    type: "bank_transfer",
    recipient: "First Bank",
    reference: "UTIL-PAYMENT-042",
  },
  {
    id: "TX123452",
    date: "2025-04-25T15:47:03",
    amount: 15280.75,
    status: "completed",
    type: "cross_border",
    recipient: "Bank of Ghana",
    reference: "INT-TRANSFER-118",
  }
];

const TransactionList = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransactions = transactions.filter(transaction => {
    if (filter !== "all" && transaction.status !== filter) return false;
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        transaction.id.toLowerCase().includes(searchLower) ||
        transaction.reference.toLowerCase().includes(searchLower) ||
        transaction.recipient.toLowerCase().includes(searchLower)
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
    bank_transfer: "Bank Transfer",
    mobile_money: "Mobile Money",
    card_payment: "Card Payment",
    cross_border: "Cross-Border",
  };

  return (
    <DashboardCard 
      title="Recent Transactions"
      action={
        <Button variant="outline" size="sm">View All</Button>
      }
      className="mt-6"
    >
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
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
                <SelectItem value="all">All Transactions</SelectItem>
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
                <th className="text-left font-medium p-2">Transaction ID</th>
                <th className="text-left font-medium p-2">Date & Time</th>
                <th className="text-left font-medium p-2">Amount</th>
                <th className="text-left font-medium p-2">Type</th>
                <th className="text-left font-medium p-2">Recipient</th>
                <th className="text-left font-medium p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b hover:bg-muted/50 text-sm">
                  <td className="p-2 font-medium">{transaction.id}</td>
                  <td className="p-2">{formatDate(transaction.date)}</td>
                  <td className="p-2 font-medium">${transaction.amount.toLocaleString()}</td>
                  <td className="p-2">{typeLabels[transaction.type]}</td>
                  <td className="p-2">{transaction.recipient}</td>
                  <td className="p-2">
                    <Badge variant="outline" className={statusColors[transaction.status]}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </Badge>
                  </td>
                </tr>
              ))}
              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center p-4 text-muted-foreground">
                    No transactions found matching your filters
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

export default TransactionList;

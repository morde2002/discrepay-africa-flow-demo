
import React, { useState } from "react";
import DashboardCard from "@/components/ui/DashboardCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TransactionInvestigation } from "./TransactionInvestigation";
import { Button } from "@/components/ui/button";
import { Search, Download, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const transactions = [
  {
    id: "TX938485",
    initiatedAmount: "₦245,700",
    settledAmount: "₦0",
    status: "missing",
    processor: "Paystack",
    processorFee: "2.5%",
    processorFeeAmount: "₦6,143",
    netAmount: "₦239,557",
    time: "2 hours ago",
    date: "2024-04-27",
  },
  {
    id: "TX938421",
    initiatedAmount: "₦128,500",
    settledAmount: "Pending",
    status: "delayed",
    processor: "Flutterwave",
    processorFee: "2.8%",
    processorFeeAmount: "₦3,598",
    netAmount: "₦124,902",
    time: "4 hours ago",
    date: "2024-04-27",
  },
  {
    id: "TX937712",
    initiatedAmount: "₦75,250",
    settledAmount: "₦72,950",
    status: "partial",
    processor: "Direct Bank",
    processorFee: "1.5%",
    processorFeeAmount: "₦1,129",
    netAmount: "₦74,121",
    time: "Yesterday",
    date: "2024-04-26",
  },
  {
    id: "Multi",
    initiatedAmount: "₦534,200",
    settledAmount: "₦0",
    status: "missing",
    processor: "Interswitch",
    processorFee: "2.2%",
    processorFeeAmount: "₦11,752",
    netAmount: "₦522,448",
    time: "Yesterday",
    date: "2024-04-26",
  },
  {
    id: "TX936547",
    initiatedAmount: "₦187,250",
    settledAmount: "₦182,569",
    status: "matched",
    processor: "Paystack",
    processorFee: "2.5%",
    processorFeeAmount: "₦4,681",
    netAmount: "₦182,569",
    time: "2 days ago",
    date: "2024-04-25",
  }
];

const FundsFlowTracker = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [processorFilter, setProcessorFilter] = useState("all");

  const filteredTransactions = transactions.filter((tx) => {
    // Search filter
    const matchesSearch = tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tx.processor.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Date filter
    const matchesDate = dateFilter === "all" || tx.date === dateFilter;
    
    // Processor filter
    const matchesProcessor = processorFilter === "all" || tx.processor === processorFilter;
    
    return matchesSearch && matchesDate && matchesProcessor;
  });

  const statusBadgeColor = (status: string) => {
    switch(status) {
      case "matched": return "bg-green-100 text-green-800";
      case "delayed": return "bg-amber-100 text-amber-800";
      case "partial": return "bg-orange-100 text-orange-800";
      case "missing": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DashboardCard 
      title="Funds Flow Tracker" 
      className="mb-6"
      action={
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-1" />
          Export
        </Button>
      }
    >
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-8"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-[140px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Date Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Dates</SelectItem>
              <SelectItem value="2024-04-27">Today</SelectItem>
              <SelectItem value="2024-04-26">Yesterday</SelectItem>
              <SelectItem value="2024-04-25">2 Days Ago</SelectItem>
            </SelectContent>
          </Select>
          <Select value={processorFilter} onValueChange={setProcessorFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filter by Processor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Processors</SelectItem>
              <SelectItem value="Paystack">Paystack</SelectItem>
              <SelectItem value="Flutterwave">Flutterwave</SelectItem>
              <SelectItem value="Interswitch">Interswitch</SelectItem>
              <SelectItem value="Direct Bank">Direct Bank</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Initiated Amount</TableHead>
              <TableHead>Settled Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment Processor</TableHead>
              <TableHead>Processor Fee %</TableHead>
              <TableHead>Processor Fee</TableHead>
              <TableHead>Net Amount</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((tx) => (
              <TableRow key={tx.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{tx.id}</TableCell>
                <TableCell>{tx.initiatedAmount}</TableCell>
                <TableCell>{tx.settledAmount}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusBadgeColor(tx.status)}>
                    {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>{tx.processor}</TableCell>
                <TableCell>{tx.processorFee}</TableCell>
                <TableCell>{tx.processorFeeAmount}</TableCell>
                <TableCell>{tx.netAmount}</TableCell>
                <TableCell>{tx.time}</TableCell>
                <TableCell>
                  <TransactionInvestigation transactionId={tx.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DashboardCard>
  );
};

export default FundsFlowTracker;

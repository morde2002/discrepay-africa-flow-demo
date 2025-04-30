import React from "react";
import DashboardCard from "@/components/ui/DashboardCard";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion, AnimatePresence } from 'framer-motion';
import { TransactionInvestigation } from "./TransactionInvestigation";

const alerts = [
  {
    id: "ST001",
    severity: "high",
    message: "Missing settlement from Paystack",
    reference: "TX938485",
    amount: "₦245,700",
    time: "2 hours ago",
    expected: "10:00 AM",
    processor: "Paystack",
    status: "missing",
    variance: "₦245,700",
    fee: "₦6,143",
  },
  {
    id: "ST002",
    severity: "medium",
    message: "Delayed settlement detected",
    reference: "TX938421",
    amount: "₦128,500",
    time: "4 hours ago",
    expected: "08:30 AM",
    processor: "Flutterwave",
    status: "delayed",
    variance: "Delayed",
    fee: "₦3,598",
  },
  {
    id: "ST003",
    severity: "low",
    message: "Settlement variance detected",
    reference: "TX937712",
    amount: "₦75,250",
    time: "Yesterday",
    expected: "14:45 PM",
    processor: "Direct Bank",
    status: "partial",
    variance: "₦1,171",
    fee: "₦1,129",
  },
  {
    id: "ST004",
    severity: "high",
    message: "Multiple failed settlements",
    reference: "Multi",
    amount: "₦534,200",
    time: "Yesterday",
    expected: "09:30 AM",
    processor: "Interswitch",
    status: "missing",
    variance: "₦534,200",
    fee: "₦11,752",
  }
];

const severityStyles = {
  high: "bg-red-100 text-red-800",
  medium: "bg-amber-100 text-amber-800",
  low: "bg-blue-100 text-blue-800",
};

const varianceStyles = {
  missing: "bg-red-100 text-red-800",
  delayed: "bg-amber-100 text-amber-800",
  partial: "bg-orange-100 text-orange-800",
};

const SettlementAlerts = () => {
  return (
    <DashboardCard title="Settlement Alerts" className="mt-6">
      <div className="overflow-x-auto relative">
        <Table className="table-auto">
          <TableHeader className="bg-gray-50 sticky top-0 z-10">
            <TableRow className="text-xs text-muted-foreground border-b">
              <TableHead className="text-left font-medium p-2">Alert ID</TableHead>
              <TableHead className="text-left font-medium p-2">Severity</TableHead>
              <TableHead className="text-left font-medium p-2">Message</TableHead>
              <TableHead className="text-left font-medium p-2">Transaction Ref</TableHead>
              <TableHead className="text-left font-medium p-2">Amount</TableHead>
              <TableHead className="text-left font-medium p-2">Processor</TableHead>
              <TableHead className="text-left font-medium p-2">Processor Fee</TableHead>
              <TableHead className="text-left font-medium p-2">Variance</TableHead>
              <TableHead className="text-left font-medium p-2">Time</TableHead>
              <TableHead className="text-left font-medium p-2">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {alerts.map((alert) => (
                <motion.tr
                  key={alert.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="border-b hover:bg-muted/50 text-sm"
                >
                  <TableCell className="p-2 font-medium">{alert.id}</TableCell>
                  <TableCell className="p-2">
                    <Badge className={severityStyles[alert.severity]}>
                      {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="p-2">{alert.message}</TableCell>
                  <TableCell className="p-2">{alert.reference}</TableCell>
                  <TableCell className="p-2">{alert.amount}</TableCell>
                  <TableCell className="p-2">{alert.processor}</TableCell>
                  <TableCell className="p-2">{alert.fee}</TableCell>
                  <TableCell className="p-2">
                    <Badge className={varianceStyles[alert.status]}>
                      {alert.variance}
                    </Badge>
                  </TableCell>
                  <TableCell className="p-2">{alert.time}</TableCell>
                  <TableCell className="p-2">
                    <TransactionInvestigation transactionId={alert.reference} />
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>
    </DashboardCard>
  );
};

export default SettlementAlerts;

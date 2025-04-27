
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Clock, Info, AlertTriangle } from "lucide-react";
import { useState } from "react";

type TransactionEvent = {
  timestamp: string;
  status: "completed" | "pending" | "failed";
  description: string;
  details: string;
};

type TransactionData = {
  id: string;
  events: TransactionEvent[];
};

// More comprehensive transaction data for multiple transactions
const mockTransactionData: Record<string, TransactionData> = {
  "TX938485": {
    id: "TX938485",
    events: [
      {
        timestamp: "2024-04-27 10:00:00",
        status: "completed",
        description: "Payment Initiated",
        details: "Amount: ₦245,700",
      },
      {
        timestamp: "2024-04-27 10:00:05",
        status: "completed",
        description: "Payment Authorized",
        details: "Processor: Paystack",
      },
      {
        timestamp: "2024-04-27 10:00:10",
        status: "pending",
        description: "Settlement Processing",
        details: "Expected completion: 10:30 AM",
      },
      {
        timestamp: "2024-04-27 12:00:00",
        status: "failed",
        description: "Settlement Failed",
        details: "Reason: Processor timeout",
      },
    ],
  },
  "TX938421": {
    id: "TX938421",
    events: [
      {
        timestamp: "2024-04-27 08:15:00",
        status: "completed",
        description: "Payment Initiated",
        details: "Amount: ₦128,500",
      },
      {
        timestamp: "2024-04-27 08:15:10",
        status: "completed",
        description: "Payment Authorized",
        details: "Processor: Flutterwave",
      },
      {
        timestamp: "2024-04-27 08:15:45",
        status: "completed",
        description: "Settlement Processing",
        details: "Expected completion: 09:00 AM",
      },
      {
        timestamp: "2024-04-27 12:30:00",
        status: "pending",
        description: "Settlement Delayed",
        details: "Reason: Processor backlog",
      },
    ],
  },
  "TX937712": {
    id: "TX937712",
    events: [
      {
        timestamp: "2024-04-26 14:30:00",
        status: "completed",
        description: "Payment Initiated",
        details: "Amount: ₦75,250",
      },
      {
        timestamp: "2024-04-26 14:30:12",
        status: "completed",
        description: "Payment Authorized",
        details: "Processor: Direct Bank",
      },
      {
        timestamp: "2024-04-26 14:35:00",
        status: "completed",
        description: "Settlement Processing",
        details: "Expected completion: 15:00 PM",
      },
      {
        timestamp: "2024-04-26 15:15:00",
        status: "completed",
        description: "Settlement Completed",
        details: "Amount received: ₦72,950",
      },
      {
        timestamp: "2024-04-26 15:16:00",
        status: "failed",
        description: "Variance Detected",
        details: "Expected: ₦75,250, Received: ₦72,950",
      },
    ],
  },
  "Multi": {
    id: "Multi (5)",
    events: [
      {
        timestamp: "2024-04-26 09:00:00",
        status: "completed",
        description: "Batch Payments Initiated",
        details: "5 payments, Total: ₦534,200",
      },
      {
        timestamp: "2024-04-26 09:01:30",
        status: "completed",
        description: "Payments Authorized",
        details: "Processor: Interswitch",
      },
      {
        timestamp: "2024-04-26 09:15:00",
        status: "failed", 
        description: "Settlement Failed",
        details: "Reason: API Error",
      },
      {
        timestamp: "2024-04-26 10:00:00",
        status: "completed",
        description: "Settlement Retry Initiated",
        details: "Manual retry by admin",
      },
      {
        timestamp: "2024-04-26 10:30:00",
        status: "failed",
        description: "Settlement Retry Failed",
        details: "Reason: Insufficient funds in processor account",
      },
    ],
  },
};

const getStatusIcon = (status: TransactionEvent["status"]) => {
  switch (status) {
    case "completed":
      return <Clock className="h-4 w-4 text-green-500" />;
    case "pending":
      return <Info className="h-4 w-4 text-yellow-500" />;
    case "failed":
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
  }
};

export const TransactionInvestigation = ({ transactionId }: { transactionId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Get the correct transaction based on its reference
  const transaction = mockTransactionData[transactionId] || 
    mockTransactionData[transactionId.split(" ")[0]]; // Handle "Multi (5)" case

  if (!transaction) {
    return null;
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger className="text-discrepay-600 hover:text-discrepay-800 underline text-xs">
        Investigate
      </DrawerTrigger>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader>
          <DrawerTitle>Transaction Investigation - {transaction.id}</DrawerTitle>
        </DrawerHeader>
        <div className="p-4 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transaction.events.map((event, index) => (
                <TableRow key={index}>
                  <TableCell className="font-mono">{event.timestamp}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(event.status)}
                      <span className="capitalize">{event.status}</span>
                    </div>
                  </TableCell>
                  <TableCell>{event.description}</TableCell>
                  <TableCell>{event.details}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

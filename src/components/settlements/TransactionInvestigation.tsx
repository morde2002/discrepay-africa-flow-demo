
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
  // Add more transaction data as needed
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
  const transaction = mockTransactionData[transactionId];

  if (!transaction) {
    return null;
  }

  return (
    <Drawer>
      <DrawerTrigger className="text-discrepay-600 hover:text-discrepay-800 underline text-xs">
        Investigate
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Transaction Investigation - {transaction.id}</DrawerTitle>
        </DrawerHeader>
        <div className="p-4">
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


import React, { useState } from "react";
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
import { Clock, Info, AlertTriangle, RefreshCw, Flag, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

type TransactionEvent = {
  timestamp: string;
  status: "completed" | "pending" | "failed";
  description: string;
  details: string;
};

type FinancialDetail = {
  label: string;
  value: string;
  highlight?: boolean;
};

type TransactionData = {
  id: string;
  events: TransactionEvent[];
  financialDetails: FinancialDetail[];
  status: "matched" | "missing" | "delayed" | "partial";
  processor: string;
  processorFee: string;
  processorFeeAmount: string;
  netAmount: string;
  amount: string;
  expectedTime?: string;
  actualTime?: string;
  failureReason?: string;
  retryAttempts?: number;
};

// More comprehensive transaction data for multiple transactions
const mockTransactionData: Record<string, TransactionData> = {
  "TX938485": {
    id: "TX938485",
    status: "missing",
    processor: "Paystack",
    processorFee: "2.5%",
    processorFeeAmount: "₦6,143",
    netAmount: "₦239,557",
    amount: "₦245,700",
    expectedTime: "10:30 AM",
    actualTime: "-",
    failureReason: "Processor timeout",
    retryAttempts: 2,
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
      {
        timestamp: "2024-04-27 12:30:00",
        status: "failed",
        description: "Settlement Retry Failed",
        details: "Reason: API Error",
      },
    ],
    financialDetails: [
      { label: "Initiated Amount", value: "₦245,700" },
      { label: "Processor", value: "Paystack" },
      { label: "Processor Fee %", value: "2.5%" },
      { label: "Processor Fee Amount", value: "₦6,143" },
      { label: "Net Settlement Amount", value: "₦239,557" },
      { label: "Bank Fees", value: "₦0" },
      { label: "Final Amount Received", value: "₦0", highlight: true },
      { label: "Expected Amount", value: "₦239,557", highlight: true },
      { label: "Variance", value: "₦239,557 (Missing)", highlight: true },
    ],
  },
  "TX938421": {
    id: "TX938421",
    status: "delayed",
    processor: "Flutterwave",
    processorFee: "2.8%",
    processorFeeAmount: "₦3,598",
    netAmount: "₦124,902",
    amount: "₦128,500",
    expectedTime: "09:00 AM",
    actualTime: "Pending",
    failureReason: "Processor backlog",
    retryAttempts: 0,
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
    financialDetails: [
      { label: "Initiated Amount", value: "₦128,500" },
      { label: "Processor", value: "Flutterwave" },
      { label: "Processor Fee %", value: "2.8%" },
      { label: "Processor Fee Amount", value: "₦3,598" },
      { label: "Net Settlement Amount", value: "₦124,902" },
      { label: "Bank Fees", value: "₦0" },
      { label: "Final Amount Received", value: "Pending", highlight: true },
      { label: "Expected Amount", value: "₦124,902", highlight: true },
      { label: "Variance", value: "Delayed", highlight: true },
    ],
  },
  "TX937712": {
    id: "TX937712",
    status: "partial",
    processor: "Direct Bank",
    processorFee: "1.5%",
    processorFeeAmount: "₦1,129",
    netAmount: "₦74,121",
    amount: "₦75,250",
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
        details: "Expected: ₦74,121, Received: ₦72,950",
      },
    ],
    financialDetails: [
      { label: "Initiated Amount", value: "₦75,250" },
      { label: "Processor", value: "Direct Bank" },
      { label: "Processor Fee %", value: "1.5%" },
      { label: "Processor Fee Amount", value: "₦1,129" },
      { label: "Net Settlement Amount", value: "₦74,121" },
      { label: "Bank Fees", value: "₦1,171" },
      { label: "Final Amount Received", value: "₦72,950", highlight: true },
      { label: "Expected Amount", value: "₦74,121", highlight: true },
      { label: "Variance", value: "₦1,171 (Short)", highlight: true },
    ],
  },
  "Multi": {
    id: "Multi (5)",
    status: "missing",
    processor: "Interswitch",
    processorFee: "2.2%",
    processorFeeAmount: "₦11,752",
    netAmount: "₦522,448",
    amount: "₦534,200",
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
    financialDetails: [
      { label: "Initiated Amount", value: "₦534,200" },
      { label: "Processor", value: "Interswitch" },
      { label: "Processor Fee %", value: "2.2%" },
      { label: "Processor Fee Amount", value: "₦11,752" },
      { label: "Net Settlement Amount", value: "₦522,448" },
      { label: "Bank Fees", value: "₦0" },
      { label: "Final Amount Received", value: "₦0", highlight: true },
      { label: "Expected Amount", value: "₦522,448", highlight: true },
      { label: "Variance", value: "₦522,448 (Missing)", highlight: true },
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
  const [activeTab, setActiveTab] = useState("timeline");
  
  // Get the correct transaction based on its reference
  const transaction = mockTransactionData[transactionId] || 
    mockTransactionData[transactionId.split(" ")[0]]; // Handle "Multi (5)" case

  const handleAction = (action: string) => {
    switch (action) {
      case "retry":
        toast.success("Settlement retry initiated for " + transaction.id);
        break;
      case "exception":
        toast.success("Transaction " + transaction.id + " marked as exception");
        break;
      case "escalate":
        toast.success("Escalation created for " + transaction.id);
        break;
      default:
        break;
    }
  };

  if (!transaction) {
    return null;
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger className="text-discrepay-600 hover:text-discrepay-800 underline text-xs">
        Investigate
      </DrawerTrigger>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="border-b mb-2">
          <DrawerTitle className="flex items-center justify-between">
            <span>Transaction Investigation - {transaction.id}</span>
            <Badge
              className={
                transaction.status === "matched"
                  ? "bg-green-100 text-green-800"
                  : transaction.status === "delayed"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }
            >
              {transaction.status.toUpperCase()}
            </Badge>
          </DrawerTitle>
        </DrawerHeader>
        <div className="p-4 overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-1">
              <div className="text-sm font-medium">Amount</div>
              <div className="text-lg font-bold">{transaction.amount}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm font-medium">Processor</div>
              <div className="flex items-center">
                <span className="font-medium">{transaction.processor}</span>
                <span className="text-xs text-gray-500 ml-2">
                  (Fee: {transaction.processorFee})
                </span>
              </div>
            </div>
            {transaction.expectedTime && (
              <div className="space-y-1">
                <div className="text-sm font-medium">Expected Settlement</div>
                <div>{transaction.expectedTime}</div>
              </div>
            )}
            {transaction.actualTime && (
              <div className="space-y-1">
                <div className="text-sm font-medium">Actual Settlement</div>
                <div>{transaction.actualTime}</div>
              </div>
            )}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="financial">Financial Details</TabsTrigger>
              <TabsTrigger value="actions">Actions</TabsTrigger>
            </TabsList>
            <TabsContent value="timeline" className="mt-0">
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
            </TabsContent>
            <TabsContent value="financial" className="mt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Detail</TableHead>
                    <TableHead>Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transaction.financialDetails.map((detail, index) => (
                    <TableRow key={index}>
                      <TableCell>{detail.label}</TableCell>
                      <TableCell className={detail.highlight ? "font-bold text-discrepay-700" : ""}>
                        {detail.value}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="actions" className="mt-0">
              <div className="flex flex-col gap-4 p-2">
                <div className="space-y-2">
                  <h4 className="font-medium">Available Actions</h4>
                  <p className="text-sm text-gray-600">
                    Select an action to resolve issues with this transaction:
                  </p>
                </div>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => handleAction("retry")}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Retry Settlement
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => handleAction("exception")}
                  >
                    <Flag className="mr-2 h-4 w-4" />
                    Mark as Exception
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => handleAction("escalate")}
                  >
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Escalate to Processor Support
                  </Button>
                </div>
                {transaction.failureReason && (
                  <div className="bg-red-50 p-3 rounded-md mt-2">
                    <h4 className="text-sm font-medium text-red-800">Failure Reason</h4>
                    <p className="text-sm text-red-600">{transaction.failureReason}</p>
                    {transaction.retryAttempts !== undefined && (
                      <p className="text-xs text-red-500 mt-1">
                        Retry attempts: {transaction.retryAttempts}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DrawerContent>
    </Drawer>
  );
};


import React, { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  PlayCircle, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle,
  DownloadCloud
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ReconciliationConfig {
  id: string;
  primaryAccountId: string;
  matchingAccountIds: string[];
  reconciliationType: string;
  createdAt: string;
}

interface MatchingSettings {
  reconciliationId: string;
  matchAmount: boolean;
  matchDate: boolean;
  matchReference: boolean;
  matchCustomField: boolean;
  customFieldName: string;
  dateVariance: number;
  amountVariance: number;
}

// Mock transaction data
const mockTransactions = {
  matched: [
    { id: "m1", date: "2023-04-20", amount: 1250.00, reference: "TXN123456", status: "matched" },
    { id: "m2", date: "2023-04-21", amount: 725.50, reference: "TXN789012", status: "matched" },
    { id: "m3", date: "2023-04-22", amount: 3000.00, reference: "TXN345678", status: "matched" },
  ],
  unmatchedPrimary: [
    { id: "u1", date: "2023-04-23", amount: 500.00, reference: "TXN901234", status: "unmatched" },
    { id: "u2", date: "2023-04-24", amount: 1750.25, reference: "TXN567890", status: "unmatched" },
  ],
  unmatchedMatching: [
    { id: "um1", date: "2023-04-25", amount: 450.00, reference: "TXN234567", status: "unmatched" },
    { id: "um2", date: "2023-04-26", amount: 890.75, reference: "TXN890123", status: "unmatched" },
    { id: "um3", date: "2023-04-27", amount: 1200.00, reference: "TXN456789", status: "unmatched" },
  ],
  partialMatches: [
    { id: "p1", date: "2023-04-28", amount: 1000.00, reference: "TXN012345", status: "partial", variance: 5.00 },
    { id: "p2", date: "2023-04-29", amount: 2500.00, reference: "TXN678901", status: "partial", variance: 10.00 },
  ]
};

const ReconciliationResults = () => {
  const [currentReconciliation, setCurrentReconciliation] = useState<ReconciliationConfig | null>(null);
  const [matchingSettings, setMatchingSettings] = useState<MatchingSettings | null>(null);
  const [isReconciliationRun, setIsReconciliationRun] = useState(false);
  const [reconciliationResults, setReconciliationResults] = useState<typeof mockTransactions | null>(null);
  
  useEffect(() => {
    const savedConfig = localStorage.getItem('currentReconciliation');
    const savedSettings = localStorage.getItem('reconciliationMatchingSettings');
    
    if (savedConfig) {
      setCurrentReconciliation(JSON.parse(savedConfig));
    }
    
    if (savedSettings) {
      setMatchingSettings(JSON.parse(savedSettings));
    }
  }, []);
  
  const runReconciliation = () => {
    if (!currentReconciliation || !matchingSettings) {
      toast.error("Missing reconciliation configuration or matching settings");
      return;
    }
    
    // In a real app, this would process actual uploaded statement data
    // For now, we'll just use the mock data
    setReconciliationResults(mockTransactions);
    setIsReconciliationRun(true);
    toast.success("Reconciliation completed successfully");
  };
  
  const handleTagMismatch = (id: string, reason: string) => {
    // In a real app, this would update the transaction with the reason
    toast.success(`Transaction ${id} tagged as "${reason}"`);
  };

  if (!currentReconciliation || !matchingSettings) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Reconciliation Results</CardTitle>
          <CardDescription>View and analyze reconciliation results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-md">
            <p className="text-amber-800">
              Reconciliation is not fully configured. Please complete the previous steps first.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Reconciliation Results</CardTitle>
          <CardDescription>
            View and manage reconciliation results
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isReconciliationRun ? (
            <div className="text-center py-8 space-y-4">
              <PlayCircle className="mx-auto h-12 w-12 text-primary/60" />
              <div>
                <h3 className="text-lg font-medium">Ready to Run Reconciliation</h3>
                <p className="text-muted-foreground mb-4">
                  Click the button below to start the reconciliation process based on your configuration.
                </p>
                <Button onClick={runReconciliation}>
                  <PlayCircle className="mr-2 h-4 w-4" /> Run Reconciliation
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h3 className="font-medium">Reconciliation Summary</h3>
                  <p className="text-sm text-muted-foreground">
                    {reconciliationResults?.matched.length || 0} matched • 
                    {reconciliationResults?.unmatchedPrimary.length || 0} unmatched in primary • 
                    {reconciliationResults?.unmatchedMatching.length || 0} unmatched in matching • 
                    {reconciliationResults?.partialMatches.length || 0} partial matches
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <DownloadCloud className="mr-2 h-4 w-4" /> Export Results
                </Button>
              </div>
              
              <Tabs defaultValue="matched" className="w-full">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="matched">
                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                    Matched ({reconciliationResults?.matched.length || 0})
                  </TabsTrigger>
                  <TabsTrigger value="unmatched-primary">
                    <XCircle className="h-4 w-4 mr-2 text-red-500" />
                    Unmatched Primary ({reconciliationResults?.unmatchedPrimary.length || 0})
                  </TabsTrigger>
                  <TabsTrigger value="unmatched-matching">
                    <XCircle className="h-4 w-4 mr-2 text-orange-500" />
                    Unmatched Matching ({reconciliationResults?.unmatchedMatching.length || 0})
                  </TabsTrigger>
                  <TabsTrigger value="partial-matches">
                    <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                    Partial ({reconciliationResults?.partialMatches.length || 0})
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="matched">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Reference</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reconciliationResults?.matched.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                          <TableCell>{transaction.reference}</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Matched
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="unmatched-primary">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Reference</TableHead>
                        <TableHead>Tag Reason</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reconciliationResults?.unmatchedPrimary.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                          <TableCell>{transaction.reference}</TableCell>
                          <TableCell>
                            <Select onValueChange={(reason) => handleTagMismatch(transaction.id, reason)}>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select reason" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="settlement-delay">Settlement Delay</SelectItem>
                                <SelectItem value="fee-deduction">Fee Deduction</SelectItem>
                                <SelectItem value="missing-reference">Missing Reference</SelectItem>
                                <SelectItem value="pending-settlement">Pending Settlement</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="unmatched-matching">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Reference</TableHead>
                        <TableHead>Tag Reason</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reconciliationResults?.unmatchedMatching.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                          <TableCell>{transaction.reference}</TableCell>
                          <TableCell>
                            <Select onValueChange={(reason) => handleTagMismatch(transaction.id, reason)}>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select reason" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="settlement-delay">Settlement Delay</SelectItem>
                                <SelectItem value="fee-deduction">Fee Deduction</SelectItem>
                                <SelectItem value="missing-reference">Missing Reference</SelectItem>
                                <SelectItem value="pending-settlement">Pending Settlement</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="partial-matches">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Reference</TableHead>
                        <TableHead>Variance</TableHead>
                        <TableHead>Tag Reason</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reconciliationResults?.partialMatches.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                          <TableCell>{transaction.reference}</TableCell>
                          <TableCell className="text-amber-500">
                            ${transaction.variance?.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Select onValueChange={(reason) => handleTagMismatch(transaction.id, reason)}>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select reason" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="fee-deduction">Fee Deduction</SelectItem>
                                <SelectItem value="partial-settlement">Partial Settlement</SelectItem>
                                <SelectItem value="currency-conversion">Currency Conversion</SelectItem>
                                <SelectItem value="other">Other Variance</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReconciliationResults;

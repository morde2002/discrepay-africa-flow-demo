
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { FileSpreadsheet, FileText, Download, PieChart, BarChart } from "lucide-react";

interface Invoice {
  id: string;
  accountId: string;
  invoiceNumber: string;
  date: string;
  amount: number;
  counterpartyName: string;
  referenceId: string;
  status: string;
}

interface Payment {
  id: string;
  paymentReference: string;
  paymentDate: string;
  amount: number;
  counterpartyName: string;
  paymentChannel: string;
}

interface ReconciliationResult {
  id: string;
  type: 'matched' | 'partially_matched' | 'unmatched_invoice' | 'unmatched_payment' | 'duplicate';
  invoice?: Invoice;
  payment?: Payment;
  difference?: number;
  review?: {
    status: 'reviewed' | 'flagged' | 'disputed';
    reason?: string;
    notes?: string;
  };
}

export const ReportsGeneration: React.FC = () => {
  const [results, setResults] = useState<ReconciliationResult[]>([]);
  const [reportType, setReportType] = useState('summary');
  const [includeAll, setIncludeAll] = useState(true);
  const [includeMatched, setIncludeMatched] = useState(true);
  const [includePartial, setIncludePartial] = useState(true);
  const [includeUnmatchedInvoices, setIncludeUnmatchedInvoices] = useState(true);
  const [includeUnmatchedPayments, setIncludeUnmatchedPayments] = useState(true);
  const [includeDuplicates, setIncludeDuplicates] = useState(true);
  const [includeReviewComments, setIncludeReviewComments] = useState(true);
  
  // Load results from localStorage on component mount
  useEffect(() => {
    const savedResults = localStorage.getItem('reconciliationResults');
    if (savedResults) {
      setResults(JSON.parse(savedResults));
    }
  }, []);

  // Update filters when "All" is changed
  useEffect(() => {
    if (includeAll) {
      setIncludeMatched(true);
      setIncludePartial(true);
      setIncludeUnmatchedInvoices(true);
      setIncludeUnmatchedPayments(true);
      setIncludeDuplicates(true);
    }
  }, [includeAll]);

  // Update "All" when any individual filter is changed
  useEffect(() => {
    const allSelected = includeMatched && 
      includePartial && 
      includeUnmatchedInvoices && 
      includeUnmatchedPayments && 
      includeDuplicates;
      
    setIncludeAll(allSelected);
  }, [includeMatched, includePartial, includeUnmatchedInvoices, includeUnmatchedPayments, includeDuplicates]);

  // Count results by type
  const getTypeCount = (type: string) => {
    return results.filter(result => result.type === type).length;
  };

  const getReviewStatusCount = (status: string) => {
    return results.filter(result => result.review?.status === status).length;
  };

  // Format currency
  const formatCurrency = (amount: number | undefined) => {
    if (amount === undefined) return '$0.00';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  // Calculate total invoice and payment amounts
  const totalInvoiceAmount = results.reduce((sum, result) => {
    return sum + (result.invoice?.amount || 0);
  }, 0);

  const totalPaymentAmount = results.reduce((sum, result) => {
    return sum + (result.payment?.amount || 0);
  }, 0);

  const totalVariance = totalPaymentAmount - totalInvoiceAmount;

  // Generate a fake report 
  const generateReport = () => {
    // Validate if there are any results to generate a report
    if (results.length === 0) {
      toast.error("No reconciliation data available");
      return;
    }
    
    // Validate if any report type is selected
    if (!includeMatched && !includePartial && !includeUnmatchedInvoices && 
        !includeUnmatchedPayments && !includeDuplicates) {
      toast.error("Select at least one item type to include in the report");
      return;
    }
    
    toast.success(`${reportType.charAt(0).toUpperCase() + reportType.slice(1)} report generated successfully`);
    
    // In a real application, this would trigger a download or open a new tab
    setTimeout(() => {
      toast.info("Download started");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Generate Reconciliation Reports</CardTitle>
          <CardDescription>
            Create reports from your reconciliation data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={reportType} onValueChange={setReportType} className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="summary">
                <PieChart className="h-4 w-4 mr-2" />
                Summary Report
              </TabsTrigger>
              <TabsTrigger value="matched">
                <BarChart className="h-4 w-4 mr-2" />
                Matched Report
              </TabsTrigger>
              <TabsTrigger value="unmatched">
                <FileText className="h-4 w-4 mr-2" />
                Variance Report
              </TabsTrigger>
              <TabsTrigger value="custom">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Custom Report
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="summary" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Reconciliation Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Total Invoices:</span>
                      <span className="font-medium">{results.filter(r => r.invoice).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Total Payments:</span>
                      <span className="font-medium">{results.filter(r => r.payment).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Invoice Value:</span>
                      <span className="font-medium">{formatCurrency(totalInvoiceAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Payment Value:</span>
                      <span className="font-medium">{formatCurrency(totalPaymentAmount)}</span>
                    </div>
                    <div className="flex justify-between font-medium border-t pt-2 mt-2">
                      <span>Net Variance:</span>
                      <span className={totalVariance >= 0 ? "text-green-600" : "text-red-600"}>
                        {formatCurrency(totalVariance)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Match Status</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-green-600">Full Matches:</span>
                      <span className="font-medium">{getTypeCount('matched')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-yellow-600">Partial Matches:</span>
                      <span className="font-medium">{getTypeCount('partially_matched')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-600">Unmatched Invoices:</span>
                      <span className="font-medium">{getTypeCount('unmatched_invoice')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-600">Unmatched Payments:</span>
                      <span className="font-medium">{getTypeCount('unmatched_payment')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-600">Duplicates:</span>
                      <span className="font-medium">{getTypeCount('duplicate')}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Review Status</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-green-600">Reviewed:</span>
                      <span className="font-medium">{getReviewStatusCount('reviewed')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-orange-600">Flagged:</span>
                      <span className="font-medium">{getReviewStatusCount('flagged')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-600">Disputed:</span>
                      <span className="font-medium">{getReviewStatusCount('disputed')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Unreviewed:</span>
                      <span className="font-medium">
                        {results.filter(r => !r.review && r.type !== 'matched').length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <h3 className="font-medium mb-2">Report Options</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="include-review-summary" 
                      checked={includeReviewComments}
                      onCheckedChange={(checked) => setIncludeReviewComments(checked as boolean)}
                    />
                    <Label htmlFor="include-review-summary">Include review comments</Label>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="matched" className="space-y-4">
              <div className="p-4 border rounded-md bg-green-50">
                <h3 className="font-medium mb-2 flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  Matched Transactions Report
                </h3>
                <p className="text-sm text-gray-600">
                  This report includes all successfully matched invoices and payments.
                </p>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <h3 className="font-medium mb-2">Report Options</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="include-full-details-matched" 
                      checked={true}
                      disabled
                    />
                    <Label htmlFor="include-full-details-matched">Include full transaction details</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="include-date-matched" 
                      checked={true}
                      disabled
                    />
                    <Label htmlFor="include-date-matched">Include match date</Label>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="unmatched" className="space-y-4">
              <div className="p-4 border rounded-md bg-red-50">
                <h3 className="font-medium mb-2 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
                  Variance Report
                </h3>
                <p className="text-sm text-gray-600">
                  This report includes all unmatched invoices, unmatched payments, and partial matches.
                </p>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <h3 className="font-medium mb-2">Include Items</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="include-partial-matches" 
                      checked={true}
                      disabled
                    />
                    <Label htmlFor="include-partial-matches">Partial matches</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="include-unmatched-invoices" 
                      checked={true}
                      disabled
                    />
                    <Label htmlFor="include-unmatched-invoices">Unmatched invoices</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="include-unmatched-payments" 
                      checked={true}
                      disabled
                    />
                    <Label htmlFor="include-unmatched-payments">Unmatched payments</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="include-review-comments-unmatched" 
                      checked={includeReviewComments}
                      onCheckedChange={(checked) => setIncludeReviewComments(checked as boolean)}
                    />
                    <Label htmlFor="include-review-comments-unmatched">Include review comments</Label>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="custom" className="space-y-4">
              <div className="p-4 border rounded-md bg-blue-50">
                <h3 className="font-medium mb-2 flex items-center">
                  <FileSpreadsheet className="h-4 w-4 mr-2 text-blue-500" />
                  Custom Report
                </h3>
                <p className="text-sm text-gray-600">
                  Create a customized report with your selected data.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Include Items</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="include-all" 
                      checked={includeAll}
                      onCheckedChange={(checked) => setIncludeAll(checked as boolean)}
                    />
                    <Label htmlFor="include-all">All items</Label>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-6">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="include-matched-custom" 
                        checked={includeMatched}
                        onCheckedChange={(checked) => setIncludeMatched(checked as boolean)}
                        disabled={includeAll}
                      />
                      <Label htmlFor="include-matched-custom">Matched transactions</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="include-partial-custom" 
                        checked={includePartial}
                        onCheckedChange={(checked) => setIncludePartial(checked as boolean)}
                        disabled={includeAll}
                      />
                      <Label htmlFor="include-partial-custom">Partial matches</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="include-unmatched-invoices-custom" 
                        checked={includeUnmatchedInvoices}
                        onCheckedChange={(checked) => setIncludeUnmatchedInvoices(checked as boolean)}
                        disabled={includeAll}
                      />
                      <Label htmlFor="include-unmatched-invoices-custom">Unmatched invoices</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="include-unmatched-payments-custom" 
                        checked={includeUnmatchedPayments}
                        onCheckedChange={(checked) => setIncludeUnmatchedPayments(checked as boolean)}
                        disabled={includeAll}
                      />
                      <Label htmlFor="include-unmatched-payments-custom">Unmatched payments</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="include-duplicates-custom" 
                        checked={includeDuplicates}
                        onCheckedChange={(checked) => setIncludeDuplicates(checked as boolean)}
                        disabled={includeAll}
                      />
                      <Label htmlFor="include-duplicates-custom">Duplicate payments</Label>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-4">
                    <Checkbox 
                      id="include-review-comments-custom" 
                      checked={includeReviewComments}
                      onCheckedChange={(checked) => setIncludeReviewComments(checked as boolean)}
                    />
                    <Label htmlFor="include-review-comments-custom">Include review comments</Label>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-gray-500">
            {results.length === 0 ? (
              "No reconciliation data available"
            ) : (
              <span>
                Report based on data from {new Date().toLocaleDateString()}
              </span>
            )}
          </div>
          <Button 
            onClick={generateReport} 
            disabled={results.length === 0}
          >
            <Download className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

// Helper components
const Check = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const AlertTriangle = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

// Helper Label component
const Label: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => (
  <div className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`} {...props}>
    {children}
  </div>
);

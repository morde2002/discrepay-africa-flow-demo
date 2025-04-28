
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Play, RefreshCw, FileText } from "lucide-react";

// Define interfaces for our data
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

interface MatchingRulesConfig {
  matchByInvoiceNumber: boolean;
  matchByAmount: boolean;
  matchByCounterparty: boolean;
  matchByDate: boolean;
  amountTolerance: number;
  dateTolerance: number;
}

interface ReconciliationResult {
  id: string;
  type: 'matched' | 'partially_matched' | 'unmatched_invoice' | 'unmatched_payment' | 'duplicate';
  invoice?: Invoice;
  payment?: Payment;
  difference?: number; // For partially matched
}

export const ReconciliationResults: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [config, setConfig] = useState<MatchingRulesConfig>({
    matchByInvoiceNumber: true,
    matchByAmount: true,
    matchByCounterparty: false,
    matchByDate: false,
    amountTolerance: 0,
    dateTolerance: 0
  });
  const [results, setResults] = useState<ReconciliationResult[]>([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedInvoices = localStorage.getItem('invoices');
    const savedPayments = localStorage.getItem('payments');
    const savedConfig = localStorage.getItem('matchingRulesConfig');
    const savedResults = localStorage.getItem('reconciliationResults');
    
    if (savedInvoices) {
      setInvoices(JSON.parse(savedInvoices));
    }
    
    if (savedPayments) {
      setPayments(JSON.parse(savedPayments));
    }
    
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }
    
    if (savedResults) {
      setResults(JSON.parse(savedResults));
      setHasRun(true);
    }
  }, []);

  // Save results to localStorage whenever they change
  useEffect(() => {
    if (hasRun) {
      localStorage.setItem('reconciliationResults', JSON.stringify(results));
    }
  }, [results, hasRun]);

  // Function to check if two dates are within tolerance days of each other
  const isDatesWithinTolerance = (date1: string, date2: string, tolerance: number): boolean => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= tolerance;
  };

  // Function to check if two amounts are within tolerance
  const isAmountsWithinTolerance = (amount1: number, amount2: number, tolerance: number): boolean => {
    return Math.abs(amount1 - amount2) <= tolerance;
  };

  // Run the reconciliation
  const runReconciliation = () => {
    if (invoices.length === 0 || payments.length === 0) {
      toast.error("You need both invoices and payments to run reconciliation");
      return;
    }

    setIsLoading(true);
    
    // This would be a complex backend process in a real app
    // Here we'll do a simple implementation
    
    setTimeout(() => {
      const newResults: ReconciliationResult[] = [];
      const matchedInvoiceIds = new Set<string>();
      const matchedPaymentIds = new Set<string>();
      const duplicatePayments = new Map<string, Payment[]>();
      
      // First pass: Try to find exact matches
      invoices.forEach(invoice => {
        let matched = false;
        
        for (const payment of payments) {
          // Skip already matched payments (except for duplicate detection)
          if (matchedPaymentIds.has(payment.id)) continue;
          
          // Calculate match score based on config
          let isMatch = true;
          
          // Check invoice number/reference match
          if (config.matchByInvoiceNumber) {
            isMatch = isMatch && (invoice.invoiceNumber === payment.paymentReference || 
                                  payment.paymentReference.includes(invoice.invoiceNumber) || 
                                  invoice.invoiceNumber.includes(payment.paymentReference));
          }
          
          // Check amount match (with tolerance)
          if (config.matchByAmount) {
            isMatch = isMatch && isAmountsWithinTolerance(invoice.amount, payment.amount, config.amountTolerance);
          }
          
          // Check counterparty match
          if (config.matchByCounterparty) {
            const invoiceCounterparty = invoice.counterpartyName.toLowerCase();
            const paymentCounterparty = payment.counterpartyName.toLowerCase();
            isMatch = isMatch && (invoiceCounterparty.includes(paymentCounterparty) || 
                                 paymentCounterparty.includes(invoiceCounterparty));
          }
          
          // Check date match (with tolerance)
          if (config.matchByDate) {
            isMatch = isMatch && isDatesWithinTolerance(invoice.date, payment.paymentDate, config.dateTolerance);
          }
          
          if (isMatch) {
            // Check if it's an exact match or partial match (amount difference)
            if (invoice.amount === payment.amount) {
              newResults.push({
                id: crypto.randomUUID(),
                type: 'matched',
                invoice,
                payment
              });
              
              matchedInvoiceIds.add(invoice.id);
              matchedPaymentIds.add(payment.id);
              matched = true;
              break;
            }
            else {
              newResults.push({
                id: crypto.randomUUID(),
                type: 'partially_matched',
                invoice,
                payment,
                difference: payment.amount - invoice.amount // Positive: overpaid, Negative: underpaid
              });
              
              matchedInvoiceIds.add(invoice.id);
              matchedPaymentIds.add(payment.id);
              matched = true;
              break;
            }
          }
        }
        
        // Check for duplicate payments for this invoice
        if (matched && config.matchByInvoiceNumber) {
          const potentialDuplicates = payments.filter(payment => 
            !matchedPaymentIds.has(payment.id) && 
            (invoice.invoiceNumber === payment.paymentReference || 
             payment.paymentReference.includes(invoice.invoiceNumber) || 
             invoice.invoiceNumber.includes(payment.paymentReference))
          );
          
          if (potentialDuplicates.length > 0) {
            duplicatePayments.set(invoice.id, potentialDuplicates);
          }
        }
        
        // If no match found, mark as unmatched invoice
        if (!matched) {
          newResults.push({
            id: crypto.randomUUID(),
            type: 'unmatched_invoice',
            invoice
          });
        }
      });
      
      // Add unmatched payments
      payments.forEach(payment => {
        if (!matchedPaymentIds.has(payment.id)) {
          newResults.push({
            id: crypto.randomUUID(),
            type: 'unmatched_payment',
            payment
          });
        }
      });
      
      // Add duplicate payments
      duplicatePayments.forEach((duplicatePaymentList, invoiceId) => {
        const invoice = invoices.find(inv => inv.id === invoiceId);
        duplicatePaymentList.forEach(payment => {
          newResults.push({
            id: crypto.randomUUID(),
            type: 'duplicate',
            invoice,
            payment
          });
        });
      });
      
      setResults(newResults);
      setHasRun(true);
      
      const matchedCount = newResults.filter(r => r.type === 'matched').length;
      const partialCount = newResults.filter(r => r.type === 'partially_matched').length;
      const unmatchedInvCount = newResults.filter(r => r.type === 'unmatched_invoice').length;
      const unmatchedPayCount = newResults.filter(r => r.type === 'unmatched_payment').length;
      const duplicateCount = newResults.filter(r => r.type === 'duplicate').length;
      
      toast.success(`Reconciliation complete: ${matchedCount} matched, ${partialCount} partial matches, ${unmatchedInvCount} unmatched invoices, ${unmatchedPayCount} unmatched payments, ${duplicateCount} duplicate payments`);
      
      setIsLoading(false);
    }, 1500); // Simulate processing time
  };

  // Get counts for each category
  const getTypeCount = (type: string) => {
    return results.filter(result => result.type === type).length;
  };

  // Filter results by type
  const getFilteredResults = () => {
    if (activeTab === 'all') {
      return results;
    }
    return results.filter(result => result.type === activeTab);
  };

  // Format currency
  const formatCurrency = (amount: number | undefined) => {
    if (amount === undefined) return '';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Reconciliation Engine</CardTitle>
              <CardDescription>
                Run the matching process to reconcile invoices and payments.
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button 
                onClick={runReconciliation}
                disabled={isLoading || invoices.length === 0 || payments.length === 0}
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Run Matching
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="text-green-700 font-medium">Invoices</div>
              <div className="text-3xl font-bold">{invoices.length}</div>
              <div className="text-sm text-gray-500">Total: {formatCurrency(invoices.reduce((sum, invoice) => sum + invoice.amount, 0))}</div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="text-blue-700 font-medium">Payments</div>
              <div className="text-3xl font-bold">{payments.length}</div>
              <div className="text-sm text-gray-500">Total: {formatCurrency(payments.reduce((sum, payment) => sum + payment.amount, 0))}</div>
            </div>
            
            {hasRun && (
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="text-purple-700 font-medium">Match Rate</div>
                <div className="text-3xl font-bold">
                  {invoices.length > 0 
                    ? Math.round(((getTypeCount('matched') + getTypeCount('partially_matched')) / invoices.length) * 100)
                    : 0}%
                </div>
                <div className="text-sm text-gray-500">
                  {getTypeCount('matched')} full + {getTypeCount('partially_matched')} partial matches
                </div>
              </div>
            )}
          </div>
          
          {!hasRun ? (
            <div className="text-center py-12 border rounded-md bg-gray-50">
              <h3 className="text-lg font-medium mb-2">Ready to Reconcile</h3>
              <p className="text-gray-500 mb-4">
                Click "Run Matching" to start the reconciliation process.
              </p>
              <p className="text-sm text-gray-400">
                {invoices.length === 0 && 'Add invoices first. '}
                {payments.length === 0 && 'Add payments first. '}
              </p>
            </div>
          ) : (
            <div>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-6">
                  <TabsTrigger value="all">
                    All ({results.length})
                  </TabsTrigger>
                  <TabsTrigger value="matched">
                    Matched ({getTypeCount('matched')})
                  </TabsTrigger>
                  <TabsTrigger value="partially_matched">
                    Partial ({getTypeCount('partially_matched')})
                  </TabsTrigger>
                  <TabsTrigger value="unmatched_invoice">
                    Unmatched Invoices ({getTypeCount('unmatched_invoice')})
                  </TabsTrigger>
                  <TabsTrigger value="unmatched_payment">
                    Unmatched Payments ({getTypeCount('unmatched_payment')})
                  </TabsTrigger>
                  <TabsTrigger value="duplicate">
                    Duplicates ({getTypeCount('duplicate')})
                  </TabsTrigger>
                </TabsList>
                
                <div className="mt-4 overflow-x-auto">
                  <Table className="min-w-full">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Invoice #</TableHead>
                        <TableHead>Invoice Date</TableHead>
                        <TableHead>Invoice Amount</TableHead>
                        <TableHead>Payment Ref</TableHead>
                        <TableHead>Payment Date</TableHead>
                        <TableHead>Payment Amount</TableHead>
                        <TableHead>Difference</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getFilteredResults().length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-4">
                            No results in this category
                          </TableCell>
                        </TableRow>
                      ) : (
                        getFilteredResults().map((result) => (
                          <TableRow key={result.id} className={
                            result.type === 'matched' ? 'bg-green-50' :
                            result.type === 'partially_matched' ? 'bg-yellow-50' :
                            result.type === 'unmatched_invoice' ? 'bg-red-50' :
                            result.type === 'unmatched_payment' ? 'bg-blue-50' :
                            'bg-purple-50' // duplicate
                          }>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                result.type === 'matched' ? 'bg-green-100 text-green-800' :
                                result.type === 'partially_matched' ? 'bg-yellow-100 text-yellow-800' :
                                result.type === 'unmatched_invoice' ? 'bg-red-100 text-red-800' :
                                result.type === 'unmatched_payment' ? 'bg-blue-100 text-blue-800' :
                                'bg-purple-100 text-purple-800' // duplicate
                              }`}>
                                {result.type.replace('_', ' ')}
                              </span>
                            </TableCell>
                            <TableCell>{result.invoice?.invoiceNumber || '-'}</TableCell>
                            <TableCell>
                              {result.invoice?.date ? new Date(result.invoice.date).toLocaleDateString() : '-'}
                            </TableCell>
                            <TableCell>{formatCurrency(result.invoice?.amount)}</TableCell>
                            <TableCell>{result.payment?.paymentReference || '-'}</TableCell>
                            <TableCell>
                              {result.payment?.paymentDate ? new Date(result.payment.paymentDate).toLocaleDateString() : '-'}
                            </TableCell>
                            <TableCell>{formatCurrency(result.payment?.amount)}</TableCell>
                            <TableCell>
                              {result.difference !== undefined && (
                                <span className={result.difference > 0 ? 'text-green-600' : 'text-red-600'}>
                                  {formatCurrency(result.difference)}
                                </span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </Tabs>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between">
          {hasRun && (
            <>
              <Button variant="outline" onClick={() => {
                localStorage.removeItem('reconciliationResults');
                setResults([]);
                setHasRun(false);
                toast.info("Reconciliation results cleared");
              }}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset Results
              </Button>
              
              <Button onClick={() => {
                toast.info("Proceed to variance review to analyze mismatches");
              }}>
                <FileText className="mr-2 h-4 w-4" />
                Analyze Variances
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};


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
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Search, Tag, Check, X } from "lucide-react";

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

export const VarianceReview: React.FC = () => {
  const [results, setResults] = useState<ReconciliationResult[]>([]);
  const [filteredResults, setFilteredResults] = useState<ReconciliationResult[]>([]);
  const [filter, setFilter] = useState<string>('unreviewed');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResult, setSelectedResult] = useState<ReconciliationResult | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [reviewStatus, setReviewStatus] = useState<'reviewed' | 'flagged' | 'disputed'>('reviewed');
  const [reviewReason, setReviewReason] = useState('');
  const [reviewNotes, setReviewNotes] = useState('');

  // Load results from localStorage on component mount
  useEffect(() => {
    const savedResults = localStorage.getItem('reconciliationResults');
    if (savedResults) {
      const parsedResults = JSON.parse(savedResults);
      setResults(parsedResults);
      filterResults(parsedResults, filter, searchTerm);
    }
  }, []);

  // Save results to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('reconciliationResults', JSON.stringify(results));
  }, [results]);

  // Update filtered results whenever filter, searchTerm, or results change
  useEffect(() => {
    filterResults(results, filter, searchTerm);
  }, [filter, searchTerm, results]);

  const filterResults = (allResults: ReconciliationResult[], currentFilter: string, term: string) => {
    // First apply the type filter
    let filtered = allResults;
    
    if (currentFilter === 'unreviewed') {
      filtered = allResults.filter(result => 
        !result.review && result.type !== 'matched'
      );
    } else if (currentFilter === 'reviewed') {
      filtered = allResults.filter(result => result.review?.status === 'reviewed');
    } else if (currentFilter === 'flagged') {
      filtered = allResults.filter(result => result.review?.status === 'flagged');
    } else if (currentFilter === 'disputed') {
      filtered = allResults.filter(result => result.review?.status === 'disputed');
    } else if (currentFilter !== 'all') {
      filtered = allResults.filter(result => result.type === currentFilter);
    }
    
    // Then apply the search term if it exists
    if (term) {
      filtered = filtered.filter(result => {
        const searchFields = [
          result.invoice?.invoiceNumber,
          result.invoice?.counterpartyName,
          result.payment?.paymentReference,
          result.payment?.counterpartyName,
          result.review?.reason,
          result.review?.notes
        ];
        
        return searchFields.some(field => 
          field && field.toLowerCase().includes(term.toLowerCase())
        );
      });
    }
    
    setFilteredResults(filtered);
  };

  const openReviewDialog = (result: ReconciliationResult) => {
    setSelectedResult(result);
    if (result.review) {
      setReviewStatus(result.review.status);
      setReviewReason(result.review.reason || '');
      setReviewNotes(result.review.notes || '');
    } else {
      setReviewStatus('reviewed');
      setReviewReason('');
      setReviewNotes('');
    }
    setDialogOpen(true);
  };

  const handleSaveReview = () => {
    if (!selectedResult) return;
    
    const updatedResults = results.map(result => {
      if (result.id === selectedResult.id) {
        return {
          ...result,
          review: {
            status: reviewStatus,
            reason: reviewReason,
            notes: reviewNotes
          }
        };
      }
      return result;
    });
    
    setResults(updatedResults);
    setDialogOpen(false);
    toast.success("Variance review saved");
  };

  // Format currency
  const formatCurrency = (amount: number | undefined) => {
    if (amount === undefined) return '';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  // Get the count of each category
  const getCountByCategory = (category: string) => {
    if (category === 'unreviewed') {
      return results.filter(r => !r.review && r.type !== 'matched').length;
    } else if (category === 'reviewed') {
      return results.filter(r => r.review?.status === 'reviewed').length;
    } else if (category === 'flagged') {
      return results.filter(r => r.review?.status === 'flagged').length;
    } else if (category === 'disputed') {
      return results.filter(r => r.review?.status === 'disputed').length;
    } else if (category === 'all') {
      return results.length;
    } else {
      return results.filter(r => r.type === category).length;
    }
  };

  // Get the status class based on review status
  const getStatusClass = (result: ReconciliationResult) => {
    if (result.review) {
      return result.review.status === 'reviewed' ? 'bg-green-100 text-green-800' :
             result.review.status === 'flagged' ? 'bg-orange-100 text-orange-800' :
             'bg-red-100 text-red-800'; // disputed
    } else {
      return result.type === 'matched' ? 'bg-green-100 text-green-800' :
             result.type === 'partially_matched' ? 'bg-yellow-100 text-yellow-800' :
             result.type === 'unmatched_invoice' ? 'bg-red-100 text-red-800' :
             result.type === 'unmatched_payment' ? 'bg-blue-100 text-blue-800' :
             'bg-purple-100 text-purple-800'; // duplicate
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Variance Review</CardTitle>
          <CardDescription>
            Review and address discrepancies in the reconciliation process.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Label>Filter by Category</Label>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Results ({getCountByCategory('all')})</SelectItem>
                  <SelectItem value="unreviewed">Unreviewed Items ({getCountByCategory('unreviewed')})</SelectItem>
                  <SelectItem value="partially_matched">Partial Matches ({getCountByCategory('partially_matched')})</SelectItem>
                  <SelectItem value="unmatched_invoice">Unmatched Invoices ({getCountByCategory('unmatched_invoice')})</SelectItem>
                  <SelectItem value="unmatched_payment">Unmatched Payments ({getCountByCategory('unmatched_payment')})</SelectItem>
                  <SelectItem value="duplicate">Duplicates ({getCountByCategory('duplicate')})</SelectItem>
                  <SelectItem value="reviewed">Reviewed ({getCountByCategory('reviewed')})</SelectItem>
                  <SelectItem value="flagged">Flagged ({getCountByCategory('flagged')})</SelectItem>
                  <SelectItem value="disputed">Disputed ({getCountByCategory('disputed')})</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1">
              <Label>Search</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search by invoice #, reference..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          {results.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No reconciliation results found. Run reconciliation first.
            </div>
          ) : filteredResults.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No results matching your filter criteria.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Invoice Amount</TableHead>
                    <TableHead>Payment Ref</TableHead>
                    <TableHead>Payment Amount</TableHead>
                    <TableHead>Difference</TableHead>
                    <TableHead>Review</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResults.map((result) => (
                    <TableRow key={result.id}>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(result)}`}>
                          {result.review ? result.review.status : result.type.replace('_', ' ')}
                        </span>
                      </TableCell>
                      <TableCell>{result.invoice?.invoiceNumber || '-'}</TableCell>
                      <TableCell>{formatCurrency(result.invoice?.amount)}</TableCell>
                      <TableCell>{result.payment?.paymentReference || '-'}</TableCell>
                      <TableCell>{formatCurrency(result.payment?.amount)}</TableCell>
                      <TableCell>
                        {result.difference !== undefined && (
                          <span className={result.difference > 0 ? 'text-green-600' : 'text-red-600'}>
                            {formatCurrency(result.difference)}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {result.review ? (
                          <div className="text-xs">
                            <div className="font-medium">{result.review.reason}</div>
                            {result.review.notes && (
                              <div className="text-gray-500 truncate max-w-[150px]">{result.review.notes}</div>
                            )}
                          </div>
                        ) : (
                          <span className="text-xs text-gray-500">Not reviewed</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => openReviewDialog(result)}
                        >
                          <Tag className="h-3.5 w-3.5 mr-1" />
                          {result.review ? 'Update' : 'Review'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            onClick={() => toast.info("Proceed to reporting to generate reconciliation reports")}
          >
            Next: Generate Reports
          </Button>
        </CardFooter>
      </Card>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Review Reconciliation Item</DialogTitle>
            <DialogDescription>
              Add review details for this reconciliation item.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs text-gray-500">Invoice Number</Label>
                <div className="font-medium">{selectedResult?.invoice?.invoiceNumber || 'N/A'}</div>
              </div>
              <div>
                <Label className="text-xs text-gray-500">Payment Reference</Label>
                <div className="font-medium">{selectedResult?.payment?.paymentReference || 'N/A'}</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs text-gray-500">Invoice Amount</Label>
                <div className="font-medium">{formatCurrency(selectedResult?.invoice?.amount)}</div>
              </div>
              <div>
                <Label className="text-xs text-gray-500">Payment Amount</Label>
                <div className="font-medium">{formatCurrency(selectedResult?.payment?.amount)}</div>
              </div>
            </div>
            
            {selectedResult?.difference !== undefined && (
              <div>
                <Label className="text-xs text-gray-500">Difference</Label>
                <div className={`font-medium ${selectedResult.difference > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(selectedResult.difference)}
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="review-status">Review Status</Label>
              <Select value={reviewStatus} onValueChange={(value: any) => setReviewStatus(value)}>
                <SelectTrigger id="review-status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                  <SelectItem value="flagged">Flag for Finance Review</SelectItem>
                  <SelectItem value="disputed">Raise Dispute</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="review-reason">Reason</Label>
              <Select value={reviewReason} onValueChange={setReviewReason}>
                <SelectTrigger id="review-reason">
                  <SelectValue placeholder="Select a reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Settlement Delay">Settlement Delay</SelectItem>
                  <SelectItem value="Fee Deduction">Fee Deduction</SelectItem>
                  <SelectItem value="Missing Reference">Missing Reference</SelectItem>
                  <SelectItem value="Pending Settlement">Pending Settlement</SelectItem>
                  <SelectItem value="Duplicate Payment">Duplicate Payment</SelectItem>
                  <SelectItem value="Foreign Exchange Variance">Foreign Exchange Variance</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="review-notes">Notes</Label>
              <Input
                id="review-notes"
                placeholder="Add additional details..."
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSaveReview}>
              <Check className="h-4 w-4 mr-2" />
              Save Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Helper Label component
const Label: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => (
  <div className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 ${className}`} {...props}>
    {children}
  </div>
);


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
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload, FileUp, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";

interface InvoiceAccount {
  id: string;
  name: string;
  type: 'payables' | 'receivables';
  currency: string;
  counterpartyType: string;
}

interface Invoice {
  id: string;
  accountId: string;
  invoiceNumber: string;
  date: string;
  amount: number;
  counterpartyName: string;
  referenceId: string;
  status: 'pending' | 'paid' | 'partially_paid';
  uploadedAt: string;
}

export const InvoiceUpload: React.FC = () => {
  const [accounts, setAccounts] = useState<InvoiceAccount[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [uploadMethod, setUploadMethod] = useState<'manual' | 'file' | 'api'>('manual');
  
  // Mock data for manual upload
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [invoiceAmount, setInvoiceAmount] = useState('');
  const [counterpartyName, setCounterpartyName] = useState('');
  const [referenceId, setReferenceId] = useState('');
  const [invoiceStatus, setInvoiceStatus] = useState<'pending' | 'paid' | 'partially_paid'>('pending');

  // Load accounts and invoices from localStorage on component mount
  useEffect(() => {
    const savedAccounts = localStorage.getItem('invoiceAccounts');
    if (savedAccounts) {
      setAccounts(JSON.parse(savedAccounts));
    }
    
    const savedInvoices = localStorage.getItem('invoices');
    if (savedInvoices) {
      setInvoices(JSON.parse(savedInvoices));
    }
  }, []);

  // Save invoices to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('invoices', JSON.stringify(invoices));
  }, [invoices]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleManualUpload = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedAccount) {
      toast.error("Please select an account");
      return;
    }
    
    if (!invoiceNumber || !invoiceDate || !invoiceAmount || !counterpartyName) {
      toast.error("Please fill all required fields");
      return;
    }
    
    const newInvoice: Invoice = {
      id: crypto.randomUUID(),
      accountId: selectedAccount,
      invoiceNumber,
      date: invoiceDate,
      amount: parseFloat(invoiceAmount),
      counterpartyName,
      referenceId,
      status: invoiceStatus,
      uploadedAt: new Date().toISOString()
    };
    
    setInvoices([...invoices, newInvoice]);
    
    // Reset form
    setInvoiceNumber('');
    setInvoiceDate('');
    setInvoiceAmount('');
    setCounterpartyName('');
    setReferenceId('');
    setInvoiceStatus('pending');
    
    toast.success("Invoice added successfully");
  };

  const handleFileUpload = () => {
    if (!selectedAccount) {
      toast.error("Please select an account");
      return;
    }
    
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }
    
    // Mock file processing - in a real app this would parse the file
    const mockInvoices: Invoice[] = Array(5).fill(null).map((_, i) => ({
      id: crypto.randomUUID(),
      accountId: selectedAccount,
      invoiceNumber: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      amount: Math.floor(100 + Math.random() * 9000) / 100,
      counterpartyName: `Vendor ${i + 1}`,
      referenceId: `PO-${Math.floor(10000 + Math.random() * 90000)}`,
      status: ['pending', 'paid', 'partially_paid'][Math.floor(Math.random() * 3)] as 'pending' | 'paid' | 'partially_paid',
      uploadedAt: new Date().toISOString()
    }));
    
    setInvoices([...invoices, ...mockInvoices]);
    setFile(null);
    
    // Reset the file input
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
    
    toast.success(`${mockInvoices.length} invoices imported successfully`);
  };

  const getAccountName = (accountId: string) => {
    const account = accounts.find(acc => acc.id === accountId);
    return account ? account.name : 'Unknown Account';
  };

  const deleteInvoice = (id: string) => {
    setInvoices(invoices.filter(invoice => invoice.id !== id));
    toast.success("Invoice deleted successfully");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Invoices</CardTitle>
          <CardDescription>
            Add invoice data to your accounts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Label htmlFor="account">Select Invoice Account</Label>
            <Select value={selectedAccount} onValueChange={setSelectedAccount}>
              <SelectTrigger id="account" className="mt-1">
                <SelectValue placeholder="Select an invoice account" />
              </SelectTrigger>
              <SelectContent>
                {accounts.length === 0 ? (
                  <SelectItem value="no-accounts">No accounts available</SelectItem>
                ) : (
                  accounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.name} ({account.type})
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex flex-col space-y-2 mb-4">
            <Label>Upload Method</Label>
            <div className="flex space-x-2">
              <Button 
                type="button"
                variant={uploadMethod === 'manual' ? "default" : "outline"}
                onClick={() => setUploadMethod('manual')}
              >
                Manual Entry
              </Button>
              <Button 
                type="button"
                variant={uploadMethod === 'file' ? "default" : "outline"}
                onClick={() => setUploadMethod('file')}
              >
                File Upload
              </Button>
              <Button 
                type="button"
                variant={uploadMethod === 'api' ? "default" : "outline"}
                onClick={() => {
                  setUploadMethod('api');
                  toast.info("API integration coming soon");
                }}
                disabled
              >
                API Integration
              </Button>
            </div>
          </div>
          
          {uploadMethod === 'manual' && (
            <form onSubmit={handleManualUpload} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="invoice-number">Invoice Number *</Label>
                  <Input 
                    id="invoice-number" 
                    placeholder="e.g., INV-2023-001" 
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="invoice-date">Invoice Date *</Label>
                  <Input 
                    id="invoice-date" 
                    type="date" 
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="invoice-amount">Invoice Amount *</Label>
                  <Input 
                    id="invoice-amount" 
                    type="number" 
                    placeholder="0.00" 
                    step="0.01"
                    value={invoiceAmount}
                    onChange={(e) => setInvoiceAmount(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="counterparty">Counterparty Name *</Label>
                  <Input 
                    id="counterparty" 
                    placeholder="e.g., Acme Supplies Inc." 
                    value={counterpartyName}
                    onChange={(e) => setCounterpartyName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reference">Reference ID (PO Number, etc.)</Label>
                  <Input 
                    id="reference" 
                    placeholder="e.g., PO-12345" 
                    value={referenceId}
                    onChange={(e) => setReferenceId(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={invoiceStatus} 
                    onValueChange={(value) => setInvoiceStatus(value as 'pending' | 'paid' | 'partially_paid')}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select invoice status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="partially_paid">Partially Paid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button type="submit" className="mt-2">
                <Upload className="mr-2 h-4 w-4" />
                Add Invoice
              </Button>
            </form>
          )}
          
          {uploadMethod === 'file' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file-upload">Upload File (CSV, Excel)</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    id="file-upload" 
                    type="file" 
                    accept=".csv,.xlsx,.xls" 
                    onChange={handleFileChange}
                  />
                  <Button type="button" onClick={handleFileUpload} disabled={!file}>
                    <FileUp className="mr-2 h-4 w-4" />
                    Upload
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Supported formats: CSV, Excel (.xlsx, .xls)
                </p>
              </div>
              
              {file && (
                <div className="flex items-center p-2 bg-blue-50 rounded-md">
                  <FileSpreadsheet className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-sm">{file.name}</span>
                  <span className="text-xs text-gray-500 ml-2">
                    ({(file.size / 1024).toFixed(2)} KB)
                  </span>
                </div>
              )}
            </div>
          )}
          
          {uploadMethod === 'api' && (
            <div className="p-6 text-center border rounded-md bg-gray-50">
              <h3 className="text-lg font-medium mb-2">API Integration</h3>
              <p className="text-gray-500 mb-4">
                Connect directly to your ERP, accounting system, or other invoice sources.
              </p>
              <p className="text-blue-500">Coming soon!</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Uploaded Invoices</CardTitle>
          <CardDescription>
            View and manage your invoice data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {invoices.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No invoices uploaded yet. Add invoices using the form above.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Account</TableHead>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Counterparty</TableHead>
                    <TableHead>Reference</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>{getAccountName(invoice.accountId)}</TableCell>
                      <TableCell>{invoice.invoiceNumber}</TableCell>
                      <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                      <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                      <TableCell>{invoice.counterpartyName}</TableCell>
                      <TableCell>{invoice.referenceId}</TableCell>
                      <TableCell className="capitalize">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          invoice.status === 'paid' ? 'bg-green-100 text-green-800' : 
                          invoice.status === 'partially_paid' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {invoice.status.replace('_', ' ')}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => deleteInvoice(invoice.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline"
            onClick={() => {
              if (invoices.length > 0) {
                localStorage.removeItem('invoices');
                setInvoices([]);
                toast.success("All invoices cleared");
              }
            }}
            disabled={invoices.length === 0}
          >
            Clear All
          </Button>
          <Button
            onClick={() => {
              toast.info("Proceed to the next step to upload payment records");
            }}
          >
            Next: Payment Records
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};


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
import { Upload, FileUp, FileText, Database } from "lucide-react";
import { toast } from "sonner";

interface Payment {
  id: string;
  paymentReference: string;
  paymentDate: string;
  amount: number;
  counterpartyName: string;
  paymentChannel: 'bank' | 'mobile' | 'processor';
  uploadedAt: string;
}

export const PaymentRecordsUpload: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [uploadMethod, setUploadMethod] = useState<'manual' | 'file' | 'api'>('manual');
  
  // Manual payment data
  const [paymentReference, setPaymentReference] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [amount, setAmount] = useState('');
  const [counterpartyName, setCounterpartyName] = useState('');
  const [paymentChannel, setPaymentChannel] = useState<'bank' | 'mobile' | 'processor'>('bank');

  // Load payments from localStorage on component mount
  useEffect(() => {
    const savedPayments = localStorage.getItem('payments');
    if (savedPayments) {
      setPayments(JSON.parse(savedPayments));
    }
  }, []);

  // Save payments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('payments', JSON.stringify(payments));
  }, [payments]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleManualUpload = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!paymentReference || !paymentDate || !amount || !counterpartyName) {
      toast.error("Please fill all required fields");
      return;
    }
    
    const newPayment: Payment = {
      id: crypto.randomUUID(),
      paymentReference,
      paymentDate,
      amount: parseFloat(amount),
      counterpartyName,
      paymentChannel,
      uploadedAt: new Date().toISOString()
    };
    
    setPayments([...payments, newPayment]);
    
    // Reset form
    setPaymentReference('');
    setPaymentDate('');
    setAmount('');
    setCounterpartyName('');
    setPaymentChannel('bank');
    
    toast.success("Payment record added successfully");
  };

  const handleFileUpload = () => {
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }
    
    // Mock file processing - in a real app this would parse the file
    const mockPayments: Payment[] = Array(5).fill(null).map(() => ({
      id: crypto.randomUUID(),
      paymentReference: `PAY-${Math.floor(1000 + Math.random() * 9000)}`,
      paymentDate: new Date().toISOString().split('T')[0],
      amount: Math.floor(100 + Math.random() * 9000) / 100,
      counterpartyName: `Vendor ${Math.floor(1 + Math.random() * 10)}`,
      paymentChannel: ['bank', 'mobile', 'processor'][Math.floor(Math.random() * 3)] as 'bank' | 'mobile' | 'processor',
      uploadedAt: new Date().toISOString()
    }));
    
    setPayments([...payments, ...mockPayments]);
    setFile(null);
    
    // Reset the file input
    const fileInput = document.getElementById('payment-file-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
    
    toast.success(`${mockPayments.length} payment records imported successfully`);
  };

  const deletePayment = (id: string) => {
    setPayments(payments.filter(payment => payment.id !== id));
    toast.success("Payment record deleted successfully");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Payment Records</CardTitle>
          <CardDescription>
            Add payment data to reconcile with your invoices.
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                File Upload (Bank Statement)
              </Button>
              <Button 
                type="button"
                variant={uploadMethod === 'api' ? "default" : "outline"}
                onClick={() => {
                  setUploadMethod('api');
                  toast.info("Bank API integration coming soon");
                }}
                disabled
              >
                Bank API
              </Button>
            </div>
          </div>
          
          {uploadMethod === 'manual' && (
            <form onSubmit={handleManualUpload} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="payment-reference">Payment Reference *</Label>
                  <Input 
                    id="payment-reference" 
                    placeholder="e.g., PAY-2023-001" 
                    value={paymentReference}
                    onChange={(e) => setPaymentReference(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="payment-date">Payment Date *</Label>
                  <Input 
                    id="payment-date" 
                    type="date" 
                    value={paymentDate}
                    onChange={(e) => setPaymentDate(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="payment-amount">Amount *</Label>
                  <Input 
                    id="payment-amount" 
                    type="number" 
                    placeholder="0.00" 
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="payment-counterparty">Counterparty Name *</Label>
                  <Input 
                    id="payment-counterparty" 
                    placeholder="e.g., Acme Supplies Inc." 
                    value={counterpartyName}
                    onChange={(e) => setCounterpartyName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="payment-channel">Payment Channel</Label>
                  <Select 
                    value={paymentChannel} 
                    onValueChange={(value) => setPaymentChannel(value as 'bank' | 'mobile' | 'processor')}
                  >
                    <SelectTrigger id="payment-channel">
                      <SelectValue placeholder="Select payment channel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                      <SelectItem value="mobile">Mobile Money</SelectItem>
                      <SelectItem value="processor">Payment Processor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button type="submit" className="mt-2">
                <Upload className="mr-2 h-4 w-4" />
                Add Payment Record
              </Button>
            </form>
          )}
          
          {uploadMethod === 'file' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="payment-file-upload">Upload Bank Statement (CSV, Excel)</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    id="payment-file-upload" 
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
                  <FileText className="h-5 w-5 text-blue-500 mr-2" />
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
              <Database className="h-12 w-12 mx-auto text-blue-500 mb-2" />
              <h3 className="text-lg font-medium mb-2">Bank API Integration</h3>
              <p className="text-gray-500 mb-4">
                Connect directly to your bank for real-time payment data.
              </p>
              <p className="text-blue-500">Coming soon!</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Payment Records</CardTitle>
          <CardDescription>
            View and manage your payment data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {payments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No payment records uploaded yet. Add payments using the form above.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment Reference</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Counterparty</TableHead>
                    <TableHead>Channel</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.paymentReference}</TableCell>
                      <TableCell>{new Date(payment.paymentDate).toLocaleDateString()}</TableCell>
                      <TableCell>${payment.amount.toFixed(2)}</TableCell>
                      <TableCell>{payment.counterpartyName}</TableCell>
                      <TableCell className="capitalize">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          payment.paymentChannel === 'bank' ? 'bg-blue-100 text-blue-800' : 
                          payment.paymentChannel === 'mobile' ? 'bg-green-100 text-green-800' : 
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {payment.paymentChannel === 'bank' ? 'Bank Transfer' : 
                           payment.paymentChannel === 'mobile' ? 'Mobile Money' : 
                           'Payment Processor'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => deletePayment(payment.id)}
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
              if (payments.length > 0) {
                localStorage.removeItem('payments');
                setPayments([]);
                toast.success("All payment records cleared");
              }
            }}
            disabled={payments.length === 0}
          >
            Clear All
          </Button>
          <Button
            onClick={() => {
              toast.info("Proceed to the next step to configure matching rules");
            }}
          >
            Next: Configure Matching Rules
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};


import { useState } from "react";
import DashboardCard from "@/components/ui/DashboardCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock data for preview
type PayoutRecord = {
  name: string;
  bank_code: string;
  account: string;
  amount: number;
  reference: string;
  estimatedFee: number;
  netAmount: number;
};

const PayoutInitiation = () => {
  const { toast } = useToast();
  const [payoutType, setPayoutType] = useState("utility");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewRecords, setPreviewRecords] = useState<PayoutRecord[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Simulate parsing the CSV file
      setTimeout(() => {
        // Generate mock preview data based on file selection
        const mockRecords: PayoutRecord[] = [
          {
            name: "Ikeja Electric",
            bank_code: "058",
            account: "0123456789",
            amount: 950000,
            reference: "IKEDC-APR25",
            estimatedFee: 23750, // 2.5% fee
            netAmount: 926250,
          },
          {
            name: "Eko Electric",
            bank_code: "011",
            account: "9876543210",
            amount: 430000,
            reference: "EKEDC-APR25",
            estimatedFee: 10750, // 2.5% fee
            netAmount: 419250,
          },
          {
            name: "Ibadan DISCO",
            bank_code: "033",
            account: "5555667788",
            amount: 285000,
            reference: "IBEDC-APR25",
            estimatedFee: 7125, // 2.5% fee
            netAmount: 277875,
          },
        ];
        setPreviewRecords(mockRecords);
        setShowPreview(true);
      }, 1000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Payout initiated",
        description: "Your bulk payout has been scheduled for processing",
      });
      setIsSubmitting(false);
      setFile(null);
      setShowPreview(false);
      setPreviewRecords([]);
    }, 1500);
  };

  const getTotalAmount = () => {
    return previewRecords.reduce((sum, record) => sum + record.amount, 0);
  };

  const getTotalFees = () => {
    return previewRecords.reduce((sum, record) => sum + record.estimatedFee, 0);
  };

  const getTotalNetAmount = () => {
    return previewRecords.reduce((sum, record) => sum + record.netAmount, 0);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { 
      style: 'currency', 
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0 
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className={`${showPreview ? "lg:col-span-3" : "lg:col-span-2"}`}>
        <DashboardCard title="Initiate Bulk Payout">
          {!showPreview ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Payout Type</label>
                <Select value={payoutType} onValueChange={setPayoutType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select payout type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utility">Utility Companies</SelectItem>
                    <SelectItem value="vendor">Vendors</SelectItem>
                    <SelectItem value="partner">Partners</SelectItem>
                    <SelectItem value="salary">Salary</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Payout Method</label>
                <Select defaultValue="bank">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select payout method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank">Bank Transfer (NIBSS)</SelectItem>
                    <SelectItem value="mobile">Mobile Money</SelectItem>
                    <SelectItem value="card">Card Funding</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Upload Payout File</label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                  <input 
                    type="file" 
                    accept=".csv,.xlsx" 
                    className="hidden" 
                    id="file-upload"
                    onChange={handleFileChange} 
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center">
                      <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="mt-1 text-sm text-gray-500">
                        {file ? file.name : "Click to upload or drag and drop"}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        CSV or Excel file with recipient details
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Schedule Date (Optional)
                  </label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Reference Prefix (Optional)
                  </label>
                  <Input placeholder="e.g., UTIL-PAY-APR" />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline">Cancel</Button>
                <Button 
                  type="submit" 
                  disabled={!file || isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Preview Payout"}
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Payout Preview</h3>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  {previewRecords.length} records
                </Badge>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Recipient</TableHead>
                      <TableHead>Bank Code</TableHead>
                      <TableHead>Account Number</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Est. Processor Fee</TableHead>
                      <TableHead>Net Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {previewRecords.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{record.name}</TableCell>
                        <TableCell>{record.bank_code}</TableCell>
                        <TableCell>{record.account}</TableCell>
                        <TableCell>{formatCurrency(record.amount)}</TableCell>
                        <TableCell>{record.reference}</TableCell>
                        <TableCell className="text-muted-foreground">{formatCurrency(record.estimatedFee)}</TableCell>
                        <TableCell>{formatCurrency(record.netAmount)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Amount</p>
                    <p className="text-lg font-semibold">{formatCurrency(getTotalAmount())}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Processor Fees</p>
                    <p className="text-lg font-semibold text-amber-600">{formatCurrency(getTotalFees())}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Net Amount</p>
                    <p className="text-lg font-semibold text-green-600">{formatCurrency(getTotalNetAmount())}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setShowPreview(false);
                    setFile(null);
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmit} 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Initiate Payout"}
                </Button>
              </div>
            </div>
          )}
        </DashboardCard>
      </div>

      {!showPreview && (
        <DashboardCard title="Payout Guide">
          <div className="text-sm space-y-4">
            <div className="border-l-4 border-discrepay-500 pl-3 py-1">
              <h3 className="font-medium">Bulk Payouts to Utility Companies</h3>
              <p className="text-muted-foreground mt-1">
                Upload a CSV with company details, account numbers, and amounts to process multiple payouts at once.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Required CSV Format:</h4>
              <div className="bg-gray-50 p-2 rounded text-xs font-mono">
                name,bank_code,account,amount,reference<br />
                "Ikeja Electric",058,"0123456789",950000,"IKEDC-APR25"<br />
                "Eko Electric",011,"9876543210",430000,"EKEDC-APR25"
              </div>
            </div>

            <div className="border-t pt-4 mt-4">
              <h4 className="font-medium mb-2">Bank Codes:</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-gray-100">GTBank: 058</Badge>
                <Badge variant="outline" className="bg-gray-100">First Bank: 011</Badge>
                <Badge variant="outline" className="bg-gray-100">UBA: 033</Badge>
                <Badge variant="outline" className="bg-gray-100">Access: 044</Badge>
                <Badge variant="outline" className="bg-gray-100">Zenith: 057</Badge>
                <Badge variant="outline" className="bg-gray-100">+30 more</Badge>
              </div>
            </div>
          </div>
        </DashboardCard>
      )}
    </div>
  );
};

export default PayoutInitiation;

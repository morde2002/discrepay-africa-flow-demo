import { useState, useEffect } from "react";
import DashboardCard from "@/components/ui/DashboardCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';

type PayoutRecord = {
  name: string;
  bank_code: string;
  account: string;
  amount: number;
  reference: string;
  estimatedFee: number;
  netAmount: number;
  date: string;
  status: 'pending' | 'success' | 'failed';
  type: 'utility' | 'vendor' | 'partner' | 'salary';
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PayoutInitiation = () => {
  const { toast } = useToast();
  const [payoutType, setPayoutType] = useState("utility");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewRecords, setPreviewRecords] = useState<PayoutRecord[]>([]);

  // Mock report data
  const [reportData] = useState({
    timeline: [
      { date: '2024-04-01', amount: 450000 },
      { date: '2024-04-08', amount: 890000 },
      { date: '2024-04-15', amount: 620000 },
      { date: '2024-04-22', amount: 950000 },
    ],
    types: [
      { name: 'Utility', value: 12, type: 'utility' },
      { name: 'Vendors', value: 8, type: 'vendor' },
      { name: 'Partners', value: 4, type: 'partner' },
      { name: 'Salary', value: 6, type: 'salary' },
    ],
    recipients: [
      { name: 'Ikeja Electric', amount: 950000 },
      { name: 'Eko Electric', amount: 430000 },
      { name: 'Ibadan DISCO', amount: 285000 },
      { name: 'Lagos Water', amount: 150000 },
    ],
    transactions: [
      { date: '2024-04-25', reference: 'IKEDC-APR25', amount: 950000, status: 'success' },
      { date: '2024-04-24', reference: 'EKEDC-APR24', amount: 430000, status: 'pending' },
      { date: '2024-04-23', reference: 'IBEDC-APR23', amount: 285000, status: 'success' },
    ]
  });

  useEffect(() => {
    if (uploadProgress === 100) {
      const mockRecords: PayoutRecord[] = [
        {
          name: "Ikeja Electric",
          bank_code: "058",
          account: "0123456789",
          amount: 950000,
          reference: "IKEDC-APR25",
          estimatedFee: 23750,
          netAmount: 926250,
          date: new Date().toISOString(),
          status: 'pending',
          type: 'utility'
        },
        {
          name: "Eko Electric",
          bank_code: "011",
          account: "9876543210",
          amount: 430000,
          reference: "EKEDC-APR25",
          estimatedFee: 10750,
          netAmount: 419250,
          date: new Date().toISOString(),
          status: 'pending',
          type: 'utility'
        },
      ];
      setPreviewRecords(mockRecords);
      setShowPreview(true);
    }
  }, [uploadProgress]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessing(false);
    setShowReport(true);
    setShowPreview(false);
    
    toast({
      title: "Payout initiated",
      description: "Your bulk payout has been scheduled for processing",
    });
  };

  const getTotalAmount = () => previewRecords.reduce((sum, record) => sum + record.amount, 0);
  const getTotalFees = () => previewRecords.reduce((sum, record) => sum + record.estimatedFee, 0);
  const getTotalNetAmount = () => previewRecords.reduce((sum, record) => sum + record.netAmount, 0);

  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-NG', { 
    style: 'currency', 
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0 
  }).format(amount);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className={`${showPreview || showReport ? "lg:col-span-3" : "lg:col-span-2"}`}>
        <DashboardCard title="Initiate Bulk Payout">
          {isProcessing ? (
            <div className="flex flex-col items-center justify-center h-96">
              <div className="tunnel-animation">
                <div className="tunnel"></div>
                <div className="tunnel"></div>
                <div className="tunnel"></div>
              </div>
              <p className="mt-8 text-lg font-medium">Processing Payouts...</p>
              <p className="text-muted-foreground">This may take a few seconds</p>
            </div>
          ) : showReport ? (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-blue-800">Total Processed</h3>
                  <p className="text-2xl font-bold mt-2">{formatCurrency(2560000)}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-green-800">Successful Transactions</h3>
                  <p className="text-2xl font-bold mt-2">18</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-red-800">Failed Transactions</h3>
                  <p className="text-2xl font-bold mt-2">2</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg border">
                  <h3 className="font-medium mb-4">Payout Timeline</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={reportData.timeline}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="amount" stroke="#2563eb" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <h3 className="font-medium mb-4">Payout Types Distribution</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={reportData.types}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {reportData.types.map((entry, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <h3 className="font-medium mb-4">Top Recipients</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={reportData.recipients}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="amount" fill="#2563eb" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <h3 className="font-medium mb-4">Recent Transactions</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Reference</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reportData.transactions.map((txn, index) => (
                        <TableRow key={index}>
                          <TableCell>{txn.date}</TableCell>
                          <TableCell>{txn.reference}</TableCell>
                          <TableCell>{formatCurrency(txn.amount)}</TableCell>
                          <TableCell>
                            <Badge variant={txn.status === 'success' ? 'success' : 'warning'}>
                              {txn.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          ) : showPreview ? (
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
                      <TableHead>Est. Fee</TableHead>
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
                    <p className="text-sm text-muted-foreground">Total Fees</p>
                    <p className="text-lg font-semibold text-amber-600">{formatCurrency(getTotalFees())}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Net Amount</p>
                    <p className="text-lg font-semibold text-green-600">{formatCurrency(getTotalNetAmount())}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowPreview(false);
                    setFile(null);
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : "Initiate Payout"}
                </Button>
              </div>
            </div>
          ) : (
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
                      {uploadProgress > 0 && (
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className="bg-blue-600 rounded-full h-2 transition-all duration-300" 
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                      )}
                      <p className="text-xs text-gray-400 mt-1">
                        CSV or Excel file with recipient details
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline">Cancel</Button>
                <Button 
                  type="submit" 
                  disabled={!file || uploadProgress < 100}
                >
                  Preview Payout
                </Button>
              </div>
            </form>
          )}
        </DashboardCard>

      </div>

      <style jsx>{`
        .tunnel-animation {
          position: relative;
          width: 200px;
          height: 200px;
          perspective: 1000px;
        }

        .tunnel {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 4px solid #2563eb;
          border-radius: 50%;
          animation: tunnel 2s infinite linear;
        }

        .tunnel:nth-child(2) {
          animation-delay: 0.66s;
          opacity: 0.6;
        }

        .tunnel:nth-child(3) {
          animation-delay: 1.33s;
          opacity: 0.3;
        }

        @keyframes tunnel {
          0% {
            transform: rotate(0deg) scale(1);
            opacity: 1;
          }
          100% {
            transform: rotate(360deg) scale(0);
            opacity: 0;
          }
        }
      `}</style>
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
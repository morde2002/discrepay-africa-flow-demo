
import { useState } from "react";
import DashboardCard from "@/components/ui/DashboardCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

const PayoutInitiation = () => {
  const { toast } = useToast();
  const [payoutType, setPayoutType] = useState("utility");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
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
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <DashboardCard title="Initiate Bulk Payout">
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
                {isSubmitting ? "Processing..." : "Initiate Payout"}
              </Button>
            </div>
          </form>
        </DashboardCard>
      </div>

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
    </div>
  );
};

export default PayoutInitiation;

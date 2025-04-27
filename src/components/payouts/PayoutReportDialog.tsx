
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PayoutReportDialogProps {
  payout: {
    id: string;
    reference: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PayoutReportDialog = ({ payout, open, onOpenChange }: PayoutReportDialogProps) => {
  const [reportType, setReportType] = useState("settlement");

  const handleDownload = () => {
    // In a real implementation, this would trigger the report generation and download
    console.log(`Downloading ${reportType} report for payout ${payout.id}`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Generate Report</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium mb-2">Payout Reference</p>
            <p className="text-sm text-muted-foreground">{payout.reference}</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Report Type</label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="settlement">Settlement Report</SelectItem>
                <SelectItem value="transaction">Transaction Details</SelectItem>
                <SelectItem value="fee">Fee Breakdown</SelectItem>
                <SelectItem value="reconciliation">Reconciliation Report</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PayoutReportDialog;

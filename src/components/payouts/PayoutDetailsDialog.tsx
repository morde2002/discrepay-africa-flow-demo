
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface PayoutDetailsDialogProps {
  payout: {
    id: string;
    date: string;
    amount: number;
    processorFee: number;
    netAmount: number;
    status: string;
    type: string;
    recipient: string;
    reference: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PayoutDetailsDialog = ({ payout, open, onOpenChange }: PayoutDetailsDialogProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const statusColors: Record<string, string> = {
    completed: "bg-green-100 text-green-800",
    processing: "bg-blue-100 text-blue-800",
    failed: "bg-red-100 text-red-800",
    pending: "bg-yellow-100 text-yellow-800",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Payout Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Payout ID</p>
              <p className="font-medium">{payout.id}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Reference</p>
              <p className="font-medium">{payout.reference}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-1">Status</p>
            <Badge variant="outline" className={statusColors[payout.status]}>
              {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
            </Badge>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-1">Date & Time</p>
            <p className="font-medium">{formatDate(payout.date)}</p>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Financial Details</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Amount</p>
                <p className="font-medium">{formatCurrency(payout.amount)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Processor Fee</p>
                <p className="font-medium text-red-600">{formatCurrency(payout.processorFee)}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Net Amount</p>
              <p className="text-lg font-semibold text-green-600">{formatCurrency(payout.netAmount)}</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Recipient Details</h4>
            <div>
              <p className="text-sm text-muted-foreground">Recipient Name</p>
              <p className="font-medium">{payout.recipient}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Payment Type</p>
              <p className="font-medium capitalize">{payout.type}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PayoutDetailsDialog;

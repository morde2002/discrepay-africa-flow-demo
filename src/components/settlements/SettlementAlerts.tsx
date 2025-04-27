
import DashboardCard from "@/components/ui/DashboardCard";
import { Badge } from "@/components/ui/badge";

const alerts = [
  {
    id: "ST001",
    severity: "high",
    message: "Missing settlement from Paystack",
    reference: "TX938485",
    amount: "₦245,700",
    time: "2 hours ago",
    expected: "10:00 AM",
    processor: "Paystack"
  },
  {
    id: "ST002",
    severity: "medium",
    message: "Delayed settlement detected",
    reference: "TX938421",
    amount: "₦128,500",
    time: "4 hours ago",
    expected: "08:30 AM",
    processor: "Flutterwave"
  },
  {
    id: "ST003",
    severity: "low",
    message: "Settlement variance detected",
    reference: "TX937712",
    amount: "₦2,300",
    time: "Yesterday",
    expected: "₦75,250",
    processor: "Direct Bank"
  },
  {
    id: "ST004",
    severity: "high",
    message: "Multiple failed settlements",
    reference: "Multi (5)",
    amount: "₦534,200",
    time: "Yesterday",
    expected: "Various",
    processor: "Interswitch"
  }
];

const SettlementAlerts = () => {
  return (
    <DashboardCard title="Settlement Alerts" className="mt-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-muted-foreground border-b">
              <th className="text-left font-medium p-2">Alert ID</th>
              <th className="text-left font-medium p-2">Severity</th>
              <th className="text-left font-medium p-2">Message</th>
              <th className="text-left font-medium p-2">Transaction Ref</th>
              <th className="text-left font-medium p-2">Amount</th>
              <th className="text-left font-medium p-2">Processor</th>
              <th className="text-left font-medium p-2">Time</th>
              <th className="text-left font-medium p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert) => (
              <tr key={alert.id} className="border-b hover:bg-muted/50 text-sm">
                <td className="p-2 font-medium">{alert.id}</td>
                <td className="p-2">
                  <Badge 
                    variant="outline" 
                    className={
                      alert.severity === "high" 
                        ? "bg-red-100 text-red-800" 
                        : alert.severity === "medium" 
                        ? "bg-amber-100 text-amber-800" 
                        : "bg-blue-100 text-blue-800"
                    }
                  >
                    {alert.severity}
                  </Badge>
                </td>
                <td className="p-2">{alert.message}</td>
                <td className="p-2">{alert.reference}</td>
                <td className="p-2">{alert.amount}</td>
                <td className="p-2">{alert.processor}</td>
                <td className="p-2">{alert.time}</td>
                <td className="p-2">
                  <button className="text-discrepay-600 hover:text-discrepay-800 underline text-xs">
                    Investigate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardCard>
  );
};

export default SettlementAlerts;

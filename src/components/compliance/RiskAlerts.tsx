
import DashboardCard from "@/components/ui/DashboardCard";
import { Badge } from "@/components/ui/badge";

const alerts = [
  {
    id: "RISK001",
    severity: "high",
    message: "Suspicious transaction pattern",
    details: "Multiple large transactions from same source",
    customer: "Customer #45928",
    status: "open",
    time: "Today, 10:23 AM"
  },
  {
    id: "RISK002",
    severity: "high",
    message: "Failed AML screening",
    details: "Customer name matches watchlist entry",
    customer: "Customer #32154",
    status: "under_review",
    time: "Today, 09:15 AM"
  },
  {
    id: "RISK003",
    severity: "medium",
    message: "Unusual payout pattern",
    details: "Utility payment 250% above average",
    customer: "Port Harcourt Electric",
    status: "under_review",
    time: "Yesterday, 04:30 PM"
  },
  {
    id: "RISK004",
    severity: "low",
    message: "KYC document expiry",
    details: "Business registration document expires in 7 days",
    customer: "Vendor #VD231",
    status: "resolved",
    time: "Apr 25, 2025"
  }
];

const RiskAlerts = () => {
  return (
    <DashboardCard title="Risk & Compliance Alerts" className="mt-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-muted-foreground border-b">
              <th className="text-left font-medium p-2">Alert ID</th>
              <th className="text-left font-medium p-2">Severity</th>
              <th className="text-left font-medium p-2">Message</th>
              <th className="text-left font-medium p-2">Details</th>
              <th className="text-left font-medium p-2">Customer/Entity</th>
              <th className="text-left font-medium p-2">Status</th>
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
                <td className="p-2">{alert.details}</td>
                <td className="p-2">{alert.customer}</td>
                <td className="p-2">
                  <Badge 
                    variant="outline" 
                    className={
                      alert.status === "open" 
                        ? "bg-red-100 text-red-800" 
                        : alert.status === "under_review" 
                        ? "bg-amber-100 text-amber-800" 
                        : "bg-green-100 text-green-800"
                    }
                  >
                    {alert.status.replace("_", " ")}
                  </Badge>
                </td>
                <td className="p-2">{alert.time}</td>
                <td className="p-2">
                  <div className="flex space-x-2">
                    <button className="text-discrepay-600 hover:text-discrepay-800 underline text-xs">
                      Review
                    </button>
                    {alert.status !== "resolved" && (
                      <button className="text-discrepay-600 hover:text-discrepay-800 underline text-xs">
                        Resolve
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardCard>
  );
};

export default RiskAlerts;

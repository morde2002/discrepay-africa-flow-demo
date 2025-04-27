
import React, { useState } from "react";
import DashboardCard from "@/components/ui/DashboardCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Shield,
  Shield as ShieldCheck,
  ShieldAlert,
  UserX,
  Ban
} from "lucide-react";
import RiskAlertDialog from "./RiskAlertDialog";
import { toast } from "sonner";

const alerts = [
  {
    id: "RISK001",
    severity: "high",
    category: "Fraud Velocity",
    message: "Suspicious transaction pattern",
    details: "Multiple large transactions from same source",
    customer: "Customer #45928",
    status: "open",
    time: "Today, 10:23 AM",
    recommendations: ["freeze", "report"]
  },
  {
    id: "RISK002",
    severity: "high",
    category: "AML Watchlist",
    message: "Failed AML screening",
    details: "Customer name matches watchlist entry",
    customer: "Customer #32154",
    status: "under_review",
    time: "Today, 09:15 AM",
    recommendations: ["escalate", "report"]
  },
  {
    id: "RISK003",
    severity: "medium",
    category: "Transaction Outlier",
    message: "Unusual payout pattern",
    details: "Utility payment 250% above average",
    customer: "Port Harcourt Electric",
    status: "under_review",
    time: "Yesterday, 04:30 PM",
    recommendations: ["false_positive"]
  },
  {
    id: "RISK004",
    severity: "low",
    category: "KYC Verification",
    message: "KYC document expiry",
    details: "Business registration document expires in 7 days",
    customer: "Vendor #VD231",
    status: "resolved",
    time: "Apr 25, 2025",
    recommendations: []
  }
];

const RiskAlerts = () => {
  const [selectedAlert, setSelectedAlert] = useState<any | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleReview = (alert: any) => {
    setSelectedAlert(alert);
    setDialogOpen(true);
  };

  const handleResolve = (alertId: string) => {
    toast.success(`Alert ${alertId} has been resolved`);
    // Would update the alert status in a real application
  };

  const handleQuickAction = (alertId: string, action: string) => {
    switch (action) {
      case "freeze":
        toast.warning(`Account for alert ${alertId} has been frozen`);
        break;
      case "report":
        toast.info(`Alert ${alertId} has been reported to the regulator`);
        break;
      case "escalate":
        toast.info(`Alert ${alertId} has been escalated to management`);
        break;
      case "false_positive":
        toast.success(`Alert ${alertId} has been marked as a false positive`);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <DashboardCard title="Risk & Compliance Alerts" className="mt-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Alert ID</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Customer/Entity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Recommended</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell className="font-medium">{alert.id}</TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-purple-100 text-purple-800">
                      {alert.category}
                    </Badge>
                  </TableCell>
                  <TableCell>{alert.message}</TableCell>
                  <TableCell>{alert.customer}</TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>{alert.time}</TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      {alert.recommendations.includes("freeze") && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-7 px-2 text-xs"
                          onClick={() => handleQuickAction(alert.id, "freeze")}
                        >
                          <Ban className="h-3 w-3 mr-1" />
                          Freeze
                        </Button>
                      )}
                      {alert.recommendations.includes("report") && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-7 px-2 text-xs"
                          onClick={() => handleQuickAction(alert.id, "report")}
                        >
                          <ShieldAlert className="h-3 w-3 mr-1" />
                          Report
                        </Button>
                      )}
                      {alert.recommendations.includes("escalate") && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-7 px-2 text-xs"
                          onClick={() => handleQuickAction(alert.id, "escalate")}
                        >
                          <UserX className="h-3 w-3 mr-1" />
                          Escalate
                        </Button>
                      )}
                      {alert.recommendations.includes("false_positive") && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-7 px-2 text-xs"
                          onClick={() => handleQuickAction(alert.id, "false_positive")}
                        >
                          <ShieldCheck className="h-3 w-3 mr-1" />
                          False +
                        </Button>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="link" 
                        className="h-auto p-0 text-xs"
                        onClick={() => handleReview(alert)}
                      >
                        Review
                      </Button>
                      {alert.status !== "resolved" && (
                        <Button 
                          variant="link" 
                          className="h-auto p-0 text-xs"
                          onClick={() => handleResolve(alert.id)}
                        >
                          Resolve
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DashboardCard>

      {selectedAlert && (
        <RiskAlertDialog 
          open={dialogOpen} 
          onClose={() => setDialogOpen(false)} 
          alert={selectedAlert}
        />
      )}
    </>
  );
};

export default RiskAlerts;


import { Table, AlertTriangle, FileText, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import DashboardCard from "@/components/ui/DashboardCard";
import StepsTimeline from "./components/StepsTimeline";
import FeatureCard from "./components/FeatureCard";

const MonitoringFlow = () => {
  const features = [
    {
      icon: Table,
      title: "Live Monitoring",
      description: "Real-time visibility into all fund movements and settlements across your payment channels."
    },
    {
      icon: AlertTriangle,
      title: "Variance Alerts",
      description: "Instant detection and notification of settlement variances and delays."
    },
    {
      icon: Activity,
      title: "Risk Detection",
      description: "Automated detection of suspicious patterns and potential fraud risks."
    },
    {
      icon: FileText,
      title: "Reports",
      description: "Generate comprehensive reports for audits and regulatory compliance."
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-discrepay-100 bg-gradient-to-r from-green-50 to-white">
        <CardContent className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Customer Monitoring Journey</h2>
            <p className="text-muted-foreground">
              Transform from reactive financial firefighting to proactive, real-time control over payment operations 
              without disrupting existing money movement channels.
            </p>
          </div>
          
          <div className="w-full overflow-hidden py-4">
            <StepsTimeline />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>

      <DashboardCard title="Monitoring Journey Summary">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left font-medium p-2">Step</th>
                <th className="text-left font-medium p-2">User Action</th>
                <th className="text-left font-medium p-2">Value Delivered</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-2">Access Dashboard</td>
                <td className="p-2">Login and view overview</td>
                <td className="p-2">Instant operational visibility</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-2">Monitor Live</td>
                <td className="p-2">Track real-time transactions</td>
                <td className="p-2">Real-time payment tracking</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-2">Review Variances</td>
                <td className="p-2">Check alerts and issues</td>
                <td className="p-2">Early detection of problems</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-2">Generate Reports</td>
                <td className="p-2">Download detailed reports</td>
                <td className="p-2">Audit and compliance ready</td>
              </tr>
            </tbody>
          </table>
        </div>
      </DashboardCard>
    </div>
  );
};

export default MonitoringFlow;

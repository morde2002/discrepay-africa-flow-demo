
import DashboardCard from "../ui/DashboardCard";
import { Progress } from "@/components/ui/progress";

const failureData = [
  { cause: "Bank API timeout", percentage: 40 },
  { cause: "Invalid Account Number", percentage: 30 },
  { cause: "Fraud Risk Flagged", percentage: 20 },
  { cause: "Other Errors", percentage: 10 },
];

const FailureCauses = () => {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium">Top Failure Causes</h4>
      {failureData.map((item) => (
        <div key={item.cause}>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">{item.cause}</span>
            <span className="font-medium">{item.percentage}%</span>
          </div>
          <Progress value={item.percentage} className="h-1.5" />
        </div>
      ))}
    </div>
  );
};

export default FailureCauses;

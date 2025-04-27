
import { Clock, CheckCircle } from "lucide-react";

const SettlementMetrics = () => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      <div className="bg-blue-50 p-3 rounded-lg">
        <div className="flex items-center gap-2 text-blue-600 mb-1">
          <Clock className="h-4 w-4" />
          <span className="text-sm font-medium">Average Settlement Time</span>
        </div>
        <p className="text-2xl font-semibold">3.2h</p>
      </div>
      <div className="bg-green-50 p-3 rounded-lg">
        <div className="flex items-center gap-2 text-green-600 mb-1">
          <CheckCircle className="h-4 w-4" />
          <span className="text-sm font-medium">Within SLA (24h)</span>
        </div>
        <p className="text-2xl font-semibold">89%</p>
      </div>
    </div>
  );
};

export default SettlementMetrics;

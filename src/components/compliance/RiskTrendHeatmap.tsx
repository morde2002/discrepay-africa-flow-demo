
import React from "react";
import DashboardCard from "@/components/ui/DashboardCard";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RiskTrendHeatmap = () => {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const weeksBack = ['-4w', '-3w', '-2w', '-1w', 'Current'];
  
  // Mock data for the heatmap cells
  // Higher value = more risk alerts
  const heatmapData = [
    [2, 3, 6, 4, 2, 1, 0],  // 4 weeks ago
    [1, 2, 5, 7, 3, 2, 1],  // 3 weeks ago
    [2, 4, 3, 5, 8, 3, 2],  // 2 weeks ago
    [3, 7, 9, 5, 3, 4, 2],  // 1 week ago
    [4, 8, 12, 9, 5, 3, 1], // Current week
  ];
  
  const getColorIntensity = (value: number) => {
    // Calculate color intensity based on value
    // 0-3: low, 4-7: medium, 8+: high
    if (value >= 8) return "bg-red-500";
    if (value >= 4) return "bg-amber-400";
    if (value >= 1) return "bg-green-300";
    return "bg-gray-100";
  };
  
  return (
    <DashboardCard title="Risk Trend Heatmap" className="mt-6">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-x-2">
            <Select defaultValue="7">
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Risk category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="kyc">KYC Verification</SelectItem>
                <SelectItem value="aml">AML Watchlist</SelectItem>
                <SelectItem value="fraud">Fraud Detection</SelectItem>
                <SelectItem value="amount">Amount Outlier</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button variant="outline" size="sm">Download Report</Button>
        </div>
        
        <div>
          <div className="mb-2 text-sm font-medium">Alert Volume Heatmap</div>
          <div className="border rounded-lg overflow-hidden">
            <div className="grid grid-cols-8 text-xs">
              <div className="p-2 font-medium text-center border-b border-r bg-gray-50"></div>
              {daysOfWeek.map((day) => (
                <div key={day} className="p-2 font-medium text-center border-b border-r bg-gray-50">
                  {day}
                </div>
              ))}
              
              {weeksBack.map((week, weekIndex) => (
                <React.Fragment key={week}>
                  <div className="p-2 font-medium text-center border-b border-r bg-gray-50">
                    {week}
                  </div>
                  {heatmapData[weekIndex].map((value, dayIndex) => (
                    <div 
                      key={`${weekIndex}-${dayIndex}`}
                      className={`p-2 text-center border-b border-r h-10 text-xs font-medium relative ${getColorIntensity(value)}`}
                    >
                      {value > 0 && <span className="absolute inset-0 flex items-center justify-center text-gray-800">{value}</span>}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="mt-2 flex items-center justify-end text-xs text-gray-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-300 mr-1"></div>
                <span>Low (1-3)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-amber-400 mr-1"></div>
                <span>Medium (4-7)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 mr-1"></div>
                <span>High (8+)</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-md p-4">
            <div className="text-sm font-medium mb-3">Risk Category Distribution</div>
            <div className="h-64 bg-gray-100 flex items-center justify-center rounded">
              [Risk Category Chart]
            </div>
          </div>
          
          <div className="border rounded-md p-4">
            <div className="text-sm font-medium mb-3">Key Metrics</div>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b">
                <span className="text-sm">New High-Risk Alerts (Last 7 days)</span>
                <span className="font-medium">42</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b">
                <span className="text-sm">Avg. Resolution Time</span>
                <span className="font-medium">6.2 hours</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b">
                <span className="text-sm">Escalation Rate</span>
                <span className="font-medium">12%</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b">
                <span className="text-sm">False Positive Rate</span>
                <span className="font-medium">8.5%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Regulatory Reports Filed</span>
                <span className="font-medium">5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
};

export default RiskTrendHeatmap;


import DashboardCard from "../ui/DashboardCard";

const PaymentFlow = () => {
  return (
    <DashboardCard title="Payment Flow Analysis" className="mt-6">
      <div className="h-56 flex items-center justify-center">
        <div className="w-full flex items-center justify-between">
          {/* Source */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full border-2 border-discrepay-300 flex items-center justify-center bg-discrepay-50 mb-2">
              <span className="text-discrepay-700 font-medium">Source</span>
            </div>
            <span className="text-xs text-muted-foreground">Financial Institutions</span>
          </div>
          
          {/* Flow Lines */}
          <div className="flex-1 flex flex-col items-center">
            <div className="w-full h-1 bg-discrepay-200 relative">
              <div className="absolute w-1/2 h-1 bg-discrepay-500"></div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-discrepay-500"></div>
            </div>
            <span className="mt-2 text-xs text-discrepay-500">Processing (50%)</span>
          </div>
          
          {/* Processing */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full border-2 border-discrepay-500 flex items-center justify-center bg-discrepay-100 mb-2">
              <span className="text-discrepay-700 font-medium text-sm text-center">Discrepay<br/>Platform</span>
            </div>
            <span className="text-xs text-muted-foreground">Real-time Processing</span>
          </div>
          
          {/* Flow Lines */}
          <div className="flex-1 flex flex-col items-center">
            <div className="w-full h-1 bg-discrepay-200 relative">
              <div className="absolute w-3/4 h-1 bg-discrepay-500"></div>
              <div className="absolute left-3/4 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-discrepay-500"></div>
            </div>
            <span className="mt-2 text-xs text-discrepay-500">Settling (75%)</span>
          </div>
          
          {/* Destination */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full border-2 border-discrepay-300 flex items-center justify-center bg-discrepay-50 mb-2">
              <span className="text-discrepay-700 font-medium">Destination</span>
            </div>
            <span className="text-xs text-muted-foreground">Payment Recipients</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-4 mt-4">
        <div className="bg-discrepay-50 p-3 rounded-md border border-discrepay-100">
          <h4 className="font-medium text-xs text-discrepay-800 mb-1">Processing</h4>
          <p className="text-sm font-medium">254,876</p>
          <p className="text-xs text-muted-foreground">transactions today</p>
        </div>
        <div className="bg-discrepay-50 p-3 rounded-md border border-discrepay-100">
          <h4 className="font-medium text-xs text-discrepay-800 mb-1">Volume</h4>
          <p className="text-sm font-medium">$12.4M</p>
          <p className="text-xs text-muted-foreground">processed today</p>
        </div>
        <div className="bg-discrepay-50 p-3 rounded-md border border-discrepay-100">
          <h4 className="font-medium text-xs text-discrepay-800 mb-1">Response Time</h4>
          <p className="text-sm font-medium">1.2s avg</p>
          <p className="text-xs text-muted-foreground">api response time</p>
        </div>
        <div className="bg-discrepay-50 p-3 rounded-md border border-discrepay-100">
          <h4 className="font-medium text-xs text-discrepay-800 mb-1">Uptime</h4>
          <p className="text-sm font-medium">99.99%</p>
          <p className="text-xs text-muted-foreground">last 30 days</p>
        </div>
      </div>
    </DashboardCard>
  );
};

export default PaymentFlow;


import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Check, Bell, Table, AlertTriangle, FileText, Activity, ShieldCheck } from "lucide-react";
import DashboardCard from "@/components/ui/DashboardCard";

const MonitoringFlow = () => {
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
            <div className="flex relative pb-12">
              {/* Step progression line */}
              <div className="absolute inset-0 flex justify-center">
                <div className="h-full w-1 bg-gradient-to-b from-green-300 to-green-600"></div>
              </div>

              {/* Flow visualization */}
              <div className="relative z-10 flex flex-col items-center w-full">
                {/* Step 1: Access Dashboard */}
                <div className="flex items-center justify-center mb-8 w-full">
                  <div className="w-full md:w-3/4 flex flex-col md:flex-row bg-white rounded-lg shadow-sm border">
                    <div className="bg-green-600 text-white p-4 flex items-center justify-center rounded-t-lg md:rounded-l-lg md:rounded-r-none">
                      <div className="font-bold text-xl">Step 1</div>
                    </div>
                    <div className="flex-1 p-4">
                      <h3 className="text-lg font-semibold mb-2">Access Discrepay Dashboard</h3>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Secure login to view operational metrics</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Overview of funds, settlements, variances, and alerts</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mb-8">
                  <ArrowRight className="h-6 w-6 text-green-500" />
                </div>

                {/* Step 2: Live Monitoring */}
                <div className="flex items-center justify-center mb-8 w-full">
                  <div className="w-full md:w-3/4 flex flex-col md:flex-row bg-white rounded-lg shadow-sm border">
                    <div className="bg-green-600 text-white p-4 flex items-center justify-center rounded-t-lg md:rounded-l-lg md:rounded-r-none">
                      <div className="font-bold text-xl">Step 2</div>
                    </div>
                    <div className="flex-1 p-4">
                      <h3 className="text-lg font-semibold mb-2">Live Funds Monitoring</h3>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Real-time transaction tracking with detailed status</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Monitor initiated amounts, settled amounts, and variances</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mb-8">
                  <ArrowRight className="h-6 w-6 text-green-500" />
                </div>

                {/* Steps 3-8 following the same pattern */}
                {/* Step 3: Variance Detection */}
                <div className="flex items-center justify-center mb-8 w-full">
                  <div className="w-full md:w-3/4 flex flex-col md:flex-row bg-white rounded-lg shadow-sm border">
                    <div className="bg-green-600 text-white p-4 flex items-center justify-center rounded-t-lg md:rounded-l-lg md:rounded-r-none">
                      <div className="font-bold text-xl">Step 3</div>
                    </div>
                    <div className="flex-1 p-4">
                      <h3 className="text-lg font-semibold mb-2">Variance Detection Alerts</h3>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Real-time alerts for missing or delayed settlements</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Actionable insights for settlement issues</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Continue with remaining steps... */}
                {/* Add dividers and remaining steps following the same pattern */}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-2 rounded-md mr-3">
                <Table className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="font-medium">Live Monitoring</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Real-time visibility into all fund movements and settlements across your payment channels.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-2 rounded-md mr-3">
                <AlertTriangle className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="font-medium">Variance Alerts</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Instant detection and notification of settlement variances and delays.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-2 rounded-md mr-3">
                <Activity className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="font-medium">Risk Detection</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Automated detection of suspicious patterns and potential fraud risks.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-2 rounded-md mr-3">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="font-medium">Reports</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Generate comprehensive reports for audits and regulatory compliance.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Summary Table */}
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

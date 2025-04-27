
import { Card, CardContent } from "@/components/ui/card";
import DashboardCard from "@/components/ui/DashboardCard";
import { ArrowRight, Check, Shield, Search, FileText, Database } from "lucide-react";

const MonitorTrackFlow = () => {
  return (
    <div className="space-y-6">
      <Card className="border-discrepay-100 bg-gradient-to-r from-blue-50 to-white">
        <CardContent className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Monitor, Track, and Settle with Discrepay</h2>
            <p className="text-muted-foreground">
              Enable financial institutions and enterprises to monitor financial flows, validate settlements, 
              detect risks, and ensure compliance through Discrepay's intelligent integrations.
            </p>
          </div>
          
          <div className="w-full overflow-hidden py-4">
            <div className="flex relative pb-12">
              {/* Step progression line */}
              <div className="absolute inset-0 flex justify-center">
                <div className="h-full w-1 bg-gradient-to-b from-blue-300 to-blue-600"></div>
              </div>

              {/* Flow visualization */}
              <div className="relative z-10 flex flex-col items-center w-full">
                
                {/* Step 1 */}
                <div className="flex items-center justify-center mb-8 w-full">
                  <div className="w-full md:w-3/4 flex flex-col md:flex-row bg-white rounded-lg shadow-sm border">
                    <div className="bg-blue-600 text-white p-4 flex items-center justify-center rounded-t-lg md:rounded-l-lg md:rounded-r-none">
                      <div className="font-bold text-xl">Step 1</div>
                    </div>
                    <div className="flex-1 p-4">
                      <h3 className="text-lg font-semibold mb-2">Integrate Financial Systems</h3>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Connect banks, mobile money platforms, payment processors via Discrepay's 40+ pre-built connectors</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Set up data ingestion pipelines (real-time or daily batch imports)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Arrow connector */}
                <div className="flex justify-center mb-8">
                  <ArrowRight className="h-6 w-6 text-blue-500" />
                </div>
                
                {/* Step 2 */}
                <div className="flex items-center justify-center mb-8 w-full">
                  <div className="w-full md:w-3/4 flex flex-col md:flex-row bg-white rounded-lg shadow-sm border">
                    <div className="bg-blue-600 text-white p-4 flex items-center justify-center rounded-t-lg md:rounded-l-lg md:rounded-r-none">
                      <div className="font-bold text-xl">Step 2</div>
                    </div>
                    <div className="flex-1 p-4">
                      <h3 className="text-lg font-semibold mb-2">Funds Matching and Settlement Validation</h3>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Discrepay automatically matches payment initiations with received settlements</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Variance detection flags missing, delayed, or partial settlements instantly</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Arrow connector */}
                <div className="flex justify-center mb-8">
                  <ArrowRight className="h-6 w-6 text-blue-500" />
                </div>
                
                {/* Step 3 */}
                <div className="flex items-center justify-center mb-8 w-full">
                  <div className="w-full md:w-3/4 flex flex-col md:flex-row bg-white rounded-lg shadow-sm border">
                    <div className="bg-blue-600 text-white p-4 flex items-center justify-center rounded-t-lg md:rounded-l-lg md:rounded-r-none">
                      <div className="font-bold text-xl">Step 3</div>
                    </div>
                    <div className="flex-1 p-4">
                      <h3 className="text-lg font-semibold mb-2">Fraud Risk and Compliance Monitoring</h3>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Real-time risk scoring on all incoming transactions</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Detect anomalous transaction behaviors</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Compliance monitoring for AML/KYC violations, suspicious patterns, and regional regulations</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Arrow connector */}
                <div className="flex justify-center mb-8">
                  <ArrowRight className="h-6 w-6 text-blue-500" />
                </div>
                
                {/* Step 4 */}
                <div className="flex items-center justify-center mb-8 w-full">
                  <div className="w-full md:w-3/4 flex flex-col md:flex-row bg-white rounded-lg shadow-sm border">
                    <div className="bg-blue-600 text-white p-4 flex items-center justify-center rounded-t-lg md:rounded-l-lg md:rounded-r-none">
                      <div className="font-bold text-xl">Step 4</div>
                    </div>
                    <div className="flex-1 p-4">
                      <h3 className="text-lg font-semibold mb-2">Unified Dashboard Visualization</h3>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Full visibility of payment lifecycle: Initiated → Settled → Cleared</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Customizable alerts for fund mismatches, fraud detection, and compliance breaches</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Arrow connector */}
                <div className="flex justify-center mb-8">
                  <ArrowRight className="h-6 w-6 text-blue-500" />
                </div>
                
                {/* Step 5 */}
                <div className="flex items-center justify-center w-full">
                  <div className="w-full md:w-3/4 flex flex-col md:flex-row bg-white rounded-lg shadow-sm border">
                    <div className="bg-blue-600 text-white p-4 flex items-center justify-center rounded-t-lg md:rounded-l-lg md:rounded-r-none">
                      <div className="font-bold text-xl">Step 5</div>
                    </div>
                    <div className="flex-1 p-4">
                      <h3 className="text-lg font-semibold mb-2">Audit-Ready Reporting and Insights</h3>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Generate real-time compliance reports, financial performance metrics, and fraud investigation trails</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Download tailored reports for finance, operations, risk, and executive teams</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard title="Key Features">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
            <div className="border rounded-md p-3 bg-blue-50">
              <div className="flex items-start">
                <Shield className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <div>
                  <h4 className="font-medium">Regulatory Compliance</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Automated compliance monitoring for AML/KYC regulations across African markets
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border rounded-md p-3 bg-blue-50">
              <div className="flex items-start">
                <Search className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <div>
                  <h4 className="font-medium">Real-time Monitoring</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Track every payment and settlement across all channels in real-time
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border rounded-md p-3 bg-blue-50">
              <div className="flex items-start">
                <FileText className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <div>
                  <h4 className="font-medium">Audit-Ready Reports</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Generate comprehensive reports for regulators and auditors with one click
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border rounded-md p-3 bg-blue-50">
              <div className="flex items-start">
                <Database className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <div>
                  <h4 className="font-medium">40+ Integrations</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Connect to all major African payment processors, banks, and mobile money platforms
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DashboardCard>
        
        <DashboardCard title="Supported Payment Systems">
          <div className="p-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <div className="border rounded-md p-2 text-center">
                <div className="text-sm font-medium">Paystack</div>
                <div className="text-xs text-muted-foreground">Card Processor</div>
              </div>
              <div className="border rounded-md p-2 text-center">
                <div className="text-sm font-medium">Flutterwave</div>
                <div className="text-xs text-muted-foreground">Payment Gateway</div>
              </div>
              <div className="border rounded-md p-2 text-center">
                <div className="text-sm font-medium">M-Pesa</div>
                <div className="text-xs text-muted-foreground">Mobile Money</div>
              </div>
              <div className="border rounded-md p-2 text-center">
                <div className="text-sm font-medium">Interswitch</div>
                <div className="text-xs text-muted-foreground">Card & Bank</div>
              </div>
              <div className="border rounded-md p-2 text-center">
                <div className="text-sm font-medium">SWIFT</div>
                <div className="text-xs text-muted-foreground">International</div>
              </div>
              <div className="border rounded-md p-2 text-center">
                <div className="text-sm font-medium">NIBSS</div>
                <div className="text-xs text-muted-foreground">Bank Transfer</div>
              </div>
              <div className="border rounded-md p-2 text-center">
                <div className="text-sm font-medium">MTN MoMo</div>
                <div className="text-xs text-muted-foreground">Mobile Money</div>
              </div>
              <div className="border rounded-md p-2 text-center">
                <div className="text-sm font-medium">Orange Money</div>
                <div className="text-xs text-muted-foreground">Mobile Money</div>
              </div>
              <div className="border rounded-md p-2 text-center">
                <div className="text-sm font-medium">+ 32 More</div>
                <div className="text-xs text-muted-foreground">Integrations</div>
              </div>
            </div>
            
            <div className="mt-4 bg-gray-50 p-3 rounded-md text-center">
              <p className="text-xs text-muted-foreground">
                Discrepay's growing network covers 18 African countries with local and cross-border payment capabilities
              </p>
            </div>
          </div>
        </DashboardCard>
      </div>
      
      <DashboardCard title="Comparison: Manual vs. Discrepay">
        <div className="p-2">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left font-medium p-2">Process</th>
                  <th className="text-left font-medium p-2">Manual Approach</th>
                  <th className="text-left font-medium p-2">With Discrepay</th>
                  <th className="text-left font-medium p-2">Improvement</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-2 font-medium">Settlement Reconciliation</td>
                  <td className="p-2">4-8 hours daily</td>
                  <td className="p-2">Automated (minutes)</td>
                  <td className="p-2 text-green-600">~95% time saved</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-2 font-medium">Fraud Detection</td>
                  <td className="p-2">Days or weeks later</td>
                  <td className="p-2">Real-time</td>
                  <td className="p-2 text-green-600">Immediate response</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-2 font-medium">Compliance Reporting</td>
                  <td className="p-2">1-2 weeks to prepare</td>
                  <td className="p-2">On-demand reports</td>
                  <td className="p-2 text-green-600">~99% time saved</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-2 font-medium">Missing Settlements</td>
                  <td className="p-2">Often undetected</td>
                  <td className="p-2">Instant alerts</td>
                  <td className="p-2 text-green-600">100% visibility</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-2 font-medium">System Integration</td>
                  <td className="p-2">Custom development</td>
                  <td className="p-2">Pre-built connectors</td>
                  <td className="p-2 text-green-600">Weeks vs. days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
};

export default MonitorTrackFlow;

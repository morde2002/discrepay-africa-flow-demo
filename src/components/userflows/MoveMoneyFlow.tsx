
import { Card, CardContent } from "@/components/ui/card";
import DashboardCard from "@/components/ui/DashboardCard";
import { ArrowRight, Check, Database, Shield, Upload, Calendar } from "lucide-react";

const MoveMoneyFlow = () => {
  return (
    <div className="space-y-6">
      <Card className="border-discrepay-100 bg-gradient-to-r from-discrepay-50 to-white">
        <CardContent className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Move Money End-to-End with Discrepay</h2>
            <p className="text-muted-foreground">
              Enable financial institutions, fintechs, and enterprises to initiate, route, manage, and complete payouts 
              efficiently across banks, mobile money platforms, and card processors.
            </p>
          </div>
          
          <div className="w-full overflow-hidden py-4">
            <div className="flex relative pb-12">
              {/* Step progression line */}
              <div className="absolute inset-0 flex justify-center">
                <div className="h-full w-1 bg-gradient-to-b from-discrepay-300 to-discrepay-600"></div>
              </div>

              {/* Flow visualization */}
              <div className="relative z-10 flex flex-col items-center w-full">
                
                {/* Step 1 */}
                <div className="flex items-center justify-center mb-8 w-full">
                  <div className="w-full md:w-3/4 flex flex-col md:flex-row bg-white rounded-lg shadow-sm border">
                    <div className="bg-discrepay-600 text-white p-4 flex items-center justify-center rounded-t-lg md:rounded-l-lg md:rounded-r-none">
                      <div className="font-bold text-xl">Step 1</div>
                    </div>
                    <div className="flex-1 p-4">
                      <h3 className="text-lg font-semibold mb-2">Authentication and Access Control</h3>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Secure login to Discrepay dashboard</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Configure Role-Based Access Control (RBAC) for finance and operations teams</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Arrow connector */}
                <div className="flex justify-center mb-8">
                  <ArrowRight className="h-6 w-6 text-discrepay-500" />
                </div>
                
                {/* Step 2 */}
                <div className="flex items-center justify-center mb-8 w-full">
                  <div className="w-full md:w-3/4 flex flex-col md:flex-row bg-white rounded-lg shadow-sm border">
                    <div className="bg-discrepay-600 text-white p-4 flex items-center justify-center rounded-t-lg md:rounded-l-lg md:rounded-r-none">
                      <div className="font-bold text-xl">Step 2</div>
                    </div>
                    <div className="flex-1 p-4">
                      <h3 className="text-lg font-semibold mb-2">Payment Initiation</h3>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Launch payout via API or dashboard</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Upload bulk payment file if needed (e.g., pay 1,000+ recipients)</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Specify payout details: recipient information, amount, currency, payment processor</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Arrow connector */}
                <div className="flex justify-center mb-8">
                  <ArrowRight className="h-6 w-6 text-discrepay-500" />
                </div>
                
                {/* Step 3 */}
                <div className="flex items-center justify-center mb-8 w-full">
                  <div className="w-full md:w-3/4 flex flex-col md:flex-row bg-white rounded-lg shadow-sm border">
                    <div className="bg-discrepay-600 text-white p-4 flex items-center justify-center rounded-t-lg md:rounded-l-lg md:rounded-r-none">
                      <div className="font-bold text-xl">Step 3</div>
                    </div>
                    <div className="flex-1 p-4">
                      <h3 className="text-lg font-semibold mb-2">Smart Channel Routing</h3>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Discrepay automatically selects the optimal payment channel based on cost, speed, and success rates</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Scheduled or instant payouts are supported</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Arrow connector */}
                <div className="flex justify-center mb-8">
                  <ArrowRight className="h-6 w-6 text-discrepay-500" />
                </div>
                
                {/* Step 4 */}
                <div className="flex items-center justify-center mb-8 w-full">
                  <div className="w-full md:w-3/4 flex flex-col md:flex-row bg-white rounded-lg shadow-sm border">
                    <div className="bg-discrepay-600 text-white p-4 flex items-center justify-center rounded-t-lg md:rounded-l-lg md:rounded-r-none">
                      <div className="font-bold text-xl">Step 4</div>
                    </div>
                    <div className="flex-1 p-4">
                      <h3 className="text-lg font-semibold mb-2">Real-Time Transaction Monitoring</h3>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Live status updates for each payment: pending, success, failure, refunded</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Auto-retry failed payments through intelligent retry logic</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Arrow connector */}
                <div className="flex justify-center mb-8">
                  <ArrowRight className="h-6 w-6 text-discrepay-500" />
                </div>
                
                {/* Step 5 */}
                <div className="flex items-center justify-center w-full">
                  <div className="w-full md:w-3/4 flex flex-col md:flex-row bg-white rounded-lg shadow-sm border">
                    <div className="bg-discrepay-600 text-white p-4 flex items-center justify-center rounded-t-lg md:rounded-l-lg md:rounded-r-none">
                      <div className="font-bold text-xl">Step 5</div>
                    </div>
                    <div className="flex-1 p-4">
                      <h3 className="text-lg font-semibold mb-2">Financial Close and Reporting</h3>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Summarized payout reports</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Downloadable records for accounting, audits, and internal reconciliation</span>
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="flex items-center mb-4">
              <div className="bg-discrepay-100 p-2 rounded-md mr-3">
                <Upload className="h-5 w-5 text-discrepay-600" />
              </div>
              <h3 className="font-medium">Payment Initiation</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Initiate single or bulk payouts through an intuitive interface or API. 
              Support for all major payment types across Africa.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="flex items-center mb-4">
              <div className="bg-discrepay-100 p-2 rounded-md mr-3">
                <Database className="h-5 w-5 text-discrepay-600" />
              </div>
              <h3 className="font-medium">Smart Routing</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-powered channel selection optimizes for cost, speed, and reliability based on 
              payment destination and type.
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="flex items-center mb-4">
              <div className="bg-discrepay-100 p-2 rounded-md mr-3">
                <Calendar className="h-5 w-5 text-discrepay-600" />
              </div>
              <h3 className="font-medium">Scheduled Payouts</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Plan and schedule recurring or one-time future payouts with complete visibility 
              and control.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MoveMoneyFlow;

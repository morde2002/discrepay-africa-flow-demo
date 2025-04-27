
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Timeline } from "lucide-react";
import { 
  Activity,
  User,
  FileText,
  Flag,
  Shield,
  Ban,
  UserX,
  Mail
} from "lucide-react";

type RiskAlertDialogProps = {
  open: boolean;
  onClose: () => void;
  alert: any; // Replace with proper type once defined
};

const RiskAlertDialog: React.FC<RiskAlertDialogProps> = ({ open, onClose, alert }) => {
  const [currentTab, setCurrentTab] = useState("profile");
  const [escalationNote, setEscalationNote] = useState("");
  const [resolution, setResolution] = useState("");
  
  if (!alert) return null;
  
  const handleEscalate = () => {
    // Handle escalation logic
    console.log("Escalating alert:", alert.id, "with note:", escalationNote);
    onClose();
  };

  const handleResolve = () => {
    // Handle resolution logic
    console.log("Resolving alert:", alert.id, "with resolution:", resolution);
    onClose();
  };
  
  const handleFreeze = () => {
    if (confirm("Are you sure you want to freeze this account? This will immediately suspend all transactions.")) {
      console.log("Freezing account for alert:", alert.id);
      onClose();
    }
  };
  
  const handleMarkFalsePositive = () => {
    if (confirm("Are you sure you want to mark this as a false positive?")) {
      console.log("Marking as false positive:", alert.id);
      onClose();
    }
  };
  
  const handleReportToRegulator = () => {
    if (confirm("Are you sure you want to report this to the regulator?")) {
      console.log("Reporting to regulator:", alert.id);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Risk Alert: {alert.id}</DialogTitle>
            <div>
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
              <Badge className="ml-2 bg-purple-100 text-purple-800">
                {alert.category || "Uncategorized"}
              </Badge>
            </div>
          </div>
          <DialogDescription className="mt-2">
            <div className="flex items-center">
              <span className="font-medium mr-2">Alert Message:</span>
              <span>{alert.message}</span>
            </div>
            <div className="flex items-center mt-2">
              <span className="font-medium mr-2">Trigger Reason:</span>
              <span className="text-red-700">{alert.details || "Multiple large transactions from same source"}</span>
            </div>
          </DialogDescription>
        </DialogHeader>

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full mt-4">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="profile">
              <User className="w-4 h-4 mr-2" />
              Customer Profile
            </TabsTrigger>
            <TabsTrigger value="transactions">
              <Activity className="w-4 h-4 mr-2" />
              Transactions
            </TabsTrigger>
            <TabsTrigger value="timeline">
              <Timeline className="w-4 h-4 mr-2" />
              Timeline
            </TabsTrigger>
            <TabsTrigger value="actions">
              <Flag className="w-4 h-4 mr-2" />
              Actions
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-4">Customer Information</h3>
                <div className="space-y-2">
                  <div className="grid grid-cols-2">
                    <span className="text-sm text-gray-500">Customer ID:</span>
                    <span className="text-sm font-medium">{alert.customer.replace("Customer #", "")}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-sm text-gray-500">Name:</span>
                    <span className="text-sm font-medium">John Doe</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-sm text-gray-500">Email:</span>
                    <span className="text-sm font-medium">john.doe@example.com</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-sm text-gray-500">Phone:</span>
                    <span className="text-sm font-medium">+234 801 234 5678</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-sm text-gray-500">Account Created:</span>
                    <span className="text-sm font-medium">Jan 12, 2025</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-sm text-gray-500">Last Activity:</span>
                    <span className="text-sm font-medium">Today, 10:12 AM</span>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-4">Risk Profile</h3>
                <div className="space-y-2">
                  <div className="grid grid-cols-2">
                    <span className="text-sm text-gray-500">Risk Rating:</span>
                    <Badge className="bg-red-100 text-red-800 w-fit">High</Badge>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-sm text-gray-500">KYC Status:</span>
                    <Badge className="bg-green-100 text-green-800 w-fit">Verified</Badge>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-sm text-gray-500">AML Screening:</span>
                    <Badge className="bg-amber-100 text-amber-800 w-fit">Watchlist Match</Badge>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-sm text-gray-500">Previous Alerts:</span>
                    <span className="text-sm font-medium">3 in last 30 days</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-sm text-gray-500">Country:</span>
                    <span className="text-sm font-medium">Nigeria</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-sm text-gray-500">PEP Status:</span>
                    <span className="text-sm font-medium">Not a PEP</span>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-md p-4 col-span-2">
                <h3 className="font-medium mb-4">KYC Documents</h3>
                <div className="grid grid-cols-4 gap-4">
                  <div className="border p-2 rounded text-center">
                    <FileText className="mx-auto h-8 w-8 text-gray-400" />
                    <span className="text-xs block mt-1">ID Card</span>
                    <Button variant="link" className="text-xs p-0 h-auto">View</Button>
                  </div>
                  <div className="border p-2 rounded text-center">
                    <FileText className="mx-auto h-8 w-8 text-gray-400" />
                    <span className="text-xs block mt-1">Proof of Address</span>
                    <Button variant="link" className="text-xs p-0 h-auto">View</Button>
                  </div>
                  <div className="border p-2 rounded text-center">
                    <FileText className="mx-auto h-8 w-8 text-gray-400" />
                    <span className="text-xs block mt-1">Passport</span>
                    <Button variant="link" className="text-xs p-0 h-auto">View</Button>
                  </div>
                  <div className="border p-2 rounded text-center">
                    <FileText className="mx-auto h-8 w-8 text-gray-400" />
                    <span className="text-xs block mt-1">Business Reg.</span>
                    <Button variant="link" className="text-xs p-0 h-auto">View</Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="transactions">
            <div className="space-y-4">
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-4">Suspicious Transactions</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-3">Transaction ID</th>
                        <th className="text-left py-2 px-3">Date & Time</th>
                        <th className="text-left py-2 px-3">Amount</th>
                        <th className="text-left py-2 px-3">Type</th>
                        <th className="text-left py-2 px-3">Beneficiary</th>
                        <th className="text-left py-2 px-3">Status</th>
                        <th className="text-left py-2 px-3">Risk Flag</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="py-2 px-3">TX78901234</td>
                        <td className="py-2 px-3">Today, 10:23 AM</td>
                        <td className="py-2 px-3 font-medium">₦2,500,000</td>
                        <td className="py-2 px-3">Payout</td>
                        <td className="py-2 px-3">Port Harcourt Electric</td>
                        <td className="py-2 px-3">
                          <Badge className="bg-green-100 text-green-800">Completed</Badge>
                        </td>
                        <td className="py-2 px-3">
                          <Badge className="bg-red-100 text-red-800">High</Badge>
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="py-2 px-3">TX78901235</td>
                        <td className="py-2 px-3">Today, 10:24 AM</td>
                        <td className="py-2 px-3 font-medium">₦2,500,000</td>
                        <td className="py-2 px-3">Payout</td>
                        <td className="py-2 px-3">Port Harcourt Electric</td>
                        <td className="py-2 px-3">
                          <Badge className="bg-green-100 text-green-800">Completed</Badge>
                        </td>
                        <td className="py-2 px-3">
                          <Badge className="bg-red-100 text-red-800">High</Badge>
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="py-2 px-3">TX78901236</td>
                        <td className="py-2 px-3">Today, 10:25 AM</td>
                        <td className="py-2 px-3 font-medium">₦2,500,000</td>
                        <td className="py-2 px-3">Payout</td>
                        <td className="py-2 px-3">Port Harcourt Electric</td>
                        <td className="py-2 px-3">
                          <Badge className="bg-amber-100 text-amber-800">Pending</Badge>
                        </td>
                        <td className="py-2 px-3">
                          <Badge className="bg-red-100 text-red-800">High</Badge>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-4">Transaction Volume History</h3>
                  <div className="h-48 bg-gray-100 flex items-center justify-center rounded">
                    [Transaction Volume Chart]
                  </div>
                </div>
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-4">Transaction Value History</h3>
                  <div className="h-48 bg-gray-100 flex items-center justify-center rounded">
                    [Transaction Value Chart]
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="timeline">
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-4">Event Timeline</h3>
              <div className="space-y-4">
                <div className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-0.5 bg-gray-200 h-16"></div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Suspicious Transaction Pattern Detected</div>
                    <div className="text-xs text-gray-500">Today, 10:23 AM</div>
                    <div className="mt-1 text-sm">System detected multiple large transactions from same source within 3 minutes</div>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                    <div className="w-0.5 bg-gray-200 h-16"></div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">AML Screening Alert</div>
                    <div className="text-xs text-gray-500">Today, 10:25 AM</div>
                    <div className="mt-1 text-sm">Transaction pattern matched AML monitoring rules for structured payments</div>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="w-0.5 bg-gray-200 h-16"></div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Risk Score Increased</div>
                    <div className="text-xs text-gray-500">Today, 10:26 AM</div>
                    <div className="mt-1 text-sm">Customer risk score increased from Medium to High based on recent activity</div>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Alert Generated</div>
                    <div className="text-xs text-gray-500">Today, 10:30 AM</div>
                    <div className="mt-1 text-sm">Compliance alert RISK001 created for review</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="actions">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-md p-4 space-y-4">
                <h3 className="font-medium">Recommended Actions</h3>
                <div className="space-y-3">
                  <Button onClick={handleFreeze} variant="outline" className="w-full justify-start">
                    <Ban className="w-4 h-4 mr-2" /> Freeze Account
                  </Button>
                  <Button onClick={handleMarkFalsePositive} variant="outline" className="w-full justify-start">
                    <Shield className="w-4 h-4 mr-2" /> Mark as False Positive
                  </Button>
                  <Button onClick={handleReportToRegulator} variant="outline" className="w-full justify-start">
                    <Mail className="w-4 h-4 mr-2" /> Report to Regulator
                  </Button>
                  <Button onClick={handleEscalate} variant="outline" className="w-full justify-start">
                    <UserX className="w-4 h-4 mr-2" /> Escalate to Manager
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-4">Resolution Notes</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm mb-1 block">Add a note</label>
                    <textarea 
                      className="w-full border rounded-md p-2"
                      rows={3}
                      placeholder="Enter resolution notes..."
                      value={resolution}
                      onChange={(e) => setResolution(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleResolve} className="w-full">Resolve Alert</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RiskAlertDialog;

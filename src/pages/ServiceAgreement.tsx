
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/components/auth/AuthContext";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

const ServiceAgreement = () => {
  const { updateUserData } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!termsAccepted) {
      toast.error("You must accept the terms and conditions to continue");
      return;
    }

    setIsLoading(true);

    // Simulate API call for agreement submission
    setTimeout(() => {
      setIsLoading(false);
      
      // Set user as authenticated after completing the full flow
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", "admin");
      updateUserData({ kybStatus: "pending" });
      
      toast.success("Application submitted successfully! Your account is under review.");
      navigate("/");
    }, 1500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-2xl space-y-4">
        <div className="text-center">
          <img
            src="/lovable-uploads/c6b58a34-ac83-45c0-8be4-4c26b436414d.png"
            alt="Discrepay Logo"
            className="mx-auto h-12 w-auto"
          />
          <h1 className="text-3xl font-bold text-primary">Discrepay</h1>
          <p className="text-gray-500">Monitor, Control and Settle Your Financial Operations in Real Time</p>
        </div>

        <Card className="border-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle>Service Agreement</CardTitle>
            <CardDescription>
              Step 4: Review and accept the terms of service
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium text-base">Terms of Service</h3>
                
                <ScrollArea className="h-64 rounded border p-4">
                  <div className="space-y-4 text-sm">
                    <h4 className="font-semibold">1. Introduction</h4>
                    <p>
                      This agreement ("Agreement") is entered into by and between Discrepay ("Company", "we", "us") and the entity agreeing to these terms ("Customer", "you").
                    </p>
                    
                    <h4 className="font-semibold">2. Services</h4>
                    <p>
                      Discrepay provides financial reconciliation, monitoring, and settlement services ("Services") through its platform. By accepting this Agreement, you are acquiring the right to access and use these Services.
                    </p>
                    
                    <h4 className="font-semibold">3. Payment Terms</h4>
                    <p>
                      Fees for the Services are based on the subscription plan selected. Payment is due in advance of the subscription period and is non-refundable. All fees are exclusive of taxes.
                    </p>
                    
                    <h4 className="font-semibold">4. Term and Termination</h4>
                    <p>
                      This Agreement begins on the date you accept it and continues until terminated by either party. You may terminate at any time by providing written notice. We may terminate if you breach this Agreement.
                    </p>
                    
                    <h4 className="font-semibold">5. Data Privacy</h4>
                    <p>
                      We process your data as described in our Privacy Policy. You represent and warrant that you have provided appropriate notice to and obtained appropriate consent from your users for the processing activities described in this Agreement.
                    </p>
                    
                    <h4 className="font-semibold">6. Confidentiality</h4>
                    <p>
                      "Confidential Information" means information disclosed by one party to the other under this Agreement that is marked as confidential or would normally be considered confidential information under the circumstances. Both parties agree to protect each other's Confidential Information.
                    </p>
                    
                    <h4 className="font-semibold">7. Warranties and Disclaimers</h4>
                    <p>
                      We warrant that we will provide the Services with reasonable skill and care. EXCEPT AS EXPRESSLY PROVIDED IN THIS AGREEMENT, WE MAKE NO OTHER WARRANTIES, EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                    </p>
                    
                    <h4 className="font-semibold">8. Limitation of Liability</h4>
                    <p>
                      NEITHER PARTY'S LIABILITY WITH RESPECT TO ANY SINGLE INCIDENT ARISING OUT OF OR RELATED TO THIS AGREEMENT WILL EXCEED THE AMOUNT PAID BY CUSTOMER HEREUNDER IN THE 12 MONTHS PRECEDING THE INCIDENT.
                    </p>
                    
                    <h4 className="font-semibold">9. General Provisions</h4>
                    <p>
                      This Agreement is governed by the laws of Kenya. Any disputes arising out of this Agreement will be resolved through arbitration in Nairobi under the rules of the Chartered Institute of Arbitrators.
                    </p>
                  </div>
                </ScrollArea>
              </div>
              
              <Separator />
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                  required
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I have read and agree to the terms of service
                </label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-3">
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-primary/80"
                disabled={isLoading || !termsAccepted}
              >
                {isLoading ? "Processing..." : "Accept & Submit for Review"}
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                className="w-full"
                onClick={() => navigate("/kyb-verification")}
              >
                Back to Business Verification
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="text-center text-xs text-gray-500">
          <p>By accepting this agreement, you consent to our privacy policy and terms of service.</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceAgreement;

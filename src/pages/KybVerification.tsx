
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const KybVerification = () => {
  const { user, updateUserData } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // KYB details
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [taxId, setTaxId] = useState("");
  
  // Documents
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [documentFiles, setDocumentFiles] = useState<Record<string, File | null>>({
    incorporation: null,
    director: null,
    crb: null
  });

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>, docType: string) => {
    if (e.target.files && e.target.files.length > 0) {
      setDocumentFiles(prev => ({
        ...prev,
        [docType]: e.target.files![0]
      }));

      if (!selectedDocuments.includes(docType)) {
        setSelectedDocuments(prev => [...prev, docType]);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!registrationNumber || !businessAddress || !taxId) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (selectedDocuments.length === 0) {
      toast.error("Please upload at least one required document");
      return;
    }

    setIsLoading(true);

    // Simulate API call for KYB verification
    setTimeout(() => {
      setIsLoading(false);
      
      // Update KYB status
      updateUserData({ kybStatus: "pending" });
      
      toast.success("KYB details submitted successfully!");
      navigate("/service-agreement");
    }, 2000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-lg space-y-4">
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
            <CardTitle>Business Verification</CardTitle>
            <CardDescription>
              Step 3: Provide your business details and documentation for KYB verification
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="registration-number">Company Registration Number</Label>
                <Input
                  id="registration-number"
                  placeholder="Enter registration number"
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="business-address">Business Address</Label>
                <Input
                  id="business-address"
                  placeholder="Enter complete business address"
                  value={businessAddress}
                  onChange={(e) => setBusinessAddress(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tax-id">Tax ID</Label>
                <Input
                  id="tax-id"
                  placeholder="Enter tax identification number"
                  value={taxId}
                  onChange={(e) => setTaxId(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-4 pt-4">
                <h3 className="font-medium text-base">Required Documents</h3>
                <p className="text-sm text-gray-500">Upload at least one of the following documents:</p>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="certificate-incorporation">Certificate of Incorporation</Label>
                      {documentFiles.incorporation && (
                        <span className="text-xs text-green-600">
                          File selected: {documentFiles.incorporation.name}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="certificate-incorporation"
                        className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-primary/20 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">PDF, JPG, PNG (MAX. 10MB)</p>
                        </div>
                        <input
                          id="certificate-incorporation"
                          type="file"
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleDocumentChange(e, 'incorporation')}
                        />
                      </label>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="director-id">Director ID/Passport</Label>
                      {documentFiles.director && (
                        <span className="text-xs text-green-600">
                          File selected: {documentFiles.director.name}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="director-id"
                        className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-primary/20 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">PDF, JPG, PNG (MAX. 10MB)</p>
                        </div>
                        <input
                          id="director-id"
                          type="file"
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleDocumentChange(e, 'director')}
                        />
                      </label>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="crb-certificate">CRB Certificate</Label>
                      {documentFiles.crb && (
                        <span className="text-xs text-green-600">
                          File selected: {documentFiles.crb.name}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="crb-certificate"
                        className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-primary/20 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">PDF, JPG, PNG (MAX. 10MB)</p>
                        </div>
                        <input
                          id="crb-certificate"
                          type="file"
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleDocumentChange(e, 'crb')}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-3">
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-primary/80"
                disabled={isLoading || !registrationNumber || !businessAddress || !taxId || selectedDocuments.length === 0}
              >
                {isLoading ? "Submitting..." : "Submit & Continue"}
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                className="w-full"
                onClick={() => navigate("/verify-email")}
              >
                Back to Email Verification
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="text-center text-xs text-gray-500">
          <p>Your information is securely encrypted and will be used for verification purposes only.</p>
        </div>
      </div>
    </div>
  );
};

export default KybVerification;

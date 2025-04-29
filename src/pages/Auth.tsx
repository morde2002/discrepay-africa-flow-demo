
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const Auth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [verificationStep, setVerificationStep] = useState(0);

  // Login form state
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Signup form state
  const [businessName, setBusinessName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  // KYC/KYB verification
  const [verificationCode, setVerificationCode] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [documentFile, setDocumentFile] = useState<File | null>(null);

  // Role selection
  const [selectedRole, setSelectedRole] = useState("admin");

  const VALID_CREDENTIALS = { username: "rjlogistics", password: "Abc123**!!" };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (loginUsername !== VALID_CREDENTIALS.username || loginPassword !== VALID_CREDENTIALS.password) {
      toast.error("Invalid username or password");
      return;
    }

    setIsLoading(true);
    // Mock login - replace with actual authentication
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', 'admin'); // Store role for role-based access
      if (rememberMe) {
        localStorage.setItem('rememberedUser', loginUsername);
      }
      toast.success("Login successful");
      navigate("/");
    }, 1000);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!businessName || !registrationNumber || !businessEmail || !signupUsername || !signupPassword) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (signupPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!termsAccepted) {
      toast.error("You must accept the terms and conditions");
      return;
    }

    setIsLoading(true);
    // Proceed to KYC/KYB verification
    setTimeout(() => {
      setIsLoading(false);
      setVerificationStep(1);
      toast.success("Business details validated. Please complete verification.");
    }, 1000);
  };

  const handleVerificationCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (verificationCode.length !== 6) {
      toast.error("Please enter a valid verification code");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setVerificationStep(2);
      toast.success("Email verified. Please upload required documents.");
    }, 1000);
  };

  const handleDocumentUpload = (e: React.FormEvent) => {
    e.preventDefault();

    if (!documentType || !documentFile) {
      toast.error("Please select a document type and upload a file");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Documents uploaded successfully. Your application is under review.");
      // In a real app, we would submit the form data to the backend here
      // For demo purposes, we'll navigate to the dashboard
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', selectedRole);
      navigate("/");
    }, 1500);
  };

  const handleForgotPassword = () => {
    const username = loginUsername;
    if (!username) {
      toast.error("Please enter your username");
      return;
    }
    toast.success("Password reset instructions sent to your email");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setDocumentFile(e.target.files[0]);
    }
  };

  const resetVerificationSteps = () => {
    setVerificationStep(0);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center">
          <img
            src="/lovable-uploads/c6b58a34-ac83-45c0-8be4-4c26b436414d.png"
            alt="Discrepay Logo"
            className="mx-auto h-12 w-auto"
          />
          <h1 className="text-3xl font-bold text-primary">Discrepay</h1>
          <p className="text-gray-500">Monitor, Control and Settle Your Financial Operations in Real Time</p>
        </div>

        {verificationStep === 0 && (
          <Card className="border-primary/20 shadow-lg">
            <CardHeader>
              <Tabs defaultValue="login" value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "signup")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Business Sign Up</TabsTrigger>
                </TabsList>
                <TabsContent value="login" className="mt-4">
                  <CardTitle>Welcome Back</CardTitle>
                  <CardDescription>Login to access your dashboard</CardDescription>
                </TabsContent>
                <TabsContent value="signup" className="mt-4">
                  <CardTitle>Create Business Account</CardTitle>
                  <CardDescription>Register your business with Discrepay</CardDescription>
                </TabsContent>
              </Tabs>
            </CardHeader>
            
            {activeTab === "login" ? (
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-username">Username</Label>
                    <Input
                      id="login-username"
                      type="text"
                      placeholder="Enter your username"
                      value={loginUsername}
                      onChange={(e) => setLoginUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="login-password">Password</Label>
                      <button
                        type="button"
                        onClick={handleForgotPassword}
                        className="text-xs text-primary hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <Input
                      id="login-password"
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <label
                      htmlFor="remember"
                      className="text-sm text-gray-500 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </label>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full bg-gradient-to-r from-primary to-primary/80" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Log In"}
                  </Button>
                </CardFooter>
              </form>
            ) : (
              <form onSubmit={handleSignup}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="business-name">Business Name</Label>
                    <Input
                      id="business-name"
                      placeholder="Your business name"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="registration-number">Registration Number</Label>
                    <Input
                      id="registration-number"
                      placeholder="Business registration number"
                      value={registrationNumber}
                      onChange={(e) => setRegistrationNumber(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="business-email">Business Email</Label>
                      <Input
                        id="business-email"
                        type="email"
                        placeholder="email@example.com"
                        value={businessEmail}
                        onChange={(e) => setBusinessEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="business-phone">Business Phone</Label>
                      <Input
                        id="business-phone"
                        placeholder="+254 700 000000"
                        value={businessPhone}
                        onChange={(e) => setBusinessPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="business-type">Business Type</Label>
                    <Select value={businessType} onValueChange={setBusinessType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sole-proprietorship">Sole Proprietorship</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="corporation">Corporation</SelectItem>
                        <SelectItem value="llc">Limited Liability Company</SelectItem>
                        <SelectItem value="non-profit">Non-profit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-username">Username</Label>
                    <Input
                      id="signup-username"
                      placeholder="Choose a username"
                      value={signupUsername}
                      onChange={(e) => setSignupUsername(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Create password"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role-select">Account Role</Label>
                    <Select value={selectedRole} onValueChange={setSelectedRole}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="accountant">Accountant</SelectItem>
                        <SelectItem value="analyst">Analyst</SelectItem>
                        <SelectItem value="auditor">Auditor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-4">
                    <Checkbox 
                      id="terms" 
                      checked={termsAccepted}
                      onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                      required
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm text-gray-500 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I accept the terms and conditions
                    </label>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full bg-gradient-to-r from-primary to-primary/80" disabled={isLoading}>
                    {isLoading ? "Processing..." : "Create Account"}
                  </Button>
                </CardFooter>
              </form>
            )}
          </Card>
        )}

        {verificationStep === 1 && (
          <Card className="border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle>Email Verification</CardTitle>
              <CardDescription>
                We've sent a verification code to {businessEmail}. 
                Please enter the code below to continue.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleVerificationCodeSubmit}>
              <CardContent className="space-y-6">
                <div className="mx-auto max-w-sm">
                  <InputOTP maxLength={6} value={verificationCode} onChange={setVerificationCode}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <div className="text-center text-sm">
                  <p className="text-gray-500">
                    Didn't receive the code? <button type="button" className="text-primary font-medium hover:underline">Resend</button>
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button type="submit" className="w-full bg-gradient-to-r from-primary to-primary/80" disabled={isLoading}>
                  {isLoading ? "Verifying..." : "Verify Email"}
                </Button>
                <Button variant="ghost" type="button" onClick={resetVerificationSteps} className="w-full">
                  Back to Sign Up
                </Button>
              </CardFooter>
            </form>
          </Card>
        )}

        {verificationStep === 2 && (
          <Card className="border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle>Document Verification</CardTitle>
              <CardDescription>
                Please upload the required documents to verify your business identity
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleDocumentUpload}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="document-type">Document Type</Label>
                  <Select value={documentType} onValueChange={setDocumentType} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="business-registration">Business Registration Certificate</SelectItem>
                      <SelectItem value="tax-certificate">Tax Compliance Certificate</SelectItem>
                      <SelectItem value="business-permit">Business Permit</SelectItem>
                      <SelectItem value="director-id">Director's ID/Passport</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="document-file">Upload Document</Label>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="document-file"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-primary/20 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PDF, JPG, PNG (MAX. 10MB)</p>
                      </div>
                      <input
                        id="document-file"
                        type="file"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        required
                      />
                    </label>
                  </div>
                  {documentFile && (
                    <p className="text-sm text-green-600 mt-2">
                      File selected: {documentFile.name}
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button type="submit" className="w-full bg-gradient-to-r from-primary to-primary/80" disabled={isLoading}>
                  {isLoading ? "Uploading..." : "Submit Documents"}
                </Button>
                <Button variant="ghost" type="button" onClick={resetVerificationSteps} className="w-full">
                  Back to Sign Up
                </Button>
              </CardFooter>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Auth;
